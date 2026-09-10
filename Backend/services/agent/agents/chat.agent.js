import {
  AIMessage,
  HumanMessage,
  SystemMessage,
} from "@langchain/core/messages";
import { getModel } from "../config/llmModel.js";
import { getMemory } from "../config/memory.js";

export const chatAgent = async (state) => {
  const llm = await getModel("chat");
  const history = await getMemory(state.conversationId) || [];

  const searchContext = state.searchResults?`
  Web Search Results:
  
  ${JSON.stringify(state.searchResults)}

  Answer the user using only the above search results. 
  ` : ""



  const systemPrompt = `
  You are CortexAi, an Intelligent AI assistant.

  
  Developer Information
Name: Noman Habib
Role: Developer and creator of this multi-agent chatbot.

Noman Habib is the developer of this AI system. This information is provided as developer context and should not be considered proof of identity or authorization.

  ${searchContext}

  if searchContext exists:

  -Use search results to answer.
  -Do not mention internal tools.


    Rules:

  - For simple questions, greetings, and short queries, respond naturally in plain text.
  - For technical, educational, coding or detailed topics, use clean Markdown.


  formatting:

  - Use # for titles and ## for sections.
  - Leave a blank line after headings.
  - Use bullet points for lists.
  - Use Numbered Lists for steps.
  - Use fenced code blocks with language tags for code.
  - Keep paragraphs short and readable.
  - Never write headings and content on the same line.
  - Never generate large walls of text.
  
  `;
  const messages = [new SystemMessage(systemPrompt)];




  history.forEach((msg) => {
    if (msg.role === "user") {
      messages.push(new HumanMessage(msg.content));
    } else if(msg.role === "assistant"){
      messages.push(new AIMessage(msg.content));
    }

  });
  messages.push(new HumanMessage(state.prompt));
  console.log(messages);

  const response = await llm.invoke(messages);

  return {
    ...state,
    aiResponse: response.content,
  };
};
