#!/usr/bin/env node

import { experimental_createMCPClient as createMCPClient, generateText, stepCountIs } from 'ai';
import { Experimental_StdioMCPTransport } from 'ai/mcp-stdio';
import { google } from '@ai-sdk/google';
import { config } from 'dotenv';

// Load environment variables
config();

function printUsage() {
  console.log('Usage: ai-tool "<your prompt>"');
  console.log('Example: ai-tool "what is the latest github issue on sonic-buildimage"');
  process.exit(1);
}

async function main() {
  let mcpClient;

    // Parse command line arguments
    const args = process.argv.slice(2);
    
    if (args.length === 0) {
      console.error('❌ Error: No prompt provided');
      printUsage();
    }

    const prompt = args.join(' ');
    
    if (!prompt.trim()) {
      console.error('❌ Error: Empty prompt provided');
      printUsage();
    }

    // Check if API key is available
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      console.error('❌ Error: GOOGLE_GENERATIVE_AI_API_KEY environment variable is not set');
      console.error('Please set your Google AI API key in the .env file or as an environment variable');
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
    const { text } = await generateText({
      model: google('gemini-2.5-flash'),
      tools,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      maxTokens: 1000,
      temperature: 0.1,
      stopWhen: stepCountIs(5),
    });

    // Print the answer
    console.log(text);

    // Close MCP client
    if (mcpClient) {
        await mcpClient.close();
  }
}

main()