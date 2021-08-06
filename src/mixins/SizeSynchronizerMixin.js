export default {
  name: 'SizeSynchronizerMixin',
  data() {
    return {
      sizeSyncElGroup: [],
      syncInterval: 500,
    };
  },
  methods: {
    pushSizeSyncEl(el) {
      if (this.sizeSyncElGroup.includes(el)) return;
      this.sizeSyncElGroup.push(el);
    },
    removeSizeSyncEl(el) {
      const index = this.sizeSyncElGroup.indexOf(el);
      if (!(index > -1)) return;
      this.sizeSyncElGroup.splice(index, 1);
    },
    removeAllSizeSyncEls() {
      this.sizeSyncElGroup = [];
    },
    syncElSizes() {
      this.sizeSyncElGroup.forEach((el) => {
        // eslint-disable-next-line no-param-reassign
        el.style.height = null;
      });

      const maxHeight = Math.max(...this.sizeSyncElGroup.map((el) => el.clientHeight));
      this.sizeSyncElGroup.forEach((el) => {
        if (el.clientHeight !== maxHeight) {
          // eslint-disable-next-line no-param-reassign
          el.style.height = `${maxHeight}px`;
        }
      });
    },
  },
  created() {
    setInterval(this.syncElSizes, this.syncInterval);
  },
};
