<template>
  <nav>
    <ul class="pagination justify-content-center text-center">
      <li class="page-item" :class="{'disabled': !pages.has_prev}">
        <a class="page-link" href="#" @click.prevent="updatePage(pages.current_page - 1)">
          <span>&laquo;</span>
        </a>
      </li>
      <li v-for="page in pages.total_pages" :key="page" class="page-item"
        :class="{'active': page === pages.current_page}">
        <a class="page-link" href="#" @click.prevent="updatePage(page)">
          {{ page }}
        </a>
      </li>
      <li class="page-item" :class="{'disabled': !pages.has_next}">
        <a class="page-link" href="#" @click.prevent="updatePage(pages.current_page + 1)">
          <span>&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Pagination',
  props: ['pages'],
  emits: ['update-page'],
  methods: {
    updatePage(page) {
      this.$emit('update-page', page);
    },
  },
};
</script>
