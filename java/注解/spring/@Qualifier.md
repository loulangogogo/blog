# @Qualifier

## 概述

@Qualifier 是 Spring 框架中用于解决自动注入（@Autowired）时 Bean 模糊性问题的注解。当同一类型的多个 Bean 存在时，通过 @Qualifier 可以显式指定注入哪一个 Bean。

- **通过** @Primary **指定默认 Bean**（适合全局默认选择）。
- **通过** @Qualifier **显式指明 Bean 名称**（适合细粒度控制）。



| 特性         | @Primary                                                    | @Qualifier                                 |
| ------------ | ----------------------------------------------------------- | ------------------------------------------ |
| **作用**     | 标记某个 Bean 为默认候选者，在没有其他指定时使用。          | 显式指定要注入的具体 Bean。                |
| **应用场景** | 用于同类型 Bean 多个实现时，优先选择默认的实现。            | 用于需要选择特定 Bean，而非默认的实现时。  |
| **优先级**   | 优先级低于 `@Qualifier`，只有在未使用 `@Qualifier` 时生效。 | 优先级高于 `@Primary`，可覆盖默认候选者。  |
| **配置方式** | 直接标注在 Bean 定义上，声明其为默认的候选者。              | 标注在注入点，用于明确选择具体的 Bean。    |
| **使用范围** | 可用于类级别或方法上（如 `@Bean` 方法）。                   | 仅用于依赖注入的字段、方法参数等注入点上。 |
| **适用注解** | 通常与 `@Component`、`@Bean` 搭配使用。                     | 通常与 `@Autowired` 搭配使用。             |



## 用法

```java
@Autowired
public void setMyService(@Qualifier("myServiceA") MyService myService) {
    this.myService = myService;
}
```



## 属性

### 一、value

#### (一)、作用

> String value() default ""; 是 @Qualifier 注解的属性，用于指定要注入的 Bean 的名称。它的作用是帮助开发者在存在多个相同类型的 Bean 时，通过名称显式地选择一个具体的 Bean 进行注入。

#### (二)、用法

```java
@Qualifier("serviceB")
private MyService myService;
```

