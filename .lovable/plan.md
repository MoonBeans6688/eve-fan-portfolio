

## Goal
在作品子页面（如 `/work/the-jar`）每个 section 的占位图位置，支持插入**带原生控件（可暂停、拖进度）的视频**，同时保留现有的图片和占位符模式。

## Current State
- `src/data/projects.ts` 中每个 section 目前只有 `image?: string` 字段
- `src/pages/WorkDetail.tsx` 在 section 末尾根据 `section.image` 渲染 `<img>`，否则显示灰色占位符
- 项目顶部 hero 已经有 `heroVideo` 的用法（autoplay + muted + loop，**没有控件**），不适合这里"可暂停拖进度"的需求

## Approach
给每个 section 的媒体区域引入一个新的可选字段 `sectionVideo`（独立于 hero 那种自动播放视频），并在 `WorkDetail.tsx` 渲染逻辑里加一个分支，使用原生 `<video controls>` —— 这是最轻量、最稳的方案，浏览器自带暂停按钮、进度条、音量、全屏。

### 数据结构变更（`src/data/projects.ts`）
为 section 类型新增两个可选字段：
```ts
sectionVideo?: string;   // 视频文件 URL（mp4/webm）
videoPoster?: string;    // 可选封面图，视频加载前显示
```
保留 `image?: string`，三种模式优先级：`sectionVideo` > `image` > 占位符。

### 渲染逻辑（`src/pages/WorkDetail.tsx`）
在每个 section 末尾，把当前的 `section.image ? <img> : <placeholder>` 换成三分支：

```text
if (section.sectionVideo)
   → <video controls preload="metadata" poster={videoPoster} className="w-full h-auto mt-8 rounded" />
else if (section.image)
   → 原 <img>
else
   → 原灰色占位符
```

关键属性：
- `controls` —— 显示原生播放/暂停/进度条
- 不加 `autoPlay` / `muted` / `loop` —— 用户主动播放
- `preload="metadata"` —— 只预加载元数据（时长、尺寸），不浪费流量
- `playsInline` —— iOS Safari 防止强制全屏
- `poster` —— 可选封面图，提升首屏体验

### 视频文件存放位置
推荐 `public/videos/`（直接 URL 引用，无需 import），data 里写 `/videos/jar-research.mp4`。也可以用外部 CDN URL（如 Cloudinary / Mux）。大于 ~20MB 的视频建议用外部 CDN，避免 bundle 体积过大。

### 进阶可选（**这次不做，先确认需求**）
- 自定义播放器样式（基于 `react-player` 或 `video.js`）
- 鼠标悬停自动播放、移开暂停
- 滚动到视野内自动播放（类似 hero）
- 章节标记 / 字幕轨道

## Files to Change
1. `src/data/projects.ts` —— Section 类型加 `sectionVideo?` 和 `videoPoster?` 字段
2. `src/pages/WorkDetail.tsx` —— 渲染逻辑加视频分支

## Open Questions
1. 是否要原生控件就够了，还是希望自定义样式（更贴合你的极简风格）？
2. 视频文件你打算放在项目 `public/videos/` 里还是用外部链接（Cloudinary / YouTube / Vimeo）？

如果你只是想"先能播起来、能拖进度"，直接采用上面方案 1（原生 `<video controls>`）即可，几分钟就能跑通。等你给我具体的视频文件/URL，我就把对应 section 的字段填上。

