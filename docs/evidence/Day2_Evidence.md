# Day2 证据卡：页面骨架搭建与前端路由导航实现

## 一、本日任务概述

本日围绕"校园轻集市"PC 端 Web App 完成了页面骨架搭建、路由导航配置和公共布局设计三大核心任务，建立了可访问、可跳转、可扩展的前端页面框架。

## 二、页面骨架

### 2.1 页面文件创建情况

在 `src/views/` 目录下新创建了 5 个核心业务页面组件：

| 页面名称 | 文件名 | 路由路径 | 业务说明 |
|----------|--------|----------|----------|
| 首页 | HomeView.vue | / | 平台入口，展示 Hero 区、数据统计、特色功能、热门推荐 |
| 二手交易 | TradeView.vue | /trade | 商品分类导航，为后续商品列表展示预留结构 |
| 失物招领 | LostFoundView.vue | /lost-found | 失物/招领双标签切换，为失物信息流预留结构 |
| 拼单搭子 | GroupBuyView.vue | /group-buy | 四种搭子类型卡片（拼单购物、拼饭搭子、运动搭子、学习搭子） |
| 跑腿委托 | ErrandView.vue | /errand | 四种跑腿类型卡片（代取快递、代买饭菜、代办事务、校园跑腿） |
| 发布页面 | PublishView.vue | /publish | 完整的商品发布表单（含图片上传、分类选择、表单验证） |
| 消息页面 | MessageView.vue | /message | 消息列表 + 会话详情 + 模拟回复功能 |
| 个人中心 | UserCenterView.vue | /user | 用户信息展示 + 功能菜单网格（我的发布、收藏、浏览记录、账号设置） |

此外保留了已有页面（ListView、DetailView、ProfileView、BoardView）以兼容现有功能，路由路径分别为 `/list`、`/detail/:id`、`/profile`、`/board`。

### 2.2 页面设计原则

- 每个页面均包含清晰的页面标题和业务说明，不包含无意义占位内容
- 页面内容紧密围绕"校园轻集市"业务场景：二手交易、失物招领、拼单搭子、跑腿委托均为校园生活高频需求
- 新页面采用简洁的骨架结构：标题区 + 分类/类型导航 + 占位提示，为后续数据接入预留清晰扩展点
- 页面组件与通用组件严格分离：views/ 目录存放页面级组件，components/ 目录存放可复用组件

## 三、路由导航

### 3.1 路由配置

在 `src/router/index.ts` 中集中管理所有路由，采用 Vue Router 的 `createWebHistory` 模式：

- 首页采用静态导入（`import HomeView`），保证首屏加载速度
- 其余页面全部采用动态导入（`() => import(...)`），实现按需加载，减少首屏体积
- 路由路径使用语义化的 kebab-case 命名（`/lost-found`、`/group-buy`），路径清晰可读
- 每条路由设置 `name` 属性，便于编程式导航和后续权限控制扩展

### 3.2 导航菜单

在 `AppNav.vue` 中统一管理导航菜单项，使用 Element Plus 的 `el-menu` 组件实现：
- 8 个主导航入口：首页、二手交易、失物招领、拼单搭子、跑腿委托、发布、消息、我的
- 采用 `router` 属性启用路由模式，点击自动跳转
- 通过 `:default-active` 绑定当前路由路径实现导航高亮

### 3.3 main.ts 挂载

`src/main.ts` 中已完成 router 和 pinia 的挂载，无需额外修改：
```ts
app.use(createPinia())
app.use(router)
app.use(ElementPlus)
```

## 四、公共布局

### 4.1 布局组件设计

将原本耦合在 `App.vue` 中的布局逻辑拆分为三个独立的公共组件：

| 组件 | 文件路径 | 职责 |
|------|----------|------|
| AppLayout | src/components/AppLayout.vue | 整体页面容器，包含 AppHeader + 内容区（RouterView） |
| AppHeader | src/components/AppHeader.vue | 顶部固定栏，包含 Logo 和导航菜单 |
| AppNav | src/components/AppNav.vue | 水平导航菜单，管理所有路由入口 |

### 4.2 App.vue 简化

修改后的 `App.vue` 仅负责引入并使用 `AppLayout` 组件，自身不再包含任何布局和导航逻辑，职责单一清晰。

### 4.3 布局特性

- 顶部导航固定（`position: sticky; top: 0; z-index: 100`），滚动时始终可见
- 内容区最大宽度 1200px，居中显示，内边距 24px
- 背景色 `#f8fafc` 统一页面基调
- Logo 使用渐变色文本效果，视觉辨识度高

## 五、AI 协作情况

### 5.1 AI 辅助生成内容

- 使用 AI Coding 工具辅助生成了 5 个新页面（TradeView、LostFoundView、GroupBuyView、ErrandView、UserCenterView）的初始骨架代码
- AI 辅助生成了 3 个布局组件（AppLayout、AppHeader、AppNav）的基础结构

### 5.2 人工审查与修改

- 检查所有页面名称与文件名是否对应，确保无错位
- 审查页面内容是否符合"校园轻集市"业务场景，删除了无关占位内容
- 将 AI 生成的不规范 `<script lang="ts">` 块统一修正为 `<script setup lang="ts">` 模式
- 确认路由路径语义清晰，无 `/page1`、`/test` 等无意义路径
- 确认 `App.vue` 中已移除内联布局代码，改为使用独立的布局组件
- 确认导航菜单项与路由配置完全对应，点击可正常跳转
- 执行 `npm run build-only` 验证项目可正常构建

## 六、项目构建验证

- 执行 `npm run build-only` 构建成功
- 所有 12 个页面和布局组件均被正确打包
- 无 TypeScript 编译错误
- 无路由配置相关的导入或路径错误

## 七、目录结构

```
src/
├── App.vue                  # 入口组件，仅引入 AppLayout
├── main.ts                  # 挂载 router、pinia、ElementPlus
├── router/
│   └── index.ts             # 12 条路由配置（8 条核心 + 4 条兼容）
├── views/
│   ├── HomeView.vue         # 首页
│   ├── TradeView.vue        # 二手交易页（新）
│   ├── LostFoundView.vue    # 失物招领页（新）
│   ├── GroupBuyView.vue     # 拼单搭子页（新）
│   ├── ErrandView.vue       # 跑腿委托页（新）
│   ├── UserCenterView.vue   # 个人中心页（新）
│   ├── PublishView.vue      # 发布页面
│   ├── MessageView.vue      # 消息页面
│   ├── ListView.vue         # 商品列表（兼容）
│   ├── DetailView.vue       # 商品详情（兼容）
│   ├── ProfileView.vue      # 个人资料（兼容）
│   └── BoardView.vue        # 数据看板（兼容）
├── components/
│   ├── AppLayout.vue        # 公共布局容器（新）
│   ├── AppHeader.vue        # 公共头部组件（新）
│   └── AppNav.vue           # 公共导航组件（新）
└── stores/
    └── market.ts            # Pinia 状态管理
```
