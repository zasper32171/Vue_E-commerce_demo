import axios from 'axios';
import { compile } from 'path-to-regexp';

const BASE_URL = process.env.VUE_APP_API_BASE_URL;

const PREDEFINED_PARAMS = {
  api_path: process.env.VUE_APP_API_PATH,
};

const axiosInstance = axios.create();
const defaultTransformRequest = axiosInstance.defaults.transformRequest;
const defaultTransformResponse = axiosInstance.defaults.transformResponse;

/* eslint-disable no-param-reassign */
const productRequestPacketTransform = (packet) => {
  packet.content = JSON.stringify(packet.content);
};

const productResponsePacketTransform = (packet) => {
  try {
    packet.content = JSON.parse(packet.content);
  } catch (e) {
    packet.content = {};
  }
};

const articleRequestPacketTransform = (packet) => {
  packet.content = JSON.stringify(packet.content);
};

const articleResponsePacketTransform = (packet) => {
  try {
    packet.content = JSON.parse(packet.content);
  } catch (e) {
    packet.content = {};
  }
};
/* eslint-enable no-param-reassign */

function prepareTransformRequest(locatePacket, transformMethod) {
  return [
    (data) => {
      const d = JSON.parse(JSON.stringify(data));
      const p = locatePacket(d);
      if (p) {
        if (p instanceof Array) {
          p.forEach(transformMethod);
        } else {
          transformMethod(p);
        }
      }
      return d;
    },
  ].concat(defaultTransformRequest);
}

function prepareTransformResponse(locatePacket, transformMethod) {
  return defaultTransformResponse.concat([
    (data) => {
      const d = JSON.parse(JSON.stringify(data));
      const p = locatePacket(d);
      if (p) {
        if (p instanceof Array) {
          p.forEach(transformMethod);
        } else {
          transformMethod(p);
        }
      }
      return d;
    },
  ]);
}

/* eslint-disable no-multi-spaces */
/* eslint-disable key-spacing */
// prettier-ignore
const REQUEST_TYPES = {
  login:               { method: 'post',   url: '/admin/signin' },
  logout:              { method: 'post',   url: '/logout' },
  checkLogin:          { method: 'post',   url: '/api/user/check' },

  getProducts:         { method: 'get',    url: '/api/:api_path/products\\?page=:page',       transformResponse: prepareTransformResponse((data) => data.products, productResponsePacketTransform) },
  getProductsAll:      { method: 'get',    url: '/api/:api_path/products/all',                transformResponse: prepareTransformResponse((data) => data.products, productResponsePacketTransform) },
  getProduct:          { method: 'get',    url: '/api/:api_path/product/:id',                 transformResponse: prepareTransformResponse((data) => data.product, productResponsePacketTransform) },
  addCartItem:         { method: 'post',   url: '/api/:api_path/cart' },
  updateCartItem:      { method: 'put',    url: '/api/:api_path/cart/:id' },
  deleteCartItem:      { method: 'delete', url: '/api/:api_path/cart/:id' },
  deleteCart:          { method: 'delete', url: '/api/:api_path/carts' },
  getCart:             { method: 'get',    url: '/api/:api_path/cart' },
  addCoupon:           { method: 'post',   url: '/api/:api_path/coupon' },
  addOrder:            { method: 'post',   url: '/api/:api_path/order' },
  getOrders:           { method: 'get',    url: '/api/:api_path/orders\\?page=:page' },
  getOrder:            { method: 'get',    url: '/api/:api_path/order/:id' },
  payOrder:            { method: 'post',   url: '/api/:api_path/pay/:id' },
  getArticles:         { method: 'get',    url: '/api/:api_path/articles\\?page=:page' },
  getArticle:          { method: 'get',    url: '/api/:api_path/article/:id',                 transformResponse: prepareTransformResponse((data) => data.article, articleResponsePacketTransform) },

  getProductsAdmin:    { method: 'get',    url: '/api/:api_path/admin/products\\?page=:page', transformResponse: prepareTransformResponse((data) => data.products, productResponsePacketTransform) },
  getProductsAllAdmin: { method: 'get',    url: '/api/:api_path/admin/products/all',          transformResponse: prepareTransformResponse((data) => data.products, productResponsePacketTransform) },
  addProductAdmin:     { method: 'post',   url: '/api/:api_path/admin/product',               transformRequest: prepareTransformRequest((data) => data.data, productRequestPacketTransform)  },
  updateProductAdmin:  { method: 'put',    url: '/api/:api_path/admin/product/:id',           transformRequest: prepareTransformRequest((data) => data.data, productRequestPacketTransform)  },
  deleteProductAdmin:  { method: 'delete', url: '/api/:api_path/admin/product/:id' },
  getOrdersAdmin:      { method: 'get',    url: '/api/:api_path/admin/orders\\?page=:page' },
  updateOrderAdmin:    { method: 'put',    url: '/api/:api_path/admin/order/:id' },
  deleteOrdersAdmin:   { method: 'delete', url: '/api/:api_path/admin/orders/all' },
  deleteOrderAdmin:    { method: 'delete', url: '/api/:api_path/admin/order/:id' },
  getCouponsAdmin:     { method: 'get',    url: '/api/:api_path/admin/coupons\\?page=:page' },
  addCouponAdmin:      { method: 'post',   url: '/api/:api_path/admin/coupon' },
  updateCouponAdmin:   { method: 'put',    url: '/api/:api_path/admin/coupon/:id' },
  deleteCouponAdmin:   { method: 'delete', url: '/api/:api_path/admin/coupon/:id' },
  getArticlesAdmin:    { method: 'get',    url: '/api/:api_path/admin/articles\\?page=:page' },
  getArticleAdmin:     { method: 'get',    url: '/api/:api_path/admin/article/:id',           transformResponse: prepareTransformResponse((data) => data.article, articleResponsePacketTransform) },
  addArticleAdmin:     { method: 'post',   url: '/api/:api_path/admin/article',               transformRequest: prepareTransformRequest((data) => data.data, articleRequestPacketTransform) },
  updateArticleAdmin:  { method: 'put',    url: '/api/:api_path/admin/article/:id',           transformRequest: prepareTransformRequest((data) => data.data, articleRequestPacketTransform) },
  deleteArticleAdmin:  { method: 'delete', url: '/api/:api_path/admin/article/:id' },
  uploadImageAdmin:    { method: 'post',   url: '/api/:api_path/admin/upload' },
};
/* eslint-enable no-multi-spaces */
/* eslint-enable key-spacing */

export default {
  name: 'RequestSenderMixin',
  methods: {
    sendRequest(type, params, data, onSuccess, onFailure) {
      if (!(type in REQUEST_TYPES)) {
        return Promise.reject();
      }

      const { method, url } = REQUEST_TYPES[type];
      let compiledUrl;

      if (!(method in this.$http)) {
        return Promise.reject();
      }

      try {
        compiledUrl = compile(url)({ ...PREDEFINED_PARAMS, ...params });
      } catch (e) {
        return Promise.reject();
      }

      return this.$http({ ...REQUEST_TYPES[type], url: compiledUrl, data }).then((res) => {
        if (res.data.success) {
          if (typeof onSuccess === 'function') {
            onSuccess(res.data);
          }
        } else if (typeof onFailure === 'function') {
          onFailure(res.data);
        }
      });
    },
    setRequestAuth(token) {
      this.$http.defaults.headers.common.Authorization = token;
    },
  },
  created() {
    this.$http.defaults.baseURL = BASE_URL;
  },
};
