import { it, expect, describe, beforeEach } from 'vitest'
import { AUTO_PLAY_SOUND, useAutoSound } from '../sound';

describe('auto play sound', () => {
  beforeEach(() => {
    localStorage.removeItem(AUTO_PLAY_SOUND)
  })
  it('should be true if no cache', () => {
    const { autoPlaySound } = useAutoSound()
    expect(autoPlaySound.value).toBe(true)
  })

  it('should be equal to cache value if it exists', () => {
    localStorage.setItem(AUTO_PLAY_SOUND, 'false')
    const { autoPlaySound } = useAutoSound()
    expect(autoPlaySound.value).toBe(false)
  })

  it('should be toggle value', () => {
    const { autoPlaySound, toggleAutoPlaySound } = useAutoSound()
    toggleAutoPlaySound()
    expect(autoPlaySound.value).toBe(false)
  })
})
