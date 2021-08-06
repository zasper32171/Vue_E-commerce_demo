<template>
  <div class="min-vh-100 py-7">
    <div class="text-center">
      <h2 class="mb-0 lh-1">品牌故事</h2>
      <img class="mw-100" src="@/assets/decs/title-dec.png">
    </div>
    <div class="container my-4">
      <section v-for="(event, index) in events" :key="event.year">
        <div class="row align-items-center flex-row" :class="{'flex-md-row-reverse': (index % 2)}">
          <div class="col-md text-center py-4"
            :class="[(index % 2)? 'text-md-start': 'text-md-end']">
            <img class="mw-100" :src="event.image">
          </div>
          <div class="d-md-block d-none col-2 align-self-stretch">
            <StepProgressBlock class="w-100" type="circle-dot" direction="vertical" state="active"
              :part="(index === 0)? 'start': (index === events.length - 1)? 'end': 'middle'">
            </StepProgressBlock>
          </div>
          <div class="col-md text-start pt-md-5 "
            :class="[(index % 2)? 'text-md-end': 'text-md-start']">
            <h2 class="font-dec">{{ event.year }}</h2>
            <p class="d-inline-block text-lg-justify text-start">
              {{ event.text }}
            </p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import StepProgressBlock from '@/components/StepProgressBlock.vue';

export default {
  name: 'Story',
  components: { StepProgressBlock },
  data() {
    return {
      events: [
        {
          year: 1885,
          text:
            '創始人 Billy Herrington 投身威士忌產業，創立 Golden Ronny 品牌，並選擇於哈羅鎮建造第一座酒廠。',
          image: require('@/assets/images/story-0.jpg'),
        },
        {
          year: 1887,
          text: '酒廠正式啟用，開始製作威士忌。',
          image: require('@/assets/images/story-1.jpg'),
        },
        {
          year: 1890,
          text: '第一批威士忌正式發行，於當地取得不錯銷售成績，而後幾年間逐步發展海外通路。',
          image: require('@/assets/images/story-2.jpg'),
        },
        {
          year: 1924,
          text: 'Billy Herrington 逝世，其子 Belly 接手其事業。',
          image: require('@/assets/images/story-3.jpg'),
        },
        {
          year: 1925,
          text: 'Belly 著手進行酒廠擴建計劃。',
          image: require('@/assets/images/story-4.jpg'),
        },
        {
          year: 1967,
          text: 'Duncan Miller 成為 Golden Ronny 第四任首席調酒師，並引進「過桶」技術。',
          image: require('@/assets/images/story-5.jpg'),
        },
        {
          year: 1972,
          text: '9302R 系列開始販售，並取得隔年世界威士忌大賞冠軍。',
          image: require('@/assets/images/story-6.jpg'),
        },
        {
          year: 1992,
          text: '現任首席調酒師 Van Darkholme 開始任職。',
          image: require('@/assets/images/story-7.jpg'),
        },
        {
          year: '至今',
          text:
            'Golden Ronny 於各大國際賽事間屢次取得佳績，直至今日已獲得九十九次金狗獎年度大賞的殊榮。',
          image: require('@/assets/images/story-8.jpg'),
        },
      ],
    };
  },
};
</script>
