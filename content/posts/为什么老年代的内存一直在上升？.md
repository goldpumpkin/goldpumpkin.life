---
title: 为什么老年代内存在一直上升？
tags : [
  "JVM","GC"
]
date : "2024-01-27"
---

![Snipaste_2024-02-03_12-31-33](https://img.goldpumpkin.life/1706935705290-ikKm5AK.png)

最近看到 Grafana 监控大屏中，负责的一个服务的两个节点中， Old Generation 内存都再稳步上升，并且并未触发 Major GC，此时好奇心起，到底是应用中的哪些操作产生了这样的影响呢？

![image-20240128011927971](https://img.goldpumpkin.life/1706376978299-iSiu7HB.png)

随后我联系运维同事，帮忙导出 dump 文件，选择了 Pod 1执行命令 `jmap -dump:live,format=b,file=heap001`

Pod 1 执行的 dump 命令后，Old Gen 内存走势如图：

![pod1-dump](https://img.goldpumpkin.life/1706376992128-iBiHX8q.png)

![pod1-dump-major](https://img.goldpumpkin.life/1706376997745-iATDpCq.png)

可以看到，此次 dump 引发了一次 Major GC(Heap Dump Initlated)，Old Gen 内存迅速被释放，因此可以推断出，此服务实例之前的老年代存在大量垃圾对象，因为未触发 Major GC，导致这些对象一直占用内存未被及时清除。

那到底是哪些对象一直源源不断地进入老年代呢？

Pod 2 和 Pod 1 的资源配置情一致，并且 Old Gen 内存走势也大致相同，随后让运维同事在 Pod 2 执行 dump 命令: `jmap -dump:format=b,file=heap002` , 除了生成的文件名称和 Pod 1 不一样外，火眼金睛的你应该也已经发现，此次命令少了个可选参数 `live` ，这样生成内存快照前并不会触发 Full GC，利于我们观察垃圾对象的情况。

利用 IDEA 的一款插件 Profiler 分析下 heap dump 文件。

![Class1](https://img.goldpumpkin.life/1706377006227-io3ywox.png)

![Class2](https://img.goldpumpkin.life/1706377013144-iCuw5Cf.png)

观察 Class Tab 页，根据 Shallow 从大到小排列（Shalllow 表示这个对象占用堆的大小，Retained 表示下一次 Major GC 后对象在堆中的大小）。和业务代码直接相关的两个类 `ApplicationBank` 、`RegionTree` ，可以明显的看到，这两个类的实例存在近 140M 的垃圾对象未被回收。那么这下可以精确地找到相关类，从而顺藤摸瓜找到关键业务代码：

![LocalCache](https://img.goldpumpkin.life/1706377020392-i4ipmwu.png)

`RegionTree` 同样也有对应的缓存。看到这些代码，想必结论也清楚了：每隔 30 min 刷新一遍 LocalCache 缓存，这些缓存实例也算是长期存活的对象了，它们或因年龄到达准入年龄（默认15岁），或因动态年龄判定机制，或因空间分配担保机制进入老年代也是正常现象。

至此，Old Gen 内存缓慢上升的原因，已显露水面，JVM 内存中存在一些长期存活的缓存对象在内存中，并且这些缓存对象每隔一段时间都会重新生成新的实例，随着应用运行的时间越来越长，转入老年代的业务缓存实例也越来越多，最终就会呈现出 Old Gen 内存上升的现象。

那么这样的现象会对应用产生什么影响吗？从目前应用运行的状态来看，即使内存缓慢增长也未触发 Major GC，说明这些缓存对象集合实例并不大，即使经过很长一段时间，达到了 Old Gen 内存限制，那么就会发生 Major GC 来清理这些垃圾，这也是正常现象。而目前此应用发生的 Major GC 次数非常少。所以此应用的内存情况是正常的。

判断应用内存情况，我们可以从应用的 Heap 内存使用大小、 Heap 内存是否可通过 GC 释放掉、 GC 频率以及耗时情况等方面入手。当发现有内存问题时，可使用 `jmap` 命令获取 JVM 内存快照，并配合一些 dump 分析工具（Profiler、Yourkit(Paid)）对内存进行深入分析，找到问题所在。

Reference

- https://www.jetbrains.com/help/idea/read-the-memory-snapshot.html