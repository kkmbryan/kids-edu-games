/**
 * 星際分數探險隊 - 遊戲核心引擎與星空粒子畫布
 */
(function () {
  'use strict';

  const QUESTIONS_PER_ROUND = 10;
  const CHOICE_LETTERS = ['A', 'B', 'C', 'D'];
  const PRAISE_MESSAGES = [
    '✨ 能量充滿！準備躍遷！',
    '🚀 太棒了！軌道校準成功！',
    '🌟 計算精準！太空船加速前進！',
    '🪐 好厲害！又收集到一顆星能！'
  ];

  // 狀態
  const state = {
    difficulty: 'easy',
    roundQuestions: [],
    currentIndex: 0,
    score: 0,
    streak: 0,
    bestStreak: 0,
    firstTryCorrectCount: 0,
    hadWrongThisQuestion: false,
    locked: false
  };

  // DOM 參照
  const screens = {
    start: document.getElementById('screen-start'),
    play: document.getElementById('screen-play'),
    summary: document.getElementById('screen-summary')
  };

  const diffCards = document.querySelectorAll('.diff-card');
  const btnPlay = document.getElementById('btn-play');
  const btnBackHome = document.getElementById('btn-back-home');
  const btnReplay = document.getElementById('btn-replay');
  const btnChangeDiff = document.getElementById('btn-change-diff');
  const muteButtons = document.querySelectorAll('.mute-toggle');

  const hudQCount = document.getElementById('hud-q-count');
  const hudDiffLabel = document.getElementById('hud-diff-label');
  const planetTrack = document.getElementById('planet-track');
  const hudStreak = document.getElementById('hud-streak');
  const hudScore = document.getElementById('hud-score');

  const questionCard = document.getElementById('question-card');
  const qTag = document.getElementById('q-tag');
  const qAttemptNote = document.getElementById('q-attempt-note');
  const qStory = document.getElementById('q-story');
  const qExpression = document.getElementById('q-expression');
  const hintBox = document.getElementById('hint-box');
  const hintText = document.getElementById('hint-text');
  const hintVisual = document.getElementById('hint-visual');
  const successBanner = document.getElementById('success-banner');
  const successText = document.getElementById('success-text');
  const choicesGrid = document.getElementById('choices-grid');

  const summaryStars = document.getElementById('summary-stars');
  const summaryTitle = document.getElementById('summary-title');
  const summarySubtitle = document.getElementById('summary-subtitle');
  const statFirstTry = document.getElementById('stat-first-try');
  const statBestStreak = document.getElementById('stat-best-streak');
  const statTotalScore = document.getElementById('stat-total-score');

  // ========== Canvas 星空與粒子系統 ==========
  const canvas = document.getElementById('space-canvas');
  const ctx = canvas.getContext('2d');
  let stars = [];
  let particles = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initStars();
  }

  function initStars() {
    const count = Math.min(110, Math.floor((canvas.width * canvas.height) / 11000));
    stars = [];
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.8 + 0.5,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.02 + 0.008
      });
    }
  }

  function spawnConfetti(originX, originY, count = 38) {
    const colors = ['#38bdf8', '#a78bfa', '#fbbf24', '#34d399', '#fb7185', '#f8fafc'];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 6 + 2.5;
      particles.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2.5,
        size: Math.random() * 6 + 4,
        color: colors[i % colors.length],
        life: 1,
        decay: Math.random() * 0.018 + 0.014,
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.2
      });
    }
  }

  function animateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 繪製閃爍星星
    for (const s of stars) {
      s.phase += s.speed;
      const alpha = 0.3 + 0.55 * (0.5 + 0.5 * Math.sin(s.phase));
      ctx.fillStyle = `rgba(226, 232, 240, ${alpha.toFixed(2)})`;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    }

    // 繪製慶祝粒子
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.14; // 輕微重力
      p.rotation += p.vRot;
      p.life -= p.decay;

      if (p.life <= 0) {
        particles.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.65);
      ctx.restore();
    }

    requestAnimationFrame(animateCanvas);
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  requestAnimationFrame(animateCanvas);

  // ========== 輔助函式 ==========
  function shuffleArray(arr) {
    const copy = arr.slice();
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function showScreen(name) {
    Object.values(screens).forEach((el) => el.classList.remove('active'));
    screens[name].classList.add('active');
  }

  function renderMuteUI() {
    const muted = window.spaceAudio.isMuted();
    const soundOnSvg =
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
      '<path d="M11 5L6 9H2V15H6L11 19V5Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>' +
      '<path d="M15.54 8.46C16.48 9.4 17 10.67 17 12C17 13.33 16.48 14.6 15.54 15.54" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' +
      '<path d="M18.36 5.64C20.05 7.33 21 9.62 21 12C21 14.38 20.05 16.67 18.36 18.36" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' +
      '</svg>';
    const soundOffSvg =
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
      '<path d="M11 5L6 9H2V15H6L11 19V5Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>' +
      '<path d="M22 9L16 15M16 9L22 15" stroke="#fb7185" stroke-width="2.2" stroke-linecap="round"/>' +
      '</svg>';

    muteButtons.forEach((btn) => {
      const iconSpan = btn.querySelector('.mute-icon');
      const textSpan = btn.querySelector('.mute-text');
      if (iconSpan) iconSpan.innerHTML = muted ? soundOffSvg : soundOnSvg;
      if (textSpan) textSpan.textContent = muted ? '音效：關' : '音效：開';
      btn.setAttribute('aria-label', muted ? '開啟音效' : '靜音');
    });
  }

  // 建立直式分數 DOM 元素
  function createFractionElement(frac) {
    const wrap = document.createElement('span');
    wrap.className = 'frac-mixed';

    if (frac.w !== undefined && frac.w !== 0) {
      const whole = document.createElement('span');
      whole.className = 'frac-whole';
      whole.textContent = String(frac.w);
      wrap.appendChild(whole);
    }

    if (frac.n !== undefined && frac.d !== undefined) {
      const stack = document.createElement('span');
      stack.className = 'frac-stack';

      const num = document.createElement('span');
      num.className = 'frac-num';
      num.textContent = String(frac.n);

      const bar = document.createElement('span');
      bar.className = 'frac-bar';

      const den = document.createElement('span');
      den.className = 'frac-den';
      den.textContent = String(frac.d);

      stack.appendChild(num);
      stack.appendChild(bar);
      stack.appendChild(den);
      wrap.appendChild(stack);
    }

    return wrap;
  }

  function renderVisualHint(visual) {
    hintVisual.innerHTML = '';
    if (!visual || visual.type !== 'bars' || !Array.isArray(visual.items)) return;

    const svgNS = 'http://www.w3.org/2000/svg';

    visual.items.forEach((item) => {
      const row = document.createElement('div');
      row.className = 'visual-bar-row';

      const label = document.createElement('span');
      label.className = 'visual-bar-label';
      label.textContent = item.label;

      const svg = document.createElementNS(svgNS, 'svg');
      svg.setAttribute('class', 'visual-bar-svg');
      svg.setAttribute('viewBox', '0 0 240 24');
      svg.setAttribute('aria-hidden', 'true');

      const total = Math.max(1, item.total);
      const filled = Math.min(total, Math.max(0, item.filled));
      const gap = 2;
      const cellW = (240 - gap * (total - 1)) / total;

      for (let i = 0; i < total; i++) {
        const rect = document.createElementNS(svgNS, 'rect');
        rect.setAttribute('x', (i * (cellW + gap)).toFixed(2));
        rect.setAttribute('y', '2');
        rect.setAttribute('width', Math.max(2, cellW).toFixed(2));
        rect.setAttribute('height', '20');
        rect.setAttribute('rx', '3');
        rect.setAttribute('fill', i < filled ? item.color : 'rgba(148, 163, 184, 0.2)');
        svg.appendChild(rect);
      }

      row.appendChild(label);
      row.appendChild(svg);
      hintVisual.appendChild(row);
    });
  }

  // ========== 遊戲流程 ==========
  function startRound() {
    const levelData = window.FRACTION_CURRICULUM[state.difficulty];
    state.roundQuestions = shuffleArray(levelData.questions).slice(0, QUESTIONS_PER_ROUND);
    state.currentIndex = 0;
    state.score = 0;
    state.streak = 0;
    state.bestStreak = 0;
    state.firstTryCorrectCount = 0;
    state.locked = false;

    hudDiffLabel.textContent = levelData.label;
    showScreen('play');
    renderQuestion();
  }

  function renderProgressTrack() {
    planetTrack.innerHTML = '';
    for (let i = 0; i < state.roundQuestions.length; i++) {
      const node = document.createElement('div');
      node.className = 'planet-node';
      if (i < state.currentIndex) node.classList.add('done');
      else if (i === state.currentIndex) node.classList.add('current');
      planetTrack.appendChild(node);
    }
  }

  function renderQuestion() {
    const q = state.roundQuestions[state.currentIndex];
    state.hadWrongThisQuestion = false;
    state.locked = false;

    // 更新 HUD
    hudQCount.textContent = `第 ${state.currentIndex + 1} / ${state.roundQuestions.length} 題`;
    hudStreak.textContent = String(state.streak);
    hudScore.textContent = String(state.score);
    renderProgressTrack();

    // 重置卡片狀態
    questionCard.classList.remove('shake', 'correct-flash');
    hintBox.classList.add('hidden');
    successBanner.classList.add('hidden');
    qAttemptNote.textContent = '';

    qTag.textContent = q.tag;
    qStory.textContent = q.story;

    // 繪製算式
    qExpression.innerHTML = '';
    q.parts.forEach((part) => {
      if (part.type === 'frac') {
        qExpression.appendChild(createFractionElement(part));
      } else if (part.type === 'op') {
        const op = document.createElement('span');
        op.className = 'expr-op';
        op.textContent = part.value;
        qExpression.appendChild(op);
      }
    });

    const eq = document.createElement('span');
    eq.className = 'expr-op';
    eq.textContent = '=';
    qExpression.appendChild(eq);

    const qMark = document.createElement('span');
    qMark.className = 'expr-qmark';
    qMark.textContent = '?';
    qExpression.appendChild(qMark);

    // 準備並洗牌 4 個選項
    const options = shuffleArray([
      { value: q.answer, isCorrect: true },
      ...q.distractors.map((d) => ({ value: d, isCorrect: false }))
    ]);

    choicesGrid.innerHTML = '';
    options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'choice-btn';

      const letter = document.createElement('span');
      letter.className = 'choice-letter';
      letter.textContent = CHOICE_LETTERS[idx];

      btn.appendChild(letter);
      btn.appendChild(createFractionElement(opt.value));

      btn.addEventListener('click', () => handleChoice(btn, opt.isCorrect, q));
      choicesGrid.appendChild(btn);
    });
  }

  function handleChoice(btn, isCorrect, question) {
    if (state.locked || btn.disabled) return;

    if (isCorrect) {
      state.locked = true;
      btn.classList.add('correct-picked');
      questionCard.classList.add('correct-flash');

      // 停用所有選項按鈕
      choicesGrid.querySelectorAll('.choice-btn').forEach((b) => {
        b.disabled = true;
      });

      // 計分與連勝
      if (!state.hadWrongThisQuestion) {
        state.firstTryCorrectCount += 1;
        state.streak += 1;
        if (state.streak > state.bestStreak) state.bestStreak = state.streak;
        state.score += 100 + Math.min(state.streak - 1, 5) * 20;
      } else {
        state.score += 60;
      }

      hudStreak.textContent = String(state.streak);
      hudScore.textContent = String(state.score);

      // 顯示鼓勵文字與煙火特效
      hintBox.classList.add('hidden');
      const praise = PRAISE_MESSAGES[state.currentIndex % PRAISE_MESSAGES.length];
      successText.textContent = praise;
      successBanner.classList.remove('hidden');

      window.spaceAudio.playCorrect();
      const rect = btn.getBoundingClientRect();
      spawnConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2, 40);

      setTimeout(() => {
        state.currentIndex += 1;
        if (state.currentIndex >= state.roundQuestions.length) {
          finishRound();
        } else {
          renderQuestion();
        }
      }, 1050);
    } else {
      // 溫和引導：不結束遊戲，輕微震動 + 提示 + 允許重試
      state.hadWrongThisQuestion = true;
      state.streak = 0;
      hudStreak.textContent = '0';

      btn.classList.add('wrong-tried');
      btn.disabled = true;
      qAttemptNote.textContent = '再試試看，提示已打開！';

      questionCard.classList.remove('shake');
      void questionCard.offsetWidth; // 重新觸發動畫
      questionCard.classList.add('shake');

      hintText.textContent = question.hint;
      renderVisualHint(question.visual);
      hintBox.classList.remove('hidden');

      window.spaceAudio.playWrong();
    }
  }

  function finishRound() {
    showScreen('summary');
    window.spaceAudio.playVictory();
    spawnConfetti(canvas.width / 2, canvas.height * 0.32, 75);

    const firstTry = state.firstTryCorrectCount;
    let starsEarned = 1;
    let title = '任務順利完成！';
    let subtitle = '太棒了，你已經安全抵達目的地星球！繼續練習會更熟練喔！';

    if (firstTry >= 8) {
      starsEarned = 3;
      title = '超級星際數學領航員！';
      subtitle = '太驚人了！幾乎每一題都一次答對，你的分數計算超精準！';
    } else if (firstTry >= 5) {
      starsEarned = 2;
      title = '優秀太空探險家！';
      subtitle = '表現很好！再多挑戰幾次就能拿到滿分三顆星喔！';
    }

    summaryStars.innerHTML = '';
    const svgNS = 'http://www.w3.org/2000/svg';
    for (let i = 0; i < 3; i++) {
      const earned = i < starsEarned;
      const svg = document.createElementNS(svgNS, 'svg');
      svg.setAttribute('viewBox', '0 0 64 64');
      svg.setAttribute('class', `summary-star-svg ${earned ? 'earned' : ''}`);
      if (earned) {
        svg.style.animationDelay = `${i * 0.14}s`;
      }

      const path = document.createElementNS(svgNS, 'path');
      path.setAttribute(
        'd',
        'M32 4L40.2 21.3L59.2 23.8L45.3 37L48.8 55.9L32 46.7L15.2 55.9L18.7 37L4.8 23.8L23.8 21.3L32 4Z'
      );
      path.setAttribute('fill', earned ? '#fbbf24' : 'rgba(148, 163, 184, 0.25)');
      path.setAttribute('stroke', earned ? '#fde68a' : 'rgba(148, 163, 184, 0.4)');
      path.setAttribute('stroke-width', '2.5');
      path.setAttribute('stroke-linejoin', 'round');

      svg.appendChild(path);
      summaryStars.appendChild(svg);
    }

    summaryTitle.textContent = title;
    summarySubtitle.textContent = subtitle;
    statFirstTry.textContent = `${firstTry} / ${state.roundQuestions.length}`;
    statBestStreak.textContent = String(state.bestStreak);
    statTotalScore.textContent = String(state.score);
  }

  // ========== 事件綁定 ==========
  diffCards.forEach((card) => {
    card.addEventListener('click', () => {
      window.spaceAudio.playClick();
      diffCards.forEach((c) => {
        c.classList.remove('selected');
        c.setAttribute('aria-pressed', 'false');
      });
      card.classList.add('selected');
      card.setAttribute('aria-pressed', 'true');
      state.difficulty = card.dataset.diff;
    });
  });

  btnPlay.addEventListener('click', () => {
    window.spaceAudio.playClick();
    startRound();
  });

  btnBackHome.addEventListener('click', () => {
    window.spaceAudio.playClick();
    showScreen('start');
  });

  btnReplay.addEventListener('click', () => {
    window.spaceAudio.playClick();
    startRound();
  });

  btnChangeDiff.addEventListener('click', () => {
    window.spaceAudio.playClick();
    showScreen('start');
  });

  muteButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      window.spaceAudio.toggleMute();
      renderMuteUI();
    });
  });

  // 初始化靜音按鈕圖示
  renderMuteUI();
})();
