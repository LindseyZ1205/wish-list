# 💭 我们的愿望清单

为 Lindsey 和 Lucia 的共同梦想而构建

## ✨ 功能特性

- 📝 添加和编辑愿望
- 🏷️ 5 大分类（旅行、生活、成长、品质、其他）
- 👥 标记所有者（Lindsey / Lucia / Both）
- ⏱️ 时间跨度（短期 / 中期 / 长期）
- 📊 状态追踪（未开始 / 计划中 / 进行中 / 完成）
- 💰 预算和笔记
- 🎨 可爱的温馨设计
- 📱 响应式布局

## 🚀 快速开始

1. **完成设置** - 查看 [SETUP.md](./SETUP.md) 的详细指导
2. **运行开发服务器**
   ```bash
   npm install
   npm run dev
   ```
3. **开始添加愿望** - 访问 `http://localhost:5173`

## 💻 技术栈

- **前端**: React 18 + TypeScript + Vite
- **样式**: CSS3（自定义变量，温馨配色）
- **数据库**: Supabase (PostgreSQL)
- **图标**: Lucide React
- **部署**: Vercel（可选）

## 📁 项目结构

```
wish_list/
├── src/
│   ├── App.tsx              # 主应用组件
│   ├── App.css              # 全局样式（温馨紫粉色）
│   ├── components/
│   │   ├── WishCard.tsx     # 愿望卡片组件
│   │   └── AddWishModal.tsx # 添加愿望模态框
│   └── lib/
│       └── supabase.ts      # Supabase 配置和类型
├── .env.local               # 环境变量（需要填入）
├── SETUP.md                 # 详细设置指南
└── README.md                # 本文件
```

## 🎨 设计说明

- **配色**: 紫粉色系，温馨可爱
  - 主色 #d4a5d4
  - 浅色 #f5d5f5
  - 深色 #5a4a6a
- **字体**: Segoe UI
- **圆角**: 所有元素都有柔和的圆角

## 📝 使用建议

- 愿望信息尽量详细，方便日后参考
- 定期更新愿望的状态，看着完成的愿望会很有成就感
- 两个人都可以添加对方的愿望，一起讨论更有趣

---

Made with 💜 for dreams and memories
