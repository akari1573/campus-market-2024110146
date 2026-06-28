# 校园轻集市 - 高保真原型设计说明

## 一、图片来源

本原型中使用的所有图片均来自 [Unsplash](https://unsplash.com)，均为免费可商用图片，可直接在浏览器中加载。

## 二、技术栈

- **Vue 3 CDN** — 提供响应式数据绑定和组件化能力
- **Element Plus CDN** — 提供 el-button、el-input、el-table、el-tag 等 UI 组件
- **Tailwind CSS CDN** — 提供辅助布局样式
- **纯 HTML 文件** — 每个页面独立，无需构建工具，可直接浏览器打开

## 三、UI 设计规范

| 项目 | 值 |
|------|-----|
| 主色 | #3B82F6（校园蓝） |
| 辅助色 | #10B981（成功绿）、#06B6D4（信息青） |
| 背景色 | #F8FAFC |
| 卡片 | 白底、12-16px 圆角、轻阴影 |
| 标题 | #1E293B 18-24px Bold |
| 正文 | #475569 14px |
| 辅助文字 | #94A3B8 12-13px |
| 导航 | 固定顶部、60px 高度、sticky |

## 四、页面清单（共 22 个页面）

| 序号 | 文件名 | 页面名称 |
|------|--------|---------|
| 1 | index.html | 原型入口索引 |
| 2 | home.html | 首页信息流 |
| 3 | category.html | 分类浏览页 |
| 4 | item-detail.html | 二手商品详情 |
| 5 | lost-detail.html | 失物招领详情 |
| 6 | group-detail.html | 拼单搭子详情 |
| 7 | task-detail.html | 跑腿委托详情 |
| 8 | publish.html | 发布选择页 |
| 9 | publish-item.html | 发布二手商品 |
| 10 | publish-lost.html | 发布失物招领 |
| 11 | publish-group.html | 发布拼单搭子 |
| 12 | publish-task.html | 发布跑腿委托 |
| 13 | messages.html | 消息列表 |
| 14 | chat.html | 聊天详情 |
| 15 | profile.html | 个人中心 |
| 16 | my-posts.html | 我的发布 |
| 17 | favorites.html | 我的收藏 |
| 18 | settings.html | 账号设置 |
| 19 | login.html | 登录 |
| 20 | register.html | 注册 |
| 21 | admin-dashboard.html | 管理端首页 |
| 22 | admin-review.html | 信息审核 |

## 五、迁移到 Vue3 项目建议

1. 每个页面可对应对应 `src/views/XxxView.vue` 组件
2. 公共导航可提取为 `src/components/AppHeader.vue` + `AppNav.vue`
3. 内联 `<style>` 可迁移为每个组件的 `<style scoped>`
4. 页面数据可从 `ref()` 改为从 Pinia store 或 API 获取
5. 管理端布局可提取为 `AdminLayout.vue`
6. 路由路径与 `src/router/index.ts` 保持一致

## 六、开发说明

- 原型中所有"提交"按钮均有表单验证提示（Element Plus ElMessage）
- 登录/注册成功后自动跳转首页
- 发布成功后自动跳转首页
- 消息列表点击会话自动跳转聊天详情
- 管理端审核支持通过/驳回/查看详情操作
- 删除操作有 Element Plus ElMessageBox 确认弹窗
