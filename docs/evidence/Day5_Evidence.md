# Day5 Evidence - 状态管理与用户中心

## 1. 今日完成内容

今日完成了 Pinia 状态管理机制的引入，创建了用户状态 Store 和收藏状态 Store，并在导航栏、发布页面、四个业务列表页面和个人中心页面中实现了跨页面状态共享。具体完成内容：
- 创建 `src/stores/user.ts`，使用 Options API 定义用户状态 Store，管理当前模拟登录用户信息
- 创建 `src/stores/favorite.ts`，管理收藏状态（基于 Pinia 内存管理，刷新丢失为 Day5 可接受现象）
- 更新 `src/components/AppHeader.vue`，导航栏右侧显示当前用户名（`userStore.displayName`），点击可跳转个人中心
- 更新 `src/views/PublishView.vue`，发布数据的 `publisher` 字段从原有的 `getPublisherName()` 改为从 `userStore.displayName` 读取
- 更新 `src/views/TradeView.vue`，商品卡片 footer 增加收藏/取消收藏按钮
- 更新 `src/views/LostFoundView.vue`，失物招领卡片增加收藏按钮
- 更新 `src/views/GroupBuyView.vue`，拼单卡片增加收藏按钮
- 更新 `src/views/ErrandView.vue`，跑腿卡片增加收藏按钮
- 更新 `src/views/UserCenterView.vue`，用户资料和收藏列表关联 Pinia Store，编辑资料时同步更新 Store，loadProfile 时同步回 Store
- 项目通过 `vue-tsc --build` 类型检查（零错误），oxlint 检查零告警

## 2. Store 设计说明

| Store 文件 | 管理内容 | 主要状态 | 主要方法 |
|---|---|---|---|
| src/stores/user.ts | 当前用户信息 | isLoggedIn、currentUser | updateProfile、login、logout |
| src/stores/favorite.ts | 收藏状态 | favorites | addFavorite、removeFavorite、toggleFavorite、isFavorite |

**userStore：** 使用 Options API 风格定义。`currentUser` 类型为 `CurrentUser` 接口，包含 id、name、college、grade、avatar、bio 字段；`displayName` getter 返回名称；`userDescription` getter 返回"学院·年级"组合；`updateProfile(payload)` 支持部分字段更新。

**favoriteStore：** 使用 Options API 风格定义。`favorites` 数组存储 `FavoriteItem`，每个项包含 id（`number | string`，兼容 JSON Server 字符串 ID）、type、title、description、location；`isFavorite(type, id)` 使用 `String()` 转换后比较确保类型兼容；`toggleFavorite` 切换收藏状态。

## 3. 状态边界说明

| 放入 Store 的数据 | 原因 |
|---|---|
| 当前用户信息（userStore） | 导航栏、发布页、个人中心等多个位置需要共享用户信息 |
| 收藏列表（favoriteStore） | 四个列表页面和个人中心都需要访问收藏状态 |

| 未放入 Store 的数据 | 原因 |
|---|---|
| 表单校验错误信息（errors 对象） | 仅属于发布页面，无跨页面共享需求 |
| 页面临时输入内容（form 数据） | 仅属于当前页面，不需要跨组件共享 |
| 接口返回的各业务列表数据（trades 等） | 数据来源是 API，留在页面组件中按需请求更合适 |
| 拼单加入状态 / 跑腿接单状态 | 通过 localStorage 持久化，仅在各列表页和个人中心中使用 |

判断标准：如果数据需要在两个或以上不同页面/组件之间共享，就适合放入 Store；仅服务于单一页面的数据留在组件内部。

## 4. 页面使用记录

| 页面/组件 | 使用的 Store | 用途 |
|---|---|---|
| AppHeader.vue | userStore | 显示当前用户名称，点击跳转个人中心 |
| PublishView.vue | userStore | 发布时 publisher 字段读取 `userStore.displayName` |
| TradeView.vue | favoriteStore | 商品卡片中收藏/取消收藏按钮 |
| LostFoundView.vue | favoriteStore | 失物招领卡片中收藏/取消收藏按钮 |
| GroupBuyView.vue | favoriteStore | 拼单卡片中收藏/取消收藏按钮 |
| ErrandView.vue | favoriteStore | 跑腿卡片中收藏/取消收藏按钮 |
| UserCenterView.vue | userStore + favoriteStore | 用户资料展示、收藏列表展示与取消收藏 |

## 5. AI 协作记录

- **使用的 AI 工具**：opencode（基于 DeepSeek V4 Pro 模型）
- **核心提示词**：提供了 Day5 完整实训文档，包含所有任务要求、推荐代码模板、Store 设计示例和证据卡模板
- **AI 生成的内容**：
  - `src/stores/user.ts` 完整代码（Options API 风格）
  - `src/stores/favorite.ts` 完整代码
  - AppHeader.vue、PublishView.vue 的 Store 集成修改
  - TradeView.vue、LostFoundView.vue、GroupBuyView.vue、ErrandView.vue 四个列表页的收藏按钮添加
  - UserCenterView.vue 的 Store 集成（syncProfileToStore、syncServerFavoritesToStore、removeFavorite 更新等）
  - Day5_Evidence.md 结构框架
