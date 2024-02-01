import { ToolController } from './tool.controller';
import { ToolService } from './tool.service';
import * as superagent from 'superagent';

describe('Tool', () => {
  let toolController: ToolController;
  let toolService: ToolService;

  beforeAll(() => {
    toolService = new ToolService();
    toolController = new ToolController(toolService);
  });

  it('should return dailySentence', async () => {
    jest.spyOn(superagent, 'get').mockResolvedValueOnce({
      text: '{"note": "中文", "content": "english"}',
    });
    const data = await toolController.dailySentence();
    expect(data).toMatchObject({
      zh: '中文',
      en: 'english',
    });
  });

  it('should return null when dailySentence has no data', async () => {
    jest.spyOn(superagent, 'get').mockResolvedValueOnce({
      text: null,
    });
    const data = await toolController.dailySentence();
    expect(data).toBeNull();
  });
});
