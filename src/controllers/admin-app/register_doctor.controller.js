const HttpException = require('../../utils/HttpException.utils');
// const status = require('../../utils/status.utils')
const { validationResult } = require('express-validator');
const Register_DoctorModel = require('../../models/register_doctor.model');
const DoctorModel = require('../../models/doctor.model');
const register_doctorModel = require('../../models/register_doctor.model');
const { Op } = require("sequelize");
const sequelize = require('sequelize');
const Register_inspectionModel = require('../../models/register_inspection.model');
const inspectionCategory = require('../../models/inspector_category.model');
const UserModel = require('../../models/doctor_category.model');
const Registration_inspectionModel = require('../../models/registration_inspection.model');
const RegistrationModel = require('../../models/registration.model');

/******************************************************************************
 *                              Employer Controller
 ******************************************************************************/
class RegisterDoctorController {
    getAll = async (req, res, next) => {
        const model = await Register_DoctorModel.findAll({
            include:[
                {model: DoctorModel, as: 'doctor', attributes: ['name']}
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
        const model = await Register_DoctorModel.findOne({
           where:{
            id: req.params.id
           },
           include:[
            {model: DoctorModel, as: 'doctor'}
           ]
        });
        if(!model){
            throw new HttpException(404, 'berilgan id bo\'yicha malumot yo\'q')
        }
        res.status(200).send({
            error: false,
            error_code: 200,
            message: 'Malumot chiqdi',
            data: model
        });
    }
    create = async (req, res, next) => {
        this.checkValidation(req);
        let query = {}, queryx = {};
        let body = req.body;
        let datetime1 = body.datetime1;
        let datetime2 = body.datetime2;
        if(body.doctor_id !== null){
            query.id = {[Op.eq] : body.doctor_id }  
            queryx.doctor_id = {[Op.eq]: body.doctor_id}
        };
          
        if(body.datetime1 < body.datetime2){
            let result = await register_doctorModel.findAll({
                attributes: [
                     'id', "type", "date_time", "doc_id","comment", "place", "doctor_id",
                     [sequelize.literal("SUM(CASE WHEN date_time < " + datetime1 + " THEN price * power(-1, 'type') ELSE 0 END)"), 'begin_total'],
                    [sequelize.literal("SUM(CASE WHEN register_doctor.date_time >= " + datetime1 + " and register_doctor.date_time <= " + datetime2 + " AND register_doctor.doc_type = 'kirim' THEN register_doctor.price ELSE 0 END)"), 'total_kirim'],
                    [sequelize.literal("SUM(CASE WHEN register_doctor.date_time >= " + datetime1 + " and register_doctor.date_time <= " + datetime2 + " AND register_doctor.doc_type = 'chiqim' THEN register_doctor.price ELSE 0 END)"), 'total_chiqim'],
                    [sequelize.literal("SUM(CASE WHEN date_time <= " + datetime2 + " THEN price * power(-1, 'type') ELSE 0 END)"), 'end_total']
                ],
                include: [
                    { model: DoctorModel, as: 'doctor', attributes: ['name', 'id'], where: query},
                ],
                where: queryx,
                raw: true,
                group: ['doctor_id'],
                order: [
                    ['id', 'ASC']
                ],
            })
            res.send(result);
        }
        else{
            let result = await register_doctorModel.findAll({
                attributes: [
                     'id', "type", "date_time", "place", "doctor_id",
                     [sequelize.literal("SUM(CASE WHEN date_time < " + datetime1 + " THEN price * power(-1, 'type') ELSE 0 END)"), 'begin_total'],
                    [sequelize.literal("SUM(CASE WHEN register_doctor.date_time >= " + datetime1 + " and register_doctor.date_time <= " + datetime2 + " AND register_doctor.doc_type = 'kirim' THEN register_doctor.price ELSE 0 END)"), 'total_kirim'],
                    [sequelize.literal("SUM(CASE WHEN register_doctor.date_time >= " + datetime1 + " and register_doctor.date_time <= " + datetime2 + " AND register_doctor.doc_type = 'chiqim' THEN register_doctor.price ELSE 0 END)"), 'total_chiqim'],
                    [sequelize.literal("SUM(CASE WHEN date_time <= " + datetime2 + " THEN price * power(-1, 'type') ELSE 0 END)"), 'end_total']
                ],
                include: [
                    { model: DoctorModel, as: 'doctor', attributes: ['name', 'id'], where: query},
                ],
                where: queryx,
                raw: true,
                group: ['doctor_id'],
                order: [
                    ['id', 'ASC']
                ],
            })
            res.send(result);
        }
    };
     
    TekshiruvSoni = async(req, res, next) => {
        this.checkValidation(req);
        let query = {}, queryx = {};
        let body = req.body;
        let datetime1 = body.datetime1;
        let datetime2 = body.datetime2;
        if(body.inspection_category !== null){
            query.id = {[Op.eq] : body.inspection_category }  
            queryx.inspection_category = {[Op.eq]: body.inspection_category}
        };
        const model = await Register_inspectionModel.findAll({
            attributes:[
                [sequelize.fn("COUNT", sequelize.col("registration.patient_id")), "count"]
            ],
            include: [
                { model: inspectionCategory, as: 'inspection', attributes: ['name'], where: query},
                { model: RegistrationModel, as: 'registration', attributes: ['patient_id']}
            ],
            where: {
                inspection_category: {[Op.eq]: body.inspection_category},
                date_time: {
                    [Op.gte]: datetime1,
                    [Op.lte]: datetime2
                }
            }
        })
        res.send(model)
    }
   
   DoctorSverka = async (req, res, next) => {
    this.checkValidation(req);
    res.send(req.body)
    // let query = {}, queryx = {};
    // let body = req.body;
    // let datetime1 = body.datetime1;
    // let datetime2 = body.datetime2;
    // if(body.doctor_id !== null){
    //     query.id = {[Op.eq] : body.doctor_id }
    //     queryx.doctor_id = {[Op.eq]: body.doctor_id}
    // };
    // const model = await Register_DoctorModel.findAll({
    //     attributes: [ 'doc_type', 'id', 'date_time', "doc_id", "comment","doctor_id", "place",
    //         [sequelize.literal("SUM(CASE WHEN register_doctor.date_time < " + datetime1 + " THEN price * power(-1, 'type') ELSE 0 END)"), 'begin_total'],
    //        [sequelize.literal("SUM(CASE WHEN register_doctor.date_time >= " + datetime1 + " and register_doctor.date_time <= " + datetime2 + " AND register_doctor.doc_type = 'kirim' THEN register_doctor.price ELSE 0 END)"), 'kirim'],
    //        [sequelize.literal("SUM(CASE WHEN register_doctor.date_time >= " + datetime1 + " and register_doctor.date_time <= " + datetime2 + " AND register_doctor.doc_type = 'chiqim' THEN register_doctor.price ELSE 0 END)"), 'chiqim'],
    //    ],  
    //    where: queryx,
    //    group: ['id']
    // })
    // res.send(model)
   }

   DoctorCount = async (req, res, next) => {
    this.checkValidation(req);
    let query = {}, queryx = {};
    let body = req.body;
    let datetime1 = body.datetime1;
    let datetime2 = body.datetime2;
    if(body.doctor_id !== null){
        query.id = {[Op.eq] : body.doctor_id }
        queryx.doctor_id = {[Op.eq]: body.doctor_id}
    };
    const model = await Register_DoctorModel.findAll({
        attributes: [ 'doc_type', 'id', 'date_time', "doc_id", "comment","doctor_id", "place",
           [sequelize.literal("COUNT(CASE WHEN register_doctor.date_time >= " + datetime1 + " and register_doctor.date_time <= " + datetime2 + ` AND register_doctor.doctor_id = ${body.doctor_id} THEN register_doctor.doctor_id ELSE 0 END)`), 'count'],
       ],  
       where: queryx,
       group: ['doctor_id']
    })
    res.send(model)
   }
   doctor = async(req, res, next) => {
      const model = await Register_DoctorModel.findAll({
        where:{
            doctor_id: req.body.doctor_id
        }
      })
      res.send(model)
   }
   update = async (req, res, next) => {
       this.checkValidation(req);
    const model = await Register_DoctorModel.findOne({
        where:{
            id: req.params.id
        }
    });
    var date_time = Math.floor(new Date().getTime() / 1000);
    model.expense_id = req.body.expense_id;
    model.date_time = date_time;
    model.type = req.body.type;
    model.pay_type = req.body.pay_type;
    model.price = req.body.price;
    model.comment = req.body.comment;
    model.save();
    
    res.status(200).send({
        error: false,
        error_code: 200,
        message: 'Malumotlar tahrirlandi',
        data: model
    });
}
delete = async (req, res, next) => {
  const model = await Register_DoctorModel.destroy({
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
module.exports = new RegisterDoctorController;