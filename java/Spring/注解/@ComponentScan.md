# @ComponentScan

## 概述

@ComponentScan 是 Spring Framework 和 Spring Boot 中常用的注解，用于指定要扫描的包路径，从而自动检测和注册标注了特定注解（例如 @Component、@Controller、@Service、@Repository 等）的类到 Spring 容器中。



## 用法

```java
@Configuration
@ComponentScan(
    basePackages = "com.example",
    includeFilters = @ComponentScan.Filter(type = FilterType.ANNOTATION, classes = Service.class),
    excludeFilters = @ComponentScan.Filter(type = FilterType.REGEX, pattern = "com\\.example\\.legacy\\..*"),
    lazyInit = true
)
public class AppConfig {
}
```





## 属性

### 一、basePackages

#### (一)、作用

> 指定组件扫描的基础包路径，Spring 会扫描这些包及其子包中的所有组件（标注了 @Component, @Service, @Repository, @Controller 等的类），并将它们注册为 Bean。

#### (二)、用法

```java
@ComponentScan(basePackages = {"com.example.myapp", "com.example.other"})
public class MyApp {
    public static void main(String[] args) {
        SpringApplication.run(MyApp.class, args);
    }
}
```



### 二、basePackageClasses

#### (一)、作用

> 通过指定一个或多个类，确定其所在的包路径作为组件扫描的基础包。Spring 会扫描这些包及其子包中的组件（标注了 @Component, @Service, @Repository, @Controller 等的类）。

#### (二)、用法

```java
@ComponentScan(basePackageClasses = {MyService.class, MyRepository.class})
public class MyApp {
    public static void main(String[] args) {
        SpringApplication.run(MyApp.class, args);
    }
}
```



### 三、nameGenerator

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

@ComponentScan(nameGenerator = CustomBeanNameGenerator.class)
public class MyApp {
    public static void main(String[] args) {
        SpringApplication.run(MyApp.class, args);
    }
}
```



### 四、resourcePattern

#### (一)、作用

> 限定扫描哪些文件或资源。例如，默认情况下只扫描 .class 文件，忽略其他文件（如 .xml 或 .properties）。

#### (二)、用法

```java
@ComponentScan(resourcePattern = "**/*MyService.class")
public class AppConfig {
}


@ComponentScan(resourcePattern = "**/*.xml")
public class AppConfig {
}
```



### 五、useDefaultFilters

#### (一)、作用

useDefaultFilters 决定是否启用默认的扫描规则，主要包括以下内容：

1. **启用默认的注解**:

   默认情况下，Spring 会扫描并注册以下注解标记的组件：

   - @Component
   - @Repository
   - @Service
   - @Controller
   - 以及它们的派生注解（如 @RestController 等）。

2. **禁用默认规则**:

   如果设置为 false，Spring 不会使用默认的扫描规则，必须手动配置自定义的 includeFilters 或 excludeFilters，以明确指定扫描哪些组件。

####  (二)、用法

```java
@ComponentScan(
    basePackages = "com.example",
    useDefaultFilters = false,
    includeFilters = @ComponentScan.Filter(type = FilterType.ANNOTATION, classes = MyCustomAnnotation.class)
)
public class AppConfig {
}
```



###  六、includeFilters，excludeFilters

`@ComponentScan` 是 Spring 中用于指定组件扫描路径的注解。通过 `includeFilters` 和 `excludeFilters` 属性，可以自定义扫描逻辑，选择性地包含或排除特定的类或组件。

#### (一)、includeFilters

- **类型**: `Filter[]`
- **默认值**: 空数组 `{}`
- **作用**: 指定额外需要包含的类或组件，即使它们不符合默认过滤规则。
- **常用场景**:
  - 默认过滤规则被禁用（`useDefaultFilters = false`）后，通过此属性显式声明需要扫描的类或组件。

#### (二)、excludeFilters

- **类型**: `Filter[]`
- **默认值**: 空数组 `{}`
- **作用**: 指定需要排除的类或组件，即使它们符合默认或自定义的过滤规则。
- **常用场景**:
  - 需要避免扫描特定的类（如测试类、特定的注解等）。



| Filter 属性 | 说明                                            |
| ----------- | ----------------------------------------------- |
| `type`      | 指定过滤器的类型，支持以下值：                  |
|             | - `FilterType.ANNOTATION`：按注解过滤           |
|             | - `FilterType.ASSIGNABLE_TYPE`：按具体类过滤    |
|             | - `FilterType.ASPECTJ`：使用 AspectJ 表达式过滤 |
|             | - `FilterType.REGEX`：使用正则表达式过滤        |
|             | - `FilterType.CUSTOM`：自定义过滤逻辑           |
| `classes`   | 与 `type` 配合使用，指定匹配的注解或类等信息    |
| `pattern`   | 与 `FilterType.REGEX` 配合，指定正则表达式      |

#### (三)、用法

```java
@ComponentScan(
    basePackages = "com.example",
    excludeFilters = @ComponentScan.Filter(type = FilterType.REGEX, pattern = ".*Test$")
)
public class AppConfig {
}
```



### 七、lazyInit

#### (一)、作用

 决定是否对扫描到的 Spring 组件启用 **延迟加载**。

- 当 lazyInit 设置为 true 时，所有扫描到的组件默认会以 **懒加载** 的方式初始化，只有在实际使用时（例如被依赖或被调用）才会实例化。
- 当 lazyInit 设置为 false 时（默认行为），组件在应用程序上下文加载时就会立刻实例化。

#### (二)、用法

```java
@ComponentScan(
    basePackages = "com.example",
    lazyInit = true
)
public class AppConfig {
}
```

