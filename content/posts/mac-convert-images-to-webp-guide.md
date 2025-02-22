---
title: Mac中快速压缩图像为Webp格式
tags : [
    "Mac","Webp"
]
date : "2025-02-12"
---

## 为什么要将图片转化成为 WebP 格式？

首先一个重要的原因是：该格式的图片有更好的压缩效果。WebP 格式的图片，能在保持相似画质的情况下，体积要比 JPEG 和 webp 格式要更小。

这种高效的压缩对网站性能有显著帮助:
- 加载速度更快： 由于文件更小,页面加载时间缩短,提升用户体验
- 节省带宽：特别是在移动设备上浏览网页时很重要 
- 降低存储成本： 对于需要存储大量图片的网站来说可以节省服务器空间

此外，WebP 格式支持动画,可以作为 GIF 的替代品,且文件大小通常比 GIF 小得多。

## Mac 中快速转化图片格式为 WebP 格式的步骤

### 安装 webp 软件工具

可以通过 [Homebrew](https://brew.sh) 安装 webp 软件，Homebrew 是 macOS 和 Linux 上最流行的包管理工具。它让你能够方便地安装、更新和管理各种软件包。 

`brew install webp`

安装完成后，可以通过 `cwebp -version` 命令查看版本信息。

查看更多 `cwebp` 介绍：[WebP](https://developers.google.com/speed/webp/docs/cwebp?hl=en)

### 创建快速操作命令

- 打开「Automator 自动操作」应用程序

![Automator 自动操作](https://img.goldpumpkin.life/image-20250212155638049.webp)

- 选择「快速操作」

  ![image-20250212160215035](https://img.goldpumpkin.life/image-20250212160215035.webp)

- 在「实用工具」中，将「运行 Shell 脚本」拖拽到对应区域。并把下面的脚本贴进去。

  ![auto](https://img.goldpumpkin.life/image-20250212154231727.webp)

  

  **脚本如下：**

  ```zsh
  #!/bin/bash
  
  # 设置日志文件路径
  LOG_FILE="$HOME/webp_conversion.log"
  
  # 添加时间戳的日志函数
  log() {
      echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" >> "$LOG_FILE"
  }
  
  for f in "$@"
  do
      log "Starting conversion of: $f"
      
      if /opt/homebrew/bin/cwebp -q 81 -m 6 -metadata all -mt "$f" -o "${f%.*}.webp" 2>> "$LOG_FILE"; then
          log "Successfully converted: $f"
      else
          log "Failed to convert: $f"
      fi
  done
  
  # 添加完成通知
  log "Conversion batch completed"
  ```

- 完成配置后，请按键 「command」+「s」并输入该工作流的名称 “Convert Webp”，进行保存。

- 现在可以右键点击图片文件，下拉选择 「快速操作」，继续点击我们刚刚创建的指令「Convert Webp」，即可将图片转化为 WebP 格式

  ![image-20250212161737822](https://img.goldpumpkin.life/image-20250212161737822.webp)

  输出结果：

  ![image-20250212161852456](https://img.goldpumpkin.life/image-20250212161852456.webp)

## 通过快捷键转化图片格式为 webp

可以将此流程通过设置自定义快捷键的方式，继续提高格式转化效率。

- 打开「系统设置」，找到「键盘」tab，点击「键盘快捷键」

![image-20250212162834564](https://img.goldpumpkin.life/image-20250212162834564.webp)

- 设定自定义快捷键，这里使用的是 「command」+「control」+「c」，点击「完成」即可设置成功。请注意，如果你设置的快捷键和系统的默认快捷键冲突，则不会生效。

  ![image-20250212163949217](https://img.goldpumpkin.life/image-20250212163949217.webp)

- 选中你想要转化为 WebP 的图片文件，使用刚才你设置好的快捷键，即可快速将图片进行转化。
