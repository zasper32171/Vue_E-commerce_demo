<template>
  <div class="bg-black">
    <section class="vh-100">
      <Carousel :itemNum="slides.length" :isFade="true">
        <div v-for="(slide, index) in slides" :key="slide"
          class="carousel-item d-block vh-100 bg-cover bg-center" :class="{active: (index === 0)}"
          :style="{backgroundImage: `url(${slide.image})`}">
          <div class="row g-0 h-100 align-items-center
              justify-content-lg-start justify-content-center">
            <div class="offset-lg-2 col-auto text-center">
              <div class="position-relative text-center py-5">
                <div class="cover-parent scrim z--1"></div>
                <h2 class="mb-4">{{ slide.title }}</h2>
                <p class="mb-4" v-html="slide.text"></p>
                <router-link :to="slide.button.href">
                  <button class="btn btn-lg btn-decorative" type="button">
                    {{ slide.button.text }}
                  </button>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </Carousel>
    </section>
    <section v-for="(section, index) in sections" :key="section"
      class="min-vh-100 d-flex flex-column pt-7">
      <div class="text-center">
        <h2 class="mb-0 lh-1">{{ section.title }}</h2>
        <img class="mw-100" src="@/assets/decs/title-dec.png" alt />
      </div>
      <div class="flex-grow-1 d-flex container-fluid position-relative overflow-hidden">
        <img class="position-absolute bottom-0 mh-100" :class="[(index % 2)? 'end-0': 'start-0']"
          :src="section.image.src" :alt="section.image.alt" />
        <div class="flex-grow-1 row align-items-center">
          <div class="col-xl-3 col-sm-6 offset-sm-3 col-10 offset-1 py-5"
            :class="[!(index % 2)? 'offset-xl-7': 'offset-xl-2']">
            <div class="position-relative text-center z-0">
              <div class="cover-parent scrim z--1"></div>
              <p class="lh-sm-lg text-justify mb-4" v-html="section.text"></p>
              <router-link v-if="section.button" :to="section.button.href">
                <button class="btn btn-lg btn-decorative" type="button">
                  {{ section.button.text }}
                </button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="min-vh-100 d-flex flex-column pt-7">
      <div class="text-center">
        <h2 class="mb-0 lh-1">今日酒譜</h2>
        <img class="mw-100" src="@/assets/decs/title-dec.png" alt />
      </div>
      <div class="container my-auto">
        <div class="row pt-sm-5 pt-3 pb-5">
          <Carousel id="carousel-recipe" :itemNum="recipes.length" :hasIndicator="false"
            :isAutoPlay="false">
            <div v-for="(recipe, index) in recipes" :key="recipe" class="carousel-item"
              :class="{active: (index === 0)}">
              <div class="container">
                <div class="row align-items-center justify-content-center">
                  <div class="col-lg-4 align-self-center mx-lg-0 mx-5">
                    <div class="position-relative mx-md-0 mx-4">
                      <img class="w-100" :src="recipe.imageUrl" :alt="recipe.subtitle" />
                      <div class="cover-parent mask"></div>
                    </div>
                  </div>
                  <div class="col-lg-5 ms-lg-4 pe-lg-5 my-3">
                    <div class="text-center pb-1">
                      <h3>
                        {{ recipe.title }}
                        <span v-html="$helper.preventWrap(recipe.subtitle)"></span>
                      </h3>
                    </div>
                    <table class="w-100 mt-4 mb-3">
                      <tr class="align-top">
                        <td class="fw-bold text-sm-start text-center text-nowrap text-primary
                          pe-sm-2 pb-sm-4 d-sm-table-cell d-block">
                          材料
                        </td>
                        <td class="ls-sm ps-sm-4 pb-4 d-sm-table-cell d-block">
                          <table class="w-100">
                            <tr v-for="ingredient in recipe.content.ingredients" :key="ingredient"
                              class="align-top">
                              <td class="ps-2">{{ ingredient.name }}</td>
                              <td class="text-end" v-html="$helper.preventWrap(ingredient.amount)">
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr class="align-top">
                        <td class="fw-bold text-sm-start text-center text-nowrap text-primary
                          pe-sm-2 d-sm-table-cell d-block">
                          作法
                        </td>
                        <td class="ls-sm d-sm-table-cell d-block">
                          <ol>
                            <li v-for="step in recipe.content.steps" :key="step">{{ step }}</li>
                          </ol>
                        </td>
                      </tr>
                    </table>
                    <div class="d-flex justify-content-evenly">
                      <router-link :to="`/recipe/${recipe.id}`">
                        <button class="btn btn-decorative" type="button">查看酒譜</button>
                      </router-link>
                      <router-link to="/recipes">
                        <button class="btn btn-decorative" type="button">更多酒譜</button>
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </carousel>
        </div>
      </div>
    </section>
  </div>

