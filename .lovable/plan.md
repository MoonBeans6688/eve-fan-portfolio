
## Selected Works — Bento Layout Plan

### Design

紧凑无间距的 Bento 网格，封面图下方显示文字信息，5-6 个作品。

布局采用 CSS Grid，桌面端 4 列，每行高度由内容决定：

```text
Row 1:  [ Project 1 — 横版 2col ][ Project 2 — 竖版 2col 跨2行 ]
Row 2:  [ Project 3 — 横版 2col ][         (P2 continues)         ]
Row 3:  [ Project 4 — 竖版 1col ][ Project 5 — 横版 2col ][ P6 1col ]
```

每个作品卡片数据增加 `span` 字段（`wide` / `tall` / `normal`），控制占几列几行。

移动端退化为单列堆叠。

### Changes

**1. WorkItem 接口** — 新增 `span: 'wide' | 'tall' | 'normal'` 字段

**2. WorksSection.tsx** — 用 CSS Grid 替换 flex column：
- `grid-cols-4`，`gap-0`（紧凑无间距）
- 每个卡片根据 `span` 设置 `col-span-2` / `row-span-2` / 默认 1x1
- 移动端 `grid-cols-1`

**3. WorkCard.tsx** — 调整卡片样式：
- 去掉圆角和间距（紧凑风格）
- 图片 `aspect-ratio` 根据 span 动态调整（wide: 16/9, tall: 9/16, normal: 1/1）
- 文字区保持在图片下方：标题、描述、date + tag
- Hover 效果：图片微缩 + overlay

**4. WORKS 数据** — 增加到 5-6 个项目，每个指定 span 和适合的封面方向

### Technical notes

- Grid 使用 `grid-auto-rows: auto` 让内容自然撑开
- `tall` 卡片用 `row-span-2` + `aspect-[3/4]`
- `wide` 卡片用 `col-span-2` + `aspect-[16/9]`
- 无间距通过 `gap-0` + 卡片无 margin/padding/border-radius 实现
