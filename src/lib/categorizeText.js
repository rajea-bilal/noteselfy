import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


export async function categorizeText(text) {
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system", 
        "content": "You are a helpful assistant that categorizes text."
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

