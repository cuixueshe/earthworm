import { it, expect, describe, vi, afterEach, beforeEach } from 'vitest'
import { defaultEnSentence, defaultZhSentence, resetSentenceLoading, useDailySentence, useSummary } from '../summary';
import * as toolApi from "~/api/tool";
import { useSetup } from '~/tests/helper/component';
import { flushPromises } from '@vue/test-utils';

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
        resetSentenceLoading()
        vi.resetAllMocks()
      }
    })

    it('should load the daliy sentence', async () => {
      const { wrapper } = useSetup(() => {
        const { zhSentence, enSentence } = useDailySentence()
        return {
          zhSentence,
          enSentence
        }
      })
      
      await flushPromises()

      const {
        zhSentence,
        enSentence
      } = wrapper.vm
      
      expect(toolApi.fetchDailySentence).toBeCalled()
      expect(zhSentence).toBe(dummyRes.zh)
      expect(enSentence).toBe(dummyRes.en)
    }) 

    it('should only load sentence once', async () => {
      useSetup(() => {
        useDailySentence()
      })
      
      await flushPromises()
      
      useSetup(() => {
        useDailySentence()
      })
      
      await flushPromises()
      
      expect(toolApi.fetchDailySentence).toBeCalledTimes(1)
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
