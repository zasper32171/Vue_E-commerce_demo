<template>
  <div class="container pt-2 pb-sm-4 pb-3">
    <div class="row justify-content-center mb-4">
      <div class="col-xl-8 col-lg-10 col bg-gray-dark px-sm-5 px-4 py-4 mx-sm-0 mx-2">
        <h4 class="text-center border-bottom border-primary pt-1 pb-4 mb-3">訂單明細</h4>
        <table class="lh-base ls-sm w-100">
          <tbody>
            <tr v-for="item in items" :key="item">
              <td>
                <div class="lh-sm mb-sm-0 my-1">{{ item.product.title }}</div>
                <div class="fs-8 lh-sm font-sans text-gray mb-1 d-sm-block d-none">
                  <span v-if="item.product.info.vintage">{{ item.product.info.vintage }}年 /</span>
                  <span>{{ item.product.info.abv }}％ / {{ item.product.info.volume }}</span>
                </div>
              </td>
              <td class="fs-5 text-end text-nowrap ps-3 pe-sm-6">
                × {{ item.qty }}
              </td>
              <td class="fs-5 text-end text-primary ps-3">
                {{ $helper.currency(item.total) }}
              </td>
            </tr>
          </tbody>
        </table>
        <div class="row align-items-center border-top border-primary mt-3 mx-0 g-0">
          <div class="col-md-7 ps-md-3 pe-md-5 mt-md-3 mt-4 mb-md-0 mb-3 order-md-0 order-1">
            <Form @submit="addCoupon(code)">
              <div class="input-group">
                <Field name="優惠碼" class="form-control" type="text" placeholder="請輸入優惠碼"
                  v-model="code" rules="required|alpha_num" :validateOnChange="false"
                  :validateOnBlur="false" />
                <div class="input-group-append ms-3">
                  <button class="btn btn-sm btn-decorative" type="submit">套用優惠碼</button>
                </div>
              </div>
              <ErrorMessage as="div" name="優惠碼" class="position-absolute ls-sm fs-8 text-danger" />
            </Form>
          </div>
          <div class="col-md-5">
            <table class="lh-base w-100">
              <tbody class="border-bottom border-primary">
                <tr>
                  <td class="pt-3">合計</td>
                  <td class="fs-5 lh-1 ls-sm text-end pt-2">{{ $helper.currency(subtotal) }}</td>
                </tr>
                <tr>
                  <td>運費</td>
                  <td class="fs-5 lh-1 ls-sm text-end">{{ $helper.currency(shipping) }}</td>
                </tr>
                <tr>
                  <td class="pb-3">折扣</td>
                  <td class="fs-5 lh-1 ls-sm text-end pb-2">-{{ $helper.currency(discount) }}</td>
                </tr>
              </tbody>
              <tfoot class="text-primary">
                <tr>
                  <td class="fs-5 pt-3">總計</td>
                  <td class="fs-4 lh-1 ls-sm text-end pt-2">{{ $helper.currency(total) }}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-xl-8 col-lg-10 col bg-gray-dark px-sm-6 px-4 py-4 mx-sm-0 mx-2">
        <h4 class="text-center border-bottom border-primary pt-1 pb-4 mb-4">聯絡資訊</h4>
        <Form class="lh-sm" @submit="addOrder(order)">
          <div class="row">
            <div class="col-sm mb-4">
              <div class="form-group">
                <label for="input-name">
                  <img class="mb-1" src="@/assets/icons/user-light.svg" width="16" alt />
                  <span> 姓名</span>
                  <span class="text-danger">*</span>
                </label>
                <Field id="input-name" name="姓名"
                  class="form-control form-control-sm input-underline" type="text" rules="required"
                  v-model="order.user.name" />
                <div class="position-relative">
                  <ErrorMessage name="姓名"
                    class="position-absolute end-0 ls-sm fs-8 text-danger mt-1" />
                </div>
              </div>
            </div>
            <div class="col-sm mb-4">
              <div class="form-group">
                <label for="input-tele">
                  <img class="mb-1" src="@/assets/icons/phone-light.svg" width="16" alt />
                  <span> 電話</span>
                  <span class="text-danger">*</span>
                </label>
                <Field id="input-tele" name="電話"
                  class="form-control form-control-sm input-underline" type="tel"
                  rules="required|numeric" v-model="order.user.tel" />
                <div class="position-relative">
                  <ErrorMessage name="電話"
                    class="position-absolute end-0 ls-sm fs-8 text-danger mt-1" />
                </div>
              </div>
            </div>
          </div>
          <div class="form-group mb-4">
            <label for="input-mail">
              <img class="mb-1" src="@/assets/icons/mail-light.svg" width="16" alt />
              <span> 信箱</span>
              <span class="text-danger">*</span>
            </label>
            <Field id="input-mail" name="信箱" class="form-control form-control-sm input-underline"
              type="email" rules="required|email" v-model="order.user.email" />
            <div class="position-relative">
              <ErrorMessage name="信箱" class="position-absolute end-0 ls-sm fs-8 text-danger mt-1" />
            </div>
          </div>
          <div class="form-group mb-4">
            <label for="input-address">
              <img class="mb-1" src="@/assets/icons/home-light.svg" width="16" alt />
              <span> 地址</span>
              <span class="text-danger">*</span>
            </label>
            <Field id="input-address" name="地址" class="form-control form-control-sm input-underline"
              type="text" rules="required" v-model="order.user.address" />
            <div class="position-relative">
              <ErrorMessage name="地址" class="position-absolute end-0 ls-sm fs-8 text-danger mt-1" />
            </div>
          </div>
          <div class="form-group mb-4">
            <label for="select-payment">
              <img class="mb-1" src="@/assets/icons/dollar-light.svg" width="16" alt />
              <span> 付款方式</span>
              <span class="text-danger">*</span>
            </label>
            <Field as="select" id="select-payment" name="付款方式"
              class="form-select form-select-sm input-underline" rules="required"
              v-model="order.payment_method">
              <option disabled>—— 請選擇付款方式 ——</option>
              <option value="WebATM">WebATM</option>
              <option value="ATM">ATM</option>
              <option value="信用卡付款">信用卡付款</option>
              <option value="街口支付">街口支付</option>
              <option value="Line Pay">Line Pay</option>
              <option value="Apple Pay">Apple Pay</option>
              <option value="Google Pay">Google Pay</option>
            </Field>
            <div class="position-relative">
              <ErrorMessage name="付款方式"
                class="position-absolute end-0 ls-sm fs-8 text-danger mt-1" />
            </div>
          </div>
          <div class="form-group">
            <label for="textarea-comment">
              <img src="@/assets/icons/comment-light.svg" width="16" alt />
              <span> 備註</span>
            </label>
            <textarea id="textarea-comment" class="form-control form-control-sm" rows="6"
              v-model="order.message" />
          </div>
          <div class="form-group form-check lh-base my-3">
            <Field id="check-agreement" name="agreement" class="form-check-input border-gray"
              type="checkbox" value="#" rules="required" />
            <label class="form-check-label fs-7" for="check-agreement">
              <span>我已年滿十八歲，並同意會員責任規範與商家會員條款</span>
              <span class="text-danger">*&ensp;</span>
            </label>
            <ErrorMessage name="agreement">
              <label class="ls-sm fs-8 text-danger"><span>您必須同意會員條款</span></label>
            </ErrorMessage>
          </div>
          <div class="d-flex">
            <div class="flex-grow-1 me-3">
              <button class="btn btn-outline-light w-100" type="button"
                @click="$router.go(-1)">回上一頁</button>
            </div>
            <div class="flex-grow-1">
              <button class="btn btn-primary w-100" type="submit">送出訂單</button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import RequestSenderMixin from '@/mixins/RequestSenderMixin';
