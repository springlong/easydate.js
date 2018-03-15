# easydate.js

一款简易实用的JavaScript日期时间处理工具！

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

### 条件判断

对于日期比较类方法的参数类型，可以是日期字符串、时间戳、Date对象实例、easydate对象实例。

```js

// (boolean) 判断日期时间的有效性
edate.isValid();

// (boolean) 判断是否是闰年
edate.isLeapYear();

//(boolean)  判断当前日期是否在目标日期之前
edate.isBefore('2018/03/18');

// (boolean) 判断当前日期是否在目标日期之后
edate.isAfter('2018/03/16');

// (boolean) 判断当前日期是否和目标日期一致
edate.isSame('2018/03/17 16:08:32');

// (boolean) 判断当前日期是否介于两个日期之间
edate.isBetween('2018/03/18', '2018/03/16');


```

### 获取日期时间的信息部分

```js

// (Date) 日期对象
edate.date;

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

// (number) 返回当前日期时间属于一年中的第几周
edate.getWeekth();

// (number) 返回当前日期时间所处的当月有多少天
edate.getMonthDays();

```

### 日期时间的格式化输出

格式化字符码：

1. `yyyy` - 四位数字的年份
1. `yy` - 两位数字的年份
1. `MM` - 两位数字的月份
1. `M` - 月份
1. `dd` - 两位数字的天数
1. `d` - 天数
1. `HH` - 两位数字的24小时制时钟
1. `H` - 24小时制时钟
1. `hh `- 两位数字的12小时制时钟
1. `h `- 12小时制时钟
1. `mm` - 两位数字的分钟
1. `m` - 分钟
1. `ss` - 两位数字的秒钟
1. `s` - 秒钟
1. `tt` - 上午/下午
1. `S` - 毫秒


```js

// 格式化输出 '2018/03/17 16:08:32'
// 等同于.format('yyyy-MM-dd HH:mm:ss')
edate.format();

// 格式化输出 '18/3/17 16:8:32'
edate.format('yy-M-d H:m:s');

// 格式化输出 '2018/03/17 16:08:32'
edate.format('yyyy-MM-dd HH:mm:ss');

// 格式化输出 '2018年03月17日 下午 04:08:32'
edate.format('yyyy年MM月dd日 tt hh:mm:ss');

// 返回日期时间的字符串表示
// 等同于.format()、.format('yyyy-MM-dd HH:mm:ss')
edate.toString();

// 返回本地格式的日期时间字符串
edate.toLocaleString();

// 返回本地格式的日期字符串
edate.toLocaleDateString();

// 返回本地格式的时间字符串
edate.toLocaleTimeString();

```

### 日期时间的计算

操作结果返回 `easydate` 实例本身，因此可以进行链式操作。

支持正负数，正数表示加上指定时间，负数表示减去指定时间。

```js

// edate的参照值：
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

// 克隆一份副本
// 2018/04/18 00:00:00
edate.clone();

```

### 设置日期时间的指定部分

操作结果返回 `easydate` 实例本身，`setMonth()`中月份的值从 `1` ~ `12` 。

```js

// edate的参照值：
// 2018/04/18 00:00:00

// 设置年份 2018/04/18 00:00:00
edate.setFullYear(2019);  

// 设置月份 2018/06/18 00:00:00
edate.setMonth(6);  

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


### 计算时间差

对于日期比较类方法的参数类型，可以是日期字符串、时间戳、Date对象实例、easydate对象实例。

```js

// edate的参照值：
// 2018-03-23 12:00:00

edate.diff('2018-03-24 16:30:55', 'json');   // {year: 0, month: 0, day: 1, hour: 4, minite: 30, second: 55}
edate.diff('2018-03-24 16:30:55', 'year');   // 0 (相差不足1年)
edate.diff('2018-03-24 16:30:55', 'month');  // 0 (相差不足1个月)
edate.diff('2018-03-24 16:30:55', 'day');    // 1 (相差1天)
edate.diff('2018-03-24 16:30:55', 'hour');   // 28 (相差28个小时)
edate.diff('2018-03-24 16:30:55', 'minute'); // 1710 (相差1710分钟)
edate.diff('2018-03-24 16:30:55', 'second'); // 102655 (相差102655秒)
edate.diff('2018-03-24 16:30:55');           // 1 (相差1天)

```


### 链式操作


```js

// output: 2018/03/23 12:00:00
easydate('2018/03/17 16:08:32').toDatePart().calc('day', 6).calc('hour', 12).format();

```


### 静态方法

对于日期比较类方法的 `dateStr` 参数的类型，可以是日期字符串、时间戳、Date对象实例、easydate对象实例。

```js

// easydate.isValid(dateStr)
// 判断日期时间的有效性
// 返回值类型: boolean
easydate.isValid();  // false
easydate.isValid('2018-03-28 xx:33:25');  // false
easydate.isValid('2018-03-28 18:33:25');  // true

// easydate.isLeapYear(year)
// 判断是否为闰年
// 返回值类型: boolean
easydate.isLeapYear();  // false
easydate.isLeapYear(2018);  // false
easydate.isLeapYear(2020);  // true

// easydate.getWeekth(dateStr)
// 返回一个日期时间处于一年中的第几周
// 返回值类型：number
// 如果是无效日期则返回NaN
easydate.getWeekth('2018-01-01');  // 1
easydate.getWeekth('2018-12-29');  // 52
easydate.getWeekth('2018-12-31');  // 53

// easydate.getMonthDays(dateStr)
// 返回一个日期时间所处的当月有多少天
// 返回值类型：number
// 如果是无效日期则返回NaN
easydate.getMonthDays('2018-01-01');  // 31
easydate.getMonthDays('2018-02-01');  // 28
easydate.getMonthDays('2018-03-01');  // 31
easydate.getMonthDays('2018-04-01');  // 30

// easydate.diff (startDate, endDate, unit)
// 计算两个日期之间的时间差，单位默认以“天”表示
easydate.diff('2018-01-01', false);  // NaN
easydate.diff('2018-01-01', '2018-01-01');  // 0（相差0天）
easydate.diff('2018-03-14', '2018-03-30');  // 16 （相差16天）
easydate.diff('2018-01-31 10:30:55', '2019-02-03 12:50:56', 'json');   //  {year: 0, month: 0, day: 25, hour: 2, minite: 20, second: 1, maxUnit: 'day'}
easydate.diff('2018-01-31 10:30:55', '2019-02-03 12:50:56', 'json');   //  {year: 1, month: 0, day: 3, hour: 2, minite: 20, second: 1, maxUnit: 'year'}
easydate.diff('2018-01-31 10:30:55', '2019-02-03 12:50:56', 'year');   // 1 （相差1年）
easydate.diff('2018-01-31 10:30:55', '2019-02-03 12:50:56', 'month');  // 12 （相差12个月）
easydate.diff('2018-01-31 10:30:55', '2019-02-03 12:50:56', 'day');    // 368 （相差368天）
easydate.diff('2018-01-31 10:30:55', '2019-02-03 12:50:56', 'hour');   // 8834 （相差8834小时）
easydate.diff('2018-01-31 10:30:55', '2019-02-03 12:50:56', 'minute'); // 530060 （相差530060分钟）
easydate.diff('2018-01-31 10:30:55', '2019-02-03 12:50:56', 'second'); // 31803601 （相差31803601秒钟）

```
