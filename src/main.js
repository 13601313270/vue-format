import format from 'format';

function bindVueFunc(el, binding, vnode) {
    let value = vnode.test;//vnode.data.attrs.value;
    if(vnode.children && vnode.children.length === 1) {
        value = vnode.children[0].text;
    }
    let returnValue = format(binding.value, value);
    el.innerHTML = returnValue.join('');
}

export default {
    install(Vue) {
        Vue.directive('format', {
            bind: bindVueFunc,
            // 当被绑定的元素插入到 DOM 中时……
            update: bindVueFunc
        })
    }
}
