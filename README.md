# Vercel AI SDK with Google Gemini

A simple Node.js script demonstrating how to use the Vercel AI SDK to call Google's Gemini model.

## Prerequisites

- Node.js (v18 or higher)
- A Google AI API key

## Setup

1. **Clone or navigate to this directory**

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Get a Google AI API key:**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Copy the key

4. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   Then edit the `.env` file and replace `your_api_key_here` with your actual API key:
   ```
   GOOGLE_GENERATIVE_AI_API_KEY=your_actual_api_key
   ```

## Usage

Run the script:
```bash
npm start
```

Or directly with Node:
```bash
node script.js
```

## What it does

The script uses the Vercel AI SDK to:
- Connect to Google's Gemini 1.5 Flash model
- Send a prompt asking for a poem about AI and creativity
- Display the generated response

## Customization

You can modify the `script.js` file to:
- Change the prompt
- Adjust temperature (creativity level)
- Modify max tokens
- Use different Gemini models (e.g., `gemini-1.5-pro`, `gemini-1.0-pro`)

## Dependencies

- `ai`: The core Vercel AI SDK
- `@ai-sdk/google`: Google AI provider for the AI SDK
- `dotenv`: For loading environment variables

## Troubleshooting

- **API Key Error**: Make sure your `.env` file exists and contains a valid Google AI API key
- **Import Error**: Ensure you're using Node.js v18+ and that `"type": "module"` is in package.json
