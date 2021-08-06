/**
 * vue3-loading-overlay's plugin method is not compatible with vue global configs.
 * something like app.$loading = useLoading() will work in dev mode but fails in
 * production mode. here provides some hack to achieve this along with some tricks
 * for preventing the showing of multiple loader at a time. everything is mostly
 * untouched except the hide() method.
 */

import { h, render } from 'vue';
import Loading from 'vue3-loading-overlay';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';

function createComponent(component, props, parentContainer) {
  const vnode = h(component, props);
  const container = document.createElement('div');
  parentContainer.appendChild(container);
  render(vnode, container);

  return vnode.component;
}

function removeElement(el) {
  if (typeof el.remove !== 'undefined') {
    el.remove();
  } else if (el.parentNode) {
    el.parentNode.removeChild(el);
  }
}

function useLoading(globalProps = {}, globalSlots = {}) {
  let instance = null;
  let count = 0;
  const loading = {
    show(props = globalProps, slots = globalSlots) {
      // eslint-disable-next-line no-plusplus
      if (++count > 1) return;
      const forceProps = {
        programmatic: true,
        lockScroll: true,
        isFullPage: false,
      };
      const propsData = { ...globalProps, ...props, ...forceProps };
      let { container } = propsData;
      if (!propsData.container) {
        container = document.body;
        propsData.isFullPage = true;
      }
      instance = createComponent(Loading, propsData, container);
      const mergedSlots = { ...globalSlots, ...slots };
      // eslint-disable-next-line array-callback-return
      Object.keys(mergedSlots).map((name) => {
        if (instance != null) {
          instance.slots[name] = mergedSlots[name];
        }
      });
    },
    hide() {
      // eslint-disable-next-line no-plusplus
      if (--count >= 1) return;
      if (instance != null) {
        /** the only thing modified */
        document.body.classList.remove('vld-shown');
        const root = instance.vnode.el;
        removeElement(root.parentElement);
      }
    },
  };
  return loading;
}

export default Loading;
export { useLoading };
