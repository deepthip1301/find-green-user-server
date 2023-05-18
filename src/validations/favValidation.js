const Joi = require('joi');


const addFavorite = {
    body: Joi.object().keys({
        userId: Joi.string().required(),
        stationId: Joi.string().required()
    }),
};
const removeFavorite = {
    body: Joi.object().keys({
        userId: Joi.string().required(),
        stationId: Joi.string().required()
    }),
    
};

const showallFavorite = {
    body: Joi.object().keys({
        userId: Joi.string().required()
    }),
};
module.exports = {
    addFavorite,
    removeFavorite,
    showallFavorite
};
