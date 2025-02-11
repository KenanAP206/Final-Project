import EpisodeValidationSchema from "../Validation/EpisodeValidation.js"


export const EpisodeMiddleware=(req,res,next)=>{
   let {error}= EpisodeValidationSchema.validate(req.body)
   if(error){
     res.send(error.details[0].message)
   }else{
     next()
   }
   
}