import { MessageTransmitterMixin } from '@/mixins/MessageTransMixins';

export default {
  name: 'Checkout',
  mixins: [RequestSenderMixin, MessageTransmitterMixin],
  emits: ['update:step'],
  data() {
    return {
      items: [],
      subtotal: 0,
      shipping: 0,
      total: 0,
      code: '',
      order: this.defaultOrder(),
    };
  },
  computed: {
    discount() {
      return this.subtotal - this.total;
    },
  },
  methods: {
    defaultOrder() {
      return { user: {} };
    },
    getCart() {
      this.$loading.show();

      const onSuccess = (res) => {
        this.items = res.data.carts;
        this.subtotal = res.data.total;
        this.total = Math.floor(res.data.final_total);
      };

      const onFailure = (/* res */) => {
        // console.error('取得失敗: ', res.messages.join('、'));
        this.$router.push('/');
      };

      return this.sendRequest('getCart', null, null, onSuccess, onFailure).finally(
        this.$loading.hide,
      );
    },
    addCoupon(code) {
      this.$loading.show();

      const data = { data: { code } };

      const onSuccess = () => {
        this.pushMessageSuccess('已套用優惠券');
      };

      const onFailure = (res) => {
        this.pushMessageFailure(res.message);
      };

      return this.sendRequest('addCoupon', null, data, onSuccess, onFailure)
        .finally(this.$loading.hide)
        .finally(this.getCart);
    },
    addOrder(order) {
      this.$loading.show();

      const data = { data: order };

      const onSuccess = (res) => {
        this.$router.push(`/order/${res.orderId}`);
      };

      const onFailure = (res) => {
        this.pushMessageFailure(res.message);
      };

      return this.sendRequest('addOrder', null, data, onSuccess, onFailure).finally(
        this.$loading.hide,
      );
    },
  },
  created() {
    this.$emit('update:step', 1);
    this.getCart().then(() => {
      if (!this.items.length) {
        this.$router.push('/products');
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.form-group > label {
  margin-top: 0.125rem;
  margin-bottom: 0.25rem;
}
.invalid-feedback {
  margin-top: calc(0.25rem - 1px);
}
</style>
