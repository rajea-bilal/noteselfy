import { NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from 'openai';
import prisma from '@/lib/prisma';

// Configure the OpenAI API with your API key
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
// Create an instance of the OpenAI API
const openAI = new OpenAIApi(configuration);

export async function POST(request) {
  try {
    // Extract the text and screenshot ID from the request body
    const { extractedText, screenshotId } = await request.json();

    // Send a request to the OpenAI API for categorization
    const completion = await openAI.createChatCompletion({
      model: "gpt-3.5-turbo",  // Specify the GPT model to use
      messages: [
        // Set up the conversation context
        {
          role: "system", 
          content: `You are a helpful assistant that categorizes text.`},
        // Provide the text to be categorized
        {role: "user", 
        content: `Categorize this text: ${extractedText}`}
      ],
        max_tokens: 5,  // Limit the response to a single token (word)
        temperature: 0.2,  // Lower temperature for more focused responses
    });

    // Extract the category from the API response
    const category = completion.data.choices[0].message.content;
    // console.log(category)

    // Update the screenshot record in the database with the new category
    const updatedScreenshot = await prisma.screenshot.update({
      where: { id: screenshotId },  // Specify which screenshot to update
      data: { category },  // Update the category field
    });

    console.log(updatedScreenshot)
    // Send a success response back to the client
    return NextResponse.json({ 
      message: 'Categorization completed successfully',
      category,
      screenshot: updatedScreenshot
    });
  } catch (error) {
    // Log any errors that occur during the process
    console.error('Categorization error:', error);
    // Send an error response back to the client
    return NextResponse.json({ error: 'Categorization failed', details: error.message }, { status: 500 });
  }
}