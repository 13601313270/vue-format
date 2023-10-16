(function () {
    'use strict';

    function getNearFenshu(num, wei) {
        let numList = num.toString().split('.');
        num = parseFloat('0.' + numList[1]);
        let nearHalf = [0, 1];

        for (let fenmu = 1; fenmu < Math.pow(10, wei); fenmu++) {
            let begin = 1;
            let end = fenmu - 1;
            let half = 0;
            while (true) {
                half = begin + parseInt((end - begin) / 2);
                if(half / fenmu === num) {
                    begin = half;
                    end = half;
                    break;
                }
                if(half / fenmu > num) {
                    end = half;
                } else {
                    begin = half;
                }
                if(end - begin <= 1) {
                    break;
                }
            }
            if(half / fenmu === num) {
                nearHalf = [half, fenmu];
                break;
            }
            if(begin / fenmu === num) {
                nearHalf = [begin, fenmu];
                break;
            }
            if(end / fenmu === num) {
                nearHalf = [end, fenmu];
                break;
            }
            if(wei === 1 || (wei === 2 && fenmu >= 10) || (wei === 3 && fenmu >= 100)) {
                if(Math.abs(end / fenmu - num) < Math.abs(nearHalf[0] / nearHalf[1] - num)) {
                    nearHalf = [end, fenmu];
                }
            }
        }
        nearHalf[0] = parseInt(nearHalf[0]) + numList[0] * nearHalf[1];
        return nearHalf;
    }

    function replaceDate (creatVal, value) {
        if (value.toString().match(/(\d{10})/) || value.toString().match(/(\d{13})/)) {
            let date = new Date();
            if (value.toString().match(/^(\d{10}$)/)) {
                date.setTime(parseInt(value) * 1000);
            } else {
                date.setTime(parseInt(value));
            }
            let rep = [
                [
                    'YYYY',
                    (date) => {
                        return date.getFullYear()
                    }
                ],
                [
                    'yyyy',
                    (date) => {
                        return date.getFullYear()
                    }
                ],
                [
                    'YY',
                    (date) => {
                        return date.getFullYear().toString().slice(2);
                    }
                ],
                [
                    'yy',
                    (date) => {
                        return date.getFullYear().toString().slice(2);
                    }
                ],
                [
                    '上午/下午',
                    (date) => {
                        let hour = date.getHours();
                        if (hour >= 12) {
                            return '下午';
                        } else {
                            return '上午';
                        }
                    }
                ],
                [
                    'AM/PM',
                    (date) => {
                        let hour = date.getHours();
                        if (hour >= 12) {
                            return 'PM';
                        } else {
                            return 'AM';
                        }
                    }
                ],
                [
                    'MMM',
                    (date) => {
                        let month = date.getMonth() + 1;
                        return ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][month]
                    }
                ],
                [
                    'MM',
                    (date) => {
                        let month = date.getMonth() + 1;
                        return (month < 10 ? '0' : '') + month;
                    }
                ],
                [
                    'M',
                    (date) => {
                        let month = date.getMonth() + 1;
                        return month.toString();
                    }
                ],
                [
                    'DDDD',
                    (date) => {
                        const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
                        return '星期' + weekDays[date.getDay()]
                    }
                ],
                [
                    'DDD',
                    (date) => {
                        const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
                        return '周' + weekDays[date.getDay()]
                    }
                ],
                [
                    'DD',
                    (date) => {
                        let day = date.getDate();
                        return (day < 10 ? '0' : '') + day;
                    }
                ],
                [
                    'D',
                    (date) => {
                        let day = date.getDate();
                        return day.toString();
                    }
                ],
                [
                    'd',
                    (date) => {
                        let day = date.getDate();
                        return day.toString();
                    }
                ],
                [
                    'HH',
                    (date) => {
                        let hour = date.getHours();
                        return (hour < 10 ? '0' : '') + hour;
                    }
                ],
                [
                    'hh',
                    (date) => {
                        let hour = date.getHours();
                        return (hour < 10 ? '0' : '') + hour;
                    }
                ],
                [
                    'H',
                    (date) => {
                        let hour = date.getHours();
                        return hour.toString();
                    }
                ],
                [
                    'h',
                    (date) => {
                        let hour = date.getHours();
                        return hour.toString();
                    }
                ],
                [
                    'mm',
                    (date) => {
                        let minute = date.getMinutes();
                        return (minute < 10 ? '0' : '') + minute;
                    }
                ],
                [
                    'm',
                    (date) => {
                        let minute = date.getMinutes();
                        return minute.toString();
                    }
                ],
                [
                    'ss',
                    (date) => {
                        let second = date.getSeconds();
                        return (second < 10 ? '0' : '') + second;
                    }
                ],
                [
                    's',
                    (date) => {
                        let second = date.getSeconds();
                        return second.toString();
                    }
                ],
            ];
            const allKeys = rep.map(v => v[0]);
            let step = 0;
            let lastResult = '';
            for (let i = 0; i < creatVal.length; i = step) {
                let word;
                if (allKeys.includes(creatVal.slice(i, i + 5))) {
                    word = creatVal.slice(i, i + 5);
                } else if (allKeys.includes(creatVal.slice(i, i + 4))) {
                    word = creatVal.slice(i, i + 4);
                } else if (allKeys.includes(creatVal.slice(i, i + 3))) {
                    word = creatVal.slice(i, i + 3);
                } else if (allKeys.includes(creatVal.slice(i, i + 2))) {
                    word = creatVal.slice(i, i + 2);
                } else if (allKeys.includes(creatVal.slice(i, i + 1))) {
                    word = creatVal.slice(i, i + 1);
                }
                if (word) {
                    step = i + word.length;
                    const relation = rep.find(v => v[0] === word);
                    if (relation) {
                        lastResult += relation[1](date);
                    }
                } else {
                    step = i + 1;
                    lastResult += creatVal[i];
                }
            }
            return lastResult;
        }
        return creatVal.toString();
    }

    function format(code, value) {
        let oldValue = value;
        let matchFunc = [
            function(value) {
                return parseFloat(value).toString() === value.toString() && parseFloat(value) > 0;
            },
            function(value) {
                return parseFloat(value).toString() === value.toString() && parseFloat(value) < 0;
            },
            function(value) {
                return value === 0 || value === '0' || value === '-0';
            },
            function() {
                return true;
            }
        ];
        let usedCalc = false;
        code = code.split(';');
        if(code.length < 4 && code[0].match(/^\[(>|<|=|>=|<=|<>)\d+\]/)) {
            usedCalc = true;
            // 使用了条件表达式
            matchFunc = [
                function(value) {
                    let temp = code[0].match(/^\[(>|<|=|>=|<=|<>)(\d+)\]/);
                    if(temp[1] === '=') {
                        temp[1] = '==';
                    }
                    switch (temp[1]) {
                        case '>':
                            return parseFloat(value) > parseFloat(temp[2]);
                        case '<':
                            return parseFloat(value) < parseFloat(temp[2]);
                        case '>=':
                            return parseFloat(value) >= parseFloat(temp[2]);
                        case '<=':
                            return parseFloat(value) <= parseFloat(temp[2]);
                        case '<>':
                            return parseFloat(value) !== parseFloat(temp[2]);
                        case '==':
                            return parseFloat(value) === parseFloat(temp[2]);
                    }
                },
                function(value) {
                    if(code[1].match(/^\[(>|<|=|>=|<=|<>)\d+\]/)) {
                        let temp = code[1].match(/^\[(>|<|=|>=|<=|<>)(\d+)\]/);
                        if(temp[1] === '=') {
                            temp[1] = '==';
                        }
                        switch (temp[1]) {
                            case '>':
                                return parseFloat(value) > parseFloat(temp[2]);
                            case '<':
                                return parseFloat(value) < parseFloat(temp[2]);
                            case '>=':
                                return parseFloat(value) >= parseFloat(temp[2]);
                            case '<=':
                                return parseFloat(value) <= parseFloat(temp[2]);
                            case '<>':
                                return parseFloat(value) !== parseFloat(temp[2]);
                            case '==':
                                return parseFloat(value) === parseFloat(temp[2]);
                        }
                    } else {
                        return true;
                    }
                },
                function() {
                    return true;
                }
            ];
        }
        if(code.length === 3) {
            code[3] = '@';
        } else if(code.length === 2) {
            code[3] = '@';
            code[2] = code[0];
        } else if(code.length === 1) {
            if(code[0].includes('@')) {
                code[3] = code[0];
            } else {
                code[3] = '@';
            }
            code[2] = code[0];
            code[1] = '-' + code[0];
        }

        for (let i in matchFunc) {
            if(matchFunc[i](value)) {
                code = code[i];
                break;
            }
        }

        // 遇到 % 乘以 100
        if(code.match(/[^*|\\|_]%/) !== null && value.toString().match(/^-?\d+(\.\d+)?$/)) {
            value = value * 100;
        }

        //自定义格式中整数部分数字占位符个数
        let codeZhengshuNumCount = 0;
        //自定义格式中小数部分占位符个数
        let codeXiaoshuNumCount = 0;
        // 是否全部小数位都是有效占位符#
        let allEffectivePlaceholder = true;
        //.match(/\.(([#|0](\\\.|[^#|0|\.])*)+)/)[1]
        if(code.match(/(([#|0|\?](\\\.|[^#|0|\.])*)+)\.?/) !== null) {
            let temp = code.replace(/[*|\\|_]{2}/g, '').replace(/[*|\\|_]([#|0|\?])/g, '').match(/(([#|0|\?](\\\.|[^#|0|\.])*)+)\.?/);
            if(temp) {
                codeZhengshuNumCount = temp[1].match(/([#|0|\?])/g).length;
            }
        }
        let isQianfenwei = false;//是否千分位
        if(code.match(/[^*|\\|_],/) !== null) {
            isQianfenwei = true;
            let endQianfenwei = (code + ' ').match(/[^*|\\|_](,+)[^#|0|\?]/);
            if(endQianfenwei !== null) {// 是否有末尾千分位
                value = value / Math.pow(1000, endQianfenwei[1].length);
            }
        }
        if(code.match(/\.(([#|0|\?]?(\\\.|[^#|0|\.])*)+)/) !== null) {
            let xiaoshuCode = code.replace(/[*|\\|_]{2}/g, '').replace(/[*|\\|_]([#|0|\?])/g, '').match(/\.(([#|0|\?]?(\\\.|[^#|0|\.])*)+)/)[1];
            let xiaoshuNumSlot = xiaoshuCode.match(/([#|0|\?])/g);
            if(xiaoshuCode.match(/^#+%?$/) === null) {
                allEffectivePlaceholder = false;
            }
            if(xiaoshuNumSlot === null) {
                codeXiaoshuNumCount = 0;
            } else {
                codeXiaoshuNumCount = xiaoshuNumSlot.length;
            }
        } else {
            // code没有小数部分，直接四舍五入
            if(typeof value === 'number') {
                value = Math.round(value);
            }
        }
        //是否是分数表达式
        let isFenShuwei = false;//是否是分数
        if(code.replace(/[*|\\|_]{2}/g, '').replace(/[*|\\|_]([#|0|\?])/g, '').match(/(.*[^*|\\|_])\/[^\d|#|0|\?]*?([\d|#|0|\?]+)/) !== null) {   //如果是分数表达式
            value = oldValue;
            let tempFenshuMatch = code.replace(/[*|\\|_]{2}/g, '').replace(/[*|\\|_]([#|0|\?])/g, '').match(/(.*[^*|\\|_])\/[^\d|#|0|\?]*?([\d|#|0|\?]+)/);
            let isHasZhengshu = tempFenshuMatch[1].match(/([#|0\?]+[^#|0\?]*)/g);
            var fenmu = tempFenshuMatch[2];
            if(tempFenshuMatch.length >= 2) {
                isFenShuwei = true;
            }
            if(fenmu === '?') {
                let temp = getNearFenshu(parseFloat(value), 1);
                fenmu = temp[1];
            } else if(fenmu === '??') {
                let temp = getNearFenshu(parseFloat(value), 2);
                fenmu = temp[1];
            } else if(fenmu === '???') {
                let temp = getNearFenshu(parseFloat(value), 3);
                fenmu = temp[1];
            } else ;


            let runValue = parseInt((parseInt(value * fenmu * 2) + 1) / 2).toString();
            if(isHasZhengshu.length >= 2) {
                value = [parseInt(runValue / fenmu).toString(), (runValue % fenmu).toString()];
            }
            if(isHasZhengshu.length >= 2) {
                codeZhengshuNumCount = isHasZhengshu[0].match(/([#|0\?])[^#|0\?]*/g).length;
                codeXiaoshuNumCount = isHasZhengshu[1].match(/([#|0\?])[^#|0\?]*/g).length;
            } else {
                codeZhengshuNumCount = 0;
                codeXiaoshuNumCount = isHasZhengshu[0].length;
                value = [0, runValue];
            }
        } else {
            // 如果是一个极小的数字，例如9.568181142949328e-7
            let e = value.toString().match(/e([+|-])(\d+)$/);
            value = value.toString().split('.');
            if(e) {
                if(e[1] === '-') {
                    if(e[2] > 0) {
                        value = ['0', Array(e[2] - 1).fill(0).join('') + value[0] + value[1].replace(/e-(\d+)$/, '')];
                    }
                }
            }
        }
        value[0] = Math.abs(value[0]).toString();
        let temp = '';
        let returnValue = ['', '', ''];
        let returnHtml = '';
        let finishedNumCount = 0;// 已经跑完的数字位置
        let styleColor = '';
        while (code.length > 0) {
            temp = code[0];
            if(temp === '_') {
                returnHtml += '<span style="opacity: 0">' + code[1] + '</span>';
                code = code.slice(2);
            } else if(temp === '*') {
                returnValue[0] = returnHtml;
                if(code[1] !== '=') {
                    returnValue[1] += code[1];
                }
                returnHtml = '';
                code = code.slice(2);
            } else if(temp === '[') {
                code = code.slice(1);
                let [, type] = code.match(/^([^\]]+)\]/);
                let styleColorList = {
                    '红色': 'red',
                    '黑色': 'black',
                    '黄色': 'yellow',
                    '绿色': 'green',
                    '白色': 'white',
                    '蓝色': 'blue',
                    '青色': 'cyan',
                    '洋红': 'magenta',
                };
                if(Object.keys(styleColorList).includes(type)) {
                    styleColor = styleColorList[type];
                    returnHtml += '';
                } else if(code.match(/^\[\$(\S)-804\]/)) {
                    let findStr = code.match(/^\[\$(\S)-804\]/)[1];
                    code = code.replace(/^\[\$(\S)-804\]/, '');
                    returnHtml += findStr;
                } else ;
                code = code.slice(type.length + 1);
            } else if(temp === '#' || temp === '0' || temp === '?') {
                if(code.match(/^([#|0]+)\.([#|0]+)E\+([#|0]+)/)) {  // 科学计数法
                    let match = code.match(/^([#|0]+)\.([#|0]+)E\+([#|0]+)/);
                    let match1Length = match[1].length;
                    let match2Length = match[2].length;
                    let match3Length = match[3].length;

                    let firstWeishu = value[0].length;//整数位数
                    let chengshu = 0;
                    if(value.length > 1) { //有小数部分
                        if(value[0] === 0) {    //数字是小于1的
                            value[0] = '';
                            let ppp = 0;
                            while (ppp++ < 100) {
                                if(value[1][0] !== '0') {
                                    value[0] += value[1][0];
                                }
                                value[1] = value[1].slice(1);
                                chengshu--;
                                if(value[1].length === 0) {
                                    //if(value[0]=='0'){
                                    value = [value[0]];
                                    firstWeishu = value[0].length;
                                    break;
                                }
                            }
                            //小于1的,表达式整数无论多少位,只进步到一位有效数字,在excel尝试得到,不知道原因
                            if(match1Length > 1) {
                                for (var i = 0; i < match1Length - 1; i++) {
                                    returnHtml += '0';
                                }
                            }
                            match1Length = 1;
                        } else {
                            value = [value[0] + value[1]];
                        }
                    }
                    returnHtml += value[0].toString().slice(0, match1Length) + '.';//整数位
                    //小数部分
                    let xiaoshuValue = '';
                    for (let i = match2Length + match1Length; i >= match1Length + 1; i--) {
                        if(code[i] === '#' && xiaoshuValue === '' && value[0][i - 1] === '0') ; else if(value[0][i - 1] !== undefined) {
                            xiaoshuValue = value[0][i - 1] + xiaoshuValue;
                        } else if(code[i] === '0') {
                            xiaoshuValue = '0' + xiaoshuValue;
                        }
                    }
                    returnHtml += xiaoshuValue + 'E';
                    returnHtml += firstWeishu > match1Length - chengshu ? '+' : '-';
                    //指数部分
                    var valueTemp = Math.abs(firstWeishu - match1Length + chengshu);
                    if(valueTemp.toString().length < match3Length) {
                        for (let i = 0; i < match3Length - valueTemp.toString().length; i++) {
                            returnHtml += '0';
                        }
                    }
                    returnHtml += valueTemp;
                    code = code.replace(/^([#|0]+)\.([#|0]+)E\+([#|0]+)/, '');
                } else {
                    if(finishedNumCount >= codeZhengshuNumCount) { //进入小数区间,或者分数区间
                        if(isFenShuwei === true) {
                            if(finishedNumCount > codeZhengshuNumCount + codeXiaoshuNumCount - 1) {//进入分母区间了
                                let oldReturnHtml = returnHtml;
                                if(fenmu.toString()[finishedNumCount - codeZhengshuNumCount - codeXiaoshuNumCount]) {
                                    returnHtml += fenmu.toString();//[finishedNumCount - codeZhengshuNumCount - codeXiaoshuNumCount];
                                } else if(temp === '0') {
                                    returnHtml += '0';
                                } else if(temp === '?') {
                                    returnHtml += ' ';
                                }
                                code = code.slice(returnHtml.length - oldReturnHtml.length);
                            } else {
                                if(value.length === 2 && value[1].length > codeXiaoshuNumCount) {
                                    returnHtml += value[1];
                                    code = code.slice(codeXiaoshuNumCount);
                                } else {
                                    if(value.length === 2 && finishedNumCount - codeZhengshuNumCount > codeXiaoshuNumCount - value[1].length - 1) {
                                        returnHtml += value[1][value[1].length - codeXiaoshuNumCount + finishedNumCount - codeZhengshuNumCount];
                                    } else if(temp === '0') {
                                        returnHtml += '0';
                                    } else if(temp === '?') {
                                        returnHtml += ' ';
                                    }
                                    code = code.slice(1);
                                }

                            }
                        } else {
                            if(value.length === 2 && value[1].length > finishedNumCount - codeZhengshuNumCount) {
                                returnHtml += value[1][finishedNumCount - codeZhengshuNumCount];
                            } else if(temp === '0') {
                                returnHtml += '0';
                            } else if(temp === '?') {
                                returnHtml += ' ';
                            }
                            code = code.slice(1);
                        }
                    } else if(codeZhengshuNumCount - finishedNumCount <= value[0].length) { // 整数部分   code 3个   value 2个， finishedNumCount应该1就进入
                        if(finishedNumCount === 0) { // 整数之前的部分(code位少)
                            // 整数部分 虽然code的位数不够,则都显示
                            for (let i = 0; i < value[0].length - codeZhengshuNumCount; i++) {
                                returnHtml += value[0][i];
                                if(isQianfenwei && (value[0].length - i) % 3 === 1) {
                                    returnHtml += ',';
                                }
                            }
                        }
                        if(value[0] === '0') {
                            if(temp === '0') {
                                returnHtml += '0';
                            } else if(temp === '?') {
                                returnHtml += ' ';
                            }
                        } else {
                            returnHtml += value[0][value[0].length + finishedNumCount - codeZhengshuNumCount];
                        }
                        if(!(isFenShuwei && value[0] === '0')) {
                            if(isQianfenwei && (codeZhengshuNumCount - finishedNumCount) % 3 === 1 && codeZhengshuNumCount - finishedNumCount !== 1) {
                                returnHtml += ',';
                            }
                        }
                        code = code.slice(1);
                    } else {
                        // 格式code 对比 数字，多余的部分
                        if(temp === '0') {
                            returnHtml += '0';
                        } else if(temp === '?') {
                            returnHtml += ' ';
                        }
                        if (temp === '0') {
                            if(isQianfenwei && (codeZhengshuNumCount - finishedNumCount) % 3 === 1 && codeZhengshuNumCount - finishedNumCount !== 1) {
                                returnHtml += ',';
                            }
                        }
                        code = code.slice(1);
                    }
                    finishedNumCount++;
                }
            } else if(temp === '@') {
                returnHtml += oldValue;
                code = code.slice(1);
            } else if(temp === '"') {
                let findStr = code.match(/^"([^"]*)"/);
                returnHtml += findStr[1];
                code = code.replace(/^"([^"]*)"/, '');
            } else if(temp === '\\' || temp === '!') {
                returnHtml += code[1];
                code = code.slice(2);
            } else if(temp === ',') {
                code = code.slice(1);
            } else if(temp === '.') {
                //真实数字精度大于格式小数精度,则进行四舍五入
                if(finishedNumCount === codeZhengshuNumCount && value.length === 2 && value[1].length > codeXiaoshuNumCount) {
                    // 前面添加一个1，后面再删除，是为了防止第一位是0，造成的省略
                    let fixed = Math.round('1' + value[1].slice(0, codeXiaoshuNumCount) + '.' + value[1].slice(codeXiaoshuNumCount)).toString().slice(1);
                    value[1] = parseFloat('0.' + fixed).toFixed(codeXiaoshuNumCount).split('.')[1].replace(/0+$/, '');
                    if(value[1].match(/^0+$/) !== null) {
                        value = [value[0]];
                    }
                }
                if(allEffectivePlaceholder) {
                    // 如果小数点后面都是#，而且遇到了整数，则判断小数点是无效的
                    // ##.## 遇到【3】，最终显示【 3 】，而不是【 3. 】
                    if(value[1]) {
                        returnHtml += temp;
                    }
                } else {
                    returnHtml += temp;
                }
                code = code.slice(1);
            } else {
                returnHtml += temp;
                code = code.slice(1);
            }
        }
        returnHtml = replaceDate(returnHtml, oldValue);
        returnValue[2] = returnHtml;
        // 如果只配置了规则或者颜色，等于默认填充了值
        if((usedCalc || styleColor) && returnHtml === '') {
            returnValue[2] = oldValue;
        }
        if(styleColor !== '') {
            returnValue[3] = styleColor;
        }
        return returnValue;
    }

    function encodeHtml([value0, value1, value2, style]) {
        if(value1 !== '') {
            return '<span class="vue-format-single' + (style ? (' vue-format-single-color-' + style) : '') + '">' +
                (value0 !== '' ? ('<span>' + value0 + '</span>') : '') +
                ('<span class="vue-format-single-fill">' + value1 + '</span>') +
                (value2 !== '' ? ('<span>' + value2 + '</span>') : '') +
                '</span>';
        } else {
            if(style) {
                return '<span class="vue-format-single' + (' vue-format-single-color-' + style) + '">' +
                    [value0, value1, value2].join('') +
                    '</span>';
            } else {
                return [value0, value1, value2].join('');
            }
        }
    }

    /*测试用例*/

    function test(code, value, result) {
        let runResult = encodeHtml(format(code, value));
        if (runResult === result) {
            console.log('finish');
            // console.log(runResult);
        } else {
            console.log('==========');
            console.log(code, value, runResult);
            throw new Error()
        }
    }

    console.log('开始运行测试用例');
    test('#,###.00', 19526.00, '19,526.00');
    test('#,###', 19526.00, '19,526');
    test('###.##', 12.1263, '12.13');
    test('##.^##^##^###', 3.1234567811, '3.^12^34^568');
    test('##.##^##^###', 3.1234567811, '3.12^34^568');
    test('##.##^##^##', 3.1, '3.1^^');
    test('###.##', -12.1263, '-12.13');
    test('##.##', 30.015, '30.02');
    test('##.??', 12.123456, '12.12');
    test('##.??-??-??', 12.123456, '12.12-34-56');
    test('##.??-??-?????', 12.123456, '12.12-34-56   ');
    test('###.##', 12.1, '12.1');
    test('00000', 1234567, '1234567');
    test('00000', 123, '00123');
    test('00.000', 100.14, '100.140');
    test('00.000', -100.14, '-100.140');
    test('00.000', 1.1, '01.100');
    test('0000-00-00', 20180512, '2018-05-12');
    test('??.??', 12.121, '12.12');
    test('???.???', 12.121, ' 12.121');
    test('???.????', 12.121, ' 12.121 ');
    test('#%', 0.1, '10%');
    test('#%', -0.1, '-10%');
    test('0.00%', 0.123, '12.30%');
    test('0.##%', 0.123, '12.3%');
    test('0.#', 11.23, '11.2');
    test('#,###', 12000, '12,000');
    test('¥#,###', 12000, '¥12,000');
    test('#,###', 10, '10');
    test('¥#,###', 10, '¥10');
    test('#,###', 1200000, '1,200,000');
    test('0.00%', 3, '300.00%');
    test('###.##%', 3, '300%');
    test('###.##', 3, '3');
    test('###.#^#', 3, '3.^');
    test('###.^', 3, '3.^');
    test('###.??', 3, '3.  ');
    test('###.###0', 3, '3.0');
    test('¥#,##0.00', 1200000, '¥1,200,000.00');
    test('#,', 100000, '100');
    test('$00000', 1, '$00001');
    test('$00000', -1, '-$00001');
    test('#,', 1000000, '1,000');
    test('#,,', 1000000, '1');
    test('#,"k"', 123123, '123k');
    test('0,.#', 12345, '12.3');
    test('0,.#', -12345, '-12.3');
    test('#.00,', 12345, '12.35');
    // 分数
    test('??/??', 0.28, ' 7/25');
    test('00/??', 0.28, '07/25');
    test('??/??', 1.28, '32/25');
    test('?/??', 1.28, '32/25');
    test('?/?', 0.28, '2/7');
    test('# ??/??', 1.28, '1  7/25');
    test('# ??/??', 0.28, '  7/25');

    test('"人民币 "#,##0,,"百万"', 1234567890, '人民币 1,235百万');
    test('"集团"@"部"', '财务', '集团财务部');
    test('@@@', '财务', '财务财务财务');
    test('@*-', 'ABC', '<span class="vue-format-single"><span>ABC</span><span class="vue-format-single-fill">-</span></span>');
    test('¥* #', 123123, '<span class="vue-format-single"><span>¥</span><span class="vue-format-single-fill"> </span><span>123123</span></span>');
    test('**', 123123, '<span class="vue-format-single"><span class="vue-format-single-fill">*</span></span>');
    test('#\\元', 123123, '123123元');
    test('#"人民币"', 123123, '123123人民币');
    test('[蓝色]#.00', 0.123, '<span class="vue-format-single vue-format-single-color-blue">.12</span>');// wrong
    test('[蓝色]0.00', 0.123, '<span class="vue-format-single vue-format-single-color-blue">0.12</span>');// wrong
    test('[蓝色]¥*-0', 1, '<span class="vue-format-single vue-format-single-color-blue"><span>¥</span><span class="vue-format-single-fill">-</span><span>1</span></span>');
    test('[>1]"上升";[=1]"持平";"下降"', 1.2, '上升');
    test('[>=1]"上升";[=1]"持平";"下降"', 1, '上升');
    test('[>1]"上升";[=1]"持平";"下降"', 1, '持平');
    test('[>1]"上升";[=1]"持平";"下降"', 0.8, '下降');
    test('[<>1]"变动";[=1]"持平";"空"', 1, '持平');
    test('[<>1]"变动";[=1]"持平";"空"', 1.1, '变动');
    test('[>1][绿色];[=1][黄色];[红色]', 1.2, '<span class="vue-format-single vue-format-single-color-green">1.2</span>');
    test('[>1][绿色];[=1][黄色];[红色]', 1, '<span class="vue-format-single vue-format-single-color-yellow">1</span>');
    test('[>1][绿色];[=1][黄色];[红色]', 0.8, '<span class="vue-format-single vue-format-single-color-red">0.8</span>');
    test('!"#!"', 10, '"10"');
    test('#_圆圆', 123123, '123123<span style="opacity: 0">圆</span>圆');
    test('YYYY', 1562838244, '2019');
    test('YY', 1562838244, '19');
    test('YY-MM-DD', 1562838244, '19-07-11');

    // 日期月份计算
    test('YY-MMM-DD', 1547995981, '19-Jan-20');//1
    test('YY-MMM-DD', 1550674381, '19-Feb-20');//2
    test('YY-MMM-DD', 1553093581, '19-Mar-20');//3
    test('YY-MMM-DD', 1555771981, '19-Apr-20');//4
    test('YY-MMM-DD', 1558363981, '19-May-20');//5
    test('YY-MMM-DD', 1561042381, '19-Jun-20');//6

    test('YY-MMM-DD', 1563634381, '19-Jul-20');//7
    test('YY-MMM-DD', 1566312781, '19-Aug-20');//8
    test('YY-MMM-DD', 1568991181, '19-Sep-20');//9
    test('YY-MMM-DD', 1571583181, '19-Oct-20');//10
    test('YY-MMM-DD', 1574261581, '19-Nov-20');//11
    test('YY-MMM-DD', 1576853581, '19-Dec-20');//12
    test('YYYY-MMM-DD', 1576853581, '2019-Dec-20');//12
    test('YY-MMM-DD', 1562838244, '19-Jul-11');
    test('yy-MM-DD', 1562838244, '19-07-11');
    test('yy-M-DD', 1562838244, '19-7-11');
    test('yy-M-D', 1672506061, '23-1-1');
    test('YY-MM-DD HH:mm:ss', 1562838244, '19-07-11 17:44:04');
    test('YYYY"年"MM"月"DD"日"', 1576853581, '2019年12月20日');//12

    test('YY-MM-DD HH:mm:ss DDDD', 1695221581, '23-09-20 22:53:01 星期三');
    test('YY-MM-DD HH:mm:ss DDD', 1695221581, '23-09-20 22:53:01 周三');

    test('YY-MM-DD HH:mm:ss AM/PM', 1695221581, '23-09-20 22:53:01 PM');
    test('YY-MM-DD HH:mm:ss DDD AM/PM', 1695221581, '23-09-20 22:53:01 周三 PM');


    test('YY-MM-DD HH:mm:ss 上午/下午', 1695139200, '23-09-20 00:00:00 上午');
    test('YY-MM-DD HH:mm:ss 上午/下午', 1695182399, '23-09-20 11:59:59 上午');
    test('YY-MM-DD HH:mm:ss 上午/下午', 1695182400, '23-09-20 12:00:00 下午');
    test('YY-MM-DD HH:mm:ss 上午/下午', 1695225599, '23-09-20 23:59:59 下午');
    test('YY-MM-DD HH:mm:ss上午/下午', 1695225599, '23-09-20 23:59:59下午');


    test('YY-MM-DD HH:mm:ss AM/PM', 1695139200, '23-09-20 00:00:00 AM');
    test('YY-MM-DD HH:mm:ss AM/PM', 1695182399, '23-09-20 11:59:59 AM');
    test('YY-MM-DD HH:mm:ss AM/PM', 1695182400, '23-09-20 12:00:00 PM');
    test('YY-MM-DD HH:mm:ss AM/PM', 1695225599, '23-09-20 23:59:59 PM');
    test('YY-MM-DD HH:mm:ssAM/PM', 1695225599, '23-09-20 23:59:59PM');


    test('hh-M-M', 1672599845, '03-1-1');
    test('hh-m-m', 1672599845, '03-4-4');
    test('h-m-m', 1672599845, '3-4-4');
    test('d-m-m', 1672599845, '2-4-4');
    test('D-m-m', 1672599845, '2-4-4');
    test('H-m-m', 1672599845, '3-4-4');
    test('H-m-m ss', 1672599845, '3-4-4 05');
    test('H-m-M s', 1672599845, '3-4-1 5');

    test('00000,000', 1111, '00,001,111');
    test('00000,000', 111, '00,000,111');
    // // 支持科学技术法格式的数字
    test('0.####', 9.568181142949328e-7, '0');
    test('###.??', 9.568181142949328e-7, '.  ');
    test('###.######', 9.568181142949328e-7, '.000001');
    test('###.#######', 9.568181142949328e-7, '.000001');
    test('###.########', 9.568181142949328e-7, '.00000096');
    test('###.####', 9.568181142949328e-7, '');
    test('##0.0000', 9.568181142949328e-7, '0.0000');
    test('###.0000', 9.568181142949328e-7, '.0000');

})();
