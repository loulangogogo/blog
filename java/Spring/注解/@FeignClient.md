# @FeignClient

## 概述

@FeignClient 是 Spring Cloud OpenFeign 中的注解，用于声明一个服务客户端接口。它是通过 HTTP 调用其他微服务的核心注解，简化了服务间通信的开发。借助 OpenFeign，开发者可以通过定义接口和注解的方式完成服务调用，无需手动处理 HTTP 请求。



## 用法

```java
@FeignClient(name = "user-service", contextId = "adminUserClient")
public interface AdminUserServiceClient {
    @GetMapping("/admin/users/{id}")
    User getAdminUserById(@PathVariable("id") Long id);
}
```





## 属性

### value (name)

#### (一)、作用

> 指定 Feign 客户端的服务名称，通常与被调用的服务的注册中心名称一致。(spirngboot项目的话一般就是applicationName)

#### (二)、用法

```java
@FeignClient(name = "user-service")
public interface UserServiceClient {
    @GetMapping("/users/{id}")
    User getUserById(@PathVariable("id") Long id);
}
```

### path

#### (一)、作用

> 为所有接口方法指定一个统一的基础路径。

#### (二)、用法

```java
@FeignClient(name = "order-service", path = "/orders")
public interface OrderServiceClient {
    @GetMapping("/{id}")
    Order getOrderById(@PathVariable("id") Long id);
}
```

### qualifiers

#### (一)、作用

> 当 Spring 容器中存在多个相同类型的候选 Bean 时，通过 qualifiers 来精确匹配所需的 Bean。

#### (二)、用法

```java
@FeignClient(name = "serviceA", qualifiers = {"primaryServiceClient"})
public interface ServiceAClient {
    @GetMapping("/data")
    String getData();
}
```

### url

#### (一)、作用

> 指定调用服务的完整 URL，适用于非注册中心的服务调用。

#### (二)、用法

```java
@FeignClient(name = "external-api", url = "https://api.example.com")
public interface ExternalApiClient {
    @GetMapping("/data")
    Data getData();
}
```

### decode404

#### (一)、作用

> 是否将 HTTP 404 响应解码为 Feign 的正常响应。

#### (二)、用法

```java
@FeignClient(name = "user-service", decode404 = true)
public interface UserServiceClient {}
```

### configuration

#### (一)、作用

> 指定自定义配置类，例如日志级别、请求拦截器等。

#### (二)、用法

```java
@FeignClient(name = "user-service", configuration = CustomFeignConfig.class)
public interface UserServiceClient {}
```

### fallback

#### (一)、作用

> 指定降级处理类，当服务调用失败时执行的备用逻辑。

#### (二)、用法

```java
@FeignClient(name = "user-service", fallback = UserServiceFallback.class)
public interface UserServiceClient {}
```

### fallbackFactory

#### (一)、作用

> 指定降级处理工厂类，允许动态生成降级逻辑。

#### (二)、用法

```java
@FeignClient(name = "user-service", fallbackFactory = UserServiceFallbackFactory.class)
public interface UserServiceClient {}
```

### contextId

#### (一)、作用

> 用于区分不同的 Feign 客户端实例。避免多次定义相同 name 的客户端时发生冲突。

#### (二)、用法

```java
@FeignClient(name = "user-service", contextId = "adminUserClient")
public interface AdminUserServiceClient {
    @GetMapping("/admin/users/{id}")
    User getAdminUserById(@PathVariable("id") Long id);
}
```

### primary

#### (一)、作用

> 是否将该客户端定义为 Spring 容器中的主要 Bean。

#### (二)、用法

```java
@FeignClient(name = "user-service", primary = true)
public interface UserServiceClient {}
```



