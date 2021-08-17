<template>
  <div class="container pt-2 pb-sm-4 pb-3">
    <div class="row">
      <div class="col-xl-6 col-md-10 col bg-gray-dark px-sm-5 px-4 py-4 mx-sm-auto mx-3">
        <h4 class="text-center border-bottom border-primary pt-1 pb-4 mb-2">訂單資訊</h4>
        <table class="w-100">
          <tbody class="align-top">
            <tr v-for="field in fields" :key="field">
              <td class="fw-medium text-end text-primary text-nowrap pt-1">
                {{ field.title }}
              </td>
              <td class="text-break pt-1 ps-3"
                :class="field.class? field.class(getField(order, field.key)): null"
                :style="field.style? field.style(getField(order, field.key)): null">
                {{ field.render?
                  field.render(getField(order, field.key)):getField(order, field.key) }}
              </td>
            </tr>
          </tbody>
        </table>
        <div class="text-center mt-3">
          <button v-if="!order.is_paid" class="btn btn-primary w-50" type="button"
            @click="payOrder(order)">確認付款</button>
          <router-link v-else to="/products">
            <button class="btn btn-outline-light w-50" type="button">繼續購物</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RequestSenderMixin from '@/mixins/RequestSenderMixin';
import { MessageTransmitterMixin } from '@/mixins/MessageTransMixins';

export default {
  name: 'Order',
  mixins: [RequestSenderMixin, MessageTransmitterMixin],
  emits: ['update:step'],
  data() {
    return {
      order: this.defaultOrder(),
      fields: [
        { title: '訂單編號', key: 'id', style: () => ({ 'word-break': 'break-all !important' }) },
        { title: '成立時間', key: 'create_at', render: (val) => this.$helper.timeToDatetime(val) },
        { title: '姓名', key: ['user', 'name'] },
        { title: '電話', key: ['user', 'tel'] },
        { title: '信箱', key: ['user', 'email'] },
        { title: '地址', key: ['user', 'address'] },
        { title: '備註', key: 'message' },
        { title: '訂單總額', key: 'total', render: (val) => this.$helper.currency(val) },
        { title: '付款方式', key: 'payment_method' },
        {
          title: '付款狀態',
          key: 'is_paid',
          class: (val) => [val ? ['text-success'] : ['text-danger']],
          render: (val) => (val ? '完成付款' : '尚未付款'),
        },
      ],
    };
  },
  watch: {
    'order.is_paid': function fn() {
      this.$emit('update:step', !this.order.is_paid ? 2 : 3);
    },
  },
  methods: {
    defaultOrder() {
      return { user: {} };
    },
    getField(obj, key) {
      if (typeof key === 'string') {
        return obj[key];
      }
      if (key instanceof Array) {
        return key.reduce((accu, curr) => accu[curr], obj);
      }
      return null;
    },
    getOrder(id) {
      this.$loading.show();

      const params = { id };

      const onSuccess = (res) => {
        this.order = res.order;
      };

      const onFailure = () => {
        this.$router.push('/');
      };

      return this.sendRequest('getOrder', params, null, onSuccess, onFailure).finally(
        this.$loading.hide,
      );
    },
    payOrder(order) {
      this.$loading.show();

      const params = { id: order.id };

      const onSuccess = (res) => {
        this.pushMessageSuccess(res.message);
      };

      const onFailure = (res) => {
        this.pushMessageFailure(res.message);
      };

      return this.sendRequest('payOrder', params, null, onSuccess, onFailure)
        .finally(this.$loading.hide)
        .finally(() => this.getOrder(order.id));
    },
  },
  created() {
    this.getOrder(this.$route.params.id);
  },
};
</script>
