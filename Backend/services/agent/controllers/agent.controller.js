import axios from 'axios'
import { graph } from '../graph/graph.js'
import { addMessage } from '../config/memory.js'

export const agent = async (req,res)=>{
    try {
        const {prompt,conversationId, agent, images, artifacts} = req.body
        const userId = req.headers["x-user-id"]
        const file = req.file

        //Save Message Api from CHAT Service
        await axios.post(`${process.env.CHAT_SERVICE}/save-message`,{
            //Saving Message in that structure
            conversationId, role:"user", content :prompt
        })

        //Called Graph - Start Graph from here

        const result = await graph.invoke({
            prompt, conversationId, agent, userId, file
        })

        console.log(`result, ${result}`);
        
        await addMessage(conversationId, "user", prompt)
        await addMessage(conversationId, "assistant", result.aiResponse)

        
        // Save ai response in db
        
        await axios.post(`${process.env.CHAT_SERVICE}/save-message`,{
            conversationId,role:"assistant", content:result.aiResponse,images:result.images, artifacts:result?.artifacts
        })
        

        return res.status(200).json({
            answer:result?.aiResponse,
            images:result?.images,
            artifacts:result?.artifacts
        })
        
        } catch (error) {


        console.log(error);
        
        
    }
}