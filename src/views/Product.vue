<template>
  <div class="min-vh-100 py-7">
    <div class="container">
      <section class="row mt-lg-6">
        <div class="col-lg-3 col align-self-center">
          <div class="mx-lg-0 mx-sm-7 mx-5 my-lg-0 mb-5">
            <img class="w-100" :src="product.imageUrl">
          </div>
        </div>
        <div class="offset-lg-1 col-lg-8 align-self-start">
          <div class="row align-items-end border-bottom border-primary pb-sm-4 pb-1">
            <div class="col-sm">
              <h6 class="text-uppercase">{{ product.subtitle }}</h6>
              <h2 class="mb-0">{{ product.title }}</h2>
            </div>
            <div class="col-auto">
              <table class="font-sans fs-7 lh-sm ls-sm text-primary d-sm-block d-none">
                <tr v-if="product.info.vintage">
                  <td class="text-end">年份：</td>
                  <td>{{ product.info.vintage }}年</td>
                </tr>
                <tr>
                  <td class="text-end">酒精濃度：</td>
                  <td>{{ product.info.abv }}％</td>
                </tr>
                <tr>
                  <td class=" text-end">容量：</td>
                  <td>{{ product.info.volume }}</td>
                </tr>
              </table>
              <div class="d-sm-none d-block mt-3">
                <p class="font-sanse fs-7 lh-sm ls-sm text-primary">
                  <span v-if="product.info.vintage">{{ product.info.vintage }}年 /</span>
                  {{ product.info.abv }}％ / {{ product.info.volume }}
                </p>
              </div>
            </div>
          </div>
          <div class="border-bottom border-primary mt-4 pt-2 pb-3">
            <div class="mb-4">
              <p class="font-sans fw-light ls-sm"
                v-html="$helper.preserveBreak(product.content.main)"></p>
            </div>
            <div class="row text-center lh-base gx-2 gx-sm-1">
              <div class="col">
                <h4>香氣</h4>
                <p class="font-sans fs-7 fw-light ls-sm">{{ product.content.nose }}</p>
              </div>
              <div class="col">
                <h4>口感</h4>
                <p class="font-sans fs-7 fw-light ls-sm">{{ product.content.palate }}</p>
              </div>
              <div class="col">
                <h4>餘韻</h4>
                <p class="font-sans fs-7 fw-light ls-sm">{{ product.content.finish }}</p>
              </div>
            </div>
          </div>
          <div class="row align-items-start pt-4 gy-3">
            <div class="col-md-auto me-3">
              <span class="fs-5 text-primary">售價：</span>
              <span class="fs-3 text-primary">
                {{ $helper.currency(product.price) }}
              </span>
              <span class="fs-6 fw-bold text-primary">/{{ product.unit }}&nbsp;</span>
              <span class="fs-5 text-decoration-line-through">
                {{ $helper.currency(product.origin_price) }}
              </span>
            </div>
            <div class="col d-flex justify-content-md-end justify-content-between">
              <Counter class="counter-lg flex-grow-1" v-model:value="product.qty" />
              <button class="btn btn-primary ms-4" type="btn"
                @click="addCartItem(product)">加入購物車</button>
            </div>
          </div>
        </div>
      </section>
      <section class="mt-8">
        <div class="text-center col-8 mx-auto">
          <h3 class="mb-0 lh-1">精選推薦</h3>
          <img class="mw-100" src="@/assets/decs/title-dec-sm.png">
        </div>
        <div class="col-md-9 mx-auto">
          <div class="row row-cols-sm-3 row-cols-2 align-items-center gx-xl-7 gx-sm-5 gy-4 mt-5">
            <div v-for="recommend in recommends" :key="recommend" class="col">
              <div class="position-relative">
                <img class="w-100" :src="recommend.imageUrl">
                <div class="cover-parent overlay-dark hover text-center lh-sm ls-sm d-flex
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
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import RequestSenderMixin from '@/mixins/RequestSenderMixin';
import { TransmitterMixin, MessageTransmitterMixin } from '@/mixins/MessageTransMixins';
import SizeSynchronizer from '@/mixins/SizeSynchronizerMixin';

import Counter from '@/components/Counter.vue';

export default {
  name: 'Product',
  mixins: [RequestSenderMixin, TransmitterMixin, MessageTransmitterMixin, SizeSynchronizer],
  components: { Counter },
  data() {
    return {
      product: this.defaultProduct(),
      recommends: [],
    };
  },
  methods: {
    defaultProduct() {
      return { info: {}, content: {}, qty: 1 };
    },
    getProduct(id) {
      this.$loading.show();

      const params = { id };

      const onSuccess = (res) => {
        this.product = res.product;
        this.product.qty = 1;
      };

      const onFailure = (res) => {
        console.error('取得失敗: ', res.message);
        this.$router.push('/products');
      };

      return this.sendRequest('getProduct', params, null, onSuccess, onFailure).finally(
        this.$loading.hide,
      );
    },
    getRecommend(id) {
      this.$loading.show();

      const params = { id };

      const onSuccess = (res) => {
        this.recommends.push(res.product);
      };

      const onFailure = (res) => {
        console.error('取得失敗: ', res.message);
      };

      return this.sendRequest('getProduct', params, null, onSuccess, onFailure).finally(
        this.$loading.hide,
      );
    },
    addCartItem(product) {
      this.$loading.show();

      const data = { data: { product_id: product.id, qty: product.qty } };

      const onSuccess = (res) => {
        this.pushMessageSuccess(res.message);
        this.product.qty = 1;
        this.emit('update-item-count');
      };

      const onFailure = (res) => {
        this.pushMessageFailure(res.message);
      };

      return this.sendRequest('addCartItem', null, data, onSuccess, onFailure).finally(
        this.$loading.hide,
      );
    },
  },
  created() {
    // prettier-ignore
    this.getProduct(this.$route.params.id).then(() => Promise.all([
      ...this.product.recommends.map((id) => this.getRecommend(id)),
    ]));
  },
};
</script>
