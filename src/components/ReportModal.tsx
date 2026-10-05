import React, { useState } from 'react';
import { X, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { UserProfile } from '../types';
import { Translations, Language } from '../i18n/translations';

interface ReportModalProps {
  profile: UserProfile | null;
  onClose: () => void;
  t: Translations;
  lang: Language;
}

export const ReportModal: React.FC<ReportModalProps> = ({ profile, onClose, t, lang }) => {
  const [reason, setReason] = useState(t.reason1);
  const [details, setDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!profile) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#160e13] border border-[#d4af37]/35 rounded-3xl shadow-2xl shadow-black overflow-hidden my-6 p-6 text-left rtl:text-right">
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-rose-400">
            <AlertTriangle className="w-5 h-5" />
            <h3 className="font-serif font-semibold text-sm text-[#fff8f0]">
              {t.reportTitle}
            </h3>
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="text-center py-6 space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h4 className="font-serif text-base font-semibold text-[#f8ede8]">{t.reportRecorded}</h4>
            <p className="text-xs text-[#b8a4aa]">
              {t.reportRecordedDesc}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <p className="text-[#d6c4c9]">
              {t.concernedProfile} <strong className="text-[#fce0a2]">{profile.fullName}</strong>
            </p>

            <div>
              <label className="block text-zinc-400 mb-1">{t.mainReasonLabel}</label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#20131b] border border-[#d4af37]/25 text-xs text-[#f8ede8] focus:outline-none focus:border-[#d4af37] text-left rtl:text-right"
              >
                <option value={t.reason1}>{t.reason1}</option>
                <option value={t.reason2}>{t.reason2}</option>
                <option value={t.reason3}>{t.reason3}</option>
                <option value={t.reason4}>{t.reason4}</option>
              </select>
            </div>

            <div>
              <label className="block text-zinc-400 mb-1">{t.detailsLabel}</label>
              <textarea
                rows={3}
                placeholder={t.detailsPlaceholder}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#20131b] border border-[#d4af37]/25 text-xs text-[#f8ede8] focus:outline-none focus:border-[#d4af37] text-left rtl:text-right"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-zinc-700 text-zinc-300 hover:bg-zinc-800"
              >
                {t.cancelBtn}
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-medium shadow-md shadow-rose-900/30"
              >
                {t.submitReportBtn}
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
