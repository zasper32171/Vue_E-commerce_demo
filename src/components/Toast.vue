<template>
  <div class="toast" role="alert" ref="toast">
    <div class="toast-header">
      <span :class="`bg-${msg.style}`" class="p-2 rounded me-2 d-inline-block"></span>
      <strong class="me-auto">{{ msg.title }}</strong>
      <button type="button" class="btn-close" data-bs-dismiss="toast" />
    </div>
    <div class="toast-body" v-if="msg.content">
      {{ msg.content }}
    </div>
  </div>
</template>
<script>
import { Toast } from 'bootstrap';

export default {
  name: 'Toast',
  props: ['msg'],
  mounted() {
    const toastEl = this.$refs.toast;
    const toast = new Toast(toastEl, {
      delay: 6000,
    });
    toast.show();
  },
};
</script>

<style lang="scss" scoped>
.toast {
  position: relative;
  z-index: 3000;
}
</style>
