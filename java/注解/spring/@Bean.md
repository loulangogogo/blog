# @Bean

## 概述

@Bean 是 Spring Framework 中用于声明一个方法的返回值是一个 Bean 的注解。标注了 @Bean 的方法，其返回值会被注册到 Spring 容器中，作为一个可供依赖注入的组件。



## 用法

```java
@Configuration
public class AppConfig {

    @Bean
    public MyService myService() {
        return new MyServiceImpl();
    }

    @Bean
    public MyRepository myRepository() {
        return new MyRepositoryImpl();
    }
}
```



## 属性

### 一、name

#### (一)、作用

> - 允许为一个 Bean 指定多个别名。
> - 提供了更灵活的方式在项目的不同模块中引用同一个 Bean。

#### (二)、用法

```java
@Configuration
public class AppConfig {

    @Bean(name = {"mainService", "primaryService", "coreService"})
    public MyService myService() {
        return new MyServiceImpl();
    }
}
```



### 二、autowireCandidate

#### (一)、作用

> - 当值为 true 时，该 Bean 可以参与依赖注入的自动装配。
> - 当值为 false 时，该 Bean 不会被 Spring 考虑为自动装配候选者，但仍然可以通过显式(**[@Qualifier](./@Qualifier.md)**)调用或按名称引用。

#### (二)、用法

```java
@Bean(autowireCandidate = false)
public MyService secondaryService() {
    return new MyServiceImpl();
}

@Bean
public MyService primaryService() {
    return new MyServiceImpl();
}
```

```java
@Autowired
private MyService myService;  // 自动装配到 primaryService

@Autowired
@Qualifier("secondaryService")
private MyService explicitService;  // 显式指定 secondaryService
```



### 三、initMethod

#### (一)、作用

> 指定初始化方法的名称，支持用户自定义初始化逻辑。

#### (二)、用法

```java
// 多种初始化方式的执行顺序
//	1.	构造方法：实例化时首先调用。
//	2.	@PostConstruct（如果存在）：在依赖注入完成后执行。
//	3.	afterPropertiesSet：实现 InitializingBean 接口时调用。
//	4.	initMethod：通过 @Bean 显式声明。

public class MyBean {
    public MyBean() {
        System.out.println("Constructor called");
    }

    @PostConstruct
    public void postConstruct() {
        System.out.println("@PostConstruct called");
    }

    public void initialize() {
        System.out.println("Custom initMethod called");
    }
}
```

```java
@Configuration
public class AppConfig {

    @Bean(initMethod = "initialize")
    public MyBean myBean() {
        return new MyBean();
    }
}


// 执行逻辑顺序
// Constructor called
// @PostConstruct called
// Custom initMethod called
```



### 四、destroyMethod

#### (一)、作用

> 在 Spring 的 @Bean 注解中，String destroyMethod() default "(inferred)"; 属性用于指定一个方法，该方法将在 Bean 销毁时（例如应用程序关闭时）调用，以便释放资源或完成其他清理工作。
>
> 定义 Bean 的销毁方法，用于资源清理、连接关闭等。

#### (二)、用法

```java
// 当一个 Bean 声明了多个销毁机制，Spring 会按以下顺序执行：
//	1.	@PreDestroy: 如果类上有这个注解，会优先执行。
//	2.	实现 DisposableBean 的 destroy 方法。
//	3.	通过 @Bean(destroyMethod) 指定的销毁方法。
//	4.	自动推断的销毁方法（如 close 或 shutdown）。

public class MyBean implements DisposableBean {

    @PreDestroy
    public void preDestroy() {
        System.out.println("@PreDestroy called");
    }

    @Override
    public void destroy() {
        System.out.println("DisposableBean destroy called");
    }

    public void cleanup() {
        System.out.println("Custom cleanup method called");
    }
}
```

```java
@Configuration
public class AppConfig {

    @Bean(destroyMethod = "cleanup")
    public MyBean myBean() {
        return new MyBean();
    }
}


// 执行顺序
// @PreDestroy called
// DisposableBean destroy called
// Custom cleanup method called
```

