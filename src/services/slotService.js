const { models } = require('../models')
const { Op } = require('sequelize')
const today = new Date()
const { User, slot } = models


const addSlots = async (payload) => {
  const create_slot = await slot.create(payload)

  return create_slot
}

const removeSlots = async (payload) => {
  console.log('Remove_Slots_Id', payload)
  const remove_slot = await slot.update({
    bookingStatus: 'cancel'
  }, {
    where: {
        id: payload.bookingId 
      }
  })

  /*const remove_slot = await slot.destroy({
    where: {
      // specify conditions for deletion here
      userId: payload.userId,
      bookingId: payload.bookingId
    }
  })*/
  console.log("Augsutine")
  console.log(remove_slot)
  return remove_slot
}

const viewSlots = async (payload) => {
  console.log('Showall_Slots_Id', payload)
  const show_slot = await slot.findAll({
    where: {
      // specify conditions for deletion here
      userId: payload.userId,
      stationId: payload.stationId,
      
    }
  })
  console.log(show_slot)
  return show_slot
}

const viewcancelledSlots = async (payload) => {
  console.log('Showallcancelled_Slots_Id', payload)
  const show_slot = await slot.findAll({
    where: {
      // specify conditions for deletion here
      bookingStatus: 'cancel',
    }
  })
  console.log(show_slot)
  return show_slot
}

const viewupcomingslots = async (payload) => {
  console.log('Showallupcoming_Slots_Id', payload)
  
  const show_slot = await slot.findAll({
    where: {
      bookingDate: {
        [Op.gt]: new Date() // Selects rows where bookingDate is greater than current date
      }
    }
  })
  
  console.log(show_slot)
  return show_slot
}


module.exports = {
  addSlots,
  removeSlots,
  viewSlots,
  viewcancelledSlots,
  viewupcomingslots
}
