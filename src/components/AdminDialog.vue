<template>
  <div class="modal fade" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content px-2">
        <div class="modal-header border-0 pb-0">
          <h5 class="text-dark modal-title">{{ messages[0]?.title }}</h5>
        </div>
        <div class="modal-body pb-0">
          <p class="mb-1">{{messages[0]?.content}}</p>
        </div>
        <div class="modal-footer border-0 pt-0">
          <button v-if="messages[0]?.type === 'confirm'" class="btn text-primary" type="button"
            @click="cancel">取消</button>
          <button class="btn text-primary" type="button" @click="confirm">確定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap';

import { DialogReceiverMixin } from '@/mixins/MessageTransMixins';

export default {
  name: 'Dialog',
  mixins: [DialogReceiverMixin],
  data() {
    return {
      messages: [],
      modal: {},

      isHidden: true,
      isDeleting: false,
    };
  },
  computed: {
    toDelete() {
      return this.isHidden && this.isDeleting;
    },
  },
  watch: {
    messages: {
      handler() {
        if (this.messages.length) {
          this.modal.show();
          this.isHidden = false;
        }
      },
      deep: true,
    },
    toDelete(val) {
      if (val) {
        this.messages.shift();
        this.isDeleting = false;
      }
    },
  },
  methods: {
    confirm() {
      const { onConfirm } = this.messages[0];

      if (onConfirm && typeof onConfirm === 'function') {
        (async () => {
          onConfirm();
        })();
      }

      this.dismiss();
    },
    cancel() {
      const { onCancel } = this.messages[0];

      if (onCancel && typeof onCancel === 'function') {
        (async () => {
          onCancel();
        })();
      }

      this.dismiss();
    },
    dismiss() {
      this.modal.hide();
      this.isDeleting = true;
    },
  },
  created() {
    this.initDialogReceiver(this.messages);
  },
  mounted() {
    this.modal = new Modal(this.$el);

    this.$el.addEventListener('hidden.bs.modal', () => {
      if (this.messages.length) this.isHidden = true;
    });
  },
};
</script>
