# @GlobalTransactional

## 概述

- **标识全局事务**：将方法标记为全局事务的起点，Seata 会为该事务生成全局事务 ID（XID）并管理其生命周期。
- **事务控制**：支持设置事务的超时时间（`timeoutMills`）和事务名称（`name`），方便日志记录和调试。
- **异常回滚**：默认情况下，当方法抛出运行时异常（`RuntimeException`）或错误（`Error`）时，事务会自动回滚。也可以通过 `rollbackFor` 或 `noRollbackFor` 自定义回滚规则。

## 用法

```java
@Service
public class OrderService {
    @GlobalTransactional(timeoutMills = 60000, name = "create-order")
    public void createOrder(Order order) {
        // 业务逻辑代码
    }
}
```

## 属性

### 一、timeoutMills

#### (一)、作用

> 用于设置全局事务的超时时间。它的作用是指定一个事务在多少毫秒内必须完成，如果超过这个时间仍未完成，事务将自动回滚，以避免长时间占用资源。

#### (二)、用法

```java
@GlobalTransactional(timeoutMills = 60000, name = "create-order")
public void createOrder(Order order) {
    // 业务逻辑代码
}
```

### 一、name

#### (一)、作用

> 用于为全局事务指定一个名称。这个名称主要用于日志记录和调试，帮助开发者更好地识别和跟踪事务的执行情况。

#### (二)、用法

```java
@GlobalTransactional(name = "create-order", timeoutMills = 60000)
public void createOrder(Order order) {
    // 业务逻辑代码
}
```

### 二、rollbackFor

> **[@Transactional](./@Transactional.md) ==> rollbackFor**



### 三、rollbackForClassName

> **[@Transactional](./@Transactional.md) ==> rollbackForClassName**



### 四、noRollbackFor

> **[@Transactional](./@Transactional.md) ==> noRollbackFor**



### 五、noRollbackForClassName

> **[@Transactional](./@Transactional.md) ==> noRollbackForClassName**



### 六、propagation

> **[@Transactional](./@Transactional.md) ==> propagation**



### 七、lockRetryInterval

#### (一)、作用

> `lockRetryInterval` 是 Seata 框架中与全局锁重试机制相关的一个属性，用于指定在获取全局锁失败后，重试获取锁的时间间隔。它的单位是毫秒（ms）。
>
> 在分布式事务中，多个事务可能同时竞争同一资源的全局锁。如果某个事务在第一次尝试获取锁时失败，Seata 会根据 `lockRetryInterval` 设置的时间间隔，定期重试获取锁，直到成功或达到最大重试次数。

#### (二)、用法

```java
@GlobalLock(lockRetryInterval = 100, lockRetryTimes = 10)
public void updateResource(Resource resource) {
    // 业务逻辑代码
}
```

### 八、lockRetryTimes

#### (一)、作用

> `lockRetryTimes` 是 Seata 框架中用于配置全局锁重试次数的属性。当多个事务竞争同一资源的全局锁时，如果某个事务在第一次尝试获取锁时失败，Seata 会根据 `lockRetryTimes` 设置的值进行多次重试，直到成功获取锁或达到最大重试次数。
>
> 在分布式事务中，多个事务可能同时竞争同一资源的全局锁。如果某个事务在第一次尝试获取锁时失败，Seata 会根据 `lockRetryTimes` 和 `lockRetryInterval`（重试间隔）进行重试，直到成功或达到最大重试次数。

#### (二)、用法

```java
@GlobalLock(lockRetryTimes = 30, lockRetryInterval = 10)
public void updateResource(Resource resource) {
    // 业务逻辑代码
}
```

### 九、lockStrategyMode

#### (一)、作用

> 用于配置全局锁的获取策略。它支持两种模式：**乐观锁模式（Optimistic）**和**悲观锁模式（Pessimistic）**，用户可以根据业务场景选择合适的锁策略。
>
> - 乐观锁模式（Optimistic）
>
>   - 在获取全局锁时，先尝试插入锁记录，如果插入成功则获取锁，否则认为锁已被其他事务持有。
>
>   - 适用于锁竞争较少的场景，性能较高。
>
> - 悲观锁模式（Pessimistic）
>
>   - 在获取全局锁时，先查询锁记录是否存在，如果不存在则插入锁记录，否则认为锁已被其他事务持有。
>
>   - 适用于锁竞争较多的场景，确保锁的获取过程更加严格。

#### (二)、用法

```java
@GlobalTransactional(lockStrategyMode = LockStrategyMode.PESSIMISTIC)
public void updateResource(Resource resource) {
    // 业务逻辑代码
}
```



