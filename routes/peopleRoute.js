const express = require('express')
const peopleController = require('../controllers/peopleController');
const { uploadSingle } = require('../middleware/multer');
const { protect } = require('../middleware/auth')

const router = express.Router()

router.get('/getPeople', peopleController.getPeople);
router.get('/getPeopleById/:id', peopleController.getPeopleById);
router.post('/createPeople', uploadSingle("myfile"), peopleController.createPeople);
router.put('/updatePeople/:id',protect, uploadSingle("myfile"), peopleController.updatePeople);
router.delete('/deletePeople/:id',protect, peopleController.deletePeople);

module.exports= router