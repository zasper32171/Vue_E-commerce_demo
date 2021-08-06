<template>
  <div>
    <div class="container-fluid">
      <div class="text-end mt-2">
        <button class="btn btn-primary mt-4 me-3" type="button" data-bs-toggle="modal"
          data-bs-target="#dashboard-modal" @click="showModal()">建立產品</button>
      </div>
      <table class="table align-middle my-4">
        <thead>
          <tr>
            <th width="200">分類</th>
            <th>標題</th>
            <th>副標題</th>
            <th class="text-center" width="120">原價</th>
            <th class="text-center" width="120">售價</th>
            <th class="text-center" width="120">是否啟用</th>
            <th class="text-center" width="120">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td>{{ product.category }}</td>
            <td class="overflow-hidden">{{ product.title }}</td>
            <td class="overflow-hidden">{{ product.subtitle }}</td>
            <td class="text-end pe-5">{{ $helper.currency(product.origin_price) }}</td>
            <td class="text-end pe-5">{{ $helper.currency(product.price) }}</td>
            <td class="text-center">
              <span v-if="product.is_enabled" class="text-success">啟用</span>
              <span v-else class="text-muted">未啟用</span>
            </td>
            <td class="text-center">
              <div class="btn-group">
                <button class="btn btn-outline-primary btn-sm" data-bs-toggle="modal"
                  data-bs-target="#dashboard-modal" @click="showModal(product)">編輯</button>
                <button class="btn btn-outline-danger btn-sm" @click="deleteProduct(product)">
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <Pagination :pages="pagination" @updatePage="getProducts" />
    </div>
    <ProductModal id="dashboard-modal" :product="modalItem" @submit-product="addOrUpdateProduct" />
  </div>
</template>

<script>
import RequestSenderMixin from '@/mixins/RequestSenderMixin';
import { MessageTransmitterMixin } from '@/mixins/MessageTransMixins';

import ProductModal from '@/components/AdminProductModal.vue';
import Pagination from '@/components/Pagination.vue';

export default {
  name: 'AdminProducts',
  mixins: [RequestSenderMixin, MessageTransmitterMixin],
  components: { ProductModal, Pagination },
  data() {
    return {
      products: [],
      pagination: {},
      modalItem: this.defaultProduct(),
    };
  },
  methods: {
    defaultProduct() {
      return { info: {}, content: {} };
    },
    showModal(product) {
      this.modalItem = product || this.defaultProduct();
    },
    getProducts(page = 1) {
      this.$loading.show();

      const params = { page };

      const onSuccess = (res) => {
        this.products = res.products;
        this.pagination = res.pagination;
      };

      const onFailure = (res) => {
        this.pushMessageFailure('取得失敗', res.messages.join('、'));
      };

      return this.sendRequest('getProductsAdmin', params, null, onSuccess, onFailure).finally(
        this.$loading.hide,
      );
    },
    addOrUpdateProduct(product) {
      if (!product.id) {
        this.addProduct(product);
      } else {
        this.updateProduct(product);
      }
    },
    addProduct(product) {
      this.$loading.show();

      const data = { data: product };

      const onSuccess = (res) => {
        this.pushMessageSuccess('新增成功', res.message);
      };

      const onFailure = (res) => {
        this.pushMessageFailure('新增失敗', res.message);
      };

      return this.sendRequest('addProductAdmin', null, data, onSuccess, onFailure)
        .finally(this.$loading.hide)
        .finally(this.getProducts);
    },
    updateProduct(product) {
      this.$loading.show();

      const params = { id: product.id };
      const data = { data: product };

      const onSuccess = (res) => {
        this.pushMessageSuccess('更新成功', res.message);
      };

      const onFailure = (res) => {
        this.pushMessageFailure('更新失敗', res.message);
      };

      return this.sendRequest('updateProductAdmin', params, data, onSuccess, onFailure)
        .finally(this.$loading.hide)
        .finally(() => {
          this.getProducts(this.pagination.current_page);
        });
    },
    deleteProduct(product) {
      // eslint-disable-next-line no-alert
      if (!window.confirm('確定刪除產品？')) return Promise.reject();

      this.$loading.show();

      const params = { id: product.id };

      const onSuccess = (res) => {
        this.pushMessageSuccess('刪除成功', res.message);
      };

      const onFailure = (res) => {
        this.pushMessageFailure('刪除失敗', res.message);
      };

      return this.sendRequest('deleteProductAdmin', params, null, onSuccess, onFailure)
        .finally(this.$loading.hide)
        .finally(() => {
          this.getProducts(this.pagination.current_page);
        });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
