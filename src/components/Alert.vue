<template>
  <div class="toast" role="alert" ref="toast">
    <div class="toast-body">
      <img :src="icons[msg.style]" width="64">
      <div class="mt-3">{{ msg.title }}</div>
    </div>
  </div>
</template>
<script>
import { Toast } from 'bootstrap';

export default {
  name: 'Alert.vue',
  props: ['msg'],
  data() {
    return {
      icons: {
        success: require('@/assets/icons/success-light.svg'),
        danger: require('@/assets/icons/danger-light.svg'),
        warning: require('@/assets/icons/warning-light.svg'),
        help: require('@/assets/icons/help-light.svg'),
      },
    };
  },
  mounted() {
    const toastEl = this.$refs.toast;
    const toast = new Toast(toastEl, {
      delay: 2000,
    });
    toast.show();
  },
};
</script>

<style lang="scss" scoped>
.toast {
  position: fixed;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
  width: auto;
  min-width: 140px;
  max-width: 180px;
  border-width: 0;
  border-radius: 8px;
  background-color: rgba(174, 174, 174, 0.3);
  backdrop-filter: blur(15px);
  z-index: 3000;
  user-select: none;
}
.toast-body {
  height: 100%;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.5;
  letter-spacing: 0.2em;
  text-indent: 0.1em;
  text-align: center;
  margin: 0.25rem 0;
  opacity: 0.95;
}
</style>
