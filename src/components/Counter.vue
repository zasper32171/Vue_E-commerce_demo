<template>
  <table class="counter">
    <tr>
      <td class="minus" @click="decrease">-</td>
      <td class="digit">{{ value }}</td>
      <td class="plus" @click="increase">+</td>
    </tr>
  </table>
</template>

<script>
export default {
  name: 'Counter',
  props: {
    min: {
      type: Number,
      default: 1,
    },
    max: {
      type: Number,
      default: 99,
    },
    value: {
      type: Number,
      default: 0,
    },
  },
  emits: ['update:value'],
  methods: {
    increase() {
      if (this.value >= this.max) return;
      this.$emit('update:value', this.value + 1);
    },
    decrease() {
      if (this.value <= this.min) return;
      this.$emit('update:value', this.value - 1);
    },
  },
  watch: {
    $props: {
      handler() {
        if (this.min >= this.max) {
          console.error('Invalid props: Minimum value should be less than the maximum');
        } else if (this.value < this.min) {
          console.error('Invalid props: Initial value should be greater than the minimum');
        } else if (this.value > this.max) {
          console.error('Invalid props: Initial value should be less than the maximun');
        }
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
$counter-width: 137px;
$counter-height: 36px;
$counter-font-size: 1.25rem;
$counter-font-weight: 500;
$counter-color: var(--bs-light);
$counter-bg-color: transparent;
$counter-hover-color: var(--bs-dark);
$counter-hover-bg-color: var(--bs-light);
$counter-border-color: var(--bs-light);
$counter-border-width: 1px;

$counter-width-sm: 80px;
$counter-height-sm: 24px;
$counter-font-size-sm: 0.75rem;

$counter-width-lg: 220px;
$counter-height-lg: 50px;
$counter-font-size-lg: 1.375rem;

.counter {
  display: inline-table;

  &[fixed],
  &[fixed] > tr {
    width: #{$counter-width};
  }

  &:not([fixed]),
  &:not([fixed]) > tr {
    max-width: #{$counter-width};
    min-width: calc(3 * #{$counter-height});
  }

  &,
  tr {
    height: #{$counter-height};
  }

  tr {
    td {
      border: #{$counter-border-color} #{$counter-border-width} solid;
    }

    .minus,
    .plus {
      width: #{$counter-height};
      color: #{$counter-color};
      background-color: #{$counter-bg-color};
      font-family: sans-serif;
      font-size: 20px;
      font-weight: 700;
      letter-spacing: 0.25rem;
      text-indent: 0.25rem;
      line-height: 1;
      text-align: center;
      vertical-align: middle;

      cursor: pointer;
      user-select: none;
      transition: color 0.2s ease, background-color 0.2s ease;

      &:hover {
        color: #{$counter-hover-color};
        background-color: #{$counter-hover-bg-color};
      }
    }

    .digit {
      color: #{$counter-color};
      background-color: #{$counter-bg-color};
      font-size: #{$counter-font-size};
      font-weight: #{$counter-font-weight};
      line-height: 1;
      letter-spacing: 0.25rem;
      text-indent: 0.25rem;
      text-align: center;
      vertical-align: middle;
    }
  }
}

.counter.counter-sm {
  &,
  tr {
    height: #{$counter-height-sm};
  }

  &[fixed],
  &[fixed] > tr {
    width: #{$counter-width-sm};
  }

  &:not([fixed]),
  &:not([fixed]) > tr {
    max-width: #{$counter-width-sm};
    min-width: calc(3 * #{$counter-height-sm});
  }

  tr {
    .minus,
    .plus {
      font-size: 1rem;
      width: #{$counter-height-sm};
    }

    .digit {
      font-size: #{$counter-font-size-sm};
    }
  }
}

.counter.counter-lg {
  &,
  tr {
    height: #{$counter-height-lg};
  }

  &[fixed],
  &[fixed] > tr {
    width: #{$counter-width-lg};
  }

  &:not([fixed]),
  &:not([fixed]) > tr {
    max-width: #{$counter-width-lg};
    min-width: calc(3 * #{$counter-height-lg});
  }

  tr {
    .minus,
    .plus {
      width: #{$counter-height-lg};
    }

    .digit {
      font-size: #{$counter-font-size-lg};
    }
  }
}
</style>
