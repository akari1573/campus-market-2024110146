# Day3 Evidence - Mock 数据建模与列表渲染

## 1. 今日完成内容

今天完成了以下工作：

1. 安装了 axios 和 json-server 依赖；
2. 在项目根目录创建了 db.json，包含四类校园业务 Mock 数据；
3. 创建了 src/api/http.ts，封装了 Axios 基础请求实例；
4. 创建了 src/api/trade.ts、lostFound.ts、groupBuy.ts、errand.ts 四个业务 API 模块；
5. 创建了通用列表卡片组件 ItemCard.vue 和空状态组件 EmptyState.vue；
6. 更新了 TradeView.vue、LostFoundView.vue、GroupBuyView.vue、ErrandView.vue 四个核心页面，通过 API 从 JSON Server 获取数据并渲染列表；
7. 在 package.json 中添加了 `npm run mock` 启动命令。

## 2. Mock 数据结构说明

| 数据集合 | 对应业务 | 主要字段 | 页面用途 |
|---|---|---|---|
| trades | 二手交易 | title、price、category、condition、location、publisher、publishTime、status | 展示二手商品列表，包含分类、价格、成色 |
| lostFounds | 失物招领 | title、type、itemName、location、eventTime、contact、status | 区分失物和招领信息，展示物品和联系人 |
| groupBuys | 拼单搭子 | title、type、targetCount、currentCount、deadline、location、publisher、status | 展示拼单进度和截止时间 |
| errands | 跑腿委托 | title、taskType、reward、from、to、deadline、publisher、status | 展示任务路径、报酬和状态 |

每类数据均准备了 6 条，涵盖 open、closed、done 等不同状态，确保页面展示有基本的状态区分。

## 3. 我的设计

我围绕"校园轻集市"的四类核心业务设计了数据结构：

- **二手交易（trades）**：price 和 condition 字段是二手交易的核心，买家最关心价格和成色；category 用于分类筛选；location 便于当面交易；publisher 和 publishTime 记录发布信息；status 区分在售/已售状态。
- **失物招领（lostFounds）**：type 字段是关键区分，标记"失物（lost）"还是"招领（found）"；itemName 精确描述丢失/捡到的物品；eventTime 记录事发时间；contact 提供联系方式；字段设计偏重信息完整性而非交易流程。
- **拼单搭子（groupBuys）**：targetCount 和 currentCount 是拼单进度的核心表现；deadline 设置了截止时间期限；type 区分拼餐、拼车、学习搭子等不同类型；这些字段直接对应拼单业务的本质特征。
- **跑腿委托（errands）**：from 和 to 描述了空间上的起点终点，是跑腿业务最独特的需求；reward 表示酬劳金额；taskType 区分取快递、代买、代办事务等类型；deadline 表示任务时效要求。

## 4. AI 设计

在本次 Day3 任务中，代码的骨架参考了实训文档中的推荐结构（如 ItemCard.vue、EmptyState.vue、API 模块等），数据内容则结合了项目中已有的 Pinia store 数据（src/stores/market.ts），提取其中贴近校园场景的数据进行增补和改造。

具体来说：
- db.json 的字段结构参考了官方文档建议和已有 Pinia store 中的接口定义；
- 数据条目在已有 4 条左右的基础上，每类补充到 6 条，确保数据量足够；
- 界面组件 ItemCard.vue 采用了文档推荐的 slot 设计，让不同页面的 footer 区域可以根据业务特征自由定制；
- API 模块按业务拆分，避免所有请求写在一起，保持代码可维护性。

AI 辅助审查发现的不合理之处：
- 原有 Pinia store 中字段命名不够统一（如 errandTask 中 fromAddr/toAddr 与 db.json 中 from/to 不一致），已在 db.json 中做了统一；
- 部分已有数据缺少图片字段，已为 Mock 数据补充了占位图片链接。

## 5. 最终调整

在本次任务中，我做了以下修改和调整：

1. **字段命名统一**：将原有 Pinia store 中 errandTask 的 fromAddr/toAddr 统一为 db.json 中的 from/to，保持简洁一致；
2. **数据条目补充**：每类数据从已有的 2-4 条增加到 6 条，覆盖多种状态（open/closed/done）；
3. **图片字段补充**：为缺少图片的 Mock 数据补充了 Unsplash 占位图片链接；
4. **状态字段标准化**：统一使用 open、closed、done 三种状态值，便于后续筛选和展示；
5. **视图页面重构**：四个核心视图从原来直接读取 Pinia store 改为通过 Axios 请求 JSON Server 接口获取数据，实现了真正的数据驱动；
6. **组件抽取**：新增了 ItemCard.vue 通用卡片组件，四个页面共用同一个卡片组件，减少了重复代码；
7. **空状态处理**：新增 EmptyState.vue 组件，在数据为空时提供友好的提示信息。

## 6. 遇到的问题与解决方法

**问题**：安装依赖时发现项目使用 pnpm 作为包管理器（package.json 中 `"packageManager": "pnpm@11.9.0"`），但本地环境未安装 pnpm，执行 `pnpm add` 失败。

**解决方法**：回退使用 npm 安装 axios 和 json-server 依赖，安装成功。

**问题**：原有四个核心视图页面（TradeView、LostFoundView、GroupBuyView、ErrandView）都直接从 Pinia store 中读取硬编码数据，需要改造为通过 Axios 从 JSON Server 获取数据。

**解决方法**：重构每个视图页面，移除 Pinia store 的 import，改为从对应 API 模块导入请求方法，在 onMounted 生命周期中调用 API 获取数据，使用 ref 存储响应式数据。

## 7. 今日反思

Mock 数据建模、JSON Server 接口模拟和列表渲染是前端项目从"静态页面"走向"数据驱动页面"的关键一步。通过本日任务的实践，我深刻理解了：前端页面不能只停留在写死文字的阶段，必须先分析业务对象，设计合理的数据结构，再通过接口请求驱动页面内容。Mock 数据的作用不仅是填充页面，更是前端开发者理解业务逻辑、验证数据结构、模拟后端交互的重要工具。如果 Day3 的数据结构设计不合理，后续的发布表单、状态管理、交互优化都会受到影响。JSON Server 作为一个轻量级的 Mock API 工具，让前端可以脱离真实后端独立开发，大幅提升了开发效率。列表渲染则是数据驱动页面的最终呈现，将接口返回的数据通过 Vue 的响应式机制渲染到界面中，实现了数据与视图的分离。

---

**关键词**：Mock 数据、JSON Server、列表渲染
