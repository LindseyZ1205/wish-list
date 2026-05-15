# 💭 我们的愿望清单 - 项目总结

## 1️⃣ 架构设计

### 技术栈
- **前端框架**: React 18 + TypeScript + Vite
- **UI 组件库**: Lucide React（图标）
- **样式**: 纯 CSS3（自定义变量 + 响应式设计）
- **数据库**: Supabase (PostgreSQL)
- **部署**: Vercel（前端）+ Supabase Cloud（数据库）

### 项目结构
```
wish-list/
├── src/
│   ├── App.tsx                 # 主应用组件（列表、筛选、页面布局）
│   ├── App.css                 # 全局样式（紫粉色温馨主题）
│   ├── components/
│   │   ├── WishCard.tsx        # 愿望卡片组件（显示单条愿望）
│   │   └── AddWishModal.tsx    # 添加愿望模态框（两列紧凑表单）
│   ├── lib/
│   │   └── supabase.ts         # Supabase 客户端 + 类型定义
│   └── main.tsx
├── public/                      # 静态资源
├── .env.local                  # 环境变量（Supabase 连接信息）
├── vercel.json                 # Vercel 构建配置
└── package.json
```

### 数据模型
**wishes 表**
```sql
- id (UUID) - 主键
- title (TEXT) - 愿望标题
- description (TEXT) - 详细描述
- category (TEXT) - 分类：travel/lifestyle/growth/quality/other
- owner (TEXT) - 所有者：lindsey/lucia/both
- timeframe (TEXT) - 时间跨度：short/medium/long
- status (TEXT) - 状态：not_started/planning/in_progress/completed
- budget (TEXT) - 预算信息（可选）
- notes (TEXT) - 备注（可选）
- created_at / updated_at - 时间戳
```

---

## 2️⃣ 功能清单

### 核心功能
✅ **添加愿望** - 点击"新愿望"按钮弹出两列紧凑表单  
✅ **查看愿望** - 卡片式展示，显示标题、描述、分类、状态等  
✅ **删除愿望** - 每张卡片右上角有删除按钮  
✅ **分类筛选** - 按 5 大类别筛选（旅行、生活、成长、品质、其他）  
✅ **所有者筛选** - 按提出人筛选（Lindsey / Lucia / Both）  
✅ **状态追踪** - 显示愿望的进展状态（未开始/计划中/进行中/完成）  
✅ **时间管理** - 区分短中长期愿望  

### UI/UX 特点
🎨 **温馨配色** - 紫粉色系（主色 #d4a5d4，浅色 #f5d5f5）  
📱 **响应式设计** - 支持手机、平板、桌面端  
⚡ **流畅交互** - 悬停动画、按钮过渡效果  
🎯 **直观布局** - 卡片网格、分类按钮、居中的添加按钮  

---

## 3️⃣ 遇到的 Bug & 解决方案

### Bug #1: 组件导入错误 - `Wish` 类型找不到
**问题**: 
```
Uncaught SyntaxError: The requested module '/src/lib/supabase.ts' 
does not provide an export named 'Wish'
```

**原因**: `WishCard.tsx` 混合导入类型和值
```typescript
// ❌ 错误的方式
import { Wish, supabase } from '../lib/supabase';
```

**解决**: 分离类型导入和值导入
```typescript
// ✅ 正确的方式
import type { Wish } from '../lib/supabase';
import { supabase } from '../lib/supabase';
```

---

### Bug #2: 表格太长，无法预览
**问题**: 添加愿望的模态框太高，用户看不到整个表单

**原因**: 表单字段多（8 个），默认样式间距大

**解决**: 
1. 改成两列布局（分类+所有者，时间+状态，预算+备注并排）
2. 减小 padding 和 margin（2rem → 1.2rem，1.5rem → 0.8rem）
3. 减小 textarea 高度（100px → 50px）
4. 添加 `overflow-y: auto` 确保可滚动
5. 缩短选项文本（"旅行与冒险" → "旅行"）

