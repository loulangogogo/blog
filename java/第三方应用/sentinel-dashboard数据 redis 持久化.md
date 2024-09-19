# 概述

&emsp;&emsp;随着微服务的流行，服务和服务之间的稳定性变得越来越重要。Sentinel 是面向分布式、多语言异构化服务架构的流量治理组件，主要以流量为切入点，从流量路由、流量控制、流量整形、熔断降级、系统自适应过载保护、热点流量防护等多个维度来帮助开发者保障微服务的稳定性。

&emsp;&emsp;[官网](https://sentinelguard.io/zh-cn/docs/introduction.html)提供的 sentinel 采用的是直接内存的方式进行资源规则存储的，也就是说只要重新启动数据就回丢失。但是官方也是给出了一些持久化的方案 nacos 等。

&emsp;&emsp;**本博客介绍说明的是 redis 持久化方案使用。**

# sentinel-dashboard 控制台部署

#### 1. sentinel-dashboard 的 redis 版本的 docker 镜像下载

> docker pull osmiling/sentinel-dashboard:1.8.7-redis
>
> [dockerhub](https://hub.docker.com/r/osmiling/sentinel-dashboard)进行下载镜像

#### 2. 启动 docker 容器

需要先自己启动一个 redis 服务，镜像倒是提供了 单体、哨兵、集群 等模式的配置方式，具体镜像使用介绍。

```yaml
version: '3.1'

services:
  sentinel-dashboard:
    image: osmiling/sentinel-dashboard:1.8.8-redis
    container_name: sentinel-dashboard
    logging:
      driver: json-file
      options:
        max-size: "100m"
        max-file: "5"
    restart: always
    ports:
      - "8619:8619"
    environment:
      SERVER_PORT: 8619
      REDIS_HOST: 127.0.0.1
      REDIS_PORT: 6379
      REDIS_PASSWORD: 123456
      REDIS_DATABASE: 15
    volumes:
        - /etc/localtime:/etc/localtime #将外边时间直接挂载到容器内部，权限只读
        - ./logs:/root/logs
```

**按照镜像介绍的方式就可以正常启动。**

# 启动一个springboot 项目

在springboot 项目中，添加如下操作。

#### 1. 添加持久化的 redis 包和 sentinel 客户端包

```xml
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-sentinel</artifactId>
</dependency>
<dependency>
    <groupId>com.alibaba.csp</groupId>
    <artifactId>sentinel-datasource-redis</artifactId>
</dependency>
```

**看镜像说明中 1.8.7 以下的版本存在系统规则无法正常使用的问题，我以前测试的1.8.5确实存在这个问题，所以 sentinel-core 版本要 1.8.7 及以上。**

#### 2. 添加 application.yml 的配置

```yaml
spring:
  cloud:
    # alibaba哨兵
    sentinel:
      enabled: true
      # 默认情况下 sentinel 会在客户端首次调用的时候进行初始化，开始向控制台发送心跳包，取消sentinel控制台懒加载功
      eager: true
      transport:
        # 默认7890端口，假如被占用会自动7890开始依次+1扫描，直至找到未被占用的端口
        port: 7890
        # 配置Sentinel dashboard地址
        dashboard: 127.0.0.1:8619
      datasource:
        ds1:
          redis:
            host: 127.0.0.1
            database: 15
            port: 6379
            password: 123456
            master-id: master
            rule-key: 'Sentinel:Config:${spring.application.name}:system'
            channel: 'Sentinel:Channel:${spring.application.name}:system'
            rule-type: system

        ds2:
          redis:
            host: 127.0.0.1
            database: 15
            port: 6379
            password: 123456
            master-id: master
            rule-key: 'Sentinel:Config:${spring.application.name}:flow'
            channel: 'Sentinel:Channel:${spring.application.name}:flow'
            rule-type: flow
        ds3:
          redis:
            host: 127.0.0.1
            database: 15
            port: 6379
            password: 123456
            master-id: master
            rule-key: 'Sentinel:Config:${spring.application.name}:degrade'
            channel: 'Sentinel:Channel:${spring.application.name}:degrade'
            rule-type: degrade
        ds4:
          redis:
            host: 127.0.0.1
            database: 15
            port: 6379
            password: 123456
            master-id: master
            rule-key: 'Sentinel:Config:${spring.application.name}:param-flow'
            channel: 'Sentinel:Channel:${spring.application.name}:param-flow'
            rule-type: param-flow
        ds5:
          redis:
            host: 127.0.0.1
            database: 15
            port: 6379
            password: 123456
            master-id: master
            rule-key: 'Sentinel:Config:${spring.application.name}:authority'
            channel: 'Sentinel:Channel:${spring.application.name}:authority'
            rule-type: authority
```

**这么多的数据源都指向的是同一个 redis ，应该也是可以指向不同的 redis 的，但是要和 sentienl-dashboard 配置的一样才行。**

配置这么多的数据源主要是因为规则和通道 (规则类型rule-type) 对应 到 sentinel-dashboard 的每一个限流方式。

> **重要的是，规则健 rule-key 和 通道channel 要与镜像介绍的格式进行配置**
>
> "Sentinel:Config:" + 应用名称(注册到sentinel-dashboard的应用名称) + 规则枚举(`com.alibaba.cloud.sentinel.datasource.RuleType`)
>
> "Sentinel:Channel:" + 应用名称(注册到sentinel-dashboard的应用名称) + 规则枚举(`com.alibaba.cloud.sentinel.datasource.RuleType`)

#### 3. 启动应用

配置完成之后就可以启动应用了。打开 http://127.0.0.1:8619 就可以看到注册进行来的服务应用。

> 注意：
>
> 1. 规则异常信息提示可以通过实现 `com.alibaba.csp.sentinel.adapter.spring.webmvc.callback.BlockExceptionHandler`来修改。
> 2. 一些规则需要填写 来源应用、流控应用 等，该名称是实现`com.alibaba.csp.sentinel.adapter.spring.webmvc.callback.RequestOriginParser`来返回应用名称的。通过这个也可以轻松限制指定来源请求的流量。

```java
package org.loulan.application.dragon.common.config.sentinel;

import com.alibaba.csp.sentinel.adapter.spring.webmvc.callback.BlockExceptionHandler;
import com.alibaba.csp.sentinel.slots.block.BlockException;
import io.github.loulangogogo.water.json.JsonTool;
import org.loulan.application.dragon.common.core.config.status.ResponseStatus;
import org.loulan.application.dragon.common.core.response.BaseResponse;
import org.loulan.application.dragon.common.core.response.R;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;

/*********************************************************
 ** sentinel异常处理器
 ** <br><br>
 ** Date: Created in 2022/11/17 11:33
 ** @author loulan
 ** @version 0.0.0
 *********************************************************/
@Component
public class SentinellHandler implements BlockExceptionHandler {
    /**
     * 当sentinel规则限制一些请求发生异常就会进入到整个处理器
     * 在 Sentinel 中所有流控降级相关的异常都是异常类 BlockException 的子类
     * 流控异常：FlowException
     * 熔断降级异常：DegradeException
     * 系统保护异常：SystemBlockException
     * 热点参数限流异常：ParamFlowException,这个的异常好像需要单独使用竹节@SentinelResources来写
     * @param
     * @return
     * @exception
     * @author     :loulan
     * */
    @Override
    public void handle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, BlockException e) throws Exception {
        httpServletResponse.setStatus(ResponseStatus.OK);
        httpServletResponse.setCharacterEncoding("UTF-8");
        httpServletResponse.setContentType("application/json");
        PrintWriter writer = httpServletResponse.getWriter();
        BaseResponse body = R.fail("请求频繁，请稍后重试。");
        writer.write(JsonTool.toJson(body));
        writer.close();
    }
}

```

```java
package org.loulan.application.dragon.common.config.sentinel;

import com.alibaba.csp.sentinel.adapter.spring.webmvc.callback.RequestOriginParser;
import com.alibaba.csp.sentinel.annotation.SentinelResource;
import io.github.loulangogogo.water.tool.StrTool;

import javax.servlet.http.HttpServletRequest;

/*********************************************************
 ** sentinl设置配置规则的【来源应用】【流控应用】等就是这个数据，可以根据请求里面的某个请求头来进行判断，或者请求参数判断。
 **
 ** @author loulan
 ** @since 17
 *********************************************************/
public class SentinelOriginParser implements RequestOriginParser {
    @Override
    public String parseOrigin(HttpServletRequest httpServletRequest) {
        // 这里使用请求头的origin字段来判断，如果这个返回值和配置应用一样才能起效果
        // 也可以使用token里面的值来进行判断
        String origin = httpServletRequest.getHeader("origin");

        // 如果是空定义一个应用名来代替，因为空被认为是有效的
        return StrTool.isEmpty(origin)?"empty-origin":origin;
    }
}

```



# 执行流程说明

&emsp;&emsp;当我们配置规则之后就可以在redis中看到对应配置的规则数据。服务重启会自动从 redis 中加载规则数据。**下面介绍一下这个规则的设置流程。**

1. 控制台 打开 系统规则 页面的时候，控制台会发送 http 请求向 springboot 服务获取规则数据进行显示。也就是说控制台页面显示的规则数据不是直接从 redis 中获取的，而是向服务这边请求获取的。
2. springboot 项目启动的时候会自动从 redis 中加载规则数据到内存中。
3. 当 sentinel-dashboard 控制添加、修改、删除规则数据的时候，会直接操作 redis 中的数据，并通过 redis 的发布订阅通道来发布该规则。springboot 项目服务通过 redis 的发布订阅通道获取到数据的变更信息，然后修改内存中的数据（项目服务并不会直接修改 redis 中的数据）。
4. 添加、修改、删除完成之后，sentinel-dashboard 控制台会发送 http 请求获取数据来展示变更完成的规则数据。

> **redis 中的规则数据是 sentinel-dashboard 控制台修改的，但是 redis 中规则数据的读取是项目服务来读取的。**

