
const httpStatus = require('http-status');
const favoritesService = require('../services/favoritesService');
const catchAsync = require('../utils/catchAsync');

const addFavorite = catchAsync(async (req, res) => {
    const { userId, stationId } = req.body;
    console.log("India");
    console.log(req.body);
    const aug = await favoritesService.addFavorite(req.body);
    console.log(aug);
    res.status(httpStatus.CREATED).send("succesful");
    return(userId,stationId)

});

const removeFavorite = catchAsync(async (req, res) => {
    const { userId, stationId } = req.body;
    console.log("India");
    console.log(req.body);
    const jeb = await favoritesService.removeFavorite(req.body);
    console.log(jeb);
    res.status(httpStatus.CREATED).send("succesful");

});


const showallFavorite = catchAsync(async (req, res) => {
    const { userId } = req.body;
    console.log("India");
    console.log(req.body);
    const kum = await favoritesService.showallFavorite(req.body);
    console.log(kum);
    res.status(httpStatus.CREATED).send({ kum});
    res.status(httpStatus.CREATED).send("succesful");
    
    

});



module.exports = {
    addFavorite,
    removeFavorite,
    showallFavorite
  
};
