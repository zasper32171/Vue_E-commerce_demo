<template>
  <div class="footer bg-black">
    <div class="container mb-4 mb-lg-2">
      <div class="row row-cols-2 row-cols-lg-4">
        <nav v-for="route in routes" :key="route" class="col flex-column nav text-center pt-5">
          <h5 class="mb-3">{{ route.title }}</h5>
          <router-link v-for="link in route.links" :key="link" class="nav-link py-0"
            :to="link.href">
            {{ link.text }}
          </router-link>
        </nav>
        <div class="col text-center pt-5">
          <h5 class="mb-3">聯絡我們</h5>
          <div class="d-inline-block text-start">
            <div class="text-primary">
              <img class="mb-2 me-1" src="@/assets/icons/phone-solid.svg" alt="Tele" width="18" />
              <a class='text-reset fs-5 text-decoration-none' :href='info.tele.href'>
                {{ info.tele.text }}</a>
            </div>
            <div>
              <a v-for="medium in info.media" :key="medium" :href="medium.href" class="me-2">
                <img class="mb-2" :src="medium.img" :alt="medium.name" width="18" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="lh-sm text-center text-primary">
      <p class="fs-8 mb-1">{{ info.copyright.claim }}</p>
      <p class="fs-8 mb-2 mx-2">COPYRIGHT©{{ info.copyright.brand }} {{ new Date().getFullYear() }}
        All Rights Reserved.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FooterColumns',
  props: {
    routes: {
      type: Array,
      default: () => [],
    },
    info: {
      type: Object,
      default: () => ({
        tele: '',
        media: [],
      }),
    },
  },
};
</script>

<style lang="scss" scoped>
.footer {
  position: relative;
  &::before {
    content: '';
    position: absolute;
    height: 30px;
    width: 100%;
    top: -30px;
    background-image: linear-gradient(
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.2) 30%,
      rgba(0, 0, 0, 0.45) 50%,
      rgba(0, 0, 0, 0.65) 60%,
      rgba(0, 0, 0, 0.8) 70%,
      rgba(0, 0, 0, 0.9) 80%,
      rgba(0, 0, 0, 0.95) 90%,
      rgba(0, 0, 0, 1) 100%
    );
  }
}
</style>
