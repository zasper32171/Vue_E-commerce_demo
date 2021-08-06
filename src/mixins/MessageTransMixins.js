import mitt from 'mitt';

const RouterMixin = {
  name: 'RouterMixin',
  provide() {
    return {
      emitter: mitt(),
    };
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
  MessageTransmitterMixin,
  ReceiverMixin,
  MessageReceiverMixin,
};
