import { checkAgentLimit } from "../config/agentLimit.js";
import { getModel } from "../config/llmModel.js";
import { deductCredits } from "../utils/deductCredits.js";

export const codingAgent = async (state) => {
  try {
    await checkAgentLimit(state.userId,"coding")
    const intentLlm = await getModel("intent");
    const llm = await getModel("coding");

    const intentRes = await intentLlm.invoke(`
    You are an intent classifier.

  Return ONLY one of these values.

  CODE_GENERATION
  CODE_REVIEW
  CODE_EXPLAINATION
  DEBUGGING
  OPTIMIZATION
  CONVERSTION
  DOCUMENTATION

  User Request:
  ${state.prompt}`);

    const intent = intentRes.content;

    if (intent == "CODE_GENERATION") {
      const prompt = `
    You are CortexAI Coding Agent.

Generate the requested project.

Default Stack:
- HTML
- CSS
- JavaScript

Use React / Next.js / Vue ONLY if explicitly requested.

Rules:

- Keep HTML concise.
- Keep CSS concise.
- Keep JavaScript concise.
- Do not add unnecessary comments.
- Use a maximum of 3 sample items.
- Use maximum 2-3 images.
- Do not repeat code.
- Resonsive
- Modern UI
- CSS Variables
- Flexbox/Grid
- Smooth Scroll
- Hover Effects
- Beautiful Spacing
- Single Page unless user asks otherwise.

IMAGES
==========================

Always use real Unsplash images.

Never use placeholders.

Return ONLY valid JSON.

Schema:

{
  "files":[
  {
    "name":"index.html",
    "content":"..."
  },
  {
    "name":"style.css",
    "content":"..."
  },
  {
    "name":"script.js",
    "content":"..."
  }
 ]
}

Rules:

- Output must start with {
- Output must end with }
- No markdown
- No explanation
- No extra text
- No \`\`\`
- Never mention intent

User Request:

${state.prompt}

    `;
      const res = await llm.invoke(prompt);

      //Fix JSON Response
      const safeParseJSON = (raw) => {
        let text = raw.trim();

        // Strip ```json ... ``` or ``` ... ``` wrappers
        const fenceMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
        if (fenceMatch) {
          text = fenceMatch[1].trim();
        }

        // Fallback: grab from first { to last } in case of stray text
        const firstBrace = text.indexOf("{");
        const lastBrace = text.lastIndexOf("}");
        if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
          text = text.slice(firstBrace, lastBrace + 1);
        }

        // return JSON.parse(text);
        let data;
        try {
          data = safeParseJSON(res.content);
        } catch (parseErr) {
          console.log("JSON parse failed, raw output:", res.content);
          throw new Error("Model returned invalid JSON");
        }
      };

      const data = JSON.parse(res.content);
      await deductCredits(state.userId, "coding");

      return {
        ...state,
        aiResponse: "Code Generated Successfully.",
        artifacts: [
          {
            id: Date.now(),
            type: "Project",
            files: data.files || [],
            title: state.prompt,
          },
        ],
      };
    }

    const res = await llm.invoke(`

        The user's request is:

    ${intent}

    Return Markdown only.

    Never generate project files.

    Use heading like:

    # Overview

    ## Explanation

    ## Problems
    
    ## Improvements

    ## Best Practices

    ## Optimized Code (if needed)

    User Request:


    ${state.prompt}
  `);

    const data = res.content;
    await deductCredits(state.userId, "coding");

    return {
      ...state,
      aiResponse: data,
      artifacts: [],
    };
  } catch (error) {

   console.log(error); 
      return {
      ...state,
      aiResponse: error?.data.message || `❌Failed to Generate Code`,
      artifacts: []
    };
  }
};
