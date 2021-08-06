<template>
  <div>
    <div class="container-fluid">
      <div class="text-end mt-2">
        <button class="btn btn-primary mt-4 me-3" type="button" data-bs-toggle="modal"
          data-bs-target="#dashboard-modal" @click="showModal()">建立酒譜</button>
      </div>
      <table class="table align-middle my-4">
        <thead>
          <tr>
            <th>標題</th>
            <th>副標題</th>
            <th class="text-center" width="240">作者</th>
            <th class="text-center" width="320">發表時間</th>
            <th class="text-center" width="120">是否公開</th>
            <th class="text-center" width="120">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="recipe in recipes" :key="recipe.id">
            <td class="overflow-hidden">{{ recipe.title }}</td>
            <td class="overflow-hidden">{{ recipe.subtitle }}</td>
            <td class="text-center">{{ recipe.author }}</td>
            <td class="text-center">{{ $helper.timeToDatetime(recipe.create_at) }}</td>
            <td class="text-center">
              <span v-if="recipe.isPublic" class="text-success">公開</span>
              <span v-else class="text-muted">不公開</span>
            </td>
            <td class="text-center">
              <div class="btn-group">
                <button class="btn btn-outline-primary btn-sm" data-bs-toggle="modal"
                  data-bs-target="#dashboard-modal" @click="showModal(recipe)">編輯</button>
                <button class="btn btn-outline-danger btn-sm" @click="deleteRecipe(recipe)">
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <Pagination :pages="pagination" @updatePage="getRecipes" />
    </div>
    <RecipeModal id="dashboard-modal" :recipe="modalItem" @submit-recipe="addOrUpdateRecipe" />
  </div>
</template>

<script>
import RequestSenderMixin from '@/mixins/RequestSenderMixin';
import { MessageTransmitterMixin } from '@/mixins/MessageTransMixins';

import RecipeModal from '@/components/AdminRecipeModal.vue';
import Pagination from '@/components/Pagination.vue';

export default {
  name: 'AdminRecipes',
  mixins: [RequestSenderMixin, MessageTransmitterMixin],
  components: { RecipeModal, Pagination },
  data() {
    return {
      recipes: [],
      pagination: {},
      modalItem: this.defaultRecipe(),
    };
  },
  methods: {
    defaultRecipe() {
      return {
        create_at: this.$helper.getTime(),
        content: { ingredients: [{}], steps: [''] },
        isPublic: false,
      };
    },
    showModal(recipe) {
      this.modalItem = this.defaultRecipe();
      if (!(typeof recipe === 'undefined')) {
        this.getRecipe(recipe.id);
      }
    },
    getRecipes(page = 1) {
      this.$loading.show();

      const params = { page };

      const onSuccess = (res) => {
        this.recipes = res.articles;
        this.pagination = res.pagination;
      };

      const onFailure = (res) => {
        this.pushMessageFailure('取得失敗', res.messages.join('、'));
      };

      return this.sendRequest('getArticlesAdmin', params, null, onSuccess, onFailure).finally(
        this.$loading.hide,
      );
    },
    getRecipe(id) {
      this.$loading.show();

      const params = { id };

      const onSuccess = (res) => {
        this.modalItem = res.article;
      };

      const onFailure = (res) => {
        this.pushMessageFailure('取得失敗', res.message);
      };

      return this.sendRequest('getArticleAdmin', params, null, onSuccess, onFailure).finally(
        this.$loading.hide,
      );
    },
    addOrUpdateRecipe(recipe) {
      if (!recipe.id) {
        this.addRecipe(recipe);
      } else {
        this.updateRecipe(recipe);
      }
    },
    addRecipe(recipe) {
      this.$loading.show();

      const data = { data: recipe };

      const onSuccess = (res) => {
        this.pushMessageSuccess('新增成功', res.message);
      };

      const onFailure = (res) => {
        this.pushMessageFailure('新增失敗', res.message);
      };

      return this.sendRequest('addArticleAdmin', null, data, onSuccess, onFailure)
        .finally(this.$loading.hide)
        .finally(this.getRecipes);
    },
    updateRecipe(recipe) {
      this.$loading.show();

      const params = { id: recipe.id };
      const data = { data: recipe };

      const onSuccess = (res) => {
        this.pushMessageSuccess('更新成功', res.message);
      };

      const onFailure = (res) => {
        this.pushMessageFailure('更新失敗', res.message);
      };

      return this.sendRequest('updateArticleAdmin', params, data, onSuccess, onFailure)
        .finally(this.$loading.hide)
        .finally(() => {
          this.getRecipes(this.pagination.current_page);
        });
    },
    deleteRecipe(recipe) {
      // eslint-disable-next-line no-alert
      if (!window.confirm('確定刪除酒譜？')) return Promise.reject();

      this.$loading.show();

      const params = { id: recipe.id };

      const onSuccess = (res) => {
        this.pushMessageSuccess('刪除成功', res.message);
      };

      const onFailure = (res) => {
        this.pushMessageFailure('刪除失敗', res.message);
      };

      return this.sendRequest('deleteArticleAdmin', params, null, onSuccess, onFailure)
        .finally(this.$loading.hide)
        .finally(() => {
          this.getRecipes(this.pagination.current_page);
        });
    },
  },
  created() {
    this.getRecipes();
  },
};
</script>
