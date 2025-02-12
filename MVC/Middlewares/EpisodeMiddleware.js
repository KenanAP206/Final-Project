import EpisodeValidationSchema from "../Validation/EpisodeValidation.js"


export const EpisodeMiddleware = (req, res, next) => {
    let {error} = EpisodeValidationSchema.validate(req.body)
    if (error) {
        return res.status(400).json({
            error: error.details[0].message
        });
    }
    next();
}


