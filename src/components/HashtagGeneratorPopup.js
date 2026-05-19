"use client";

import { useState, useEffect } from 'react';
import html2canvas from 'html2canvas';

const HashtagGeneratorPopup = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ bride: '', groom: '', vibe: '', loveWord: '' });
  const [loading, setLoading] = useState(false);
  const [hashtags, setHashtags] = useState([]);
  const [error, setError] = useState('');

  const vibes = ['Royal', 'Romantic', 'Whimsical', 'Modern'];

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const generateHashtags = async () => {
    if (!formData.bride || !formData.groom || !formData.vibe || !formData.loveWord) {
      setError('Please fill in all fields');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/hashtags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      const { hashtags } = await res.json();
      setHashtags(hashtags);
    } catch (err) {
      console.error(err);
      setError('Something went wrong, please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (tag, e) => {
    navigator.clipboard.writeText(tag);
    const tooltip = document.createElement('div');
    tooltip.className = 'absolute -top-8 left-1/2 -translate-x-1/2 bg-[#C9A234] text-white px-2 py-1 rounded text-[10px]';
    tooltip.innerText = 'Copied! ✓';
    e.currentTarget.appendChild(tooltip);
    setTimeout(() => tooltip.remove(), 1500);
  };

  const shareResults = () => {
    const el = document.getElementById('hashtag-results-card-popup');
    html2canvas(el).then(canvas => {
      const link = document.createElement('a');
      link.download = 'vows-and-vedas-hashtags.png';
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  return (
    <>
      {/* Floating Left Tab Button */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open Wedding Hashtag Generator"
        className="fixed left-0 top-1/2 -translate-y-1/2 z-40 group flex flex-col items-center gap-0 focus:outline-none"
        style={{ filter: 'drop-shadow(2px 0 18px rgba(201,162,52,0.18))' }}
      >
        {/* Tab body */}
        <div
          className="relative flex flex-col items-center justify-center bg-[#0E0E0E] border border-l-0 border-gold/40 group-hover:border-gold/80 transition-all duration-500"
          style={{
            width: '36px',
            paddingTop: '56px',
            paddingBottom: '56px',
            borderRadius: '0 10px 10px 0',
            background: 'linear-gradient(180deg, #0E0E0E 0%, #1a1408 100%)',
          }}
        >
          {/* Top diamond ornament */}
          <span className="absolute top-4 left-1/2 -translate-x-1/2 text-gold/70 group-hover:text-gold transition-colors duration-300" style={{ fontSize: '10px', lineHeight: 1 }}>◆</span>

          {/* Vertical label */}
          <span
            className="text-gold/80 group-hover:text-gold transition-colors duration-300 font-body uppercase tracking-[0.35em] select-none"
            style={{
              fontSize: '9px',
              writingMode: 'vertical-rl',
              textOrientation: 'mixed',
              transform: 'rotate(180deg)',
              letterSpacing: '0.35em',
            }}
          >
            #Hashtag
          </span>

          {/* Bottom diamond ornament */}
          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-gold/70 group-hover:text-gold transition-colors duration-300" style={{ fontSize: '10px', lineHeight: 1 }}>◆</span>

          {/* Gold left-edge accent line that grows on hover */}
          <span
            className="absolute left-0 top-[20%] w-[2px] bg-gold/60 group-hover:bg-gold group-hover:top-[10%] group-hover:h-[80%] transition-all duration-500 rounded-r"
            style={{ height: '60%' }}
          />
        </div>
      </button>

      {/* Modal Overlay */}
      {open && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-ink/75 backdrop-blur-sm" onClick={() => setOpen(false)} />

          {/* Modal Panel */}
          <div className="relative z-10 w-full max-w-[700px] max-h-[90vh] overflow-y-auto bg-[#FDFAF5] border border-gold/30 shadow-[0_0_60px_rgba(201,162,52,0.12)]" style={{ borderRadius: '2px' }}>
            {/* Modal Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between px-8 py-5 bg-[#FDFAF5] border-b border-[#EDE8DC]">
              <div className="flex items-center gap-3">
                <span className="text-gold text-sm">◆</span>
                <p className="font-body uppercase tracking-[0.3em] text-[10px] text-[#9A8F7E]">Vows & Vedas</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-[#9A8F7E] hover:text-ink transition-colors duration-200 font-body text-xs uppercase tracking-widest flex items-center gap-2"
              >
                Close <span className="text-base leading-none">×</span>
              </button>
            </div>

            {/* Modal Content */}
            <div className="px-8 pb-10 pt-8 text-center">
              <p className="font-body uppercase text-[#C9A234] tracking-[0.5em] text-[10px] mb-3">Just For You</p>
              <h2 className="font-heading font-light text-3xl text-ink mb-2">
                Create Your Wedding <em className="italic">Hashtag</em>
              </h2>
              <p className="text-[#9A8F7E] font-body font-light text-[13px] mb-6">Answer a few quick questions and we'll generate the perfect hashtag.</p>
              <div className="w-10 h-px bg-gold mx-auto mb-8" />

              <div className="text-left space-y-5">
                <div>
                  <label className="block font-body uppercase text-[#9A8F7E] text-[10px] tracking-[0.2em] mb-2">Bride's First Name</label>
                  <input
                    type="text"
                    className="w-full h-11 bg-white border border-[#EDE8DC] px-4 focus:border-[#C9A234] outline-none transition-colors font-body text-[14px] text-ink"
                    style={{ borderRadius: '2px' }}
                    value={formData.bride}
                    onChange={(e) => setFormData({ ...formData, bride: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block font-body uppercase text-[#9A8F7E] text-[10px] tracking-[0.2em] mb-2">Groom's First Name</label>
                  <input
                    type="text"
                    className="w-full h-11 bg-white border border-[#EDE8DC] px-4 focus:border-[#C9A234] outline-none transition-colors font-body text-[14px] text-ink"
                    style={{ borderRadius: '2px' }}
                    value={formData.groom}
                    onChange={(e) => setFormData({ ...formData, groom: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block font-body uppercase text-[#9A8F7E] text-[10px] tracking-[0.2em] mb-3">Your Wedding Vibe</label>
                  <div className="flex gap-2 flex-wrap">
                    {vibes.map(v => (
                      <button
                        key={v}
                        onClick={() => setFormData({ ...formData, vibe: v })}
                        className={`px-5 py-2 text-[11px] font-body uppercase tracking-widest transition-all border ${formData.vibe === v ? 'bg-[#C9A234] text-white border-[#C9A234]' : 'bg-white text-[#9A8F7E] border-[#EDE8DC] hover:border-[#C9A234]'}`}
                        style={{ borderRadius: '2px' }}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block font-body uppercase text-[#9A8F7E] text-[10px] tracking-[0.2em] mb-2">One Word Describing Your Love</label>
                  <input
                    type="text"
                    placeholder="e.g. Eternal, Soulful…"
                    className="w-full h-11 bg-white border border-[#EDE8DC] px-4 focus:border-[#C9A234] outline-none transition-colors font-body text-[14px] text-ink placeholder:text-[#C5BCAF]"
                    style={{ borderRadius: '2px' }}
                    value={formData.loveWord}
                    onChange={(e) => setFormData({ ...formData, loveWord: e.target.value })}
                  />
                </div>

                <button
                  onClick={generateHashtags}
                  disabled={loading}
                  className={`w-full h-12 bg-[#C9A234] text-white font-body uppercase tracking-[0.3em] text-[11px] transition-all duration-300 hover:bg-[#b8922e] ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  style={{ borderRadius: '2px' }}
                >
                  {loading ? 'Generating…' : 'Generate Our Hashtag ✦'}
                </button>

                {error && <p className="text-[#E87B3A] text-xs text-center">{error}</p>}
              </div>

              {hashtags.length > 0 && (
                <div id="hashtag-results-card-popup" className="mt-8 pt-8 border-t border-[#EDE8DC]">
                  <p className="font-body uppercase text-[#C9A234] tracking-[0.5em] text-[10px] mb-5 text-center">Your Hashtags</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {hashtags.map((tag, i) => (
                      <div
                        key={i}
                        onClick={(e) => copyToClipboard(tag, e)}
                        className="relative bg-white border border-[#EDE8DC] p-4 text-center cursor-pointer hover:border-[#C9A234] hover:bg-[#FDFAF5] transition-all"
                        style={{ borderRadius: '2px' }}
                      >
                        <span className="font-heading italic text-lg text-ink">{tag}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center gap-3 mt-6">
                    <button
                      onClick={generateHashtags}
                      className="px-6 py-3 bg-[#C9A234] text-white font-body uppercase tracking-widest text-[10px] hover:bg-[#b8922e] transition-colors"
                      style={{ borderRadius: '2px' }}
                    >
                      Regenerate →
                    </button>
                    <button
                      onClick={shareResults}
                      className="px-6 py-3 border border-[#C9A234] text-[#C9A234] font-body uppercase tracking-widest text-[10px] hover:bg-[#C9A234] hover:text-white transition-all"
                      style={{ borderRadius: '2px' }}
                    >
                      Save as Image
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HashtagGeneratorPopup;
