/*测试用例*/
import format from './format';
import encodeHtml from './encodeHtml';

function test(code, value, result) {
    let runResult = encodeHtml(format(code, value));
    if(runResult === result) {
        console.log('finish');
        // console.log(runResult);
    } else {
        console.log('==========');
        console.log(code, value);
        console.log(runResult, format(code, value), result);
    }
}

console.log('开始运行测试用例');
test('###.##', 12.1263, '12.13');
test('###.##', -12.1263, '-12.13');
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
test('0.#', 11.23, '11.2');
test('#,###', 12000, '12,000');
test('#,###', 1200000, '1,200,000');
test('#,', 100000, '100');
test('#,', 1000000, '1,000');
test('#,,', 1000000, '1');
test('#,"k"', 123123, '123k');
test('0,.#', 12345, '12.3');
test('0,.#', -12345, '-12.3');
test('#.00,', 12345, '12.35');
test('"人民币 "#,##0,,"百万"', 1234567890, '人民币 1,235百万');
test('"集团"@"部"', '财务', '集团财务部');
test('@@@', '财务', '财务财务财务');
test('@*-', 'ABC', '<span class="vue-format-single"><span>ABC</span><span class="vue-format-single-fill">-</span></span>');
test('¥* #', '123123', '<span class="vue-format-single"><span>¥</span><span class="vue-format-single-fill"> </span><span>123123</span></span>');
test('**', '123123', '<span class="vue-format-single"><span class="vue-format-single-fill">*</span></span>');
test('#\\元', '123123', '123123元');
test('#"人民币"', '123123', '123123人民币');
test('[蓝色]#.00', '0.123', '<span class="vue-format-singlevue-format-single-color-blue">0.12</span>');// wrong
test('[蓝色]¥*-0', '1', '<span class="vue-format-single vue-format-single-color-blue"><span>¥</span><span class="vue-format-single-fill">-</span><span>1</span></span>');
// test('[>1]"上升";[=1]"持平";"下降"', '1.2', '上升');
// test('[>1]"上升";[=1]"持平";"下降"', '1', '持平');

