import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


export async function categorizeText(text) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4-1106-preview",
    messages: [
      {
        role: "system", 
        "content": "You are a helpful assistant that categorizes text into a single category."
      },
      {
        role: "user", 
        content: `Categorize this text: ${text} in a single category`
      }
    ],
  });

  
  const result = completion?.choices[0]?.message?.content;
  console.log(result)
  return result
}