</template>

<script>
/* eslint-disable global-require */

import RequestSenderMixin from '@/mixins/RequestSenderMixin';

import Carousel from '@/components/Carousel.vue';

export default {
  name: 'Index',
  mixins: [RequestSenderMixin],
  components: { Carousel },
  data() {
    return {
      slides: [
        {
          image: require('@/assets/images/index-carousel-0.jpg'),
          title: '獨特風味 尊絕不凡',
          text:
            '以完美比例調和，層次豐富而鮮明<br />細緻迷人韻味於舌尖綻放<br />僅獻給極致味蕾體驗的追尋者',
          button: { text: '威士忌系列', href: '/products?type=威士忌' },
        },
        {
          image: require('@/assets/images/index-carousel-1.jpg'),
          title: '清新芬芳 純淨優雅',
          text:
            '澄澈透明的酒體，卻蘊含濃烈香氣<br />杜松子與橙皮點亮活潑輕盈風味<br />適合於各式調酒中抒展個性',
          button: { text: '琴酒系列', href: '/products?type=琴酒' },
        },
        {
          image: require('@/assets/images/index-carousel-2.jpg'),
          title: '酒窖奧秘 一探究竟',
          text: '前往「知識酒窖」回答威士忌相關問題<br />挑戰成功即可獲得優惠券！',
          button: { text: '優惠活動', href: '/events' },
        },
      ],
      sections: [
        {
          image: { src: require('@/assets/images/index-0.jpg'), alt: 'First Distillery' },
          title: '質樸小鎮 孕育傳奇',
          text:
            '1887年，蘇格蘭北方斯貝賽區的一處小鎮—哈羅鎮，一座小酒廠在此根基，這便是 Golden Ronny 榮耀故事的序章，自此百餘年間，它始終俯瞰著物富豐饒的高賽平原，不斷寫下一頁頁璀璨的歷史篇章。',
          button: { text: '品牌故事', href: '/story' },
        },
        {
          image: { src: require('@/assets/images/index-1.jpg'), alt: 'Distiller' },
          title: '極致工藝 絕不妥協',
          text:
            '一道道繁複工法，都是經過 Golden Ronny 歷代調酒師不斷凝練昇華的積累，為了堅守最卓越的風味，以最高標準嚴謹把關，從未鬆懈一毫。',
        },
        {
          image: { src: require('@/assets/images/index-2.jpg'), alt: 'Cellar' },
          title: '追尋完美 永無止境',
          text:
            '是什麼造就了 Golden Ronny 的雋永與不凡？<br />尊重傳統，同時積極創新，是 Golden Ronny 所堅持信奉的價值，一次又一次近乎偏執的追尋，只為將最尊貴美好的體驗發掘並獻予世人，無止境而不悔。',
        },
      ],
      recipes: [],
    };
  },
  methods: {
    getArticle(id) {
      this.$loading.show();

      const params = { id };

      const onSuccess = (res) => {
        this.recipes.push(res.article);
      };

      return this.sendRequest('getArticle', params, null, onSuccess, null).finally(
        this.$loading.hide,
      );
    },
  },
  created() {
    Promise.all([
      this.getArticle('-MfgNyP-cE7ApAvjQpy2'),
      this.getArticle('-MfgO-qyduwrpjJ5D8LR'),
      this.getArticle('-MfgO3WFsohxvZL6yQiy'),
    ]);
  },
};
</script>

<style lang="scss" scoped>
@import '~bootstrap/scss/_functions';
@import '@/assets/scss/custom/_variables';

@media only screen and (max-width: #{map-get($grid-breakpoints, 'xl')}) {
  #carousel-recipe::v-deep(.carousel-control-prev),
  #carousel-recipe::v-deep(.carousel-control-next) {
    height: 70%;
  }
}
@media only screen and (max-width: #{map-get($grid-breakpoints, 'sm')}) {
  #carousel-recipe::v-deep(.carousel-control-prev),
  #carousel-recipe::v-deep(.carousel-control-next) {
    height: 40%;
  }
}
</style>
