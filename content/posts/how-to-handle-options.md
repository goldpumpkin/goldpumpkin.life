---
title: 期权(Option)的处理方式
tags : [
    "trading","option"
]
date : "2024-02-20"
---

如果想要在期权的交易中获利，那你必须要了解期权的处理机制。

假设我们通过某券商平台买入一份看涨期权(Long Call)，那这份期权可以怎么处理呢？

### 被动处理- Long Option

一般如果你不进行任何操作，该期权会被自动处理。期权清算公司（The Options Clearing Corporation，简称 **OCC**） 会默认期权拥有者想要行使他们的期权。因此，在到期日当天盘后时段，OCC 会以期权的底层标的资产在主要交易所公布的官方收盘价为标准，来计算期权的价值，如果期权为 ITM (价内期权)，那 OCC 会帮助期权持有者，进行 **自动行权(Auto Exercise)** 处理。此方式成功处理的前提是，你的证券账户需要有足够的保证金，来支持自动行权操作，否则券商会将你的期权持仓进行平仓处理。

![期权清算公司(OCC)是全球最大的股票衍生品清算组织](https://img.goldpumpkin.life/1708442583883-i7Lw632.png)

如果 OCC 计算出期权的价值为 OTM(价外期权) 或者 ATM(平价期权)，也就是说你持有的期权没有什么价值，那么 OCC 就会将你的期权持仓进行 **到期失效(Expire Worthless)** 处理，此时的期权叫做**失效期权(A Lapsed Option)**。

以上是期权到期时的被动处理方式，即 OCC 自动处理期权。如果我们想主动处理，有哪些选择呢？

### 主动处理- Long Option

既然买了期权，我们就有行权的权利。假设在到期日之前，期权的价值已经是 ITM, 你想立即行权，那么你可以向券商发起**提前行权(Early Exercise)**请求。和自动行权一样，按照期权合约内容，以行权价购买对手方的底层标的资产，即你的现金会兑换底层标的资产，所以你需要有足够的保证金支持。

那有些小伙伴可能会想到，如果期权的价值为 OTM，还能行权吗？当然也是可以的，这种行权方式称为 **「Contrary Exercise」**, 只不过此时，期权并没有价值，你为什么会想要行权呢？在实际交易市场中，这种情况确实会有发生，在这儿暂且不深入探究。

当然还有一种情况，就是你不想让 OCC 在到期日，进行自动行权，你可以向券商发起不行权 **(Do Not Exercise)** 的请求。当你在到期日之前发起 DNE 请求并被确认后，在期权到期日当天，无论你的期权是否具有价值，都不会被行权，因为你已经放弃行权了。

此外，更直接的处理方式就是直接交易期权。如果底层标的的价格上涨，看涨期权的价格跟着上涨，那你可以直接卖出看涨期权持仓，从而获利。

以上我们都是作为期权持有者，也就是权利方，可能对期权持仓做出的处理方式。如果我们不看好某标的资产，卖出看涨期权(Short Call)，可能会出现哪些情况呢？

### Short Option 处理方式

当你卖出期权，券商为了降低风险，一般会要求你的账户有足够的保证金。随着底层标的的价格上涨，如果你持有 Short Call Option，你的账户就需要更多的保证金，当保证金不足时，券商会要求你及时追加保证金，否则会将你的期权持仓进行强平处理。所以你必须要关注行情走势，以及保证金是否足够，避免发生被强平的风险。当然，如果发现走势不妙，为了减少损失，可以提前主动平仓。

此外，当权利方行使权利时，作为义务方的我们必须要履行约定的义务。从前文可以看出，只要期权没有失效，权利方就有随时行权的可能性。所以，当我们卖出期权时(Short Option)，就要考虑到，我们会随时被 **指派(assignment)** 去履行相应的义务。

以上就是期权可能出现的处理方式，明显可以看到，期权持有者会有更多的主动性选择，而做空的投资者就需要随时做好付出的准备。毕竟，花了钱就是大爷。

还有需要注意的是，虽然权利方有主动处理(EE/DNE)的权利，但并不是所有券商都支持这些操作(比如老虎证券就不支持提前行权的操作)，大家交易期权时，请提前了解不同券商的交易规则，避免遭受不必要的损失。






