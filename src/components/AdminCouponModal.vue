<template>
  <div class="modal fade" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <form class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title text-light">
            <span>新增 / 編輯優惠券</span>
          </h5>
          <button class="btn-close" type="button" data-bs-dismiss="modal" />
        </div>
        <div class="modal-body">
          <div class="mb-2">
            <label for="inputTitle" class="form-label">標題</label>
            <input id="inputTitle" class="form-control" type="text" placeholder="請輸入標題"
              v-model="tempCoupon.title" />
          </div>
          <div class="mb-2">
            <label for="inputCode" class="form-label">優惠碼</label>
            <input id="inputCode" class="form-control" type="text" placeholder="請輸入優惠碼"
              v-model="tempCoupon.code" />
          </div>
          <div class="row gx-2">
            <div class="mb-2 col-md-6">
              <label for="inputPercent" class="form-label">折扣百分比</label>
              <div class="input-group">
                <input id="inputPercent" class="form-control" type="number" min="0" max="1"
                  placeholder="請輸入折扣百分比" v-model.number="tempCoupon.percent" />
                <span class="input-group-text">%</span>
              </div>
            </div>
            <div class="mb-2 col-md-6">
              <label for="inputDate" class="form-label">到期日</label>
              <input id="inputDate" class="form-control" type="date" v-model="dueDate" />
            </div>
          </div>
          <div class="mt-2">
            <div class="form-check">
              <input id="inputEnabled" class="form-check-input" type="checkbox" :true-value="1"
                :false-value="0" v-model="tempCoupon.is_enabled" />
              <label class="form-check-label" for="inputEnabled">是否啟用</label>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline-secondary" type="button"
            data-bs-dismiss="modal">取消</button>
          <button class="btn btn-primary" type="submit" data-bs-dismiss="modal"
            @click="submitCoupon">確認</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminCouponModal',
  props: {
    coupon: {
      type: Object,
      default: () => {},
    },
  },
  emits: ['submit-coupon'],
  data() {
    return {
      tempCoupon: JSON.parse(JSON.stringify(this.coupon)),
      loadingImg: false,
    };
  },
  computed: {
    dueDate: {
      get() {
        return this.$helper.timeToInputDate(this.tempCoupon.due_date);
      },
      set(value) {
        this.tempCoupon.due_date = this.$helper.dateToTime(value);
      },
    },
  },
  watch: {
    coupon() {
      this.tempCoupon = JSON.parse(JSON.stringify(this.coupon));
    },
  },
  methods: {
    submitCoupon() {
      this.$emit('submit-coupon', this.tempCoupon);
    },
  },
};
</script>
