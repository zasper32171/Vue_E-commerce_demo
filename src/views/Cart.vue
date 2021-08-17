<template>
  <div class="container py-7">
    <section>
      <div class="text-center">
        <h2 class="mb-0 lh-1">購物車</h2>
        <img class="mw-100" src="@/assets/decs/title-dec.png" alt />
      </div>
      <div class="row py-5">
        <div class="col-xxl-8 mb-xxl-0">
          <table class="table table-hover border-primary d-md-table d-none">
            <thead class="lh-sm table-primary">
              <tr class="text-nowrap">
                <th></th>
                <th class="py-2 text-center">品項</th>
                <th class="py-2 text-end">單價</th>
                <th class="py-2 text-center">數量</th>
                <th class="py-2 text-end">小計</th>
                <th></th>
              </tr>
            </thead>
            <tbody class="text-height-reset ls-sm">
              <tr v-for="item in items" :key="item" :ref="(el) => {if (el) pushSizeSyncEl(el);}">
                <td>
                  <router-link :to="`/product/${item.product.id}`">
                    <img :src="item.product.imageUrl" :alt="item.product.subtitle" width="96" />
                  </router-link>
                </td>
                <td>
                  <div class="position-relative">
                    <div class="lh-sm fs-8 fw-bold text-uppercase">{{ item.product.subtitle }}</div>
                    <div class="lh-sm mt-2 mb-2">{{ item.product.title }}</div>
                    <router-link class="stretched-link" :to="`/product/${item.product.id}`" />
                  </div>
                  <div class="fs-8 font-sans lh-sm ls-sm text-gray">
                    <span v-if="item.product.info.vintage">{{ item.product.info.vintage }}年 /</span>
                    <span>{{ item.product.info.abv }}％ / {{ item.product.info.volume }}</span>
                  </div>
                </td>
                <td class="fs-5 text-end text-primary">
                  {{ $helper.currency(item.product.price) }}
                </td>
                <td>
                  <Counter fixed v-model:value="item.qty" @update:value="item.updateCartItem" />
                </td>
                <td class="fs-5 text-end text-primary" width="105">
                  {{ $helper.currency(item.product.price * item.qty) }}
                </td>
                <td class="text-center ps-0">
                  <button class="btn text-reset shadow-none" type="button"
                    @click="onDeleteCartItem(item)">
                    <img src="@/assets/icons/trash.svg" alt="Delete" width="22" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <table class="table border-primary d-md-none">
            <thead class="lh-sm text-center table-primary">
              <tr class="fs-sm-6 fs-7 text-nowrap">
                <th></th>
                <th class="py-2 d-sm-table-cell d-none">單價</th>
                <th class="py-2 text-start">數量</th>
                <th class="py-2">小計</th>
                <th></th>
              </tr>
            </thead>
            <tbody class="text-height-reset ls-sm">
              <template v-for="item in items" :key="item">
                <tr>
                  <td rowspan="2">
                    <router-link :to="`/product/${item.product.id}`">
                      <img :src="item.product.imageUrl" :alt="item.product.subtitle" width="64" />
                    </router-link>
                  </td>
                  <td class="position-relative border-0 px-1 pb-0 d-sm-table-cell d-none"
                    colspan="3">
                    <p class="text-truncate truncate-multi-line">
                      <span class="fs-7 lh-sm mt-2">{{ item.product.title }}</span>
                      <span class="lh-sm fs-8 fw-bold text-uppercase">
                        &thinsp;{{ item.product.subtitle }}
                      </span>
                    </p>
                    <router-link class="stretched-link" :to="`/product/${item.product.id}`" />
                  </td>
                  <td class="position-relative border-0 px-1 pb-1 d-sm-none" colspan="2">
                    <p class="text-truncate truncate-multi-line">
                      <span class="fs-7 lh-sm mt-2">{{ item.product.title }}</span>
                      <span class="lh-sm fs-8 fw-bold text-uppercase">
                        &thinsp;{{ item.product.subtitle }}
                      </span>
                    </p>
                    <router-link class="stretched-link" :to="`/product/${item.product.id}`" />
                  </td>
                  <td class="text-center px-1" rowspan="2">
                    <button class="btn text-reset shadow-none" type="button"
                      @click="onDeleteCartItem(item)">
                      <img src="@/assets/icons/trash.svg" alt="Delete" width="18" />
                    </button>
                  </td>
                </tr>
                <tr>
                  <td class="fw-bold text-end text-primary ps-1 pt-0 d-sm-table-cell d-none"
                    width="50">
                    {{ $helper.currency(item.product.price) }}
                  </td>
                  <td class="text-sm-center text-start ps-1 pt-0 pe-0">
                    <Counter class="counter-sm" fixed v-model:value="item.qty"
                      @update:value="item.updateCartItem" />
                  </td>
                  <td class="text-end text-primary ps-2 pe-2 pt-0" width="50">
                    <div class=" d-flex justify-content-center">
                      <div class="flex-shrink-0 fw-bold">
                        {{ $helper.currency(item.product.price * item.qty) }}
                      </div>
                    </div>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
          <div v-if="!isEmpty" class="text-end mb-4">
            <button class="btn text-primary fs-7" type="button"
              @click="onDeleteCart">刪除所有項目</button>
          </div>
          <div v-else-if="isInitialized" class="text-center mt-8">
            <div class="mb-3">尚未加入任何商品</div>
            <div>
              <router-link to="/products">
                <button class="btn btn-primary" type="button">前往購物</button>
              </router-link>
            </div>
          </div>
        </div>
        <div class="col-xxl-4 col-xl-6 col-lg-7 col-md-9 mx-auto">
          <div class="d-xxl-block px-4 pt-2 pb-3 bg-gray-dark" :class="{'d-none': isEmpty}">
            <table class="lh-base w-100">
              <thead class="fs-4 text-center text-primary border-bottom border-primary">
                <tr>
                  <td class="pb-2" colspan="100%">訂單總額</td>
                </tr>
              </thead>
              <tbody class="border-bottom border-primary">
                <tr>
                  <td class="pt-3">合計</td>
                  <td class="fs-5 lh-1 ls-sm text-end pt-3">{{ $helper.currency(subtotal) }}</td>
                </tr>
                <tr>
                  <td>運費</td>
                  <td class="fs-5 lh-1 ls-sm text-end">{{ $helper.currency(shipping) }}</td>
                </tr>
                <tr>
                  <td class="pb-3">折扣</td>
                  <td class="fs-5 lh-1 ls-sm text-end pb-3">-{{ $helper.currency(discount) }}</td>
                </tr>
              </tbody>
              <tfoot class="text-primary">
                <tr>
                  <td class="fs-5 pt-2">總計</td>
                  <td class="fs-4 lh-1 ls-sm text-end pt-2">{{ $helper.currency(total) }}</td>
                </tr>
              </tfoot>
            </table>
            <Form class="position-relative pt-1 mb-3" @submit="addCoupon(code)">
              <ErrorMessage v-if="!isEmpty" as="div" name="優惠碼"
                class="position-absolute lh-1 ls-sm fs-8 text-danger" />
              <div class="input-group mt-3">
                <Field name="優惠碼" class="form-control" type="text" placeholder="請輸入優惠碼"
                  v-model="code" rules="required|alpha_num" :validateOnChange="false"
                  :validateOnBlur="false" :disabled="isEmpty" />
                <div class="input-group-append ms-3">
                  <button class="btn btn-sm btn-decorative" :class="{disabled: isEmpty}"
                    type="submit">套用優惠碼</button>
                </div>
              </div>
            </Form>
            <button class="btn btn-primary w-100" :class="{disabled: isEmpty}" type="button"
              @click="this.isRedirecting = true">前往結賬</button>
          </div>
        </div>
      </div>
    </section>
    <section class="mt-8">
      <div class="text-center col-8 mx-auto">
        <h3 class="mb-0 lh-1">精選推薦</h3>
        <img class="mw-100" src="@/assets/decs/title-dec-sm.png" alt />
      </div>
      <div class="col-md-9 mx-auto">
        <div class="row row-cols-sm-3 row-cols-2 align-items-stretch gx-xl-7 gx-sm-5 gy-4 mt-5">
          <div v-for="recommend in recommends" :key="recommend"
            class="col d-flex flex-column lh-sm">
            <div class="d-flex flex-column"
              :ref="(el) => {if (el) pushSizeSyncEl(el, 'recommend');}">
              <div class="position-relative">
                <img class="w-100" :src="recommend.imageUrl" :alt="recommend.subtitle" />
                <div class="cover-parent overlay-dark hover text-center ls-sm d-flex
                    flex-column justify-content-center">
                  <div class="fs-8 fw-bold text-uppercase mb-3">{{ recommend.subtitle }}</div>
                  <div class="mb-2">{{ recommend.title }}</div>
                  <div class="fw-bold text-primary">
                    <span class="fs-5">{{ $helper.currency(recommend.price) }}</span>
                    <span class="fs-6">/{{ recommend.unit }}&nbsp;</span>
                    <span class="fs-6 text-decoration-line-through">
                      {{ $helper.currency(recommend.origin_price) }}
                    </span>
                  </div>
                  <router-link class="stretched-link" :to="`/product/${recommend.id}`" />
                </div>
              </div>
              <router-link class="fs-8 fw-bold ls-sm text-center text-uppercase pt-3 text-light
                text-decoration-none text-truncate truncate-multi-line"
                :to="`/product/${recommend.id}`">
                {{ recommend.subtitle }}
              </router-link>
              <router-link class="fs-6 ls-sm text-center pt-1 text-light text-decoration-none"
                :to="`/product/${recommend.id}`">
                {{ recommend.title }}
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import RequestSenderMixin from '@/mixins/RequestSenderMixin';
import {
  TransmitterMixin,
  DialogTransmitterMixin,
  MessageTransmitterMixin,
} from '@/mixins/MessageTransMixins';
import SizeSynchronizer from '@/mixins/SizeSynchronizerMixin';

