const fs = require('fs');

// Updates for main.js -------------------------
try {
  let mainJs = fs.readFileSync('js/main.js', 'utf8');
  mainJs = mainJs.replace(/answer5: "A"(,\s*)q1: "head", q2: "ear", q3: "face", q4: "stomach", q5: "mouth"/g,
    `answer5: "A"$1q1: "head", q2: "ear", q3: "face", q4: "stomach", q5: "mouth",\n      q6: "hand", q7: "leg", q8: "foot", q9: "arm", q10: "nose"`);
  mainJs = mainJs.replace(/answer5: "A"(,\s*)q1: "doctor", q2: "teacher", q3: "police", q4: "worker", q5: "driver"/g,
    `answer5: "A"$1q1: "doctor", q2: "teacher", q3: "police", q4: "worker", q5: "driver",\n      q6: "engineer", q7: "nurse", q8: "actor", q9: "pilot", q10: "chef"`);
  mainJs = mainJs.replace(/answer5: "A"(,\s*)q1: "study", q2: "comment", q3: "train", q4: "copy", q5: "read"/g,
    `answer5: "A"$1q1: "study", q2: "comment", q3: "train", q4: "copy", q5: "read",\n      q6: "write", q7: "listen", q8: "speak", q9: "practice", q10: "homework"`);
  mainJs = mainJs.replace(/answer5: "A"(,\s*)q1: "athletics", q2: "championship", q3: "gold-medal", q4: "contest", q5: "semi-final"/g,
    `answer5: "A"$1q1: "athletics", q2: "championship", q3: "gold-medal", q4: "contest", q5: "semi-final",\n      q6: "football", q7: "swimmer", q8: "tennis", q9: "stadium", q10: "coach"`);
  mainJs = mainJs.replace(/answer5: "D"(,\s*)q1: "keyboard", q2: "compiler", q3: "decoder", q4: "flowchart", q5: "data"/g,
    `answer5: "D"$1q1: "keyboard", q2: "compiler", q3: "decoder", q4: "flowchart", q5: "data",\n      q6: "mouse", q7: "screen", q8: "hardware", q9: "software", q10: "network"`);
  
  mainJs = mainJs.replace(/(\/\/\s*Chấm điền từ\s*)for\s*\(\s*let\s+i\s*=\s*1;\s*i\s*<=\s*5;\s*i\+\+\s*\)/g,
    `$1for (let i = 1; i <= 10; i++)`);
  fs.writeFileSync('js/main.js', mainJs, 'utf8');
} catch(e) { console.log(e); }

// Updates for index.html ----------------------
const indexData = {
  body: [
    {word: "hand", meaning: "bàn tay", ex: "Wash your hands before eating"},
    {word: "leg", meaning: "cẳng chân", ex: "He broke his leg while skiing"},
    {word: "foot", meaning: "bàn chân", ex: "My left foot hurts"},
    {word: "arm", meaning: "cánh tay", ex: "She held the baby in her arms"},
    {word: "nose", meaning: "cái mũi", ex: "He has a runny nose"}
  ],
  professional: [
    {word: "engineer", meaning: "kỹ sư", ex: "The engineer designed the bridge"},
    {word: "nurse", meaning: "y tá", ex: "The nurse gave me Medicine"},
    {word: "actor", meaning: "diễn viên", ex: "He is a famous actor"},
    {word: "pilot", meaning: "phi công", ex: "The pilot flew the plane"},
    {word: "chef", meaning: "đầu bếp", ex: "The chef cooked a delicious meal"}
  ],
  learning: [
    {word: "write", meaning: "viết", ex: "Write your name here"},
    {word: "listen", meaning: "nghe", ex: "Listen to the teacher"},
    {word: "speak", meaning: "nói", ex: "Speak English every day"},
    {word: "practice", meaning: "thực hành", ex: "Practice makes perfect"},
    {word: "homework", meaning: "bài tập về nhà", ex: "I have a lot of homework"}
  ],
  sport: [
    {word: "football", meaning: "bóng đá", ex: "I love playing football"},
    {word: "swimmer", meaning: "vận động viên bơi", ex: "He is a fast swimmer"},
    {word: "tennis", meaning: "quần vợt", ex: "Let's play tennis"},
    {word: "stadium", meaning: "sân vận động", ex: "The stadium is full"},
    {word: "coach", meaning: "huấn luyện viên", ex: "The coach trained the team"}
  ],
  computer: [
    {word: "mouse", meaning: "chuột máy tính", ex: "Click the mouse"},
    {word: "screen", meaning: "màn hình", ex: "Look at the screen"},
    {word: "hardware", meaning: "phần cứng", ex: "Computer hardware includes the monitor and keyboard"},
    {word: "software", meaning: "phần mềm", ex: "You need to install the software"},
    {word: "network", meaning: "mạng máy tính", ex: "Connect to the network"}
  ]
};

