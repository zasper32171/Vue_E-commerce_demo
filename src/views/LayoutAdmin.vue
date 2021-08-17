<template>
  <div>
    <Navbar />
    <router-view v-if="isChecked" />
    <Dialog />
    <ToastList class="position-absolute bottom-0 end-0 mb-4 me-4" type="admin" />
  </div>
</template>

<script>
import RequestSenderMixin from '@/mixins/RequestSenderMixin';
import CookieAccessMixin from '@/mixins/CookieAccessMixin';
import { RouterMixin, DialogTransmitterMixin } from '@/mixins/MessageTransMixins';

import Navbar from '@/components/AdminNavbar.vue';
import Dialog from '@/components/AdminDialog.vue';
import ToastList from '@/components/ToastList.vue';

export default {
  name: 'LayoutAdmin',
  mixins: [RequestSenderMixin, CookieAccessMixin, RouterMixin, DialogTransmitterMixin],
  components: { Navbar, Dialog, ToastList },
  data() {
    return {
      isChecked: false,
    };
  },
  methods: {
    checkLogin() {
      const onSuccess = () => {
        this.isChecked = true;
      };

      const onFailure = (res) => {
        this.pushAlert('驗證失敗', res.message, () => {
          this.$router.push({ path: '/login' });
        });
      };

      this.sendRequest('checkLogin', null, null, onSuccess, onFailure);
    },
  },
  created() {
    const token = this.getCookie('token');
    this.setRequestAuth(token);
    this.checkLogin();
  },
  beforeRouteEnter() {
    document.documentElement.classList.add('theme-default');
  },
  beforeRouteLeave() {
    document.documentElement.classList.remove('theme-default');
  },
};
</script>

<style lang="scss">
// Caveats: 1. root vars not injected
//          2. variables with null value in variables.scss will not override
@import '~bootstrap/scss/_functions';
@import '~bootstrap/scss/_variables';
@import '@/assets/scss/patch/_root';

:root.theme-default {
  @import '~bootstrap/scss/bootstrap';

  // Inject root vars manually...
  @extend %root;

  body {
    letter-spacing: 0;
  }
}
</style>
