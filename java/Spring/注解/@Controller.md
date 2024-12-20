# @Controller

## 概述

@Controller 是 Spring Framework 中用于标记一个类为控制器组件的注解，主要用于定义处理 HTTP 请求的控制逻辑。在基于 MVC（Model-View-Controller）模式的 Web 应用中，@Controller 是用于接收和处理用户请求并返回响应的关键组成部分。

**主要特点**

1. **MVC 模式的核心**

@Controller 是 Spring MVC 模式的控制器，负责处理 HTTP 请求并将模型数据传递到视图层。

2. **处理请求**

配合 [@RequestMapping ](./@RequestMapping.md)等注解，可以映射特定的 URL 请求到对应的方法。

3. **视图解析**

方法通常返回视图的名称或数据模型，以便渲染为 HTML 或其他响应类型。

4. **无返回值**

方法可以直接通过 HttpServletResponse 输出内容，而无需返回视图。



## 组合注解

[@Component](./@Component.md)



## 用法

```java
@Controller
@RequestMapping("/users")
public class UserController {

    @GetMapping("/{id}")
    public String getUser(@PathVariable Long id, Model model) {
        User user = userService.findUserById(id);
        model.addAttribute("user", user);
        return "userDetail";
    }
}
```





## 属性

### 一、value

> **[@Component](./@Component.md) ==> value**
