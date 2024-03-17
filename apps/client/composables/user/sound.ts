import { ref } from "vue";

type storeParamsType = {
  name:string;
  value : string | boolean;
}

export const AUTO_PLAY_SOUND = 'autoPlaySound'
export const AUTO_PLAY_SOUND_TYPE = 'pronunciationType'
const autoPlaySound = ref(true);




const pronunciationType = ref('American');

function loadCache() {
  const value = localStorage.getItem(AUTO_PLAY_SOUND)
  const pronunciation_value = localStorage.getItem(AUTO_PLAY_SOUND)
  store('autoSound',value !== 'false'); 
  store('pronunciationType',pronunciation_value === 'American' ? true : false); 
}

const store = function(type: string,value: boolean) {
  if(type === 'autoSound') {
    autoPlaySound.value = value
    localStorage.setItem(AUTO_PLAY_SOUND, `${value}`)
  }else{
    pronunciationType.value = !value ? 'American' : 'British';
    localStorage.setItem(AUTO_PLAY_SOUND_TYPE, `${pronunciationType.value}`)
  }
  
}

const toggleAutoPlaySound = () => {
  store('autoSound', !autoPlaySound.value);
}

const togglePronunciation = () => {
  store('pronunciationType',pronunciationType.value === 'American' ? true : false)
}

const isAutoPlaySound = () => autoPlaySound.value
const pronunciation = () => pronunciationType.value

export function useAutoSound() {
  loadCache()
  return {
    autoPlaySound,
    isAutoPlaySound,
    toggleAutoPlaySound
  }
}

export function useTogglePronunciation() {
  loadCache()
  return {
    pronunciationType,
    pronunciation,
    togglePronunciation
  }
}