<template>
  <div class="min-vh-100 py-7">
    <div class="text-center">
      <h2 class="mb-0 lh-1">經典酒譜</h2>
      <img class="mw-100" src="@/assets/decs/title-dec.png" alt />
    </div>
    <div class="container my-5">
      <div class="waterfall col mx-md-0 mx-4">
        <router-link v-for="recipe in recipes" :key="recipe.id"
          class="d-block link-reset position-relative mb-4" :to="`/recipe/${recipe.id}`">
          <img class=" w-100" :src="recipe.imageUrl" :alt="recipe.subtitle" />
          <!-- Chrome bug: Backdrop not working inside column-counts.-->
          <div class="cover-parent overlay hover d-flex flex-column text-center
              justify-content-center">
            <div class="fs-7 fly-in-top">{{ recipe.subtitle }}</div>
            <div class="fs-5 mb-2">{{ recipe.title }}</div>
            <router-link class="fly-in-down" :to="`/recipe/${recipe.id}`">
              <button class="btn btn-sm btn-decorative" type="button">查看酒譜</button>
            </router-link>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import RequestSenderMixin from '@/mixins/RequestSenderMixin';

export default {
  name: 'Recipes',
  mixins: [RequestSenderMixin],
  data() {
    return {
      recipes: [],
      pages: [],
    };
  },
  methods: {
    getRecipes(page = 1) {
      this.$loading.show();

      const params = { page };

      const onSuccess = (res) => {
        this.pages = this.pages.concat({
          recipes: res.articles,
          pagination: res.pagination,
        });
      };

      const onFailure = (/* res */) => {
        // console.error('取得失敗: ', res.messages.join('、'));
      };

      return this.sendRequest('getArticles', params, null, onSuccess, onFailure).finally(
        this.$loading.hide,
      );
    },
    getAllRecipes() {
      // prettier-ignore
      return this.getRecipes()
        .then(() => Promise.all([
          ...Array.from(
            { length: this.pages[0].pagination.total_pages - 1 },
            (_, page) => this.getRecipes(page + 2),
          ),
        ]))
        .then(() => {
          this.recipes = this.pages
            .sort((p, q) => p.pagination.current_page - q.pagination.current_page)
            .reduce((accu, curr) => accu.concat(curr.recipes), []);
        });
    },
  },
  created() {
    this.getAllRecipes();
  },
};
</script>

<style lang="scss" scoped>
@import '~bootstrap/scss/_functions';
@import '@/assets/scss/custom/_variables';

.waterfall {
  column-count: 4;
  column-gap: 24px;

  @media only screen and (max-width: #{map-get($grid-breakpoints, 'xl')}) {
    column-count: 3;
  }

  @media only screen and (max-width: #{map-get($grid-breakpoints, 'lg')}) {
    column-count: 2;
  }

  @media only screen and (max-width: #{map-get($grid-breakpoints, 'sm')}) {
    column-count: 1;
  }
}
</style>
