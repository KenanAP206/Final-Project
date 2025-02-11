import { Schema, model } from 'mongoose';


const EpisodeSchema = new Schema({
    link:{
        type:String,
    },
    isNew:Boolean,
    showId:{
        type: Schema.Types.ObjectId,
        ref: "shows"
    }
    
})

export let EpisodeModel = model('episodes', EpisodeSchema);