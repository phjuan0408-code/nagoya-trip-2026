# GoChubu

名古屋與日本中部遊記網站骨架。首頁是日本總地圖，可以選四國舊站或進入新的中部遊記；中部頁面包含愛知、岐阜、長野、富山與這次去過的城市標記。

## Run

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
```

## Edit Content

- 主要地點、座標、卡片文字：`src/data/tripData.js`
- 照片放置位置：`public/images/`
- 每個地點的 `cover` 是列表與頁首圖片。
- `storyItems` 是所有景點與美食的唯一內容來源。每筆資料用 `category` 分成景點或美食，用 `placeIds` 和 `days` 決定它會出現在哪個地點頁與哪個 Day 頁：

```js
story({
  id: "nagoya-castle",
  title: "名古屋城",
  body: "這裡放這段遊記文字。",
  category: "attraction",
  placeIds: ["nagoya"],
  days: ["Day 1"],
  images: [
    { src: "/images/nagoya/castle.webp", alt: "名古屋城" },
  ],
})
```

- `itineraryDays` 是時間軸頁資料，只需要填每天的標題、日期、地點順序與簡短描述。
- `dayStoryOverrides` 只用來寫每天的心得。Day 頁的景點與美食會自動從 `storyItems` 裡依照 `days` 篩選出來：

```js
"day-5": {
  reflection: "這裡寫 Day 5 心得。",
}
```

## Image Notes

建議把大圖先輸出為 WebP 或 AVIF，再保留 JPG 備援。封面圖寬度約 1600px，卡片/內文圖約 900px 通常就夠。網站內的卡片與 gallery 已經使用 `loading="lazy"`，地圖資料也已從原始 68MB GeoJSON 壓成約 88KB 的本地 JSON。
