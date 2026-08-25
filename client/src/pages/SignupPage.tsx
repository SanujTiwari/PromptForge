import { useState, useMemo } from 'react';
import { ArrowRight, Check, Eye, EyeOff, Loader2, UserPlus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import GradientMesh from '@/components/GradientMesh';
import { useAppStore } from '@/store/useAppStore';

const signupSchema = z
  .object({
    displayName: z.string().min(2, 'Name must be at least 2 characters').max(80),
    email: z.string().email('Enter a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters').max(128),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

type SignupForm = z.infer<typeof signupSchema>;

function getPasswordStrength(password: string): { score: number; label: string; color: string } {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { score, label: 'Weak', color: '#f43f5e' };
  if (score <= 2) return { score, label: 'Fair', color: '#f59e0b' };
  if (score <= 3) return { score, label: 'Good', color: '#06b6d4' };
  return { score, label: 'Strong', color: '#10b981' };
}

export default function SignupPage() {
  const navigate = useNavigate();
  const { signup, isAuthLoading, authError, clearAuthError } = useAppStore();
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupForm>({
    defaultValues: { displayName: '', email: '', password: '', confirmPassword: '' },
  });

  const watchPassword = watch('password');
  const strength = useMemo(() => getPasswordStrength(watchPassword || ''), [watchPassword]);

  const onSubmit = async (data: SignupForm) => {
    clearAuthError();
    const parsed = signupSchema.safeParse(data);
    if (!parsed.success) return;
    if (!agreedToTerms) return;
    const success = await signup(parsed.data.email, parsed.data.password, parsed.data.displayName);
    if (success) navigate('/');
  };

  return (
    <div className="relative min-h-[calc(100vh-72px)]">
      <div className="grid min-h-[calc(100vh-72px)] lg:grid-cols-2">
        {/* Left: Visual panel */}
        <div className="relative hidden items-center justify-center overflow-hidden lg:flex">
          <GradientMesh />
          <div className="relative z-10 max-w-md px-12">
            <p className="eyebrow">Join the forge</p>
            <h1 className="display mt-5 text-5xl leading-[1.1] xl:text-6xl">
              Start building your{' '}
              <span className="gradient-text">prompt library</span>
            </h1>
            <p className="mt-6 text-base leading-7 text-surface-700">
              Join thousands of practitioners discovering, creating, and selling premium AI prompts.
            </p>

            {/* Benefits */}
            <div className="mt-10 space-y-4">
              {[
                'Access 15,000+ premium prompts',
                'Save favorites to your personal shelf',
                'Sell your own prompts and earn',
                'Get updates on new releases',
              ].map((benefit) => (
                <div key={benefit} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-success/15">
                    <Check className="h-3.5 w-3.5 text-success" />
                  </span>
                  <span className="text-sm text-surface-800">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Form panel */}
        <div className="flex items-center justify-center px-5 py-12">
          <div className="w-full max-w-md">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-2xl"
              style={{ background: 'linear-gradient(135deg, #06b6d4, #7c3aed)' }}
            >
              <UserPlus className="h-6 w-6 text-white" />
            </div>
            <h1 className="display mt-6 text-3xl sm:text-4xl">Create account</h1>
            <p className="mt-2 text-sm text-surface-700">Join PromptForge and start building your library.</p>

            {/* Error */}
            {authError && (
              <div className="mt-5 rounded-xl border border-danger/20 bg-danger/5 px-4 py-3 text-sm text-danger-400">
                {authError}
              </div>
            )}

            <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)}>
              {/* Display Name */}
              <div>
                <label className="block text-sm font-semibold text-surface-800" htmlFor="signup-name">
                  Display name
                </label>
                <input
                  id="signup-name"
                  type="text"
                  className={`glass-input mt-2 ${errors.displayName ? '!border-danger/40' : ''}`}
                  placeholder="Your name"
                  autoComplete="name"
                  {...register('displayName', { required: 'Name is required', minLength: { value: 2, message: 'Min 2 characters' } })}
                />
                {errors.displayName && (
                  <p className="mt-1.5 text-xs text-danger-400">{errors.displayName.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-surface-800" htmlFor="signup-email">
                  Email
                </label>
                <input
                  id="signup-email"
                  type="email"
                  className={`glass-input mt-2 ${errors.email ? '!border-danger/40' : ''}`}
                  placeholder="you@example.com"
                  autoComplete="email"
                  {...register('email', { required: 'Email is required' })}
                />
                {errors.email && (
                  <p className="mt-1.5 text-xs text-danger-400">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-surface-800" htmlFor="signup-password">
                  Password
                </label>
                <div className="relative mt-2">
                  <input
                    id="signup-password"
                    type={showPassword ? 'text' : 'password'}
                    className={`glass-input !pr-11 ${errors.password ? '!border-danger/40' : ''}`}
                    placeholder="At least 8 characters"
                    autoComplete="new-password"
                    {...register('password', {
                      required: 'Password is required',
                      minLength: { value: 8, message: 'Min 8 characters' },
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-600 transition hover:text-white"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1.5 text-xs text-danger-400">{errors.password.message}</p>
                )}
                {/* Strength indicator */}
                {watchPassword && watchPassword.length > 0 && (
                  <div className="mt-2.5">
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div
                          key={i}
                          className="h-1 flex-1 rounded-full transition-all duration-300"
                          style={{
                            background: i < strength.score ? strength.color : 'rgba(255,255,255,0.06)',
                          }}
                        />
                      ))}
                    </div>
                    <p className="mt-1 text-xs font-medium" style={{ color: strength.color }}>
                      {strength.label}
                    </p>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-semibold text-surface-800" htmlFor="signup-confirm">
                  Confirm password
                </label>
                <input
                  id="signup-confirm"
                  type="password"
                  className={`glass-input mt-2 ${errors.confirmPassword ? '!border-danger/40' : ''}`}
                  placeholder="Repeat your password"
                  autoComplete="new-password"
                  {...register('confirmPassword', { required: 'Please confirm your password' })}
                />
                {errors.confirmPassword && (
                  <p className="mt-1.5 text-xs text-danger-400">{errors.confirmPassword.message}</p>
                )}
              </div>

              {/* Terms */}
              <label className="flex cursor-pointer items-start gap-3 text-sm text-surface-700">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-white/20 bg-white/5 accent-accent"
                />
                <span>
                  I agree to the{' '}
                  <a href="#" className="font-semibold text-accent-300 hover:text-accent-200">Terms of Service</a>
                  {' '}and{' '}
                  <a href="#" className="font-semibold text-accent-300 hover:text-accent-200">Privacy Policy</a>
                </span>
              </label>

              <button
                className="glow-button w-full !rounded-xl !py-3.5"
                type="submit"
                disabled={isAuthLoading || !agreedToTerms}
              >
                {isAuthLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Creating account…
                  </>
                ) : (
                  <>
                    Create account <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-surface-700">
              Already have an account?{' '}
              <Link
                className="font-semibold text-accent-300 transition hover:text-accent-200"
                to="/login"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
