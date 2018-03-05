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
        root.easyDate = factory();
    }

})(this, function () {

    /**
     * 日期对象处理的封装
     * @param  {Date|string|number} dateStr 日期对象|日期字符串|时间戳
     * @return {Object}
     */
    function easyDate(dateStr) {
        return new easyDateCreate(dateStr);
    }

    // 构造函数
    function easyDateCreate(dateStr) {

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

        // datetime: 始终表示easyDate对象所表述的当前日期时间 
        this.datetime = oDate;
    }

    // 原型
    easyDateCreate.prototype = {

        /**
         * 返回Date的毫秒级快照
         * @return {Number}
         */
        valueOf: function() {
            return this.datetime.getTime();
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

            var oDate = this.datetime,
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

            var oDate = this.datetime,
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

            this.datetime = new Date(result);

            return this;
        },


        /**
         * 截取日期时间的日期部分，去掉时间部分
         * @return {this}
         */
        toDatePart: function() {
            var oDate = this.datetime;
            this.datetime = new Date(oDate.getFullYear() + '/' + (oDate.getMonth() + 1) + '/' + oDate.getDate());
            return this;
        },
    };


    /**
     * 返回两位数字，不足前置补零
     * @param  {Number} num 数字
     * @return {String}
     */
    function getDoubleNum(num) {
        return num < 10 ? '0' + num : num;
    }


    // 返回easyDate
    return easyDate;
});