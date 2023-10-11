const axios = require('axios');
const qs = require('qs');

class BardAPI {
  constructor() {
    this.timeout = 6000;
    this.proxies = null;
    this.conversation_id = 'c_2d6e5d40d49e04c7';
    this.response_id = '';
    this.choice_id = '';
    this.session = axios.create();
    this.params = {
      bl: 'boq_assistant-bard-web-server_20230419.00_p1',
      _reqid: '',
      rt: 'c',
    };
    this.data = {
      'f.req': '',
      at: '',
    };
    this.post_url =
      'https://bard.google.com/_/BardChatUi/data/assistant.lamda.BardFrontendService/StreamGenerate';
  }

  async setSession(key = '', apiKey = '') {
    const headers = {
      "Host": "bard.google.com",
      "X-Same-Domain": "1",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36",
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      "Origin": "https://bard.google.com",
      "Referer": "https://bard.google.com/",
    };
    this.session.defaults.headers = headers;
    this.session.defaults.headers.Cookie = `${key}=${apiKey}`;
    await this.setSnim0e();
  }


  setParamsAndData(req_id, input_text_struct) {
    this.params._reqid = String(req_id);
    this.data['f.req'] = JSON.stringify([null, JSON.stringify(input_text_struct)]);

  }

  async getBardResponse(input_text) {
    if (!this.data.at) {
      return {content: "Authentication Error! Please make sure to initialize with the correct __Secure-1PSID or __Secure-3PSID value. Check your credentials and try again."};
    }

    let req_id = parseInt(Math.random().toString().slice(2, 6));

    const input_text_struct = [
      [input_text],
      null,
      [this.conversation_id, this.response_id, this.choice_id],
    ];

    this.setParamsAndData(req_id, input_text_struct);

    const response = await this.session.post(this.post_url, qs.stringify(this.data), {
      params: this.params,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const resp_dict = JSON.parse(response.data.split('\n')[3])[0][2];

    if (resp_dict === null) {
      return { content: `Response Error: ${response.data}.` };
    }

    const parsed_answer = JSON.parse(resp_dict);

    const bard_answer = {
      content: parsed_answer[4][0][1][0],
      conversation_id: parsed_answer[1][0],
      response_id: parsed_answer[1][1],
      factualityQueries: parsed_answer[3],
      textQuery: parsed_answer[2][0] || '',
      choices: parsed_answer[4].map((i) => ({ id: i[0], content: i[1] })),
    };

    this.conversation_id = bard_answer.conversation_id;
    this.response_id = bard_answer.response_id;
    this.choice_id = bard_answer.choices[0].id;
    req_id += 100000;

    return bard_answer;
  }

  async setSnim0e() {
    try {
      const response = await this.session.get("https://bard.google.com/", {
        timeout: this.timeout,
        proxies: this.proxies,
      });

      if (response.status !== 200) {
        throw new Error(`Response Status: ${response.status}`);
      }

      if (!response.headers['set-cookie']) {
        throw new Error("Invalid __Secure-1PSID or __Secure-3PSID value. Please ensure you provide a valid __Secure-1PSID or __Secure-3PSID value.");
      }

      const regex = /SNlM0e":"(.*?)"/;
      const match = response.data.match(regex);

      if (match) {
        this.data.at = match[1];
      } else {
        throw new Error("Failed to retrieve SNlM0e pattern. Please ensure you provide a valid __Secure-1PSID or __Secure-3PSID value.");
      }
    } catch (error) {
      console.error(error);
    }
  }
}
module.exports = BardAPI;
