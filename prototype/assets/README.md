# 校园轻集市 - 高保真原型设计说明

## 一、项目概述

校园轻集市是一个面向高校学生的校园二手交易与生活服务 Web 平台，覆盖四大核心业务模块：二手交易、失物招领、拼单搭子、跑腿委托。

## 二、技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Vue 3 | CDN | 响应式数据绑定与组件化 |
| Element Plus | CDN | UI 组件库（el-button、el-input、el-table 等） |
| Tailwind CSS | CDN | 辅助布局样式 |
| Unsplash | - | 真实图片资源 |

## 三、UI 设计规范

| 项目 | 值 |
|------|-----|
| 主色 | `#3B82F6`（校园蓝） |
| 辅助色 | `#10B981`（成功绿）、`#06B6D4`（信息青） |
| 背景色 | `#F1F5F9` |
| 卡片 | 白底 `#fff`、14-18px 圆角、`0 1px 6px rgba(0,0,0,0.03)` 阴影 |
| 标题 | `#1E293B` 18-38px Bold |
| 正文 | `#475569` 13-14px |
| 辅助文字 | `#94A3B8` 11-13px |
| 导航 | 固定顶部 64px、sticky、白色背景、底部 1px 边框 |
| 内容区 | max-width 960-1240px、居中 |
| 成功色 | `#10B981` |
| 警告色 | `#F59E0B` |
| 危险色 | `#EF4444` |

## 四、页面清单（22 页）

| 序号 | 文件名 | 页面名称 | 布局类型 |
|------|--------|---------|---------|
| 1 | index.html | 原型入口索引 | 全宽页面 |
| 2 | home.html | 首页信息流 | 主内容+右侧栏 |
| 3 | category.html | 分类浏览 | 全宽卡片网格 |
| 4 | item-detail.html | 二手商品详情 | 主内容+右侧栏 |
| 5 | lost-detail.html | 失物招领详情 | 主内容+右侧栏 |
| 6 | group-detail.html | 拼单搭子详情 | 主内容+右侧栏 |
| 7 | task-detail.html | 跑腿委托详情 | 主内容+右侧栏 |
| 8 | publish.html | 发布选择页 | 居中卡片 |
| 9 | publish-item.html | 发布二手商品 | 表单+右侧提示 |
| 10 | publish-lost.html | 发布失物招领 | 表单+右侧提示 |
| 11 | publish-group.html | 发布拼单搭子 | 表单+右侧提示 |
| 12 | publish-task.html | 发布跑腿委托 | 表单+右侧提示 |
| 13 | messages.html | 消息列表 | 会话列表+空状态 |
| 14 | chat.html | 聊天详情 | 聊天界面 |
| 15 | profile.html | 个人中心 | 个人主页 |
| 16 | my-posts.html | 我的发布 | 列表+操作 |
| 17 | favorites.html | 我的收藏 | 卡片网格 |
| 18 | settings.html | 账号设置 | 表单居中 |
| 19 | login.html | 登录 | 居中登录框 |
| 20 | register.html | 注册 | 居中注册框 |
| 21 | admin-dashboard.html | 管理端首页 | 左侧菜单+右侧内容 |
| 22 | admin-review.html | 信息审核 | 左侧菜单+右侧表格 |

## 五、图片说明

所有图片来自于 [Unsplash](https://unsplash.com)，均为免费可商用图片，可在浏览器中直接加载使用。

## 六、迁移到 Vue3 项目建议

1. 每个 HTML 页面迁移为 `src/views/XxxView.vue`
2. 公共导航提取为 `src/components/AppHeader.vue`
3. 管理端布局提取为 `src/layouts/AdminLayout.vue`
4. 内联 `<style>` 迁移为 `<style scoped>`
5. 数据从 `ref()`/`reactive()` 迁移为 Pinia store 或 API 请求
6. 路由配置对应 `src/router/index.ts`
7. 图片上传功能接入真实文件上传 API

## 七、交互特性

- 所有"提交"按钮有 ElMessage 表单验证提示
- 登录/注册成功自动跳转首页
- 发布成功自动跳转首页
- 消息列表点击会话自动跳转聊天详情
- 管理端审核支持通过/驳回（含驳回原因）/查看详情
- 删除操作使用 ElMessageBox 确认弹窗
- 分类浏览页支持搜索/筛选/排序/分页
- 详情页支持图片缩略图切换
