const express = require('express');
const router = express.Router()
const Model = require('../models/model')

module.exports = router;

// Post Method
router.post('/', (req, res) => {
  console.log('get request')
})

// Post Method
router.post('/post', (req, res) => {
  const data = new Model({
    name: req.body.name,
    age: req.body.age
  })
  try {
    const dataToSave = data.save();
    res.status(200).json(dataToSave);
  }
  catch(error) {
    res.status(400).json({
      message: error.message
    })
  }
})

// Get Method
router.get('/getAll', async (req, res) => {
  try {
    const data = await Model.find();
    res.json(data)
  }
  catch(error) {
    res.status(500).json({
      message: error.message
    })
  }
});

// Get by ID Method
router.get('/getOne/:id', async (req, res) => {
  try {
    const data = await Model.findById(req.params.id);
    res.json(data)
  }
  catch(error) {
    res.status(500).json({
      message: message.error
    })
  }
});

// Update by ID Method
router.patch('/update/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;
    const options = { new: true }
    const result = await Model.findByIdAndUpdate(
      id, updateData, options
    )
    res.send(result);
  }
  catch(error) {
    res.status(400).json({
      message: message.error
    })
  }
});

// Delete by ID Method
router.delete('/deleteOne/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Model.findByIdAndDelete(id);
    res.send(`Document with ${data.name} has been deleted`)
  }
  catch(error) {
    res.status(400).json({
      message: message.error
    })
  }
});
