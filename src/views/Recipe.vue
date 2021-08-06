<template>
  <div class="min-vh-100 py-7">
    <div class="container">
      <section class="row justify-content-center mt-lg-6">
        <div class="col-xl-3 col-lg-4 col-md-5 align-self-center">
          <div class="mx-md-0 mx-4">
            <img class="w-100" :src="recipe.imageUrl">
          </div>
        </div>
        <div class="offset-lg-1 col-lg-6 col-md-7">
          <div class="border-bottom border-primary pb-3 mt-md-0 mt-5">
            <h2>{{ recipe.title }} {{ recipe.subtitle }}</h2>
          </div>
          <table class="w-100 mt-5">
            <tr class="align-top">
              <td class="fw-bold text-nowrap text-primary pe-4 pb-4">材料</td>
              <td class="ls-sm pb-4">
                <table class="w-100">
                  <tr v-for="ingredient in recipe.content.ingredients" :key="ingredient"
                    class="align-top">
                    <td>{{ ingredient.name }}</td>
                    <td class="text-end pe-3" v-html="$helper.preventWrap(ingredient.amount)">
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr class="align-top pt-4">
              <td class="fw-bold text-nowrap text-primary pe-4">作法</td>
              <td class="ls-sm">
                <ol>
                  <li v-for="step in recipe.content.steps" :key="step">{{ step }}</li>
                </ol>
              </td>
            </tr>
          </table>
        </div>
      </section>
      <section class="mt-8">
        <div class="text-center col-8 mx-auto">
          <h3 class="mb-0 lh-1">相關商品</h3>
          <img class="mw-100" src="@/assets/decs/title-dec-sm.png">
        </div>
        <div class="row justify-content-center gx-lg-5 my-6">
          <div class="col-xl-3 col-lg-4 col-md-5 align-self-center">
            <div class="mx-md-0 mx-sm-7 mx-4">
              <img class="w-100" :src="related.imageUrl">
            </div>
          </div>
          <div class="col-xl-4 col-lg-5 col-md-7">
            <div class="text-md-start text-center mt-md-0 mt-5">
              <h6 class="text-uppercase">{{ related.subtitle }}</h6>
              <h3>{{ related.title }}</h3>
            </div>
            <div class="mt-4 mx-md-0 mx-sm-5 mx-4">
              <p class="text-justify font-sans fw-light ls-sm text-truncate truncate-multi-line"
                style="-webkit-line-clamp: 5">
                {{ related.content.main }}
              </p>
            </div>
            <div class="d-md-flex d-none justify-content-evenly mt-4">
              <router-link :to="`/product/${related.id}`">
                <button class="btn btn-decorative" type="button">瞭解更多</button>
              </router-link>
              <button class="btn btn-decorative" type="button" data-bs-toggle="modal"
                data-bs-target="#product-modal" @click="showModal(related)">加入購物車</button>
            </div>
            <div class="d-md-none d-flex justify-content-center mt-4">
              <router-link :to="`/product/${related.id}`">
                <button class="btn btn-sm btn-decorative" type="button">瞭解更多</button>
              </router-link>
              <button class="btn btn-sm btn-decorative ms-sm-6 ms-4" type="button"
                data-bs-toggle="modal" data-bs-target="#product-modal"
                @click="showModal(related)">加入購物車</button>
            </div>
          </div>
        </div>
      </section>
      <section class="mt-8">
        <div class="text-center col-8 mx-auto">
          <h3 class="mb-0 lh-1">其他酒譜</h3>
          <img class="mw-100" src="@/assets/decs/title-dec-sm.png">
        </div>
        <div class="row">
          <div class="col-xl-9 col-lg-10 mx-auto mt-6">
            <div class="row gx-xl-7 gx-md-5 gx-sm-3 align-items-center">
              <div v-for="recipe in recommends" :key="recipe" class="col-md">
                <div class="position-relative mb-3">
                  <img class="w-100" :src="recipe.imageUrl">
                  <div class="cover-parent overlay hover
                      d-flex flex-column text-center justify-content-center">
                    <div class="fs-7 fly-in-top">{{ recipe.subtitle }}</div>
                    <div class="fs-5 mb-2">{{ recipe.title }}</div>
                    <router-link class="fly-in-down" :to="`/recipe/${recipe.id}`">
                      <button class="btn btn-sm btn-decorative">查看酒譜</button>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
  <ProductModal id="product-modal" :product="modalItem" @submit-cart-item="addCartItem" />
</template>

<script>
import RequestSenderMixin from '@/mixins/RequestSenderMixin';
import { TransmitterMixin, MessageTransmitterMixin } from '@/mixins/MessageTransMixins';

import ProductModal from '@/components/ProductModal.vue';

export default {
  name: 'Recipe',
  mixins: [RequestSenderMixin, TransmitterMixin, MessageTransmitterMixin],
  components: { ProductModal },
  data() {
    return {
      recipe: this.defaultRecipe(),
      related: this.defaultProduct(),
      recommends: [],
      modalItem: this.defaultProduct(),
    };
  },
  methods: {
    defaultRecipe() {
      return {
        content: { ingredients: [{}], steps: [] },
      };
    },
    defaultProduct() {
      return { info: {}, content: {}, qty: 1 };
    },
    showModal(product) {
      this.modalItem = { ...product, qty: 1 };
    },
    getRecipe(id) {
      this.$loading.show();

      const params = { id };

      const onSuccess = (res) => {
        this.recipe = res.article;
      };

      const onFailure = (res) => {
        console.error('取得失敗: ', res.message);
        this.$router.push('/recipes');
      };

      return this.sendRequest('getArticle', params, null, onSuccess, onFailure).finally(
        this.$loading.hide,
      );
    },
    getRelated(id) {
      this.$loading.show();

      const params = { id };

      const onSuccess = (res) => {
        this.related = res.product;
      };

      const onFailure = (res) => {
        console.error('取得失敗: ', res.message);
      };

      return this.sendRequest('getProduct', params, null, onSuccess, onFailure).finally(
        this.$loading.hide,
      );
    },
    getRecommend(id) {
      this.$loading.show();

      const params = { id };

      const onSuccess = (res) => {
        this.recommends.push(res.article);
      };

      const onFailure = (res) => {
        console.error('取得失敗: ', res.message);
      };

      return this.sendRequest('getArticle', params, null, onSuccess, onFailure).finally(
        this.$loading.hide,
      );
    },
    addCartItem(product) {
      this.$loading.show();

      const data = { data: { product_id: product.id, qty: product.qty } };

      const onSuccess = (res) => {
        this.pushMessageSuccess(res.message);
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
    this.getRecipe(this.$route.params.id).then(() => Promise.all([
      this.getRelated(this.recipe.related),
      ...this.recipe.recommends.map((id) => this.getRecommend(id)),
    ]));
  },
};
</script>