import Counter from '@/components/Counter.vue';

export default {
  name: 'Cart',
  mixins: [
    RequestSenderMixin,
    TransmitterMixin,
    DialogTransmitterMixin,
    MessageTransmitterMixin,
    SizeSynchronizer,
  ],
  components: { Counter },
  data() {
    return {
      items: [],
      subtotal: 0,
      shipping: 0,
      total: 0,
      code: '',
      recommends: [],

      debouncingTime: 600,
      blockingCount: 0,
      isRedirecting: false,

      isInitialized: false,
    };
  },
  computed: {
    discount() {
      return this.subtotal - this.total;
    },
    isEmpty() {
      return this.items.length === 0;
    },
    tpRedirect() {
      return this.blockingCount === 0 && this.isRedirecting;
    },
  },
  watch: {
    tpRedirect(val) {
      if (val) this.$router.push('/checkout');
    },
  },
  methods: {
    getCart() {
      this.$loading.show();

      const onSuccess = (res) => {
        this.removeAllSizeSyncEls();

        this.items = res.data.carts;
        this.subtotal = res.data.total;
        this.total = Math.floor(res.data.final_total);

        this.items.forEach((item) => {
          // eslint-disable-next-line no-param-reassign
          item.updateCartItem = this.updateCartItemDebounce(item);
        });
      };

      return this.sendRequest('getCart', null, null, onSuccess, null).finally(this.$loading.hide);
    },
    updateCartItem(item) {
      this.$loading.show();

      const params = { id: item.id };

      const data = { data: { product_id: item.product.id, qty: item.qty } };

      const onFailure = (res) => {
        this.pushMessageFailure(res.message);
      };

      return this.sendRequest('updateCartItem', params, data, null, onFailure)
        .finally(this.$loading.hide)
        .finally(this.getCart);
    },
    updateCartItemDebounce(item) {
      let timer;

      return () => {
        if (!timer) this.blockingCount += 1;

        clearTimeout(timer);
        timer = setTimeout(() => {
          this.updateCartItem(item).then(() => {
            timer = null;
            this.blockingCount -= 1;
          });
        }, this.debouncingTime);
      };
    },
    onDeleteCartItem(item) {
      this.pushConfirm('刪除商品', '確定刪除商品？', this.deleteCartItem.bind(this, item));
    },
    deleteCartItem(item) {
      this.$loading.show();

      const params = { id: item.id };

      const onSuccess = () => {
        this.emit('update-item-count');
      };

      const onFailure = (res) => {
        this.pushMessageFailure(res.message);
      };

      return this.sendRequest('deleteCartItem', params, null, onSuccess, onFailure)
        .finally(this.$loading.hide)
        .finally(this.getCart);
    },
    onDeleteCart() {
      this.pushConfirm('刪除所有商品', '確定刪除所有商品？', this.deleteCart.bind(this));
    },
    deleteCart() {
      this.$loading.show();

      const onSuccess = () => {
        this.emit('update-item-count');
      };

      const onFailure = (res) => {
        this.pushMessageFailure(res.message);
      };

      return this.sendRequest('deleteCart', null, null, onSuccess, onFailure)
        .finally(this.$loading.hide)
        .finally(this.getCart);
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
    getRecommend(id) {
      this.$loading.show();

      const params = { id };

      const onSuccess = (res) => {
        this.recommends.push(res.product);
      };

      return this.sendRequest('getProduct', params, null, onSuccess, null).finally(
        this.$loading.hide,
      );
    },
  },
  created() {
    Promise.all([
      this.getCart(),
      this.getRecommend('-MfcVcR4ukcSSM77011s'),
      this.getRecommend('-MfcVb5MXu5GHb2WuWWp'),
      this.getRecommend('-MfcVa6OCPiduvMx5s9C'),
    ]).then(() => {
      this.isInitialized = true;
    });
  },
};
</script>
