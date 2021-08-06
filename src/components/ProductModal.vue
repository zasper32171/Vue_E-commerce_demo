<template>
  <div class="modal fade" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content bg-gray-dark p-sm-3 p-1">
        <button class="ms-auto btn-close text-light" type="button" data-bs-dismiss="modal" />
        <div class="text-center pb-sm-3 pb-2 px-sm-4 px-2">
          <div class="mb-4">
            <h6 class="fw-bold fs-7 text-uppercase">{{ tempProduct.subtitle }}</h6>
            <h4>{{ tempProduct.title }}</h4>
          </div>
          <div class="container">
            <div class="row text-center">
              <img class="col-md-8 col-sm-8 col-9 mx-auto" :src="tempProduct.imageUrl">
            </div>
          </div>
          <div class="ls-sm">
            <span class="fs-3 fw-bold text-primary">
              {{ $helper.currency(tempProduct.price) }}
            </span>
            <span class="fw-bold text-primary">
              / {{ tempProduct.unit }}&nbsp;
            </span>
            <span class="fs-6 text-decoration-line-through">
              {{ $helper.currency(tempProduct.origin_price) }}
            </span>
          </div>
          <Counter class="counter-lg w-100" fixed v-model:value="tempProduct.qty" />
          <button class="btn btn-primary w-100" type="button" data-bs-dismiss="modal"
            @click="submitCartItem">加入購物車</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Counter from '@/components/Counter.vue';

export default {
  name: 'ProductModal',
  components: { Counter },
  emits: ['submit-cart-item'],
  props: {
    product: {
      type: Object,
      defualt: () => {},
    },
  },
  data() {
    return {
      tempProduct: JSON.parse(JSON.stringify(this.product)),
    };
  },
  watch: {
    product() {
      this.tempProduct = JSON.parse(JSON.stringify(this.product));
    },
  },
  methods: {
    submitCartItem() {
      this.$emit('submit-cart-item', this.tempProduct);
    },
  },
};
</script>
