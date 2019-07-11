export default function([value0, value1, value2, style]) {
    if(value1 !== '') {
        return '<span class="vue-format-single' + (style ? (' vue-format-single-color-' + style) : '') + '">' +
            (value0 !== '' ? ('<span>' + value0 + '</span>') : '') +
            ('<span class="vue-format-single-fill">' + value1 + '</span>') +
            (value2 !== '' ? ('<span>' + value2 + '</span>') : '') +
            '</span>';
    } else {
        if(style) {
            return '<span class="vue-format-single' + ('vue-format-single-color-' + style) + '">' +
                [value0, value1, value2].join('') +
                '</span>';
        } else {
            return [value0, value1, value2].join('');
        }
    }
}
