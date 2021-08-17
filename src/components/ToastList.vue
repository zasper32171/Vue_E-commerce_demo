<template>
  <div class="toast-container">
    <component :is="component[type]" v-for="(msg, key) in messages" :key="key" :msg="msg" />
  </div>
</template>

<script>
import { MessageReceiverMixin } from '@/mixins/MessageTransMixins';

import Toast from '@/components/Toast.vue';
import AdminToast from '@/components/AdminToast.vue';

export default {
  name: 'ToastList',
  mixins: [MessageReceiverMixin],
  components: { Toast, AdminToast },
  props: {
    type: {
      type: String,
      validator: (value) => ['main', 'admin'].includes(value),
      default: 'main',
    },
  },
  data() {
    return {
      component: {
        main: 'Toast',
        admin: 'AdminToast',
      },
      messages: [],
    };
  },
  created() {
    this.initMessageReceiver(this.messages);
  },
};
</script>
