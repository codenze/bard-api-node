# Bard-API-Node (Updated for Gemini API)

## Description
**bard-api-node** is a Node.js library for interacting with Bard, an AI Chatbot developed by Google. Bard is based on Google's Large language model (LLM), LaMDA, which is designed to generate human-like text and images in response to prompts. This updated version of the library is aligned with the launch of Gemini API, the successor to Bard, and integrates with the official Google API services.

## What is Bard (Gemini)?
Bard, now known as Gemini, is an AI Chatbot developed by Google, based on Google’s Large language model (LLM), LaMDA. Similar to how ChatGPT is based on GPT, Gemini utilizes neural networks to mimic the underlying architecture of the brain in the form of a computer. Gemini is conversational and allows users to write a prompt and receive human-like text and images generated by artificial intelligence.

## Installation

To use the Bard-API-Node library in your project, you can install it via npm directly:
```
npm install bard-api-node
```
or can install it via npm from Github:
```
npm install git+https://github.com/codenze/bard-api-node.git
```


## Obtaining API Key

To get started with the Bard API, you need to obtain an API key from the Google AI Studio. Follow the steps below to acquire your API key:

1. **Sign in to Google Account**:
   - Make sure you are signed in to your Google account.

2. **Create a New Project**:
   - Visit [Google Cloud Console](https://console.cloud.google.com/projectcreate).
   - Enter a project name of your choice.
   - Click on "Create" to create the project.
   -    <img width="854" alt="Screenshot 2024-03-01 at 10 15 19 PM" src="https://github.com/codenze/bard-api-node/assets/125561714/e35f763b-0447-4c82-aacd-1cc38518890c">

3. **Visit Google Ai Studio for API Key**:
   - After creating the project, navigate to [API Key creation page](https://aistudio.google.com/app/apikey).
   -    <img width="854" alt="Screenshot 2024-03-01 at 10 16 25 PM" src="https://github.com/codenze/bard-api-node/assets/125561714/311e3c4e-c1a7-4b47-9a27-0ac85cc6fda9">
   - Click on "Create API key".
   - Choose the project you just created from the dropdown menu labeled "Search Google Cloud projects".
   - <img width="854" alt="Screenshot 2024-03-01 at 10 17 05 PM" src="https://github.com/codenze/bard-api-node/assets/125561714/272ab018-80f8-4e40-9dac-e7417360e780">
   - Click on "Create API key in exsisting project".
   - Copy the API key.
   - <img width="854" alt="Screenshot 2024-03-01 at 10 17 27 PM" src="https://github.com/codenze/bard-api-node/assets/125561714/70549631-ecbb-46f1-8546-76d51cba0dab">

5. **Paste API Key into Code**:
   - Paste the API key into your code to initialize the BardAPI object.

## Usage

```javascript
javascript const { BardAPI } = require('bard-api-node');

async function testAssistant() {
  try { // Initialize BardAPI object const bard = new BardAPI();

  // Set API key
  const apiKey = 'YOUR_API_KEY'; // Replace 'YOUR_API_KEY' with the obtained API key
  // Initialize chat with API key
  await bard.initilizeChat(apiKey);
  // Send a query to Bard
  const response = await bard.getBardResponse("Greetings! What can you do for me?");
  console.log(response);
  } catch (error) {
    console.error('Error:', error);
  }
}

testAssistant();
```
Make sure to replace `YOUR_API_KEY` with the actual API key obtained from Google AI Studio.

## Acknowledgements
This Node.js library for interacting with the Bard chat assistant is powered by the official Google AI Studio API and utilizes the `@google/generative-ai` npm library. The integration with Google's Gemini AI and the use of the `@google/generative-ai` library serve as the foundation for this implementation.

I extend my gratitude to the Google AI team for providing access to their advanced AI capabilities and for the comprehensive documentation that facilitated the development of this library.

## Feedback
I welcome any feedback, bug reports, or problems you may encounter while using this library. If you have any issues or suggestions, please don't hesitate to reach out. You can send your reports to [de.inzimam@gmail.com](mailto:de.inzimam@gmail.com).

Thank you for your support and feedback!

## License
This project is licensed under the [MIT License](LICENSE).
If you find this project helpful in your own work, I would appreciate a star or acknowledgment in your projects.

