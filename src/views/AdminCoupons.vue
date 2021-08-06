<template>
  <div>
    <div class="container-fluid">
      <div class="text-end mt-2">
        <button class="btn btn-primary mt-4 me-3" type="button" data-bs-toggle="modal"
          data-bs-target="#dashboard-modal" @click="showModal()">建立優惠券</button>
      </div>
      <table class="table align-middle my-4">
        <thead>
          <tr>
            <th>標題</th>
            <th class="text-end pe-4" width="120">折扣</th>
            <th class="text-center" width="120">到期日</th>
            <th class="text-center" width="120">是否啟用</th>
            <th class="text-center" width="120">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="coupon in coupons" :key="coupon.id">
            <td>{{ coupon.title }}</td>
            <td class="text-end pe-4">{{ coupon.percent }}%</td>
            <td class="text-center">{{ $helper.timeToDate(coupon.due_date) }}</td>
            <td class="text-center">
              <span v-if="coupon.is_enabled" class="text-success">啟用</span>
              <span v-else class="text-muted">未啟用</span>
            </td>
            <td class="text-center">
              <div class="btn-group">
                <button class="btn btn-outline-primary btn-sm" data-bs-toggle="modal"
                  data-bs-target="#dashboard-modal" @click="showModal(coupon)">編輯</button>
                <button class="btn btn-outline-danger btn-sm" @click="deleteCoupon(coupon)">
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Pagination :pages="pagination" @updatePage="getCoupons" />
    <CouponModal id="dashboard-modal" :coupon="modalItem" @submit-coupon="addOrUpdateCoupon" />
  </div>
</template>

<script>
import RequestSenderMixin from '@/mixins/RequestSenderMixin';
import { MessageTransmitterMixin } from '@/mixins/MessageTransMixins';

import CouponModal from '@/components/AdminCouponModal.vue';
import Pagination from '@/components/Pagination.vue';

export default {
  name: 'AdminCoupons',
  mixins: [RequestSenderMixin, MessageTransmitterMixin],
  components: { CouponModal, Pagination },
  data() {
    return {
      coupons: [],
      pagination: {},
      modalItem: this.defaultCoupon(),
    };
  },
  methods: {
    defaultCoupon() {
      return { is_enabled: 0 };
    },
    showModal(coupon) {
      this.modalItem = coupon || this.defaultCoupon();
    },
    getCoupons(page = 1) {
      this.$loading.show();

      const params = { page };

      const onSuccess = (res) => {
        this.coupons = res.coupons;
        this.pagination = res.pagination;
      };

      const onFailure = (res) => {
        this.pushMessageFailure('取得失敗', res.messages.join('、'));
      };

      return this.sendRequest('getCouponsAdmin', params, null, onSuccess, onFailure).finally(
        this.$loading.hide,
      );
    },
    addOrUpdateCoupon(coupon) {
      if (!coupon.id) {
        this.addCoupon(coupon);
      } else {
        this.updateCoupon(coupon);
      }
    },
    addCoupon(coupon) {
      this.$loading.show();

      const data = { data: coupon };

      const onSuccess = (res) => {
        this.pushMessageSuccess('新增成功', res.message);
      };

      const onFailure = (res) => {
        this.pushMessageFailure('新增失敗', res.message);
      };

      return this.sendRequest('addCouponAdmin', null, data, onSuccess, onFailure)
        .finally(this.$loading.hide)
        .finally(this.getCoupons);
    },
    updateCoupon(coupon) {
      this.$loading.show();

      const params = { id: coupon.id };
      const data = { data: coupon };

      const onSuccess = (res) => {
        this.pushMessageSuccess('更新成功', res.message);
      };

      const onFailure = (res) => {
        this.pushMessageFailure('更新失敗', res.message);
      };

      return this.sendRequest('updateCouponAdmin', params, data, onSuccess, onFailure)
        .finally(this.$loading.hide)
        .finally(() => {
          this.getCoupons(this.pagination.current_page);
        });
    },
    deleteCoupon(coupon) {
      // eslint-disable-next-line no-alert
      if (!window.confirm('確定刪除優惠券？')) return Promise.reject();

      this.$loading.show();

      const params = { id: coupon.id };

      const onSuccess = (res) => {
        this.pushMessageSuccess('刪除成功', res.message);
      };

      const onFailure = (res) => {
        this.pushMessageFailure('刪除失敗', res.message);
      };

      return this.sendRequest('deleteCouponAdmin', params, null, onSuccess, onFailure)
        .finally(this.$loading.hide)
        .finally(() => {
          this.getCoupons(this.pagination.current_page);
        });
    },
  },
  created() {
    this.getCoupons();
  },
};
</script>
