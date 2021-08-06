<template>
  <div>
    <div class="container-fluid">
      <table class="table align-middle mt-5 mb-4">
        <thead>
          <tr>
            <th class="text-center" width="220">訂單編號</th>
            <th class="text-center" width="120">成立時間</th>
            <th class="ps-4">訂購品項</th>
            <th></th>
            <th class="text-center" width="180">購買人</th>
            <th class="text-center ps-4" width="120">訂單金額</th>
            <th class="text-center" width="120">付款狀態</th>
            <th class="text-center" width="120">付款時間</th>
            <th class="text-center d-xxl-table-cell d-none" width="160">備註</th>
            <th class="text-center" width="120">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.id">
            <td class="text-center">{{ order.id }}</td>
            <td class="text-center">{{ $helper.timeToDate(order.create_at) }}</td>
            <td class="ps-4">
              <div v-for="product in order.products" :key="product.id" class="text-truncate">
                {{ product.product.title }}
              </div>
            </td>
            <td class="text-primary text-end pe-5">
              <div v-for="product in order.products" :key="product.id">
                ×&nbsp;{{ product.qty }}
              </div>
            </td>
            <td class="text-center">
              <div>{{ order.user.name }}</div>
              <div>{{ order.user.tel }}</div>
              <div class="text-truncate" style="width:180px">{{ order.user.email }}</div>
            </td>
            <td class="text-end pe-4">{{ $helper.currency(order.total) }}</td>
            <td class="text-center">
              <span v-if="order.is_paid" class="text-success">已付款</span>
              <span v-else class="text-muted">未付款</span>
            </td>
            <td class="text-center">{{ $helper.timeToDate(order.paid_date) }}</td>
            <td class="text-center d-xxl-table-cell d-none">
              <div class="text-wrap text-break">{{ order.message }}</div>
            </td>
            <td class="text-center">
              <div class="btn-group">
                <button class="btn btn-outline-primary btn-sm" data-bs-toggle="modal"
                  data-bs-target="#dashboard-modal" @click="showModal(order)">編輯</button>
                <button class="btn btn-outline-danger btn-sm" @click="deleteOrder(order)">
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <Pagination :pages="pagination" @updatePage="getOrders" />
    </div>
    <OrderModal id="dashboard-modal" :order="modalItem" @submit-order="updateOrder" />
  </div>
</template>

<script>
import RequestSenderMixin from '@/mixins/RequestSenderMixin';
import { MessageTransmitterMixin } from '@/mixins/MessageTransMixins';

import OrderModal from '@/components/AdminOrderModal.vue';
import Pagination from '@/components/Pagination.vue';

export default {
  name: 'AdminOrders',
  mixins: [RequestSenderMixin, MessageTransmitterMixin],
  components: { OrderModal, Pagination },
  data() {
    return {
      orders: [],
      pagination: {},
      modalItem: this.defaultOrder(),
    };
  },
  methods: {
    defaultOrder() {
      return { user: {} };
    },
    showModal(order) {
      this.modalItem = order || this.defaultOrder();
    },
    getOrders(page = 1) {
      this.$loading.show();

      const params = { page };

      const onSuccess = (res) => {
        this.orders = res.orders;
        this.pagination = res.pagination;
      };

      const onFailure = (res) => {
        this.pushMessageFailure('取得失敗', res.messages.join('、'));
      };

      return this.sendRequest('getOrdersAdmin', params, null, onSuccess, onFailure).finally(
        this.$loading.hide,
      );
    },
    updateOrder(order) {
      this.$loading.show();

      const params = { id: order.id };
      const data = { data: order };

      const onSuccess = (res) => {
        this.pushMessageSuccess('更新成功', res.message);
      };

      const onFailure = (res) => {
        this.pushMessageFailure('更新失敗', res.message);
      };

      return this.sendRequest('updateOrderAdmin', params, data, onSuccess, onFailure)
        .finally(this.$loading.hide)
        .finally(() => {
          this.getOrders(this.pagination.current_page);
        });
    },
    deleteOrder(order) {
      // eslint-disable-next-line no-alert
      if (!window.confirm('確定刪除訂單？')) return Promise.reject();

      this.$loading.show();

      const params = { id: order.id };

      const onSuccess = (res) => {
        this.pushMessageSuccess('刪除成功', res.message);
      };

      const onFailure = (res) => {
        this.pushMessageFailure('刪除失敗', res.message);
      };

      return this.sendRequest('deleteOrderAdmin', params, null, onSuccess, onFailure)
        .finally(this.$loading.hide)
        .finally(() => {
          this.getOrders(this.pagination.current_page);
        });
    },
  },
  created() {
    this.getOrders();
  },
};
</script>
