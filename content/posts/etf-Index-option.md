---
title: ETF 期权&指数(Index)期权
tags : [
    "trading","option"
]
date : "2024-05-18"
---

在了解 ETF 期权和指数期权之前，我们先来看看什么是指数以及 ETF。

**股票指数**包含多种股票，是反映市场上组成股票价值的一个数据。它通常被用于展现组成股票的共通特性，例如在同一个证券交易所交易、属于同一个产业、或有相同的市值。许多指数是由报章或财经期刊编制作为投资组合（例如:投资基金）绩效评估的基准点。(来自于[维基百科](https://zh.wikipedia.org/wiki/%E8%82%A1%E5%83%B9%E6%8C%87%E6%95%B8))

以下是一些比较常见的指数：

- $NDX – NASDAQ 100 Index. 
- $SPX – S&P 500 Index.
- $RUT – Russell 2000 Index.
- $DJX – Dow Jones Industrial Average 1/100 Index.
- $OEX – S&P 100 index.
- $VIX – S&P 500 Volatility Index.
- $XEO – S&P 100 (European) Index.

**NDX - 纳斯达克 100 指数(NASDAQ 100 Index)**

纳斯达克 100 指数主要追踪在纳斯达克交易所上市的 100 家知名的科技和生物技术公司的市场表现。这些公司主要集中在科技、生物技术、数字经济和创新领域，代表了一些高成长、高创新性的公司。其中的 Top 10 ：微软(MSFT)、苹果(AAPL)、英伟达(NVDA)、亚马逊(AMZN)、Meta(META)、博通(AVGO)、谷歌-A(GOOGL)、谷歌-C(GOOG)、开市客(COST)、特斯拉(TSLA)。

![NDX-Top10](https://img.goldpumpkin.life/1716025731020-iImsgCo.jpg)

**SPX - 标普 500 指数(S&P 500 Index)**

标普 500 指数包含了美国 500 家市值最大、最具代表性的美国上市公司,例如：微软(MSFT)、苹果(AAPL)、英伟达(NVDA)、礼来(LLY)、伯克希尔哈撒韦-B(BRK.B) 等。

![SPX-Top10](https://img.goldpumpkin.life/1716025739163-iqaviid.jpg)

上面说的指数就是一个反映一组股票价值的数据，不能进行交易。但是，你可以交易其衍生出来的资产 - 指数 ETF 及 指数 ETF 期权 和指数期权。

### ETF & 指数(Index) ETF 

ETF  全称 Exchange-Traded Fund，即交易所交易基金。是一种投资基金，类似于共同基金，但可以在证券交易所上市交易，可以像个股一样进行买卖。一支 ETF 通常持有一揽子资产，如股票、债券、大宗商品或其他资产，并跟踪特定的指数或市场表现。

美股市场中常见的 ETF

| **ETF**                                                      | **Ticker** |
| ------------------------------------------------------------ | ---------- |
| SPDR S&P 500 ETF Trust                                       | SPY        |
| iShares Russell 2000 ETF                                     | IWM        |
| Invesco QQQ ETF                                              | QQQ        |
| iShares MSCI Emerging Markets ETF                            | EEM        |
| SPDR Gold Shares                                             | GLD        |
| The Financial Select Sector SPDR Fund                        | XLF        |
| The Energy Select Sector SPDR Fund                           | XLE        |
| SPDR [Dow Jones Industrial Average](https://www.investopedia.com/terms/d/djia.asp) ETF Trust | DIA        |
| VanEck Semiconductor ETF                                     | SMH        |
| VanEck Oil Services ETF                                      | OIH        |

SPY 旨在跟踪标普 500 指数(SPX)的市场表现，本质也就是跟踪标普 500 指数所包含的公司的市场表现。同样地，QQQ 旨在跟踪纳指的 100 家高新公司的市场表现。

对 ETF(包括指数 ETF) 的投资，实质上就是对其包含的一揽子公司的投资，不同 ETF 的成分股是不同的。ETF 的的优势是，你可以投资一类资产，并且能够在交易所快速交易，可以帮助你做更快地和多元化地资产配置。

### ETF 期权 & 指数(Index)期权

如果还不了解期权，可以先阅读下 [期权(Option) 是什么？](https://goldpumpkin.life/posts/2024/01/期权option-是什么/)。

ETF 期权，即底层标的是 ETF 的期权，买卖双方最终交割的资产就是 ETF 股票，和个股期权的交易方式一样。同样地，指数期权，即底层标的是指数(eg. NDX/SPX)的期权，但是它具有一些不同于个股期权的特点。

首先是交割方式的不同，当我们购买个股期权或者 ETF 期权时，最终是以底层标的股票进行交割。而指数期权的是以现金进行交割。假如你购买了1张行权价为 $520 的 SPY Call Option，付出权利金 $10,在 SPY 行情到达 $540 时，进行行权。那么你将付出 $52000 资金，购买 100 股 SPY 标的资产，此时浮盈为 $1000 = (540-520-10) * 1 * 100 。如果购买的是行权价为 $5200 的 SPX Call Option，付出行权价是 $100, 当 SPX 行情达到 $5400 时，你决定行权，那么你将会有 $10000 = (5400-5200-100) * 100 的资金入账。这个例子和实际市场中的价格数量级基本是一致的，一般指数和对应的 ETF 是 10 倍的关系。

![SPX Option](https://img.goldpumpkin.life/1716024771635-iUSJ9rj.png)![SPY Option](https://img.goldpumpkin.life/1716024803991-iDQK0mR.png)

除了交割方式的不同，行权时间上也有差异。 对于个股期权，它们一般都是美式期权(American Style )，特点是在到期日之前的交易日，是允许提前行权(Early Exercise)的。而指数期权基本都是欧式期权(European Style)，需要在到日期当天，才可进行行权操作。此外，指数比指数 ETF 的价格要高(一般是10倍的关系)，所以指数期权比对应的 ETF期权价格也要高，因此投资指数期权需要相对较大的资金。

无论 ETF、ETF 期权，亦或是指数期权都是你投资交易中的一种选择，至于选择哪种资产，取决于你的投资目的。简单点来讲，如果你想用现金作为交割物，那么就选指数(Index)期权。如果你想持有 ETF 资产，可以考虑 ETF 或者 ETF 期权。















