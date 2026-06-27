# Day1 过程性证据

---

## 今日完成内容

- 配置课程开发环境（Node.js 24.12.0、pnpm 11.9.0、VS Code）
- 安装项目依赖并成功启动开发服务器（`pnpm dev`，访问 `http://localhost:5173`）
- 浏览项目目录结构，理解 `src/`、`docs/`、`scripts/` 各目录用途
- 分析入口文件 `main.ts`：创建 Vue 应用 → 安装 Pinia + Router → 挂载到 `#app`
- 理解 `router/index.ts` 的作用：History 模式前端路由，将 URL 路径映射到 Vue 组件
- 梳理项目技术栈：Vue 3 + TypeScript + Vite + Vue Router + Pinia + ESLint/Oxlint
- 阅读课程文档：《Getting Started》《Environment Setup》《AI Collaboration Card》

---

## 学习收获

1. 理解了统一开发环境基线（`.nvmrc`、`packageManager`、`.editorconfig`）对团队协作的重要性
2. 掌握了 Vue 3 项目的初始化流程：`createApp → use(plugin) → mount`
3. 理解了 Vue Router 作为 SPA 路由核心的工作原理（History 模式 vs Hash 模式）
4. 学会了通过 `package.json` 和配置文件快速识别项目技术栈

---

## 遇到的问题

- （如有，请记录具体问题和解决方案）

---

## AI 协作情况

| 项目 | 内容 |
|------|------|
| Prompt | 分析项目目录结构；解释 main.ts；解释 router 作用；分析当前技术栈 |
| AI 输出 | 给出了完整的项目结构分析、main.ts 逐行解析、Router 机制说明、技术栈汇总表 |
| 我的修改 | 核对 AI 输出与项目实际代码，确认一致 |
| 最终验证 | 对照源码文件和 `package.json` 确认所有分析结果正确 |

---

## 后续计划

- 阅读《校园轻集市项目指导书》中的实训方案与需求分析
- 开始 Day2 任务，搭建页面骨架或实现首个功能模块
- 保持良好的 Git 提交习惯，每完成一个独立功能及时 commit
