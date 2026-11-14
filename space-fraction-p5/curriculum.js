/**
 * 星際分數探險隊 - 小五 (P5) 分數題庫
 * 資料與遊戲邏輯完全分離，可自由新增、修改題目。
 */

window.FRACTION_CURRICULUM = {
  easy: {
    id: 'easy',
    label: '簡單',
    subtitle: '初級航道：基礎異分母加減與約分',
    badgeColor: '#38bdf8',
    questions: [
      {
        id: 'e1',
        tag: '基礎通分',
        story: '左翼推進器有 1/2 格能量，右翼再補充 1/4 格能量，合共有多少格？',
        parts: [
          { type: 'frac', n: 1, d: 2 },
          { type: 'op', value: '+' },
          { type: 'frac', n: 1, d: 4 }
        ],
        answer: { n: 3, d: 4 },
        distractors: [
          { n: 2, d: 6 },
          { n: 1, d: 6 },
          { n: 1, d: 2 }
        ],
        hint: '先通分：把 1/2 擴分為 2/4，再計算 2/4 + 1/4（分母不變，分子相加）。',
        visual: {
          type: 'bars',
          items: [
            { label: '1/2 = 2/4', total: 4, filled: 2, color: '#38bdf8' },
            { label: '1/4', total: 4, filled: 1, color: '#a78bfa' }
          ]
        }
      },
      {
        id: 'e2',
        tag: '通分與約分',
        story: '太空站收集了 1/3 桶太陽能與 1/6 桶星塵能量，共是多少桶？',
        parts: [
          { type: 'frac', n: 1, d: 3 },
          { type: 'op', value: '+' },
          { type: 'frac', n: 1, d: 6 }
        ],
        answer: { n: 1, d: 2 },
        distractors: [
          { n: 2, d: 9 },
          { n: 1, d: 3 },
          { n: 2, d: 3 }
        ],
        hint: '把 1/3 擴分為 2/6，算出 2/6 + 1/6 = 3/6，記得還要約分成最簡分數喔！',
        visual: {
          type: 'bars',
          items: [
            { label: '1/3 = 2/6', total: 6, filled: 2, color: '#38bdf8' },
            { label: '1/6', total: 6, filled: 1, color: '#a78bfa' }
          ]
        }
      },
      {
        id: 'e3',
        tag: '異分母減法',
        story: '主引擎原有 3/4 格冷卻液，冷卻時用去了 1/2 格，還剩多少格？',
        parts: [
          { type: 'frac', n: 3, d: 4 },
          { type: 'op', value: '-' },
          { type: 'frac', n: 1, d: 2 }
        ],
        answer: { n: 1, d: 4 },
        distractors: [
          { n: 1, d: 2 },
          { n: 3, d: 8 },
          { n: 5, d: 8 }
        ],
        hint: '把 1/2 擴分為 2/4，然後用 3/4 減去 2/4（分母不變，分子相減）。',
        visual: {
          type: 'bars',
          items: [
            { label: '原有 3/4', total: 4, filled: 3, color: '#38bdf8' },
            { label: '減去 1/2 = 2/4', total: 4, filled: 2, color: '#fb7185' }
          ]
        }
      },
      {
        id: 'e4',
        tag: '通分與約分',
        story: '探測車電力原有 5/6，行駛後消耗了 1/3，現在剩下多少電力？',
        parts: [
          { type: 'frac', n: 5, d: 6 },
          { type: 'op', value: '-' },
          { type: 'frac', n: 1, d: 3 }
        ],
        answer: { n: 1, d: 2 },
        distractors: [
          { n: 2, d: 3 },
          { n: 1, d: 3 },
          { n: 4, d: 9 }
        ],
        hint: '把 1/3 化為 2/6，5/6 - 2/6 = 3/6，再把分子與分母同除以 3 約分！',
        visual: {
          type: 'bars',
          items: [
            { label: '原有 5/6', total: 6, filled: 5, color: '#38bdf8' },
            { label: '消耗 1/3 = 2/6', total: 6, filled: 2, color: '#fb7185' }
          ]
        }
      },
      {
        id: 'e5',
        tag: '基礎通分',
        story: '補給艙裝了 2/5 噸清水，又注入 3/10 噸，現在共有多少噸清水？',
        parts: [
          { type: 'frac', n: 2, d: 5 },
          { type: 'op', value: '+' },
          { type: 'frac', n: 3, d: 10 }
        ],
        answer: { n: 7, d: 10 },
        distractors: [
          { n: 5, d: 15 },
          { n: 1, d: 2 },
          { n: 3, d: 5 }
        ],
        hint: '10 是 5 的倍數，把 2/5 擴分為 4/10，再把 4/10 加上 3/10。',
        visual: {
          type: 'bars',
          items: [
            { label: '2/5 = 4/10', total: 10, filled: 4, color: '#38bdf8' },
            { label: '3/10', total: 10, filled: 3, color: '#a78bfa' }
          ]
        }
      },
      {
        id: 'e6',
        tag: '異分母減法',
        story: '氧氣罐原本有 7/8 滿，太空漫步用掉 1/4 罐，還餘下幾分之幾？',
        parts: [
          { type: 'frac', n: 7, d: 8 },
          { type: 'op', value: '-' },
          { type: 'frac', n: 1, d: 4 }
        ],
        answer: { n: 5, d: 8 },
        distractors: [
          { n: 3, d: 4 },
          { n: 3, d: 8 },
          { n: 1, d: 2 }
        ],
        hint: '把 1/4 擴分為 2/8，再算 7/8 減去 2/8 就能找到答案！',
        visual: {
          type: 'bars',
          items: [
            { label: '原有 7/8', total: 8, filled: 7, color: '#38bdf8' },
            { label: '用掉 1/4 = 2/8', total: 8, filled: 2, color: '#fb7185' }
          ]
        }
      },
      {
        id: 'e7',
        tag: '基礎通分',
        story: '火箭上午充能 1/4 格，下午再充能 3/8 格，總共充了多少格？',
        parts: [
          { type: 'frac', n: 1, d: 4 },
          { type: 'op', value: '+' },
          { type: 'frac', n: 3, d: 8 }
        ],
        answer: { n: 5, d: 8 },
        distractors: [
          { n: 4, d: 12 },
          { n: 1, d: 2 },
          { n: 7, d: 8 }
        ],
        hint: '把 1/4 擴分為 2/8，然後將 2/8 與 3/8 的分子相加。',
        visual: {
          type: 'bars',
          items: [
            { label: '1/4 = 2/8', total: 8, filled: 2, color: '#38bdf8' },
            { label: '3/8', total: 8, filled: 3, color: '#a78bfa' }
          ]
        }
      },
      {
        id: 'e8',
        tag: '異分母減法',
        story: '防護罩能量為 5/8，擋住隕石後損失 1/4，還剩下多少能量？',
        parts: [
          { type: 'frac', n: 5, d: 8 },
          { type: 'op', value: '-' },
          { type: 'frac', n: 1, d: 4 }
        ],
        answer: { n: 3, d: 8 },
        distractors: [
          { n: 1, d: 2 },
          { n: 1, d: 4 },
          { n: 7, d: 8 }
        ],
        hint: '先把 1/4 通分為 2/8，再用 5/8 減去 2/8。',
        visual: {
          type: 'bars',
          items: [
            { label: '原有 5/8', total: 8, filled: 5, color: '#38bdf8' },
            { label: '損失 1/4 = 2/8', total: 8, filled: 2, color: '#fb7185' }
          ]
        }
      },
      {
        id: 'e9',
        tag: '基礎通分',
        story: '火星樣本箱裝了 2/3 格岩石和 1/9 格土壤，合共佔了多少格？',
        parts: [
          { type: 'frac', n: 2, d: 3 },
          { type: 'op', value: '+' },
          { type: 'frac', n: 1, d: 9 }
        ],
        answer: { n: 7, d: 9 },
        distractors: [
          { n: 1, d: 4 },
          { n: 5, d: 9 },
          { n: 8, d: 9 }
        ],
        hint: '把 2/3 的分子與分母同乘以 3 變成 6/9，再與 1/9 相加！',
        visual: {
          type: 'bars',
          items: [
            { label: '2/3 = 6/9', total: 9, filled: 6, color: '#38bdf8' },
            { label: '1/9', total: 9, filled: 1, color: '#a78bfa' }
          ]
        }
      },
      {
        id: 'e10',
        tag: '通分與約分',
        story: '液態氫存量原有 7/10 升，測試引擎耗去 1/5 升，還剩多少升？',
        parts: [
          { type: 'frac', n: 7, d: 10 },
          { type: 'op', value: '-' },
          { type: 'frac', n: 1, d: 5 }
        ],
        answer: { n: 1, d: 2 },
        distractors: [
          { n: 3, d: 10 },
          { n: 2, d: 5 },
          { n: 3, d: 5 }
        ],
        hint: '把 1/5 化為 2/10，算出 7/10 - 2/10 = 5/10，別忘了約分成最簡分數！',
        visual: {
          type: 'bars',
          items: [
            { label: '原有 7/10', total: 10, filled: 7, color: '#38bdf8' },
            { label: '耗去 1/5 = 2/10', total: 10, filled: 2, color: '#fb7185' }
          ]
        }
      },
      {
        id: 'e11',
        tag: '基礎通分',
        story: '計算兩組推進燃料總量：3/5 + 1/10 = ？',
        parts: [
          { type: 'frac', n: 3, d: 5 },
          { type: 'op', value: '+' },
          { type: 'frac', n: 1, d: 10 }
        ],
        answer: { n: 7, d: 10 },
        distractors: [
          { n: 4, d: 15 },
          { n: 4, d: 5 },
          { n: 9, d: 10 }
        ],
        hint: '把 3/5 擴分為 6/10，再計算 6/10 + 1/10。',
        visual: {
          type: 'bars',
          items: [
            { label: '3/5 = 6/10', total: 10, filled: 6, color: '#38bdf8' },
            { label: '1/10', total: 10, filled: 1, color: '#a78bfa' }
          ]
        }
      },
      {
        id: 'e12',
        tag: '異分母減法',
        story: '衛星訊號強度為 5/9，受太陽風干擾下降 1/3，目前強度是多少？',
        parts: [
          { type: 'frac', n: 5, d: 9 },
          { type: 'op', value: '-' },
          { type: 'frac', n: 1, d: 3 }
        ],
        answer: { n: 2, d: 9 },
        distractors: [
          { n: 1, d: 3 },
          { n: 4, d: 9 },
          { n: 1, d: 9 }
        ],
        hint: '把 1/3 擴分為 3/9，再用 5/9 減去 3/9（分母不變，分子相減）。',
        visual: {
          type: 'bars',
          items: [
            { label: '原有 5/9', total: 9, filled: 5, color: '#38bdf8' },
            { label: '下降 1/3 = 3/9', total: 9, filled: 3, color: '#fb7185' }
          ]
        }
      },
      {
        id: 'e13',
        tag: '基礎通分',
        story: '雷達掃描完成 1/6 區域後，再掃描 2/3 區域，共完成了幾分之幾？',
        parts: [
          { type: 'frac', n: 1, d: 6 },
          { type: 'op', value: '+' },
          { type: 'frac', n: 2, d: 3 }
        ],
        answer: { n: 5, d: 6 },
        distractors: [
          { n: 1, d: 3 },
          { n: 1, d: 2 },
          { n: 2, d: 3 }
        ],
        hint: '把 2/3 擴分為 4/6，然後將 1/6 加上 4/6。',
        visual: {
          type: 'bars',
          items: [
            { label: '1/6', total: 6, filled: 1, color: '#38bdf8' },
            { label: '2/3 = 4/6', total: 6, filled: 4, color: '#a78bfa' }
          ]
        }
      },
      {
        id: 'e14',
        tag: '通分與約分',
        story: '貨艙原有 11/12 滿的補給品，卸下 1/4 後，還剩下幾分之幾？',
        parts: [
          { type: 'frac', n: 11, d: 12 },
          { type: 'op', value: '-' },
          { type: 'frac', n: 1, d: 4 }
        ],
        answer: { n: 2, d: 3 },
        distractors: [
          { n: 5, d: 6 },
          { n: 1, d: 2 },
          { n: 7, d: 12 }
        ],
        hint: '把 1/4 化為 3/12，算出 11/12 - 3/12 = 8/12，分子分母再同除以 4 約分！',
        visual: {
          type: 'bars',
          items: [
            { label: '原有 11/12', total: 12, filled: 11, color: '#38bdf8' },
            { label: '卸下 1/4 = 3/12', total: 12, filled: 3, color: '#fb7185' }
          ]
        }
      }
    ]
  },

  medium: {
    id: 'medium',
    label: '中等',
    subtitle: '中級星雲：最小公倍數通分與帶分數',
    badgeColor: '#a78bfa',
    questions: [
      {
        id: 'm1',
        tag: 'LCM 通分',
        story: '太空船需要 2/3 單位藍晶體和 1/4 單位紫晶體，共需要多少單位？',
        parts: [
          { type: 'frac', n: 2, d: 3 },
          { type: 'op', value: '+' },
          { type: 'frac', n: 1, d: 4 }
        ],
        answer: { n: 11, d: 12 },
        distractors: [
          { n: 3, d: 7 },
          { n: 7, d: 12 },
          { n: 5, d: 6 }
        ],
        hint: '3 和 4 的最小公倍數是 12：2/3 = 8/12，1/4 = 3/12，把它們相加吧！',
        visual: {
          type: 'bars',
          items: [
            { label: '2/3 = 8/12', total: 12, filled: 8, color: '#38bdf8' },
            { label: '1/4 = 3/12', total: 12, filled: 3, color: '#a78bfa' }
          ]
        }
      },
      {
        id: 'm2',
        tag: 'LCM 通分',
        story: '引擎熱能為 3/4，散熱器帶走了 2/5，還剩下多少熱能？',
        parts: [
          { type: 'frac', n: 3, d: 4 },
          { type: 'op', value: '-' },
          { type: 'frac', n: 2, d: 5 }
        ],
        answer: { n: 7, d: 20 },
        distractors: [
          { n: 1, d: 5 },
          { n: 9, d: 20 },
          { n: 3, d: 10 }
        ],
        hint: '4 和 5 的最小公倍數是 20：3/4 = 15/20，2/5 = 8/20，計算 15/20 - 8/20。',
        visual: {
          type: 'bars',
          items: [
            { label: '3/4 = 15/20', total: 20, filled: 15, color: '#38bdf8' },
            { label: '2/5 = 8/20', total: 20, filled: 8, color: '#fb7185' }
          ]
        }
      },
      {
        id: 'm3',
        tag: '化為帶分數',
        story: '將 1/2 升與 2/3 升推進劑混合，總共是多少升？（以帶分數表示）',
        parts: [
          { type: 'frac', n: 1, d: 2 },
          { type: 'op', value: '+' },
          { type: 'frac', n: 2, d: 3 }
        ],
        answer: { w: 1, n: 1, d: 6 },
        distractors: [
          { n: 3, d: 5 },
          { w: 1, n: 1, d: 3 },
          { n: 5, d: 6 }
        ],
        hint: '通分母為 6：3/6 + 4/6 = 7/6，滿 6/6 可進位為帶分數！',
        visual: {
          type: 'bars',
          items: [
            { label: '1/2 = 3/6', total: 6, filled: 3, color: '#38bdf8' },
            { label: '2/3 = 4/6', total: 6, filled: 4, color: '#a78bfa' }
          ]
        }
      },
      {
        id: 'm4',
        tag: '化為帶分數',
        story: '太陽能板上午發電 3/5 度，下午發電 1/2 度，全日共發電多少度？',
        parts: [
          { type: 'frac', n: 3, d: 5 },
          { type: 'op', value: '+' },
          { type: 'frac', n: 1, d: 2 }
        ],
        answer: { w: 1, n: 1, d: 10 },
        distractors: [
          { n: 4, d: 7 },
          { w: 1, n: 1, d: 5 },
          { n: 9, d: 10 }
        ],
        hint: '5 和 2 的最小公倍數是 10：6/10 + 5/10 = 11/10，把假分數化為帶分數！',
        visual: {
          type: 'bars',
          items: [
            { label: '3/5 = 6/10', total: 10, filled: 6, color: '#38bdf8' },
            { label: '1/2 = 5/10', total: 10, filled: 5, color: '#a78bfa' }
          ]
        }
      },
      {
        id: 'm5',
        tag: 'LCM 通分',
        story: '通訊電量原有 5/6，傳送星圖耗去 1/4，還剩下多少電量？',
        parts: [
          { type: 'frac', n: 5, d: 6 },
          { type: 'op', value: '-' },
          { type: 'frac', n: 1, d: 4 }
        ],
        answer: { n: 7, d: 12 },
        distractors: [
          { n: 1, d: 2 },
          { n: 2, d: 3 },
          { n: 5, d: 12 }
        ],
        hint: '6 和 4 的最小公倍數是 12：5/6 = 10/12，1/4 = 3/12，算算 10/12 - 3/12。',
        visual: {
          type: 'bars',
          items: [
            { label: '5/6 = 10/12', total: 12, filled: 10, color: '#38bdf8' },
            { label: '1/4 = 3/12', total: 12, filled: 3, color: '#fb7185' }
          ]
        }
      },
      {
        id: 'm6',
        tag: '帶分數加法',
        story: '太空倉原有 1 又 1/2 噸糧食，再補給 1/3 噸，現有糧食多少噸？',
        parts: [
          { type: 'frac', w: 1, n: 1, d: 2 },
          { type: 'op', value: '+' },
          { type: 'frac', n: 1, d: 3 }
        ],
        answer: { w: 1, n: 5, d: 6 },
        distractors: [
          { w: 1, n: 2, d: 5 },
          { w: 1, n: 1, d: 6 },
          { w: 2, n: 1, d: 6 }
        ],
        hint: '整數部分 1 保持不變，分數部分通分：1/2 + 1/3 = 3/6 + 2/6，合起來是多少？',
        visual: {
          type: 'bars',
          items: [
            { label: '1/2 = 3/6', total: 6, filled: 3, color: '#38bdf8' },
            { label: '1/3 = 2/6', total: 6, filled: 2, color: '#a78bfa' }
          ]
        }
      },
      {
        id: 'm7',
        tag: '退位減法',
        story: '一條太空電纜長 1 又 1/4 公尺，剪去 1/2 公尺修理儀器，還餘多長？',
        parts: [
          { type: 'frac', w: 1, n: 1, d: 4 },
          { type: 'op', value: '-' },
          { type: 'frac', n: 1, d: 2 }
        ],
        answer: { n: 3, d: 4 },
        distractors: [
          { w: 1, n: 1, d: 4 },
          { n: 1, d: 2 },
          { n: 1, d: 4 }
        ],
        hint: '1 又 1/4 化為假分數是 5/4，1/2 = 2/4，計算 5/4 - 2/4 即可！',
        visual: {
          type: 'bars',
          items: [
            { label: '1又1/4 = 5/4', total: 8, filled: 5, color: '#38bdf8' },
            { label: '減去 1/2 = 2/4', total: 8, filled: 2, color: '#fb7185' }
          ]
        }
      },
      {
        id: 'm8',
        tag: '帶分數退位減',
        story: '計算航行剩餘燃料：2 又 1/3 - 3/4 = ？',
        parts: [
          { type: 'frac', w: 2, n: 1, d: 3 },
          { type: 'op', value: '-' },
          { type: 'frac', n: 3, d: 4 }
        ],
        answer: { w: 1, n: 7, d: 12 },
        distractors: [
          { w: 1, n: 5, d: 12 },
          { w: 2, n: 5, d: 12 },
          { w: 1, n: 11, d: 12 }
        ],
        hint: '通分為 2 又 4/12 - 9/12。4/12 不夠減，向整數借 1 變成 1 又 16/12 - 9/12！',
        visual: {
          type: 'bars',
          items: [
            { label: '借1後分數 16/12', total: 16, filled: 16, color: '#38bdf8' },
            { label: '減去 3/4 = 9/12', total: 16, filled: 9, color: '#fb7185' }
          ]
        }
      },
      {
        id: 'm9',
        tag: '帶分數進位加',
        story: '第一段太空跳躍用 1 又 2/3 分鐘，第二段用 1 又 1/2 分鐘，共需多少分鐘？',
        parts: [
          { type: 'frac', w: 1, n: 2, d: 3 },
          { type: 'op', value: '+' },
          { type: 'frac', w: 1, n: 1, d: 2 }
        ],
        answer: { w: 3, n: 1, d: 6 },
        distractors: [
          { w: 2, n: 3, d: 5 },
          { w: 2, n: 5, d: 6 },
          { w: 3, n: 1, d: 3 }
        ],
        hint: '整數 1 + 1 = 2；分數 4/6 + 3/6 = 7/6 = 1 又 1/6，再把整數合起來！',
        visual: {
          type: 'bars',
          items: [
            { label: '2/3 = 4/6', total: 6, filled: 4, color: '#38bdf8' },
            { label: '1/2 = 3/6', total: 6, filled: 3, color: '#a78bfa' }
          ]
        }
      },
      {
        id: 'm10',
        tag: 'LCM 通分',
        story: '實驗室有 4/5 瓶液體，用去 1/3 瓶後，還剩下多少瓶？',
        parts: [
          { type: 'frac', n: 4, d: 5 },
          { type: 'op', value: '-' },
          { type: 'frac', n: 1, d: 3 }
        ],
        answer: { n: 7, d: 15 },
        distractors: [
          { n: 3, d: 8 },
          { n: 8, d: 15 },
          { n: 2, d: 5 }
        ],
        hint: '5 和 3 的最小公倍數是 15：4/5 = 12/15，1/3 = 5/15，計算 12/15 - 5/15。',
        visual: {
          type: 'bars',
          items: [
            { label: '4/5 = 12/15', total: 15, filled: 12, color: '#38bdf8' },
            { label: '1/3 = 5/15', total: 15, filled: 5, color: '#fb7185' }
          ]
        }
      },
      {
        id: 'm11',
        tag: '化為帶分數',
        story: 'A 電池有 3/4 格電，B 電池有 5/6 格電，兩者合共有多少格電？',
        parts: [
          { type: 'frac', n: 3, d: 4 },
          { type: 'op', value: '+' },
          { type: 'frac', n: 5, d: 6 }
        ],
        answer: { w: 1, n: 7, d: 12 },
        distractors: [
          { w: 1, n: 5, d: 12 },
          { w: 1, n: 1, d: 6 },
          { n: 11, d: 12 }
        ],
        hint: '4 和 6 的最小公倍數是 12：9/12 + 10/12 = 19/12，滿 12/12 可進位為帶分數！',
        visual: {
          type: 'bars',
          items: [
            { label: '3/4 = 9/12', total: 12, filled: 9, color: '#38bdf8' },
            { label: '5/6 = 10/12', total: 12, filled: 10, color: '#a78bfa' }
          ]
        }
      },
      {
        id: 'm12',
        tag: '帶分數退位減',
        story: '貨艙原有 2 又 1/5 噸礦石，卸下 1 又 1/2 噸後，剩下多少噸？',
        parts: [
          { type: 'frac', w: 2, n: 1, d: 5 },
          { type: 'op', value: '-' },
          { type: 'frac', w: 1, n: 1, d: 2 }
        ],
        answer: { n: 7, d: 10 },
        distractors: [
          { w: 1, n: 3, d: 10 },
          { n: 3, d: 10 },
          { n: 9, d: 10 }
        ],
        hint: '通分為 2 又 2/10 - 1 又 5/10；借 1 後變成 1 又 12/10 - 1 又 5/10！',
        visual: {
          type: 'bars',
          items: [
            { label: '借1後分數 12/10', total: 12, filled: 12, color: '#38bdf8' },
            { label: '減去 5/10', total: 12, filled: 5, color: '#fb7185' }
          ]
        }
      },
      {
        id: 'm13',
        tag: 'LCM 通分',
        story: '太空站收集了 5/8 克與 1/6 克的彗星塵埃，合共有多少克？',
        parts: [
          { type: 'frac', n: 5, d: 8 },
          { type: 'op', value: '+' },
          { type: 'frac', n: 1, d: 6 }
        ],
        answer: { n: 19, d: 24 },
        distractors: [
          { n: 3, d: 7 },
          { n: 17, d: 24 },
          { n: 5, d: 12 }
        ],
        hint: '8 和 6 的最小公倍數是 24：5/8 = 15/24，1/6 = 4/24，將兩者相加。',
        visual: {
          type: 'bars',
          items: [
            { label: '5/8 = 15/24', total: 24, filled: 15, color: '#38bdf8' },
            { label: '1/6 = 4/24', total: 24, filled: 4, color: '#a78bfa' }
          ]
        }
      },
      {
        id: 'm14',
        tag: '整數減帶分數',
        story: '3 整箱飲用水被喝掉了 1 又 3/8 箱，還剩下多少箱？',
        parts: [
          { type: 'frac', w: 3 },
          { type: 'op', value: '-' },
          { type: 'frac', w: 1, n: 3, d: 8 }
        ],
        answer: { w: 1, n: 5, d: 8 },
        distractors: [
          { w: 2, n: 5, d: 8 },
          { w: 1, n: 3, d: 8 },
          { w: 2, n: 3, d: 8 }
        ],
        hint: '把 3 借 1 寫成 2 又 8/8，再用 2 又 8/8 減去 1 又 3/8。',
        visual: {
          type: 'bars',
          items: [
            { label: '借出1箱 = 8/8', total: 8, filled: 8, color: '#38bdf8' },
            { label: '喝掉 3/8', total: 8, filled: 3, color: '#fb7185' }
          ]
        }
      }
    ]
  },

  hard: {
    id: 'hard',
    label: '困難',
    subtitle: '高級躍遷：分數乘法與太空情境應用',
    badgeColor: '#f59e0b',
    questions: [
      {
        id: 'h1',
        tag: '分數乘整數',
        story: '每顆推進核心重 2/3 噸，太空船裝了 6 顆核心，共重多少噸？',
        parts: [
          { type: 'frac', n: 2, d: 3 },
          { type: 'op', value: '×' },
          { type: 'frac', w: 6 }
        ],
        answer: { w: 4 },
        distractors: [
          { w: 3 },
          { w: 2 },
          { w: 6 }
        ],
        hint: '先約分更快速！分母 3 和整數 6 同除以 3，變成 2/1 × 2。',
        visual: {
          type: 'bars',
          items: [
            { label: '每 3 顆核心 = 2 噸', total: 3, filled: 2, color: '#f59e0b' }
          ]
        }
      },
      {
        id: 'h2',
        tag: '分數乘整數',
        story: '一個星際信標每小時耗電 3/4 度，連續開啟 8 小時共耗電多少度？',
        parts: [
          { type: 'frac', n: 3, d: 4 },
          { type: 'op', value: '×' },
          { type: 'frac', w: 8 }
        ],
        answer: { w: 6 },
        distractors: [
          { w: 4 },
          { w: 8 },
          { w: 5 }
        ],
        hint: '分母 4 與整數 8 約分（同除以 4），變成 3/1 × 2，算算看！',
        visual: {
          type: 'bars',
          items: [
            { label: '每 4 小時耗電 3 度', total: 4, filled: 3, color: '#f59e0b' }
          ]
        }
      },
      {
        id: 'h3',
        tag: '分數乘分數',
        story: '燃料桶剩下 3/4 桶燃料，這次航行只用去其中的 1/2，用了整桶的幾分之幾？',
        parts: [
          { type: 'frac', n: 1, d: 2 },
          { type: 'op', value: '×' },
          { type: 'frac', n: 3, d: 4 }
        ],
        answer: { n: 3, d: 8 },
        distractors: [
          { n: 2, d: 3 },
          { n: 3, d: 4 },
          { n: 1, d: 4 }
        ],
        hint: '分數乘分數：分子乘分子 (1×3)，分母乘分母 (2×4)。',
        visual: {
          type: 'bars',
          items: [
            { label: '原有 3/4 = 6/8', total: 8, filled: 6, color: '#38bdf8' },
            { label: '6/8 的一半', total: 8, filled: 3, color: '#f59e0b' }
          ]
        }
      },
      {
        id: 'h4',
        tag: '交叉約分',
        story: '計算躍遷係數：2/3 × 3/5 = ？',
        parts: [
          { type: 'frac', n: 2, d: 3 },
          { type: 'op', value: '×' },
          { type: 'frac', n: 3, d: 5 }
        ],
        answer: { n: 2, d: 5 },
        distractors: [
          { n: 3, d: 5 },
          { n: 5, d: 8 },
          { n: 1, d: 5 }
        ],
        hint: '分子 3 與分母 3 可以先交叉約分為 1，剩下 2/1 × 1/5。',
        visual: {
          type: 'bars',
          items: [
            { label: '交叉約分：2/1 × 1/5', total: 5, filled: 2, color: '#f59e0b' }
          ]
        }
      },
      {
        id: 'h5',
        tag: '交叉約分',
        story: '計算星門能量比例：3/4 × 2/9 = ？',
        parts: [
          { type: 'frac', n: 3, d: 4 },
          { type: 'op', value: '×' },
          { type: 'frac', n: 2, d: 9 }
        ],
        answer: { n: 1, d: 6 },
        distractors: [
          { n: 1, d: 3 },
          { n: 2, d: 9 },
          { n: 1, d: 4 }
        ],
        hint: '3 和 9 約分得 1 和 3；2 和 4 約分得 1 和 2，算出 (1×1)/(2×3)！',
        visual: {
          type: 'bars',
          items: [
            { label: '約分後：1/2 × 1/3', total: 6, filled: 1, color: '#f59e0b' }
          ]
        }
      },
      {
        id: 'h6',
        tag: '交叉約分',
        story: '太空站過濾系統效率為 5/6 × 3/10，結果是多少？',
        parts: [
          { type: 'frac', n: 5, d: 6 },
          { type: 'op', value: '×' },
          { type: 'frac', n: 3, d: 10 }
        ],
        answer: { n: 1, d: 4 },
        distractors: [
          { n: 1, d: 2 },
          { n: 3, d: 10 },
          { n: 1, d: 8 }
        ],
        hint: '5 與 10 約分為 1 與 2；3 與 6 約分為 1 與 2，再計算 1/2 × 1/2。',
        visual: {
          type: 'bars',
          items: [
            { label: '約分後：1/2 × 1/2', total: 4, filled: 1, color: '#f59e0b' }
          ]
        }
      },
      {
        id: 'h7',
        tag: '帶分數乘法',
        story: '每個太空倉長 1 又 1/2 公尺，4 個連接起來總長多少公尺？',
        parts: [
          { type: 'frac', w: 1, n: 1, d: 2 },
          { type: 'op', value: '×' },
          { type: 'frac', w: 4 }
        ],
        answer: { w: 6 },
        distractors: [
          { w: 4, n: 1, d: 2 },
          { w: 5 },
          { w: 8 }
        ],
        hint: '先把帶分數化為假分數：1 又 1/2 = 3/2，再計算 3/2 × 4（可先與分母 2 約分）。',
        visual: {
          type: 'bars',
          items: [
            { label: '2 個太空倉 = 3 公尺', total: 2, filled: 2, color: '#f59e0b' }
          ]
        }
      },
      {
        id: 'h8',
        tag: '帶分數乘法',
        story: '計算：1 又 1/3 × 3/4 = ？',
        parts: [
          { type: 'frac', w: 1, n: 1, d: 3 },
          { type: 'op', value: '×' },
          { type: 'frac', n: 3, d: 4 }
        ],
        answer: { w: 1 },
        distractors: [
          { w: 1, n: 1, d: 4 },
          { n: 3, d: 4 },
          { w: 1, n: 1, d: 3 }
        ],
        hint: '先把 1 又 1/3 化為假分數 4/3，計算 4/3 × 3/4，分子分母都能交叉約分！',
        visual: {
          type: 'bars',
          items: [
            { label: '4/3 × 3/4 約分中', total: 4, filled: 4, color: '#f59e0b' }
          ]
        }
      },
      {
        id: 'h9',
        tag: '帶分數乘法',
        story: '計算：2 又 1/4 × 2/3 = ？',
        parts: [
          { type: 'frac', w: 2, n: 1, d: 4 },
          { type: 'op', value: '×' },
          { type: 'frac', n: 2, d: 3 }
        ],
        answer: { w: 1, n: 1, d: 2 },
        distractors: [
          { w: 2, n: 1, d: 6 },
          { w: 1, n: 1, d: 4 },
          { w: 1, n: 2, d: 3 }
        ],
        hint: '先把 2 又 1/4 化為 9/4；9/4 × 2/3 約分後得 3/2，記得化為帶分數！',
        visual: {
          type: 'bars',
          items: [
            { label: '假分數 3/2 化為帶分數', total: 2, filled: 1, color: '#f59e0b' }
          ]
        }
      },
      {
        id: 'h10',
        tag: '帶分數乘法',
        story: '計算：4/7 × 2 又 1/4 = ？',
        parts: [
          { type: 'frac', n: 4, d: 7 },
          { type: 'op', value: '×' },
          { type: 'frac', w: 2, n: 1, d: 4 }
        ],
        answer: { w: 1, n: 2, d: 7 },
        distractors: [
          { w: 2, n: 1, d: 7 },
          { w: 1, n: 3, d: 7 },
          { n: 6, d: 7 }
        ],
        hint: '2 又 1/4 = 9/4；4/7 × 9/4 約去 4 後得 9/7，再化為帶分數！',
        visual: {
          type: 'bars',
          items: [
            { label: '9/7 的餘數部分', total: 7, filled: 2, color: '#f59e0b' }
          ]
        }
      },
      {
        id: 'h11',
        tag: '太空應用題',
        story: '太空船燃料箱共有 12 公升燃料，一次星際跳躍用去了其中的 2/3，一共用了多少公升？',
        parts: [
          { type: 'frac', w: 12 },
          { type: 'op', value: '×' },
          { type: 'frac', n: 2, d: 3 }
        ],
        answer: { w: 8 },
        distractors: [
          { w: 6 },
          { w: 9 },
          { w: 4 }
        ],
        hint: '「12 的 2/3」就是 12 × 2/3。12 與 3 先約分得 4，再算 4 × 2！',
        visual: {
          type: 'bars',
          items: [
            { label: '12公升平分3份取2份', total: 3, filled: 2, color: '#f59e0b' }
          ]
        }
      },
      {
        id: 'h12',
        tag: '太空應用題',
        story: '一塊太陽能板重 3/5 公斤，機械臂一次搬運 5 塊，共重多少公斤？',
        parts: [
          { type: 'frac', n: 3, d: 5 },
          { type: 'op', value: '×' },
          { type: 'frac', w: 5 }
        ],
        answer: { w: 3 },
        distractors: [
          { w: 2 },
          { w: 5 },
          { w: 1, n: 3, d: 5 }
        ],
        hint: '列式為 3/5 × 5，分母 5 與整數 5 約分抵銷後剩下多少？',
        visual: {
          type: 'bars',
          items: [
            { label: '5 塊各有 3/5 公斤', total: 5, filled: 3, color: '#f59e0b' }
          ]
        }
      },
      {
        id: 'h13',
        tag: '太空應用題',
        story: '太空人每天喝 3/4 壺水，連續 2 又 1/3 天共喝了多少壺水？',
        parts: [
          { type: 'frac', n: 3, d: 4 },
          { type: 'op', value: '×' },
          { type: 'frac', w: 2, n: 1, d: 3 }
        ],
        answer: { w: 1, n: 3, d: 4 },
        distractors: [
          { w: 2, n: 1, d: 4 },
          { w: 1, n: 1, d: 2 },
          { w: 1, n: 1, d: 4 }
        ],
        hint: '把 2 又 1/3 化為 7/3；3/4 × 7/3 約去 3 後得 7/4，再化為帶分數！',
        visual: {
          type: 'bars',
          items: [
            { label: '7/4 的分數部分', total: 4, filled: 3, color: '#f59e0b' }
          ]
        }
      },
      {
        id: 'h14',
        tag: '太空應用題',
        story: '月球基地有 5/8 噸氧氣，科學實驗室使用了其中的 4/5，實驗室用了多少噸氧氣？',
        parts: [
          { type: 'frac', n: 5, d: 8 },
          { type: 'op', value: '×' },
          { type: 'frac', n: 4, d: 5 }
        ],
        answer: { n: 1, d: 2 },
        distractors: [
          { n: 3, d: 8 },
          { n: 5, d: 8 },
          { n: 1, d: 4 }
        ],
        hint: '5/8 × 4/5：5 和 5 約分為 1；4 和 8 約分為 1 和 2，最後剩下多少？',
        visual: {
          type: 'bars',
          items: [
            { label: '約分後：1/2 × 1/1', total: 2, filled: 1, color: '#f59e0b' }
          ]
        }
      }
    ]
  }
};
