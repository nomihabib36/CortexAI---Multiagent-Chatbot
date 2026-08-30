import redis from "../../shared/redis/redis.js"

//run "/api/me" as middleware and check user login or not and return data to api/me end point 
const protect = async (req,res,next) =>{
    try {

        //if User is login, then return user data
        const sessionId = req.cookies?.session

        //if not login, return error
            if(!sessionId){
            return res.status(401).json({
                message:`Unauthorized`
            })
            }
        //if session are expired, return error
        const session = await redis.get(`session-${sessionId}`)
            if (!session) {
            return res.status(400).json({
                message:`session expired`
            })
        }

        //parse login data
        req.user = JSON.parse(session)
        
        next()    
    } catch (error) {
       return res.status(500).json({
           message:`Protect middleware error ${error}`
       })
        
    }
}

export default protect