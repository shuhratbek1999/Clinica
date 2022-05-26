
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
        res.status(200).send({
            error: false,
            error_code: 200,
            message: 'Malumotlar chiqdi',
            data: model
        });
    }

    getOne = async (req, res, next) => {
        this.checkValidation(req);
        const model = await inspector_categoryModel.findOne({
            where:{
                id: req.params.id
            }
        });
        if(!model){
            throw new HttpException(404, 'berilgan id bo\'yicha malumot yo\'q')
        }
        res.status(200).send({
            error: false,
            error_code: 200,
            message: 'malumot chiqdi',
            data: model
        });
    }
   create = async (req, res, next) => {
       this.checkValidation(req);
       const model = await inspector_categoryModel.create(req.body);
       res.status(200).send({
        error: false,
        error_code: 200,
        message: 'Malumotlar qo\'shildi',
        data: model
    });
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
    res.status(200).send({
        error: false,
        error_code: 200,
        message: 'Malumot tahrirlandi',
        data: model
    });
}
delete = async (req, res, next) => {
 const model =   await inspector_categoryModel.destroy({
        where:{
          id: req.params.id
        }
    });
    if(!model){
        throw new HttpException(404, "bunday id yoq")
    }
    res.status(200).send({
        error: false,
        error_code: 200,
        message: 'Malumot o\'chirildi',
        data: model
    });
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