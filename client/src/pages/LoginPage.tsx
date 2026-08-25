import { useState } from 'react';
import { ArrowRight, Eye, EyeOff, KeyRound, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import GradientMesh from '@/components/GradientMesh';
import { useAppStore } from '@/store/useAppStore';

const loginSchema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, isAuthLoading, authError, clearAuthError } = useAppStore();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data: LoginForm) => {
    clearAuthError();
    const parsed = loginSchema.safeParse(data);
    if (!parsed.success) return;
    const success = await login(parsed.data.email, parsed.data.password);
    if (success) navigate('/');
  };

  return (
    <div className="relative min-h-[calc(100vh-72px)]">
      <div className="grid min-h-[calc(100vh-72px)] lg:grid-cols-2">
        {/* Left: Visual panel */}
        <div className="relative hidden items-center justify-center overflow-hidden lg:flex">
          <GradientMesh />
          <div className="relative z-10 max-w-md px-12">
            <p className="eyebrow">Welcome back</p>
            <h1 className="display mt-5 text-5xl leading-[1.1] xl:text-6xl">
              Return to the work{' '}
              <span className="gradient-text">worth keeping</span>
            </h1>
            <p className="mt-6 text-base leading-7 text-surface-700">
              Your purchased prompts, saved ideas, and creator workspace all live on your shelf.
            </p>

            {/* Floating testimonial */}
            <div className="mt-10 glass-card-static rounded-xl p-5">
              <p className="text-sm leading-6 text-surface-800 italic">
                "PromptForge changed how I approach AI. The quality of prompts here is unmatched."
              </p>
              <div className="mt-3 flex items-center gap-2.5">
                <span
                  className="flex h-7 w-7 items-center justify-center rounded-full text-[0.6rem] font-bold text-white"
                  style={{ background: 'linear-gradient(135deg, #7c3aed, #06b6d4)' }}
                >
                  A
                </span>
                <span className="text-xs font-medium text-surface-700">Alex M. · Product Designer</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Form panel */}
        <div className="flex items-center justify-center px-5 py-12">
          <div className="w-full max-w-md">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-2xl"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #06b6d4)' }}
            >
              <KeyRound className="h-6 w-6 text-white" />
            </div>
            <h1 className="display mt-6 text-3xl sm:text-4xl">Sign in</h1>
            <p className="mt-2 text-sm text-surface-700">Enter your account details to access your shelf.</p>

            {/* Error */}
            {authError && (
              <div className="mt-5 rounded-xl border border-danger/20 bg-danger/5 px-4 py-3 text-sm text-danger-400">
                {authError}
              </div>
            )}

            <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="block text-sm font-semibold text-surface-800" htmlFor="login-email">
                  Email
                </label>
                <input
                  id="login-email"
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

              <div>
                <label className="block text-sm font-semibold text-surface-800" htmlFor="login-password">
                  Password
                </label>
                <div className="relative mt-2">
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    className={`glass-input !pr-11 ${errors.password ? '!border-danger/40' : ''}`}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    {...register('password', { required: 'Password is required' })}
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
              </div>

              <button
                className="glow-button w-full !rounded-xl !py-3.5"
                type="submit"
                disabled={isAuthLoading}
              >
                {isAuthLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Signing in…
                  </>
                ) : (
                  <>
                    Continue <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-surface-700">
              New here?{' '}
              <Link
                className="font-semibold text-accent-300 transition hover:text-accent-200"
                to="/register"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
