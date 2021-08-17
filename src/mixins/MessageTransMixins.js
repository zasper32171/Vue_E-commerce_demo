import mitt from 'mitt';

const RouterMixin = {
  name: 'RouterMixin',
  provide() {
    return {
      emitter: mitt(),
    };
  },
  data() {
    return {
      emitter: {},
    };
  },
  created() {
    // Hack: to ensure correct emitter for components being both router & rx/tx.
    this.emitter = this.$.provides.emitter;
  },
};

const TransmitterMixin = {
  name: 'TransmitterMixin',
  inject: ['emitter'],
  methods: {
    emit(event, param) {
      this.emitter.emit(event, param);
    },
  },
};

const DialogTransmitterMixin = {
  name: 'DialogTransmitterMixin',
  extends: TransmitterMixin,
  methods: {
    pushDialog(type, title, content, onConfirm, onCancel) {
      this.emit('push-dialog', {
        type: type || 'alert',
        title,
        content,
        onConfirm,
        onCancel,
      });
    },
    pushAlert(title, content, onConfirm) {
      this.pushDialog('alert', title, content, onConfirm);
    },
    pushConfirm(title, content, onConfirm, onCancel) {
      this.pushDialog('confirm', title, content, onConfirm, onCancel);
    },
  },
};

const MessageTransmitterMixin = {
  name: 'MessageTransmitterMixin',
  extends: TransmitterMixin,
  methods: {
    pushMessage(style, title, content) {
      this.emit('push-message', {
        style: style || 'success',
        title,
        content,
      });
    },
    pushMessageSuccess(title, content) {
      this.pushMessage('success', title, content);
    },
    pushMessageFailure(title, content) {
      this.pushMessage('danger', title, content);
    },
  },
};

const ReceiverMixin = {
  name: 'ReceiverMixin',
  inject: ['emitter'],
  methods: {
    initReceiver(event, callback) {
      this.emitter.on(event, callback);
    },
  },
};

const DialogReceiverMixin = {
  name: 'DialogReceiverMixin',
  extends: ReceiverMixin,
  methods: {
    initDialogReceiver(queue) {
      this.initReceiver('push-dialog', (alert) => {
        queue.push(alert);
      });
    },
  },
};

const MessageReceiverMixin = {
  name: 'MessageReceiverMixin',
  extends: ReceiverMixin,
  methods: {
    initMessageReceiver(queue) {
      this.initReceiver('push-message', (message) => {
        queue.push(message);
      });
    },
  },
};

export {
  RouterMixin,
  TransmitterMixin,
  DialogTransmitterMixin,
  MessageTransmitterMixin,
  ReceiverMixin,
  DialogReceiverMixin,
  MessageReceiverMixin,
};
