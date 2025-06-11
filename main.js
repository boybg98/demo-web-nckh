const sectionProgress = {
  body: { remembered: 0, total: 0 },
  professional: { remembered: 0, total: 0 },
  learning: { remembered: 0, total: 0 },
  sport: { remembered: 0, total: 0 },
  computer: { remembered: 0, total: 0 },
};

document.querySelectorAll('.flashcard').forEach(card => {
  const section = card.querySelector('.btn-remember')?.dataset.section;
  if (section && sectionProgress[section]) {
    sectionProgress[section].total++;
  }
});

document.querySelectorAll('.btn-remember').forEach(button => {
  button.addEventListener('click', function () {
    const section = this.dataset.section;
    if (!this.classList.contains('counted') && sectionProgress[section]) {
      sectionProgress[section].remembered++;
      this.classList.add('counted');
      updateProgress(section);
    }
  });
});

document.querySelectorAll('.btn-review').forEach(button => {
  button.addEventListener('click', function () {
    const card = this.closest('.flashcard');
    const rememberButton = card.querySelector('.btn-remember');
    const section = rememberButton.dataset.section;
    if (rememberButton.classList.contains('counted') && sectionProgress[section]) {
      sectionProgress[section].remembered--;
      rememberButton.classList.remove('counted');
      updateProgress(section);
    }
  });
});

function updateProgress(section) {
  const progress = sectionProgress[section];
  const percent = Math.round((progress.remembered / progress.total) * 100);
  const progressElement = document.getElementById(`progress-${section}`);
  if (progressElement) {
    progressElement.textContent = `Tiến độ: ${percent}%`;
  }

  showQuizButton(section, percent);

  if (percent === 100 && !progress.notified) {
    const goToQuiz = confirm(`🎉 Chúc mừng! Bạn đã hoàn thành phần "${section}". Bạn có thể bắt đầu bài kiểm tra.`);
    progress.notified = true;
    if (goToQuiz) {
    const quizButton = document.getElementById(`quiz-btn-${section}`);
    if (quizButton) {
      quizButton.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } 
  }
  }
}

function speakWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = 'en-US';
  speechSynthesis.speak(utterance);
}

function showQuizButton(section, percent) {
  let quizButton = document.getElementById(`quiz-btn-${section}`);

  if (!quizButton) {
    quizButton = document.createElement('button');
    quizButton.textContent = '📝 Bắt đầu kiểm tra';
    quizButton.id = `quiz-btn-${section}`;
    quizButton.className = 'quiz-button';
    quizButton.style.marginTop = '10px';
    quizButton.addEventListener('click', function () {
      if (!quizButton.disabled) {
        startQuiz(section);
      }
    });

    const progressElement = document.getElementById(`progress-${section}`);
    if (progressElement) {
      progressElement.insertAdjacentElement('afterend', quizButton);
    }
  }
  quizButton.style.display = percent === 100 ? 'inline-block' : 'none';
  quizButton.disabled = percent < 100;
  quizButton.title = percent < 100 ? 'Cần hoàn thành 100% để mở bài kiểm tra' : '';
}

function startQuiz(section) {
  alert(`🔍 Bắt đầu bài kiểm tra cho phần: ${section}`);
}
