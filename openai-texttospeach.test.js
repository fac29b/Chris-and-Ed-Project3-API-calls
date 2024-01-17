const {speech} = require('./openai-texttospeach');

test('mp3 returned', async () => {
    const text = "this is a test to see if this returns an mp3";
    const data = await speech(text);
    expect(data).toMatch(/speech.mp3/);
  }, 10000);

//have increased the time this test allows as was timing out

