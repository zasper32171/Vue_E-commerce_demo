<template>
  <div class="step-progress-block" :class="[direction, type, state]">
    <div class="icon">{{ index }}</div>
    <div v-if="part != 'start'" class="line line-in"></div>
    <div v-if="part != 'end'" class="line line-out"></div>
  </div>
</template>

<script>
export default {
  name: 'StepProgressBlock',
  props: {
    direction: {
      type: String,
      validator: (value) => ['horizontal', 'vertical'].includes(value),
      default: 'horizontal',
    },
    part: {
      type: String,
      validator: (value) => ['start', 'middle', 'end'].includes(value),
      default: 'middle',
    },
    type: {
      type: String,
      validator: (value) => ['dot', 'circle', 'circle-dot', 'number'].includes(value),
      default: 'circle-dot',
    },
    state: {
      type: String,
      validator: (value) => ['inactive', 'half', 'active'].includes(value),
      default: 'inactive',
    },
    index: {
      type: [Number, String],
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
$step-progress-block-inactive-color: var(--bs-gray);
$step-progress-block-active-color: var(--bs-primary);

$step-progress-block-styles: 'dot', 'circle', 'circle-dot', 'number';
$step-progress-block-style-icon-widths: (
  'dot': 6px,
  'circle': 20px,
  'circle-dot': 20px,
  'number': 56px,
);

%icon-base {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

@each $style, $style-icon-width in $step-progress-block-style-icon-widths {
  %#{$style}-style-icon {
    width: $style-icon-width;
    height: $style-icon-width;
  }
}

%dot-style-icon {
  @extend %icon-base;

  border-radius: 50%;
  background-color: $step-progress-block-inactive-color;
  font-size: 0px;
}

%dot-style-icon-active {
  background-color: $step-progress-block-active-color;
}

%circle-style-icon {
  @extend %icon-base;

  border: $step-progress-block-inactive-color 2px solid;
  border-radius: 50%;
  font-size: 0px;
}

%circle-style-icon-active {
  border-color: $step-progress-block-active-color;
}

%circle-dot-style-icon {
  @extend %circle-style-icon;

  &::before {
    content: '';
    @extend %dot-style-icon;
  }
}

%circle-dot-style-icon-active {
  @extend %circle-style-icon-active;

  &::before {
    content: '';
    @extend %dot-style-icon-active;
  }
}

%number-style-icon {
  @extend %icon-base;

  font-size: 32px;
  color: $step-progress-block-inactive-color;
  text-align: center;
  text-indent: 0;
  letter-spacing: 0;
  line-height: 51px;
  border-radius: 50%;
  border: $step-progress-block-inactive-color 3px solid;
}

%number-style-icon-active {
  color: $step-progress-block-active-color;
  border-color: $step-progress-block-active-color;
}

%line-base {
  position: absolute;
  background-color: $step-progress-block-inactive-color;
}

%horizontal-line {
  @extend %line-base;

  height: 3px;
  transform: translateY(-50%);

  &.line-in {
    top: 50%;
    left: 0%;
  }

  &.line-out {
    top: 50%;
    right: 0%;
  }
}

%vertical-line {
  @extend %line-base;

  width: 3px;
  transform: translateX(-50%);

  &.line-in {
    left: 50%;
    top: 0%;
  }

  &.line-out {
    left: 50%;
    bottom: 0%;
  }
}

%line-active {
  background-color: $step-progress-block-active-color;
}

.step-progress-block {
  position: relative;

  @each $style, $icon-width in $step-progress-block-style-icon-widths {
    &.horizontal.#{$style} {
      width: 100%;
      height: #{$icon-width};
    }

    &.vertical.#{$style} {
      width: #{$icon-width};
      height: 100%;
    }
  }

  @each $style in $step-progress-block-styles {
    &.#{$style} .icon {
      @extend %#{$style}-style-icon;
    }

    &.half.#{$style} .icon,
    &.active.#{$style} .icon {
      @extend %#{$style}-style-icon-active;
    }
  }

  &.half .line.line-in,
  &.active .line {
    @extend %line-active;
  }

  &.horizontal .line {
    @extend %horizontal-line;
  }

  &.vertical .line {
    @extend %vertical-line;
  }

  @each $style, $icon-width in $step-progress-block-style-icon-widths {
    &.horizontal.#{$style} .line {
      width: calc(50% - #{$icon-width} / 2);
    }

    &.vertical.#{$style} .line {
      height: calc(50% - #{$icon-width} / 2);
    }
  }
}
</style>