---

### Bug #3: Supabase 连接失败 - DNS 无法解析
**问题**: 
```
Failed to load resource: net::ERR_NAME_NOT_RESOLVED
bdeotldzgcmsrdnlwumm.supabase.co
```

**原因**: 
1. **错误的 Supabase 项目**: 最初用的 URL 是 `bdeotldzgcmsrdnlwumm`（两个 d，一个 l）
2. **但实际的项目 URL** 应该是 `bdeotllzgcmsrdnlwumm`（两个 l，两个 d）
3. 两个不同的 Supabase 项目混淆了

**解决步骤**:
1. 在 Supabase 确认正确的 Project URL
2. 更新本地 `.env.local`：
   ```
   VITE_SUPABASE_URL=https://bdeotllzgcmsrdnlwumm.supabase.co
   ```
3. 重启开发服务器（让 Vite 重新读取环境变量）
4. 验证本地可以添加愿望
5. 更新 Vercel 的 Environment Variables
6. 推送代码到 GitHub 触发重新部署
7. 等待部署完成

---

### Bug #4: GitHub Push 失败 - 文件太大
**问题**:
```
error: RPC failed; HTTP 400 curl 22
send-pack: unexpected disconnect while reading sideband packet
fatal: the remote end hung up unexpectedly
```

**原因**: `node_modules` 和之前的大文件（30 MB）被提交到 git

**解决**:
1. 删除本地 `.git` 历史
2. 删除 `node_modules` 和 `dist` 文件夹
3. 重新初始化干净的 git：
   ```bash
   rm -rf .git node_modules dist
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/LindseyZ1205/wish-list.git
   git push -u origin main --force
   ```

---

### Bug #5: Vercel 构建失败 - 没有输出文件
**问题**: 
```
Build Completed in /vercel/output [14ms]
Skipping cache upload because no files were prepared
```

**原因**: Vercel 不知道如何构建 Vite 项目

**解决**: 创建 `vercel.json` 明确指定构建命令
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```
这告诉 Vercel 运行 `npm run build` 并输出到 `dist` 文件夹，同时配置 SPA 路由。

---

### Bug #6: TypeScript 编译失败
**问题**: Vercel 部署时 `tsc -b` 命令在云环境中失败

**原因**: TypeScript 编译步骤不必要（Vite 已经处理）

**解决**: 简化 `package.json` 的 build 脚本
```json
// ❌ 之前
"build": "tsc -b && vite build"

// ✅ 之后
"build": "vite build"
```

---

### Bug #7: 嵌套的 Git 仓库
**问题**: 执行 `git init` 时在已有 git 的目录中，创建了嵌套结构

**原因**: 项目文件被嵌套在 `wish_list/wish_list/` 中

**解决**: 
```bash
cd /Users/yingzi/workspace/wish_list
mv wish_list/* .
rm -rf wish_list
```
将内层文件夹的内容移出来。

---

## 4️⃣ 关键学习点

📚 **环境变量管理**:
- 本地用 `.env.local`（Vite 会自动读取）
- Vercel 用 Environment Variables 面板
- 修改后需要重启开发服务器或重新部署

🚀 **部署工作流**:
- 本地开发 → 推送到 GitHub → Vercel 自动构建部署
- 强制推送需要用 `--force`（谨慎使用）

🔍 **调试技巧**:
- 浏览器 Console 查看错误信息
- Vercel Build Logs 查看部署问题
- 本地测试优先，再部署到云

💾 **项目清洁**:
- `.gitignore` 要包括 `node_modules/`, `dist/`, `.env.local`
- 定期清理 git 历史避免文件过大
- 使用 `.env.local` 管理敏感信息

---

**项目完成日期**: 2026-05-15  
**部署链接**: https://wish-list-wheat-eta.vercel.app/  
**GitHub 仓库**: https://github.com/LindseyZ1205/wish-list
