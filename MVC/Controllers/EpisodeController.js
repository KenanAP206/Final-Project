import {EpisodeModel} from "../Models/EpisodeModel.js"


export const EpisodeController={
    getAll: async (req,res)=>{
        let episodes= await EpisodeModel.find()
        res.send(episodes)
    },
    getShowEpisodes:async(req,res)=>{
        const id= req.params.id
        const episodes = await EpisodeModel.find({showId:id})
        res.send(episodes)
    },
    getById: async (req,res)=>{
        let id=req.params.id
        let myepisode= await EpisodeModel.findById(id)
        res.send({
            message:"Success GetById",
            data:myepisode
        })
    },
    deleteEpisode:async  (req,res)=>{
        let {id}=req.params
       await EpisodeModel.findByIdAndDelete(id)
       res.send({
        message:"Success Delete",
    })
    },
    postEpisode: async (req,res)=>{
        
        let newEpisode= EpisodeModel(req.body)
       await newEpisode.save()
       res.send({
         message:"Success Post",
         data:req.body
       })
    },
    updateEpisode: async (req,res)=>{
        let id=req.params.id
        let updateEpisode=req.body
      let updatedEpisode = await EpisodeModel.findByIdAndUpdate({_id:id},updateEpisode,{isNew:true})
        res.send(updatedEpisode)
    }
}



