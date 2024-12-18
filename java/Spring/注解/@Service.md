# @Service

## 概述

@Service 是 Spring Framework 中用于标注服务层（Service Layer）组件的注解。它是一个特定的 @Component 派生注解，主要用于表示业务逻辑层的类。使用 @Service 注解标注的类会被 Spring 自动扫描并注册为 Spring 容器中的一个 Bean。

- @Service 通常用于标识业务逻辑的实现类，以区分它们与控制层（Controller）或数据访问层（Repository）组件。
- 它的功能与 @Component 一样，但语义更明确，帮助开发者清晰表达代码意图。



## 组合注解

- [@Component](./@Component.md)



## 用法

```java
@Service
public class UserService {

    public User findUserById(Long id) {
        // 实现业务逻辑
        return new User(id, "John Doe");
    }
}
```



## 属性

### 一、value

> **[@Component](./@Component.md) ==> value**

