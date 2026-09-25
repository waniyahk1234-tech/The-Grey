import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, KeyRound, AlertCircle, ArrowLeft, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface LoginModalProps {
  onSuccess?: () => void;
  isOpen?: boolean;
}

export const LoginModal: React.FC<LoginModalProps> = ({ onSuccess, isOpen = true }) => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      const success = login(passcode);
      if (success) {
        if (onSuccess) {
          onSuccess();
        }
      } else {
        setError('Incorrect authorization key. Access denied.');
      }
      setIsLoading(false);
    }, 250);
  };

  const handleReturnHome = () => {
    navigate('/');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Staff Authentication Modal"
      className="fixed inset-0 z-50 bg-[#0C0D0F]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in"
    >
      <div className="max-w-md w-full bg-[#14161A] border border-white/10 shadow-2xl p-8 sm:p-10 relative">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C5A880] to-transparent" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/5">
          <div className="flex items-center gap-2.5 text-xs uppercase tracking-[0.25em] text-[#C5A880] font-medium">
            <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
            <span>Staff Portal Access</span>
          </div>
          <span className="text-[11px] font-mono text-[#8E8D8A]">Nathia Gali</span>
        </div>

        <div className="mb-6">
          <h2 className="font-serif text-2xl sm:text-3xl text-[#F5F3EF] mb-2 tracking-tight">
            Security Verification
          </h2>
          <p className="text-xs text-[#8E8D8A] font-light leading-relaxed">
            Enter management passcode to access administrative controls.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="modalPasscode" className="block text-xs uppercase tracking-wider text-[#8E8D8A] mb-2 font-medium">
              Management Passcode
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-[#8E8D8A] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="modalPasscode"
                type="password"
                required
                autoFocus
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  if (error) setError('');
                }}
                placeholder="••••••••••••"
                className={`w-full bg-[#0C0D0F] border pl-10 pr-4 py-3 text-sm text-[#F5F3EF] placeholder-[#555] focus-visible:outline-none transition-colors ${
                  error
                    ? 'border-rose-500/80 focus-visible:border-rose-500'
                    : 'border-white/10 focus-visible:border-[#C5A880]'
                }`}
              />
            </div>
            {error && (
              <div className="flex items-start gap-2 text-rose-400 text-xs mt-2 animate-fade-in">
                <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-[#C5A880] text-[#0C0D0F] hover:bg-[#D8BD97] disabled:opacity-50 text-xs uppercase tracking-[0.2em] font-semibold transition-colors flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <span>Verifying...</span>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  <span>Authenticate & Enter</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Modal Footer */}
        <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-xs text-[#8E8D8A]">
          <button
            type="button"
            onClick={handleReturnHome}
            className="inline-flex items-center gap-1.5 hover:text-[#F5F3EF] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Site</span>
          </button>
          <span className="text-[11px] text-[#555]">Authorized Personnel Only</span>
        </div>
      </div>
    </div>
  );
};
