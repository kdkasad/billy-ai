import { BedrockRuntimeClient } from "@aws-sdk/client-bedrock-runtime";
import { defaultProvider } from "@aws-sdk/credential-provider-node";

const client = new BedrockRuntimeClient({
  region: "us-east-1", // or your preferred region
  credentials: defaultProvider(),
});

export default client;