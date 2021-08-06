<template>
  <div class="footer bg-black">
    <div>
      <div class="accordion mb-3">
        <div v-for="(route, index) in routes" :key="route" class="accordion-item">
          <div class="accordion-header position-relative">
            <div class="cover-parent d-flex justify-content-center align-items-center">
              <h6 class="m-0"> {{ route.title }} </h6>
            </div>
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
              :data-bs-target="`#${id}-collapse-${index}`" />
          </div>
          <div :id="`${id}-collapse-${index}`" class="accordion-collapse collapse">
            <nav class="accordion-body text-center py-2">
              <router-link v-for="link in route.links" :key="link" class="nav-link py-1"
                :to="link.href">
                {{ link.text }}
              </router-link>
            </nav>
          </div>
        </div>
        <div class="accordion-header position-relative">
          <div class="cover-parent d-flex justify-content-center align-items-center">
            <h6 class="m-0">聯絡我們</h6>
          </div>
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
            :data-bs-target="`#${id}-collapse-contact`" />
        </div>
        <div :id="`${id}-collapse-contact`" class="accordion-collapse collapse">
          <div class="text-primary text-center my-1">
            <img class="mb- me-2" src="@/assets/icons/phone-solid.svg" width="14">
            <span class='text-reset fs-6'>{{ info.tele }}</span>
          </div>
        </div>
      </div>
      <div class="text-center mb-4">
        <a v-for="medium in info.media" :key="medium" href="medium.href" class="me-2">
          <img class="mx-2" :src="medium.img" width="20">
        </a>
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
  name: 'FooterAccordion',
  props: {
    routes: {
      type: Array,
      default() {
        return [];
      },
    },
    info: {
      type: Object,
      default() {
        return {
          phone: '',
          media: [],
        };
      },
    },
  },
  data() {
    return {
      id: '',
    };
  },
  created() {
    this.id = `footer-${this.$helper.generateID()}`;
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
