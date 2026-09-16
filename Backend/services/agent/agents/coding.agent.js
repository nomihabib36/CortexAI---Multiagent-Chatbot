import { getModel } from "../config/llmModel.js";

export const codingAgent = async (state) => {
  try {
    const intentLlm = await getModel("intent")
  const llm = await getModel("coding")

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
  ${state.prompt}`)

  const intent = intentRes.content

  if(intent == "CODE_GENERATION"){
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

    `
    const res = await llm.invoke(prompt)
    const data = JSON.parse(res.content)    

    return {
    ...state,
    aiResponse: "Code Generated Successfully.",
    artifacts:[{
      id: Date.now(),
      type: "Project",
      files: data.files || [],
      title: state.prompt
    }]
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
  `)

  const data = res.content

  return {
    ...state,
    aiResponse: data,
    artifacts:[]
    
  }
} catch (error) {
  console.log(error);
  
    return {
      ...state,
      aiResponse:`❌ Failed to Generate Code`,
      artifacts:[]
    
  }

  
}
}