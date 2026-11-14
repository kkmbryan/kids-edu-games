# 足球代數

香港小學五年級（教育局 2017 年數學課程）靜態練習：

- 5A1 代數的初步認識
- 5A2 簡易方程（一）

只用整數，不用安裝套件，也沒有後端。用瀏覽器開啟即可，適合桌面電腦和 iPad。

## 在電腦開啟

1. 下載或複製這個資料夾。
2. 用瀏覽器開啟 `index.html`。

若要用本機伺服器（比較接近 GitHub Pages）：

```bash
python3 -m http.server 8080
```

然後開啟 http://localhost:8080/

## 放到 GitHub Pages

1. 把這個資料夾推上 GitHub 儲存庫的 `main` 分支，檔案放在根目錄。
2. 打開儲存庫的 Settings → Pages。
3. Branch 選 `main`，資料夾選 root（`/`），然後儲存。

專案已包含 `.nojekyll`，Pages 會按原樣提供這些檔案。

星星和已解鎖的比賽存在這部裝置的瀏覽器裡（localStorage），不會上傳。主頁有「重設進度」可清除全部星星和解鎖。

若這個遊戲在 `kids-edu-games` 儲存庫的 `p5-maths-simple-algebra/` 資料夾裡，GitHub Pages 請把來源設為該資料夾，或改用專案網站路徑：`https://<你的帳號>.github.io/kids-edu-games/p5-maths-simple-algebra/`。
