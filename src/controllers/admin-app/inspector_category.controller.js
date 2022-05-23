
const HttpException = require('../../utils/HttpException.utils');
// const status = require('../../utils/status.utils')
const inspector_categoryModel = require('../../models/inspector_category.model')
const { validationResult } = require('express-validator');

/******************************************************************************
 *                              Employer Controller
 ******************************************************************************/
class DoctorController {
    getAll = async (req, res, next) => {
        const model = await inspector_categoryModel.findAll();
        res.send(model);
    }

    getOne = async (req, res, next) => {
        this.checkValidation(req);
        const model = await inspector_categoryModel.findOne({
            where:{
                id: req.params.id
            }
        });
        res.send(model);
    }
   create = async (req, res, next) => {
       this.checkValidation(req);
       const model = await inspector_categoryModel.create(req.body);
       res.send(model)
   }
   update = async (req, res, next) => {
       this.checkValidation(req);
    const model = await inspector_categoryModel.findOne({
        where:{
            id: req.params.id
        }
    });
    model.name = req.body.name;
    model.save();
    res.send(model);
}
delete = async (req, res, next) => {
    await inspector_categoryModel.destroy({
        where:{
          id: req.params.id
        }
    });
    res.send('ochirildii')
}
    checkValidation = (req) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            throw new HttpException(400, 'Validation faild', errors);
        }
    }

   
}



/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new DoctorController;