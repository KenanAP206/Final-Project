import mongoose from 'mongoose';

const EpisodeSchema = new mongoose.Schema({
    link: String,
    showId: mongoose.Schema.Types.ObjectId,
    isNew: Boolean,
    order: Number,
    createdAt: { type: Date, default: Date.now }
});

EpisodeSchema.pre('save', function(next) {
    if (this.createdAt) {
        const hoursSinceCreation = (Date.now() - this.createdAt.getTime()) / (1000 * 60 * 60);
        if (hoursSinceCreation >= 24) {
            this.isNew = false;
        }
    }
    next();
});

export const EpisodeModel = mongoose.model('Episode', EpisodeSchema);