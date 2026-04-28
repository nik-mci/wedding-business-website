import html2canvas from 'html2canvas';
import Groq from "groq-sdk";

const client = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true
});

console.log("Groq Key loaded:", 
  import.meta.env.VITE_GROQ_API_KEY ? "YES" : "NO - CHECK .env FILE"
);

// Selectors
const brideInput = document.getElementById('bride-name');
const groomInput = document.getElementById('groom-name');
const loveWordInput = document.getElementById('love-word');
const vibePills = document.querySelectorAll('.vibe-pill');
const generateBtn = document.getElementById('generate-hashtag');
const resultsArea = document.getElementById('hashtag-results');
const hashtagGrid = document.getElementById('hashtag-grid');
const regenerateBtn = document.getElementById('regenerate-btn');
const shareBtn = document.getElementById('share-btn');

// State
let selectedVibe = null;

// Vibe pill selection
vibePills.forEach(pill => {
  pill.addEventListener('click', () => {
    vibePills.forEach(p => {
      p.style.background = '#FDFAF5';
      p.style.color = '#9A8F7E';
      p.style.borderColor = '#EDE8DC';
    });
    pill.style.background = '#C9A234';
    pill.style.color = '#FFFFFF';
    pill.style.borderColor = '#C9A234';
    selectedVibe = pill.dataset.vibe;
  });
});

// Helper: Shake effect
const shake = (el) => {
  el.style.animation = 'shake 0.4s ease';
  el.style.borderColor = '#E87B3A';
  setTimeout(() => {
    el.style.animation = '';
  }, 400);
};

// Generate function
const generateHashtags = async () => {
  const bride = brideInput.value.trim();
  const groom = groomInput.value.trim();
  const loveWord = loveWordInput.value.trim();

  let hasError = false;
  if (!bride) { shake(brideInput); hasError = true; }
  if (!groom) { shake(groomInput); hasError = true; }
  if (!loveWord) { shake(loveWordInput); hasError = true; }
  if (!selectedVibe) { 
    vibePills.forEach(p => shake(p));
    hasError = true; 
  }

  if (hasError) return;

  // Loading state
  generateBtn.classList.add('btn-loading');
  generateBtn.innerText = 'Generating...';
  generateBtn.disabled = true;

  const prompt = `Generate 9 unique creative wedding hashtags for a couple.
Bride: ${bride}
Groom: ${groom}
Vibe: ${selectedVibe}
Word describing their love: ${loveWord}

Rules:
- Mix of combined names, wordplay, emotion
- Some English, 1-2 Hinglish
- CamelCase format #LikeThis
- Clever not generic
- Vary lengths short and long
- Return ONLY a valid JSON array of 9 strings
- No explanation, no markdown, no backticks, nothing else
Example output: ["#ForeverFernandez", "#EternallyHers"]`;

  try {
    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.9,
      max_tokens: 512,
      messages: [
        {
          role: "system",
          content: "You are a creative wedding hashtag generator. You return ONLY valid JSON arrays, nothing else."
        },
        {
          role: "user",
          content: prompt
        }
      ]
    });

    const text = completion.choices[0].message.content;
    console.log("Groq raw response:", text);

    const clean = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const hashtags = JSON.parse(clean);

    // Populate Grid
    hashtagGrid.innerHTML = '';
    hashtags.forEach(tag => {
      const item = document.createElement('div');
      item.className = 'hashtag-item';
      item.style.cssText = 'background: #FFFFFF; border: 1px solid #EDE8DC; border-radius: 6px; padding: 14px 20px; text-align: center;';
      item.innerHTML = `<span style="font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 20px; color: #1A1408;">${tag}</span>`;
      
      item.addEventListener('click', () => {
        navigator.clipboard.writeText(tag);
        const tooltip = document.createElement('div');
        tooltip.className = 'copy-tooltip';
        tooltip.innerText = 'Copied! ✓';
        item.appendChild(tooltip);
        setTimeout(() => tooltip.remove(), 1500);
        
        item.style.borderColor = '#C9A234';
        setTimeout(() => item.style.borderColor = '#EDE8DC', 1500);
      });

      hashtagGrid.appendChild(item);
    });

    // Show results
    resultsArea.style.display = 'block';
    resultsArea.scrollIntoView({ behavior: 'smooth' });

  } catch (error) {
    console.error("Groq error:", error);
    const errorMsg = document.createElement('p');
    errorMsg.style.color = '#E87B3A';
    errorMsg.style.fontSize = '12px';
    errorMsg.style.marginTop = '12px';
    errorMsg.innerText = 'Something went wrong, please try again.';
    generateBtn.parentNode.appendChild(errorMsg);
    setTimeout(() => errorMsg.remove(), 3000);
  } finally {
    generateBtn.classList.remove('btn-loading');
    generateBtn.innerText = 'Generate Our Hashtag ✦';
    generateBtn.disabled = false;
  }
};

// Listeners
generateBtn.addEventListener('click', generateHashtags);
regenerateBtn.addEventListener('click', generateHashtags);

shareBtn.addEventListener('click', () => {
  html2canvas(document.getElementById('hashtag-results')).then(canvas => {
    const link = document.createElement('a');
    link.download = 'vows-and-vedas-hashtags.png';
    link.href = canvas.toDataURL();
    link.click();
  });
});
