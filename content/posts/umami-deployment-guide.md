---
title: Umami 自托管部署完整指南：Vercel + Supabase 免费方案
url: "umami-deployment-guide"
date: "2026-01-05"
tags: [
    "Umami",
    "网站分析",
    "Vercel",
    "Supabase",
    "自托管",
    "隐私保护"
]
categories: [
    "技术教程",
    "建站指南"
]
keywords: [
    "Umami部署",
    "Umami自托管",
    "Vercel部署Umami",
    "Supabase数据库",
    "网站流量分析",
    "Google Analytics替代",
    "隐私友好分析",
    "免费网站分析工具"
]
description: "详细介绍如何使用 Vercel + Supabase 免费部署 Umami 网站分析工具，包括部署方案对比、详细步骤、常见问题解决，帮助你摆脱 Google Analytics 的隐私困扰。"
---

想给网站加个流量统计，但又不想用 Google Analytics（隐私问题、加载慢、被 AdBlock 拦截）？

Umami 是一个开源、轻量、隐私友好的网站分析工具，自托管后数据完全由自己掌控。本文记录我用 **Vercel + Supabase** 免费部署 Umami 的完整过程。

## 部署方案选择

### 为什么不能用 Cloudflare Pages？

![cloudflare-pages-issue](https://img.goldpumpkin.life/1767619574075-iLZNhxk.png)

一开始我尝试用 Cloudflare Pages 部署，结果踩了坑：

| 问题                      | 原因                                                         |
| ------------------------- | ------------------------------------------------------------ |
| 构建成功但 404            | Cloudflare 只部署了静态资源，忽略了 Next.js 服务端功能       |
| 使用 `next-on-pages` 卡住 | Umami 依赖 Prisma ORM，而 Prisma 无法在 Cloudflare Edge Runtime 运行 |

**结论**：Umami + Cloudflare Pages 技术上不兼容，别浪费时间了。

### 方案对比

| 方案                  | 成本           | 难度     | 推荐场景       |
| --------------------- | -------------- | -------- | -------------- |
| **Vercel + Supabase** | 免费           | 简单   | 独立开发者首选 |
| Railway               | $5/月额度      | 简单   | 需要一体化管理 |
| Docker 自托管         | 免费（需 VPS） | 复杂 | 完全控制       |
| Zeabur                | 有免费额度     | 简单   | 国内访问友好   |

我选择 **Vercel + Supabase**，完全免费且足够稳定。

---

## Vercel + Supabase 部署步骤

![umami-deployment](https://img.goldpumpkin.life/1767619584464-iPfCiCL.png)

### 第一步：准备 Supabase 数据库

1. 注册并登录 [Supabase](https://supabase.com/)
2. 创建新项目，记住你设置的数据库密码
3. 获取数据库连接字符串：
   - 进入 **Settings** → **Database**
   - 找到 **Connection string** → 选择 **URI** 格式
   - 选择 **Transaction** 模式（端口 6543），这个模式更适合 Serverless 环境

连接字符串格式：

```
postgresql://postgres.[项目ID]:[密码]@aws-0-[区域].pooler.supabase.com:6543/postgres
```

### 第二步：Fork Umami 仓库

1. 访问 [Umami GitHub 仓库](https://github.com/umami-software/umami)
2. 点击右上角 **Fork** 到自己的 GitHub 账号

### 第三步：部署到 Vercel

1. 登录 [Vercel](https://vercel.com/)（推荐用 GitHub 账号）
2. 点击 **Add New...** → **Project**
3. 导入刚才 Fork 的 `umami` 仓库
4. 配置环境变量：

   | 变量名           | 值               |
   | -------------- | ------------------- |
   | `DATABASE_URL` | Supabase 连接字符串 |

5. 点击 **Deploy**，等待构建完成

### 第四步：初始化数据库

Vercel 部署完成后，还需要在本地执行数据库迁移：

```bash
# 克隆你 Fork 的仓库
git clone https://github.com/你的用户名/umami.git
cd umami

# 安装 pnpm（如果没有的话）
npm install -g pnpm

# 安装项目依赖
pnpm install

# 设置环境变量（替换成你的连接字符串）
export DATABASE_URL="postgresql://postgres.xxx:password@xxx.pooler.supabase.com:6543/postgres"

# 推送数据库结构
pnpm prisma db push
```

看到 `Your database is now in sync with your Prisma schema` 就说明成功了。

### 第五步：登录 Umami 后台

1. 访问 Vercel 分配的域名（如 `umami-xxx.vercel.app`）
2. 使用默认凭据登录：
   - 用户名：`admin`
   - 密码：`umami`
3. **登录后立即修改密码**：Settings → Profile → Change Password

---

## 可选配置

### 绑定自定义域名

**Vercel 端配置：**
- 进入项目 Settings → Domains → 添加你的域名（如 `analytics.yourdomain.com`）

**DNS 配置（以 Cloudflare 为例）：**
- 添加 CNAME 记录：`analytics` → `cname.vercel-dns.com`
- 代理状态设为 **DNS Only**（灰色云朵），否则 SSL 可能有问题

### 常用环境变量

| 变量                | 说明             | 示例               |
| ------------------- | ---------------- | ------------------ |
| `DATABASE_URL`      | 数据库连接（必填）      | `postgresql://...` |
| `HASH_SALT`         | 加密盐值（可选） | 随机字符串         |
| `DISABLE_TELEMETRY` | 禁用官方遥测         | `1`                |

---

## 常见问题

### Q: `pnpm: command not found`

```bash
npm install -g pnpm
```

### Q: `Missing script: db:migrate`

Umami v3 改用了 Prisma，数据库迁移命令变了：

```bash
pnpm prisma db push
```

### Q: Cloudflare Pages 构建成功但访问 404

这是因为 Next.js 动态路由需要服务端渲染，而 Cloudflare Pages 只部署了静态文件。换用 Vercel 就好了。

### Q: 数据库连接失败

检查以下几点：
- `DATABASE_URL` 格式是否正确，密码中的特殊字符是否需要 URL 编码
- Supabase 项目是否处于活跃状态（免费项目长期不用会暂停）
- 确认使用 Transaction 模式（端口 6543）

---

## 部署架构图

![Umami 部署架构图](https://img.goldpumpkin.life/1767619596138-iZ2oveA.png)

---

## 总结

1. **别用 Cloudflare Pages** — Prisma 和 Edge Runtime 不兼容
2. **推荐 Vercel + Supabase** — 完全免费，30-60 分钟搞定
3. **数据库迁移用 Prisma** — `pnpm prisma db push`
4. **部署后立即改密码** — 默认 admin/umami 不安全

部署完成后，在 Umami 后台添加网站、获取追踪代码，嵌入到你的网站就可以开始统计了。
