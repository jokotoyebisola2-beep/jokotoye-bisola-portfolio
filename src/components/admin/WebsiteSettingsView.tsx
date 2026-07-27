import React, { useState, useEffect } from 'react';
import { Save, CheckCircle2, Globe, Phone, Mail, Image, FileText } from 'lucide-react';
import { cmsService } from '../../lib/cmsService';
import { WebsiteSettings } from '../../types';

export const WebsiteSettingsView: React.FC = () => {
  const [settings, setSettings] = useState<WebsiteSettings>({
    heroHeadline: '',
    heroSubheadline: '',
    professionalTitle: '',
    brandStatement: '',
    whatsappNumber: '',
    email: '',
    logoUrl: '',
    profilePhotoUrl: '',
    resumeUrl: '',
    footerText: '',
    socialLinks: {
      github: '',
      linkedin: '',
      twitter: '',
    },
  });

  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    cmsService.getSettings().then((res) => {
      if (res) {
        setSettings((prev) => ({
          ...prev,
          ...res,
          socialLinks: {
            github: res?.socialLinks?.github || '',
            linkedin: res?.socialLinks?.linkedin || '',
            twitter: res?.socialLinks?.twitter || '',
          },
        }));
      }
    }).catch(err => {
      setErrorMessage(`Failed to load settings: ${err instanceof Error ? err.message : String(err)}`);
    });

    const unsub = cmsService.subscribeSettings((res) => {
      if (res) {
        setSettings((prev) => ({
          ...prev,
          ...res,
          socialLinks: {
            github: res?.socialLinks?.github || '',
            linkedin: res?.socialLinks?.linkedin || '',
            twitter: res?.socialLinks?.twitter || '',
          },
        }));
      }
    }, (err) => {
      setErrorMessage(`Firestore settings sync warning: ${err instanceof Error ? err.message : String(err)}`);
    });
    return unsub;
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMessage('');
    try {
      await cmsService.saveSettings(settings);
      setSaveSuccess('✓ Website settings saved to Firestore & published!');
      setTimeout(() => setSaveSuccess(''), 4000);
    } catch (err) {
      console.error('Error saving settings:', err);
      setErrorMessage(`Firestore write failed: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Website Manager</h1>
          <p className="text-xs text-slate-400">
            Control headlines, brand text, assets, and contact details across the live website.
          </p>
        </div>
        {saveSuccess && (
          <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-3.5 py-1.5 rounded-xl">
            {saveSuccess}
          </span>
        )}
      </div>

      {errorMessage && (
        <div className="p-4 rounded-xl bg-red-950/80 border border-red-800 text-red-200 text-xs font-medium flex items-center justify-between">
          <span>{errorMessage}</span>
          <button type="button" onClick={() => setErrorMessage('')} className="text-red-400 hover:text-white text-xs font-bold ml-4">
            Dismiss
          </button>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8 bg-slate-950/80 border border-slate-800 rounded-2xl p-6 sm:p-8">
        
        {/* Section: Hero Copy */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#60A5FA]">
            1. Hero & Branding Copy
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                Professional Title
              </label>
              <input
                type="text"
                value={settings.professionalTitle || ''}
                onChange={(e) => setSettings({ ...settings, professionalTitle: e.target.value })}
                placeholder="AI Product Engineer & UI/UX Designer"
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                Brand Statement
              </label>
              <input
                type="text"
                value={settings.brandStatement || ''}
                onChange={(e) => setSettings({ ...settings, brandStatement: e.target.value })}
                placeholder="Helping businesses grow through smart design..."
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
              Main Hero Heading
            </label>
            <input
              type="text"
              value={settings.heroHeadline || ''}
              onChange={(e) => setSettings({ ...settings, heroHeadline: e.target.value })}
              placeholder="I build websites and AI tools that help businesses grow."
              className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
              Hero Subheading
            </label>
            <textarea
              rows={2}
              value={settings.heroSubheadline || ''}
              onChange={(e) => setSettings({ ...settings, heroSubheadline: e.target.value })}
              placeholder="I create websites, web apps, and AI solutions..."
              className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white"
            />
          </div>
        </div>

        {/* Section: Brand Assets & Media */}
        <div className="pt-6 border-t border-slate-800 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#60A5FA]">
            2. Brand Assets & Media
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                Profile Photo URL
              </label>
              <input
                type="text"
                value={settings.profilePhotoUrl || ''}
                onChange={(e) => setSettings({ ...settings, profilePhotoUrl: e.target.value })}
                placeholder="https://..."
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                Logo URL (Optional)
              </label>
              <input
                type="text"
                value={settings.logoUrl || ''}
                onChange={(e) => setSettings({ ...settings, logoUrl: e.target.value })}
                placeholder="https://..."
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
              Resume / CV File Link
            </label>
            <input
              type="text"
              value={settings.resumeUrl || ''}
              onChange={(e) => setSettings({ ...settings, resumeUrl: e.target.value })}
              placeholder="https://drive.google.com/... or media library link"
              className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white"
            />
          </div>
        </div>

        {/* Section: Contact & Social Links */}
        <div className="pt-6 border-t border-slate-800 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#60A5FA]">
            3. Contact Details & Social Links
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                WhatsApp Number
              </label>
              <input
                type="text"
                value={settings.whatsappNumber || ''}
                onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                placeholder="2349033467029"
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={settings.email || ''}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                placeholder="jokotoyebisola2@gmail.com"
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                GitHub Profile URL
              </label>
              <input
                type="text"
                value={settings.socialLinks?.github || ''}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, github: e.target.value },
                  })
                }
                placeholder="https://github.com/..."
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                LinkedIn Profile URL
              </label>
              <input
                type="text"
                value={settings.socialLinks?.linkedin || ''}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, linkedin: e.target.value },
                  })
                }
                placeholder="https://linkedin.com/in/..."
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                Twitter / X Profile URL
              </label>
              <input
                type="text"
                value={settings.socialLinks?.twitter || ''}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, twitter: e.target.value },
                  })
                }
                placeholder="https://x.com/..."
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white"
              />
            </div>
          </div>
        </div>

        {/* Section: Footer Text */}
        <div className="pt-6 border-t border-slate-800 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#60A5FA]">
            4. Footer Text
          </h2>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
              Footer Copyright / Brand Text
            </label>
            <input
              type="text"
              value={settings.footerText || ''}
              onChange={(e) => setSettings({ ...settings, footerText: e.target.value })}
              placeholder="© 2026 Jokotoye Bisola. All rights reserved."
              className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-6 border-t border-slate-800 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 rounded-xl bg-[#2563EB] hover:bg-blue-600 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-lg shadow-blue-900/30"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Publishing Changes...' : 'Save & Publish to Website'}</span>
          </button>
        </div>

      </form>

    </div>
  );
};
