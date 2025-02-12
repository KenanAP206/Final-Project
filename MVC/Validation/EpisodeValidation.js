import Joi from 'joi'
import objectId from 'joi-objectid'

Joi.objectId = objectId(Joi)

const EpisodeValidationSchema = Joi.object({
    link: Joi.string().min(5).required(),
    showId: Joi.objectId().required(),
    isNew: Joi.boolean(),
    order: Joi.number(),
    createdAt: Joi.date().default(Date.now)
})

export default EpisodeValidationSchema
