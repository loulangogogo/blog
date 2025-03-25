# @Transactional

## 概述

`@Transactional` 注解用于标记一个方法或类，表示该方法或类中的操作需要在事务中执行。如果操作成功，事务将被提交；如果操作失败（例如抛出异常），事务将被回滚。



## 用法

```java
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.READ_COMMITTED, timeout = 30, rollbackFor = {RuntimeException.class})
    public void updateUser(User user) {
        userRepository.save(user);
    }
}
```



## 属性

### 一、value（transactionManager）

#### (一)、作用

> 用于指定使用的事务管理器的名称。在 Spring 中，事务管理器（`PlatformTransactionManager`）负责管理事务的创建、提交和回滚。默认情况下，Spring 会自动使用名为 `transactionManager` 的事务管理器。如果配置了多个事务管理器，可以通过 `value` 属性明确指定使用哪一个。

#### (二)、用法

```java
// 指定要使用的事务管理器
@Transactional(value = "transactionManager1")
public void methodForDataSource1() {
    // 使用 dataSource1 的事务
}
```

### 二、transactionManager（value）

#### (一)、作用

> 用于指定使用的事务管理器的名称。在 Spring 中，事务管理器（`PlatformTransactionManager`）负责管理事务的创建、提交和回滚。默认情况下，Spring 会自动使用名为 `transactionManager` 的事务管理器。如果配置了多个事务管理器，可以通过 `transactionManager` 属性明确指定使用哪一个。

#### (二)、用法

```java
@Transactional(transactionManager = "customTransactionManager")
public void someMethod() {
    // 业务逻辑
}
```

### 三、label

#### (一)、作用

> 用于为事务添加标签，以便在事务管理中进行更细粒度的控制或标识。标签是一个字符串数组，可以用来标记事务的特定用途或类别，帮助开发者在复杂的应用场景中更好地管理和调试事务。
>
> 说白了就是没有什么太大的作用，就是一个标签的作用

#### (二)、用法

```java
@Transactional(label = {"finance", "high-priority"})
public void performFinancialTransaction() {
    // 财务事务逻辑
}
```

### 四、propagation

#### (一)、作用

> 用于配置事务的传播行为，即当一个事务方法被另一个事务方法调用时，事务应该如何传播。
>
> | **传播类型**      | **描述**                                                     | **适用场景**                                                 |
> | ----------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
> | **REQUIRED**      | 如果当前存在事务，则加入该事务；如果当前没有事务，则创建一个新的事务。 | 常规数据写入操作，确保操作在事务中执行。                     |
> | **SUPPORTS**      | 如果当前存在事务，则加入该事务；如果当前没有事务，则以非事务方式执行。 | 查询为主的可选事务操作，不需要强制事务。                     |
> | **MANDATORY**     | 如果当前存在事务，则加入该事务；如果当前没有事务，则抛出异常。 | 必须保证在事务中的核心业务，防止被非事务上下文调用。         |
> | **REQUIRES_NEW**  | 总是创建一个新的事务，如果当前存在事务，则挂起当前事务。     | 日志记录、审计等独立操作，确保操作不受外部事务影响。         |
> | **NOT_SUPPORTED** | 以非事务方式执行操作，如果当前存在事务，则挂起当前事务。     | 非核心业务的统计操作，不需要事务支持。                       |
> | **NEVER**         | 以非事务方式执行操作，如果当前存在事务，则抛出异常。         | 严格非事务环境限制，确保方法不在事务中执行。                 |
> | **NESTED**        | 如果当前存在事务，则在嵌套事务中执行；如果当前没有事务，则创建一个新的事务。 | 部分操作需要独立回滚的业务场景，嵌套事务可以部分回滚而不影响外部事务。 |

#### (二)、用法

```java
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Transactional(propagation = Propagation.REQUIRED)
    public void createUser(User user) {
        userRepository.save(user);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void logUserCreation(User user) {
        // 日志记录逻辑
    }
}
```

### 五、isolation

#### (一)、作用

> 用于配置事务的隔离级别，控制多个事务并发执行时的行为。
>
> | **隔离级别**         | **描述**                                     | **脏读** | **不可重复读** | **幻读** | **适用场景**                                                 |
> | -------------------- | -------------------------------------------- | -------- | -------------- | -------- | ------------------------------------------------------------ |
> | **DEFAULT**          | 使用数据库的默认隔离级别。                   | 可能     | 可能           | 可能     | 大多数通用场景，依赖数据库默认行为。                         |
> | **READ_UNCOMMITTED** | 允许读取未提交的数据变更。                   | 是       | 是             | 是       | 对数据一致性要求不高的场景，如日志记录或统计数据读取。       |
> | **READ_COMMITTED**   | 只能读取已提交的数据变更。                   | 否       | 是             | 是       | 大多数业务场景，如电商系统中的订单查询或用户信息查询。       |
> | **REPEATABLE_READ**  | 确保在同一事务中多次读取同一数据时结果一致。 | 否       | 否             | 是       | 对数据一致性要求较高的场景，如银行系统中的账户余额查询。     |
> | **SERIALIZABLE**     | 最高隔离级别，确保事务串行执行，完全隔离。   | 否       | 否             | 否       | 对数据一致性要求极高的场景，如金融系统中的资金清算或库存管理。 |

#### (二)、用法

```java
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Transactional(isolation = Isolation.READ_COMMITTED)
    public void updateUser(User user) {
        userRepository.save(user);
    }
}
```

### 六、timeout

#### (一)、作用

> 用于设置事务的超时时间。当事务执行时间超过设定的超时时间时，事务会自动回滚，以避免长时间占用数据库资源。

#### (二)、用法

```java
@Transactional(timeout = 5) // 设置超时时间为5秒
public void myTransactionalMethod() {
    // 执行业务逻辑
}
```

### 七、timeoutString

> 字符串形式的超时时间，同上 timeout



### 八、readOnly

#### (一)、作用

> 在 Spring 事务管理中用于标识一个事务是否为只读事务。通过将事务标记为只读，可以提示数据库驱动程序和数据库系统，该事务不会对数据进行修改，从而允许数据库进行一些特定的优化，例如减少锁的使用和日志记录，以提高性能。
>
> - **`readOnly`**：布尔值，默认为 `false`。当设置为 `true` 时，表示该事务为只读事务。

#### (二)、用法

```java
@Transactional(readOnly = true)
public User getUserById(Long id) {
    return userRepository.findById(id).orElse(null);
}
```

### 九、rollbackFor

#### (一)、作用

>  是 Spring 事务管理中的一个重要属性，用于指定在发生特定异常时触发事务回滚。默认情况下，Spring 事务仅在遇到未捕获的运行时异常（`RuntimeException`）或错误（`Error`）时回滚，而受检异常（`Checked Exception`，如 `Exception` 的直接子类）不会触发回滚。通过 `rollbackFor` 属性，开发者可以自定义哪些异常会导致事务回滚。

#### (二)、用法

```java
@Transactional(rollbackFor = Exception.class) // 使所有异常都触发回滚
public void myMethod() {
    // 业务逻辑
}
```

### 十、rollbackForClassName

> - **`rollbackForClassName`**：一个字符串数组，用于指定触发事务回滚的异常类名。这些类名必须是 `Throwable` 或其子类的全限定名。
>
> 作用同上。



### 十一、noRollbackFor

> 和 `rollback` 正好相反，用来指定哪些异常可以不用回滚。



### 十二、noRollbackForClassName

> 和`rollbackForClassName`正好相反，用来指定哪些异常可以不用回滚。
