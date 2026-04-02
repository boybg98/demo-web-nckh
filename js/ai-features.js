// 🔑 Google Gemini API Key
const GEMINI_API_KEY = 'AIzaSyB9ZbtifHmBb33KZ_W_b9O_JT5S5KPNV_Ms';
const GEMINI_MODEL   = 'gemini-2.0-flash';
const GEMINI_URL     = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

// Chat history để duy trì ngữ cảnh hội thoại
let chatHistory = [];
async function callGemini(prompt, history = []) {
  const contents = [
    ...history,
    { role: 'user', parts: [{ text: prompt }] }
  ];

  const response = await fetch(GEMINI_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents,
      generationConfig: {
        temperature: 0.8,
        maxOutputTokens: 1024,
      }
    })
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err?.error?.message || `HTTP ${response.status}`);
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || '(Không có phản hồi)';
}

// ============================================================
//  FEATURE 1: Giải thích chuyên sâu một từ vựng
// ============================================================
async function explainWord(word, meaning, example) {
  switchTab('explain');
  openAIPanel();

  const resultEl = document.getElementById('explain-result');
  resultEl.innerHTML = `
    <div class="ai-loading">
      <div class="ai-spinner"></div>
      <span>Đang phân tích từ "<strong>${word}</strong>"...</span>
    </div>`;

  document.getElementById('explain-word-tag').textContent = word;

  const prompt = `Bạn là giáo viên tiếng Anh chuyên nghiệp. Hãy giải thích từ vựng tiếng Anh sau đây một cách chi tiết, dễ hiểu cho học sinh Việt Nam.

Từ: "${word}"
Nghĩa: "${meaning}"
Ví dụ gốc: "${example || 'Không có'}"

Hãy trả lời theo đúng cấu trúc Markdown sau (không thêm bớt gì khác):

## 📚 ${word}

**Phát âm (IPA):** /.../ — Gợi ý đọc: (viết cách đọc kiểu Việt cho dễ nhớ)

**Loại từ:** (danh từ / động từ / tính từ / v.v.)

**Nghĩa chính:** ${meaning}

**Giải thích ngữ cảnh:**
(2-3 câu giải thích khi nào dùng từ này, ai dùng, tình huống thực tế)

**3 Ví dụ câu thực tế:**
1. (câu ví dụ 1 — in đậm từ "${word}")
2. (câu ví dụ 2)
3. (câu ví dụ 3)

**Collocation (từ hay đi cùng):**
(liệt kê 3-5 cụm từ thường gặp với "${word}", VD: "make a decision", "take action")

**💡 Mẹo nhớ từ:**
(1 câu mẹo sáng tạo, hài hước hoặc hình ảnh để nhớ từ này lâu hơn)

Trả lời bằng tiếng Việt xen tiếng Anh, tự nhiên và thân thiện.`;

  try {
    const text = await callGemini(prompt);
    resultEl.innerHTML = markdownToHTML(text);
  } catch (e) {
    resultEl.innerHTML = `<div class="ai-error">❌ Lỗi: ${e.message}<br><small>Kiểm tra lại API key trong file <code>js/ai-features.js</code></small></div>`;
  }
}

