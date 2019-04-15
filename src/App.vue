<template>
  <div v-if="showPopup" class="translate-extention" :style="{top: topPosition + 'px', left: leftPosition + 'px'}">
    <div class="block">
      <select v-model="selectedSourceLanguage" @change="setTranslateText">
        <option v-for="sourceLanguage in sourceLanguages" :value="sourceLanguage.lang" :key="sourceLanguage.lang">
          {{ sourceLanguage.name }}
        </option>
      </select>
      <p>{{ selectedText }}</p>
    </div>

    <div class="block">
      <select v-model="selectedTranslateLanguage" @change="setTranslateText">
        <option v-for="translateLanguage in translateLanguages" :value="translateLanguage.lang" :key="translateLanguage.lang">
          {{ translateLanguage.name }}
        </option>
      </select>
      <p>{{ translateText }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import debounce from 'lodash.debounce';

// shanti.oren@buycow.org
export default {
  data() {
    return {
      showPopup: false,
      selectedText: '',
      translateText: '',
      selectedSourceLanguage: 'en',
      sourceLanguages: [
        { lang: 'en', name: 'English' },
        { lang: 'it', name: 'Italian' },
      ],
      selectedTranslateLanguage: 'ukr',
      translateLanguages: [
        { lang: 'ukr', name: 'Ukrainian' },
        { lang: 'it', name: 'Italian' },
      ],
      topPosition: 0,
      leftPosition: 0,
    }
  },
  methods: {
    // TODO: rename
    setTranslateText() {
      // TODO: delete user name and key before send to review
      axios
        .get(`https://api.mymemory.translated.net/get?q=${this.selectedText}&langpair=${this.selectedSourceLanguage}|${this.selectedTranslateLanguage}&key=4d22ec0bbf1a8a7327a7&user=shanti.oren`)
        .then(({ data }) => {
          this.translateText = data.responseData.translatedText;
          console.log(data)
        })
        .catch((err) => console.log(err));
      // this.translateText = 'Запрос на API!'
    },
    handle() {
      const text = window.getSelection().toString();
      const { top, left, height } = window.getSelection().getRangeAt(0).getBoundingClientRect();

      this.topPosition = top + height;
      this.leftPosition = left;

      if (text.length > 0) {
        this.selectedText = text;
        this.setTranslateText();
        this.showPopup = true;
      } else {
        this.selectedText = '';
        this.showPopup = false;
      }
    }
  },
  mounted() {
    document.addEventListener('selectionchange', debounce(this.handle, 400));
  }
}
</script>

<style scoped>
  .translate-extention {
    position: absolute;
    z-index: 100;
    width: 350px;
    height: 250px;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.5);
  }
  .block {
    height: 50%;
    overflow-y: auto;
    border-bottom: 1px solid black;
  }
</style>
