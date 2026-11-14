/**
 * 足球代數 — 題目產生器（香港小五 5A1 + 5A2，只用整數）
 */
(function (global) {
  'use strict';

  function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function pick(arr) {
    return arr[randInt(0, arr.length - 1)];
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = randInt(0, i);
      const t = a[i];
      a[i] = a[j];
      a[j] = t;
    }
    return a;
  }

  function uniqueChoices(correct, distractors, count) {
    const set = new Set([String(correct)]);
    const out = [String(correct)];
    for (const d of shuffle(distractors)) {
      const s = String(d);
      if (!set.has(s) && s !== '') {
        set.add(s);
        out.push(s);
      }
      if (out.length >= count) break;
    }
    let n = 1;
    while (out.length < count && n < 20) {
      const filler = '選項 ' + n;
      n += 1;
      if (!set.has(filler)) {
        set.add(filler);
        out.push(filler);
      }
    }
    return shuffle(out).slice(0, count);
  }

  function letterItem() {
    const letter = pick(['a', 'b', 'n', 'x', 'y']);
    const value = randInt(2, 20);
    const contexts = [
      {
        prompt: `如果 ${letter} = ${value}，那麼 ${letter} 代表哪個數？`,
        answer: String(value),
        distractors: [String(value + 1), String(Math.max(0, value - 1)), letter, String(value * 2)]
      },
      {
        prompt: `一個未知數用字母 ${letter} 表示。若 ${letter} 等於 ${value}，下列哪個正確？`,
        answer: `${letter} = ${value}`,
        distractors: [`${letter} + ${value}`, `${value}${letter}`, `${letter} ≠ ${value}`, `${letter} × ${value}`]
      },
      {
        prompt: `球場上有 ${value} 個足球，用字母 ${letter} 表示足球的數目。下列哪句正確？`,
        answer: `${letter} = ${value}`,
        distractors: [`${letter} = ${value + 3}`, `${letter} + ${value} = 0`, `${value} = ${letter} + ${value}`, `${letter} 是字母，不是數`]
      }
    ];
    const c = pick(contexts);
    return {
      type: 'choice',
      prompt: c.prompt,
      choices: uniqueChoices(c.answer, c.distractors, 4),
      answer: c.answer,
      steps: [
        `字母可以代表一個未知的數。`,
        `題目告訴我們 ${letter} 的值是 ${value}。`,
        `所以答案是 ${c.answer}。`
      ],
      check: `用 ${value} 代入 ${letter} 檢驗即可。`
    };
  }

  function notationItem() {
    const kind = pick(['mul', 'div', 'sum3', 'read']);
    if (kind === 'mul') {
      const n = pick([2, 3, 4, 5, 6]);
      const correct = `${n}x`;
      return {
        type: 'choice',
        prompt: `${n} × x 可以寫成下列哪一種？`,
        choices: uniqueChoices(correct, [`x${n}`, `x/${n}`, `x + ${n}`, `${n} + x`], 4),
        answer: correct,
        steps: [
          `${n} 個 x 相加就是 ${n} × x。`,
          `代數裏習慣寫成 ${n}x（數字寫在字母前面）。`,
          `所以答案是 ${correct}。`
        ],
        check: `${n}x = ${n} × x`
      };
    }
    if (kind === 'div') {
      const n = pick([2, 3, 4, 5]);
      const correct = `x/${n}`;
      return {
        type: 'choice',
        prompt: `x ÷ ${n} 可以寫成下列哪一種？`,
        choices: uniqueChoices(correct, [`${n}x`, `x − ${n}`, `${n}/x`, `x + ${n}`], 4),
        answer: correct,
        steps: [
          `x 除以 ${n} 寫成 x ÷ ${n}。`,
          `代數裏也常寫成 x/${n}。`,
          `所以答案是 ${correct}。`
        ],
        check: `x/${n} = x ÷ ${n}`
      };
    }
    if (kind === 'sum3') {
      const correct = '3x';
      return {
        type: 'choice',
        prompt: 'x + x + x 等於下列哪一項？',
        choices: uniqueChoices(correct, ['x/3', 'x + 3', '3 + x + x', 'x³'], 4),
        answer: correct,
        steps: [
          '三個 x 相加，就是 3 個 x。',
          '寫成 3 × x，再簡寫為 3x。',
          '所以答案是 3x。'
        ],
        check: 'x + x + x = 3x'
      };
    }
    const n = pick([2, 3, 4, 5]);
    const form = pick([`${n}x`, `x/${n}`]);
    if (form === `${n}x`) {
      return {
        type: 'choice',
        prompt: `${n}x 的意思是？`,
        choices: uniqueChoices(`${n} × x`, [`x ÷ ${n}`, `x + ${n}`, `${n} + x`, `x − ${n}`], 4),
        answer: `${n} × x`,
        steps: [`${n}x 代表 ${n} 乘以 x。`, `也可以想成 ${n} 個 x 相加。`],
        check: `${n}x = ${n} × x`
      };
    }
    return {
      type: 'choice',
      prompt: `x/${n} 的意思是？`,
      choices: uniqueChoices(`x ÷ ${n}`, [`${n} × x`, `x + ${n}`, `${n} ÷ x`, `x − ${n}`], 4),
      answer: `x ÷ ${n}`,
      steps: [`x/${n} 代表 x 除以 ${n}。`],
      check: `x/${n} = x ÷ ${n}`
    };
  }

  function sentenceItem() {
    const templates = [
      () => {
        const n = randInt(3, 12);
        const m = pick([2, 3, 4]);
        const correct = `${n} + ${m}a`;
        return {
          prompt: `把句子寫成代數式：「${n} 與 a 的 ${m === 2 ? '兩' : m === 3 ? '三' : '四'}倍之和」`,
          answer: correct,
          distractors: [`${n}${m}a`, `${m}a − ${n}`, `${n} − ${m}a`, `a + ${n}${m}`],
          steps: [
            `a 的 ${m === 2 ? '兩' : m === 3 ? '三' : '四'}倍是 ${m}a。`,
            `與 ${n} 的和就是 ${n} + ${m}a。`
          ],
          check: correct
        };
      },
      () => {
        const more = pick([2, 3, 4, 5]);
        const correct = `a = b + ${more}`;
        return {
          prompt: `把句子寫成代數式：「A 比 B 多 ${more}」（用 a、b 表示）`,
          answer: correct,
          distractors: [`a = b − ${more}`, `a + b = ${more}`, `a = ${more}b`, `b = a + ${more}`],
          steps: [
            `「A 比 B 多 ${more}」表示 a 比 b 大 ${more}。`,
            `所以 a = b + ${more}。`
          ],
          check: `若 b = 10，則 a = ${10 + more}`
        };
      },
      () => {
        const more = pick([2, 3, 4]);
        const correct = `b = a − ${more}`;
        return {
          prompt: `「B 比 A 少 ${more}」用字母寫成：`,
          answer: correct,
          distractors: [`b = a + ${more}`, `a = b − ${more}`, `b + a = ${more}`, `${more}b = a`],
          steps: [
            `B 比 A 少 ${more}，即 b 比 a 小 ${more}。`,
            `所以 b = a − ${more}。`
          ],
          check: correct
        };
      },
      () => {
        const n = randInt(4, 15);
        const correct = `x − ${n}`;
        return {
          prompt: `「一個數 x 減去 ${n}」的代數式是？`,
          answer: correct,
          distractors: [`${n} − x`, `x + ${n}`, `${n}x`, `x/${n}`],
          steps: [`未知數是 x，減去 ${n}，寫成 x − ${n}。`],
          check: correct
        };
      },
      () => {
        const n = pick([2, 3, 4, 5]);
        const correct = `${n}y`;
        return {
          prompt: `「y 的 ${n === 2 ? '兩' : n === 3 ? '三' : n === 4 ? '四' : '五'}倍」寫成：`,
          answer: correct,
          distractors: [`y/${n}`, `y + ${n}`, `${n} + y`, `y − ${n}`],
          steps: [`y 的 ${n} 倍是 ${n} × y，寫成 ${n}y。`],
          check: correct
        };
      }
    ];
    const c = pick(templates)();
    return {
      type: 'choice',
      prompt: c.prompt,
      choices: uniqueChoices(c.answer, c.distractors, 4),
      answer: c.answer,
      steps: c.steps,
      check: c.check
    };
  }

  function equationIdentifyItem() {
    const x = randInt(2, 9);
    const b = randInt(2, 12);
    const c = x + b;
    const good = pick([
      `x + ${b} = ${c}`,
      `${pick([2, 3, 4])}x = ${pick([2, 3, 4]) * x}`,
      `x − ${b} = ${Math.max(0, x - b)}`
    ]);
    const badPool = [
      `x + ${b}`,
      `${c} − ${b}`,
      `3 + 5 = 8`,
      `x > ${b}`,
      `${b}x + ${c}`
    ];
    const choices = uniqueChoices(good, badPool, 4);
    return {
      type: 'choice',
      prompt: '下列哪一項是方程？（有未知數，又有等號）',
      choices,
      answer: good,
      steps: [
        '方程必須同時有未知數和等號。',
        `${good} 左邊、右邊用等號相連，而且含有 x。`,
        '其他選項可能只是代數式、沒有未知數，或不是相等關係。'
      ],
      check: `${good} 兩邊平衡時才成立。`
    };
  }

  function balanceItem() {
    const left = randInt(4, 15);
    const rightAdd = randInt(1, 6);
    const right = left;
    const wrongRight = left + rightAdd;
    const good = `左盤 ${left}，右盤 ${right}（兩邊相等）`;
    const distractors = [
      `左盤 ${left}，右盤 ${wrongRight}`,
      `左盤 ${left + 2}，右盤 ${left}`,
      `左盤 ${left}，右盤 ${left - 1 > 0 ? left - 1 : left + 3}`,
      `左盤 ${left + 3}，右盤 ${left + 1}`
    ];
    return {
      type: 'choice',
      prompt: '天平哪一種放法會平衡？',
      choices: uniqueChoices(good, distractors, 4),
      answer: good,
      steps: [
        '方程像天平：左右兩邊必須相等才會平衡。',
        `左盤是 ${left}，右盤也要是 ${right}。`,
        '兩邊相等，天平就平衡。'
      ],
      check: `${left} = ${right}`
    };
  }

  function stepsAdd(x, b, c) {
    return [
      `方程：x + ${b} = ${c}`,
      `兩邊同時減去 ${b}，天平仍然平衡。`,
      `x + ${b} − ${b} = ${c} − ${b}`,
      `x = ${x}`
    ];
  }

  function stepsSub(x, b, c) {
    return [
      `方程：x − ${b} = ${c}`,
      `兩邊同時加上 ${b}。`,
      `x − ${b} + ${b} = ${c} + ${b}`,
      `x = ${x}`
    ];
  }

  function stepsMul(x, a, b) {
    return [
      `方程：${a}x = ${b}`,
      `兩邊同時除以 ${a}。`,
      `${a}x ÷ ${a} = ${b} ÷ ${a}`,
      `x = ${x}`
    ];
  }

  function stepsDiv(x, a, b) {
    return [
      `方程：x/${a} = ${b}`,
      `兩邊同時乘以 ${a}。`,
      `(x/${a}) × ${a} = ${b} × ${a}`,
      `x = ${x}`
    ];
  }

  function stepsAxPlus(x, a, b, c) {
    return [
      `方程：${a}x + ${b} = ${c}`,
      `兩邊同時減去 ${b}：${a}x = ${c - b}`,
      `兩邊同時除以 ${a}：x = ${x}`
    ];
  }

  function stepsAxMinus(x, a, b, c) {
    return [
      `方程：${a}x − ${b} = ${c}`,
      `兩邊同時加上 ${b}：${a}x = ${c + b}`,
      `兩邊同時除以 ${a}：x = ${x}`
    ];
  }

  function stepsXOverPlus(x, a, b, c) {
    return [
      `方程：x/${a} + ${b} = ${c}`,
      `兩邊同時減去 ${b}：x/${a} = ${c - b}`,
      `兩邊同時乘以 ${a}：x = ${x}`
    ];
  }

  function stepsXOverMinus(x, a, b, c) {
    return [
      `方程：x/${a} − ${b} = ${c}`,
      `兩邊同時加上 ${b}：x/${a} = ${c + b}`,
      `兩邊同時乘以 ${a}：x = ${x}`
    ];
  }

  function solveAddSub() {
    if (Math.random() < 0.5) {
      const b = randInt(2, 20);
      const x = randInt(0, 40);
      const c = x + b;
      if (c > 99) return solveAddSub();
      return {
        type: 'numeric',
        prompt: `解方程：x + ${b} = ${c}\n求 x。`,
        answer: x,
        steps: stepsAdd(x, b, c),
        check: `驗算：${x} + ${b} = ${c}`
      };
    }
    const b = randInt(1, 15);
    const c = randInt(0, 40);
    const x = c + b;
    if (x > 99) return solveAddSub();
    return {
      type: 'numeric',
      prompt: `解方程：x − ${b} = ${c}\n求 x。`,
      answer: x,
      steps: stepsSub(x, b, c),
      check: `驗算：${x} − ${b} = ${c}`
    };
  }

  function solveMulDiv() {
    if (Math.random() < 0.5) {
      const a = randInt(2, 9);
      const x = randInt(0, 12);
      const b = a * x;
      if (b > 99) return solveMulDiv();
      return {
        type: 'numeric',
        prompt: `解方程：${a}x = ${b}\n求 x。`,
        answer: x,
        steps: stepsMul(x, a, b),
        check: `驗算：${a} × ${x} = ${b}`
      };
    }
    const a = randInt(2, 9);
    const b = randInt(0, 12);
    const x = a * b;
    if (x > 99) return solveMulDiv();
    return {
      type: 'numeric',
      prompt: `解方程：x/${a} = ${b}\n求 x。`,
      answer: x,
      steps: stepsDiv(x, a, b),
      check: `驗算：${x} ÷ ${a} = ${b}`
    };
  }

  function solveTwoStep() {
    const kind = pick(['ax+', 'ax-', 'x/a+', 'x/a-']);
    if (kind === 'ax+') {
      const a = randInt(2, 6);
      const x = randInt(0, 12);
      const b = randInt(1, 15);
      const c = a * x + b;
      if (c > 99) return solveTwoStep();
      return {
        type: 'numeric',
        prompt: `解方程：${a}x + ${b} = ${c}\n求 x。`,
        answer: x,
        steps: stepsAxPlus(x, a, b, c),
        check: `驗算：${a} × ${x} + ${b} = ${c}`
      };
    }
    if (kind === 'ax-') {
      const a = randInt(2, 6);
      const x = randInt(1, 12);
      const b = randInt(1, 15);
      const c = a * x - b;
      if (c < 0 || a * x > 99) return solveTwoStep();
      return {
        type: 'numeric',
        prompt: `解方程：${a}x − ${b} = ${c}\n求 x。`,
        answer: x,
        steps: stepsAxMinus(x, a, b, c),
        check: `驗算：${a} × ${x} − ${b} = ${c}`
      };
    }
    if (kind === 'x/a+') {
      const a = randInt(2, 6);
      const xPart = randInt(0, 12);
      const x = a * xPart;
      const b = randInt(1, 15);
      const c = xPart + b;
      if (x > 99 || c > 99) return solveTwoStep();
      return {
        type: 'numeric',
        prompt: `解方程：x/${a} + ${b} = ${c}\n求 x。`,
        answer: x,
        steps: stepsXOverPlus(x, a, b, c),
        check: `驗算：${x} ÷ ${a} + ${b} = ${c}`
      };
    }
    const a = randInt(2, 6);
    const xPart = randInt(1, 12);
    const x = a * xPart;
    const b = randInt(1, Math.min(10, xPart));
    const c = xPart - b;
    if (c < 0 || x > 99) return solveTwoStep();
    return {
      type: 'numeric',
      prompt: `解方程：x/${a} − ${b} = ${c}\n求 x。`,
      answer: x,
      steps: stepsXOverMinus(x, a, b, c),
      check: `驗算：${x} ÷ ${a} − ${b} = ${c}`
    };
  }

  function wordProblemItem() {
    const templates = [
      () => {
        const scored = randInt(3, 8);
        const total = scored + randInt(5, 12);
        const x = total - scored;
        const eq = `x + ${scored} = ${total}`;
        const wrong = [
          `x = ${total} − ${scored}`,
          `x − ${scored} = ${total}`,
          `${scored}x = ${total}`,
          `x + ${total} = ${scored}`
        ];
        return {
          story: `足球隊已入 ${scored} 球，還要再入 x 球，才能達到 ${total} 球。下列哪個方程配合題意？`,
          equation: eq,
          wrongEquations: wrong,
          x,
          checkLine: `${x} + ${scored} = ${total}`,
          stepsSolve: stepsAdd(x, scored, total)
        };
      },
      () => {
        const given = randInt(4, 10);
        const remain = randInt(2, 8);
        const x = given + remain;
        const eq = `x − ${given} = ${remain}`;
        const wrong = [
          `x = ${remain} + ${given}`,
          `x + ${given} = ${remain}`,
          `${given}x = ${remain}`,
          `x − ${remain} = ${given}`
        ];
        return {
          story: `球衣櫃原有 x 件球衣，借出 ${given} 件後還剩 ${remain} 件。哪個方程正確？`,
          equation: eq,
          wrongEquations: wrong,
          x,
          checkLine: `${x} − ${given} = ${remain}`,
          stepsSolve: stepsSub(x, given, remain)
        };
      },
      () => {
        const a = pick([2, 3, 4]);
        const x = randInt(2, 10);
        const b = a * x;
        const eq = `${a}x = ${b}`;
        const wrong = [
          `x = ${b} ÷ ${a}`,
          `x + ${a} = ${b}`,
          `x/${a} = ${b}`,
          `${a} + x = ${b}`
        ];
        return {
          story: `每組 ${a} 人，共有 x 組球員，全隊一共 ${b} 人。哪個方程配合題意？`,
          equation: eq,
          wrongEquations: wrong,
          x,
          checkLine: `${a} × ${x} = ${b}`,
          stepsSolve: stepsMul(x, a, b)
        };
      },
      () => {
        const a = pick([2, 3, 4, 5]);
        const b = randInt(2, 9);
        const x = a * b;
        const eq = `x/${a} = ${b}`;
        const wrong = [
          `x = ${a} × ${b}`,
          `${a}x = ${b}`,
          `x − ${a} = ${b}`,
          `x + ${a} = ${b}`
        ];
        return {
          story: `把 x 個訓練錐平均分成 ${a} 組，每組 ${b} 個。哪個方程正確？`,
          equation: eq,
          wrongEquations: wrong,
          x,
          checkLine: `${x} ÷ ${a} = ${b}`,
          stepsSolve: stepsDiv(x, a, b)
        };
      },
      () => {
        const a = pick([2, 3, 4]);
        const x = randInt(2, 8);
        const b = randInt(2, 10);
        const c = a * x + b;
        if (c > 99) return null;
        const eq = `${a}x + ${b} = ${c}`;
        const wrong = [
          `x = (${c} − ${b}) ÷ ${a}`,
          `${a}x − ${b} = ${c}`,
          `x/${a} + ${b} = ${c}`,
          `${a} + x + ${b} = ${c}`
        ];
        return {
          story: `每袋有 ${a} 個足球，買了 x 袋，又另外買了 ${b} 個，一共 ${c} 個。哪個方程配合題意？`,
          equation: eq,
          wrongEquations: wrong,
          x,
          checkLine: `${a} × ${x} + ${b} = ${c}`,
          stepsSolve: stepsAxPlus(x, a, b, c)
        };
      }
    ];

    let data = null;
    for (let i = 0; i < 8 && !data; i++) {
      data = pick(templates)();
    }
    if (!data) {
      const scored = 5;
      const total = 16;
      const x = 11;
      data = {
        story: `足球隊已入 ${scored} 球，還要再入 x 球，才能達到 ${total} 球。下列哪個方程配合題意？`,
        equation: `x + ${scored} = ${total}`,
        wrongEquations: [`x = ${total} − ${scored}`, `x − ${scored} = ${total}`, `${scored}x = ${total}`],
        x,
        checkLine: `${x} + ${scored} = ${total}`,
        stepsSolve: stepsAdd(x, scored, total)
      };
    }

    return {
      type: 'word',
      phases: [
        {
          phase: 'equation',
          prompt: data.story,
          choices: uniqueChoices(data.equation, data.wrongEquations, 4),
          answer: data.equation,
          steps: [
            '應用題要先寫出配合題意的方程，不要先改寫成求 x 的算式。',
            `正確方程是 ${data.equation}。`,
            `注意：${data.wrongEquations[0]} 是解法，不是題意方程。`
          ],
          check: data.equation
        },
        {
          phase: 'solve',
          prompt: `已知方程 ${data.equation}，求 x。`,
          equationReminder: data.equation,
          answer: data.x,
          steps: data.stepsSolve,
          check: `x = ${data.x}`
        },
        {
          phase: 'verify',
          prompt: `把 x = ${data.x} 代入原方程，下列哪一行是正確的驗算？`,
          choices: uniqueChoices(data.checkLine, [
            `${data.x} + ${data.x} = 0`,
            `x = ${data.x}（尚未代入）`,
            `${data.x} − ${data.x} = ${data.x}`,
            `驗算不需要代入`
          ], 4),
          answer: data.checkLine,
          steps: [
            '驗算要把求得的 x 代回原方程。',
            `代入後得到：${data.checkLine}。`,
            '左右相等，答案正確。'
          ],
          check: data.checkLine
        }
      ]
    };
  }

  const LEVELS = [
    {
      id: 1,
      title: '第 1 場 · 字母代表數',
      unit: '5A1',
      tip: '字母可以代表一個未知的數。看見 a = 7，就表示 a 這個數等於 7。',
      generate: letterItem
    },
    {
      id: 2,
      title: '第 2 場 · 3x 與 x/3',
      unit: '5A1',
      tip: '3x 就是 3 × x；x/3 就是 x ÷ 3。數字寫在字母前面。',
      generate: notationItem
    },
    {
      id: 3,
      title: '第 3 場 · 句子變代數式',
      unit: '5A1',
      tip: '「A 比 B 多 2」寫成 a = b + 2。先想清楚誰多誰少，再寫式子。',
      generate: sentenceItem
    },
    {
      id: 4,
      title: '第 4 場 · 甚麼是方程',
      unit: '5A2',
      tip: '方程像天平：有未知數，又有等號，兩邊要平衡。',
      generate: function () {
        return Math.random() < 0.5 ? equationIdentifyItem() : balanceItem();
      }
    },
    {
      id: 5,
      title: '第 5 場 · x±b = c',
      unit: '5A2',
      tip: '解 x + b = c 時，兩邊同時減 b；解 x − b = c 時，兩邊同時加 b。',
      generate: solveAddSub
    },
    {
      id: 6,
      title: '第 6 場 · ax 與 x/a',
      unit: '5A2',
      tip: '解 ax = b 時兩邊同除以 a；解 x/a = b 時兩邊同乘以 a。',
      generate: solveMulDiv
    },
    {
      id: 7,
      title: '第 7 場 · 兩步方程',
      unit: '5A2',
      tip: '兩步方程：先加減，去掉常數；再乘除，求出 x。每一步都要兩邊一起做。',
      generate: solveTwoStep
    },
    {
      id: 8,
      title: '第 8 場 · 決賽應用題',
      unit: '5A2 決賽',
      tip: '先選配合故事的方程（例如 x + 5 = 16），再求 x，最後代入驗算。',
      generate: wordProblemItem
    }
  ];

  function buildMatch(levelId) {
    const level = LEVELS.find((l) => l.id === levelId);
    if (!level) return null;
    const items = [];
    for (let i = 0; i < 6; i++) {
      items.push(level.generate());
    }
    return {
      levelId: level.id,
      title: level.title,
      unit: level.unit,
      tip: level.tip,
      items
    };
  }

  global.SoccerAlgebra = {
    LEVELS: LEVELS.map((l) => ({
      id: l.id,
      title: l.title,
      unit: l.unit,
      tip: l.tip
    })),
    buildMatch: buildMatch
  };
})(window);
