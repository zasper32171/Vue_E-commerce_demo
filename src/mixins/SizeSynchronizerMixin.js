export default {
  name: 'SizeSynchronizerMixin',
  data() {
    return {
      sizeSyncElGroups: { default: [] },
      syncInterval: 300,
    };
  },
  methods: {
    pushSizeSyncEl(el, group = 'default') {
      if (!(group in this.sizeSyncElGroups)) {
        this.sizeSyncElGroups[group] = [];
      }

      if (this.sizeSyncElGroups[group].includes(el)) return;

      this.sizeSyncElGroups[group].push(el);
    },
    removeSizeSyncEl(el, group = 'default') {
      const index = this.sizeSyncElGroups[group].indexOf(el);
      if (!(index > -1)) return;
      this.sizeSyncElGroups[group].splice(index, 1);
    },
    removeAllSizeSyncEls(group = 'default') {
      this.sizeSyncElGroups[group] = [];
    },
    syncElGroup(group = 'default') {
      const sizeSyncElGroup = this.sizeSyncElGroups[group];

      sizeSyncElGroup.forEach((el) => {
        // eslint-disable-next-line no-param-reassign
        el.style.height = null;
      });

      const maxHeight = Math.max(...sizeSyncElGroup.map((el) => el.clientHeight));
      sizeSyncElGroup.forEach((el) => {
        if (el.clientHeight !== maxHeight) {
          // eslint-disable-next-line no-param-reassign
          el.style.height = `${maxHeight}px`;
        }
      });
    },
    syncElGroups() {
      Object.keys(this.sizeSyncElGroups).forEach(this.syncElGroup);
    },
  },
  created() {
    setInterval(this.syncElGroups, this.syncInterval);
  },
};
