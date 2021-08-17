<template>
  <section class="min-vh-100 d-flex flex-column bg-cover bg-center"
    :style="{backgroundImage: `url(${require('@/assets/images/login-bg.jpg')})`}">>
    <div class="container my-auto">
      <div class="row justify-content-center align-items-center py-5">
        <div class="col-xl-5 col-lg-6 col-md-8 col px-2">
          <Form class="overlay-dark ls-sm px-sm-5 px-4 pt-4 pb-2" @submit="login">
            <h3 class="text-center mt-1 mb-0">會員登入</h3>
            <div class="form-group mb-2">
              <label for="input-email">帳號</label>
              <ErrorMessage name="帳號" class="float-end fs-7 text-danger mt-1" />
              <Field id="input-email" name="帳號" class="form-control" type="email"
                placeholder="請輸入信箱" rules="required|email" v-model="userInfo.username" autofocus />
            </div>
            <div class="form-group mb-2">
              <label for="input-password">密碼</label>
              <ErrorMessage name="密碼" class="float-end fs-7 text-danger mt-1" />
              <Field id="input-password" name="密碼" class="form-control" type="password"
                placeholder="請輸入密碼" rules="required|alpha_num|min:8|max:16"
                v-model="userInfo.password" />
            </div>
            <div class="d-flex mb-3">
              <div class="form-group form-check lh-base">
                <input id="check-keep-login" class="form-check-input border-gray" type="checkbox" />
                <label class="form-check-label fs-7" for="check-keep-login">保持登入</label>
              </div>
              <router-link class="fs-7 ms-auto" to="">忘記密碼</router-link>
            </div>
            <div class="text-center mb-3">
              <button class="btn btn-primary w-100" type="submit">登入</button>
            </div>
            <div class="text-center mb-2">
              <button class="btn btn-outline-light w-100" type="button">註冊</button>
            </div>
            <p class="fs-7 lh-base">※ 註冊表示您同意 <router-link to="">服務條款</router-link> 及
              <router-link to="">隱私權政策</router-link>。
            </p>
          </Form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import RequestSenderMixin from '@/mixins/RequestSenderMixin';
import { MessageTransmitterMixin } from '@/mixins/MessageTransMixins';

import CookieAccessMixin from '@/mixins/CookieAccessMixin';

export default {
  name: 'Login',
  mixins: [RequestSenderMixin, MessageTransmitterMixin, CookieAccessMixin],
  data() {
    return {
      userInfo: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    login() {
      const onSuccess = (res) => {
        const { token, expired } = res;
        this.setCookie('token', token, new Date(expired));
        this.$router.push('/admin');
      };

      const onFailure = (res) => {
        this.pushMessageFailure(res.message);
      };

      this.sendRequest('login', {}, this.userInfo, onSuccess, onFailure);
    },
  },
};
</script>
