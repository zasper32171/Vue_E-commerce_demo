import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

const Plugin = VueLoading.install;

const PluginWrapper = (app, props = {}, slots = {}) => {
  // Hack: vue-loading-overlay doesn't expose useLoading => get it from installed instance.
  Plugin(app, props, slots);

  const instance = app.config.globalProperties.$loading;

  const instanceWrapper = (function fn() {
    let count = 0;
    let loader = null;

    return {
      show() {
        count += 1;
        if (count > 1) return;
        loader = instance.show();
      },
      hide() {
        count -= 1;
        if (count > 0) return;
        loader.hide();
      },
    };
  }());

  // eslint-disable-next-line no-param-reassign
  app.config.globalProperties.$loading = instanceWrapper;
  app.provide('$loading', instanceWrapper);
};

VueLoading.install = PluginWrapper;

export default VueLoading;
