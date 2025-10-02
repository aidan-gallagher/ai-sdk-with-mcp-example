import { experimental_createMCPClient as createMCPClient, generateText, stepCountIs } from 'ai';
import { Experimental_StdioMCPTransport } from 'ai/mcp-stdio';
import { google } from '@ai-sdk/google';
import { config } from 'dotenv';

// Load environment variables
config();

async function main() {
  let mcpClient;

    // Check if API key is available
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
        console.error('❌ Error: GOOGLE_GENERATIVE_AI_API_KEY environment variable is not set');
        process.exit(1);
    }

    // Create MCP client for GitHub
    mcpClient = await createMCPClient({
      transport: new Experimental_StdioMCPTransport({
        command: 'npx',
        args: ['-y', '@modelcontextprotocol/server-github'],
      }),
    });

    // Get available tools
    const tools = await mcpClient.tools();

    // Invoke LLM
    const { text, toolCalls, toolResults } = await generateText({
      model: google('gemini-2.5-flash'),
      tools,
      messages: [
        {
          role: 'user',
          content: 'Find the most recent issue opened on the sonic-net/sonic-buildimage repository on GitHub.'
        }
      ],
      maxTokens: 500,
      temperature: 0.1,
      stopWhen: stepCountIs(5),
    });

    // Print the answer
    console.log(text);
}

main()