const {speech} = require('./openai-texttospeach');

test('testing description of Openai-Vision', async () => {
    const url = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Circle_-_black_simple.svg/800px-Circle_-_black_simple.svg.png";
    const data = await speech(url);
    expect(data).toMatch(/circle/);
  });