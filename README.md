# easydate.js

一款简易实用的日期时间操作函数！

## 使用easyDate

### 使用`easyDate`函数创建实例


```js

// 给定日期字符串
const edate = easyDate('2018/03/17 16:08:32');

// 给定时间戳
const edate2 = easyDate(1521274112000);

// 给定已有日期对象
const edate3 = easyDate(new Date());

// 默认当前系统时间
const edate4 = easyDate();

```

### 打印日期时间

```js

// 返回日期对象
edate.datetime;

// 返回毫秒级快照 1521274112000
edate.valueOf();

// 返回日期的字符串表示 '2018/03/17 16:08:32'
edate.toString();

// 格式化输出 '2018/03/17 16:08:32'
edate.format();

// 格式化输出 '18/3/17 16:8:32'
edate.format('yy-M-d H:m:s');

// 格式化输出 '2018/03/17 16:08:32'
edate.format('yyyy-MM-dd HH:mm:ss');

// 格式化输出 '2018年03月17日 下午 04:08:32'
edate.format('yyyy年MM月dd日 tt hh:mm:ss');

```

### 日期时间的计算

```js

// 秒钟+1 Sat Mar 17 2018 16:08:33 GMT+0800
edate.calc('second', 1);

// 分钟+1 Sat Mar 17 2018 16:09:33 GMT+0800
edate.calc('minute', 1);

// 时钟+1 Sat Mar 17 2018 17:09:33 GMT+0800
edate.calc('hour', 1);

// 天数+1 Sun Mar 18 2018 17:09:33 GMT+0800
edate.calc('day', 1);

// 月份+1 Wed Apr 18 2018 17:09:33 GMT+0800
edate.calc('month', 1);

// 年份+1 Thu Apr 18 2019 17:09:33 GMT+0800
edate.calc('year', 1);

// 截取日期部分 Thu Apr 18 2019 00:00:00 GMT+0800
edate.toDatePart();   

```

### 链式操作


```js

// output: 2018/03/23 12:00:00
easyDate('2018/03/17 16:08:32').toDatePart().calc('day', 6).calc('hour', 12).format();

```
