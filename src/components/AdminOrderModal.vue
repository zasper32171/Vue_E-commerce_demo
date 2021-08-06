<template>
  <div class="modal fade" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
      <form class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title text-light">
            <span>編輯訂單</span>
          </h5>
          <button class="btn-close" type="button" data-bs-dismiss="modal" />
        </div>
        <div class="modal-body">
          <div class="row gx-2">
            <div class="mb-2 col-md-6">
              <label class="form-label">訂單編號</label>
              <input class="form-control" type="text" :value="tempOrder.id" readonly />
            </div>
            <div class="mb-2 col-md-6">
              <label class="form-label">成立時間</label>
              <input class="form-control" type="text"
                :value="$helper.timeToDatetime(tempOrder.create_at)" readonly />
            </div>
          </div>
          <div class="row gx-2">
            <div class="mb-2 col-md-6">
              <label for="inputTotal" class="form-label">訂單金額</label>
              <input id="inputTotal" class="form-control" type="number" placeholder="請輸入訂單金額"
                v-model.number="tempOrder.total" />
            </div>
            <div class="mb-2 col-md-6">
              <label class="form-label">付款方式</label>
              <input class="form-control" type="text" :value="tempOrder.payment_method" readonly />
            </div>
          </div>
          <div class="row gx-2">
            <div class="mb-2 col-md-6">
              <label class="form-label mb-3">付款狀態</label>
              <div class="form-check">
                <input id="checkPaid" class="form-check-input" type="checkbox" :true-value="true"
                  :false-value="false" v-model="tempOrder.is_paid" />
                <label class="form-check-label" for="checkPaid">已付款</label>
              </div>
            </div>
            <div class="mb-2 col-md-6">
              <label class="form-label">付款時間</label>
              <input class="form-control" type="text"
                :value="$helper.timeToDatetime(tempOrder.paid_date)" readonly />
            </div>
          </div>
          <h5 class="text-dark text-center mt-3">購買人資訊</h5>
          <hr>
          <div class="row gx-2">
            <div class="mb-2 col-md-6">
              <label for="inputName" class="form-label">姓名</label>
              <input id="inputName" class="form-control" type="text" placeholder="請輸入姓名"
                v-model="tempOrder.user.name" />
            </div>
            <div class="mb-2 col-md-6">
              <label for="inputTele" class="form-label">電話</label>
              <input id="inputTele" class="form-control" type="tel" placeholder="請輸入電話"
                v-model="tempOrder.user.tel" />
            </div>
          </div>
          <div class="row gx-2">
            <div class="mb-2 col-md-6">
              <label for="inputMail" class="form-label">信箱</label>
              <input id="inputMail" class="form-control" type="email" placeholder="請輸入信箱"
                v-model="tempOrder.user.email" />
            </div>
            <div class="mb-2 col-md-6">
              <label for="inputAddress" class="form-label">地址</label>
              <input id="inputAddress" class="form-control" type="text" placeholder="請輸入地址"
                v-model="tempOrder.user.address" />
            </div>
          </div>
          <div>
            <label for="textareaMessage" class="form-label">備註</label>
            <textarea id="textareaMessage" class="form-control" type="text" placeholder="請輸入備註"
              v-model="tempOrder.message" />
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline-secondary" type="button"
            data-bs-dismiss="modal">取消</button>
          <button class="btn btn-primary" type="submit" data-bs-dismiss="modal"
            @click="submitOrder">確認</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminOrderModal',
  props: {
    order: {
      type: Object,
      default: () => {},
    },
  },
  emits: ['submit-order'],
  data() {
    return {
      tempOrder: JSON.parse(JSON.stringify(this.order)),
      loadingImg: false,
    };
  },
  watch: {
    order() {
      this.tempOrder = JSON.parse(JSON.stringify(this.order));
    },
  },
  methods: {
    submitOrder() {
      this.$emit('submit-order', this.tempOrder);
    },
  },
};
</script>
