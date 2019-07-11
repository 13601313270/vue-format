export default function(creatVal, value) {
    if(value.toString().match(/(\d{10})/) || value.toString().match(/(\d{13})/)) {
        let date = new Date();
        if(value.toString().match(/(\d{10})/)) {
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
                'YY',
                (date) => {
                    return date.getFullYear().toString().slice(2);
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
                'DD',
                (date) => {
                    let day = date.getDate();
                    return (day < 10 ? '0' : '') + day;
                }
            ],
            [
                'HH',
                (date) => {
                    let day = date.getHours();
                    return (day < 10 ? '0' : '') + day;
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
            ], [
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
