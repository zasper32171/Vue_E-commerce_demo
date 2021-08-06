<template>
  <div class="step-progress-bar">
    <div class="step-progress-blocks">
      <template v-for="step in steps" :key="step">
        <StepProgressBlock :style="{width: blockWidth}" :type="type" :index="step"
          :part="step === 1? 'start': step === steps? 'end': 'middle'"
          :state="step <= complete? 'active': 'inactive'">
        </StepProgressBlock>
        <StepProgressBlock v-if="inter && step !== steps" :style="{width: blockWidth}" :type="inter"
          part="middle"
          :state="(step === complete)? 'half': ((step < complete)? 'active': 'inactive')">
        </StepProgressBlock>
      </template>
    </div>
    <div class="description-blocks">
      <div v-for="(step, index) in steps" :key="step"
        :class="[(step <= complete)? 'text-active': 'text-inactive']"
        :style="{width: blockWidth, marginRight: (inter && step !== steps)? blockWidth: null}">
        <p v-if="description[index]">{{ description[index] }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import StepProgressBlock from '@/components/StepProgressBlock.vue';

export default {
  name: 'StepProgressBar',
  components: { StepProgressBlock },
  props: {
    steps: {
      type: Number,
      default: 3,
    },
    complete: {
      type: Number,
      default: 0,
    },
    type: {
      type: String,
      validator: (value) => ['dot', 'circle', 'circle-dot', 'number'].includes(value),
      default: 'number',
    },
    inter: {
      type: [String, Object],
      validator: (value) => ['dot', 'circle', 'circle-dot', null].includes(value),
      default: null,
    },
    description: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    blockWidth() {
      return this.inter ? `${100 / (2 * this.steps - 1)}%` : `${100 / this.steps}%`;
    },
  },
};
</script>

<style lang="scss" scoped>
$step-progress-bar-inactive-color: var(--bs-gray);
$step-progress-bar-active-color: var(--bs-primary);

.step-progress-blocks {
  display: flex;
  align-items: center;
  width: 100%;
}
.description-blocks {
  display: flex;
  width: 100%;
  font-weight: 500;
  text-align: center;
  white-space: nowrap;

  .text-inactive {
    color: #{$step-progress-bar-inactive-color};
  }

  .text-active {
    color: #{$step-progress-bar-active-color};
  }
}
</style>
