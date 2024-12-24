# @Primary

## 概述

@Primary 是 Spring 框架中的一个注解，用于解决当多个候选 Bean 存在时如何选择其中一个作为默认注入的 Bean。通过将 @Primary 注解标记在某个 Bean 上，Spring 会优先选择这个 Bean 来进行自动注入。

- **通过** @Primary **指定默认 Bean**（适合全局默认选择）。
- **通过** [@Qualifier](./@Qualifier.md) **显式指明 Bean 名称**（适合细粒度控制）。



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
@Component
@Primary
public class MyServiceA implements MyService {
    @Override
    public void execute() {
        System.out.println("Executing MyServiceA");
    }
}

@Component
public class MyServiceB implements MyService {
    @Override
    public void execute() {
        System.out.println("Executing MyServiceB");
    }
}
```

