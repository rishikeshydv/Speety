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
        messages: [{role:"system",content:"Your are a Real Estate AI Agent"},{ role: 'user', content: prompt }],
        model: 'ft:gpt-3.5-turbo-0125:personal::9hVfplMI',
      });   
    return chatCompletion.choices[0].message.content;
}

export default getResponse;
