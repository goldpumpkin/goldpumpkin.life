---
title: 在本地管理多个 GitHub 账号：SSH 配置完全指南
url: "multiple-github-accounts-local-ssh-configuration-guide"
date: "2024-11-16"
tags: [
    "SSH",
    "Git",
    "GitHub",
    "开发工具",
    "安全配置"
]
categories: [
    "开发工具",
    "最佳实践"
]
keywords: [
    "SSH配置",
    "GitHub多账号",
    "Git配置",
    "SSH密钥管理",
    "开发环境配置"
]
description: "详细介绍如何在本地管理和配置多个 GitHub 账号，包括 SSH 密钥配置、Git 用户设置以及远程仓库管理的最佳实践。适合需要同时管理多个 GitHub 身份的开发者。"
---

## Key Takeaways

- 不同的 Git 用户配置（user.name/email）决定代码提交者的身份
- SSH 密钥配置决定推送代码的权限验证
- 每个 GitHub 账号使用独立的 SSH 密钥对是最佳安全实践
- `--local` 的 Git 配置优先级高于 `--global` 配置
- Host 别名必须与远程仓库地址中的主机名保持一致

---

## 背景

我需要区分不同的用户，关联不同的 GitHub 账户，每个用户推送代码到不同的 GitHub 账号仓库中。

需求：

- 使用 User1 commit 代码，推送代码到仓库 GitHub1 的仓库
- 使用 User2 commit 代码，推送代码到仓库 GitHub2 的仓库

---

## 配置 GitHub User

### 配置全局 User

我大多数的场景是：使用 User1 推送代码到 GitHub1，因此，我会配置 User1 的用户名和 email 作为全局配置，即默认代码提交者。

**全局配置**

```bash
git config --global user.name "你的 GitHub 用户名"
git config --global user.email "你的 GitHub 邮箱"
```

**查询全局配置**

```bash
# 查看当前的全局配置
git config --global --list
```

### 配置特定仓库的 User

对于另外一个项目，我想使用 User2 作为代码的提交者。因此，可以使用 `--local` 参数指定。

**特定项目的 User 配置**

```bash
# 进入项目目录
cd 项目路径

# 只为当前项目设置新的用户名和邮箱
git config --local user.name "新用户名"
git config --local user.email "新邮箱"
```

*--local` 的配置优先级高于 `--global*

**查询当前项目的配置**

```bash
# 查看当前项目的配置
git config --local --list
```

GitHub 的用户配置，决定的是仓库代码的提交用户显示。如果你想推送到远程仓库，还需要配置 SSH。

---

## 配置 SSH 

我当前是有一个 SSH 公私钥，链接我的 GitHub1 账户。现在有两种选择，你可以在你的 GitHub2 账户中，添加已经存在的 SSH 公钥，以允许推送代码到 GtiHub2 仓库中。还有一种最佳实践，创建一个新的 SSH 公私钥，配置到 Github2 仓库中，这种方式相对更加安全（如果配置为一个，密钥泄露，那么两个 GitHub 账号都将会受影响）。因此，我现在只需要生成另外一个 SSH 公私钥，并且配置。

###  生成 SSH 公私钥

```bash
# 生成新的 SSH 密钥，指定一个新的文件名
ssh-keygen -t ed25519 -C "新的邮箱地址" -f ~/.ssh/id_ed25519_github_user2
```

请注意，`id_ed25519_github_user2` 这个是生成的最终文件名，你可以自定义认为你好管理的命名。

**SSH 公私钥文件「最佳实践」**

- 使用有意义的名称，如 `id_ed25519_github_work`
- 避免使用泛化的名称，如 `id_rsa_1`、`id_rsa_2`
- 建议格式：`id_算法_平台_用途`

### 创建/编辑 SSH 配置文件

- 使用 vim 编辑 SSH 的 config 文件

  ```bash
  vim ~/.ssh/config
  ```

- SSH 配置 config 文件 

  ```bash
  # 第一个账号（默认）
  Host github.com-user1 # 这是可自定义别名，以区分不同的账号, 你可以按照这个模式配置：github-<用户名>
      HostName github.com # 这是实际要连接的服务器地址
      User git # 连接使用的用户名（GitHub 统一用 git）
      IdentityFile ~/.ssh/id_ed25519 # 对应的私钥文件路径
  
  # 第二个账号 
  Host github.com-user2
      HostName github.com 
      User git
      IdentityFile ~/.ssh/id_ed25519_github2
      
  # 延伸举例：公司 GitLab
  Host gitlab.company.com    # 别名可以和真实域名一样
      HostName gitlab.company.com  # 公司 GitLab 的实际地址
      User git
      IdentityFile ~/.ssh/id_ed25519_gitlab_xxx
  ```

###  添加 SSH 密钥到 GitHub

- 登录 GitHub

- 点击右上角头像 -> Settings

- 点击左侧 "SSH and GPG keys"

- 点击 "New SSH key"

- 将复制的公钥内容粘贴进去，给密钥起个名字

- 点击 "Add SSH key"

- 添加完成后，测试是否匹配

  ```bash
  ## 其中 github.com-User 是 SSH 配置 config 文件中，配置的别名
  ssh -T git@github.com-User
  ```

---

## 项目关联远程仓库

### 如果是新项目，直接添加远程仓库

`git remote add origin git@github.com-user:xxx/xxx.git`

*命令中 `github.com-user` 就是 SSH 配置 config 文件中，配置的别名，下面是一样的*

### 如果已经有远程仓库，需要修改地址

`git remote set-url origin git@github.com-user:xxx/xxx.git`

---

## 常见问题（FAQs）

### Q: 为什么我的 SSH 测试成功但无法推送代码？
A: 检查远程仓库 URL 是否使用了正确的 Host 别名。使用 `git remote -v` 查看并确保与 SSH 配置匹配。

### Q: 能否对不同的 GitHub 账号使用同一个 SSH 密钥？
A: 技术上可行但不推荐，会带来安全风险。如果密钥泄露，所有账号都会受影响。

### Q: 如何查看当前项目使用的是哪个用户配置？
A: 使用 `git config user.name` 和 `git config user.email` 命令查看。

### Q: 提交历史中的作者信息与推送账号不匹配有问题吗？
A: 只要有推送权限，Git 允许不同的提交者和推送者。但建议保持一致性，便于追踪和管理。

### Q: 如何切换项目的远程仓库关联？
A: 使用 `git remote set-url origin git@github.com-user:xxx/xxx.git` 命令，确保使用正确的 Host 别名。

---

## 故障排除

如果遇到问题，按以下步骤检查：

1. 验证 SSH 配置：`cat ~/.ssh/config`
2. 测试 SSH 连接：`ssh -T git@对应的Host别名`
3. 检查远程仓库URL：`git remote -v`
4. 确认当前的 Git 用户配置：`git config --list`

---

## 注意事项

- 定期轮换 SSH 密钥以提高安全性
- 在不同设备上使用相同配置时，需要重新生成密钥
- 建议在 GitHub 上启用双因素认证
- 妥善保管私钥，不要分享或暴露在公共场所





