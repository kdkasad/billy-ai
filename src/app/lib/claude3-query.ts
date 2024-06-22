const Anthropic = require('@anthropic-ai/sdk').default;

const API_KEY = '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';

const anthropic = new Anthropic({
  apiKey: API_KEY,
});

async function analyzeText(text: string) {
  // Construct the prompt for the Anthropic model
  const prompt = `INSTRUCTIONS: "You are an advanced assistant and are well-versed in the policies and ideas of left and right wings. You will read the following text and determine where it ranks on a scale from -10 to 10, with any value less than 0 being considered left wing and any value greater than 0 considered right wing. Determine the extent to which the provided text is right or left wing and assign a number to the text in that range. Output that number and specify what pieces in the text helped make your decision"

  TEXT: "${text}"`;

  try {
    // Call Anthropic API to get analysis
    const msg = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20240620",
      max_tokens: 1024,
      messages: [{ role: "user", content: prompt }],
    });

    // Extract and log the response
    const output = msg.content || "";
    console.log("Analysis Result:", output);
  } catch (error) {
    console.error('Error analyzing text:', error);
  }
}

// Example usage
const inputText = "I support right wing policies.";
analyzeText(inputText);
