<template>
  <div>
    <Navbar />
    <router-view v-if="!checking" />
    <ToastList class="position-absolute bottom-0 end-0 mb-4 me-4" />
  </div>
</template>

<script>
import RequestSenderMixin from '@/mixins/RequestSenderMixin';
import CookieAccessMixin from '@/mixins/CookieAccessMixin';
import { RouterMixin } from '@/mixins/MessageTransMixins';

import Navbar from '@/components/AdminNavbar.vue';
import ToastList from '@/components/ToastList.vue';

export default {
  name: 'LayoutAdmin',
  mixins: [RequestSenderMixin, CookieAccessMixin, RouterMixin],
  components: { Navbar, ToastList },
  data() {
    return {
      checking: true,
    };
  },
  methods: {
    checkLogin() {
      const onSuccess = () => {
        this.checking = false;
      };

      const onFailure = (res) => {
        // eslint-disable-next-line no-alert
        window.alert(res.message);
        this.$router.push({ path: '/login' });
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
@import '@/styles/patch/_root';

:root.theme-default {
  @import '~bootstrap/scss/bootstrap';

  // Inject root variables manually...
  @extend %root;

  body {
    letter-spacing: 0;
  }
}
</style>
