# @Resource

## 概述

@Resource 是 Java 标准中的注解，属于 JSR 250 规范，由 Java EE 提供，主要用于依赖注入。与 Spring 特有的 @Autowired 不同，@Resource 是一种更通用的注解，可以在 Java EE 和 Spring 中使用。Spring 对其也提供了支持。



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

    @Resource(name = "customUserRepository")
    private UserRepository userRepository; // 注入名为 "customUserRepository" 的 Bean。
}
```



## 属性

### 一、 name

#### (一)、作用

> 如果指定了 name 属性，Spring 将使用该属性的值作为 Bean 的名称来匹配容器中的 Bean，进行依赖注入。

#### (二)、用法

```java
@Component
public class UserService {

    @Resource(name = "customUserRepository")
    private UserRepository userRepository; // 注入名为 "customUserRepository" 的 Bean。
}
```



### 二、type

#### (一)、作用

> 当注入的依赖有多个候选 Bean 时，使用 type 属性可以显式声明希望注入的具体类型。

#### (二)、用法

```java
@Resource(type = CustomUserRepository.class)
private UserRepository userRepository; // 强制注入 CustomUserRepository 类型的 Bean。
```



### 三、authenticationType

#### (一)、作用

> 控制认证逻辑的使用方式，明确认证是在容器级别（如 Servlet 容器）管理，还是通过应用程序逻辑实现。
>
> 1. CONTAINER:
>
> - 使用容器（如 Tomcat、Jetty 等）的认证机制。
>
> - 适用于依赖容器安全配置的场景。
>
> 2. APPLICATION:
>
> - 使用自定义认证逻辑，由应用程序控制。
> - 适用于应用需要精细化管理认证逻辑（例如自定义 JWT 验证）的场景。

#### (二)、用法

```java
@Resource(authenticationType = AuthenticationType.APPLICATION)
private UserRepository userRepository;
```



### 四、shareable

#### (一)、作用

指定注入的资源是否可以在多个上下文或线程中共享。

- 如果设置为 true，资源是可共享的，例如数据库连接池中的连接。
- 如果设置为 false，则表示该资源为专用资源，仅供当前上下文或线程使用。

#### (二)、用法

```java
@Resource(name = "jdbc/MyDataSource", shareable = true)
private DataSource dataSource;
```



### 五、description

#### (一)、作用

> - 可选的文本描述。
> - 通常是文档或注释用途，与运行时行为无直接关系。

#### (二)、用法

```java
@Resource(name = "jdbc/MyDataSource", description = "主数据库数据源")
private DataSource dataSource;
```



### 六、mappedName

#### (一)、作用

> 属性主要用于指定与目标资源关联的全局 JNDI 名称。这个属性在 Java EE 或 Jakarta EE 的上下文中使用更为常见，用于通过逻辑名称将资源映射到容器中定义的实际资源。

#### (二)、用法

```java
@Resource(mappedName = "java:global/env/jdbc/MyDataSource")
private DataSource dataSource;
```



### 七、lookup

#### (一)、作用

> @Resource 注解中的 lookup() 属性用于指定资源的 JNDI 查找名称。JNDI（Java Naming and Directory Interface）是一种 Java 技术，它允许程序通过名称访问各种资源，例如数据库连接、消息队列等。在使用 @Resource 注解时，如果想指定一个特定的 JNDI 名称，可以通过 lookup() 属性来实现。

#### (二)、用法

```java
@Resource(lookup = "java:global/myDataSource")
private DataSource dataSource;
```

