
const HttpException = require('../../utils/HttpException.utils');
// const status = require('../../utils/status.utils')
const PatientModel = require('../../models/patient.model')
const { validationResult } = require('express-validator');
const RegionModel = require('../../models/region.model');
const districtModel = require('../../models/district.model');

/******************************************************************************
 *                              Employer Controller
 ******************************************************************************/
class PatientController {
    getAll = async (req, res, next) => {
        const model = await PatientModel.findAll({
            include:[
                {model: RegionModel, as: 'region', attributes: ['id', 'name']},
                {model: districtModel, as: 'district', attributes: ['id', 'name']}
            ]
        });
        res.status(200).send({
            error: false,
            error_code: 200,
            message: 'Malumotlar chiqdi',
            data: model
        });
    }

    getOne = async (req, res, next) => {
        this.checkValidation(req);
        const model = await PatientModel.findOne({
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
       const model = await PatientModel.create(req.body);
       res.status(200).send({
        error: false,
        error_code: 200,
        message: 'Malumotlar qo\'shildi',
        data: model
    });
   }
   update = async (req, res, next) => {
       this.checkValidation(req);
    const model = await PatientModel.findOne({
        where:{
            id: req.params.id
        }
    });
    model.name = req.body.name;
    model.fullname = req.body.fullname;
    model.lastname = req.body.lastname;
    model.patronymic = req.body.patronymic;
    model.region_id = req.body.region_id;
    model.district_id = req.body.district_id;
    model.phone = req.body.phone;
    model.passport = req.body.passport;
    model.gender = req.body.gender;
    model.addres = req.body.addres;
    model.birthday = req.body.birthday;
    model.save();
    res.status(200).send({
        error: false,
        error_code: 200,
        message: 'Malumotlar tahrirlandi',
        data: model
    });
}
delete = async (req, res, next) => {
const model =    await PatientModel.destroy({
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
        message: 'Malumotlar o\'chirildi',
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
module.exports = new PatientController;