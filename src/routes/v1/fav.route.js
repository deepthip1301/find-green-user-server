const express = require('express');
const validate = require('../../middlewares/validate');
const favValidation  = require('../../validations/favValidation');
const favController = require('../../controllers/favController');


const router = express.Router();


router.post('/add_favorite',validate(favValidation.addFavorite),favController.addFavorite);
router.delete('/remove_favorite',validate(favValidation.removeFavorite),favController.removeFavorite);
router.get('/showall_favorite',validate(favValidation.showallFavorite),favController.showallFavorite);

module.exports = router;
