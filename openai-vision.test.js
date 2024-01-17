const {visionRequest} = require('./openai-vision');

test('testing description of Openai-Vision', async () => {
    const url = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Circle_-_black_simple.svg/800px-Circle_-_black_simple.svg.png";
    const data = await visionRequest(url);
    expect(data.message.content).toMatch(/circle/);
  });