- **AI 生成内容中需注意之处**：
  - favorite.ts 初始使用 `id: number`，但 JSON Server 自动分配的 ID 是字符串（如 `"2SEOXbN"`），需要修正为 `number | string`
  - UserCenterView 中 `favoriteItems` computed 初始使用 `...f` 展开导致属性重复定义 TypeScript 错误

## 6. 人工调整内容

- 修正 `favorite.ts` 中 `FavoriteItem.id` 类型从 `number` 改为 `number | string`，`isFavorite` 和 `removeFavorite` 中使用 `String()` 转换后比较，确保与 JSON Server 字符串 ID 兼容
- 修正 `UserCenterView.vue` 中 `favoriteItems` computed 移除冗余的 `...f` 展开，避免 TypeScript `TS2783` 属性重复定义错误
- 修正 `UserCenterView.vue` 中 `profile` 初始化引用从已删除的 `currentUser` 常量改为 `userStore.displayName`
- 删除 `UserCenterView.vue` 中不再使用的 `updateLostFound` 导入和 `FavoriteDisplayItem` 接口
- 更新 `removeFavorite` 逻辑：先从 Pinia Store 移除（立即生效），再尝试调用 API 删除服务器记录（降级处理，API 失败仅告警不报错）
- 在 `saveProfile` 和 `loadProfile` 中添加 `syncProfileToStore()` 调用，确保 localStorage 与 userStore 保持双向同步
- 为所有四个业务列表页面的 `.favorite-btn` 添加统一样式（`border-radius: 999px`、`background: #f3f4f6` 等）

## 7. 测试记录

测试环境：终端1 `npm run mock`（JSON Server 端口 3001），终端2 `npm run dev`（Vite 开发服务器）

| 测试项 | 操作步骤 | 预期结果 | 实际结果 |
|---|---|---|---|
| 导航栏显示用户名 | 打开首页，查看导航栏右侧 | 显示 "校园用户" 文本并可点击 | ✅ 正常显示 |
| 发布页 publisher | 打开发布页并提交数据 | 提交的 publisher 字段为 "校园用户" | ✅ 正确读取 |
| 二手交易收藏 | 在 `/trade` 点击某商品 "收藏" 按钮 | 按钮文字变为 "已收藏" | ✅ 状态正确切换 |
| 二手交易取消收藏 | 再次点击已收藏商品的按钮 | 按钮文字变回 "收藏" | ✅ 状态正确切换 |
| 失物招领收藏 | 在 `/lost-found` 点击收藏 | 按钮文字变为 "已收藏" | ✅ 正常工作 |
| 拼单搭子收藏 | 在 `/group-buy` 点击收藏 | 按钮文字变为 "已收藏" | ✅ 正常工作 |
| 跑腿委托收藏 | 在 `/errand` 点击收藏 | 按钮文字变为 "已收藏" | ✅ 正常工作 |
| 个人中心收藏列表 | 进入 `/user` → 点击 "我的收藏" | 展开后显示已收藏内容 | ✅ 列表正确 |
| 个人中心取消收藏 | 在收藏列表中点击 "取消收藏" | 该内容从列表消失 | ✅ 正常移除 |
| 类型检查 | `npm run type-check` | 零错误零警告 | ✅ 通过 |
| Lint 检查 | `npm run lint:oxlint` | 零告警零错误 | ✅ 通过 |

## 8. 遇到的问题与解决方法

| 问题 | 原因 | 解决方法 |
|---|---|---|
| `favoriteItems` computed 中 TS 报错 `TS2783: 'id' is specified more than once` | 使用 `...f` 展开整个 FavoriteItem 后又单独定义了 `id` 和 `title` 字段 | 移除展开操作符，仅手动列出需要的字段 `_key`、`_type`、`_meta`、`id`、`title` |
| `UserCenterView.vue` 中 `profile.name` 引用 undefined 变量 `currentUser` | 删除了 `const currentUser = '张三同学'` 但 profile 初始化仍引用它 | 改为 `userStore.displayName` 从 Store 读取 |
| 收藏 Store 的 `id: number` 与 JSON Server 字符串 ID 不兼容 | JSON Server 自动分配的 ID 是字符串格式（如 `"2SEOXbN"`） | 类型改为 `number \| string`，比较时使用 `String()` 转换 |
| Day5_Evidence.md 写入后为空文件 | 写入工具调用上下文问题 | 重新写入完整证据卡内容 |

## 9. 今日反思

Pinia 状态管理对多页面前端应用的核心价值在于：解决了跨页面/跨组件的数据共享问题，避免了通过 props 层层传递数据的繁琐和耦合。在本项目中，引入 Pinia 后最直观的变化是用户信息不再需要每个页面各自从 localStorage 解析，而是由 userStore 统一管理——导航栏、发布页、用户中心都可以通过 `useUserStore()` 直接获取一致的当前用户数据。当用户在用户中心修改昵称后，导航栏显示的名称会通过 Store 响应式同步更新。收藏状态同样如此：在四个业务列表页面中点击收藏，用户中心能立即在收藏列表中看到新增内容；在用户中心取消收藏后回到列表页，按钮状态也会回到"收藏"。这种跨页面的状态一致性正是 Pinia 解决的核心问题。同时，本次实训也让我认识到状态边界的判断：表单校验错误、页面临时输入等仅服务于单一页面的数据不应放入 Store，否则会导致状态管理混乱。正确的做法是将真正需要跨页面共享的数据（用户信息、收藏列表）交给 Pinia，将页面私有数据保留在组件内部。
