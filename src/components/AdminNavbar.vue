<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark">
    <div class="container-fluid">
      <div class="navbar-brand">
        <router-link class="nav-link text-light p-0" to="/">Golden Ronny</router-link>
      </div>
      <div class="collapse navbar-collapse">
        <div class="navbar-nav me-auto mb-2 mb-lg-0">
          <router-link class="nav-link" to="/admin/products">產品管理</router-link>
          <router-link class="nav-link" to="/admin/orders">訂單管理</router-link>
          <router-link class="nav-link" to="/admin/coupons">優惠券管理</router-link>
          <router-link class="nav-link" to="/admin/articles">酒譜管理</router-link>
        </div>
        <button class="btn text-light ms-auto" type="button" @click="logout">登出</button>
      </div>
    </div>
  </nav>
</template>

<script>
import RequestSenderMixin from '@/mixins/RequestSenderMixin';
import { MessageTransmitterMixin } from '@/mixins/MessageTransMixins';

export default {
  name: 'AdminNavbar',
  mixins: [RequestSenderMixin, MessageTransmitterMixin],
  methods: {
    logout() {
      const onSuccess = () => {
        this.$router.push({ path: '/login' });
      };

      const onFailure = (res) => {
        this.pushMessageFailure('登出失敗', res.message);
      };

      this.sendRequest('logout', null, null, onSuccess, onFailure);
    },
  },
};
</script>
