// pages/api/chat.js
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { message } = req.body;

    // Call the OpenAI API to get the model's response
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'system', content: 'You are a user' }, { role: 'user', content: message }],
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPEN_API_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    const { choices } = response.data;
    const answer = choices[0].message.content;

    res.status(200).json({ answer });
  } else {
    res.status(405).end();
  }
}
