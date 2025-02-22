---
title: "Cursor 编辑器自动保存功能配置指南"
url: "cursor-editor-autosave-configuration-guide"
date: "2024-02-22"
tags: [
    "Cursor",
    "VS Code",
    "开发工具",
    "编辑器配置",
    "效率工具"
]
categories: [
    "开发工具",
    "教程指南"
]
keywords: [
    "Cursor编辑器",
    "自动保存配置",
    "VS Code分支",
    "编辑器设置",
    "afterDelay配置",
    "开发效率",
    "编辑器功能"
]
description: "详细介绍如何在 Cursor 编辑器中配置自动保存功能，包括设置自动保存延迟时间、切换不同的自动保存模式等。适用于想要提高开发效率，避免手动保存的开发者。"
---

Cursor 是 VS Code 的一个分支，设置文件自动保存的方式是类似的，步骤如下：

1. 首先同时按键 `Command` + `,`   打开 「settings」

2. 在搜索框输入“autosave” ，即可看到文件保存延迟的时间，这里的单位是：毫秒(ms)

   ![autosave search](https://img.goldpumpkin.life/1740233583525-iRtMsMm.png)

3. 点击`Files: Auto Save` 链接，选择 `afterDealy`  即可设置为：在你停止编辑一段时间后自动保存

   也可以根据自身需求，选择其他两个选项：

   - `onFocusChange` - 在编辑器失去焦点时自动保存
   - `onWindowChange` - 在切换窗口时自动保存

   ![afterDelay](https://img.goldpumpkin.life/1740233599017-inyshkp.png)