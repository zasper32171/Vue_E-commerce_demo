<template>
  <div class="min-vh-100 d-flex flex-column bg-cover bg-center pt-7"
    :style="{backgroundImage: `url(${require('@/assets/images/challenge-bg.jpg')})`}">
    <div class="text-center">
      <h2 class="mb-0 lh-1">知識酒窖</h2>
      <img class="mw-100" src="@/assets/decs/title-dec.png" alt />
    </div>
    <div class="container my-auto">
      <div class="row pt-5 pb-6">
        <div class="col-xl-8 col-lg-10 col mx-auto">
          <div class="overlay-dark py-5 ps-sm-7 pe-sm-6 ps-6 pe-5">
            <p class="description mb-3">{{ question.description }}</p>
            <ol class="options mb-4">
              <li v-for="(option, index) in question.options" :key="option"
                :class="{active: index === answer}" role="button" @click="answer = index">
                {{ option }}
              </li>
            </ol>
            <div class="text-center pt-2">
              <button class="btn btn-lg btn-primary" type="button" @click="submitAnswer">
                確定答案</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade" tabindex="-1" ref="modal">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content bg-gray-dark px-5 pt-4 pb-3">
        <h3 class="modal-title text-center mb-2">挑戰成功</h3>
        <p class=" text-justify ls-sm mb-4">恭喜您獲得 Golden Ronny 全系列商品9折優惠券。使用期限至 2030/06/09，以下是您的折扣碼：
        </p>
        <div class="input-group mb-4">
          <input class="form-control" type="text" :value="code" readonly />
          <button class="btn btn-outline-gray" type="button" @click="copy">
            <img :src="require('@/assets/icons/copy-light.svg')" alt="Copy" width="18" />
            <span class="ls-sm"> 複製</span>
          </button>
        </div>
        <div class="d-flex justify-content-end mt-2 mb-3">
          <button class="btn btn-outline-light" type="button" @click="again()">再玩一次</button>
          <button class="btn btn-primary ms-4" type="button"
            @click="$router.push('/products');">前往購物</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { Modal } from 'bootstrap';
import confetti from 'canvas-confetti';

import { MessageTransmitterMixin } from '@/mixins/MessageTransMixins';

export default {
  name: 'Challenge',
  mixins: [MessageTransmitterMixin],
  data() {
    return {
      questions: [
        {
          description: '下列各種威士忌的品飲方式中，何者源自於日本？',
          options: ['純飲', '水割', '加水飲用', '加冰飲用'],
          answer: 1,
        },
        {
          description: '下列何者不是威士忌熟成時可能會使用的酒桶？',
          options: ['雪莉桶', '波本桶', '馬德拉桶', '馬桶'],
          answer: 3,
        },
        {
          description:
            '下列何者不是在美國聯邦政府規定中，標示為「波本威士忌」之商品所須符合的條件？',
          options: [
            '在美國境內製作',
            '原料中所使用的玉米佔總原料51%以上',
            '至少兩年以上的熟成時間',
            '使用全新的北美白橡木桶陳放',
          ],
          answer: 2,
        },
      ],
      question: {},
      answer: null,

      firework: {
        duration: 5000,
        period: 250,
        defaults: {
          startVelocity: 30,
          spread: 360,
          ticks: 60,
          zIndex: 4000,
        },
        timer: null,
      },

      modal: {},
      code: 'wtf54obama',
    };
  },
  methods: {
    submitAnswer() {
      switch (this.answer) {
        case this.question.answer:
          this.modal.show();
          this.fire();
          break;
        case null:
          this.pushMessage('warning', '請選擇一個答案');
          break;
        default:
          this.pushMessage('help', '你確定？');
          break;
      }
    },
    fire() {
      const animationEnd = Date.now() + this.firework.duration;

      this.firework.timer = setInterval(() => {
        const timeLeft = animationEnd - Date.now();
        const particleCount = 50 * (timeLeft / this.firework.duration);

        if (timeLeft <= 0) {
          clearInterval(this.firework.timer);
          return;
        }

        confetti({
          ...this.firework.defaults,
          particleCount,
          origin: { x: this.$helper.randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        });
        confetti({
          ...this.firework.defaults,
          particleCount,
          origin: { x: this.$helper.randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        });
      }, this.firework.period);
    },
    copy() {
      navigator.clipboard.writeText(this.code).then(() => {
        this.pushMessageSuccess('已複製到剪貼簿');
      });
    },
    again() {
      clearInterval(this.firework.timer);
      this.modal.hide();
      this.question = this.$helper.choose(this.questions.filter((q) => q !== this.question));
      this.answer = null;
    },
  },
  created() {
    this.question = this.$helper.choose(this.questions);
  },
  mounted() {
    this.modal = new Modal(this.$refs.modal, { backdrop: 'static' });
  },
  beforeRouteLeave() {
    clearInterval(this.firework.timer);
    this.modal.hide();
  },
};
</script>

<style lang="scss" scoped>
.description {
  position: relarive;
  font-size: 1.125rem;

  &::before {
    position: absolute;
    transform: translateX(-150%);
    content: 'Q';
    font-family: 'Dancing Script', serif;
    color: var(--bs-primary);
    font-size: 2.25rem;
    line-height: 1;
  }
}

ol.options {
  list-style: upper-alpha inside;
  padding-left: 0;

  li {
    font-size: 1.125rem;
    line-height: 1.8;
    text-indent: -40px;
    padding-left: calc(1rem + 35px);
    padding-top: 0.375rem;
    padding-bottom: 0.375rem;
    margin-left: calc(-1rem + 5px);
    margin-bottom: -1px;
    border-radius: 5px;
    border: transparent 2px solid;
    transition: border-color 0.2s ease;
  }

  li::marker {
    color: var(--bs-primary);
    font-size: 1.25rem;
    font-weight: 700;
  }

  li:hover,
  li.active {
    border-color: var(--bs-primary);
  }
}
</style>
