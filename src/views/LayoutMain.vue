<template>
  <header>
    <Navbar :routes="headerRoutes" />
  </header>
  <main>
    <router-view :key='$route.fullPath' />
  </main>
  <footer>
    <FooterColumns class="d-md-block d-none" :routes="footerRoutes" :info="footerInfo" />
    <FooterAccordion class="d-md-none" :routes="footerRoutes" :info="footerInfo" />
  </footer>
  <Dialog />
  <ToastList type="main" />
</template>

<script>
/* eslint-disable global-require */

import { RouterMixin } from '@/mixins/MessageTransMixins';

import Navbar from '@/components/Navbar.vue';
import FooterColumns from '@/components/FooterColumns.vue';
import FooterAccordion from '@/components/FooterAccordion.vue';
import Dialog from '@/components/Dialog.vue';
import ToastList from '@/components/ToastList.vue';

export default {
  name: 'LayoutMain',
  mixins: [RouterMixin],
  components: {
    Navbar,
    FooterColumns,
    FooterAccordion,
    Dialog,
    ToastList,
  },
  data() {
    return {
      headerRoutes: [
        { text: '品牌故事', href: '/story' },
        { text: '優惠活動', href: '/events' },
        { text: '系列酒藏', href: '/products' },
        { text: '經典酒譜', href: '/recipes' },
        { text: '銷售據點', href: '/shops' },
      ],
      footerRoutes: [
        {
          title: '關於我們',
          links: [
            { text: '品牌故事', href: '/story' },
            { text: '銷售據點', href: '/shops' },
            { text: '隱私權政策', href: '' },
            { text: '服務條款', href: '' },
          ],
        },
        {
          title: '系列商品',
          links: [
            { text: '威士忌系列', href: '/products?type=威士忌' },
            { text: '琴酒系列', href: '/products?type=琴酒' },
          ],
        },
        {
          title: '會員中心',
          links: [
            { text: '訂單查詢', href: '' },
            { text: '常見問題', href: '' },
            { text: '會員權益', href: '' },
          ],
        },
      ],
      footerInfo: {
        tele: {
          text: '(02) 2468-7878',
          href: 'tel:+886-2-24687878',
        },
        media: [
          {
            name: 'Email',
            img: require('@/assets/icons/mail-solid.svg'),
            href: 'mailto:service@golden_ronny.com',
          },
          { name: 'Facebook', img: require('@/assets/icons/facebook.svg'), href: '#' },
          { name: 'Instagram', img: require('@/assets/icons/instagram.svg'), href: '#' },
          { name: 'Twitter', img: require('@/assets/icons/twitter.svg'), href: '#' },
          { name: 'Youtube', img: require('@/assets/icons/youtube.svg'), href: '#' },
        ],
        copyright: {
          claim: '僅供個人學習，無商業用途',
          brand: 'Golden Ronny',
        },
      },
    };
  },
};
</script>
