# 💭 我们的愿望清单 - 快速设置指南

欢迎！这是为 Lindsey 和 Lucia 的愿望清单应用。完成以下步骤就可以开始使用了。

## 📋 设置步骤

### 1️⃣ Supabase 注册和配置（5分钟）

1. **创建 Supabase 账号**
   - 访问 [https://supabase.com](https://supabase.com)
   - 点击"Start Your Project"
   - 用 GitHub 或邮箱注册

2. **创建新项目**
   - 项目名：`wish-list`
   - 选择离你最近的区域
   - 记住你的 **Database Password**（后面会用）

3. **创建数据表**
   - 进入 "SQL Editor"
   - 运行以下 SQL 语句创建 `wishes` 表：

```sql
CREATE TABLE wishes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('travel', 'lifestyle', 'growth', 'quality', 'other')),
  owner TEXT NOT NULL CHECK (owner IN ('lindsey', 'lucia', 'both')),
  timeframe TEXT NOT NULL CHECK (timeframe IN ('short', 'medium', 'long')),
  status TEXT NOT NULL CHECK (status IN ('not_started', 'planning', 'in_progress', 'completed')),
  budget TEXT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 设置行级安全（RLS）- 让所有人都能读写
ALTER TABLE wishes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all public access" ON wishes
  FOR ALL
  USING (true)
  WITH CHECK (true);
```

4. **获取 API 密钥**
   - 进入 "Project Settings" → "API"
   - 复制 **Project URL** 和 **anon key**

5. **填入 `.env.local` 文件**
   - 打开项目根目录的 `.env.local`
   - 替换这两行：
   ```
   VITE_SUPABASE_URL=你的_Project_URL
   VITE_SUPABASE_ANON_KEY=你的_anon_key
   ```

### 2️⃣ GitHub 仓库创建（3分钟）

1. **创建新仓库**
   - 访问 [https://github.com/new](https://github.com/new)
   - 仓库名：`wish-list`
   - 可见性：Public（可选，Private 也行）
   - 不要初始化 README（我们已经有项目了）

2. **连接本地项目到 GitHub**
   ```bash
   cd /Users/yingzi/workspace/wish_list
   git config user.email "your.email@example.com"
   git config user.name "Your Name"
   git add .
   git commit -m "Initial commit: wish list app"
   git branch -M main
   git remote add origin https://github.com/LindseyZ1205/wish-list.git
   git push -u origin main
   ```

### 3️⃣ 本地运行开发服务器（2分钟）

```bash
cd /Users/yingzi/workspace/wish_list
npm run dev
```

打开浏览器访问 `http://localhost:5173`，开始添加愿望吧！ 🎉

## 📝 功能一览

- ✏️ **添加愿望** - 点击"新愿望"按钮
- 🏷️ **分类筛选** - 按 5 大类别过滤（旅行、生活、成长、品质、其他）
- 👥 **所有者标记** - 显示是谁的愿望（Lindsey / Lucia / Both）
- ⏱️ **时间跨度** - 短期 / 中期 / 长期
- 📊 **状态追踪** - 未开始 / 计划中 / 进行中 / 完成
- 💰 **预算备注** - 可选的预算和补充说明

## 🎨 可爱的设计

- 温馨的紫粉色配色
- 响应式设计，手机也能用
- 流畅的交互动画

## 🚀 后续步骤

### 部署到 Vercel（可选）

想让两个人都能随时随地访问？部署到 Vercel：

1. 推送代码到 GitHub（见第2步）
2. 访问 [https://vercel.com](https://vercel.com)
3. 用 GitHub 账号登录
4. 选择 `wish-list` 仓库
5. 添加环境变量：
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
6. 点击 "Deploy"

完成！现在你们可以在线随时访问愿望清单了。

## ❓ 遇到问题？

- **数据库连接失败？** 检查 `.env.local` 中的 URL 和 Key 是否正确
- **看不到愿望？** 确保数据表创建成功，检查浏览器控制台（F12）有无错误
- **部署时出错？** 确保 Vercel 环境变量都已填入

---

开心地记录你们的梦想吧！💭✨
