/**
 * @file        一款简易实用的日期时间操作函数！
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

    // 原型
    easydateCreate.prototype = {

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
         * 返回Date的毫秒级快照
         * @return {Number}
         */
        valueOf: function() {
            return this.date.getTime();
        },


        /**
         * 返回Date的字符串表示
         * @return {String}
         */
        toString: function() {
            return this.format();
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
    };


    // 将原生Date的相关方法拷贝到原型
    (function(){

        var getProps = ['getFullYear', 'getMonth', 'getDate', 'getDay', 'getHours', 'getMinutes', 'getSeconds', 'getMilliseconds'],
            setProps = ['setFullYear', 'setMonth', 'setDate', 'setHours', 'setMinutes', 'setSeconds', 'setMilliseconds'],
            i, len;

        // 原生获取日期时间的信息部分
        // getMonth()月份值从1~12
        for(i = 0, len = getProps.length; i < len; i++) {
            (function(name){
                easydateCreate.prototype[name] = function() {
                    return this.date[name]() + (name === 'getMonth' ? 1 : 0);
                };
            })(getProps[i]);
        }

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
     * 判断一个日期字符串、日期对象是否是有效的日期时间
     * @param  {String|Date}  dateStr 需要判断的日期
     * @return {Boolean}
     */
    easydate.isValid = function(dateStr) {
        var oDate = createDate(dateStr || '');
        return !isNaN(oDate.getFullYear());
    };


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
        // 日期对象
        else if(dateStr && Object.prototype.toString.call(new Date()).toLowerCase() === "[object date]") {
            oDate = new Date(dateStr.getTime());  // 新建实例，避免对原对象进行覆盖
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