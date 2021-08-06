<template>
  <nav class="navbar navbar-expand-lg fixed-top pb-3 navbar-dark">
    <div class="container-fluid">
      <router-link class="navbar-brand text-reset py-0" to="/" @click="collapse.hide()">
        <img src="@/assets/logo.png">
      </router-link>
      <router-link class="icon text-reset ms-auto p-sm-2 p-1 order-lg-1" to="/login"
        @click="collapse.hide()">
        <img src="@/assets/icons/user-light.svg">
      </router-link>
      <router-link class="icon position-relative text-reset p-sm-2 p-1 order-lg-1" to="/cart"
        @click="collapse.hide()">
        <img src="@/assets/icons/cart-light.svg">
        <span v-if="itemCount !==0"
          class="position-absolute top-0 end-0 badge rounded-pill bg-danger font-sans">
          {{ itemCount }}
        </span>
      </router-link>
      <button class="navbar-toggler p-sm-2 p-1" type="button" @click="collapse.toggle()">
        <span class="navbar-toggler-icon" />
      </button>
      <div class="collapse navbar-collapse text-center" ref="collapse">
        <div class="navbar-nav ms-3">
          <router-link v-for="route in routes" :key="route" class="nav-link" :to="route.href"
            @click="collapse.hide()">
            {{ route.text }}
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { Collapse } from 'bootstrap';

import RequestSenderMixin from '@/mixins/RequestSenderMixin';
import { ReceiverMixin } from '@/mixins/MessageTransMixins';

export default {
  name: 'MainNavbar',
  mixins: [RequestSenderMixin, ReceiverMixin],
  props: {
    routes: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      collapse: {},
      itemCount: 0,
    };
  },
  methods: {
    getCartItemNum() {
      const onSuccess = (res) => {
        this.itemCount = res.data.carts.length;
      };

      const onFailure = (res) => {
        console.error('取得失敗: ', res.messages.join('、'));
      };

      return this.sendRequest('getCart', null, null, onSuccess, onFailure);
    },
  },
  created() {
    this.initReceiver('update-item-count', this.getCartItemNum);
    this.getCartItemNum();
  },
  mounted() {
    this.collapse = new Collapse(this.$refs.collapse, { toggle: false });
  },
};
</script>

<style lang="scss" scoped>
@import '~bootstrap/scss/_functions';
@import '@/styles/custom/_variables';

.navbar {
  background-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 0) 0px,
    rgba(0, 0, 0, 0.1) 5px,
    rgba(0, 0, 0, 0.25) 10px,
    rgba(0, 0, 0, 0.45) 16px,
    rgba(0, 0, 0, 0.65) 24px,
    rgba(0, 0, 0, 0.75) 32px,
    rgba(0, 0, 0, 0.85) 100%
  );
}

.nav-link:hover,
.nav-link:focus {
  transform: translateY(-2px);
  transition: transform 0.2s ease, color 0.2s ease;
}

.navbar-brand img {
  height: 48px;
}

.icon {
  img {
    width: 28px;
  }

  .badge {
    transform: translate(20%, -20%);
  }
}

@media only screen and (max-width: #{map-get($grid-breakpoints, 'sm')}) {
  .navbar-brand img {
    height: 32px;
  }

  .icon img {
    width: 20px;
  }

  .navbar-toggler-icon {
    width: 26px;
  }

  .badge {
    font-size: 0.5rem;
  }
}
</style>
