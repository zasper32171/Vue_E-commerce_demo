<template>
  <div class="carousel slide" :class="{'carousel-fade': isFade}"
    :data-bs-ride="isAutoPlay? 'carousel': null" :data-bs-interval="interval" data-bs-pause="false">
    <div v-if="hasIndicator" class="carousel-indicators">
      <button v-for="(_, index) in itemNum" :key="_" :class="{active: (index === 0)}" type="button"
        data-bs-target="#carousel" :data-bs-slide-to="index" />
    </div>
    <div class="carousel-inner">
      <slot />
    </div>
    <button v-if="hasControl" class="carousel-control-prev" type="button" :data-bs-target="`#${id}`"
      data-bs-slide="prev">
      <span class="carousel-control-prev-icon" />
    </button>
    <button v-if="hasControl" class="carousel-control-next" type="button" :data-bs-target="`#${id}`"
      data-bs-slide="next">
      <span class="carousel-control-next-icon" />
    </button>
  </div>
</template>

<script>
export default {
  name: 'Carousel',
  props: {
    interval: {
      type: Number,
      default: 6000,
    },
    itemNum: {
      type: Number,
      default: 3,
    },
    hasIndicator: {
      type: Boolean,
      default: true,
    },
    hasControl: {
      type: Boolean,
      default: true,
    },
    isFade: {
      type: Boolean,
      default: false,
    },
    isAutoPlay: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      id: '',
    };
  },
  mounted() {
    this.$el.id = this.$el.id || `carousel-${this.$helper.generateID()}`;
    this.id = this.$el.id;
  },
};
</script>
