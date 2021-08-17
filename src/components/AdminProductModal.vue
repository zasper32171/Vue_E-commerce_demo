<template>
  <div class="modal fade" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
      <form class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title text-light">
            <span>新增 / 編輯產品</span>
          </h5>
          <button class="btn-close" type="button" data-bs-dismiss="modal" />
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4 d-flex flex-column">
              <div class="mb-2">
                <label for="inputImage" class="form-label">輸入圖片網址</label>
                <input id="inputImage" class="form-control" type="url" placeholder="請輸入圖片連結"
                  v-model="tempProduct.imageUrl" />
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
                  <img class="mw-100" style="object-fit: contain" :src="tempProduct.imageUrl" alt />
                </div>
                <div v-if="tempProduct.imageUrl" class="position-absolute top-0 end-0">
                  <button class="btn-close" type="button" @click="deleteImage" />
                </div>
              </div>
            </div>
            <div class="col-sm-8">
              <div class="row gx-2">
                <div class="mb-2 col-md-6">
                  <label for="inputTitle" class="form-label">標題</label>
                  <input id="inputTitle" class="form-control" type="text" placeholder="請輸入標題"
                    v-model="tempProduct.title" />
                </div>
                <div class="mb-2 col-md-6">
                  <label for="inputTitle" class="form-label">副標題</label>
                  <input id="inputTitle" class="form-control" type="text" placeholder="請輸入標題"
                    v-model="tempProduct.subtitle" />
                </div>
              </div>
              <div class="mb-2">
                <label for="inputCategory" class="form-label">分類</label>
                <input id="inputCategory" class="form-control" type="text" placeholder="請輸入分類"
                  v-model="tempProduct.category" />
              </div>
              <div class="row gx-2">
                <div class="mb-2 col-md-4">
                  <label for="inputOriginal" class="form-label">原價</label>
                  <input id="inputOriginal" class="form-control" type="number" placeholder="請輸入原價"
                    v-model.number="tempProduct.origin_price" />
                </div>
                <div class="mb-2 col-md-4">
                  <label for="inputPrice" class="form-label">售價</label>
                  <input id="inputPrice" class="form-control" type="number" placeholder="請輸入售價"
                    v-model.number="tempProduct.price" />
                </div>
                <div class="mb-2 col-md-4">
                  <label for="inputUnit" class="form-label">單位</label>
                  <input id="inputUnit" class="form-control" type="text" placeholder="請輸入單位"
                    v-model="tempProduct.unit" />
                </div>
              </div>
              <div class="row gx-2">
                <div class="mb-2 col-md-4">
                  <label for="inputVintage" class="form-label">年份</label>
                  <input id="inputVintage" class="form-control" type="number" placeholder="請輸入年份"
                    v-model="tempProduct.info.vintage" />
                </div>
                <div class="mb-2 col-md-4">
                  <label for="inputABV" class="form-label">酒精濃度</label>
                  <div class="input-group">
                    <input id="inputABV" class="form-control" type="number" placeholder="請輸入濃度"
                      v-model="tempProduct.info.abv" />
                    <span class="input-group-text">%</span>
                  </div>
                </div>
                <div class="mb-2 col-md-4">
                  <label for="inputVolume" class="form-label">容量</label>
                  <input id="inputVolume" class="form-control" type="text" placeholder="請輸入容量"
                    v-model="tempProduct.info.volume" />
                </div>
              </div>
              <h5 class="text-dark text-center mt-3">產品說明</h5>
              <hr>
              <div class="row mt-4 mb-2">
                <label for="inputContentMain" class="col-auto col-form-label">內容</label>
                <div class="col">
                  <textarea id="inputContent" class="form-control" type="text" rows="3"
                    placeholder="請輸入主要說明內容" v-model="tempProduct.content.main" />
                </div>
              </div>
              <div class="row mb-2">
                <label for="inputContentAcent" class="col-auto col-form-label">香氣</label>
                <div class="col">
                  <textarea id="inputContentAcent" class="form-control" type="text" rows="1"
                    placeholder="請輸入香氣相關描述" v-model="tempProduct.content.nose" />
                </div>
              </div>
              <div class="row mb-2">
                <label for="inputContentTaste" class="col-auto col-form-label">口感</label>
                <div class="col">
                  <textarea id="inputContentTaste" class="form-control" type="text" rows="1"
                    placeholder="請輸入口感相關描述" v-model="tempProduct.content.palate" />
                </div>
              </div>
              <div class="row mb-4">
                <label for="inputContentAftertaste" class="col-auto col-form-label">餘韻</label>
                <div class="col">
                  <textarea id="inputContentAftertaste" class="form-control" type="text" rows="1"
                    placeholder="請輸入餘韻相關描述" v-model="tempProduct.content.finish" />
                </div>
              </div>
              <hr>
              <div class="form-check">
                <input id="checkEnabled" class="form-check-input" type="checkbox" :true-value="1"
                  :false-value="0" v-model="tempProduct.is_enabled" />
                <label class="form-check-label" for="checkEnabled">是否啟用</label>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline-secondary" type="button"
            data-bs-dismiss="modal">取消</button>
          <button class="btn btn-primary" type="submit" data-bs-dismiss="modal"
            @click="submitProduct">確認</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import RequestSenderMixin from '@/mixins/RequestSenderMixin';
import { MessageTransmitterMixin } from '@/mixins/MessageTransMixins';

export default {
  name: 'AdminProductModal',
  mixins: [RequestSenderMixin, MessageTransmitterMixin],
  props: {
    product: {
      type: Object,
      default: () => {},
    },
  },
  emits: ['submit-product'],
  data() {
    return {
      tempProduct: JSON.parse(JSON.stringify(this.product)),
      loadingImg: false,
    };
  },
  watch: {
    product() {
      this.tempProduct = JSON.parse(JSON.stringify(this.product));
    },
  },
  methods: {
    uploadImage() {
      const file = this.$refs.upload.files[0];

      if (typeof file === 'undefined') return;

      this.tempProduct.imageUrl = '';
      this.loadingImg = true;

      const formData = new FormData();
      formData.append('file-to-upload', file);

      const onSuccess = (res) => {
        this.tempProduct.imageUrl = res.imageUrl;
      };

      const onFailure = (res) => {
        this.pushMessageFailure('上傳失敗', res.message);
      };

      this.sendRequest('uploadImageAdmin', null, formData, onSuccess, onFailure).finally(() => {
        this.loadingImg = false;
      });
    },
    deleteImage() {
      this.tempProduct.imageUrl = '';
    },
    submitProduct() {
      this.$emit('submit-product', this.tempProduct);
    },
  },
};
</script>
