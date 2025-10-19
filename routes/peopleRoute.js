const express = require('express')
const peopleController = require('../controllers/peopleController');
const { uploadSingle } = require('../middleware/multer');

const router = express.Router()

router.get('/getPeople', peopleController.getPeople);
router.get('/getPeopleById/:id', peopleController.getPeopleById);
router.post('/createPeople', uploadSingle("myfile"), peopleController.createPeople);
router.put('/updatePeople/id', uploadSingle("myfile"), peopleController.updatePeople);
router.delete('/deletePeople/id', peopleController.deletePeople);

module.exports= router