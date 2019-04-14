<template>
  <div>
    Text: 
    {{ selectedText }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedText: '',
    }
  },
  mounted() {
    //TODO: refactor
    document.addEventListener('selectionchange', () => {
      const thetext = window.getSelection().toString();

      if (thetext.length > 0) {
        this.selectedText = thetext;
      } else {
        this.selectedText = '';
      }
    })
  }
}
</script>

