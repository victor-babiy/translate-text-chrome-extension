import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { languages } from '../countries';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sourceLanguage: 'en',
    translationLanguage: 'ukr',
    sourceLanguageFlag: '',
    translationLanguageFlag: '',
    selectedText: '',
    translationText: '',
    languages,
  },
  mutations: {
    setSourceLanguage(state, language) {
      state.sourceLanguage = language;
    },
    setTranslationLanguage(state, language) {
      state.translationLanguage = language;
    },
    setSelectedText(state, text) {
      state.selectedText = text;
    },
    setTranslationText(state, text) {
      state.translationText = text;
    },
    setFlags(state) {
      const sourceLanguageFlag = state.languages.filter(country => country.lang === state.sourceLanguage)[0].flag;
      const translationLanguage = state.languages.filter(country => country.lang === state.sourceLanguage)[0].flag;
      state.sourceLanguageFlag = sourceLanguageFlag;
      state.translationLanguageFlag = translationLanguage;
    },
  },
  actions: {
    translateText({ commit, state }) {
      // return axios
      //   .get(`https://api.mymemory.translated.net/get?q=${state.selectedText}&langpair=${state.sourceLanguage}|${state.translationLanguage}&key=4d22ec0bbf1a8a7327a7&user=shanti.oren`)
      //   .then(({ data }) => {
      //     console.log(data);
      //     commit('setTranslationText', data.responseData.translatedText);
      //   })
      //   .catch(err => console.log(err));

      return commit('setTranslationText', 'Text');
    },
  },
});
