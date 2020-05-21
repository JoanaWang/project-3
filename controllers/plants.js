const Plant = require('../models/plant')
const { notFound, unauthorized } = require('../lib/errorMessages')

async function plantsIndex(req, res, next) {
  try {
    const plants = await Plant.find().populate('user').populate('comments.user')
    if (!plants) throw new Error(notFound)
    res.status(200).json(plants)
  } catch (err) {
    next(err)
  }
}

async function plantsCreate(req, res, next) {
  try {
    req.body.user = req.currentUser // * attach the currentUser, to the request body data, it can now pass validation
    const createdPlant = await Plant.create(req.body)
    res.status(201).json(createdPlant)
  } catch (err) {
    next(err)
  }
}

async function plantsShow(req, res, next) {
  const dinoId = req.params.id
  try {
    const plant = await Plant.findById(dinoId)
    if (!plant) throw new Error(notFound)
    res.status(200).json(plant)
  } catch (err) {
    next(err)
  }
}

async function plantsUpdate(req, res, next) {
  const dinoId = req.params.id
  try {
    // * find the plant to be updated
    const plant = await Plant.findById(dinoId)
    if (!plant) throw new Error(notFound)
    // * check if the request currentUser (learnt from ythe token) is the same as the user who created this plant
    if (!plant.user.equals(req.currentUser._id)) throw new Error(unauthorized)
    // * if it is, let them edit
    Object.assign(plant, req.body) // * merge the objects together to make the update
    await plant.save() // * then resave
    // * if they are not that creator, send them back an unauthorised response
    res.status(202).json(plant)
  } catch (err) {
    next(err)
  }
}

async function plantsDelete(req, res, next) {
  const dinoId = req.params.id
  try {
    const plantToDelete = await Plant.findById(dinoId)
    if (!plantToDelete) throw new Error(notFound)
    if (!plantToDelete.user.equals(req.currentUser._id)) throw new Error(unauthorized)
    await plantToDelete.remove()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}

// * POST - body = { a valid comment object }
// * URL - api/dinos/:id/comments

async function plantsCommentCreate(req, res, next) {
  try {
    // * Find the plant that we are creating a comment on
    req.body.user = req.currentUser
    const dinoId = req.params.id
    const plant = await Plant.findById(dinoId)
    if (!plant) throw new Error(notFound)
    // * attach our comment object(sent in the request body) to that plant, pushing into its comments array
    plant.comments.push(req.body)
    // * resave that plant with the new comments
    await plant.save()
    // * send back that plant in response, with new comment present
    res.status(201).json(plant)
  } catch (err) {
    next(err)
  }
}


// * DELETE 
// * URL = /dinos/:id/comments/commentId

async function plantsCommentDelete(req, res, next) {
  try {
    // * find the plant to delete the comment from, fron by id
    const dinoId = req.params.id
    const commentId = req.params.commentId
    const plant = await Plant.findById(dinoId)
    if (!plant) throw new Error(notFound)
    // * delete the comment from that plant, using the commendID
    const commentToRemove = plant.comments.id(commentId)
    if (!commentToRemove) throw new Error(notFound)
    if (!commentToRemove.user.equals(req.currentUser._id) || !plant.user.equals(req.currentUser._id)) {
      throw new Error(unauthorized)
    }
    await commentToRemove.remove()
    // * resave it again, with that comment deleted
    await plant.save()
    // * send no content to signfy deletion is complete
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}

module.exports = {
  index: plantsIndex,
  create: plantsCreate,
  show: plantsShow,
  update: plantsUpdate,
  delete: plantsDelete,
  commentCreate: plantsCommentCreate,
  commentDelete: plantsCommentDelete
}
