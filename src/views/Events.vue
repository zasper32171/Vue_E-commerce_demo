<template>
  <div class="min-vh-100 d-flex flex-column bg-cover bg-center pt-7"
    :style="{backgroundImage: `url(${require('@/assets/images/events-bg.jpg')})`}">
    <div class="text-center">
      <h2 class="mb-0 lh-1 text-primary-dark">知識酒窖</h2>
      <img class="mw-100" src="@/assets/decs/title-dec-dark.png">
    </div>
    <div class="container my-auto">
      <div class="row pt-2 pb-5">
        <div class="offset-xxl-7 col-xxl-5 offset-xl-6 col-xl-6 offset-sm-1 col-sm-10">
          <div class="overlay-dark p-sm-5 p-4">
            <table>
              <tr class="align-top">
                <td class="text-nowrap text-primary fw-bold pb-1 d-sm-table-cell d-block">活動期間：</td>
                <td class="pb-1 d-sm-table-cell d-block">2021.6.19 ~ 2022.6.19</td>
              </tr>
              <tr class="align-top">
                <td class="text-nowrap text-primary fw-bold pb-1 d-sm-table-cell d-block">活動辦法：</td>
                <td class="pb-1 d-sm-table-cell d-block">進行威士忌相關知識問答，答對即可獲得 Golden Ronny
                  全系列商品九折優惠折扣碼！活動期間每人可不限次數挑戰。</td>
              </tr>
            </table>
            <p class="small mb-4">（本活動獎品不得與其他優惠券合併使用。）</p>
            <div class="text-center">
              <router-link to="/challenge">
                <button class="btn btn-lg btn-primary" type="button">前往挑戰</button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Events',
};
</script>
