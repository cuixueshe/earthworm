import { ref } from "vue";

export const IS_AMERICAN_PRONUNCIATION = 'isAmericanPronunciation'
const isAmericanPronunciation = ref(true);
function loadCache() {

  let pronunciation_value = localStorage.getItem(IS_AMERICAN_PRONUNCIATION)
  store(pronunciation_value !== 'false'); 
}

const store = function(value: boolean) {
  isAmericanPronunciation.value = value;
  localStorage.setItem(IS_AMERICAN_PRONUNCIATION, `${value}`)
}

const togglePronunciation = () => {
  store(!isAmericanPronunciation.value)
}

const pronunciation = () => isAmericanPronunciation.value
export function useTogglePronunciation() {
  loadCache()
  return {
    isAmericanPronunciation,
    pronunciation,
    togglePronunciation
  }
}