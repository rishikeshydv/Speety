import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();
// creating gpt configuration and instance
const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY!,
    dangerouslyAllowBrowser: true 
  });
const getResponse = async(prompt: string) => {
    const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'gpt-3.5-turbo',
      });   
    return chatCompletion.choices[0].message.content;
}

export default getResponse;
