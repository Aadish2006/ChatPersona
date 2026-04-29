const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI("AIzaSyDP0x9ybWZaP89eAZxnVSzLX1TRpdwTsmU");
async function run() {
  try {
    const models = await genAI.getGenerativeModel({ model: 'gemini-1.5-flash' }).generateContent('hello');
    console.log('Success');
  } catch (e) {
    console.error(e.message);
  }
}
run();
