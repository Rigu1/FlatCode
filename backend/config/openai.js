const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config(); // Ensure dotenv is called before accessing process.env

console.log('API Key:', process.env.OPENAI_API_KEY); // 디버깅을 위해 환경 변수 출력

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

module.exports = openai;