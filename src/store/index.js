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
    setSourceLanguageFlag(state, flag) {
      state.sourceLanguageFlag = flag;
    },
    setTranslationLanguageFlag(state, flag) {
      state.translationLanguageFlag = flag;
    }
  },
  actions: {
    translateText({ commit, state }) {
      return axios
        .get(`https://api.mymemory.translated.net/get?q=${state.selectedText}&langpair=${state.sourceLanguage}|${state.translationLanguage}&key=4d22ec0bbf1a8a7327a7&user=shanti.oren`)
        .then(({ data }) => {
          console.log(data);
          commit('setTranslationText', data.responseData.translatedText);
        })
        .catch(err => console.log(err));

      // return commit('setTranslationText', 'Text');
    },
    setFlags({ commit, state }) {
      // const countries = [state.sourceLanguage, state.translationLanguage].join(';');
      const countries = state.languages.map(({country}) => country).join(';');
      
      axios
        .get(`https://restcountries.eu/rest/v2/alpha/?codes=${countries}`)
        .then(({data}) => {
          commit('setSourceLanguageFlag', data[0].flag)
          commit('setTranslationLanguageFlag', data[1].flag)
          console.log(data)
        })
        .catch(err => console.log(err));
    }
  },
});
