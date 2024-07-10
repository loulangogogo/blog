# 关于parallelStream的线程安全

## 一、概述

&emsp;&emsp;做过java开发的程序猿基本上都会遇到 **线程安全** 这个问题，绝大部份的原因都是因为多个线程对同一个共享变量进行了修改操作。

> 关于为什么多线程操作共享变量会导致线程安全问题，可以去了解一下 ”顺序性一致性、可见性、原子性、有序性“

解决线程安全问题常用的方法如下：

1. 加锁（synchronized或者一些分布式锁）
2. 使用线程安全的变量
3. 使用java的关键字（volatile、 final 关键字）

***注：其它更好的方式，请知道的兄弟不吝赐教。***

&emsp;&emsp;现在回归到主题部分，**parallelStream** 是在 java8 之后我们常用的方法，它是一个多线程的操作，所以会涉及到一些线程安全的问题【本人就是因为没有注意到这哥们是多线程操作导致了线程安全问题的发生】。



## 二、案例

### (一)、parallelStream线程不安全案例

```java
package io.github.loulangogogo.test01;

import org.junit.Before;
import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

/*********************************************************
 ** 线程安全
 ** <br><br>
 ** Date: Created in 2024/6/20 16:26
 ** @author loulan
 ** @version 0.0.0
 *********************************************************/
public class ThreadSafe {

    private List<Integer> intList;

    @Before
    public void before() {
        intList = new ArrayList<>();
        for (int i = 0; i < 1000; i++) {
            intList.add(i);
        }
    }

    /**
     * 将已经存在的list的数据，通过parallelStream转换存放到另外的一个共享list变量里面，看看结果是否一样
     * @author     :loulan
     * */
    @Test
    public void test01() {
        // 共享变量list
        List<Integer> list_parallelStream = new ArrayList<>();
        
        // 多线程操作
        intList.parallelStream().forEach(o -> list_parallelStream.add(o));

        // 打印数据集合的大小
        System.out.println("intList的大小 = " + intList.size());                           // 1000
        System.out.println("list_parallelStream的大小 = " + list_parallelStream.size());   // 996  每次都有可能不一样
    }
}

```

&emsp;&emsp;通过上面的类我们可以看到 intList 集合里面有 1000 个数字，但是通过 parallelStream 多线程添加之后发现 list_parallelStream 中的数据个数只有 996 个（这个数字是不确定的），明显丢失了一部分的数据。这个就是线程安全导致的问题

&emsp;&emsp;那么如何解决这个问题，下面通过案例一个一个测试：

### (二)、使用线程安全的共享变量

```java
package io.github.loulangogogo.test01;

import org.junit.Before;
import org.junit.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.Vector;

/*********************************************************
 ** 线程安全
 ** <br><br>
 ** Date: Created in 2024/6/20 16:26
 ** @author loulan
 ** @version 0.0.0
 *********************************************************/
public class ThreadSafe {

    private List<Integer> intList;

    @Before
    public void before() {
        intList = new ArrayList<>();
        for (int i = 0; i < 1000; i++) {
            intList.add(i);
        }
    }

    /**
     * 将已经存在的list的数据，通过parallelStream转换存放到另外的一个共享list变量里面，看看结果是否一样
     * @author     :loulan
     * */
    @Test
    public void test01() {
        // 共享变量list
        List<Integer> list_parallelStream = new Vector<>();
        
        // 多线程操作
        intList.parallelStream().forEach(o -> list_parallelStream.add(o));

        // 打印数据集合的大小
        System.out.println("intList的大小 = " + intList.size());                           // 1000
        System.out.println("list_parallelStream的大小 = " + list_parallelStream.size());   // 1000
    }
}

```

&emsp;&emsp;在这个案例中我们使用 Vector 代替了 ArrayList 作为共享变量，Vector 是一个线程安全的变量，所以最后的结果数据量对比是正确的。

### (三)、加锁

```java
package io.github.loulangogogo.test01;

import org.junit.Before;
import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

/*********************************************************
 ** 线程安全
 ** <br><br>
 ** Date: Created in 2024/6/20 16:26
 ** @author loulan
 ** @version 0.0.0
 *********************************************************/
public class ThreadSafe {

    private List<Integer> intList;

    @Before
    public void before() {
        intList = new ArrayList<>();
        for (int i = 0; i < 1000; i++) {
            intList.add(i);
        }
    }

    /**
     * 将已经存在的list的数据，通过parallelStream转换存放到另外的一个共享list变量里面，看看结果是否一样
     * @author     :loulan
     * */
    @Test
    public void test01() {
        // 共享变量list
        List<Integer> list_parallelStream = new ArrayList<>();

        // 多线程操作
        intList.parallelStream().forEach(
                (o) -> {
                    // 加锁
                    synchronized ("test") {list_parallelStream.add(o);}
                }
        );

        // 打印数据集合的大小
        System.out.println("intList的大小 = " + intList.size());                           // 1000
        System.out.println("list_parallelStream的大小 = " + list_parallelStream.size());   // 1000
    }
}

```

&emsp;&emsp;在改案例中通过在 parallelStream 进行多线程操作的方法上加上了 synchronized 的锁。通过这种方式得到的结果也是正确的。

## 三、最后

&emsp;&emsp;在实际的开发过程中，我们在使用修改共享资源的时候应该考虑一下多线程的情况下，该方法是否会对数据造成影响。然后更具实际情况采用适当的方法进行线程安全的处理。
