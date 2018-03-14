# easydate.js

一款简易实用的日期时间操作函数！

## 使用easydate

### 使用`easydate`函数创建实例


```js

// 给定日期字符串
const edate = easydate('2018/03/17 16:08:32');

// 给定时间戳
const edate2 = easydate(1521274112000);

// 给定已有日期对象
const edate3 = easydate(new Date());

// 默认当前系统时间
const edate4 = easydate();

```

### 获取日期时间的信息部分

```js

// (Date) 日期对象
edate.date;

// (boolean) 判断日期时间的有效性
edate.isValid();

// (boolean) 判断是否是闰年
edate.isLeapYear();

// (number) 返回毫秒级快照
edate.valueOf();

// (number) 返回年份
edate.getFullYear();

// (number) 返回月份，月份值从1~12
edate.getMonth();

// (number) 返回当月的第几天
edate.getDate();

// (number) 返回当周的第几天，值从0~6表示周日~周六
edate.getDay();

// (number) 返回时钟
edate.getHours();

// (number) 返回分钟
edate.getMinutes();

// (number) 返回秒钟
edate.getSeconds();

// (number) 返回毫秒数
edate.getMilliseconds();

```

### 日期时间的格式化输出

```js

// 返回日期时间的字符串表示 '2018/03/17 16:08:32'
// 等同于.format()、.format('yyyy-MM-dd HH:mm:ss')
edate.toString();

// 格式化输出 '2018/03/17 16:08:32'
// 等同于.format('yyyy-MM-dd HH:mm:ss')
edate.format();

// 格式化输出 '18/3/17 16:8:32'
edate.format('yy-M-d H:m:s');

// 格式化输出 '2018/03/17 16:08:32'
edate.format('yyyy-MM-dd HH:mm:ss');

// 格式化输出 '2018年03月17日 下午 04:08:32'
edate.format('yyyy年MM月dd日 tt hh:mm:ss');

```

### 日期时间的计算

操作结果返回 `easydate` 实例本身，因此可以进行链式操作。

支持正负数，正数表示加上指定时间，负数表示减去指定时间。

```js

// 参照上面代码中edate的值：
// 2018/03/17 16:08:32

// 秒钟+1
// 2018/03/17 16:08:33
edate.calc('second', 1);  

// 分钟+1
// 2018/03/17 16:09:33
edate.calc('minute', 1);  

// 时钟+1
// 2018/03/17 17:09:33
edate.calc('hour', 1);  

// 天数+1
// 2018/03/18 17:09:33
edate.calc('day', 1);  

// 月份+1
// 2018/04/18 17:09:33
edate.calc('month', 1);  

// 年份+1
// 2019/04/18 17:09:33
edate.calc('year', 1);  

// 截取日期部分
// 2018/04/18 00:00:00
edate.toDatePart();

```

### 设置日期时间的指定部分

操作结果返回 `easydate` 实例本身，`setMonth()`中月份的值从 `1` ~ `12 。

```js

// 参照上面代码中edate的值：
// 2018/04/18 00:00:00

// 设置年份 2018/04/18 00:00:00
edate.setFullYear(2019);  

// 设置月份 2018/06/18 00:00:00
edate.edate.setMonth(6);  

// 设置当月的第几天 2018/06/25 00:00:00
edate.setDate(25);

// 设置时钟 2018/06/25 10:00:00
edate.setHours(10);

// 设置分钟 2018/06/25 10:32:00
edate.setMinutes(32);

// 设置秒钟 2018/06/25 10:32:58
edate.setSeconds(58);

// 设置毫秒 2018/06/25 10:32:58 100
edate.setMilliseconds(100);

```

### 链式操作


```js

// output: 2018/03/23 12:00:00
easydate('2018/03/17 16:08:32').toDatePart().calc('day', 6).calc('hour', 12).format();

```


### 静态方法


```js

// 判断日期时间的有效性
easydate.isValid();  // false
easydate.isValid('2018-03-28 xx:33:25');  // false
easydate.isValid('2018-03-28 18:33:25');  // true

// 判断是否为闰年
easydate.isLeapYear();  // false
easydate.isLeapYear(2018);  // false
easydate.isLeapYear(2020);  // true

```
