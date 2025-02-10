# @Slf4j

## 概述

@Slf4j 是 Lombok 提供的一个注解，用于自动为类生成一个 org.slf4j.Logger 类型的日志记录器（Logger）。

它简化了日志记录器的声明和初始化，避免手动编写冗长的日志记录器代码。

1. 自动为类生成一个 private static final Logger log 字段。

2. 生成的 log 字段基于 org.slf4j 日志记录框架。



**Lombok 提供了多个类似的注解以支持不同的日志框架：**

| 注解              | 日志框架                                 | Logger 工厂方法                    |
| ----------------- | ---------------------------------------- | ---------------------------------- |
| **`@Slf4j`**      | `org.slf4j.Logger`                       | `LoggerFactory.getLogger()`        |
| **`@Log4j`**      | `org.apache.log4j.Logger`                | `LogManager.getLogger()`           |
| **`@Log4j2`**     | `org.apache.logging.log4j.Logger`        | `LogManager.getLogger()`           |
| **`@CommonsLog`** | `org.apache.commons.logging.Log`         | `LogFactory.getLog()`              |
| **`@JBossLog`**   | `org.jboss.logging.Logger`               | `Logger.getLogger()`               |
| **`@Flogger`**    | `com.google.common.flogger.FluentLogger` | `FluentLogger.forEnclosingClass()` |
| **`@XSlf4j`**     | `org.slf4j.ext.XLogger`                  | `XLoggerFactory.getXLogger()`      |
| **`@CustomLog`**  | 自定义日志记录器                         | 通过指定类的工厂方法               |



## 用法

```java
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class Application {
    public static void main(String[] args) {
        log.info("Application started.");
        log.error("An error occurred.");
    }
}

===
  
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Application {
    private static final Logger log = LoggerFactory.getLogger(Application.class);

    public static void main(String[] args) {
        log.info("Application started.");
        log.error("An error occurred.");
    }
}
```



## 属性

### 一、topic

#### (一)、作用

> String topic() default ""; 是 Lombok 的 @Slf4j 注解的一个可选参数，用于指定日志记录器（Logger）的名称（即日志的主题）。
>
> - 当使用 @Slf4j 时，默认的日志记录器名称是当前类的全限定名（Fully Qualified Class Name）。
> - 使用 topic 参数可以自定义日志记录器的名称，而不是使用默认的类名。

#### (二)、用法

```java
import lombok.extern.slf4j.Slf4j;

@Slf4j(topic = "CustomLogger")
public class Application {
    public static void main(String[] args) {
        log.info("This is a log message with custom topic.");
    }
}

===
  
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Application {
    private static final Logger log = LoggerFactory.getLogger("CustomLogger");

    public static void main(String[] args) {
        log.info("This is a log message with custom topic.");
    }
}

// CustomLogger - This is a log message with custom topic.
```

