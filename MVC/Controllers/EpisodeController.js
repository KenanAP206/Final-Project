import {EpisodeModel} from "../Models/EpisodeModel.js"


export const EpisodeController={
    getAll: async (req,res)=>{
        let episodes= await EpisodeModel.find()
        res.send(episodes)
    },
    getShowEpisodes:async(req,res)=>{
        try {
            const id = req.params.id;
            const episodes = await EpisodeModel.find({showId: id});
            // Format episodes to include id field
            const formattedEpisodes = episodes.map(episode => ({
                ...episode.toObject(),
                id: episode._id
            }));
            res.json(formattedEpisodes);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
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
    postEpisode: async (req, res) => {
        try {
            const { link, isNew, showId, order } = req.body;
            
            const newEpisode = new EpisodeModel({
                link,
                isNew,
                showId,
                order
            });

            const savedEpisode = await newEpisode.save();
            
            res.status(201).json({
                success: true,
                data: {
                    _id: savedEpisode._id,
                    id: savedEpisode._id,
                    link: savedEpisode.link,
                    isNew: savedEpisode.isNew,
                    showId: savedEpisode.showId,
                    order: savedEpisode.order
                }
            });
        } catch (error) {
            console.error('Episode creation error:', error);
            res.status(500).json({ 
                success: false,
                error: error.message 
            });
        }
    },
    updateEpisode: async (req,res)=>{
        let id=req.params.id
        let updateEpisode=req.body
      let updatedEpisode = await EpisodeModel.findByIdAndUpdate({_id:id},updateEpisode,{isNew:true})
        res.send(updatedEpisode)
    },
    updateNewStatus: async () => {
        try {
            const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
            await EpisodeModel.updateMany(
                {
                    createdAt: { $lt: twentyFourHoursAgo },
                    isNew: true
                },
                {
                    $set: { isNew: false }
                }
            );
        } catch (error) {
            console.error('Error updating isNew status:', error);
        }
    }
}

// Set up an interval to run the update every hour
setInterval(EpisodeController.updateNewStatus, 60 * 60 * 1000);



