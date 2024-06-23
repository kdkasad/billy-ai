const Anthropic = require('@anthropic-ai/sdk').default;

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function analyzeText(text: string): Promise<string> {
    // Construct the prompt for the Anthropic model
    const prompt = `INSTRUCTIONS: "You are an advanced assistant and are well-versed in the policies and ideas of left and right political wings. You will read the following bill and determine where it ranks on a scale from -10 to 10, with any value less than 0 being considered left wing and any value greater than 0 considered right wing. Determine the extent to which the provided text is right or left wing and assign a number to the text in that range. The format will be:
    FORMAT STARTS HERE
    Rating: INSERT RATING HERE
    FORMAT ENDS HERE
    DO NOT WRITE A SINGLE OTHER THING OTHER THAN THE SPECIFIED FORMAT

    TEXT: "${text}"`;

    try {
        // Call Anthropic API to get analysis
        const msg = await anthropic.messages.create({
            model: "claude-3-5-sonnet-20240620",
            max_tokens: 1024,
            messages: [{ role: "user", content: prompt }],
        });

        // Extract and return the response
        const output = msg.content || "";
        return output[0].text;
    } catch (error) {
        console.error('Error analyzing text:', error);
        throw error; // Propagate the error up to the caller
    }
}

// Example usage:
//const inputText = "I support right wing policies.";
//analyzeText(inputText).then(result => console.log("Analysis Result:", result));
