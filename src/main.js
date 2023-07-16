import format from './format';
import encodeHtml from './encodeHtml';
import './fillCharacter.css';

function bindVueFunc(el, binding, vnode) {
    let value = vnode.text;//vnode.data.attrs.value;
    if (vnode.data && vnode.data.domProps && vnode.data.domProps.innerHTML) {
        value = vnode.data.domProps.innerHTML;
    }
    if (vnode.children && vnode.children.length === 1) {
        value = vnode.children[0].children.replace(/^\s(.*)\s$/, '$1');
    }
    let returnValue = format(binding.value, value);
    el.innerHTML = encodeHtml(returnValue);
}

export default {
    install(Vue) {
        Vue.directive('format', bindVueFunc);
        Vue.config.globalProperties.$textFormat = (value, code) => {
            return format(code, value).join('');
        };
    }
}
