# @ConfigurationProperties

## 概述

@ConfigurationProperties 是 Spring 框架中用于将外部配置文件中的属性值与 Java 对象绑定的注解。它提供了一种方便的方法，将 application.yml 或 application.properties 文件中的配置信息映射到 Java 对象中，以便在代码中以类型安全的方式使用这些配置。



## 用法

```java
@Component
@ConfigurationProperties(prefix = "server")
public class ServerConfig {
    private int port;
    private String address;

    // Getter 和 Setter
    public int getPort() {
        return port;
    }
    public void setPort(int port) {
        this.port = port;
    }
    public String getAddress() {
        return address;
    }
    public void setAddress(String address) {
        this.address = address;
    }
}
```





## 属性

### 一、prefix

#### (一)、作用

> prefix 是 @ConfigurationProperties 注解中的一个属性，用于指定配置文件中与该配置类绑定的属性的前缀。
>
> 指定配置文件中对应配置项的命名空间。

#### (二)、用法

```java
@Component
@ConfigurationProperties(prefix = "database")
public class DatabaseConfig {
    private String url;
    private String username;
    private String password;

    // Getter 和 Setter
}
```



### 二、ignoreInvalidFields

#### (一)、作用

> ignoreInvalidFields 是 @ConfigurationProperties 注解中的一个属性，用于控制是否忽略绑定时遇到的无效字段。
>
> - 如果设置为 true，Spring 在绑定配置时会忽略那些目标类中不存在的字段，避免抛出异常。
> - 如果设置为 false（默认值），当配置文件中存在无效字段（无法映射到目标类属性）时，会抛出异常，提示配置有误。
> - **ignoreInvalidFields 则用于目标类中存在无法绑定的字段（例如类型不匹配）**

#### (二)、用法

```java
@Component
@ConfigurationProperties(prefix = "app")
public class AppConfig {
    private String name;
    private int port;

    // Getter 和 Setter
}



app:
  name: MyApp
  port: 8080
  debug: true
    
	•	如果 ignoreInvalidFields 为 false（默认），Spring 会抛出异常，因为 debug 字段在 AppConfig 中没有对应的属性。
	•	如果 ignoreInvalidFields 为 true，Spring 会忽略 debug 字段，并正常加载 name 和 port。
```



### 三、ignoreUnknownFields

#### (一)、作用

> ignoreUnknownFields 是 @ConfigurationProperties 注解的一个属性，用于控制绑定配置时是否忽略配置文件中无法映射到目标类的字段。
>
> - 如果设置为 true，Spring 会忽略配置文件中无法映射到目标类的字段，不抛出异常。
> - 如果设置为 false，当配置文件中存在未知字段时，Spring 会抛出异常，阻止应用启动。
>
> **ignoreUnknownFields 用于配置文件中存在目标类不识别的字段。**

#### (二)、用法

```java
@Component
@ConfigurationProperties(prefix = "app")
public class AppConfig {
    private String name;
    private int port;

    // Getter 和 Setter
}

app:
  name: MyApp
  port: 8080
  extra: ignoredField
    
	•	ignoreUnknownFields = true（默认）
Spring 会忽略 extra 字段，正常加载 name 和 port。
	•	ignoreUnknownFields = false
Spring 会抛出异常，提示配置文件中存在无法映射到 AppConfig 的字段。
```