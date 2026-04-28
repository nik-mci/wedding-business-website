"use client";

import { useState } from 'react';
import Groq from "groq-sdk";
import html2canvas from 'html2canvas';

const client = new Groq({
  apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
  dangerouslyAllowBrowser: true
});

const HashtagGenerator = () => {
  const [formData, setFormData] = useState({ bride: '', groom: '', vibe: '', loveWord: '' });
  const [loading, setLoading] = useState(false);
  const [hashtags, setHashtags] = useState([]);
  const [error, setError] = useState('');

  const vibes = ['Royal', 'Romantic', 'Whimsical', 'Modern'];

  const generateHashtags = async () => {
    if (!formData.bride || !formData.groom || !formData.vibe || !formData.loveWord) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    const prompt = `Generate 9 unique creative wedding hashtags for a couple.
Bride: ${formData.bride}
Groom: ${formData.groom}
Vibe: ${formData.vibe}
Word describing their love: ${formData.loveWord}

Rules:
- Mix of combined names, wordplay, emotion
- Some English, 1-2 Hinglish
- CamelCase format #LikeThis
- Clever not generic
- Return ONLY a valid JSON array of 9 strings, no explanation, no markdown.`;

    try {
      const completion = await client.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        temperature: 0.9,
        messages: [
          { role: "system", content: "You return ONLY valid JSON arrays." },
          { role: "user", content: prompt }
        ]
      });

      const text = completion.choices[0].message.content;
      const clean = text.replace(/```json/g, "").replace(/```/g, "").trim();
      setHashtags(JSON.parse(clean));
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
    tooltip.className = 'absolute -top-8 left-1/2 -translate-x-1/2 bg-[var(--gold)] text-white px-2 py-1 rounded text-[10px] animate-fade-out';
    tooltip.innerText = 'Copied! ✓';
    e.currentTarget.appendChild(tooltip);
    setTimeout(() => tooltip.remove(), 1500);
  };

  const shareResults = () => {
    const el = document.getElementById('hashtag-results-card');
    html2canvas(el).then(canvas => {
      const link = document.createElement('a');
      link.download = 'vows-and-vedas-hashtags.png';
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  return (
    <section className="py-24 bg-gradient-to-b from-[#FFF3E0] to-[#FDFAF5]">
      <div className="max-w-[1200px] mx-auto text-center px-6">
        <p className="label !text-[var(--accent)] mb-2">Just For You</p>
        <h2 className="text-5xl mb-3">Create Your Wedding <em>Hashtag</em></h2>
        <p className="text-[var(--muted)] mb-6">Answer a few quick questions and we'll generate the perfect hashtag.</p>
        <div className="w-12 h-px bg-[var(--gold)] mx-auto mb-12"></div>

        <div className="max-w-[760px] mx-auto bg-white border border-[var(--border)] rounded-xl p-12 shadow-xl text-left">
          <div className="space-y-6">
            <div>
              <label className="label !text-[var(--muted)] !mb-2">Bride's First Name</label>
              <input 
                type="text" 
                className="w-full h-12 bg-[var(--bg)] border border-[var(--border)] rounded-md px-5 focus:border-[var(--gold)] outline-none transition-colors"
                value={formData.bride}
                onChange={(e) => setFormData({...formData, bride: e.target.value})}
              />
            </div>
            <div>
              <label className="label !text-[var(--muted)] !mb-2">Groom's First Name</label>
              <input 
                type="text" 
                className="w-full h-12 bg-[var(--bg)] border border-[var(--border)] rounded-md px-5 focus:border-[var(--gold)] outline-none transition-colors"
                value={formData.groom}
                onChange={(e) => setFormData({...formData, groom: e.target.value})}
              />
            </div>
            <div>
              <label className="label !text-[var(--muted)] !mb-3">Your Wedding Vibe</label>
              <div className="flex gap-3 flex-wrap">
                {vibes.map(v => (
                  <button 
                    key={v}
                    onClick={() => setFormData({...formData, vibe: v})}
                    className={`px-5 py-2 rounded-full text-xs font-body transition-all border ${formData.vibe === v ? 'bg-[var(--gold)] text-white border-[var(--gold)]' : 'bg-[var(--bg)] text-[var(--muted)] border-[var(--border)]'}`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="label !text-[var(--muted)] !mb-2">One Word Describing Your Love</label>
              <input 
                type="text" 
                placeholder="e.g. Eternal, Soulful..."
                className="w-full h-12 bg-[var(--bg)] border border-[var(--border)] rounded-md px-5 focus:border-[var(--gold)] outline-none transition-colors"
                value={formData.loveWord}
                onChange={(e) => setFormData({...formData, loveWord: e.target.value})}
              />
            </div>

            <button 
              onClick={generateHashtags}
              disabled={loading}
              className={`btn-primary w-full h-14 ${loading ? 'animate-pulse bg-[#B8935A]' : ''}`}
            >
              {loading ? 'Generating...' : 'Generate Our Hashtag ✦'}
            </button>
            
            {error && <p className="text-[var(--accent)] text-xs text-center">{error}</p>}
          </div>

          {hashtags.length > 0 && (
            <div id="hashtag-results-card" className="mt-8 pt-8 border-t border-[var(--border)] animate-in fade-in slide-in-from-bottom-5 duration-500">
              <p className="label !text-[var(--accent)] mb-4">Your Hashtags</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {hashtags.map((tag, i) => (
                  <div 
                    key={i} 
                    onClick={(e) => copyToClipboard(tag, e)}
                    className="relative bg-white border border-[var(--border)] rounded-md p-4 text-center cursor-pointer hover:border-[var(--gold)] hover:bg-[#FFFEF5] transition-all"
                  >
                    <span className="font-heading italic text-xl">{tag}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-center gap-3 mt-8">
                <button onClick={generateHashtags} className="btn-primary !px-6 !py-2 !text-[10px]">Regenerate →</button>
                <button onClick={shareResults} className="btn-outline !px-6 !py-2 !text-[10px]">Share Results</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HashtagGenerator;
