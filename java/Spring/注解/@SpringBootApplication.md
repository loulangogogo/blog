# @SpringBootApplication

## 概述

 Spring Boot 提供的一个核心注解，用于标注应用的主启动类，它是多个注解的组合，能够帮助快速配置和启动 Spring Boot 应用。



## 组合注解

- [@SpringbootConfiguration](./@SpringbootConfiguration.md)
- [@EnableAutoConfiguration](./@EnableAutoConfiguration)
- [@ComponentScan](./@ComponentScan)



## 用法

```java
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MySpringBootApplication {
    public static void main(String[] args) {
        SpringApplication.run(MySpringBootApplication.class, args);
    }
}
```



## 属性

### 一、exclude

#### (一)、作用

> 过提供一个或多个自动配置类的 Class 对象，阻止 Spring Boot 自动加载这些配置。

#### (二)、用法

```java
@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class, HibernateJpaAutoConfiguration.class})
public class MyApp {
}
```



### 二、excludeName

#### (一)、作用

> 通过指定自动配置类的全限定名（字符串形式）来排除自动配置。这在你无法直接引用目标配置类的情况下特别有用，比如目标类在编译时不可用。

#### (二)、用法

```java
@SpringBootApplication(
    excludeName = {
        "org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration",
        "org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration"
    }
)
public class MyApp {
    public static void main(String[] args) {
        SpringApplication.run(MyApp.class, args);
    }
}
```



### 三、scanBasePackages

#### (一)、作用

> 指定组件扫描的基础包路径，Spring 会扫描这些包及其子包中的所有组件（标注了 @Component, @Service, @Repository, @Controller 等的类），并将它们注册为 Bean。

#### (二)、用法

```java
@SpringBootApplication(scanBasePackages = {"com.example.myapp", "com.example.other"})
public class MyApp {
    public static void main(String[] args) {
        SpringApplication.run(MyApp.class, args);
    }
}
```



### 四、scanBasePackageClasses

#### (一)、作用

> 通过指定一个或多个类，确定其所在的包路径作为组件扫描的基础包。Spring 会扫描这些包及其子包中的组件（标注了 @Component, @Service, @Repository, @Controller 等的类）。

#### (二)、用法

```java
@SpringBootApplication(scanBasePackageClasses = {MyService.class, MyRepository.class})
public class MyApp {
    public static void main(String[] args) {
        SpringApplication.run(MyApp.class, args);
    }
}
```



### 五、nameGenerator

#### (一)、作用

> 定义一个用于生成 Bean 名称的策略类。扫描到的组件（如标注了 @Component, @Service 等的类）会使用这个生成器生成唯一的 Bean 名称。

#### (二)、用法

```java
import org.springframework.beans.factory.support.BeanDefinitionRegistry;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.context.annotation.AnnotationBeanNameGenerator;

public class CustomBeanNameGenerator extends AnnotationBeanNameGenerator {
    @Override
    protected String buildDefaultBeanName(BeanDefinition definition) {
        // 使用类的全限定名作为 Bean 名称
        return definition.getBeanClassName();
    }
}

@SpringBootApplication(nameGenerator = CustomBeanNameGenerator.class)
public class MyApp {
    public static void main(String[] args) {
        SpringApplication.run(MyApp.class, args);
    }
}
```



### 六、proxyBeanMethods

> **[@SpringbootApplication](./@Configuration.md) ==> proxyBeanMethods**
