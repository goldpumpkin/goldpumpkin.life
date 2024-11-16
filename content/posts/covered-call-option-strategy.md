---
title: 期权策略 -  备兑看涨期权(Covered Call)
tags : [
    "期权","美股交易","美股期权交易","期权策略", "交易", "交易知识"
]
date : "2024-10-08"
---

本文将介绍一种比较基础的期权策略：备兑看涨期权策略(Covered Call Option Strategy)

## 什么是备兑看涨期权策略？

备兑看涨期权是一种期权策略，直接表现是，投资者拥有股票的多头头寸的同时，也拥有该股票对应看涨期权的空头头寸，即投资者同时拥有多头（看涨）和空头（看跌）持仓。

![covered-call-assets](https://img.goldpumpkin.life/1728395073172-iG2YxSR.jpeg)

   以此图为例，忽略价格(fake price) ，备兑看涨期权的持仓形态即为：
   | 类别     | 证券类型 | 描述                           | 数量  |
   |----------|----------|--------------------------------|-------|
   | 多头头寸 | 股票     | AAPL                          | 100   |
   | 空头头寸 | 期权     | AAPL US $230 11 Oct 24 Call   | 1 张  |

## 备兑期权这种组合持仓如何获利？

   以上图为例，为了好理解，价格部分修改下，假设持仓成本如下：

   - 底层标的持仓 AAPL： 每股持仓成本 - $227
   - 期权 AAPL US $230 11 Oct 24 Call 
     - 每股权利金 -  $5
     - 行权价 - $230

当日期到达期权到期日(20241011)时，分析以下几种情况（前提：以期权是否为价内期权为大的分界线，再以1股的数量进行分类探究）。

### AAPL 价格小于 230

期权为价外期权，期权的拥有者不会进行行权，进而分析下我们的组合资产盈亏。

现在可以这么考虑，既然期权这一条腿不会被指派，也就说明我们不需要履行对应的义务。权利金已经被我们收入口袋：+ $5，那么整体持仓的盈亏是由另一条腿的持仓成本和标的市价决定的。

#### 盈亏平衡点

- 股票 AAPL 持仓成本为 $227
- 收入权利金 $5
- 盈亏平衡点：227 - 5 = 222

也就是说，当标的的价格，下降到 $222 时，我们整个持仓是不赔不赚的。

#### 亏损

当价格低于 $222 时，组合持仓的收益为<u>亏损</u>状态。

亏损金额 = 标的市价 - $222

#### 盈利

当价格在 $222 - $230 之间时，组合持仓的收益为<u>盈利</u>状态。

盈利金额 = 标的市价 - $222，最大盈利金额为 $8

### AAPL 价格大于等于 230

此时的期权为等价和价内期权，期权拥有者，可能会进行行权动作。

假设，期权拥有者要行使权利，那我们就要履行对应义务，以行权价卖出股票持仓。组合持仓的盈亏状况，是由权利金、股票持仓成本和行权价决定的。

计算公式：(行权价 - 成本价) + 权利金 =  (230 - 227) + 5 = 8

这种情况下，即使价格再往上涨，你的盈利上限就是 $8

从上面的分析来看，组合持仓的盈利状况，是由股票资产的成本、权利金以及市价来决定的。这种期权策略的最大收益是固定的，但是最大亏损比仅持仓股票要好一些，毕竟有一份权利金。

那什么场景下，适合采用备兑期权策略呢？

## 备兑期权策略-适用场景

### 从现有持仓中产生收入

当你长期看好某个股票，不想清仓，但是又想从此持仓获得一笔额外收入时，备兑看涨期权就是一个不错的工具。卖出看涨期权，获取权益金，就是你持仓的额外收益。但是注意，当选择看涨期权时，请计划好你的收益期望，毕竟最大收益是固定的。

### 止盈你的股票持仓

当你想以一个预约定的价格出售你的股票时，备兑看涨期权能稍微扩大你的收益。通过将行权价设定在或接近你的目标卖出价格，你可以提前收取权利金。当标的市价达到或者超过行权价时，期权拥有者极大概率会进行行权，从而以你期望的价格卖出止盈。

### 当市场处于中性或轻微看涨状态

如果你想以较小的风险，在温和的市场中短期内获取一笔收益，也可以使用备兑看涨期权策略。在这种场景下，期权被行权的风险比较适中，但是你可以获得一笔权益金。根据市价、权益金和股票成本价，可以计算出盈亏平衡点，从而掌控资产下行风险。

那什么情况下，不太适合备兑期权策略呢？

## 备兑期权策略-不适用场景

虽然备兑看涨期权可以是一种用于产生额外收入和管理风险的有用策略，但在某些情况下，它可能不是最好的选择。下面是几种你可能应该避免使用备兑看涨期权策略的情况：

### 当你预期股票价格会有显著的上升时

如果你认为自己持有的股票价格在不久的将来可能会显著上升，那么采用备兑看涨期权策略只可能会限制你的潜在收益，因为该策略的最大收益上限是固定的。当你出售一个看涨期权意味着如果期权被行使，你有义务按行权价格卖出你的股份，股票价格有任何显著上升，都将局限你的最大获利。

在这种你强烈看多的情况下，直接只持有底层股票，就完全可以了。

### 当市场波动性高时

高波动性市场可能会给备兑看涨期权策略带来重大风险。

股票价格可能会大幅波动，增加你出售看涨期权被意外行权的可能性。虽然在波动性市场中，看涨期权的溢价往往会更高，很有诱惑力。

如果股票价格急剧下跌，获得的权利金可能不足以抵消基础股票持仓上的损失，导致亏损。在这样的环境中，备兑看涨期权可能无法提供足够的风险管理，应该考虑替代策略。

## 备兑看涨期权的优势

- 备兑看涨期权通过出售看涨期权收取溢价，从而提高投资组合的收益。这笔额外收入可以补充股息或股票持仓产生的其他收入。

- 备兑看涨期权还可以作为一种创收手段，在股市停滞或略微看跌的市场条件下，此时股价可能还不会大幅上涨，等待股价升值或稳定下来，这时候卖出看涨期权，可以获得收益。

- 此外，这种策略还可以作为一种标的行情下行的保护策略。通过卖出看涨期权获得权益金，降低了基础股票的持仓成本。如果股价保持平稳或略有下跌，收到的权益金可以抵消部分损失，为行情下行风险提供一些缓冲。

## 备兑看涨期权的风险点

- 这种策略形式，就是持有标的股票和卖出看涨合约进行组合。理论上，如果标的股票上涨，这些看涨期权的收益潜力将无限大。所以，如果卖方坚定长期看涨，不想被行权，他们必须在到期前回购期权头寸，但是这样会增加交易成本，同时降低净收益或亏损。

- 备兑看涨期权的另一个风险是，如果股价下跌，可能会出现亏损。出售看涨期权所获得的溢价提供了一些下行保护，但如果股价大幅下跌，可能无法完全抵消损失。如果股价跌破盈亏平衡点（即原始购买价减去收到的溢价），投资者可能会因股票头寸而蒙受损失。这种风险可能也不算风险~

## 总结

在你对市场持中性或者轻微看涨预期时，备兑看涨期权策略是比较不错的投资工具选择。但是在强劲的牛市当中，使用它们可能会导致机会成本。


## FAQ

1. 如何建立此策略?

   这是一种多腿持仓，你可以通过下一个多腿订单，订单成交后，你的持仓将会有一个股票资产和对应的看涨期权资产。或者 通过 leg In 组腿的方式，建立此策略持仓。

2. 备兑期权策略和单持仓股票有什么不同？

   备兑期权持仓有两个持仓：一个股票持仓（做多）和一个卖出看涨持仓（做空）。而单持仓股票，仅有股票持仓。在风险控制方面，当标的行情下跌时，由于有权利金，所以备兑期权策略有降低股票持仓成本的优势。但当标的行情上涨时，备兑期权可能会导致机会成本。

3. 裸卖看涨期权是什么？ 

   裸卖看涨期权是不拥有股票标的资产，而卖出看涨期权，收取权利金的方式。这被认为是最高风险的期权合约，因为标的证券的价格可能显著上涨。如果发生这种情况，期权的卖方可能被要求以远高于行权价格的价格购买股票。

4. 如果我在备兑看涨期权到期前卖出标的股票，会有风险吗？

   是的，这可能是一个巨大的风险。在备兑看涨期权到期前卖出标的股票会导致期权变成“裸卖”，因为不再拥有股票。这类似于卖空，并且理论上可能产生无限的亏损。 

5. 名词解释： 多头头寸 和 空头头寸

   - 多头头寸：您购买并持有一项资产，打算在其价值增加时获利。说白点，就是你买入开仓一支股票标的并持有。这时候你的对于底层资产的态度是：看涨。
   - 空头头寸：您“借用”一项资产并将其出售。 然后，您等待其价值下降，以便可以以更好的价格将其买回，然后再将其返还给贷方，即最初允许您借用该资产的个人/公司。这时候你对于底层资产的态度是：看跌。

*免责声明:本文仅供教育和信息目的,不构成任何投资建议。*