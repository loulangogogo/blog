# @Conditional

## 概述

@Conditional 是 Spring Framework 提供的一个注解，用于基于某些条件动态地启用或禁用特定的 Bean 定义或配置类。它非常适合构建灵活的、基于环境或上下文的应用程序。



**扩展注解**

| **注解**                            | **作用**                                 | **关键属性**                                                 | **典型场景**                           |
| ----------------------------------- | ---------------------------------------- | ------------------------------------------------------------ | -------------------------------------- |
| **@ConditionalOnProperty**          | 根据配置文件中的属性值加载 Bean          | `prefix`：属性前缀<br>`name`：属性名<br>`havingValue`：匹配的值<br>`matchIfMissing`：属性缺失时行为 | 某功能或模块只有在配置文件启用时才加载 |
| **@ConditionalOnClass**             | 当指定的类存在于类路径时加载 Bean        | `value`：需要检查的类                                        | 第三方库存在时加载特定的配置或功能     |
| **@ConditionalOnMissingClass**      | 当指定的类不存在于类路径时加载 Bean      | `value`：需要检查的类                                        | 缺失某个类时提供默认实现               |
| **@ConditionalOnBean**              | 当容器中存在指定类型的 Bean 时加载       | `value`：需要检查的 Bean 类型<br>`name`：需要检查的 Bean 名称 | 依赖于其他 Bean 存在时加载             |
| **@ConditionalOnMissingBean**       | 当容器中不存在指定类型的 Bean 时加载     | `value`：需要检查的 Bean 类型<br>`name`：需要检查的 Bean 名称 | 需要提供默认 Bean 实现时加载           |
| **@ConditionalOnExpression**        | 根据 Spring 表达式加载 Bean              | `value`：Spring 表达式                                       | 复杂逻辑条件下控制 Bean 加载           |
| **@ConditionalOnJava**              | 根据运行的 Java 版本加载 Bean            | `range`：匹配 Java 版本范围                                  | 某些功能只在特定 Java 版本下运行时启用 |
| **@ConditionalOnWebApplication**    | 当当前应用是 Web 应用时加载 Bean         | `type`：Web 应用类型（`SERVLET` 或 `REACTIVE`）              | 仅在 Web 应用环境下启用某些功能        |
| **@ConditionalOnNotWebApplication** | 当当前应用不是 Web 应用时加载 Bean       | 无                                                           | 非 Web 应用环境下启用功能              |
| **@ConditionalOnResource**          | 当指定的资源存在时加载 Bean              | `resources`：需要检查的资源                                  | 文件或配置存在时加载                   |
| **@ConditionalOnCloudPlatform**     | 当运行在指定的云平台上时加载 Bean        | `value`：云平台类型                                          | 云环境下加载特定的配置                 |
| **@ConditionalOnSingleCandidate**   | 当容器中有且只有一个 Bean 满足条件时加载 | `value`：需要检查的 Bean 类型                                | 单实例 Bean 存在时加载                 |


## 用法

```java
public class CustomCondition implements Condition {
    @Override
    public boolean matches(ConditionContext context, AnnotatedTypeMetadata metadata) {
        String property = context.getEnvironment().getProperty("example.feature.enabled");
        return "true".equalsIgnoreCase(property);
    }
}

@Configuration
public class ConditionalConfig {
    @Bean
    @Conditional(CustomCondition.class)
    public String myBean() {
        return "Conditional Bean Loaded";
    }
}
```



## 属性

### 一、value

#### (一)、作用

Class<? extends Condition>[] value(); 是 @Conditional 注解的核心属性，用于指定实现了 Spring 的 Condition 接口的类列表。这些类包含逻辑，用以动态确定某个 Bean 或配置类是否应该被加载到 Spring 容器中。

**需要实现 Condition 接口**

#### (二)、用法

```java
public class CustomCondition implements Condition {
    @Override
    public boolean matches(ConditionContext context, AnnotatedTypeMetadata metadata) {
        String property = context.getEnvironment().getProperty("example.feature.enabled");
        return "true".equalsIgnoreCase(property);
    }
}

@Configuration
public class ConditionalConfig {
    @Bean
    @Conditional(CustomCondition.class)
    public String myBean() {
        return "Conditional Bean Loaded";
    }
}
```

