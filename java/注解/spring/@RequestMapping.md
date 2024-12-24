# @RequestMapping 

## 概述

RequestMapping 是 Spring 框架中用来映射 HTTP 请求到处理器方法或类的注解。它提供了灵活的选项来定义请求路径、HTTP 方法、请求参数、头信息等，帮助开发者轻松构建 Web 应用和 RESTful API。

- **@GetMapping**
- **@PostMapping**
- **@PutMapping**
- **@DeleteMapping**
- **@PatchMapping**

## 用法

```java
@RestController
@RequestMapping("/api")
public class MyController {

    @RequestMapping(value = "/hello", method = RequestMethod.GET)
    public String sayHello() {
        return "Hello, World!";
    }
}
```





## 属性

### 一、name

#### (一)、作用

> 为请求映射规则指定一个逻辑名称。这个名称在开发调试或工具支持的场景下可能会用到。

#### (二)、用法

```java
@RestController
@RequestMapping(name = "userController", value = "/users")
public class UserController {

    @RequestMapping(name = "getUserById", value = "/{id}", method = RequestMethod.GET)
    public User getUserById(@PathVariable("id") Long id) {
        return new User(id, "John Doe");
    }
}
```



### 二、path

#### (一)、作用

> 在 Spring 的 @RequestMapping 注解中，String[] path() default {}; 是一个属性，主要用于定义处理请求的路径映射。path 属性是 value 属性的别名，两者可以互换使用。

#### (二)、用法

```java
@RestController
@RequestMapping(path = "/api")
public class ApiController {

    @RequestMapping(path = "/hello", method = RequestMethod.GET)
    public String sayHello() {
        return "Hello, World!";
    }
}
```



### 三、method

#### (一)、作用

> RequestMethod[] method() default {}; 是 Spring MVC 中 @RequestMapping 注解的一个属性，用于指定该映射支持的 HTTP 请求方法。此属性接受一个或多个 RequestMethod 枚举值。
>
> - **GET**: 用于读取资源。
> - **POST**: 用于创建资源。
> - **PUT**: 用于更新资源。
> - **DELETE**: 用于删除资源。
> - **PATCH**: 用于部分更新资源。
> - **OPTIONS**: 用于获取服务器支持的 HTTP 方法。
> - **HEAD**: 类似于 GET，但不返回响应体。

#### (二)、用法

```java
@RestController
@RequestMapping("/api")
public class ApiController {

    @RequestMapping(path = "/hello", method = RequestMethod.GET)
    public String sayHello() {
        return "Hello, GET request!";
    }
}
```



### 四、params

#### (一)、作用

> String[] params() default {}; 是 Spring MVC 中 @RequestMapping 注解的一个属性，用于设置请求参数的匹配规则。它允许通过指定参数名称及其值对请求进行过滤和匹配。
>
> 空数组 ({})，表示对请求参数没有特殊要求，所有参数都能匹配.
>
> 1. **存在性匹配**
>
> paramName：要求请求必须包含指定名称的参数，无需指定值。
>
> 2. **值匹配**
>
> paramName=value：要求请求必须包含指定参数且参数值等于指定值。
>
> 3. **排除匹配**
>
> !paramName：要求请求不能包含指定名称的参数。
>
> 4. **复杂匹配**
>
> paramName!=value：要求请求包含指定参数，但参数值不能等于指定值。

#### (二)、用法

```java
@RestController
@RequestMapping("/api")
public class ApiController {

    @RequestMapping(path = "/test", params = "version=1.0")
    public String handleSpecificVersion() {
        return "Parameter 'version=1.0' matched!";
    }
}
```



### 五、headers

#### (一)、作用

> String[] headers() default {}; 是 Spring MVC 中 @RequestMapping 注解的一个属性，用于对请求的 HTTP 头信息进行匹配。
>
> 空数组 ({})，表示对 HTTP 请求头没有特殊要求，所有请求头都会被接受。
>
> 1. **存在性匹配**
>
> headerName：请求必须包含指定名称的 HTTP 头。
>
> 2. **值匹配**
>
> headerName=value：请求必须包含指定名称的头，且其值等于指定值。
>
> 3. **排除匹配**
>
> !headerName：请求不能包含指定名称的 HTTP 头。
>
> 4. **复杂匹配**
>
> headerName!=value：请求头中存在指定名称的头，但其值不能等于指定值。

#### (二)、用法

```java
@RestController
@RequestMapping("/api")
public class ApiController {

    @RequestMapping(path = "/test", headers = "X-Custom-Header=abc")
    public String handleWithSpecificHeaderValue() {
        return "Header 'X-Custom-Header' has value 'abc'!";
    }
}
```



### 六、consumes

#### (一)、作用

> consumes 是 Spring MVC 中 @RequestMapping 注解的一个属性，用于指定请求的内容类型（Content-Type），用于标识哪些媒体类型的请求能够被该方法处理。
>
> 空数组 ({})，表示没有限制，接受所有的请求内容类型。
>
> 通过设置 consumes 属性，Spring 可以限制只有某些特定的 Content-Type 请求才能匹配到该方法。

#### (二)、用法

```java
@RestController
@RequestMapping("/api")
public class ApiController {

    @RequestMapping(path = "/test", consumes = {"application/json", "application/xml"})
    public String handleJsonOrXmlRequest(@RequestBody String data) {
        return "Received data: " + data;
    }
}
```



### 七、produces

#### (一)、作用

> produces 是 Spring MVC 中 @RequestMapping 注解的一个属性，用于指定方法能够生成并返回的媒体类型（Content-Type）。该属性可以确保该方法仅在客户端请求的 Accept 头部匹配指定的类型时才会被调用。
>
>  当客户端发起请求时，Spring 会根据请求的 Accept 头部，匹配能够生成对应响应内容类型的方法。produces 用来限制方法仅能处理某些特定的响应类型。
>
> 

#### (二)、用法

```java
@RestController
@RequestMapping("/api")
public class ApiController {

    @RequestMapping(path = "/test", produces = {"application/json", "application/xml"})
    public String handleJsonOrXmlResponse() {
        return "{\"message\":\"Hello, World!\"}";
    }
}

// 解释: 该方法可以返回 application/json 或 application/xml 类型的数据，具体返回哪种类型取决于客户端的 Accept 请求头。
```

