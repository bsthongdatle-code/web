(() => {
  const root = document.documentElement;
  const themeKey = 'hocbaitoi-theme';
  const validThemes = ['forest', 'ocean', 'lavender', 'rose', 'midnight'];
  const savedTheme = localStorage.getItem(themeKey);
  if (savedTheme && validThemes.includes(savedTheme)) root.dataset.theme = savedTheme;

  document.querySelectorAll('[data-theme-select]').forEach(select => {
    select.value = root.dataset.theme || 'forest';
    select.addEventListener('change', () => {
      const next = validThemes.includes(select.value) ? select.value : 'forest';
      root.dataset.theme = next;
      localStorage.setItem(themeKey, next);
      document.querySelectorAll('[data-theme-select]').forEach(other => { other.value = next; });
    });
  });

  const currentPath = location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = new URL(link.href, location.origin).pathname.replace(/\/$/, '') || '/';
    if (href === currentPath || (href === '/library' && currentPath.startsWith('/library/'))) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  const doneKey = 'hocbaitoi-completed-lessons';
  const completed = new Set(JSON.parse(localStorage.getItem(doneKey) || '[]'));
  const doneButtons = [...document.querySelectorAll('[data-done-button]')];
  const updateProgress = () => {
    const relevant = doneButtons;
    const count = relevant.filter(button => completed.has(button.dataset.doneButton)).length;
    const summary = document.querySelector('[data-progress-text]');
    const bar = document.querySelector('[data-progress-bar]');
    if (summary) summary.textContent = `${count}/${relevant.length} chủ đề đã đánh dấu hoàn thành`;
    if (bar) bar.style.width = relevant.length ? `${count / relevant.length * 100}%` : '0%';
    relevant.forEach(button => {
      const isDone = completed.has(button.dataset.doneButton);
      button.classList.toggle('is-done', isDone);
      button.textContent = isDone ? '✓ Đã nắm vững' : 'Đánh dấu đã học';
      button.setAttribute('aria-pressed', String(isDone));
    });
  };
  doneButtons.forEach(button => button.addEventListener('click', () => {
    const id = button.dataset.doneButton;
    completed.has(id) ? completed.delete(id) : completed.add(id);
    localStorage.setItem(doneKey, JSON.stringify([...completed]));
    updateProgress();
  }));
  updateProgress();

  const search = document.querySelector('[data-lesson-search]');
  if (search) {
    search.addEventListener('input', () => {
      const term = search.value.trim().toLocaleLowerCase('vi');
      let visible = 0;
      document.querySelectorAll('[data-searchable-lesson]').forEach(card => {
        const match = card.textContent.toLocaleLowerCase('vi').includes(term);
        card.hidden = !match;
        if (match) visible++;
      });
      const count = document.querySelector('[data-search-count]');
      if (count) count.textContent = term ? `${visible} chủ đề phù hợp` : '';
    });
  }

  document.querySelectorAll('.quiz-question').forEach(question => {
    const answer = question.dataset.answer;
    const feedback = question.querySelector('.quiz-feedback');
    question.querySelectorAll('.quiz-option').forEach(option => {
      option.addEventListener('click', () => {
        question.querySelectorAll('.quiz-option').forEach(item => item.classList.remove('selected', 'correct', 'wrong'));
        option.classList.add('selected');
        const correct = option.dataset.option === answer;
        option.classList.add(correct ? 'correct' : 'wrong');
        const explanation = question.dataset.explain || '';
        feedback.textContent = (correct ? 'Chính xác. ' : 'Chưa đúng. Đáp án đúng đã được đánh dấu. ') + explanation;
      });
    });
  });

  document.querySelectorAll('[data-flashcard]').forEach(card => {
    card.addEventListener('click', () => {
      const revealed = card.classList.toggle('revealed');
      card.querySelector('span').textContent = revealed ? card.dataset.back : 'Chạm để xem nghĩa';
      card.setAttribute('aria-expanded', String(revealed));
    });
  });
})();
