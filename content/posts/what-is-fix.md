---
title: FIX 是什么？
tags : [
    "trading"
]
date : "2023-09-11"
---

FIX(The Financial Information eXchange) 是一种在金融领域中用于信息交换的开放式协议。目的是推动国际贸易电子化的进程，主要用于企业对企业 (B2B) 的交互，在金融活动个环节参与者之间，包括投资经理、经纪人、买方、卖方建立起实时的电子化通讯协议。FIX 协议目标是把各类证券金融业务需求流程交互标准化，使之成为一个个可以用计算机语言描述的功能流程，并在每个业务功能接口上统一交换格式，方便各个功能模块的连接。

1992 年在所罗门兄弟 (Salomon Brothers) 和富达投资 (Fidelity Investments) 之间的股票交易中首次引入。核心 FIX 协议和消息传递规范标准系列由 FIX Trading Community™（一个独立的非营利性行业驱动标准机构）维护，该社区的成员有社区成员有 300+。刚开始 FIX 协议主要是服务于股票交易，目前已发展到可以广泛支持多种金融活动中，例如外汇交易、债券交易、数字货币交易等，并在全球被广泛使用, 逐渐成为金融交互的标准协议。

FIX 协议主要规定了 FIX 消息类型、各类型消息的元数据、消息的交互场景及消息流等。下图则为 FIX 协议描述及技术标准。

![FIX-Technical-Standard-Stack](https://img.goldpumpkin.life/FIX-Technical-Standard-Stack.png)

FIX 目前支持应用程序消息的三个旧版本: **FIX 4.2**、**FIX 4.4** 和 **FIX 5.0 SP2**，作为电子交易行业标准化和自动化的基础。

而其他版本 FIX 社区已不再支持：

- [FIX 5.0 SP1 Specifications – 17th May, 2009](https://www.fixtrading.org/standards/unsupported/fix-5-0-sp1)
- [FIX 5.0 Specifications – 30th December, 2006](https://www.fixtrading.org/standards/unsupported/fix-5-0)
- [FIX 4.3 Specifications – 24, August, 2001](https://www.fixtrading.org/standards/unsupported/fix-4-3)
- [FIX 4.1 Specifications – 1st May, 1998](https://www.fixtrading.org/standards/unsupported/fix-4-1)
- [FIX 4.0 Specifications – 1st April, 1998](https://www.fixtrading.org/standards/unsupported/fix-4-0)
- [FIX 3.0 Specifications – 3 August, 1995](https://www.fixtrading.org/standards/unsupported/fix-3-0)
- [FIX 2.7 Specifications – 15 July, 1994](https://www.fixtrading.org/standards/unsupported/fix-2-7)

目前 FIX 会话协议的最新版本为 1.1 (FIXT 1.1) 。 随着 2006 年 FIX 协议 5.0 版的发布，FIX 全球技术委员会引入了一个名为传输独立 (TI) 的新框架。 在 TI 框架下，FIX 会话协议和 FIX 协议（应用层消息）已分离。 除了 FIX 会话协议之外，FIX 协议消息的交互还允许通过任何适当的传输技术（例如 MQ、WS-RX、消息总线）发送 。

如果你想了解更多关于 FIX 协议相关内容，可以到 [FIX 社区官网](https://www.fixtrading.org/)浏览。


*Reference*

*1.FIX 5.0 SP1 Specifications(https://www.fixtrading.org/standards/unsupported/fix-5-0-sp1)*

*2.FIX 5.0 Specifications(https://www.fixtrading.org/standards/unsupported/fix-5-0)*

*3.FIX 4.3 Specifications(https://www.fixtrading.org/standards/unsupported/fix-4-3)* 

*4.FIX 4.1 Specifications(https://www.fixtrading.org/standards/unsupported/fix-4-1)*

*5.FIX 4.0 Specifications(https://www.fixtrading.org/standards/unsupported/fix-4-0)*

*6.FIX 3.0 Specifications(https://www.fixtrading.org/standards/unsupported/fix-3-0)*

*7.FIX 2.7 Specifications(https://www.fixtrading.org/standards/unsupported/fix-2-7)*

*8.FIX 社区官网(https://www.fixtrading.org)*