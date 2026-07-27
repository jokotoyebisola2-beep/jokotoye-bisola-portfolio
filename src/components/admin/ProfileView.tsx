import React, { useState } from 'react';
import { User, Lock, Save, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const ProfileView: React.FC = () => {
  const { currentUser, updateAdminProfile, updateAdminPassword } = useAuth();

  const [displayName, setDisplayName] = useState(currentUser?.displayName || 'Jokotoye Bisola');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (displayName !== currentUser?.displayName) {
        await updateAdminProfile(displayName);
      }

      if (newPassword) {
        if (newPassword !== confirmPassword) {
          setMessage({ type: 'error', text: 'Passwords do not match.' });
          setLoading(false);
          return;
        }
        if (newPassword.length < 6) {
          setMessage({ type: 'error', text: 'Password must be at least 6 characters.' });
          setLoading(false);
          return;
        }
        await updateAdminPassword(newPassword);
        setNewPassword('');
        setConfirmPassword('');
      }

      setMessage({ type: 'success', text: 'Profile & security credentials updated successfully!' });
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Failed to update profile.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      
      {/* Header */}
      <div className="pb-4 border-b border-slate-800">
        <h1 className="text-2xl font-extrabold text-white tracking-tight">Admin Profile</h1>
        <p className="text-xs text-slate-400">
          Manage your account credentials and security settings for JB Studio CMS.
        </p>
      </div>

      <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 sm:p-8">
        
        {message && (
          <div
            className={`mb-6 p-4 rounded-xl border text-xs flex items-center gap-2.5 ${
              message.type === 'success'
                ? 'bg-emerald-950/80 border-emerald-800 text-emerald-300'
                : 'bg-red-950/80 border-red-800 text-red-300'
            }`}
          >
            {message.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            )}
            <span>{message.text}</span>
          </div>
        )}

        <form onSubmit={handleUpdateProfile} className="space-y-5">
          
          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">
              Display Name
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">
              Admin Email
            </label>
            <input
              type="email"
              value={currentUser?.email || 'jokotoyebisola2@gmail.com'}
              disabled
              className="w-full px-3.5 py-2.5 bg-slate-900/50 border border-slate-800/80 rounded-xl text-sm text-slate-500 cursor-not-allowed"
            />
            <span className="text-[10px] text-slate-500 mt-1 block">
              Email is tied to your Firebase Admin Authentication account.
            </span>
          </div>

          <div className="pt-4 border-t border-slate-800 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#60A5FA]">
              Change Password (Optional)
            </h2>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Leave blank to keep current password"
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-[#2563EB] hover:bg-blue-600 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-lg shadow-blue-900/30"
            >
              <Save className="w-4 h-4" />
              <span>{loading ? 'Saving...' : 'Update Account'}</span>
            </button>
          </div>

        </form>

      </div>

    </div>
  );
};
