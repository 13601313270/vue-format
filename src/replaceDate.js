export default function (creatVal, value) {
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
                'mm',
                (date) => {
                    let minute = date.getMinutes();
                    return (minute < 10 ? '0' : '') + minute;
                }
            ],
            [
                'ss',
                (date) => {
                    let second = date.getSeconds();
                    return (second < 10 ? '0' : '') + second;
                }
            ],
        ];
        rep.forEach(item => {
            creatVal = creatVal.replace(item[0], item[1](date));
        });
    }
    return creatVal.toString();
}
