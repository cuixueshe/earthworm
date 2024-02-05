import { ref } from "vue"

export const AUTO_PLAY_SOUND = 'autoPlaySound'

const autoPlaySound = ref(true)

function loadCache() {
  const value = localStorage.getItem(AUTO_PLAY_SOUND)
  store(value !== 'false')  
}

const store = function(value: boolean) {
  autoPlaySound.value = value
  localStorage.setItem(AUTO_PLAY_SOUND, `${value}`)
}

const toggleAutoPlaySound = () => {
  store(!autoPlaySound.value)
}

const isAutoPlaySound = () => autoPlaySound.value

export function useAutoSound() {
  loadCache()
  return {
    autoPlaySound,
    isAutoPlaySound,
    toggleAutoPlaySound
  }
}
