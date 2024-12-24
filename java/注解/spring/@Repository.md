# @Repository

## 概述

- @Repository 是 Spring Framework 中的注解，用于标记一个类为数据访问层（DAO）的组件。它继承自 @Component，因此也被纳入 Spring 的组件扫描机制中。使用 @Repository 的类通常用于与数据库交互，例如执行 CRUD 操作。



## 组合注解

- [@Component](./@Component.md)



## 用法

```java
@Repository
public class UserRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public User findById(Long id) {
        String sql = "SELECT * FROM users WHERE id = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{id}, new BeanPropertyRowMapper<>(User.class));
    }
}
```



## 属性

### 一、value

> **[@Component](./@Component.md) ==> value**

