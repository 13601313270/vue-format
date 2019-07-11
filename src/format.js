import getNearFenshu from "./similarFraction";

export default function(code, value) {
    //console.log(value);
    // 遇到 % 乘以 100
    if(code.match(/[^*|\\|_]%/) !== null && value.toString().match(/^-?\d+(\.\d+)?$/)) {
        value = value * 100;
    }

    //自定义格式中整数部分数字占位符个数
    let codeZhengshuNumCount = 0;
    //自定义格式中小数部分占位符个数
    let codeXiaoshuNumCount = 0;
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
        let endQianfenwei = (code + ' ').match(/[^*|\\|_](,+)[^#|0|\?]/)
        if(endQianfenwei !== null) {// 是否有末尾千分位
            value = value / Math.pow(1000, endQianfenwei[1].length);
        }
    }
    if(code.match(/\.(([#|0|\?](\\\.|[^#|0|\.])*)+)/) !== null) {
        codeXiaoshuNumCount = code.replace(/[*|\\|_]{2}/g, '').replace(/[*|\\|_]([#|0|\?])/g, '').match(/\.(([#|0|\?](\\\.|[^#|0|\.])*)+)/)[1].match(/([#|0|\?])/g).length;
    } else {
        // code没有小数部分，直接四舍五入
        if(value instanceof Number) {
            value = Math.round(value);
        }
    }

    value = value.toString();
    let oldValue = value;
    //是否是分数表达式
    var isFenShuwei = false;//是否是分数
    if(code.replace(/[*|\\|_]{2}/g, '').replace(/[*|\\|_]([#|0|\?])/g, '').match(/(.*[^*|\\|_])\/[^\d|#|0|\?]*?([\d|#|0|\?]+)/) !== null) {   //如果是分数表达式
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
        } else {

        }

        let runValue = parseInt((parseInt(value * fenmu * 2) + 1) / 2).toString();
        if(isHasZhengshu.length >= 2) {
            value = [parseInt(runValue / fenmu).toString(), (runValue % fenmu).toString()];
        }

        if(isHasZhengshu.length >= 2) {
            codeZhengshuNumCount = isHasZhengshu[0].match(/([#|0\?])[^#|0\?]*/g).length;
            codeXiaoshuNumCount = isHasZhengshu[1].match(/([#|0\?])[^#|0\?]*/g).length;
        } else {
            value = [runValue];
        }
    } else {
        value = value.split('.');
    }
    value[0] = Math.abs(value[0]).toString();
    let temp = '';
    let returnValue = ['', '', ''];
    let returnHtml = '';
    let finishedNumCount = 0;// 已经跑完的数字位置
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
            if(code.match(/^\[\$(\S)-804\]/)) {
                var findStr = code.match(/^\[\$(\S)-804\]/)[1];
                code = code.replace(/^\[\$\S-804\]/, '');
                returnHtml += findStr;
            } else {
            }
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
                        var ppp = 0;
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
                } else {

                }
                returnHtml += value[0].toString().slice(0, match1Length) + '.';//整数位
                //小数部分
                let xiaoshuValue = '';
                for (let i = match2Length + match1Length; i >= match1Length + 1; i--) {
                    if(code[i] === '#' && xiaoshuValue === '' && value[0][i - 1] === '0') {
                    } else if(value[0][i - 1] !== undefined) {
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
                                console.log(fenmu);
                                returnHtml += fenmu.toString();//[finishedNumCount - codeZhengshuNumCount - codeXiaoshuNumCount];
                            } else if(temp === '0') {
                                returnHtml += '0';
                            } else if(temp === '?') {
                                returnHtml += ' ';
                            }
                            code = code.slice(returnHtml.length - oldReturnHtml.length);
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
                    } else {
                        //真实数字精度大于格式小数精度,则进行四舍五入
                        if(finishedNumCount === codeZhengshuNumCount && value.length === 2 && value[1].length > codeXiaoshuNumCount) {
                            let fixed = Math.round(value[1].slice(0, codeXiaoshuNumCount) + '.' + value[1].slice(codeXiaoshuNumCount));
                            value[1] = parseFloat('0.' + fixed).toFixed(codeXiaoshuNumCount).split('.')[1];
                        }
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
                    if(isFenShuwei && value[0] === '0') {
                        if(temp === '0') {
                            returnHtml += '0';
                        } else if(temp === '?') {
                            returnHtml += ' ';
                        }
                    } else {
                        returnHtml += value[0][value[0].length + finishedNumCount - codeZhengshuNumCount];
                        if(isQianfenwei && (codeZhengshuNumCount - finishedNumCount) % 3 === 1 && codeZhengshuNumCount - finishedNumCount !== 1) {
                            returnHtml += ',';
                        }
                    }
                    code = code.slice(1);
                } else {
                    if(temp === '0') {
                        returnHtml += '0';
                    } else if(temp === '?') {
                        returnHtml += ' ';
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
        } else if(temp === '\\') {
            returnHtml += code[1];
            code = code.slice(2);
        } else if(temp === ',') {
            code = code.slice(1);
        } else {
            returnHtml += temp;
            code = code.slice(1);
        }
    }
    returnValue[2] = returnHtml;
    return returnValue;
}
