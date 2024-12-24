# @Autowired

## 概述

@Autowired 是 Spring 框架中的一个注解，主要用于实现 **自动注入**（Dependency Injection, DI）。它通过类型（byType）的方式在容器中寻找合适的 Bean 并注入到被标注的字段、构造函数或方法中。

1. **依赖搜索**

Spring 容器会根据注入点的类型（类或接口）在 BeanFactory 中查找与其匹配的 Bean。

2. **多候选 Bean**

如果找到多个符合条件的 Bean，会抛出 NoUniqueBeanDefinitionException，除非：

- 使用 @Qualifier 指定具体 Bean。
- 将其中一个 Bean 设置为 @Primary。

3. **无法找到 Bean**

如果没有找到合适的 Bean：

- 默认会抛出 NoSuchBeanDefinitionException。
- 可通过设置 @Autowired(required = false) 让注入变为非必需。



| 特性                   | `@Autowired`                                             | `@Resource`                                                |
| ---------------------- | -------------------------------------------------------- | ---------------------------------------------------------- |
| **来源**               | Spring Framework（Spring 专有）                          | Java EE 标准（JSR-250）                                    |
| **默认注入方式**       | 按类型注入                                               | 按名称注入（默认使用字段名）                               |
| **支持的注入方式**     | 字段注入、构造器注入、方法注入                           | 字段注入（默认按名称）、方法注入（使用 `name` 属性）       |
| **是否支持按名称注入** | 支持（通过 `@Qualifier` 注解指定名称）                   | 支持（通过 `name` 属性指定 bean 名称）                     |
| **是否需要指定名称**   | 不需要（默认按类型注入）                                 | 需要（默认按名称注入，如果 `name` 属性为空则按字段名注入） |
| **使用场景**           | 用于 Spring 应用中，按类型注入依赖，常用于普通 bean 注入 | 用于明确按名称注入资源或外部服务，常用于 JNDI 注入场景     |
| **是否支持可选注入**   | 支持（通过 `required = false` 允许可选注入）             | 不支持（没有类似 `required` 的属性，注入失败会抛出异常）   |
| **适用领域**           | Spring 项目中的普通依赖注入                              | Java EE 项目中，尤其是 JNDI 或资源相关的注入               |
| **兼容性**             | 与 Spring 配套使用，通常不兼容 Java EE                   | 可用于 Java EE 项目，适用于外部资源的注入                  |



## 用法

```java
@Component
public class UserService {
    @Autowired
    private UserRepository userRepository;
}
```





## 属性

### 一、required

#### (一)、作用

> - **默认值**：true ：表示注入的依赖是必需的，Spring 容器在启动时必须找到对应的 Bean。如果找不到 Bean，会抛出异常：NoSuchBeanDefinitionException。
> - **设置为** false：如果将 required 设置为 false，即使对应的 Bean 不存在，Spring 容器也不会抛出异常，而是将注入点的值置为 null。

#### (二)、用法

```java
@Component
public class UserService {

    @Autowired(required = false)
    private UserRepository userRepository; // Bean 不存在时为 null。
}
```

