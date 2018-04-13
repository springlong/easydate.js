/**
 * @file        一款简易实用的JavaScript日期时间处理工具！
 * @version     1.0.0
 * @author      龙泉 <yangtuan2009@126.com>
 */
(function (root, factory) {

  if (typeof define === 'function' && define.amd) {
    // AMD module
    define(factory);
  }
  else if(typeof module !== "undefined" && module.exports) {
    // Node/CommonJS
    // Seajs build
    module.exports = factory();
  }
  else {
    // 浏览器全局模式
    root.easydate = factory();
  }

})(this, function () {

  /**
   * 日期对象处理的封装
   * @param  {Date|string|number} dateStr 日期对象|日期字符串|时间戳
   * @return {Object}
   */
  function easydate(dateStr) {
    return new easydateCreate(dateStr);
  }

  // 构造函数
  function easydateCreate(dateStr) {

    // easydate对象所表述的当前日期时间的Date类型对象
    this.date = createDate(dateStr);
  }

  // 构造函数-原型
  easydateCreate.prototype = {

    /**
     * 返回当前日期时间属于一年中的第几周，如果是无效日期则返回NaN。
     * @return {number}
     */
    getWeekth: function() {
      return easydate.getWeekth(this.date);
    },


    /**
     * 返回当前日期时间所处的当月有多少天，如果是无效日期则返回NaN。
     * @return {number}
     */
    getMonthDays: function() {
      return easydate.getMonthDays(this.date);
    },


    /**
     * 判断日期时间的有效性
     * @return {Boolean}
     */
    isValid: function() {
      return !isNaN(this.date.getFullYear());
    },


    /**
     * 判断是否是闰年
     * @return {Boolean}
     */
    isLeapYear: function() {
      return easydate.isLeapYear(this.date.getFullYear());
    },


    /**
     * 判断当前日期是否在目标日期之前
     * @param  {String|Date}  dateStr 需要判断的日期
     * @return {Boolean}
     */
    isBefore: function(dateStr) {
      return this.date.getTime() < createDate(dateStr || '').getTime();
    },


    /**
     * 判断当前日期是否在目标日期之后
     * @param  {String|Date}  dateStr 需要判断的日期
     * @return {Boolean}
     */
    isAfter: function(dateStr) {
      return this.date.getTime() > createDate(dateStr || '').getTime();
    },


    /**
     * 判断当前日期是否和目标日期一致
     * @param  {String|Date}  dateStr 需要判断的日期
     * @return {Boolean}
     */
    isSame: function(dateStr) {
      return this.date.getTime() === createDate(dateStr || '').getTime();
    },


    /**
     * 判断当前日期是否介于两个日期之间
     * @param  {String|Date}  dateStr1 需要判断的日期
     * @param  {String|Date}  dateStr2 需要判断的日期
     * @return {Boolean}
     */
    isBetween: function(dateStr1, dateStr2) {

      var thisTime = this.date.getTime(),
        timeStart = createDate(dateStr1 || '').getTime(),
        timeEnd = createDate(dateStr2 || '').getTime(),
        temp;

      if(timeStart > timeEnd) {
        temp = timeStart;
        timeStart = timeEnd;
        timeEnd = temp;
      }
      return thisTime >= timeStart && thisTime <= timeEnd;
    },


    /**
     * 计算当前日期时间与另一个日期时间的时间差，单位默认以“天”表示。
     * 如果其中一方为无效日期则返回NaN。
     * @param  {string|Date} dateStr 另一个日期时间
     * @param  {string} unit    时差的计量单位，默认为day。'second'-秒/'minute'-分/'hour'-时/'day'-天/'month'-月/'year'-年/'json'-按级别展示
     * @return {number|Object}
     */
    diff: function (dateStr, unit) {
      return easydate.diff(this.date, dateStr, unit);
    },


    /**
     * 日期时间格式化输出
     * @param  {string} formatStr 格式化字符串，y-年、M-月、d-日、H-时(24小时制)、h-时(12小时制)、m-分、s-秒、S-毫秒、tt-上下午
     * @return {string}
     */
    format: function(formatStr) {

      var oDate = this.date,
        fullYear = oDate.getFullYear(),
        year = (fullYear + '').substring(2),
        month = oDate.getMonth() + 1,
        day = oDate.getDate(),
        hours24 = oDate.getHours(),
        hours12 = hours24 > 12 ? hours24 - 12 : hours24,
        minutes = oDate.getMinutes(),
        seconds = oDate.getSeconds(),
        partObj = {
          'yyyy': fullYear,
          'yy': year,
          'MM': getDoubleNum(month),
          'M': month,
          'dd': getDoubleNum(day),
          'd': day,
          'HH': getDoubleNum(hours24),
          'H': hours24,
          'hh': getDoubleNum(hours12),
          'h': hours12,
          'mm': getDoubleNum(minutes),
          'm': minutes,
          'ss': getDoubleNum(seconds),
          's': seconds,
          'S': oDate.getMilliseconds(),
          'tt': hours24 > 12 ? '下午' : '上午',
        };

      // 默认格式
      if(typeof formatStr !== 'string' || formatStr === '') formatStr = 'yyyy/MM/dd HH:mm:ss';

      // 循环遍历替换
      for(var name in partObj) {
        if(partObj.hasOwnProperty(name)) {
          formatStr = formatStr.replace(new RegExp(name, 'g'), partObj[name]);
        }
      }

      // 返回格式化后的结果
      return formatStr;
    },


    /**
     * 按照指定时间部分加减日期
     * @param  {String} part 时间部分，'second'-秒/'minute'-分/'hour'-时/'day'-天/'month'-月/'year'-年
     * @param  {Number} num      需要变更的数量
     * @return {this}
     */
    calc: function(part, num) {

      var oDate = this.date,
        second = 1000,  // 1秒=1000毫秒
        minute = second * 60,  // 1分=60秒
        hour = minute * 60,  // 1小时=60分
        day = hour * 24,  // 1天=24小时
        timeJSON = {
          'second': second,
          'minute': minute,
          'hour': hour,
          'day': day
        },
        dateValue = oDate.getTime(),
        result;

      // 自动处理2月份只有28天、29天的问题
      if(part === 'month') {
        result = oDate.setMonth(oDate.getMonth() + num);
      }
      // 自动处理闰年366天，非闰年365天的问题
      else if(part === 'year') {
        result = oDate.setYear(oDate.getFullYear() + num);
      }
      // 其他时间部分直接加上对应的毫秒数即可
      else{
        result = dateValue + (timeJSON[part] || 0) * num;
      }

      this.date = new Date(result);

      return this;
    },


    /**
     * 截取日期时间的日期部分，去掉时间部分
     * @return {this}
     */
    toDatePart: function() {
      var oDate = this.date;
      this.date = new Date(oDate.getFullYear() + '/' + (oDate.getMonth() + 1) + '/' + oDate.getDate());
      return this;
    },


    /**
     * 根据当前日期时间克隆出一个新的对象实例
     * @return {Object}
     */
    clone: function() {
      return easydate(this.date.getTime());
    }
  };


  // 将原生Date的相关方法拷贝到构造函数的原型之中
  (function(){

    var getProps = ['getFullYear', 'getDate', 'getDay', 'getHours', 'getMinutes', 'getSeconds', 'getMilliseconds', 'valueOf', 'toString', 'toTimeString', 'toDateString', 'toGMTString', 'toUTCString', 'toLocaleString', 'toLocaleTimeString', 'toLocaleDateString'],
      setProps = ['setFullYear', 'setMonth', 'setDate', 'setHours', 'setMinutes', 'setSeconds', 'setMilliseconds'],
      i, len;

    // 原生获取日期时间的信息部分
    for(i = 0, len = getProps.length; i < len; i++) {
      (function(name){
        easydateCreate.prototype[name] = function() {
          return this.date[name]();
        };
      })(getProps[i]);
    }

    // getMonth()月份值从1~12
    easydateCreate.prototype['getMonth'] = function() {
      return this.date['getMonth']() + 1;
    };

    // 原生设置日期时间的信息部分
    // setMonth()月份值从1~12
    for(i = 0, len = setProps.length; i < len; i++) {
      (function(name){
        easydateCreate.prototype[name] = function(num) {
          this.date[name](name === 'setMonth' ? num - 1 : num);
          return this;
        };
      })(setProps[i]);
    }
  })();


  /**
   * 判断一个年份是否是闰年
   * @param  {Number}  year
   * @return {Boolean}
   */
  easydate.isLeapYear = function(year) {

    year = Number(year);

    // 判断是否为闰年（普通年能被4整除且不能被100整除的年份是闰年，世纪年能被400整除的年份是闰年）
    return isNaN(year) ? false : (year % 400 === 0 || year % 4 === 0 && year % 100 !== 0);
  };


  /**
   * 判断一个日期字符串、日期对象是否是有效的日期时间
   * @param  {String|Date}  dateStr 需要判断的日期
   * @return {Boolean}
   */
  easydate.isValid = function(dateStr) {
    var oDate = createDate(dateStr || '');
    return !isNaN(oDate.getFullYear());
  };


  /**
   * 返回一个日期时间处于一年中的第几周。
   * 如果是无效日期则返回NaN。
   * @param  {String|Date} dateStr 需要判断的日期
   * @return {Number}
   */
  easydate.getWeekth = function (dateStr) {

    var oDate = createDate(dateStr || ''),
      year = oDate.getFullYear();

    if(isNaN(year)) return NaN;

    var first = new Date(year, 0, 1),
      firstWeekday = first.getDay(),
      dateDiff = Math.floor((oDate.getTime() - first.getTime()) / (1000*60*60*24)),  // 与1月1日相差的天数
      weekth = Math.floor((dateDiff + firstWeekday) / 7) + 1;  // 1月1日所处的周为一年的第一周，通过与1月1日相差的天数和1月1日所处的星期几相加再除以1周的基数7即可获得当前日期位于一年的第几周

    return weekth;
  };


  /**
   * 返回一个日期时间所处的当月有多少天，如果是无效日期则返回NaN。
   * @param  {String|Date} dateStr 需要判断的日期
   * @return {Number}
   */
  easydate.getMonthDays = function (dateStr) {

    var oDate = createDate(dateStr || ''),
      month = oDate.getMonth() + 1;

    // new Date(2014, 12, 0).getDate()的返回值是2014年11月的最后一天
    return isNaN(month) ? NaN : new Date(oDate.getFullYear(), month, 0).getDate();
  };


  /**
   * 计算两个日期之间的时间差，单位默认以“天”表示。
   * 如果其中一方为无效日期则返回NaN。
   * @param  {String|Date} startDate 起始日期时间
   * @param  {String|Date} endDate 结束日期时间
   * @param  {String} unit 时差的计量单位，默认为day。'second'-秒/'minute'-分/'hour'-时/'day'-天/'month'-月/'year'-年/'json'-按级别展示
   * @return {Number}
   */
  easydate.diff = function(startDate, endDate, unit) {

    var startTemp, endTemp, startTime, endTime, startChange, endChange,
      diffTime, diffJSON, diffMonth, diffYear, result, temp, name,
      second = 1000,  // 1秒=1000毫秒
      minute = second * 60,  // 1分=60秒
      hour = minute * 60,  // 1小时=60分
      day = hour * 24,  // 1天=24小时
      timeJSON = {
        'second': second,
        'minute': minute,
        'hour': hour,
        'day': day
      },
      isReturnJSON = unit === 'json';

    // 确保startDate在endDate之前
    startDate = createDate(startDate || '');
    endDate = createDate(endDate || '');

    if(startDate > endDate) {
      temp = startDate;
      startDate = endDate;
      endDate = temp;
    }

    startTime = startDate.getTime();
    endTime = endDate.getTime();
    diffTime = Math.abs(endTime - startTime);

    // 如果其中一方为无效日期则返回NaN
    if(isNaN(startTime) || isNaN(endTime)) return NaN;

    // 如果两个日期时间相同则返回0
    if(startTime === endTime) return 0;

    // 计算天、时、分、秒等单位的时间差，其他单位按照天计算时间差
    result = Math.floor(diffTime / (timeJSON[unit] || day));

    // 按级别展示
    if(isReturnJSON) {
      diffJSON = {
        year: null,
        month: null,
        day: Math.floor(diffTime / timeJSON['hour'] / 24), // 天数
        hour: Math.floor(diffTime / timeJSON['hour'] % 24), // 小时
        minite: Math.floor(diffTime / timeJSON['minute'] % 60), // 分钟
        second: Math.floor(diffTime / timeJSON['second'] % 60), // 秒钟
        maxUnit: '',  // 最大有效单位
      };

      // 判断最大有效单位
      if(diffJSON.day !== 0){
        diffJSON.maxUnit = 'day';
      }else if(diffJSON.hour !== 0){
        diffJSON.maxUnit = 'hour';
      }else if(diffJSON.minite !== 0){
        diffJSON.maxUnit = 'minite';
      }else{
        diffJSON.maxUnit = 'second';
      }
    }

    // 计算月份时间差
    if('json|month|year'.indexOf(unit) >= 0) {

      // 将起始日期和结束日期都调整到月初第一天
      (startTemp = new Date(startDate.getTime())).setDate(1);
      (endTemp = new Date(endDate.getTime())).setDate(1);

      // 分别计算各自调整的天数
      startChange = (startTime - startTemp.getTime())/day;
      endChange = (endTime - endTemp.getTime())/day;

      // 计算相差的月数
      diffMonth = (endTemp.getFullYear()*12 + endTemp.getMonth()) - (startTemp.getFullYear()*12 + startTemp.getMonth());

      // 如果起始日期的天数大于结束日期的天数，则需要将最终计算的月份减-
      if(startChange > endChange) {
        diffMonth--;
      }

      // 处理剩余天数
      if(isReturnJSON) {
        diffJSON['day'] = Math.floor((endDate.getTime() - startDate.setMonth(startDate.getMonth() + diffMonth))/day);
        if(diffMonth > 0) diffJSON.maxUnit = 'month';
      }else {
        result = diffMonth;
      }
    }

    // 计算年份时间差
    if('json|year'.indexOf(unit) >= 0) {

      diffYear = Math.floor(diffMonth / 12);

      if(isReturnJSON) {
        diffJSON['year'] = diffYear;
        diffJSON['month'] = diffMonth % 12;
        if(diffYear > 0) diffJSON.maxUnit = 'year';
      }else {
        result = diffYear;
      }
    }

    return isReturnJSON ? diffJSON : result;
  };


  /**
   * 根据传递参数的不同构建一个Date类型的对象
   * @return {Date}
   */
  function createDate(dateStr) {

    var oDate;

    // 日期字符串
    if(typeof dateStr === 'string') {
      oDate = new Date(dateStr.replace(/-/g, '/'));  // IE8不支持 2016-01-02 这种字符串转换
    }
    // 时间戳
    else if(typeof dateStr === 'number') {
      oDate = new Date(dateStr);
    }
    // Date对象实例
    else if(dateStr && Object.prototype.toString.call(dateStr).toLowerCase() === "[object date]") {
      oDate = new Date(dateStr.getTime());  // 新建实例，避免对原对象进行覆盖
    }
    // easydate对象实例
    else if(dateStr instanceof easydateCreate) {
      oDate = new Date(dateStr.valueOf());
    }
    // 缺省参数，默认为当前时间
    else {
      oDate = new Date();
    }

    return oDate;
  }


  /**
   * 返回两位数字，不足前置补零
   * @param  {Number} num 数字
   * @return {String}
   */
  function getDoubleNum(num) {
    return num < 10 ? '0' + num : num;
  }


  // 返回easydate
  return easydate;
});
