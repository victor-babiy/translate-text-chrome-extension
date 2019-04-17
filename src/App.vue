<template>
  <div
    v-if="showPopup"
    class="translate-extention"
    :style="{ top: postitionTop, left: positionLeft }">

    <div class="block">
      <select
        :value="sourceLanguage" 
        @change="setSourceLanguage">
        <option
          v-for="sourceLanguage in languages"
          :value="sourceLanguage.lang"
          :key="sourceLanguage.lang">
          {{ sourceLanguage.name }}
        </option>
      </select>
      <img :src="sourceLanguageFlag" alt="flag" width="25">
      <p>{{ selectedText }}</p>
    </div>

    <div class="block">
      <select :value="translationLanguage" @change="setTranslationLanguage">
        <option
          v-for="translationLanguage in languages"
          :value="translationLanguage.lang" 
          :key="translationLanguage.lang">
          {{ translationLanguage.name }}
        </option>
      </select>
      <img :src="translationLanguageFlag" alt="flag" width="25">
      <p>{{ translationText }}</p>
    </div>

  </div>
</template>

<script>
import debounce from 'lodash.debounce';

// shanti.oren@buycow.org
export default {
  data() {
    return {
      showPopup: false,
      postitionTop: '',
      positionLeft: '',
    }
  },
  computed: {
    sourceLanguage() {
      return this.$store.state.sourceLanguage;
    },
    translationLanguage() {
      return this.$store.state.translationLanguage;
    },
    selectedText() {
      return this.$store.state.selectedText;
    },
    translationText() {
      return this.$store.state.translationText;
    },
    countryFlags() {
      return this.$store.state.countryFlags;
    },
    languages() {
      return this.$store.state.languages;
    },
    sourceLanguageFlag() {
      return this.$store.state.sourceLanguageFlag;
    },
    translationLanguageFlag() {
      return this.$store.state.translationLanguageFlag;
    }
  },
  methods: {
    handle() {
      const text = window.getSelection().toString();

      if (text.length > 0) {
        this.$store.commit('setSelectedText', text);
        this.$store.dispatch('translateText')
          .then(() => {
            this.showPopup = true;
            this.setPopupPosition();
          });
      } else {
        this.showPopup = false;
        this.$store.commit('setSelectedText', '');
      }
    },
    setPopupPosition() {
      const { top, left, height } = window.getSelection()
        .getRangeAt(0)
        .getBoundingClientRect();

      this.postitionTop = top + height + 'px';
      this.positionLeft = left + 'px';
    },
    setSourceLanguage(event) {
      this.$store.commit('setSourceLanguage', event.target.value);
      this.$store.dispatch('translateText');
      this.$store.commit('setSourceLanguageFlag');
    },
    setTranslationLanguage(event) {
      this.$store.commit('setTranslationLanguage', event.target.value);
      this.$store.dispatch('translateText');
      this.$store.commit('setTranslationLanguageFlag');
    },
  },
  created() {
    this.$store.commit('setFlags');
  },
  mounted() {
    document.addEventListener('selectionchange', debounce(this.handle, 250));
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
