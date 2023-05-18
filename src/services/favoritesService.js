const {models} = require('../models')

const { Fav } = models;


const addFavorite = async (payload) => {
    console.log(payload);
    const create_fav= await Fav.create(payload);

    console.log(create_fav);
    return create_fav;

  };
  const removeFavorite = async (payload) => {
    console.log("Remove_Favorite_Id",payload);
    const remove_fav= await Fav.destroy({
        where: {
           // specify conditions for deletion here
           userId: payload.userId,
           stationId:payload.stationId
           
        }
    });
    
    console.log(remove_fav);
    return remove_fav;
  };

  const showallFavorite = async (payload) => {
    console.log("Showall_Favorite_Id",payload);
    const show_fav = await Fav.findAll({
        where: {
           // specify conditions for deletion here
           userId: payload.userId,
        }
    });
    
    console.log(show_fav);
    return show_fav;
  };



  module.exports ={
    addFavorite,
    removeFavorite,
    showallFavorite
  }
  