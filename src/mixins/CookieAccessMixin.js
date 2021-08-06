export default {
  name: 'CookieAccessMixin',
  methods: {
    getCookie(key) {
      return document.cookie
        .split('; ')
        .find((row) => row.startsWith(key))
        .split('=')[1];
    },
    setCookie(key, value, expire, path, domain) {
      const pairs = {
        [key]: value,
        expire,
        path,
        domain,
      };
      Object.keys(pairs).forEach((k) => pairs[k] === undefined && delete pairs[k]);

      document.cookie = Object.keys(pairs)
        .map((k) => [k, pairs[k]].join('='))
        .join('; ');
    },
    deleteCookie(key, path, domain) {
      this.setCookie(key, '', new Date(0), path, domain);
    },
  },
};
