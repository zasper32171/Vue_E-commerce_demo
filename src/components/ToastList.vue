<template>
  <div class="toast-container">
    <template v-if="type === 'toast'">
      <Toast v-for="(msg, key) in messages" :key="key" :msg="msg" />
    </template>
    <template v-if="type === 'alert'">
      <Alert v-for="(msg, key) in messages" :key="key" :msg="msg" />
    </template>
  </div>
</template>

<script>
import { MessageReceiverMixin } from '@/mixins/MessageTransMixins';

import Alert from '@/components/Alert.vue';
import Toast from '@/components/Toast.vue';

export default {
  name: 'ToastList',
  mixins: [MessageReceiverMixin],
  components: { Toast, Alert },
  props: {
    type: {
      type: String,
      validator: (value) => ['toast', 'alert'].includes(value),
      default: 'toast',
    },
  },
  data() {
    return {
      messages: [],
    };
  },
  created() {
    this.initMessageReceiver(this.messages);
  },
};
</script>
