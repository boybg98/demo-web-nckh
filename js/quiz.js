const vocabs = [
    { word: "head", meaning: "đầu" },
    { word: "eye", meaning: "mắt" },
    { word: "mouth", meaning: "miệng" },
    { word: "face", meaning: "khuôn mặt" },
    { word: "stomach", meaning: "bụng" },
    { word: "hand", meaning: "bàn tay" },
    { word: "leg", meaning: "cẳng chân" },
    { word: "foot", meaning: "bàn chân" },
    { word: "arm", meaning: "cánh tay" },
    { word: "nose", meaning: "cái mũi" },
    { word: "teacher", meaning: "giáo viên" },
    { word: "doctor", meaning: "bác sĩ" },
    { word: "police", meaning: "công an" },
    { word: "worker", meaning: "công nhân" },
    { word: "driver", meaning: "tài xế" },
    { word: "engineer", meaning: "kỹ sư" },
    { word: "nurse", meaning: "y tá" },
    { word: "actor", meaning: "diễn viên" },
    { word: "pilot", meaning: "phi công" },
    { word: "chef", meaning: "đầu bếp" },
    { word: "study", meaning: "học" },
    { word: "read", meaning: "đọc" },
    { word: "write", meaning: "viết" },
    { word: "listen", meaning: "nghe" },
    { word: "speak", meaning: "nói" },
    { word: "keyboard", meaning: "bàn phím" },
    { word: "mouse", meaning: "chuột máy tính" },
    { word: "screen", meaning: "màn hình" },
    { word: "football", meaning: "bóng đá" },
    { word: "tennis", meaning: "quần vợt" }
];

let timerInterval;
let startTime;
let currentQuestions = [];
let quizSubmitted = false;

function goBack() {
    window.location.href = 'index.html';
}

function startQuiz() {
    const qCount = parseInt(document.getElementById('question-count').value, 10);
    const useMcq = document.getElementById('toggle-mcq').checked;
    const useEssay = document.getElementById('toggle-essay').checked;

    if (!useMcq && !useEssay) {
        alert("Vui lòng chọn ít nhất một hình thức kiểm tra (Trắc nghiệm hoặc Tự luận)!");
        return;
    }

    if (isNaN(qCount) || qCount < 1) {
        alert("Số lượng câu hỏi không hợp lệ!");
        return;
    }

    const maxQ = Math.min(qCount, vocabs.length);

    // Hide Modal & Show UI
    document.getElementById('setup-modal').classList.remove('active');
    document.getElementById('quiz-ui').style.display = 'flex';
    document.getElementById('quiz-progress-text').innerText = `0 / ${maxQ}`;
    document.getElementById('total-q').innerText = maxQ;

    // Generate Questions
    generateQuestions(maxQ, useMcq, useEssay);

    // Start Timer
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    const now = Date.now();
    const diff = Math.floor((now - startTime) / 1000);
    const m = String(Math.floor(diff / 60)).padStart(2, '0');
    const s = String(diff % 60).padStart(2, '0');
    document.getElementById('timer').innerText = `${m}:${s}`;
}

function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

