const express = require('express');
const router = express.Router();
const RegisterDoctorController = require('../../controllers/admin-app/register_doctor.controller');
const auth = require('../../middleware/auth.middleware');
// const Role = require('../../utils/roles.utils');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');

// const  {districtValidate}  = require('../../middleware/validators/admin-app/districtValidator.middleware');

router.get('/all', auth(),  awaitHandlerFactory(RegisterDoctorController.getAll));
router.get('/one/:id', auth(), awaitHandlerFactory(RegisterDoctorController.getOne));
router.post('/create',auth(), awaitHandlerFactory(RegisterDoctorController.create));
router.post('/sverka',auth(), awaitHandlerFactory(RegisterDoctorController.sverka));
router.patch('/update/:id', auth(),  awaitHandlerFactory(RegisterDoctorController.update));
router.delete('/delete/:id', auth(), awaitHandlerFactory(RegisterDoctorController.delete));
module.exports = router;