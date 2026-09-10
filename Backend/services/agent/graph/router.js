import { getModel } from "../config/llmModel.js";

export const router = async (state) => {
//using llm model to decide transfer to which agent

if(state.agent && state.agent!=="auto"){
    return{
        ...state,
        agent:state.agent
    }
}

const llm = await getModel("router");

const prompt = `You are an agent router.

Available agents:

- chat
- search
- coding
- vision
- pdf
- ppt

Rules:

chat:
General conversation,
explanations,
learning,
questions.

search:
current events,
latest information,
news,
recent development,
internet lookup.

coding:
Generate code,
debug code,
build project,
architecture,
API design.

pdf:
Questions about generating PDFs or document context.

ppt:
Question about generate ppts or ppt context.

vision:
Generate image,
create image.


Return ONLY one word:

chat
search
coding
pdf
ppt
vision

User Query:
${state.prompt}
`
const response = await llm.invoke(prompt)
console.log(`router response:${response}`);

return{
    ...state,
    agent:response.content
    .trim()
    .toLowerCase()
}

};
