export default {
  generateID(length = 8) {
    let result = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charsLength = chars.length;
    for (let i = 0; i < length; i += 1) {
      result += chars.charAt(Math.floor(Math.random() * charsLength));
    }
    return result;
  },

  choose(array) {
    return array instanceof Array && array.length
      ? array[Math.floor(Math.random() * array.length)]
      : null;
  },

  randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  },

  currency(num) {
    const n = parseInt(num, 10);
    return Number.isNaN(n)
      ? ''
      : `$${n
        .toFixed(0)
        .replace(/./g, (c, i, a) => (i && c !== '.' && (a.length - i) % 3 === 0 ? `, ${c}`.replace(/\s/g, '') : c))}`;
  },

  preventWrap(str) {
    return typeof str === 'string' ? str.replace(/ /g, '&nbsp;') : '';
  },

  preserveBreak(str) {
    return typeof str === 'string' ? str.replace(/\n/g, '<br />') : '';
  },

  getTime() {
    return Math.floor(new Date().getTime() / 1000);
  },

  timeToDate(time) {
    if (!Number.isInteger(time)) return '';
    const localDate = new Date(time * 1000);
    return localDate.toLocaleDateString();
  },

  timeToDatetime(time) {
    if (!Number.isInteger(time)) return '';
    const localDate = new Date(time * 1000);
    return localDate.toLocaleString();
  },

  timeToInputDate(time) {
    if (!Number.isInteger(time)) return '';
    const localDate = new Date(time * 1000 - new Date().getTimezoneOffset() * 60000);
    return localDate.toISOString().slice(0, 10);
  },

  timeToInputDatetime(time) {
    if (!Number.isInteger(time)) return '';
    const localDate = new Date(time * 1000 - new Date().getTimezoneOffset() * 60000);
    return localDate.toISOString().slice(0, 16);
  },

  dateToTime(date) {
    return new Date(date).getTime() / 1000;
  },
};
