---
title: 为什么要写单元测试?
tags : [
    "Unit Test"
]
date : "2020-09-25"
---

最近 leader 在要求每次开发新需求时同时要编写单元测试，之前很少会写单元测试，对单元测试的理解比较浅，刚好看到一篇介绍比较细致的文章。那就容我用蹩脚的英语翻译一下（英文很棒的同学直接到本文尾部访问原文链接吧），和大家一起讨论学习下。


## 开始

单元测试是任何一个有态度的软件开发工程师的工具箱中必备的工具。然而，有时候对一段特定的代码，编写一个好的单元测试是一件让人头疼的事情。开发人员在自测或者测试其他人代码遇到困难时，他们常常认为，由于自身缺乏一些基本的测试知识或者没有掌握单元测试技巧导致的。

在这篇单元测试教程中，我要证明一下写好单元测试是非常容易的。其实，使得单元测试变得复杂化，或者说给单元测试带来昂贵复杂性的是，代码的不良设计和不可测试性。接下来，我们将讨论，是什么使得代码变的很难测试，而为了提高的代码可测试性，我们又该怎么避免那些反模式和不良实践呢，最后我们聊一下，通过编写可测试代码会给我们带来其他哪些好处。我们将看到，编写单元测试和生成可测试代码不仅仅是为了减少测试的麻烦，也是为了使得代码本身变得更加健壮和更易于维护。

