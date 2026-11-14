/**
 * 足球代數 — 畫面、計分、星星、localStorage、動畫
 */
(function () {
  'use strict';

  const STORAGE_KEY = 'soccer-algebra-stars-v1';
  const QUESTIONS_PER_MATCH = 6;

  const ENCOURAGE = [
    '漂亮射門！',
    '平衡做得好！',
    '完美入球！',
    '代數勁過門將！',
    '方程解得漂亮！',
    '再來一球！'
  ];

  const state = {
    soundOn: true,
    stars: loadStars(),
    screen: 'home',
    levelId: null,
    match: null,
    qIndex: 0,
    firstTryGoals: 0,
    streak: 0,
    bestStreak: 0,
    encourageIndex: 0,
    attempt: 0,
    locked: false,
    typed: '',
    wordPhase: 0,
    missedThisQuestion: false,
    currentItem: null,
    activePhase: null
  };

  const els = {
    soundToggle: document.getElementById('sound-toggle'),
    homeStars: document.getElementById('home-stars'),
    mapStars: document.getElementById('map-stars'),
    goMap: document.getElementById('go-map'),
    mapHome: document.getElementById('map-home'),
    levelList: document.getElementById('level-list'),
    mapError: document.getElementById('map-error'),
    screens: {
      home: document.getElementById('screen-home'),
      map: document.getElementById('screen-map'),
      match: document.getElementById('screen-match'),
      result: document.getElementById('screen-result')
    },
    quitMatch: document.getElementById('quit-match'),
    matchTitle: document.getElementById('match-title'),
    matchProgress: document.getElementById('match-progress'),
    score: document.getElementById('score'),
    streak: document.getElementById('streak'),
    pitch: document.getElementById('pitch'),
    fxLayer: document.getElementById('fx-layer'),
    appShell: document.getElementById('app-shell'),
    fxCanvas: document.getElementById('fx-canvas'),
    coachBanner: document.getElementById('coach-banner'),
    coachTip: document.getElementById('coach-tip'),
    startQuestion: document.getElementById('start-question'),
    questionPanel: document.getElementById('question-panel'),
    phaseLabel: document.getElementById('phase-label'),
    prompt: document.getElementById('prompt'),
    reminder: document.getElementById('equation-reminder'),
    choices: document.getElementById('choices'),
    keypad: document.getElementById('keypad'),
    typed: document.getElementById('typed'),
    keys: document.getElementById('keys'),
    feedback: document.getElementById('feedback'),
    feedbackTitle: document.getElementById('feedback-title'),
    feedbackNote: document.getElementById('feedback-note'),
    feedbackSteps: document.getElementById('feedback-steps'),
    feedbackCheck: document.getElementById('feedback-check'),
    feedbackNext: document.getElementById('feedback-next'),
    resultTitle: document.getElementById('result-title'),
    resultBadge: document.getElementById('result-badge'),
    resultStars: document.getElementById('result-stars'),
    resultNote: document.getElementById('result-note'),
    statFirstTry: document.getElementById('stat-first-try'),
    statBestStreak: document.getElementById('stat-best-streak'),
    statMatchStars: document.getElementById('stat-match-stars'),
    replay: document.getElementById('replay'),
    backMap: document.getElementById('back-map'),
    quitConfirm: document.getElementById('quit-confirm'),
    quitStay: document.getElementById('quit-stay'),
    quitLeave: document.getElementById('quit-leave'),
    resetProgress: document.getElementById('reset-progress'),
    resetConfirm: document.getElementById('reset-confirm'),
    resetCancel: document.getElementById('reset-cancel'),
    resetConfirmBtn: document.getElementById('reset-confirm-btn')
  };

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fx = {
    ctx: els.fxCanvas ? els.fxCanvas.getContext('2d') : null,
    sparks: [],
    bursts: [],
    parallax: { x: 0, y: 0, tx: 0, ty: 0 }
  };

  function audio() {
    return window.soccerAudio || null;
  }

  function playGoalSound() {
    if (!state.soundOn) return;
    const a = audio();
    if (a) a.playGoal();
  }

  function playSaveSound() {
    if (!state.soundOn) return;
    const a = audio();
    if (a) a.playSave();
  }

  function playTapSound() {
    if (!state.soundOn) return;
    const a = audio();
    if (a) a.playTap();
  }

  function playStarSound() {
    if (!state.soundOn) return;
    const a = audio();
    if (a) a.playStar();
  }

  function loadStars() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return {};
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === 'object' ? parsed : {};
    } catch (e) {
      return {};
    }
  }

  function saveStars() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.stars));
    } catch (e) {
      /* ignore quota */
    }
  }

  function starsFor(levelId) {
    const n = Number(state.stars[levelId] || 0);
    return Math.max(0, Math.min(3, n));
  }

  function totalStars() {
    let sum = 0;
    for (let i = 1; i <= 8; i++) sum += starsFor(i);
    return sum;
  }

  function isUnlocked(levelId) {
    if (levelId === 1) return true;
    return starsFor(levelId - 1) >= 1;
  }

  function nextUnlockedUnplayedId() {
    const levels = window.SoccerAlgebra.LEVELS;
    for (let i = 0; i < levels.length; i++) {
      const id = levels[i].id;
      if (isUnlocked(id) && starsFor(id) === 0) return id;
    }
    return null;
  }

  function updateStreakDisplay() {
    if (els.streak) els.streak.textContent = String(state.streak);
  }

  function bumpStreak() {
    state.streak += 1;
    if (state.streak > state.bestStreak) state.bestStreak = state.streak;
    updateStreakDisplay();
  }

  function resetStreak() {
    state.streak = 0;
    updateStreakDisplay();
  }

  function nextEncourage() {
    const line = ENCOURAGE[state.encourageIndex % ENCOURAGE.length];
    state.encourageIndex += 1;
    return line;
  }

  function showScreen(name) {
    state.screen = name;
    Object.keys(els.screens).forEach((key) => {
      els.screens[key].hidden = key !== name;
    });
  }

  function updateStarDisplays() {
    const t = totalStars();
    els.homeStars.textContent = `已收集 ${t} / 24 星`;
    els.mapStars.textContent = `已收集 ${t} / 24 星`;
  }

  function starText(n) {
    return '★'.repeat(n) + '☆'.repeat(3 - n);
  }

  function renderMap() {
    updateStarDisplays();
    els.mapError.hidden = true;
    els.levelList.innerHTML = '';
    const levels = window.SoccerAlgebra.LEVELS;
    const nextId = nextUnlockedUnplayedId();
    levels.forEach((level) => {
      const unlocked = isUnlocked(level.id);
      const stars = starsFor(level.id);
      const li = document.createElement('li');
      const btn = document.createElement('button');
      btn.type = 'button';
      const isNext = unlocked && level.id === nextId;
      btn.className =
        'level-card' +
        (unlocked ? '' : ' is-locked') +
        (isNext ? ' is-next-pulse' : '');
      btn.disabled = !unlocked;
      btn.innerHTML =
        `<span class="level-num">${level.id}</span>` +
        `<span class="level-meta"><strong>${level.title}</strong><span>${level.unit}</span></span>` +
        `<span class="level-stars" aria-label="${stars} 星">${unlocked ? starText(stars) : '🔒'}</span>`;
      if (unlocked) {
        btn.addEventListener('click', () => {
          playTapSound();
          startMatch(level.id);
        });
      }
      li.appendChild(btn);
      els.levelList.appendChild(li);
    });
  }

  function resetPitch() {
    els.pitch.classList.remove('is-goal', 'is-save');
  }

  function resizeFxCanvas() {
    if (!els.fxCanvas || !fx.ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    els.fxCanvas.width = Math.floor(window.innerWidth * dpr);
    els.fxCanvas.height = Math.floor(window.innerHeight * dpr);
    fx.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    initSparks();
  }

  function initSparks() {
    const count = Math.min(70, Math.floor((window.innerWidth * window.innerHeight) / 18000));
    fx.sparks = [];
    for (let i = 0; i < count; i++) {
      fx.sparks.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.8 + 0.4,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.025 + 0.008,
        drift: (Math.random() - 0.5) * 0.15,
        color: i % 3 === 0 ? '110,240,255' : i % 3 === 1 ? '93,255,176' : '255,213,106'
      });
    }
  }

  function spawnBurst(originX, originY, mode) {
    if (prefersReducedMotion || !fx.ctx) return;
    const colors =
      mode === 'goal' || mode === 'star'
        ? ['#ffd56a', '#5dffb0', '#6ef0ff', '#ffffff', '#ffe08a']
        : ['#ff6b7a', '#ffb4a8', '#ffffff', '#ffd0d4'];
    const count = mode === 'star' ? 56 : mode === 'goal' ? 42 : 28;
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5.5 + 2;
      fx.bursts.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - (mode === 'goal' || mode === 'star' ? 2.2 : 1.2),
        size: Math.random() * 5 + 3,
        color: colors[i % colors.length],
        life: 1,
        decay: Math.random() * 0.02 + 0.014,
        rot: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.25
      });
    }
  }

  function burstAtPitch(mode) {
    if (!els.pitch) return;
    const rect = els.pitch.getBoundingClientRect();
    const x = rect.left + rect.width * (mode === 'goal' ? 0.78 : 0.62);
    const y = rect.top + rect.height * 0.42;
    spawnBurst(x, y, mode);
  }

  function burstAtResult() {
    const card = document.querySelector('.result-card');
    if (!card) return;
    const rect = card.getBoundingClientRect();
    spawnBurst(rect.left + rect.width / 2, rect.top + rect.height * 0.28, 'star');
  }

  function showScorePopup(text, kind) {
    if (!els.fxLayer) return;
    const popup = document.createElement('div');
    popup.className = 'score-popup ' + (kind === 'goal' ? 'is-goal' : 'is-save');
    popup.textContent = text;
    els.fxLayer.appendChild(popup);
    window.setTimeout(() => {
      if (popup.parentNode) popup.parentNode.removeChild(popup);
    }, prefersReducedMotion ? 900 : 1000);
  }

  function triggerShake() {
    if (prefersReducedMotion || !els.appShell) return;
    els.appShell.classList.remove('is-shaking');
    void els.appShell.offsetWidth;
    els.appShell.classList.add('is-shaking');
    window.setTimeout(() => {
      els.appShell.classList.remove('is-shaking');
    }, 450);
  }

  function tickFx() {
    if (!fx.ctx || !els.fxCanvas) {
      requestAnimationFrame(tickFx);
      return;
    }
    const w = window.innerWidth;
    const h = window.innerHeight;
    const ctx = fx.ctx;
    ctx.clearRect(0, 0, w, h);

    if (!prefersReducedMotion) {
      fx.parallax.x += (fx.parallax.tx - fx.parallax.x) * 0.06;
      fx.parallax.y += (fx.parallax.ty - fx.parallax.y) * 0.06;
    }

    for (let i = 0; i < fx.sparks.length; i++) {
      const s = fx.sparks[i];
      s.phase += s.speed;
      s.x += s.drift + fx.parallax.x * 0.02;
      s.y += 0.05 + fx.parallax.y * 0.015;
      if (s.x < -4) s.x = w + 4;
      if (s.x > w + 4) s.x = -4;
      if (s.y > h + 4) s.y = -4;
      const alpha = 0.22 + 0.55 * (0.5 + 0.5 * Math.sin(s.phase));
      ctx.beginPath();
      ctx.fillStyle = 'rgba(' + s.color + ',' + alpha.toFixed(2) + ')';
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    }

    for (let i = fx.bursts.length - 1; i >= 0; i--) {
      const p = fx.bursts[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.13;
      p.rot += p.vRot;
      p.life -= p.decay;
      if (p.life <= 0) {
        fx.bursts.splice(i, 1);
        continue;
      }
      ctx.save();
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 12;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.65);
      ctx.restore();
    }

    requestAnimationFrame(tickFx);
  }

  function animateGoal(popupText) {
    resetPitch();
    void els.pitch.offsetWidth;
    els.pitch.classList.add('is-goal');
    playGoalSound();
    burstAtPitch('goal');
    if (popupText) showScorePopup(popupText, 'goal');
    triggerShake();
  }

  function animateSave() {
    resetPitch();
    void els.pitch.offsetWidth;
    els.pitch.classList.add('is-save');
    playSaveSound();
    burstAtPitch('save');
    showScorePopup('救出！', 'save');
    triggerShake();
  }

  function startMatch(levelId) {
    const match = window.SoccerAlgebra.buildMatch(levelId);
    if (!match || !match.items || match.items.length !== QUESTIONS_PER_MATCH) {
      els.mapError.hidden = false;
      return;
    }
    state.levelId = levelId;
    state.match = match;
    state.qIndex = 0;
    state.firstTryGoals = 0;
    state.streak = 0;
    state.bestStreak = 0;
    state.encourageIndex = 0;
    state.attempt = 0;
    state.locked = false;
    state.typed = '';
    state.wordPhase = 0;
    state.missedThisQuestion = false;
    state.currentItem = null;
    state.activePhase = null;

    els.matchTitle.textContent = match.title;
    els.score.textContent = '0';
    updateStreakDisplay();
    els.matchProgress.textContent = '準備開球';
    els.coachTip.textContent = match.tip;
    els.coachBanner.hidden = false;
    els.questionPanel.hidden = true;
    els.feedback.hidden = true;
    resetPitch();
    showScreen('match');
  }

  function beginQuestions() {
    playTapSound();
    els.coachBanner.hidden = true;
    els.questionPanel.hidden = false;
    showQuestion();
  }

  function currentRawItem() {
    return state.match.items[state.qIndex];
  }

  function getActivePhase() {
    const item = currentRawItem();
    if (!item) return null;
    if (item.type === 'word') {
      return item.phases[state.wordPhase];
    }
    return item;
  }

  function phaseLabelText(phase) {
    if (!phase || !phase.phase) return '';
    if (phase.phase === 'equation') return '步驟 1／3 · 選方程';
    if (phase.phase === 'solve') return '步驟 2／3 · 求 x';
    if (phase.phase === 'verify') return '步驟 3／3 · 驗算';
    return '';
  }

  function isLastPhaseOfItem() {
    const item = currentRawItem();
    if (!item) return true;
    if (item.type === 'word') {
      return state.wordPhase >= item.phases.length - 1;
    }
    return true;
  }

  function showQuestion() {
    state.attempt = 0;
    state.locked = false;
    state.typed = '';
    if (state.wordPhase === 0) {
      state.missedThisQuestion = false;
    }
    state.activePhase = getActivePhase();
    const phase = state.activePhase;
    if (!phase) return;

    els.feedback.hidden = true;
    els.feedback.classList.remove('is-goal', 'is-save');
    els.choices.innerHTML = '';
    els.choices.hidden = true;
    els.keypad.hidden = true;
    els.reminder.hidden = true;
    resetPitch();
    updateTypedDisplay();

    const qNum = state.qIndex + 1;
    els.matchProgress.textContent = `第 ${qNum} / ${QUESTIONS_PER_MATCH} 題`;
    els.score.textContent = String(state.firstTryGoals);

    const label = phaseLabelText(phase);
    if (label) {
      els.phaseLabel.hidden = false;
      els.phaseLabel.textContent = label;
    } else {
      els.phaseLabel.hidden = true;
    }

    els.prompt.textContent = phase.prompt;
    els.prompt.focus();

    if (phase.equationReminder) {
      els.reminder.hidden = false;
      els.reminder.textContent = `方程：${phase.equationReminder}`;
    }

    const isNumeric = phase.answer !== undefined && phase.choices === undefined;
    if (isNumeric || phase.phase === 'solve') {
      els.keypad.hidden = false;
      state.typed = '';
      updateTypedDisplay();
    } else {
      els.choices.hidden = false;
      renderChoices(phase.choices || []);
    }
  }

  function renderChoices(choices) {
    els.choices.innerHTML = '';
    choices.forEach((text) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'choice-btn';
      btn.textContent = text;
      btn.addEventListener('click', () => onAnswer(text, btn));
      els.choices.appendChild(btn);
    });
  }

  function updateTypedDisplay() {
    if (state.typed === '') {
      els.typed.textContent = '輸入 x';
      els.typed.classList.add('is-empty');
    } else {
      els.typed.textContent = state.typed;
      els.typed.classList.remove('is-empty');
    }
  }

  function onKeypad(key) {
    if (state.locked || els.keypad.hidden) return;
    if (key === 'clear') {
      playTapSound();
      state.typed = '';
      updateTypedDisplay();
      return;
    }
    if (key === 'submit') {
      if (state.typed === '') return;
      playTapSound();
      onAnswer(state.typed);
      return;
    }
    if (state.typed.length >= 3) return;
    playTapSound();
    state.typed += key;
    updateTypedDisplay();
  }

  function answersEqual(given, expected) {
    if (typeof expected === 'number') {
      return Number(given) === expected;
    }
    return String(given) === String(expected);
  }

  function onAnswer(value, choiceBtn) {
    if (state.locked) return;
    const phase = state.activePhase;
    if (!phase) return;

    const correct = answersEqual(value, phase.answer);
    state.attempt += 1;

    if (correct) {
      state.locked = true;
      if (choiceBtn) choiceBtn.classList.add('is-correct');
      disableInputs();
      const phaseFirstTry = state.attempt === 1;
      const itemComplete = isLastPhaseOfItem();
      const itemFirstTry = phaseFirstTry && !state.missedThisQuestion;
      const praise = nextEncourage();

      if (itemComplete && itemFirstTry) {
        state.firstTryGoals += 1;
        els.score.textContent = String(state.firstTryGoals);
        bumpStreak();
        animateGoal('+1 入球');
        showFeedback(true, true, phase, false, false, false, praise);
      } else if (itemComplete) {
        animateGoal(praise);
        showFeedback(true, false, phase, false, false, false, praise);
      } else if (phaseFirstTry && !state.missedThisQuestion) {
        animateGoal(praise);
        showFeedback(true, true, phase, false, false, true, praise);
      } else {
        animateGoal(praise);
        showFeedback(true, false, phase, false, false, true, praise);
      }
      return;
    }

    state.missedThisQuestion = true;
    resetStreak();
    if (choiceBtn) choiceBtn.classList.add('is-wrong');
    animateSave();

    if (state.attempt === 1) {
      state.locked = true;
      disableInputs();
      showFeedback(false, false, phase, true);
      return;
    }

    state.locked = true;
    disableInputs();
    showFeedback(false, false, phase, false, true);
  }

  function disableInputs() {
    els.choices.querySelectorAll('button').forEach((b) => {
      b.disabled = true;
    });
  }

  function showFeedback(isCorrect, firstTry, phase, retryAfter, reveal, midStep, praise) {
    els.feedback.hidden = false;
    els.feedback.classList.toggle('is-goal', isCorrect);
    els.feedback.classList.toggle('is-save', !isCorrect);

    els.feedbackSteps.innerHTML = '';
    (phase.steps || []).forEach((s) => {
      const li = document.createElement('li');
      li.textContent = s;
      els.feedbackSteps.appendChild(li);
    });
    els.feedbackCheck.textContent = phase.check ? `檢查：${phase.check}` : '';

    if (isCorrect && midStep) {
      els.feedbackTitle.textContent = praise || '正確！';
      els.feedbackNote.textContent = firstTry
        ? '這一步答對了，繼續完成整題才計入球。'
        : '這一步對了，繼續下一小步。';
      els.feedbackNext.textContent = nextButtonLabel(true);
    } else if (isCorrect && firstTry) {
      els.feedbackTitle.textContent = praise || '入球！';
      els.feedbackNote.textContent = '第一次就射中，計一分。';
      els.feedbackNext.textContent = nextButtonLabel(true);
    } else if (isCorrect) {
      els.feedbackTitle.textContent = praise || '入球！';
      els.feedbackNote.textContent = '這題有錯過，不算第一次入球。';
      els.feedbackNext.textContent = nextButtonLabel(true);
    } else if (retryAfter) {
      els.feedbackTitle.textContent = '守門員救出！';
      els.feedbackNote.textContent = '看看平衡步驟，再試一次。';
      els.feedbackNext.textContent = '再射一次';
    } else if (reveal) {
      els.feedbackTitle.textContent = '兩次未中';
      els.feedbackNote.textContent = `正確答案是：${phase.answer}`;
      els.feedbackNext.textContent = nextButtonLabel(false);
    }

    els.feedbackNext.onclick = () => {
      playTapSound();
      if (retryAfter) {
        state.locked = false;
        els.feedback.hidden = true;
        resetPitch();
        els.choices.querySelectorAll('button').forEach((b) => {
          if (!b.classList.contains('is-wrong')) b.disabled = false;
        });
        if (!els.keypad.hidden) {
          state.typed = '';
          updateTypedDisplay();
        }
        return;
      }
      advanceAfterPhase();
    };
  }

  function nextButtonLabel(success) {
    const item = currentRawItem();
    if (item && item.type === 'word' && state.wordPhase < item.phases.length - 1) {
      return success ? '下一步' : '繼續下一步';
    }
    if (state.qIndex >= QUESTIONS_PER_MATCH - 1) {
      return '看結果';
    }
    return '下一題';
  }

  function advanceAfterPhase() {
    const item = currentRawItem();
    if (item && item.type === 'word' && state.wordPhase < item.phases.length - 1) {
      state.wordPhase += 1;
      showQuestion();
      return;
    }
    state.wordPhase = 0;
    state.qIndex += 1;
    if (state.qIndex >= QUESTIONS_PER_MATCH) {
      finishMatch();
      return;
    }
    showQuestion();
  }

  function calcStars(goals) {
    if (goals >= 5) return 3;
    if (goals >= 3) return 2;
    if (goals >= 1) return 1;
    return 0;
  }

  function badgeLine(earned) {
    if (earned >= 3) return '金球教練認證！場上代數王！';
    if (earned === 2) return '優秀前鋒！再練就拿三星。';
    if (earned === 1) return '入球解鎖！下一場等你。';
    return '再練一場，至少射中 1 題就能解鎖。';
  }

  function renderResultStars(earned) {
    els.resultStars.innerHTML = '';
    els.resultStars.setAttribute('aria-label', `${earned} 星`);
    const svgNS = 'http://www.w3.org/2000/svg';
    for (let i = 0; i < 3; i++) {
      const filled = i < earned;
      const svg = document.createElementNS(svgNS, 'svg');
      svg.setAttribute('viewBox', '0 0 64 64');
      svg.setAttribute('class', 'result-star-svg' + (filled ? ' earned' : ''));
      if (filled && !prefersReducedMotion) {
        svg.style.animationDelay = `${i * 0.14}s`;
      }
      const path = document.createElementNS(svgNS, 'path');
      path.setAttribute(
        'd',
        'M32 4L40.2 21.3L59.2 23.8L45.3 37L48.8 55.9L32 46.7L15.2 55.9L18.7 37L4.8 23.8L23.8 21.3L32 4Z'
      );
      path.setAttribute('fill', filled ? '#ffd56a' : 'rgba(148, 180, 160, 0.22)');
      path.setAttribute('stroke', filled ? '#ffe08a' : 'rgba(148, 180, 160, 0.4)');
      path.setAttribute('stroke-width', '2.5');
      path.setAttribute('stroke-linejoin', 'round');
      svg.appendChild(path);
      els.resultStars.appendChild(svg);
    }
  }

  function finishMatch() {
    const goals = state.firstTryGoals;
    const earned = calcStars(goals);
    const prev = starsFor(state.levelId);
    if (earned > prev) {
      state.stars[state.levelId] = earned;
      saveStars();
    }
    const kept = starsFor(state.levelId);

    els.resultTitle.textContent = earned > 0 ? '全場完結' : '再練一場';
    els.resultBadge.textContent = badgeLine(earned);
    els.statFirstTry.textContent = `${goals} / ${QUESTIONS_PER_MATCH}`;
    els.statBestStreak.textContent = String(state.bestStreak);
    els.statMatchStars.textContent = String(earned);
    renderResultStars(kept);

    if (earned === 0) {
      els.resultNote.textContent = '這場未取得星星。再賽一場，至少射中 1 題就可以解鎖下一場。';
    } else if (earned > prev) {
      els.resultNote.textContent =
        kept >= 1 && state.levelId < 8
          ? `得到 ${kept} 星！下一場已解鎖。`
          : `得到 ${kept} 星！`;
    } else {
      els.resultNote.textContent =
        `本場 ${earned} 星；已保存最高 ${kept} 星。` +
        (state.levelId < 8 && kept >= 1 ? '下一場已解鎖。' : '');
    }

    showScreen('result');
    if (earned > 0) {
      playStarSound();
      window.setTimeout(() => burstAtResult(), 80);
    }
  }

  function openQuitConfirm() {
    els.quitConfirm.hidden = false;
  }

  function closeQuitConfirm() {
    els.quitConfirm.hidden = true;
  }

  function openResetConfirm() {
    els.resetConfirm.hidden = false;
  }

  function closeResetConfirm() {
    els.resetConfirm.hidden = true;
  }

  function resetProgress() {
    state.stars = {};
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      /* ignore */
    }
    updateStarDisplays();
    closeResetConfirm();
    showScreen('home');
  }

  // Events
  els.soundToggle.addEventListener('click', () => {
    state.soundOn = !state.soundOn;
    els.soundToggle.setAttribute('aria-pressed', state.soundOn ? 'true' : 'false');
    els.soundToggle.textContent = state.soundOn ? '音效：開' : '音效：關';
    const a = audio();
    if (a) a.setMuted(!state.soundOn, state.soundOn);
  });

  els.goMap.addEventListener('click', () => {
    playTapSound();
    renderMap();
    showScreen('map');
  });

  els.mapHome.addEventListener('click', () => {
    playTapSound();
    updateStarDisplays();
    showScreen('home');
  });

  els.startQuestion.addEventListener('click', beginQuestions);

  els.keys.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-key]');
    if (!btn) return;
    onKeypad(btn.getAttribute('data-key'));
  });

  els.quitMatch.addEventListener('click', openQuitConfirm);
  els.quitStay.addEventListener('click', closeQuitConfirm);
  els.quitLeave.addEventListener('click', () => {
    closeQuitConfirm();
    renderMap();
    showScreen('map');
  });

  els.resetProgress.addEventListener('click', openResetConfirm);
  els.resetCancel.addEventListener('click', closeResetConfirm);
  els.resetConfirmBtn.addEventListener('click', resetProgress);

  els.replay.addEventListener('click', () => {
    playTapSound();
    if (state.levelId) startMatch(state.levelId);
  });

  els.backMap.addEventListener('click', () => {
    playTapSound();
    renderMap();
    showScreen('map');
  });

  // Visual FX (presentation only — does not affect scoring)
  if (els.fxCanvas && fx.ctx) {
    resizeFxCanvas();
    window.addEventListener('resize', resizeFxCanvas);
    if (!prefersReducedMotion) {
      window.addEventListener(
        'pointermove',
        (e) => {
          fx.parallax.tx = (e.clientX / window.innerWidth - 0.5) * 18;
          fx.parallax.ty = (e.clientY / window.innerHeight - 0.5) * 12;
        },
        { passive: true }
      );
    }
    requestAnimationFrame(tickFx);
  }

  // Init — sound default ON
  if (audio()) {
    audio().muted = false;
  }
  els.soundToggle.setAttribute('aria-pressed', 'true');
  els.soundToggle.textContent = '音效：開';
  updateStarDisplays();
  showScreen('home');
})();
