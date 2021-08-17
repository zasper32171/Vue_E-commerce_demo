<template>
  <div class="container">
    <div class="row justify-content-center pt-4">
      <div class="col-xl-9 col-lg-11 col ls-sm-lg ls-sm">
        <StepProgressBar class="d-sm-block d-none" type="number" inter="circle-dot"
          :steps="progressBarInfo.steps" :complete="progressBarInfo.complete"
          :description="progressBarInfo.description">
        </StepProgressBar>
        <StepProgressBar class="d-sm-none" type="number" :steps="progressBarInfo.steps"
          :complete="progressBarInfo.complete" :description="progressBarInfo.description">
        </StepProgressBar>
      </div>
    </div>
  </div>
  <router-view @update:step="updateStep" />
  <ToastList type="main" />
</template>

<script>
import { RouterMixin } from '@/mixins/MessageTransMixins';

import StepProgressBar from '@/components/StepProgressBar.vue';
import ToastList from '@/components/ToastList.vue';

export default {
  name: 'LayoutCheckout',
  mixins: [RouterMixin],
  components: { StepProgressBar, ToastList },
  data() {
    return {
      progressBarInfo: {
        description: ['填寫資訊', '確認付款', '完成訂單'],
        steps: 3,
        complete: 0,
      },
    };
  },
  methods: {
    updateStep(step) {
      this.progressBarInfo.complete = step;
    },
  },
};
</script>