![UT-1](https://img.goldpumpkin.life/o/toptal-blog-image-1434578005589-4e6897ec04cc0b3c7075b9b011ee915c.gif)

## 什么是单元测试？

本质上，一个单元测试就是我们应用程序的一个方法，这个方法的行为可以**独立于应用的其他部分**被验证。一个典型单元测试包括三个阶段：首先，初始化要测试应用程序的一小部分（也称为[被测系统](https://zh.wikipedia.org/zh-hans/%E8%A2%AB%E6%B5%8B%E7%B3%BB%E7%BB%9F)，即 SUT）。然后，对被测系统应用一些刺激（通常对其调用一个方法）。最后，观察被测系统的行为结果。如果行为结果和预期的保持一致，那么单元测试通过。否则，不通过，同时表明了被测系统中存在问题。这三个测试阶段也成称为：Arrange、Act 和 Assert，简称 AAA。

单元测试可以验证被测系统的不同方面的行为，但大体上行为可以分为两类：*基于状态*的或者是*基于交互*的。验证被测系统是否产生正确的结果，称为**基于状态**的单元测试。验证被测系统是否正确调用某些方法，称为**基于交互**的单元测试

现在就换一种方式来解释下软件的单元测试。想象有一个疯狂的科学家，想构造一些超自然的[生物嵌合体](https://zh.wikipedia.org/wiki/%E5%B5%8C%E5%90%88%E9%AB%94)，材料包括青蛙腿、章鱼触角、鸟翅膀和狗头（这个比喻非常贴近程序员在日常中的实际工作）。那这个科学家如何保证他挑选的每个生物单元都能正常工作呢？他可以做一些小试验，比方说，拿一只青蛙的腿，对它施加电刺激，然后检查肌肉是否适当收缩。其实他现在所做的基本上与单元测试的 Arrange-Act-Assert 步骤是相同的；唯一的区别是，在这种情况下，单元指的是物理对象，而不是我们用来构建程序的抽象对象。

![UT-Crazy-1](https://img.goldpumpkin.life/o/image-20200929142032175.png)

如下是一个简单的单元测试（英文原文是用 c# 编写的示例，本文大部分用 java 来编写示例）

![unit test simple example](https://img.goldpumpkin.life/o/image-20200925170621777.png)

## 单元测试 vs 集成测试

另一个需要考虑的重要问题是单元测试和集成测试之间的区别。

软件工程中的单元测试的目的是验证独立于应用其他部分的代码行为。单元测试的代码范围很窄小，这样就允许我们覆盖所有情况，以确保每个部分都能正确工作。

另一方面，集成测试则演示的是，系统的不同部分在实际环境中协同工作的情况。验证的场景相对比较复杂，一般需要借助外部资源，比如数据库或web服务器等。

让我们回到疯狂科学家的比喻中，设想他现在已经成功地将各个生物器官结合起来了。他想对这个组合好的生物体进行测试。比如，验证这个生物体可以在不同地形上行走。那么他首先需要建立一个生物可以行走的环境。之后，把组合生物体扔进去，用棍子戳他，观察它是否按照预想的设计行走和移动。在完成测试后，疯狂的科学家还需要清理他可爱的实验室里所有散落的泥土、沙子和岩石。

![UT-Crazy-2](https://img.goldpumpkin.life/o/image-20200929142259927.png)

请注意单元测试和集成测试之间的显著区别是：*单元测试是验证应用程序中一小部分的行为，独立于环境和其他部分，并且非常容易实现；而集成测试则涵盖了在接近真实生活环境中的不同组件之间的交互，并且需要更多的工作，包括额外的安装和拆卸阶段。*

合理的结合单元测试和集成测试可以确保，每个单元都能独立于其他单元正常工作，并且所有这些单元在集成时都能很好地发挥作用，这让我们对整个系统在生产环境中正常运行有了很大的信心。 

## 什么是好的单元测试？

在深入学习本教程的主要部分，进行编写单元测试之前，让我们先快速讨论一下，一个好的单元测试应该具备哪些属性。一个好单元测试应该具备以下属性：

+ **易写**

  开发人员通常编写大量的单元测试，来覆盖应用的可能出现的不同行为和不同方面。这就要求单测是不需要花费程序员大量精力就可以轻松编写的。

+ **可读性**

  单元测试的目的应该是明确的。单元测试描述的是我们应用中某个行为的影响，因此一个好的单元测试应该很容易让人理解正在测试的是哪种场景。如果单测失败，也很容易知道问题点在哪里。一个好的单元测试，让我们可以在不 debug 的情况下修复错误！

+ **可靠**

  单测只有在系统有 bug 的情况下才会失败。虽然这看起来很明显，但是有些程序经常即使没有bug，也出现测试失败的情况。例如，测试可能在某个运行时通过，但是在运行整个测试套件时失败，或者是在开发环境单测通过，但是在集成环境中单测失败。这些情况表明单测存在设计缺陷。好的单元测试是可以重复执行的，并且不受环境或运行顺序等外部因素的影响。

+ **运行快**

  开发人员编写单元测试是为了重复执行，以检测新代码是否引入了新的 bug。如果单元测试很慢，开发人员很可能不会在他们的机器上运行单元测试。一个慢的单测，可能不会造成很大的影响，但是一千个慢的单测，那将会浪费很多时间了。慢的单测可能还表明了被测系统和单测本身可能和外部系统产生了交互，单测可能依赖外部因素。

+ **真单元，非集成**

  正如我们刚刚已经讨论过的，单元测试和集成测试有不同的目的，我们要区分开。单元测试和被测系统都不应访问网络资源、数据库和文件系统等，避免受到外部因素的影响。

这就是单元测试，*并没有什么秘密*。此外，还有一些编写单元测试的技巧。

## 可测试和不可测试代码

有些的代码的编写方式使得为其写一个好的单测是很困难的。那么，是什么让代码变得难以测试呢？让我们回顾一下我们在编写代码时候，应该避免的反模式、代码坏味道和不良实践。

### 毒害代码库的因素之不确定因素

从一个简单的例子开始。假设我们正在为一个智能家庭微控制器编写一个程序，其中一个需求是，如果是在傍晚或晚上检测到后院有运动，那么就自动打开灯。我们现在就先实现一个方法，该方法返回一天中各阶段的大致时间，用字符串表示 “Night”, “Morning”, “Afternoon” or “Evening”:

```java
public static String getTimeOfDay() {
  DateTime time = DateTime.now();
  int hour = DateUtil.hour(time, true);

	if (hour >= 0 && hour < 6) {
    return "Night";
	}
	if (hour >= 6 && hour < 12) {
		return "Morning";
	}
	if (hour >= 12 && hour < 18) {
		return "Afternoon";
	}
  
	return "Evening";
}
```

这个方法获取了系统的当前时间并返回了对应的时间阶段，看起来挺正常的吧。那这段代码到底有没有问题呢？

我们从单元测试的角度来分析这段代码，我们就会发现，我们不可能为其写出一个基于状态的单元测试。`DateTime.now()`是一个隐式输入，在程序执行期间或者测试运行期间会产生不同的值。那么，每次对它的调用将产生不同的结果。

如果在不更改系统日期时间的情况下，这种非确定的行为会导致我们没有办法测试此方法。我们试着写出这个单元测试：

```java
@Test
public void getTimeOfDayAt6AMReturnsMorning() {
  try {
    // 安装：改变系统时间为：6 AM
    
    // Arrange 阶段不需要动作
    
    // Act
    String timeOfDay = DayTimeService.getTimeOfDay();
    
    // Assert
    Assert.assertEquals("Morning", timeOfDay);
  } finally {
    // 拆卸: 回滚系统时间
  }
}
```

这样的测试会违背我们在前面讨论的很多规则。首先，它的编写成本很高，因为还需要比较复杂的环境的安装和拆卸。其次，它是不可靠的，可能会因为没有权限修改系统时间导致单测不通过。并且，它不能保证很快的运行。最后，这个测试并不是一个真正意义上的单元测试，因为它需要环境的安装和复原。其实这个单元测试的成本远大于收益，想必你也不会这么做吧。

分析下来，造成代码不可测试的问题是由低质量的 `getTimeOfDay()` 方法 API 设计引起的。在当前形式下，该方法存在以下几个问题：

+ **和数据源紧密耦合**

  如果再有一个需求是计算某个日期而非当前系统时间处在的时间阶段，那么该方法是不可重用的，紧耦合是大多数方法出现不可测试性问题的主要根源。

+ [**违背了单一职责原则(SRP)**](https://en.wikipedia.org/wiki/Single_responsibility_principle)

  此方法有多种职责，它消耗信息并处理信息。单一职责原则的定义是一个类或者方法只能有一个引起其改变的原因。从这个角度来看，`getTimeOfDay()` 方法的影响因素可能是内部逻辑的改变，也可能是日期时间源的改变。

+ **对完成任务所需的信息撒谎**

  对此方法来说，开发人员必须阅读源码，来了解使用了哪些隐式输入以及还要搞清楚这些隐式输入的来源，才能确定此方法是如何输出的。如果仅从方法的名称来看，是不足以理解方法的行为的。

+ **很难预测和维护**

  依赖于可变的全局状态的方法，它的行为不能仅仅通过读取源代码来预测。你必须考虑全局状态的当前值，以及可能改变它的整个事件序列。在一个真正的应用程序当中，理顺这些东西是比较困难的。

在我们重新审视 API 之后，让我们修复它。庆幸的是，我们打破这些紧密的耦合点是非常容易的，相比较讨论它的所有缺陷。

#### 修复方法：引入方法参数

最显而易见并且很容易的修复方法就是，为这个方法引入一个方法参数：

```java
public static String getTimeOfDay(DateTime time) {
  int hour = DateUtil.hour(time, true);
  if (hour >= 0 && hour < 6) {
    return "Night";
  }
  if (hour >= 6 && hour < 12) {
    return "Morning";
  }
  if (hour >= 12 && hour < 18) {
    return "Afternoon";
  }
  return "Evening";
}
```

现在这个方法需要调用者提供一个时间参数，而不是在方法内部里面提供这个信息。从单元测试的角度来看，这是非常棒的，因为现在这个方式是确定的 —方法的返回值完全取决于方法的入参，现在基于状态的测试很简单，只需要输入时间参数，并核验返回结果就可以了。

```java
@Test
public void getTimeOfDayAt6AMReturnsMorning() {
  // Arrange 阶段为空：测试静态方法，不需要初始化
  
  // Act
  String timeOfDay = DayTimeService.getTimeOfDay(new DateTime("2015-12-31 06:00:00", "yyyy-MM-dd HH:mm:ss"));
  
  // Assert
  Assert.assertEquals("Morning", timeOfDay);
}

```

注意，这简单的重构还解决了前面所提到的 API 的问题（包括紧耦合、单一职责的违背、不够清晰和难以理解的 API），它是通过清晰的分离开*要处理什么数据*和*如何处理*来做到的。

非常棒！这个方法是可测试的。但是对于其调用者是否友好呢？现在调用者的职责是提供日期时间给到这个方法，意味着如果我们不注意，其调用者也会和刚刚的方法一样将变得不可测试。那就让我们来看看，我们怎么处理。（如果比较难理解，别急，请继续往下看）

#### 修复客户端 API ：依赖注入

现在我们继续研究智能家居系统，并实现了`getTimeOfDay` 方法的客户端，上述提到的智能家居微控制器代码，它对于灯光的关闭和打开，是基于一天中时间变量和运动的检测来控制的。

```java
public class SmartHomeController {
  public DateTime lastMotionTime;
  public DateTime getLastMotionTime() {
    return lastMotionTime;
  }
  
	public void actuateLights(boolean motionDetected) {
    DateTime time = DateTime.now();
    
    // 更新上次检测时间
		if (motionDetected) {
      lastMotionTime = time;
		}
    
    String timeOfDay = DayTimeService.getTimeOfDay(time);
    
    // 如果在 evening 或者 night 检测到有运动，那么打开灯
    if (motionDetected && (timeOfDay.equals("Evening") || timeOfDay.equals("Night"))) {
			BackyardLightSwitcher.INSTANCE.TurnOn();
    }
    
    // 如果1分钟内没有发现任何运动，或者是 morning 或 noon，请关灯
    else if (DateUtil.between(lastMotionTime, time, DateUnit.MINUTE) > 1
             || (timeOfDay.equals("Morning") || timeOfDay.equals("Noon"))) {
      BackyardLightSwitcher.INSTANCE.TurnOff();
    }
  }
}
```

哎呦喂！我们又有隐藏输入时间的问题，与前面唯一不同的是，现在是位于更高的抽象级别上。现在我们可以引入另外一个参数，我们可以再一次在方法上增加入参`actuateLights(boolean motionDetected, DateTime dateTime)`,委托此方法的调用者提供`DateTime`参数（这个思路和前面的解决思路是一样的）。但是，与其把问题移到在更高一层调用栈上，不如采用另外一种技术，使得方法`actuateLights(bool motionDetected)`和客户端都有可测试性，这种技术就是[控制反转](https://en.wikipedia.org/wiki/Inversion_of_control)或者称为 IOC。

控制反转可以通过多种方式来实现，接下来，我们来看一个特定的示例—使用构造函数进行依赖注入，看看它如何帮助我们进行构建可测试的 SmartHomeController API。

首先，让我们创建一个 `IDateTimeProvider` 接口，其中包括了一个获取某些日期时间的方法声明：

```java
public interface IDateTimeProvider {
    DateTime getDateTime();
}
```

然后，使`SmartHomeController`引用`IDateTimeProvider`实现，并将获取日期时间的职责委派给它：

```java
public class SmartHomeController {

  // 依赖
  private final IDateTimeProvider dateTimeProvider; 
  
  public SmartHomeController(IDateTimeProvider dateTimeProvider) {
    // 注入需要的依赖
    this.dateTimeProvider = dateTimeProvider;
  }
  
  public void actuateLights(boolean motionDetected) {
    // 委托职责
    DateTime time = dateTimeProvider.getDateTime();
    
    // 其余的灯光控制逻辑在这儿。。。
  }
}
```

现在我们看看为什么叫控制反转：其实是使用什么机制获取日期时间的*控制*权被反转了，之前是`SmartHomeController` 本身控制如何获取，而现在控制权给到了`SmartHomeController`的客户端即使用者。因此，`actuateLights(bool motionDetected)`方法的执行完全依赖于两个可以从外部轻松管理的东西：一个是`motionDetected`参数，另一个是传递到`SmartHomeController`构造函数的`IDateTimeProvider`的具体实现。

为什么这样做对单元测试很重要呢？因为这样我们就可以在生产环境代码和单元测试代码使用不同的`IDateTimeProvider`的实现。在生产环境中，可以注入真实的实现（比如，注入一个读取真实系统时间的实现）。在单测中，我们可以注入一个“伪”实现，返回一个适合测试特定场景的常量或者预定义的`DateTime`值。

`IDateTimeProvider`的一个伪实现如下所示：

```java
public class FakeDateTimeProvider implements IDateTimeProvider{
  private DateTime returnValue;
	public FakeDateTimeProvider(DateTime returnValue) {
    this.returnValue = returnValue
  }
  
  @Override
  public DateTime getDateTime() {
    return returnValue;
  }

  public DateTime getReturnValue() {
    return returnValue;
  }

  public void setReturnValue(DateTime returnValue) {
    this.returnValue = returnValue;
  }
}
```

在这个类的帮助下，可以将`SmartHomeController`和不确定性因素隔离开来，并执行基于状态的单元测试。让我们验证一下，如果检测到运动，该运动的时间是否会被记录在`LastMotionTime`属性中：

```java
@Test
public void actuateLightsMotionDetectedSavesTimeOfMotion() {
  // Arrange
  DateTime time = new DateTime("2015-12-31 23:59:59", "yyyy-MM-dd HH:mm:ss");
	SmartHomeController controller = new SmartHomeController(new FakeDateTimeProvider(time));

  // Act
	controller.actuateLights(true);

  // Assert
  Assert.assertEquals(time, controller.getLastMotionTime());
}
```

太棒了！像这样的单元测试在重构前是不可能的做到的。既然我们已经去除了不确定因素的影响并验证了基于状态的场景测试，那么现在你认为`SmartHomeController`是完全可测试的了吗?

### 毒害代码库的因素之副作用

尽管我们解决了隐式输入的不确定因素问题，并且我们能够测试某些功能，但是代码仍然是不稳定的，至少一部分代码是这样的。

让我们 review 下方法`ActuateLights(bool motionDetected)`中负责打开或者关闭灯光的代码部分：

```java
	// 如果在 evening 或者 night 检测到有运动，那么打开灯
	if (motionDetected && (timeOfDay.equals("Evening") || timeOfDay.equals("Night"))) {
    BackyardLightSwitcher.INSTANCE.TurnOn();
  }
// 如果1分钟内没有发现任何运动，或者是 morning 或 noon，请关灯
else if (DateUtil.between(lastMotionTime, time, DateUnit.MINUTE) > 1
         || (timeOfDay.equals("Morning") || timeOfDay.equals("Noon"))) {
	BackyardLightSwitcher.INSTANCE.TurnOff();
}
```

我们看到，`SmartHomeController`委托了开关灯的职责给到`BackyardLightSwitcher`对象，这个对象还是单例模式。但是这个设计有什么问题呢？

为了对方法`ActuateLights(bool motionDetected)`进行全面的单元测试，我们不仅要做基于状态的测试，还要做基于交互的测试，也就是说，我们应该确保只有在满足适当的条件时，才会调用用于打开或关闭灯光的方法。但是当前的设计，不允许我们这样做：`BackyardLightSwitcher`的`TurnOn()`和`TurnOff()`方法会触发系统中一些状态的更改，或者换句话说，会产生副作用（灯的开关）。验证开关的灯方法被调用的唯一方式是检查它们相应的副作用是否真的发生了，这样的验证会很痛苦。

的确，让我们假设运动传感器、后院灯和智能家居微控制器都连接到了物联网的网络中，并使用某种无线协议可以进行网络通信。在这种情况下，如果想做到上面的单元测试，我们可以尝试在单测中接受和分析网络流量，从而来核验测试结果。或者，各个硬件组件用导线连接起来，单元测试可以检查电压是否施加到对应的电路上。或者，还可以使用额外的光传感器来检查灯是否是真的打开或者关闭来进行核验。

正如我们所看到的，单元测试具有副作用的方法和单元测试具有不确定性的方法，这两者一样困难，甚至是不可能的。任何的尝试会导致我们之前看到的类似的问题。这个测试将变得很难实现、不可靠，还可能很慢，而且也可能不是一个真正的单元。还有，运行测试套件引起的灯光的闪烁也会让人发疯。

同样，所有这些可测试性问题都是由糟糕的 API 设计引起的，并不是开发人员编写单元测试的能力。无论灯的控制是怎么实现的，`SmartHomeController` API 都会遇到以下常见的问题：

+ **和实现紧密耦合**

  API 依赖于 `BackyardLightSwitcher` 硬编码的具体实现。现有方法 `ActuateLights(bool motionDetected)` 无法做到切换后院以外的任何灯光，它是不可重用的。

+ **违背了单一职责原则**

  这个 API 有两个引起其改变的原因：第一，内部逻辑的改变（例如选择只在 night 开灯，而不是在 evening 打开）；第二，如果灯开关机制被另一机制取代。

+ **依赖关系上不清晰**

  如果开发人员不深入研究源代码，那么他们是没有办法知道`SmartHomeController`是依赖于硬编码`BackyardLightSwitcher`。

+ **很难理解和维护**

  如果条件是正确的，但是却无法打开灯光，那该怎么办呢？我们会花很多没用的时间去尝试修复`SmartHomeController`，但最终却发现问题是由`BackyardLightSwitcher`（或者，更有趣的是，灯泡烧坏了）中的一个错误引起的。

解决可测试性和低质量 API 问题的方法是将紧密耦合的组件彼此分离。与前面的例子一样，使用依赖注入可以解决这类问题。只需向`SmartHomeController`添加一个`ILightSwitcher`的依赖项，将控制灯开关的责任委派给它，并传递一个假的、仅测试的`ILightSwitcher`的实现，该实现将记录是否在正确的条件下调用了适当的方法。与其再用一次依赖注入，不如让我们回顾一种有趣的分离责任的替代方式。

#### 修复 API：[高阶函数](https://zh.wikipedia.org/wiki/%E9%AB%98%E9%98%B6%E5%87%BD%E6%95%B0)

这种方法是任何支持[头等函数](https://zh.wikipedia.org/wiki/%E5%A4%B4%E7%AD%89%E5%87%BD%E6%95%B0)的面向对象语言中的一种选择。让我们利用 Java 的函数特性，让`actuateLights(boolean motionDetected)` 方法再接受两个参数：一对操作委托，指向应该调用打开或者关闭指示灯的方法。这种解决方法会将函数转化成为一个高阶函数：

```java
public void actuateLights(boolean motionDetected, Runnable turnOn, Runnable turnOff) {
  DateTime time = dateTimeProvider.getDateTime();
  // 更新上次检测时间
  if (motionDetected) {
    lastMotionTime = time;
  }
  String timeOfDay = DayTimeService.getTimeOfDay(time);
  
  // 如果在 evening 或者 night 检测到有运动，那么打开灯
  if (motionDetected && (timeOfDay.equals("Evening") || timeOfDay.equals("Night"))) {
    // 调用一个委托 不再紧耦合
    turnOn.run();
  }
   // 如果1分钟内没有发现任何运动，或者是 morning 或 noon，请关灯
  else if (DateUtil.between(lastMotionTime, time, DateUnit.MINUTE) > 1
            || (timeOfDay.equals("Morning") || timeOfDay.equals("Noon"))) {
    // 调用一个委托 不再紧耦合
    turnOff.run();
  }
}
```

相比较之前见过的典型的面向对象依赖注入的方式，这是一个更具功能性的解决方案；它让我们用更少的代码和多一点的表达式来实现相同的结果。我们不再需要声明一个接口并实现来提供`SmartHomeController`所需的功能，现在我们只需要传递函数的定义。高阶函数可以视为实现控制反转的另一种方式。

现在我们做一个基于交互的单元测试，我们可以将易于验证的伪操作传递到控制器中：

```java
@Test
public void actuateLightsMotionDetectedAtNightTurnsOnTheLight() {
  
  // Arrange 创建一对操作实现开关灯，用一个标识表示灯的状态，并不是真正的打开或者关闭灯
	AtomicBoolean turnedOn = new AtomicBoolean(false);
	Runnable turnOn = () -> turnedOn.set(true);
	Runnable turnOff = ()-> turnedOn.set(false);
  
	DateTime time = new DateTime("2015-12-31 23:59:59", "yyyy-MM-dd HH:mm:ss");
	SmartHomeController controller = new SmartHomeController(new FakeDateTimeProvider(time));
  
  // Act
  controller.actuateLights(true, turnOn, turnOff);

  // Assert
  Assert.assertTrue(turnedOn.get());
}
```

最终，我们把`SmartHomeController` API 变得完全可测试，并且我们既可以对它做基于状态的测试也可以做基于交互的测试。同样，请注意，除了改进了其可测试性之外，我们也解耦了方法中的决策层代码和动作代码，以致于这个 API 变得更加干净并且可重用。

现在来看，为了实现完整的单测覆盖，我们可以很轻松的实现一系列类似的测试来验证所有可能出现的情况，这不是什么大不了的事情，因为这些单测很容易实现。

## 杂质和可测试性

不受控制的不确定性和副作用对代码库的破坏性是相似的。如果不小心使用，它们会导致具有欺骗性的、难以理解和维护的、紧密耦合的、不可重用的和不稳定的代码。

相反，既具有确定性又无副作用的方法是更易于测试、推理和重用的，以致于可以轻松构建更大的程序。在函数式编程中，这种方法称为[纯函数](https://en.wikipedia.org/wiki/Pure_function)。我们很少在单元测试纯函数时遇到问题；我们所要做的就是传递一些参数并检查结果的正确性。真正使代码不稳定的是那些硬编码和杂质性的因素，它们不能被替换、重写或者以其他方式抽象掉。

杂质是有毒的：如果方法`Foo()`依赖于不确定或者有副作用的方法`Bar()`，那么`Foo()`也会变得不确定或有副作用。最终，我们可能会毒害整个代码库。如果将所有这些问题乘以一个复杂的实际应用程序的大小，那么复杂度会变得好高，我们将会被一个非常难以维护的代码库所困住，其中充满了各种坏气味、反模式、隐式依赖以及各种丑陋和令人不愉快的东西。

![code](https://img.goldpumpkin.life/o/image-20200929142351748.png)

然而，杂质是不可避免的。任何真实的应用一定会在某个时刻，通过和环境、数据库、配置文件、网络服务或者其他外部的系统交互，来读取和操作状态。因此，与其完全消除这些杂质，不如限制这些因素，避免让它们毒害你的代码库，并尽可能打破硬编码的依赖关系，以便能够独立地分析和进行单元测试。

## 难以测试代码的常见警告标志

现在看来写单测还是困难吗？其实我们也看到了，问题不是你的测试套件，而是你的代码。

最后，让我们回顾一些常见的警告标志，这些标志表明我们的代码可能很难测试。

### 静态属性和字段

静态属性和字段，或者简单的说，全局状态，它们通过隐藏了方法所需要的信息，引入了非确定性，或者推动了副作用的广泛使用，可能会复杂化代码的理解和可测试性。读取或者修改可变全局状态的函数本质上是不纯洁的。

例如，很难对以下代码进行推理，这些代码依赖于全局可访问的属性：

```c#
if (!SmartHomeSettings.CostSavingEnabled) {
  _swimmingPoolController.HeatWater(); 
}
```

如果` HeatWater()`方法在某个场景，我们确定应该被调用却没有被调用，这时我们该怎么办？因为在应用中任何部分都有可能改变`CostSavingEnabled`的值，所以我们为了弄清楚是哪里出错了，必须找到并分析所有可以改变此值的地方。此外，正如我们已经看到的，为了测试目的，我们不可能设置这些静态属性（例如`DateTime.Now`, or `Environment.MachineName`；它们虽然是只读的，但仍然不确定）。

相反地，不可变的和确定性的全局状态是完全 OK 的。事实上，它有一个更熟悉的名字 - 常量。常量值，例如`Math.PI`不会引入任何非确定性，并且其值是不能被改变的，因此不允许任何副作用。

```c#
// 仍然是一个纯洁的函数
double Circumference(double radius) { 
  return 2 * Math.PI * radius; 
}
```

### 单例

从本质上讲，单例模式只是全局状态的另一种形式。单例提升了 API 的模糊性，这些 API 掩盖了真正的依赖关系，并在组件间引入了不必要的紧密耦合。此外，它们还违反了单一责任原则，因为除了它负责的主要职责之外，它们还控制了自己的初始化和生命周期。

单例程序很轻易地使单元测试依赖代码顺序，因为它们在整个应用程序或单元测试套件的生命周期中都携带了状态。请看以下示例：

```c#
User GetUser(int userId)
{
    User user;
    if (UserCache.Instance.ContainsKey(userId))
    {
        user = UserCache.Instance[userId];
    }
    else
    {
        user = _userService.LoadUser(userId);
        UserCache.Instance[userId] = user;
    }
    return user;
}
```

在上面的示例中，如果首先测试缓存命中的场景，那么会事先向缓存中添加一个新用户，因此缓存未命中场景的后续测试可能会失败，因为它假定缓存为空。为了克服这个问题，我们必须在每次单元测试运行之后编写额外的`teardown`代码来清理 UserCache。

在大多数情况下，使用 Singleton 是一种不好的做法，可以（也应该）避免；但是，区分作为设计模式的`Singleton` 和对象的单个实例是很重要的。在后一种情况下，创建和维护单个实例的责任在于应用程序本身。通常，这是一个工厂或依赖注入容器，它在应用程序的`top`附近（即靠近应用程序入口点）创建一个实例，然后将其传递给每个需要它的对象。从可测试性和 API 质量的角度来看，这种方法是绝对正确的。

### `new`的操作

为了完成某些工作而创建一个对象的实例会带来和 Singleton 反模式相同的问题：造成 API 的不清晰，其中具有隐藏的依赖关系、紧密的耦合度和较差的可测试性。

例如，为了测试当返回404状态代码时，以下循环是否停止，开发人员应设置一个测试web服务器：

```c#
using (var client = new HttpClient())
{
    HttpResponseMessage response;
    do
    {
        response = await client.GetAsync(uri);
        // Process the response and update the uri...
    } while (response.StatusCode != HttpStatusCode.NotFound);
}
```

然而，`new`有时候是完全无害的：例如，创建一个简单的实体类对象完全 OK：

```c#
var person = new Person("John", "Doe", new DateTime(1970, 12, 31));
```

其实创建一个不产生任何副作用的小的临时的对象也是可以的，除非需要修改它们自己的状态，并且基于该状态返回结果。在下面的示例中，我们不关心是否调用了`Stack`方法—我们只检查最终结果是否正确：

```c#
string ReverseString(string input)
{
    // No need to do interaction-based testing and check that Stack methods were called or not;
    // The unit test just needs to ensure that the return value is correct (state-based testing).
    var stack = new Stack<char>();
    foreach(var s in input)
    {
        stack.Push(s);
    }
    string result = string.Empty;
    while(stack.Count != 0)
    {
        result += stack.Pop();
    }
    return result;
}
```

### 静态方法

静态方法是不确定性或者副作用行为的另一个潜在来源。它们很容易引入紧耦合，使我们的代码不稳定。

例如，要验证以下方法的行为，单元测试必须操作环境变量并读取控制台输出流，以确保打印了适当的数据：

```c#
void CheckPathEnvironmentVariable()
{

    if (Environment.GetEnvironmentVariable("PATH") != null)
    {
        Console.WriteLine("PATH environment variable exists.");
    }
    else
    {
       Console.WriteLine("PATH environment variable is not defined.");
    }

}
```

但是，干净的静态函数是被允许的：因为它们的任何组合仍然是干净的函数。例如：

```c#
double Hypotenuse(double side1, double side2) { 
  return Math.Sqrt(Math.Pow(side1, 2) + Math.Pow(side2, 2)); 
}
```

## 单元测试的好处

显然，编写可测试代码需要一定的纪律性、专注力和额外的努力。我们尽管在软件开发中会存在复杂的心理活动，但是也应该时刻小心，避免鲁莽地从头就开始盲目的堆砌代码。

如果我们保证了软件的开发质量，那么我们最终会得到干净的、易于维护的、低耦合的和可重用的 API， 当开发人员理解这些 API 的时候，以致于不会让他们头疼。毕竟，可测试性代码的最终优势不止在于其本身的可测试，更给代码带来了易理解、易维护和易扩展的优点。

## 后记

原文作者讨论了 API 的设计对单元测试的影响，以及该怎么去做好 API 设计和单元测试。这篇文章作者讲的很详细，让我也大致理解了之前听到过的“面向测试编程”的说法。在时间允许的情况下，我们就把单元测试编写起来吧，毕竟好处大大的，同时，还能修整你的代码库。

*英文原文链接：https://www.toptal.com/qa/how-to-write-testable-code-and-why-it-matters*