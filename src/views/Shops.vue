<template>
  <div class="min-vh-100 bg-cover bg-fixed py-7"
    :style="{backgroundImage: `url(${require('@/assets/images/shops-bg.jpg')})`  }">
    <div class="text-center">
      <h2 class="mb-0 lh-1">銷售據點</h2>
      <img class="mw-100" src="@/assets/decs/title-dec.png" alt />
    </div>
    <div class="col-xl-6 col-lg-8 col-10 mx-auto my-4">
      <div v-for="(shop, index) in shops" :key="shop"
        class="row g-0 align-items-center py-5 px-sm-5 px-2 border-primary"
        :class="{'border-bottom': index != shops.length - 1}">
        <div class="col-md-6">
          <img class="w-100" :src="shop.image.src" :alt="shop.image.alt" />
        </div>
        <div class="offset-md-1 col-md-5">
          <h4 class="mt-md-0 mb-md-5 mt-5 mb-4">{{ shop.name }}</h4>
          <div class="row g-4">
            <div class="col-auto">
              <img class="mb-1" src="@/assets/icons/location-light.svg" alt="Location" width="16" />
            </div>
            <p class="col">{{ shop.address }}</p>
          </div>
          <div class="row g-4">
            <div class="col-auto">
              <img class="mb-1" src="@/assets/icons/phone-solid-light.svg" alt="Tele" width="16" />
            </div>
            <p class="col">{{ shop.phone }}</p>
          </div>
          <div class="row g-4">
            <div class="col-auto">
              <img class="mb-1" src="@/assets/icons/clock-light.svg" alt="Time" width="16" />
            </div>
            <p class="col mb-0">{{ shop.hours }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable global-require */

export default {
  name: 'Shops',
  data() {
    return {
      shops: [
        {
          name: '台北信義店',
          address: '台北市信義區信義路五段16號',
          phone: '(02) 29555162',
          hours: '10:00 ~ 22:00',
          image: { src: require('@/assets/images/shops-0.jpg'), alt: 'Xinyi Store' },
        },
        {
          name: '台北站前店',
          address: '台北市中正區忠孝東路一段12號',
          phone: '(02) 29540283',
          hours: '10:00 ~ 21:00',
          image: { src: require('@/assets/images/shops-1.jpg'), alt: 'Taipei Station Store' },
        },
        {
          name: '板橋環球店',
          address: '新北市板橋區縣民大道二段7號2樓',
          phone: '(02) 23654780',
          hours: '10:00 ~ 21:30',
          image: { src: require('@/assets/images/shops-2.jpg'), alt: 'Banqiau Global Mall Store' },
        },
      ],
    };
  },
};
</script>