try {
  let html = fs.readFileSync('index.html', 'utf8');
  for (let section in indexData) {
    let listStr = "";
    indexData[section].forEach(w => {
      // Escape single quotes for inline JS function parameters safely
      let escapedEx = w.ex.replace(/'/g, "\\'");
      let escapedWord = w.word.replace(/'/g, "\\'");
      
      listStr += `          <li>
            <div class="flashcard-container">
              <div class="flashcard">
                <div class="word">${w.word} <button onclick="speakWord('${escapedWord}')">🔊</button></div>
                <div class="meaning">${w.meaning}</div>
                <div class="example"><em>${w.ex}.</em><button onclick="speakWord('${escapedEx}')">🔊</button></div>
                <span class="button-group">
                  <button class="btn-remember" data-section="${section}">Đã nhớ</button>
                  <button class="btn-review" data-section="${section}">Ôn lại</button>
                </span>
              </div>
            </div>
          </li>\n`;
    });
    
    const regex = new RegExp(`(<section id="${section}">[\\s\\S]*?<\\/ol>)`, 'i');
    html = html.replace(regex, function(match, p1) {
      return p1.replace(/<\/ol>$/, listStr + "        </ol>");
    });
  }
  fs.writeFileSync('index.html', html, 'utf8');
} catch(e) { console.log(e); }

// Updates for test1.html to test5.html ----------------------
const testAdditions = {
  "test1.html": indexData.body.map((item, i) => ({q: \`q\${i+6}\`, meaning: item.meaning, ans: item.word})),
  "test2.html": indexData.professional.map((item, i) => ({q: \`q\${i+6}\`, meaning: item.meaning, ans: item.word})),
  "test3.html": indexData.learning.map((item, i) => ({q: \`q\${i+6}\`, meaning: item.meaning, ans: item.word})),
  "test4.html": indexData.sport.map((item, i) => ({q: \`q\${i+6}\`, meaning: item.meaning, ans: item.word})),
  "test5.html": indexData.computer.map((item, i) => ({q: \`q\${i+6}\`, meaning: item.meaning, ans: item.word}))
};

for (const [file, items] of Object.entries(testAdditions)) {
  try {
    if (fs.existsSync(file)) {
      let content = fs.readFileSync(file, 'utf8');
      
      let listItems = "";
      items.forEach(item => {
        listItems += \`                <li>\${item.meaning}:<input name="\${item.q}" placeholder="keys" type="text"></li>\n\`;
      });
      content = content.replace(/(<input name="q5"[^>]*><\\/li>\\s*<\\/ol>)/i, function(match, p1) {
          return match.replace(/<\\/ol>$/, listItems + "            </ol>");
      });
      
      let ansItems = "";
      items.forEach(item => {
        ansItems += \`,\\n                \${item.q}: "\${item.ans}"\`;
      });
      content = content.replace(/(q5:\\s*"[^"]+")/g, function(match) {
          return match + ansItems;
      });
      
      content = content.replace(/totalQuestions\\s*=\\s*10;/g, "totalQuestions = 15;");
      
      content = content.replace(/(\\/\\/\\s*Chấm điểm điền từ\\s*)for\\s*\\(\\s*let\\s+i\\s*=\\s*1;\\s*i\\s*<=\\s*5;\\s*i\\+\\+\\s*\\)/g, "$1for (let i = 1; i <= 10; i++)");
  
      fs.writeFileSync(file, content, 'utf8');
    }
  } catch(e) { console.log(e); }
}

console.log("SUCCESS");