// ============================================================
//  FEATURE 2: Tạo câu chuyện từ các từ trong chủ đề
// ============================================================
async function generateStory() {
  const resultEl = document.getElementById('story-result');
  const btn = document.getElementById('story-gen-btn');
  const topicSelect = document.getElementById('story-topic-select');

  const selectedTopic = topicSelect.value;
  if (!selectedTopic) {
    resultEl.innerHTML = `<div class="ai-error">⚠️ Vui lòng chọn chủ đề trước!</div>`;
    return;
  }

  // Thu thập từ vựng của chủ đề đó
  const words = [];
  const section = document.getElementById(selectedTopic);
  if (section) {
    section.querySelectorAll('.word').forEach(el => {
      const w = el.textContent.replace('🔊', '').trim();
      if (w) words.push(w);
    });
  }

  if (words.length === 0) {
    resultEl.innerHTML = `<div class="ai-error">⚠️ Không tìm thấy từ vựng trong chủ đề này!</div>`;
    return;
  }

  btn.disabled = true;
  btn.innerHTML = '<span class="ai-spinner-sm"></span> Đang tạo...';
  resultEl.innerHTML = `
    <div class="ai-loading">
      <div class="ai-spinner"></div>
      <span>AI đang viết câu chuyện với ${words.length} từ vựng...</span>
    </div>`;

  const topicNames = {
    body: 'Cơ thể người', professional: 'Nghề nghiệp',
    learning: 'Học tập', sport: 'Thể thao', computer: 'Máy tính'
  };

  const prompt = `Bạn là một nhà văn sáng tạo kiêm giáo viên tiếng Anh. Hãy viết một đoạn truyện ngắn thú vị, có nội dung liên quan đến chủ đề "${topicNames[selectedTopic]}" bằng cách kết hợp TẤT CẢ các từ tiếng Anh sau đây:

Danh sách từ: ${words.join(', ')}

Yêu cầu:
- Độ dài: khoảng 120-150 từ tiếng Anh
- Viết bằng tiếng Anh, sau đó dịch toàn bộ sang tiếng Việt
- Câu chuyện phải có nhân vật, tình huống rõ ràng, vui vẻ và dễ nhớ
- **In đậm** mỗi từ vựng trong danh sách khi xuất hiện trong truyện
- Cuối cùng liệt kê: "📝 Từ vựng sử dụng: [danh sách từ đã dùng]"

Định dạng:
### 🇬🇧 English Story:
(câu chuyện tiếng Anh)

### 🇻🇳 Bản dịch tiếng Việt:
(bản dịch)

### 📝 Từ vựng đã sử dụng:
(danh sách)`;

  try {
    const text = await callGemini(prompt);
    resultEl.innerHTML = markdownToHTML(text);
  } catch (e) {
    resultEl.innerHTML = `<div class="ai-error">❌ Lỗi: ${e.message}</div>`;
  } finally {
    btn.disabled = false;
    btn.innerHTML = '✨ Tạo câu chuyện mới';
  }
}

// ============================================================
//  FEATURE 3: Trợ lý chatbot học tập
// ============================================================
async function sendChatMessage() {
  const input = document.getElementById('chat-input');
  const chatBox = document.getElementById('chat-messages');
  const message = input.value.trim();

  if (!message) return;

  // Hiện tin nhắn người dùng
  appendChatMessage('user', message);
  input.value = '';
  input.disabled = true;

  // Hiện loading bubble
  const loadingId = 'loading-' + Date.now();
  chatBox.insertAdjacentHTML('beforeend', `
    <div class="chat-bubble ai" id="${loadingId}">
      <div class="chat-avatar">🤖</div>
      <div class="chat-text"><span class="ai-typing-dots"><span></span><span></span><span></span></span></div>
    </div>`);
  chatBox.scrollTop = chatBox.scrollHeight;

  const systemContext = `Bạn là "VocabAI" — trợ lý học tiếng Anh thân thiện, chuyên hỗ trợ học sinh Việt Nam.
Nhiệm vụ: Giải thích từ vựng, ngữ pháp, cách dùng từ trong ngữ cảnh thực tế.
Phong cách: Trả lời ngắn gọn, súc tích. Dùng song ngữ Việt-Anh. Dùng emoji vui vẻ. Tối đa 200 từ/câu trả lời.
Nếu câu hỏi không liên quan đến học tiếng Anh, nhẹ nhàng dẫn dắt về chủ đề học tập.`;

  const historyForApi = [
    { role: 'user', parts: [{ text: systemContext }] },
    { role: 'model', parts: [{ text: 'Xin chào! Tôi là VocabAI, trợ lý học tiếng Anh của bạn. Hỏi tôi bất cứ điều gì về từ vựng, ngữ pháp nhé! 😊' }] },
    ...chatHistory
  ];

  try {
    const reply = await callGemini(message, historyForApi);

    // Cập nhật chat history
    chatHistory.push(
      { role: 'user', parts: [{ text: message }] },
      { role: 'model', parts: [{ text: reply }] }
    );

    // Xóa loading và thêm reply
    document.getElementById(loadingId)?.remove();
    appendChatMessage('ai', reply);
  } catch (e) {
    document.getElementById(loadingId)?.remove();
    appendChatMessage('ai', `❌ Lỗi kết nối: ${e.message}. Kiểm tra API key nhé!`);
  } finally {
    input.disabled = false;
    input.focus();
  }
}

