import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime';
import { fromEnv } from '@aws-sdk/credential-provider-env';

const client = new BedrockRuntimeClient({
  region: process.env.AWS_REGION,
  credentials: fromEnv(),
});

export const invokeModel = async (params: {
  modelId: string;
  prompt: string;
  maxTokens: number;
  temperature: number;
}) => {
  const input = {
    modelId: params.modelId,
    body: JSON.stringify({
      prompt: params.prompt,
      max_tokens: params.maxTokens,
      temperature: params.temperature,
    }),
    contentType: 'application/json',
    accept: 'application/json',
  };

  const command = new InvokeModelCommand(input);
  return await client.send(command);
};
