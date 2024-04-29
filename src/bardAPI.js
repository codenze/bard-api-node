const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

class BardAPI {
  constructor() {
    this.safetySettings;
    this.generationConfig;
    this.chat;
    this.defultSettings();
  }

  defultSettings() {
    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };

    const securitySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
    ];

    this.setResponseGenerationConfig(generationConfig);
    this.setSafetySettings(securitySettings);
  }

  setResponseGenerationConfig(generationConfig = null) {
    if (generationConfig) {
      this.generationConfig = generationConfig;
    }
  }

  setSafetySettings(securitySettings = null) {
    if (securitySettings) {
      this.safetySettings = securitySettings;
    }
  }

  initializeChat(apiKey) {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    this.chat = model.startChat({
      generationConfig: this.generationConfig,
      safetySettings: this.safetySettings,
    });
  }

  async getBardResponse(input) {
    let bard_answer = { response: {}, text: '' };
    try {
      const result = await this.chat.sendMessage(input);
      const response = result.response;
      bard_answer.response = response;
      bard_answer.text = response.text();
    } catch (error) {
      bard_answer.response = error.response || {};
      bard_answer.text = error.message;
    }
    return bard_answer;
  }
}

module.exports = BardAPI;
