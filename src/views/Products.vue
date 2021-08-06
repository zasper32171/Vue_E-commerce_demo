<template>
  <div class="min-vh-100 py-7">
    <div class="text-center">
      <h2 class="mb-0 lh-1">系列酒藏</h2>
      <img class="mw-100" src="@/assets/decs/title-dec.png" />
    </div>
    <div class="container">
      <div class="col-lg-11 col mx-auto mt-lg-5 mb-lg-6 my-4">
        <div class="row align-items-center">
          <div class="col d-xl-flex d-none"></div>
          <div class="col-auto row gx-2 d-xl-flex d-none">
            <div v-for="filter in filters" :key="filter" class="col">
              <select class="form-select indicator-left" v-model="filter.value">
                <option v-for="option in filter.options" :key="option" v-html="option.content"
                  :value="option.value"></option>
              </select>
            </div>
          </div>
          <div class="col d-flex align-items-center justify-content-end">
            <div>
              <div class="input-group input-group-sm justify-content-end">
                <button class="btn" type="button" data-bs-toggle="collapse"
                  data-bs-target="#input-search">
                  <img src="@/assets/icons/loupe-light.svg" width="20" />
                </button>
                <input id="input-search" class="form-control input-underline shadow-none collapse"
                  :class="{show: search}" type="text" v-model.lazy="search" />
              </div>
            </div>
            <div>
              <button class="btn d-xl-none" type="button" data-bs-toggle="collapse"
                data-bs-target="#filters">
                <img src="@/assets/icons/filter-light.svg" width="20" />
              </button>
            </div>
            <div class="dropdown">
              <button class="btn" type="button" data-bs-toggle="dropdown">
                <img src="@/assets/icons/sort-light.svg" width="20" />
              </button>
              <ul class="dropdown-menu dropdown-menu-dark">
                <li v-for="(option, index) in sort.options" :key="index">
                  <button class="dropdown-item ls-sm" :class="{active: index === sort.value}"
                    type="button" @click="sort.value = index">{{ option.name }}</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div id="filters" class="d-xl-none row row-cols-sm-4 row-cols-2 g-2 mb-4 collapse">
          <div v-for="filter in filters" :key="filter" class="col">
            <select class="form-select indicator-left" v-model="filter.value">
              <option v-for="option in filter.options" :key="option" v-html="option.content"
                :value="option.value"></option>
            </select>
          </div>
        </div>
      </div>
      <div class="col-lg-11 col mx-auto">
        <div class="container">
          <div class="row row-cols-xl-4 row-cols-md-3 row-cols-2 gx-md-7 gx-5 gy-sm-6 gy-5">
            <div v-for="product in displayed" :key="product.id"
              class="col d-flex flex-column lh-sm">
              <div class="d-flex flex-column" :ref="(el) => {if (el) pushSizeSyncEl(el);}">
                <div class="position-relative w-100 my-auto">
                  <img class="w-100" :src="product.imageUrl" />
                  <div class="cover-parent overlay-dark hover d-sm-flex d-none align-items-center">
                    <div class="d-flex flex-column mx-auto">
                      <router-link :to="`/product/${product.id}`">
                        <button class="btn btn-sm btn-decorative w-100" type="button">瞭解更多</button>
                      </router-link>
                      <div class="mt-3">
                        <button class="btn btn-sm btn-decorative" type="button"
                          data-bs-toggle="modal" data-bs-target="#product-modal"
                          @click="showModal(product)">
                          加入購物車
                        </button>
                      </div>
                    </div>
                  </div>
                  <router-link class="d-sm-none stretched-link" :to="`/product/${product.id}`" />
                </div>
              </div>
              <router-link class="fs-8 fw-bold ls-sm text-center text-uppercase pt-3
                  text-light text-decoration-none text-truncate truncate-multi-line"
                :to="`/product/${product.id}`">
                {{ product.subtitle }}
              </router-link>
              <router-link class="fs-6 ls-sm text-center pt-1 my-auto
                  text-light text-decoration-none" :to="`/product/${product.id}`">
                {{ product.title }}
              </router-link>
              <div class="ls-sm text-center">
                <span class="fs-5 fw-bold text-primary">{{ $helper.currency(product.price) }}</span>
                <span class="fs-6 fw-bold text-primary">/{{ product.unit }}&ensp;</span>
                <span class="fs-7 text-primary text-decoration-line-through">
                  {{ $helper.currency(product.origin_price) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <template v-if="!loading">
      <Pagination v-if="filtered.length" class="mt-6" :pages="pagination"
        @updatePage="updatePage" />
      <div v-else class="text-center fw-medium mt-8">沒有符合條件的商品</div>
    </template>
  </div>
  <ProductModal id="product-modal" :product="modalItem" @submit-cart-item="addCartItem" />
</template>

<script>
import RequestSenderMixin from '@/mixins/RequestSenderMixin';
import { TransmitterMixin, MessageTransmitterMixin } from '@/mixins/MessageTransMixins';
import SizeSynchronizer from '@/mixins/SizeSynchronizerMixin';

import ProductModal from '@/components/ProductModal.vue';
import Pagination from '@/components/Pagination.vue';

export default {
  name: 'Products',
  mixins: [RequestSenderMixin, TransmitterMixin, MessageTransmitterMixin, SizeSynchronizer],
  components: { ProductModal, Pagination },
  data() {
    return {
      products: [],
      modalItem: this.defaultProduct(),

      search: '',
      filters: [
        {
          name: 'type',
          value: '',
          options: [
            { content: '所有類別', value: '' },
            { content: '威士忌', value: '威士忌' },
            { content: '琴酒', value: '琴酒' },
          ],
          func(product) {
            return product.category.includes(this.value);
          },
        },
        {
          name: 'materials',
          value: '',
          options: [
            { content: '所有原料&emsp;&emsp;', value: '' },
            { content: '單一麥芽', value: '單一麥芽' },
            { content: '調和麥芽', value: '調和麥芽' },
            { content: '穀物威士忌', value: '穀物威士忌' },
            { content: '調和威士忌', value: '調和威士忌' },
            { content: '裸麥威士忌', value: '裸麥威士忌' },
            { content: '原桶強度', value: '原桶強度' },
            { content: '原桶酒', value: '原桶酒' },
            { content: '波本威士忌', value: '波本威士忌' },
            { content: '田納西威士忌', value: '田納西威士忌' },
          ],
          func(product) {
            return product.category.includes(this.value);
          },
        },
        {
          name: 'region',
          value: '',
          options: [
            { content: '所有產區', value: '' },
            { content: '蘇格蘭', value: '蘇格蘭' },
            { content: '愛爾蘭', value: '愛爾蘭' },
            { content: '美國', value: '美國' },
            { content: '日本', value: '日本' },
            { content: '英國', value: '英國' },
            { content: '法國', value: '法國' },
            { content: '德國', value: '德國' },
            { content: '瑞典', value: '瑞典' },
          ],
          func(product) {
            return product.category.includes(this.value);
          },
        },
        {
          name: 'price',
          value: [],
          options: [
            { content: '不限價格', value: [] },
            { content: '500元以下', value: [0, 499] },
            { content: '500~999元', value: [500, 999] },
            { content: '1000~1999元', value: [1000, 1999] },
            { content: '2000元以上', value: [2000] },
          ],
          func(product) {
            return (
              (!this.value[0] || product.price >= this.value[0])
              && (!this.value[1] || product.price <= this.value[1])
            );
          },
        },
      ],
      sort: {
        options: [
          { name: '上架時間', func: () => false },
          { name: '價格低至高', func: (p, q) => p.price - q.price },
          { name: '價格高至低', func: (p, q) => q.price - p.price },
        ],
        value: 0,
      },

      page: 1,
      itemsPerPage: 12,
      loading: true,
    };
  },
  computed: {
    filtered() {
      return this.products
        .filter((product) => Object.values(this.filters).every((filter) => filter.func(product)))
        .filter(
          (product) => product.title.match(new RegExp(this.search, 'i'))
            || product.subtitle.match(new RegExp(this.search, 'i')),
        )
        .sort(this.sort.options[this.sort.value].func);
    },
    displayed() {
      return this.filtered.slice(
        (this.page - 1) * this.itemsPerPage,
        this.page * this.itemsPerPage,
      );
    },
    pagination() {
      return {
        current_page: this.page,
        total_pages: Math.ceil(this.filtered.length / this.itemsPerPage),
        has_prev: this.page > 1,
        has_next: this.page < Math.ceil(this.filtered.length / this.itemsPerPage),
      };
    },
  },
  watch: {
    search() {
      this.page = 1;
    },
    filters: {
      handler() {
        this.page = 1;
      },
      deep: true,
    },
    sort() {
      this.page = 1;
    },
    displayed() {
      this.removeAllSizeSyncEls();
    },
  },
  methods: {
    parseQuery(query) {
      if ('search' in query) {
        this.search = query.search;
      }

      if ('sort' in query && !Number.isNaN(query.sort)) {
        this.sort.value = parseInt(query.sort, 10);
      }

      if ('page' in query && !Number.isNaN(query.page)) {
        this.page = parseInt(query.page, 10);
      }

      this.filters.forEach((filter) => {
        // eslint-disable-next-line no-param-reassign
        if (filter.name in query) filter.value = query[filter.name];
      });
    },
    defaultProduct() {
      return { info: {}, content: {}, qty: 1 };
    },
    showModal(product) {
      this.modalItem = { ...product, qty: 1 };
    },
    getAllProducts() {
      this.$loading.show();

      const onSuccess = (res) => {
        this.products = res.products;
      };

      const onFailure = (res) => {
        console.error('取得失敗: ', res.messages.join('、'));
      };

      return this.sendRequest('getProductsAll', null, null, onSuccess, onFailure).finally(
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
    updatePage(page) {
      this.page = page;
      window.scrollTo(0, 0);
    },
  },
  created() {
    this.parseQuery(this.$route.query);

    this.getAllProducts().then(() => {
      this.loading = false;
    });
  },
};
</script>

<style lang="scss" scoped>
#input-search {
  &.collapse.show {
    transition: flex-grow 0.35s ease;
  }

  &.collapsing {
    height: auto !important;
    flex-grow: 0;
    transition: flex-grow 0.35s ease;
  }
}
</style>
