/*测试用例*/
import format from './format';
import encodeHtml from './encodeHtml';

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
