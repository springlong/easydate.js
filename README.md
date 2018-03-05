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

console.log('返回日期对象:', edate.datetime);
console.log('返回毫秒级快照:', edate.valueOf());  // 1521274112000
console.log('返回日期的字符串表示:', edate.toString());  // '2018/03/17 16:08:32'
console.log('格式化输出:', edate.format());  // '2018/03/17 16:08:32'
console.log('格式化输出:', edate.format('yy-M-d H:m:s'));  // '18/3/17 16:8:32'
console.log('格式化输出:', edate.format('yyyy-MM-dd HH:mm:ss'));  // '2018/03/17 16:08:32'
console.log('格式化输出:', edate.format('yyyy年MM月dd日 tt hh:mm:ss'));  // '2018年03月17日 下午 04:08:32'

```

### 日期时间的计算

```js

console.log('秒钟+1:', edate.calc('second', 1));
console.log('分钟+1:', edate.calc('minute', 1));
console.log('时钟+1:', edate.calc('hour', 1));
console.log('天数+1:', edate.calc('day', 1));
console.log('月份+1:', edate.calc('month', 1));
console.log('年份+1:', edate.calc('year', 1));
console.log('截取日期部分', edate.toDatePart());

```

### 链式操作


```js

console.log('链式操作:', easyDate('2018/03/17 16:08:32').toDatePart().calc('day', 6).calc('hour', 12).format());

```
