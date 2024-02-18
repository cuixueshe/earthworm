import { it, expect, describe, vi, afterEach, beforeEach } from 'vitest'
import { defaultEnSentence, defaultZhSentence, useDailySentence, useSummary } from '../summary';
import * as toolApi from "~/api/tool";
import { useSetup } from '~/tests/helper/component';
import { nextTick } from 'vue';

vi.mock('~/api/tool')

describe('summary', () => {

  describe('summary sentence', () => {
    const dummyRes = {
      en: 'en',
      zh: 'zh'
    }
    beforeEach(() => {
      vi.mocked(toolApi.fetchDailySentence).mockResolvedValue(dummyRes)
      return () => {
        vi.resetAllMocks()
      }
    })
    it('should return default sentence at first', async () => {
      useSetup(() => {
        const { zhSentence, enSentence } = useDailySentence()
        expect(zhSentence.value).toBe(defaultZhSentence)
        expect(enSentence.value).toBe(defaultEnSentence)
      })
    })

    it('should load the daliy sentence', async () => {
      useSetup(async () => {
        const { zhSentence, enSentence } = useDailySentence()
        await nextTick()
        expect(toolApi.fetchDailySentence).toBeCalled()
        expect(zhSentence.value).toBe(dummyRes.zh)
        expect(enSentence.value).toBe(dummyRes.en)
      })
    }) 

    it('should only load sentence once', async () => {
      useSetup(async () => {
        const { getDailySentence } = useDailySentence()
        await getDailySentence()
        await getDailySentence()
        await getDailySentence()
        expect(toolApi.fetchDailySentence).toBeCalledTimes(1)
      })
    }) 
  })

  describe('summary modal control', () => {
    it('should show summary modal', () => {
      const { showModal, showSummary } = useSummary()    
      showSummary()
      expect(showModal.value).toBeTruthy()
    })

    it('should hide summary modal', () => {
      const { showModal, hideSummary } = useSummary()    
      hideSummary()
      expect(showModal.value).toBeFalsy()
    })

    it('should return a same value in different hook', () => {
      const { showSummary } = useSummary()
      showSummary()
      const { showModal: anotherShowModal } = useSummary()
      expect(anotherShowModal.value).toBeTruthy()
    })
  })
})
