export default function(num, wei) {
    let numList = num.toString().split('.');
    num = '0.' + numList[1];
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
};
