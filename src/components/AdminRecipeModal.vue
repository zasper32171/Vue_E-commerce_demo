<template>
  <div class="modal fade" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
      <form class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title text-light">
            <span>新增 / 編輯酒譜</span>
          </h5>
          <button class="btn-close" type="button" data-bs-dismiss="modal" />
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4 d-flex flex-column">
              <div class="mb-2">
                <label for="inputImage" class="form-label">輸入圖片網址</label>
                <input id="inputImage" class="form-control" type="url" placeholder="請輸入圖片連結"
                  v-model="tempRecipe.imageUrl" />
              </div>
              <div class="mb-4">
                <label for="inputFile" class="form-label">或 上傳圖片</label>
                <input id="inputFile" ref="upload" class="form-control" type="file"
                  @change="uploadImage" />
              </div>
              <div v-if="loadingImg" class="text-center">
                <div class="spinner-border m-5"></div>
              </div>
              <div class="flex-grow-1 d-flex flex-column text-center position-relative">
                <div class="my-auto">
                  <img class="mw-100" style="object-fit: contain; height: 320px"
                    :src="tempRecipe.imageUrl" alt />
                </div>
                <div v-if="tempRecipe.imageUrl" class="position-absolute top-0 end-0">
                  <button class="btn-close" type="button" @click="deleteImage" />
                </div>
              </div>
            </div>
            <div class="col-sm-8">
              <div class="row gx-2">
                <div class="col-md-6 mb-2">
                  <label for="inputTitle" class="form-label">標題</label>
                  <input id="inputTitle" class="form-control" type="text" placeholder="請輸入標題"
                    v-model="tempRecipe.title" />
                </div>
                <div class="col-md-6 mb-2">
                  <label for="inputTitle" class="form-label">副標題</label>
                  <input id="inputTitle" class="form-control" type="text" placeholder="請輸入標題"
                    v-model="tempRecipe.subtitle" />
                </div>
              </div>
              <div class="row gx-2">
                <div class="col-md-6 mb-1">
                  <label for="inputAuthor" class="form-label">作者</label>
                  <input id="inputAuthor" class="form-control" type="text" placeholder="請輸入作者"
                    v-model="tempRecipe.author" />
                </div>
                <div class="col-md-6 mb-1">
                  <label for="inputDate" class="form-label">發表時間</label>
                  <input id="inputDate" class="form-control" type="datetime-local"
                    v-model="createTime" />
                </div>
              </div>
              <div class="">
                <div class="d-flex align-items-center mb-1">
                  <label class="form-label mt-2">材料</label>
                  <button class="btn btn-sm btn-outline-secondary ms-auto" type="button"
                    @click="addIngredient">新增</button>
                </div>
                <div v-for="(ingredient, index) in tempRecipe.content.ingredients" :key="index"
                  class="row align-items-center gx-2">
                  <div class="col-6">
                    <input class="form-control mb-1" type="text" placeholder="請輸入材料"
                      v-model="tempRecipe.content.ingredients[index].name" />
                  </div>
                  <div class="col">
                    <input class="form-control mb-1" type="text" placeholder="請輸入份量"
                      v-model="tempRecipe.content.ingredients[index].amount" />
                  </div>
                  <div class="col-auto">
                    <button class="btn-close btn-sm" type="button"
                      @click="deleteIngredient(index)" />
                  </div>
                </div>
              </div>
              <div class="">
                <div class="d-flex align-items-center mb-1">
                  <label class="form-label mt-2">作法</label>
                  <button class="btn btn-sm btn-outline-secondary ms-auto" type="button"
                    @click="addStep">新增</button>
                </div>
                <div v-for="(step, index) in tempRecipe.content.steps" :key="index"
                  class="row align-items-center gx-2">
                  <div class="col">
                    <input class="form-control mb-1" type="text" placeholder="請輸入步驟"
                      v-model="tempRecipe.content.steps[index]" />
                  </div>
                  <div class="col-auto">
                    <button class="btn-close btn-sm" type="button" @click="deleteStep(index)" />
                  </div>
                </div>
              </div>
              <div class="mt-2">
                <div class="form-check">
                  <input id="checkPublic" class="form-check-input" type="checkbox"
                    :true-value="true" :false-value="false" v-model="tempRecipe.isPublic" />
                  <label class="form-check-label" for="checkPublic">是否公開</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline-secondary" type="button"
            data-bs-dismiss="modal">取消</button>
          <button class="btn btn-primary" type="submit" data-bs-dismiss="modal"
            @click="submitRecipe">確認</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import RequestSenderMixin from '@/mixins/RequestSenderMixin';
import { MessageTransmitterMixin } from '@/mixins/MessageTransMixins';

export default {
  name: 'AdminRecipeModal',
  mixins: [RequestSenderMixin, MessageTransmitterMixin],
  props: {
    recipe: {
      type: Object,
      default: () => {},
    },
  },
  emits: ['submit-recipe'],
  data() {
    return {
      tempRecipe: JSON.parse(JSON.stringify(this.recipe)),
      loadingImg: false,
    };
  },
  computed: {
    createTime: {
      get() {
        return this.$helper.timeToInputDatetime(this.tempRecipe.create_at);
      },
      set(value) {
        this.tempRecipe.create_at = this.$helper.dateToTime(value);
      },
    },
  },
  watch: {
    recipe() {
      this.tempRecipe = JSON.parse(JSON.stringify(this.recipe));
    },
  },
  methods: {
    uploadImage() {
      const file = this.$refs.upload.files[0];

      if (typeof file === 'undefined') return;

      this.tempRecipe.imageUrl = '';
      this.loadingImg = true;

      const formData = new FormData();
      formData.append('file-to-upload', file);

      const onSuccess = (res) => {
        this.tempRecipe.imageUrl = res.imageUrl;
      };

      const onFailure = (res) => {
        this.pushMessageFailure('上傳失敗', res.message);
      };

      this.sendRequest('uploadImageAdmin', null, formData, onSuccess, onFailure).finally(() => {
        this.loadingImg = false;
      });
    },
    deleteImage() {
      this.tempRecipe.imageUrl = '';
    },
    addIngredient() {
      this.tempRecipe.content.ingredients.push({});
    },
    deleteIngredient(index) {
      if (this.tempRecipe.content.ingredients.length === 1) return;
      this.tempRecipe.content.ingredients.splice(index, 1);
    },
    addStep() {
      this.tempRecipe.content.steps.push('');
    },
    deleteStep(index) {
      if (this.tempRecipe.content.steps.length === 1) return;
      this.tempRecipe.content.steps.splice(index, 1);
    },
    submitRecipe() {
      this.$emit('submit-recipe', this.tempRecipe);
    },
  },
};
</script>
