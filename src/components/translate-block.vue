<template>
  <div class="block">
      <div class="select">
        <select
          :value="language"
          @change="setLanguage">
          <option
            v-for="lang in languages"
            :value="lang.lang"
            :key="lang.lang">
            {{ lang.name }}
          </option>
        </select>
        <img class="flag" :src="flag" alt="flag">
      </div>
      <p class="text" v-html="text"></p>
    </div>
</template>

<script>
export default {
  props: {
    languages: {
      type: Array,
    },
    language: {
      type: String,
    },
    flag: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  methods: {
    setLanguage(event) {
      this.$emit('setLanguage', event);
    }
  }
}
</script>

<style scoped>
  .block {
    display: flex;
    flex-direction: column;
    height: 50%;
    margin-bottom: 5px;
  }
  .select {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  select {
    width: 80%;
  }
  .flag {
    width: 40px;
  }
  .text {
    margin: 0;
    padding: 5px;
    overflow-y: auto;
    background-color: #f7f5f5;
  }
  .text::-webkit-scrollbar {
    width: 5px;
  }
  .text::-webkit-scrollbar-track {
    background: #ddd;
  }
  .text::-webkit-scrollbar-thumb {
    background: #666;
  }
</style>