function generateQuestions(count, useMcq, useEssay) {
    let selectedVocabs = shuffle([...vocabs]).slice(0, count);
    const container = document.getElementById('questions-container');
    container.innerHTML = '';
    currentQuestions = [];

    selectedVocabs.forEach((vocab, index) => {
        let type;
        if (useMcq && useEssay) {
            type = Math.random() > 0.5 ? 'mcq' : 'essay';
        } else {
            type = useMcq ? 'mcq' : 'essay';
        }

        currentQuestions.push({
            id: index,
            vocab: vocab,
            type: type,
            userAnswer: null
        });

        const qCard = document.createElement('div');
        qCard.className = 'question-card';
        qCard.id = `qcard-${index}`;

        let typeLabel = type === 'mcq' ? 'Trắc nghiệm' : 'Tự luận';
        
        let html = `
            <div class="question-header">
                <span class="question-type">${typeLabel}</span>
                <span class="question-number">#${index + 1}</span>
            </div>
            <div class="question-text">${vocab.meaning} có nghĩa tiếng Anh là gì?</div>
        `;

        if (type === 'mcq') {
            let options = [vocab.word];
            // Get 3 random wrong options
            let wrongs = shuffle([...vocabs]).filter(v => v.word !== vocab.word);
            options.push(wrongs[0].word);
            options.push(wrongs[1].word);
            options.push(wrongs[2].word);
            
            options = shuffle(options);
            
            html += `<div class="options-grid">`;
            options.forEach(opt => {
                html += `<button class="option-btn" onclick="selectMcq(${index}, '${opt}')" data-val="${opt}">${opt}</button>`;
            });
            html += `</div>`;
        } else {
            html += `
            <div class="essay-input-container">
                <input type="text" class="essay-input" id="essay-${index}" placeholder="Nhập đáp án của bạn..." oninput="updateEssay(${index}, this.value)">
                <div class="correct-answer-hint" id="hint-${index}" style="display:none;">Đáp án đúng: ${vocab.word}</div>
            </div>`;
        }

        qCard.innerHTML = html;
        container.appendChild(qCard);
    });
}

function selectMcq(qIndex, answer) {
    if (quizSubmitted) return;
    currentQuestions[qIndex].userAnswer = answer;
    
    // Update UI
    const card = document.getElementById(`qcard-${qIndex}`);
    const btns = card.querySelectorAll('.option-btn');
    btns.forEach(b => b.classList.remove('selected'));
    
    const selectedBtn = Array.from(btns).find(b => b.getAttribute('data-val') === answer);
    if (selectedBtn) selectedBtn.classList.add('selected');

    updateProgressUI();
}

function updateEssay(qIndex, answer) {
    if (quizSubmitted) return;
    currentQuestions[qIndex].userAnswer = answer.trim();
    updateProgressUI();
}

function updateProgressUI() {
    let answered = currentQuestions.filter(q => q.userAnswer && q.userAnswer.length > 0).length;
    let total = currentQuestions.length;
    document.getElementById('quiz-progress-text').innerText = `${answered} / ${total}`;
    
    let percent = (answered / total) * 100;
    document.getElementById('quiz-progress-fill').style.width = `${percent}%`;
}

function submitQuiz() {
    if (quizSubmitted) return;
    
    // Kiểm tra xem đã điền hết đáp án chưa
    let answered = currentQuestions.filter(q => q.userAnswer && q.userAnswer.length > 0).length;
    if (answered < currentQuestions.length) {
        if (!confirm('Bạn chưa trả lời hết các câu hỏi. Bạn có chắc chắn muốn nộp bài?')) {
            return;
        }
    }
    
    quizSubmitted = true;
    clearInterval(timerInterval);

    let score = 0;
    currentQuestions.forEach((q, i) => {
        const card = document.getElementById(`qcard-${i}`);
        
        if (q.type === 'mcq') {
            const btns = card.querySelectorAll('.option-btn');
            btns.forEach(btn => {
                const val = btn.getAttribute('data-val');
                btn.disabled = true; // disable buttons
                
                if (val === q.vocab.word) {
                    btn.classList.add('correct');
                } else if (val === q.userAnswer && q.userAnswer !== q.vocab.word) {
                    btn.classList.add('wrong');
                }
            });

            if (q.userAnswer === q.vocab.word) {
                score++;
            }
        } else {
            const input = document.getElementById(`essay-${i}`);
            input.disabled = true;
            
            if (q.userAnswer && q.userAnswer.toLowerCase() === q.vocab.word.toLowerCase()) {
                input.classList.add('correct');
                score++;
            } else {
                input.classList.add('wrong');
                const hint = document.getElementById(`hint-${i}`);
                hint.style.display = 'block';
            }
        }
    });

    // Show Result Modal
    document.getElementById('final-score').innerText = score;
    document.getElementById('final-time').innerText = document.getElementById('timer').innerText;
    document.getElementById('result-modal').classList.add('active');
}
