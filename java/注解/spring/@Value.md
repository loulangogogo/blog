# @Value

## 概述

@Value 是 Spring Framework 提供的注解，用于将外部化的配置值注入到 Spring 管理的组件中。它支持从以下来源获取值：

- 配置文件 (application.properties 或 application.yml)
- 系统环境变量
- 系统属性
- 直接的常量值



## 用法

```java
@Component
public class AppConfig {

    @Value("${app.name}")
    private String appName;

    @Value("${app.timeout:1000}")
    private int timeout;

    @Value("#{T(java.lang.Math).random() * 100}")
    private double randomValue;

    // Getters and Setters
}
```



## 属性

### 一、value

#### (一)、作用

> @Value 注解中的 String value() 属性是其核心属性，用于指定要注入的值来源或表达式。
>
> ### 
>
> | 类型           | 示例                                         | 说明                                                         |
> | -------------- | -------------------------------------------- | ------------------------------------------------------------ |
> | 配置文件值注入 | `@Value("${server.port}")`                   | 从配置文件（`application.properties` 或 `application.yml`）中读取值。 |
> | 默认值         | `@Value("${server.port:8080}")`              | 当 `server.port` 未配置时，使用默认值 `8080`。               |
> | 静态值注入     | `@Value("Static String")`                    | 直接注入静态字符串值。                                       |
> | SpEL 表达式    | `@Value("#{T(Math).random() * 100}")`        | 使用 SpEL 动态生成值，如随机数。                             |
> | 系统属性值注入 | `@Value("#{systemProperties['user.home']}")` | 注入 Java 系统属性 `user.home` 的值。                        |

#### (二)、用法

```java
@Component
public class AppConfig {

    @Value("${app.name}")
    private String appName;

    @Value("${app.timeout:1000}")
    private int timeout;

    @Value("#{T(java.lang.Math).random() * 100}")
    private double randomValue;

    // Getters and Setters
}
```

