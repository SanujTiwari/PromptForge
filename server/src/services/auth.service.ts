import { Role } from '@prisma/client';
import { randomBytes, scrypt as scryptCallback, timingSafeEqual, createHmac } from 'crypto';
import { promisify } from 'util';
import { env } from '../config/env';
import { prisma } from '../config/prisma';
import { ApiError } from '../utils/apiError';

const scrypt = promisify(scryptCallback);
const HASH_LENGTH = 64;

export type TokenPayload = { sub: string; role: Role; exp: number };
export type PublicUser = { id: string; email: string; displayName: string; role: Role; avatarUrl: string | null };

const base64Url = (value: string | Buffer) => Buffer.from(value).toString('base64url');
const jwtSecret = () => {
  if (!env.JWT_SECRET || env.JWT_SECRET.length < 32) throw new ApiError(500, 'Authentication is not configured.');
  return env.JWT_SECRET;
};

export const hashPassword = async (password: string): Promise<string> => {
  const salt = randomBytes(16).toString('hex');
  const derivedKey = await scrypt(password, salt, HASH_LENGTH) as Buffer;
  return `${salt}:${derivedKey.toString('hex')}`;
};

export const verifyPassword = async (password: string, stored: string): Promise<boolean> => {
  const [salt, hash] = stored.split(':');
  if (!salt || !hash) return false;
  const candidate = await scrypt(password, salt, HASH_LENGTH) as Buffer;
  const saved = Buffer.from(hash, 'hex');
  return saved.length === candidate.length && timingSafeEqual(saved, candidate);
};

export const createAccessToken = (user: PublicUser): string => {
  const header = base64Url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const expiresInSeconds = 7 * 24 * 60 * 60;
  const payload: TokenPayload = { sub: user.id, role: user.role, exp: Math.floor(Date.now() / 1000) + expiresInSeconds };
  const body = base64Url(JSON.stringify(payload));
  const signature = createHmac('sha256', jwtSecret()).update(`${header}.${body}`).digest('base64url');
  return `${header}.${body}.${signature}`;
};

export const readAccessToken = (token: string): TokenPayload => {
  const [header, body, signature] = token.split('.');
  if (!header || !body || !signature) throw ApiError.unauthorized('Your session is invalid. Please sign in again.');
  const expectedSignature = createHmac('sha256', jwtSecret()).update(`${header}.${body}`).digest('base64url');
  const expected = Buffer.from(expectedSignature);
  const actual = Buffer.from(signature);
  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) throw ApiError.unauthorized('Your session is invalid. Please sign in again.');
  try {
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8')) as TokenPayload;
    if (!payload.sub || !payload.role || payload.exp <= Math.floor(Date.now() / 1000)) throw ApiError.unauthorized('Your session has expired. Please sign in again.');
    return payload;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw ApiError.unauthorized('Your session is invalid. Please sign in again.');
  }
};

const publicUser = (user: { id: string; email: string; displayName: string; role: Role; avatarUrl: string | null }): PublicUser => user;

export const authService = {
  async register(input: { email: string; password: string; displayName: string }) {
    const email = input.email.trim().toLowerCase();
    const exists = await prisma.user.findUnique({ where: { email }, select: { id: true } });
    if (exists) throw ApiError.conflict('An account already exists for this email.');
    const user = await prisma.user.create({
      data: { email, displayName: input.displayName.trim(), passwordHash: await hashPassword(input.password) },
      select: { id: true, email: true, displayName: true, role: true, avatarUrl: true },
    });
    const account = publicUser(user);
    return { user: account, token: createAccessToken(account) };
  },

  async login(input: { email: string; password: string }) {
    const user = await prisma.user.findUnique({ where: { email: input.email.trim().toLowerCase() } });
    if (!user || !user.isActive || !(await verifyPassword(input.password, user.passwordHash))) throw ApiError.unauthorized('Email or password is incorrect.');
    const account = publicUser(user);
    return { user: account, token: createAccessToken(account) };
  },

  async currentUser(userId: string) {
    const user = await prisma.user.findUnique({ where: { id: userId }, select: { id: true, email: true, displayName: true, role: true, avatarUrl: true, isActive: true } });
    if (!user || !user.isActive) throw ApiError.unauthorized('Your session is no longer active.');
    return publicUser(user);
  },
};
