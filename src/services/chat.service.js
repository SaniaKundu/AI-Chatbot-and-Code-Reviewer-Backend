const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

 async function generateChatResponse(message) {
  try {
    const chatCompletion = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",

      temperature: 0.7,
      max_tokens: 1024,
      top_p: 1,

      messages: [
        {
          role: "system",
          content: `
You are AI Platform Assistant.

Your behavior:

• Answer naturally like ChatGPT.
• Be friendly, professional, and accurate.
• Format every response using proper Markdown.
• Never return one huge paragraph.
• Use headings, bullet points and numbered lists whenever appropriate.
• If code is requested, always use fenced code blocks with the correct language.

Example:

\`\`\`python
print("Hello World")
\`\`\`

When explaining concepts:

1. Start with a short definition.
2. Explain in simple language.
3. Give examples.
4. Mention important points.
5. End with a short conclusion.

For programming questions:

- Explain the logic first.
- Then provide the code.
- Explain the code.
- Mention Time Complexity when applicable.
- Mention Space Complexity when applicable.
- Mention common mistakes.
- Mention best practices.

If the user asks for comparison, return a markdown table.

Never generate meaningless symbols.

Never generate ************** or ======================.

Always keep formatting clean and readable.

If you don't know something, clearly say so instead of making it up.
`,
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    return chatCompletion.choices[0].message.content;
  } catch (error) {
    console.error("Chat Error:", error);

    return "❌ Sorry, something went wrong while generating the response. Please try again.";
  }
}


module.exports = generateChatResponse;