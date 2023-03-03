const express = require('express');
const router = express.Router();
const registrationControl = require('../../controllers/admin-app/registration_arxiv.controller');
const auth = require('../../middleware/auth.middleware');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');

// const  {registrationValidate}  = require('../../middleware/validators/admin-app/RegistrationValidator.middleware');

router.get('/all', auth(), awaitHandlerFactory(registrationControl.getAll_arxiv));
router.get('/one/:id', auth(), awaitHandlerFactory(registrationControl.getOne));
router.post('/inspection', auth(), awaitHandlerFactory(registrationControl.inspection));
router.post('/inspectionSverka', auth(), awaitHandlerFactory(registrationControl.InspectionSverka));
router.post('/kassa', auth(), awaitHandlerFactory(registrationControl.kassa));
router.post('/kassasverka', auth(), awaitHandlerFactory(registrationControl.kassaSverka));
router.post('/sverkaDoctor', auth(), awaitHandlerFactory(registrationControl.DoctorSverka));
router.post('/hisobotDoctor', auth(), awaitHandlerFactory(registrationControl.create));
router.post('/register', auth(), awaitHandlerFactory(registrationControl.register));
module.exports = router;