function appendChatMessage(role, text) {
  const chatBox = document.getElementById('chat-messages');
  const avatar = role === 'user' ? '🧑‍🎓' : '🤖';
  const html = `
    <div class="chat-bubble ${role}">
      <div class="chat-avatar">${avatar}</div>
      <div class="chat-text">${role === 'ai' ? markdownToHTML(text) : escapeHTML(text)}</div>
    </div>`;
  chatBox.insertAdjacentHTML('beforeend', html);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// ============================================================
//  UI CONTROLS: Panel, Tabs, Buttons
// ============================================================
function openAIPanel() {
  document.getElementById('ai-panel').classList.add('open');
  document.getElementById('ai-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeAIPanel() {
  document.getElementById('ai-panel').classList.remove('open');
  document.getElementById('ai-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

function switchTab(tabName) {
  document.querySelectorAll('.ai-tab-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.ai-tab-btn').forEach(el => el.classList.remove('active'));
  document.getElementById(`tab-${tabName}`)?.classList.add('active');
  document.querySelector(`.ai-tab-btn[data-tab="${tabName}"]`)?.classList.add('active');
}

// Chat: gửi bằng Enter
function chatInputKeydown(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendChatMessage();
  }
}

// Reset chat
function clearChat() {
  chatHistory = [];
  const chatBox = document.getElementById('chat-messages');
  chatBox.innerHTML = `
    <div class="chat-bubble ai">
      <div class="chat-avatar">🤖</div>
      <div class="chat-text">Xin chào! Tôi là <strong>VocabAI</strong> 👋<br>Bạn muốn hỏi về từ vựng hay ngữ pháp nào? Tôi luôn sẵn sàng giúp đỡ! 😊</div>
    </div>`;
}

// ============================================================
//  UTILITY: Markdown → HTML (mini renderer)
// ============================================================
function markdownToHTML(text) {
  return text
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    // Headers
    .replace(/^### (.+)$/gm, '<h4>$1</h4>')
    .replace(/^## (.+)$/gm, '<h3>$1</h3>')
    .replace(/^# (.+)$/gm, '<h2>$1</h2>')
    // Bold & Italic
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Unordered list
    .replace(/^[-•] (.+)$/gm, '<li>$1</li>')
    // Ordered list
    .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
    // Code
    .replace(/`(.+?)`/g, '<code>$1</code>')
    // Line breaks → paragraphs
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>')
    .replace(/^/, '<p>')
    .replace(/$/, '</p>')
    // Wrap consecutive <li> in <ul>
    .replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>')
    // Fix doubled <p> wrapping around block elements
    .replace(/<p>(<h[234]>)/g, '$1')
    .replace(/(<\/h[234]>)<\/p>/g, '$1')
    .replace(/<p>(<ul>)/g, '$1')
    .replace(/(<\/ul>)<\/p>/g, '$1')
    .replace(/<p><\/p>/g, '');
}

function escapeHTML(text) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// ============================================================
//  INIT: Thêm nút "✨ Giải thích" vào mỗi flashcard (flashcard-back)
// ============================================================
function addExplainButtons() {
  document.querySelectorAll('.flashcard').forEach(card => {
    if (card.querySelector('.btn-ai-explain')) return; // Tránh thêm 2 lần

    const wordEl = card.querySelector('.word');
    const meaningEl = card.querySelector('.meaning');
    const exampleEl = card.querySelector('.example');

    if (!wordEl || !meaningEl) return;

    const word    = wordEl.textContent.replace('🔊', '').trim();
    const meaning = meaningEl.textContent.trim();
    const example = exampleEl ? exampleEl.textContent.replace('🔊', '').trim() : '';

    const btn = document.createElement('button');
    btn.className = 'btn-ai-explain';
    btn.innerHTML = '✨ Giải thích AI';
    btn.title = `Phân tích chuyên sâu từ "${word}"`;
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      explainWord(word, meaning, example);
    });

    const btnGroup = card.querySelector('.button-group');
    if (btnGroup) {
      btnGroup.insertBefore(btn, btnGroup.firstChild);
    }
  });
}

// Chạy sau khi DOM + 3D flip transformation hoàn tất
window.addEventListener('load', () => {
  // Chờ 3D flip init xong (trong main.js DOMContentLoaded)
  setTimeout(addExplainButtons, 300);
});

// Expose globally
window.openAIPanel  = openAIPanel;
window.closeAIPanel = closeAIPanel;
window.switchTab    = switchTab;
window.explainWord  = explainWord;
window.generateStory = generateStory;
window.sendChatMessage = sendChatMessage;
window.chatInputKeydown = chatInputKeydown;
window.clearChat    = clearChat;
