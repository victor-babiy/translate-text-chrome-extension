<template>
  <div>
    Selected text:
    {{ selectedText }}
    TranslatedText: 
    {{ translateText }}
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      selectedText: '',
      translateText: '',
    }
  },
  methods: {
    setTranslateText() {
      axios
        .get()
        .then(({ data }) => {
          this.translateText = data.result;
        })
        .catch((err) => console.log(err));
    }
  },
  mounted() {
    //TODO: refactor use vue-rx (orr add debounce)
    document.addEventListener('selectionchange', () => {
      const text = window.getSelection().toString();

      if (text.length > 0) {
        this.selectedText = text;
        this.setTranslateText();
      } else {
        this.selectedText = '';
      }
    })
  }
}
</script>

