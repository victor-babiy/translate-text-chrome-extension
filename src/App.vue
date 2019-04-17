<template>
  <div
    class="translate-extention"
    v-if="showPopup"
    :style="{ top: postitionTop, left: positionLeft }">
    <translate-block
      :languages="languages"
      :language="sourceLanguage"
      :flag="sourceLanguageFlag"
      :text="selectedText"
      @setLanguage="setSourceLanguage">
    </translate-block>
    <translate-block
      :languages="languages"
      :language="translationLanguage"
      :flag="translationLanguageFlag"
      :text="translationText"
      @setLanguage="setTranslationLanguage">
    </translate-block>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import debounce from 'lodash.debounce';
import translateBlock from './components/translate-block.vue';

export default {
  data() {
    return {
      showPopup: false,
      postitionTop: '',
      positionLeft: '',
    }
  },
  components: {
    translateBlock,
  },
  computed: mapState([
    'sourceLanguage',
    'translationLanguage',
    'selectedText',
    'translationText',
    'languages',
    'sourceLanguageFlag',
    'translationLanguageFlag',
  ]),
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
      const scrollTop = window.pageYOffset;

      this.postitionTop = top + height + scrollTop + 'px';
      this.positionLeft = left + 'px';
    },
    setSourceLanguage(event) {
      this.$store.commit('setSourceLanguage', event.target.value);
      this.$store.dispatch('translateText');
      this.$store.commit('setFlags');
    },
    setTranslationLanguage(event) {
      this.$store.commit('setTranslationLanguage', event.target.value);
      this.$store.dispatch('translateText');
      this.$store.commit('setFlags');
    },
  },
  created() {
    this.$store.commit('setFlags');
  },
  mounted() {
    // TODO: check
    document.addEventListener('selectionchange', debounce(this.handle, 250));
    // document.addEventListener('selectionchange', this.handle);
  }
}
</script>

<style scoped>
  * {
    box-sizing: inherit;
  }
  .translate-extention {
    position: absolute;
    z-index: 100;
    width: 300px;
    height: 200px;
    display: flex;
    flex-direction: column;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 3px;
    background-color: rgb(255, 255, 255);
    border-color: rgb(187, 187, 187) rgb(187, 187, 187) rgb(168, 168, 168);
    padding: 10px;
  }
</style>
