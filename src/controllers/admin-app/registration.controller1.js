const ModelModel = require('../../models/registration.model');
const arxiv = require('../../models/registration_arxiv.model')
const HttpException = require('../../utils/HttpException.utils');
const Register_kassaModel = require('../../models/register_kassa.model')
const inspectionCategory = require('../../models/inspector_category.model')
const { sequelize, sum } = require('../../models/user.model');
const { validationResult } = require('express-validator');
const registration_palataModel = require('../../models/registration_palata.model');
const Registration_inspectionModel = require('../../models/registration_inspection.model');
const Registration_inspection_childModel = require('../../models/registration_inspection_child.model');
const Registration_doctorModel = require('../../models/registration_doctor.model');
const Registration_recipeModel = require('../../models/registration_recipe.model');
const Registration_filesModel = require('../../models/registration_files.model');
const Register_mkb = require('../../models/register_mkb.model');
const register_palataModel = require('../../models/register_palata.model');
const Register_inspectionModel = require('../../models/register_inspection.model');
const RegisterDoctorModel = require('../../models/register_doctor.model');
const UserModel = require('../../models/user.model');
const PatientModel = require('../../models/patient.model');
const db = require("../../db/db-sequelize");
const QueueModel = require('../../models/queue.model');
const RoomModel = require('../../models/room.model');
const DoctorModel = require('../../models/doctor.model');
const DoctorCategory = require('../../models/doctor_category.model')
const InspectionModel = require('../../models/inspection.model')
const { Op } = require("sequelize");
const palataModel = require('../../models/palata.model')
const PillModel = require('../../models/pill.model');
const Registration_payModel = require('../../models/registration_pay.model');
const registration_palata_arxivModel = require('../../models/registration_palata_arxiv.model')
const Registration_inspection_arxivModel = require('../../models/registration_inspection_arxiv.model');
const Registration_inspection_child_arxxivModel = require('../../models/registration_inspection_child_arxiv.model');
const Registration_pay_arxivModel = require('../../models/registration_pay_arxiv.model');
const Registration_doctor_arxivModel = require('../../models/registration_doctor_arxiv.model');
const Registration_recipe_arxivModel = require('../../models/registration_recipe_arxiv.model');
const Registration_files_arxivModel = require('../../models/registration_files_arxiv.model');
const RegistrationModel = require('../../models/registration.model');
const uplataModel = require('../../models/uplata.model')
const moment = require('moment');
const register_mkb = require('../../models/register_mkb.model');
const Registration_arxivModel = require('../../models/registration_arxiv.model');
class RegistrationController {
    q=[];
    getAll = async (req, res, next) => {
        const model = await ModelModel.findAll({
            include:[ 
                {
                    model: UserModel, as: 'user', attributes: ['user_name', 'room_id']
                },
                {
                    model: PatientModel, as: 'patient'
                },
                {
                    model: Registration_doctorModel, as: 'registration_doctor',
                    include:[
                        {
                            model: Registration_recipeModel, as: 'registration_recipe'
                        },
                        {model: register_mkb, as: 'register_mkb'}
                    ]
                },
                {
                    model: Registration_inspectionModel, as: 'registration_inspection',
                    include:[
                        {
                            model: Registration_inspection_childModel, as: 'registration_inspection_child'
                        }
                    ]
                } 
             ],
             limit: 200,
             order: [
                ['created_at', 'DESC']
             ]
        });
        res.status(200).send({  
            error: false,
            error_code: 200,
            message: 'Malumotlar chiqdi',
            data: model
        });
    
    }
    getAll_arxiv = async (req, res, next) => {
        // this.#arxiv();
        const model = await Registration_arxivModel.findAll({
            include:[ 
                {
                    model: UserModel, as: 'user', attributes: ['user_name', 'room_id']
                },
                {
                    model: PatientModel, as: 'patient'
                },
                {
                    model: Registration_doctorModel, as: 'registration_doctor',
                    include:[
                        {
                            model: Registration_recipeModel, as: 'registration_recipe'
                        },
                        {model: register_mkb, as: 'register_mkb'}
                    ]
                },
                {
                    model: Registration_inspectionModel, as: 'registration_inspection',
                    include:[
                        {
                            model: Registration_inspection_childModel, as: 'registration_inspection_child'
                        }
                    ]
                } 
             ],
             limit: 200,
             order: [
                ['created_at', 'DESC']
             ]
        });
        res.status(200).send({  
            error: false,
            error_code: 200,
            message: 'Malumotlar chiqdi',
            data: model
        });
    }
    setArchive=async (req, res, next) => {
     try{
        await db.query("INSERT INTO registration_inspection_child_arxiv SELECT * FROM registration_inspection_child");
        await db.query("DELETE from registration_inspection_child");
        await db.query("INSERT INTO registration_inspection_arxiv SELECT * FROM registration_inspection");        
        await db.query("DELETE from registration_inspection");
        await db.query("INSERT INTO registration_files_arxiv SELECT * FROM registration_files");
        await db.query("DELETE from registration_files");
        await db.query("INSERT INTO register_doctor_arxiv SELECT * FROM register_doctor");
        await db.query("DELETE from register_doctor");
        await db.query("INSERT INTO register_kassa_arxiv SELECT * FROM register_kassa");
        await db.query("DELETE from register_kassa");
        await db.query("INSERT INTO register_mkb_arxiv SELECT * FROM register_mkb");
        await db.query("DELETE from register_mkb");
        await db.query("INSERT INTO register_inspection_arxiv SELECT * FROM register_inspection");
        await db.query("DELETE from register_inspection");
        await db.query("INSERT INTO register_palata_arxiv SELECT * FROM register_palata");
        await db.query("DELETE from register_palata");
        await db.query("INSERT INTO registration_recipe_arxiv SELECT * FROM registration_recipe");
        await db.query("DELETE from registration_recipe");
        await db.query("INSERT INTO registration_doctor_arxiv SELECT * FROM registration_doctor");
        await db.query("DELETE from registration_doctor");
        await db.query("INSERT INTO registration_arxiv SELECT * FROM registration");
        await db.query("DELETE from registration");
        await db.query("INSERT INTO registration_pay_arxiv SELECT * FROM registration_pay");
        await db.query("DELETE from registration_pay");
        await db.query("INSERT INTO registration_palata_arxiv SELECT * FROM registration_palata");
        await db.query("DELETE from registration_palata");
     }
     catch(err){
        console.log(err);
     }
        // res.send('okey');
    };
    searchsArxiv = async (req, res, next) => {
        let ModelList = await Registration_arxivModel.findAll({
            include:[ 
                {
                    model: UserModel, as: 'users', attributes: ['user_name']
                },

                {
                    model: Registration_doctorModel, as: 'registration_doctor',
                    include:[
                        {
                            model: Registration_recipeModel, as: 'registration_recipe'
                        }
                    ]
                },
                {model: PatientModel, as: 'patient', 
                where:{ 
                    fullname:{  [Op.like]: '%'+req.body.name+'%'}
                }
            },
            {
                model: UserModel, as: 'user', attributes: ['user_name']
            },
            {
                model: Registration_doctorModel, as: 'registration_doctor',
                include:[
                    {
                        model: Registration_recipeModel, as: 'registration_recipe'
                    }
                ]
            },
            {
                model: Registration_inspectionModel, as: 'registration_inspection',
                include:[
                    {
                        model: Registration_inspection_childModel, as: 'registration_inspection_child'
                    }
                ]
            } 
            ],
            limit:100
        });
        
        if(req.body.name.length == 0){
            let model = await ModelModel.findAll({
                limit: 50,
                include:[
                    {
                        model: UserModel, as: 'user', attributes: ['user_name']
                    },
    
                    {
                        model: Registration_doctorModel, as: 'registration_doctor',
                        include:[
                            {
                                model: Registration_recipeModel, as: 'registration_recipe'
                            }
                        ]
                    },
                    {
                        model: Registration_inspectionModel, as: 'registration_inspection',
                        include:[
                            {
                                model: Registration_inspection_childModel, as: 'registration_inspection_child'
                            }
                        ]
                    },
                    {model: PatientModel, as:'patient'}
                ]
            })
            res.send({
                "error": false,
                "error_code": 200,
                "message": "malumotlar chiqdi",
                data: model
            });
        }
        else{
            res.send({
                "error": false,
                "error_code": 200,
                "message": "Malumotlar chiqdi",
                data: ModelList
            });
        }
       
    };
    

    getOne = async (req, res, next) => {
        this.checkValidation(req);
        const Prixod = await ModelModel.findOne({
            where:{ id: req.params.id },
            include: [
                {
                  model: UserModel, as: 'user', attributes:['user_name']
                }, 
                {
                  model: registration_palataModel, as: 'registration_palata',
                  include:[
                    {model: palataModel, as: 'palatas', attributes: ['name']}
                  ]
                }, 
                { model: Registration_doctorModel,as: 'registration_doctor', 
                    include : [
                        { model: Registration_recipeModel, as: 'registration_recipe',
                        include:[
                            {model:PillModel,as:'pill'}]
                    },
                        { model: DoctorModel, as: 'doctor',
                    include:[
                        {model:DoctorCategory,as:'doctor_category',attributes:['name']},
                    ]},
                    {model: register_mkb, as: 'register_mkb'}
                    ]
                },
                { model: Registration_inspectionModel,as: 'registration_inspection', 
                    include : [
                        { model: Registration_inspection_childModel, as: 'registration_inspection_child'},
                        { model: InspectionModel, as: 'inspection',
                        include:[
                            {model:UserModel,as:'User',attributes:['user_name']}
                        ]
                    }
                    ]
                },
                { model: Registration_filesModel,as: 'registration_files'},
                { model: PatientModel,as: 'patient'},
                {model: Registration_payModel, as: 'registration_pay'}
            ],
            limit: 200,
            order: [
                ['created_at', 'DESC']
             ]
        });
        if (Prixod === null) {
            throw new HttpException(404, 'Not found');
        }
        
       res.status(200).send({  
            error: false,
            error_code: 200,
            message: 'Malumotlar chiqdi',
            data: Prixod
        });
    }
    getOneArxiv = async (req, res, next) => {
        this.checkValidation(req);
        const Prixod = await arxiv.findOne({
            where:{ id: req.params.id },
            include: [
                {
                  model: UserModel, as: 'user', attributes:['user_name']
                }, 
                {
                  model: registration_palata_arxivModel, as: 'registration_palata',
                  include:[
                    {model: palataModel, as: 'palatas', attributes: ['name']}
                  ]
                },  
                { model: Registration_doctor_arxivModel,as: 'registration_doctor', 
                    include : [
                        { model: Registration_recipe_arxivModel, as: 'registration_recipe',
                        include:[
                            {model:PillModel,as:'pill'}]
                    },
                        { model: DoctorModel, as: 'doctor',
                    include:[
                        {model:DoctorCategory,as:'doctor_category',attributes:['name']},
                    ]}
                    ]
                },
                { model: Registration_inspection_arxivModel,as: 'registration_inspection', 
                    include : [
                        { model: Registration_inspection_child_arxxivModel, as: 'registration_inspection_child'},
                        { model: InspectionModel, as: 'inspection',
                        include:[
                            {model:UserModel,as:'User',attributes:['user_name']}
                        ]
                    }
                    ]
                },
                { model: Registration_files_arxivModel,as: 'registration_files'},
                { model: PatientModel,as: 'patient'},
                {model: Registration_pay_arxivModel, as: 'registration_pay'}
            ],
        });
        if (Prixod === null) {
            throw new HttpException(404, 'Not found');
        }
       res.status(200).send({  
            error: false,
            error_code: 200,
            message: 'Malumotlar chiqdi',
            data: Prixod
        });
    }
    delQueue = async (req, res, next) => {
        let time=Math.floor(new Date().getTime() / 1000)-20000;
        await QueueModel.destroy({where:{datetime:{[Op.lte]:time}}});
        res.send('deleted');
    };
    
    getPechat = async (req, res, next) => {
        this.checkValidation(req);
        const Prixod = await QueueModel.findAll({
            where:{ patient_id: req.params.patient,status:"waiting" },
            include: [
                { model: RoomModel,as: 'room',
                include: [
                    { model: UserModel,as: 'users'}
                ],
            },
                { model: PatientModel,as: 'patient'},
                {model: RegistrationModel, as: 'registration', 
              include:[
                {model: Registration_doctorModel, as: 'registration_doctor', attributes: ['price']},
                {model: Registration_inspectionModel, as: 'registration_inspection', attributes: ['price']},
              ]
            },
            ],
            order: [
                ['number', 'ASC']
            ],
        });
        if (Prixod === null) {
            throw new HttpException(404, 'Not found');
        }
        // for(var element of Prixod){
        //     element.status='printed';
        //     await element.save();
        // }
        res.send(Prixod);
    };
    getByPatient = async (req, res, next) => {
        const Prixod = await ModelModel.findAll({
            where:{ patient_id: req.params.patient },
            include: [
                { model: PatientModel,as: 'patient'},
                { model: Registration_doctorModel,as: 'doctor', 
                    include : [
                        { model: Registration_recipeModel, as: 'recipe'}
                    ]
                },
                { model: Registration_inspectionModel,as: 'inspection', 
                    include : [
                        { model: Registration_inspection_childModel, as: 'child'}
                    ]
                },
                { model: Registration_filesModel,as: 'files'},
            ],
        });
        if (Prixod === null) {
            throw new HttpException(404, 'Not found');
        }
        res.send(Prixod);
    };

    create = async (req, res, next) => {
        this.checkValidation(req);
        var {registration_inspection,registration_doctor,registration_files,registration_palata, registration_pay, ...data} = req.body;
        
        data.created_at=Math.floor(new Date().getTime() / 1000);
        const model = await ModelModel.create(data);
        if (!model) {
            throw new HttpException(500, 'Something went wrong');
        }
        await this.#inspectionadd(model, registration_inspection);
        await this.#doctoradd(model,  registration_doctor);
        await this.#filesadd(model, registration_files);
        await this.#palataadd(model, registration_palata);
        await this.#payAdd(model, registration_pay);
        await this.#queue();
        res.status(200).send({
            error: false,
            error_code: 200,
            message: 'Malumot chiqdi',
            data: model
        });

    };
    update = async (req, res, next) => {
        this.checkValidation(req);
        var {registration_inspection,registration_doctor,registration_files,registration_palata,registration_pay, ...data} = req.body;
        var id = parseInt(req.params.id);
        var model = await ModelModel.findOne({where : {id: id}})
        if (!model) {
            throw new HttpException(404, 'data not found');
        } 
        try{
            model.updated_at=Math.floor(new Date().getTime() / 1000);
            model.user_id = data.user_id;
            model.direct_id = data.direct_id;
            model.status = data.status;
            model.patient_id = data.patient_id;
            model.type_service = data.type_service;
            model.complaint = data.complaint;
            model.summa = data.summa;
            model.pay_summa = data.pay_summa;
            model.backlog = data.backlog;
            model.discount = data.discount;
            await model.validate();
            await model.save();
            await this.#inspectionadd(model, registration_inspection,false);
            await this.#doctoradd(model, registration_doctor,false);
            await this.#filesadd(model, registration_files,false);
            await this.#palataadd(model, registration_palata,false);
            await this.#payAdd(model, registration_pay,false);
            await this.#queue(false);
            
            res.status(200).send({
                error: false,
                error_code: 200,
                message: 'Malumot chiqdi',
                data: model
            });  
        }catch(e){
            if(e instanceof ValidationError){
                res.status(404).send(e.errors[0].message);
                return;
            }
            throw new HttpException(500, 'Something went wrong');
        }

    };

  

    palataDel = async(req, res, next) => {
    const model = await register_palataModel.destroy({
        where: {
            id: req.params.id
        }
    })
    if(!model){
        throw HttpException(404, "bunday id da malumot yoq")
    }
    res.send({
        error: false,
        error_code: 200,
        message: "malumot bor",
        data: "malumot o'chdi"
    })
}
    delete = async (req, res, next) => {
        const id = req.params.id;
        
        const result = await ModelModel.destroy({where : {id: id } });
        await this.#deleteDoctor(id);
        await this.#deleteKassa(id);
        await this.#deleteIns(id);
        await this.#deletedoctor(id);
        await this.#deleteRecipe(id);
        await this.#deleteInspection(id);
        await this.#deleteFiles(id);
        await this.#deletePalata(id);
        await this.#deletepay(id);
        await this.#deleteTashxis(id);
        if (!result) {
            throw new HttpException(404, 'Not found');
        }


        res.send('Has been deleted' );
    };

    checkValidation = (req) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            throw new HttpException(400, 'Validation faild', errors);
        }
    }
    #payAdd = async(model, registration_pay,  insert = true) =>{
        if(!insert){
            await this.#deletepay(model.id);
            await this.#deleteKassa(model.id);
        }
        for(var element of registration_pay){
            var pay = {
                "user_id": element.user_id,
                "registration_id": model.id,
                "pay_type": element.pay_type,
                "summa": element.summa,
                "discount": element.discount,
                "umumiy_sum": element.umumiy_sum,
                "backlog": element.backlog,
                "comment": element.comment
            }
       let tolov =  await Registration_payModel.create(pay);
            var date_time = Math.floor(new Date().getTime() / 1000);
            
            let type = 0, doc_type = '';
            if(element.pay_type == 'Plastik'){
                type = 0,
                doc_type = 'kirim'
            }
            else if(element.pay_type == 'Naqt'){
                type = 0,
                doc_type = 'kirim'
            }
            else if(!element.summa){
                 type = 1,
                 doc_type = 'kirim'
            }
            else{
                doc_type = 'kirim'
            }

            if(tolov != null){
                if(tolov.backlog == 0){
                    Register_kassaModel.create({
                        "date_time": date_time,
                        "doctor_id": model.id,
                        "pay_type": element.pay_type,
                        "price": element.summa,    
                        "type": type,
                        "doc_type": 'Kirim',
                        "place": "registration"
                    })
                }
            }
        }
    }

    #inspectionadd = async(model,  registration_inspection, insert = true) => {
        if(!insert){
            await this.#deleteInspection(model.id);
            await this.#deleteIns(model.id)
        }
        var dds;
        for(var element of registration_inspection){
            var {registration_inspection_child,registration_inspection, ...data} = element;
            let user = await UserModel.findOne({
                where:{
                  id: element.user_id
                },
                raw: true
            })
            console.log(user,element, "tekshiruv");
            data.registration_id=model.id;
          let date =Math.floor(new Date().getTime() / 1000);
            dds={
                "inspection_id":data.inspection_id,  
                "user_id": data.user_id,
                "registration_id":model.id,
                "type":data.type,
                "price": data.price,
                "category_id":data.category_id,
                'status':model.status,
                "date_time": date,
                "skidka": data.skidka
            }
            const models = await Registration_inspectionModel.create(dds);
           setTimeout(async() => {
            let pay = await Registration_payModel.findOne({
                where:{
                    registration_id: models.dataValues.registration_id
                },
                raw: true
            })

            if(pay != null){
               if(pay.backlog == 0){
                var date_time = Math.floor(new Date().getTime() / 1000);
                Register_inspectionModel.create({
                    "date_time": date_time,
                    "type": data.type,
                    "price": user == undefined ? 0 : Math.floor((data.price * user.percent)/100),
                    "doc_id": data.registration_id,
                    "user_id": data.user_id,
                    "inspection_id": data.inspection_id,
                    "inspection_category": data.category_id,
                    "skidka": data.skidka,
                    "doc_type": 'kirim',
                    "place": "Registration",
                    "comment": pay.comment
                  })
            }
               }
           }, 1000);
                function isHave(item) { 
                    return item.room_id == user.room_id&&item.patient_id == model.patient_id;
                  }
                  
                var have=await this.q.find(isHave);
                if(have==undefined){
                    this.q.push({"room_id":user.room_id,"patient_id":model.patient_id,"number":0,"date_time":Math.floor(new Date().getTime() / 1000),"status":data.status});
                }
                else if(data.status!=have.status){
                    if(data.status!='complate'){
                        var index=this.q.findIndex(isHave);
                        this.q[index].status=have.status;
                    }else if(have.status!='complate'){
                        var index=this.q.findIndex(isHave);
                        this.q[index].status=have.status;
                    }
                }
            await this.#inspectionchildadd(models, registration_inspection_child); 
        }
    }
    #inspectionchildadd = async(models, registration_inspection_child) => {
        var dds;
        for(var element of registration_inspection_child){
            dds={"parent_id":models.id,"text":element.text,"norm":element.norm,"name":element.name,"registration_id":models.registration_id,"status":element.status,"price":element.price,"checked":element.checked,"file":element.file}

            await Registration_inspection_childModel.create(dds); 
        }
    }
    #palataadd = async(model, registration_palata,  insert = true) =>{
        var palata;
        var date_time = Math.floor(new Date().getTime() / 1000);
        if(!insert){
            await this.#deletePalata(model.id);
        }
        let tolov = await Registration_payModel.findOne({
            where:{
                registration_id: model.id
            }
        })
        for(let element of registration_palata){
            palata={
                "palata_id": element.palata_id,
                "registration_id":model.id,
                'price':element.price,
                "date_time":date_time,
                "date_do": element.date_do,
                "date_to": element.date_to,
                "day":element.day,
                "total_price":element.total_price};
            await registration_palataModel.create(palata); 
            var date_time = Math.floor(new Date().getTime() / 1000);
            console.log(tolov.dataValues);
            if(tolov != null){
                if(tolov.dataValues.backlog){
                    register_palataModel.create({
                        "palata_id": element.palata_id,
                        "patient_id": model.id,
                        "registration_id": model.id,
                        "price": element.price,
                        "day": element.day,
                        "date_to": element.date_to,
                        "date_do": element.date_do,
                        "date_time": element.date_time
                    })
                }
            }

        }
    }

    #doctoradd = async(model, registration_doctor, insert = true) => {
        if(!insert){
            await this.#deletedoctor(model.id);
            await this.#deleteDoctor(model.id);
        }
        for(var element of registration_doctor){
            var {Registration_recipe, register_mkb,...data} = element;
            let user = await UserModel.findOne({
                where:{
                    doctor_id: element.doctor_id
                },
                raw: true
            })
            console.log(user, element, 'doktor');
            var news={
                "doctor_id":element.doctor_id,
                "registration_id":model.id,
                "price":data.price,
                "status": model.status,
                "text":data.text,
                "date_time": element.date_time
            };
            const models = await Registration_doctorModel.create(news);
            setTimeout(async() => {
                let pay = await Registration_payModel.findOne({
                    where:{
                        registration_id: models.dataValues.registration_id
                    },
                    raw: true
                })
                if(pay != null){
                  if(pay.backlog == 0){
                    var date_time = Math.floor(new Date().getTime() / 1000);
                    RegisterDoctorModel.create({
                        "date_time": date_time,
                        "type": data.text,
                        "price": user == undefined ? 0 : Math.floor((data.price * user.percent)/100),
                        "doc_id": model.id, 
                        "doctor_id": data.doctor_id,
                        "doc_type": 'kirim',
                         "place": "Registration",
                         "comment": pay.comment
                     })
                }
                  }
                
            }, 1000);
            // console.log(user, 'salom', data);
            function isHave(item) { 
                return item.room_id == user.room_id&&item.patient_id == model.patient_id;
              }
            var have=await this.q.find(isHave);
            if(have==undefined){
                this.q.push({
                    "room_id":user.room_id,
                    "patient_id":model.patient_id,
                    "number":0,
                    "date_time":Math.floor(new Date().getTime() / 1000),
                    "status":models.status
                });
            }else if(data.status!=have.status){
                if(data.status!='complate'){
                    var index=this.q.findIndex(isHave);
                    this.q[index].status=have.status;
                } else if(have.status!='complate'){
                    var index=this.q.findIndex(isHave);
                    this.q[index].status=have.status;
                }
            }
            await this.#recieptadd(models, element.registration_recipe, false); 
            await this.#tashxisAdd(model,models, element.register_mkb, false)
        }
    }
    #recieptadd = async(model, registration_recipe, insert = true) => {
        if(!insert){
            await this.#deleteRecipe(model.id);
        }
        var adds;
        for(var element of registration_recipe){
            adds={
                "registration_doctor_id":model.id,
                "registration_id":model.registration_id,
                'pill_id':element.pill_id,
                "time":element.time,
                "day":element.day,
                "comment":element.comment,
                "name": element.name
            };
            await Registration_recipeModel.create(adds);
        }
    }
    #filesadd = async(model, registration_files, insert = true) => {
        if(!insert){
            await this.#deleteFiles(model.id);
        }
        var asas;
        for(var element of registration_files){
            asas={'registration_id':model.id,"href":element.href};
            await Registration_filesModel.create(asas); 
        }
    }
    #tashxisAdd = async(model,models, register_mkb, insert = true) => {
        if(!insert){
            await this.#deleteTashxis(model.id);
        }
        var asas;
        var date_time = Math.floor(new Date().getTime() / 1000);
        for(var element of (register_mkb)){
            asas={
                'registration_id':models.id,
                 "mkb_id": element.mkb_id,
                 "name": element.name,
                 "datetime": date_time,
                 "patient_id": model.patient_id,
                 "doctor_id": element.doctor_id
            };
            await Register_mkb.create(asas); 
        }
    }
    #queue = async(insert=true) => {
        for(var element of this.q){
            if(!insert){
                var has=await QueueModel.findOne({
                    where:{
                        status:{[Op.not]:'complate'},
                        room_id: element.room_id,
                        patient_id: element.patient_id
                    }
                });
                if(has!=null){
                    if(element.status!=has.status){
                        has.status=element.status;
                        await has.save();
                    }
                }else if(element.status!='complate') {
                    var que=await QueueModel.findOne({
                        where:{ 
                            room_id: element.room_id,
                        },
                        order: [
                            ['number', 'DESC']
                        ],
                    });
                    if(que!=null){
                        element.number=que.number+1;
                    }else{
                        element.number=1;
                    }
                    await QueueModel.create(element);
                }
            }else{
                var que=await QueueModel.findOne({
                    where:{ 
                        room_id: element.room_id,
                    },
                    order: [
                        ['number', 'DESC']
                    ],
                });
                if(que!=null){
                    element.number=que.number+1;
                }else{
                    element.number=1;
                }
                await QueueModel.create(element); 

            }
        } 
        this.q=[];
    }
    #deletedoctor = async(doc_id) =>
     {
        await Registration_doctorModel.destroy({where: {registration_id: doc_id}})
        await Registration_recipeModel.destroy({where: {registration_id: doc_id}})
    }
    #deleteTashxis = async(doc_id) =>
     {
        await Register_mkb.destroy({where: {registration_id: doc_id}})
    }
    #deleteDoctor = async(doc_id) =>
     {
        await RegisterDoctorModel.destroy({where: {doc_id: doc_id}})
    }
    #deleteIns = async(doc_id) =>
     {
        await Register_inspectionModel.destroy({where: {doc_id: doc_id}})
    }
    #medDelete = async(doc_id) => {
        await registerMedDirectModel.destroy({where: {id: doc_id}})
    }
    #deleteKassa = async(doc_id) =>
     {
        await Register_kassaModel.destroy({where: {doctor_id: doc_id}})
    }
    #deleteDirect = async(id) => {
        await registerDirectModel.destroy({where: {doc_id: id}})
    }
    #deleteRecipe = async(doc_id) => {
        await Registration_recipeModel.destroy({where: {registration_id: doc_id}})
    }
    #deleteInspection = async(doc_id) => {
        await Registration_inspectionModel.destroy({where: {registration_id: doc_id}})
        await Registration_inspection_childModel.destroy({where: {registration_id: doc_id}})
    }
    #deletePalata = async(doc_id) => {
        await registration_palataModel.destroy({where: {registration_id: doc_id}})
    }
    #deletepay = async(doc_id) => {
        await Registration_payModel.destroy({where: {registration_id: doc_id}})
    }
    #deleteFiles = async(doc_id) => {
        await Registration_filesModel.destroy({where: {registration_id: doc_id}})
    }

    palata = async (req, res, next) => {
        let query = {}, query_begin = {}, query_end = {}, body = req.body;
        let data1 = body.date_to;
        let data2 = body.date_do;
        query.date_time = {
            [Op.gte]: body.date_to,
            [Op.lte]: body.date_do,
        }
        query_begin.date_time = {
            [Op.lt]: body.date_to
        }
        query_end.date_time = {
            [Op.lte]: body.date_do
        }

        let result = await palataModel.findAll({
                include:[
                    {model: registration_palataModel, as: 'palatas', attributes: ['id','date_time', 'date_do']}
                ],
                raw: true
        })
        result.forEach(value => {
            if(value['palatas.date_time'] !== null && value['palatas.date_time'] <= data1 && value['palatas.date_do'] >= data2 ){
                value.status = true
            }
            else if(value['palatas.date_do'] <= data2 && value['palatas.do'] <= data1){
                value.status = false
            }
            else if(value['palatas.date_do'] >= data1 && value['palatas.date_time'] <= data1){
                 value.status = true
            }
            else{
                value.status = false
            }
        })
            res.send(result);
    }
    
    kassaSverka = async (req, res, next) => {
        this.checkValidation(req);
        let result;
        let body = req.body; 
        let query = {}, query_begin = {}, query_end = {}, queryx = {};
        query.date_time =  {
            [Op.gte]: body.datetime1,
            [Op.lte]: body.datetime2,
        };
        query_begin.date_time =  {
            [Op.lt]: body.datetime1,
        };
        query_end.date_time =  {
            [Op.lte]: body.datetime2,
        };
        
        if(req.body.datetime1 < req.body.datetime2){
            result = await Register_kassaModel.findAll({
                where: {
                    date_time: {[Op.gt]: body.datetime1, [Op.lt]: body.datetime2},
                  },
                  include:[
                    {model: RegistrationModel, as: 'registration', attributes: ['id'],
                include:[
                    {model: Registration_doctorModel, as: 'registration_doctor', attributes: ['doctor_id'],
                include: [
                    {model: DoctorModel, as: 'doctor', attributes: ['name']}
                ]
                }
                ]
                }
                ],
                order: [
                    ['date_time', 'ASC']
                ]
            })
            result.forEach(val => {
                if(val.dataValues.pay_type == 'Plastik' || val.dataValues.pay_type == 'plastik'){
                    if(val.dataValues.doc_type == 'Kirim'){
                        val.dataValues.Plaskirim = val.dataValues.price
                    }
                    else{
                    val.dataValues.PlasChiqim = val.dataValues.price
                    }
                }
                else{
                    if(val.dataValues.doc_type != 'chiqim'){
                        val.dataValues.Nahdkirim = val.dataValues.price
                    }
                    else{
                    val.dataValues.NahdChiqim = val.dataValues.price
                    }
                }
            })
        res.send(result);
        }
        else{
            result = await Register_kassaModel.findAll({
                where: {
                    date_time: {[Op.lt]: body.datetime1},
                  },
                  include:[
                    {model: Registration_arxivModel, as: 'registration', attributes: [],
                include:[
                    {model: Registration_doctorModel, as: 'registration_doctor', attributes: [],
                include: [
                    {model: DoctorModel, as: 'doctor', attributes: ['name']}
                ]
                }
                ]
                }
                ],
                order: [
                    ['date_time', 'ASC']
                ]
            })
            result.forEach(val => {
                if(val.dataValues.pay_type == 'Plastik' || val.dataValues.pay_type == 'plastik'){
                    if(val.dataValues.doc_type == 'Kirim'){
                        val.dataValues.Plaskirim = val.dataValues.price
                    }
                    else{
                    val.dataValues.PlasChiqim = val.dataValues.price
                    }
                }
                else{
                    if(val.dataValues.doc_type != 'chiqim'){
                        val.dataValues.Nahdkirim = val.dataValues.price
                    }
                    else{
                    val.dataValues.NahdChiqim = val.dataValues.price
                    }
                }
            })
        res.send(result);
        }
    }
    
    kassa = async (req, res, next) => {
        this.checkValidation(req);
        let result;
        let body = req.body; 
        let datetime1 = body.datetime1;
        let datetime2 = body.datetime2;
        let query = {}, query_begin = {}, query_end = {};
        query.date_time =  {
            [Op.gte]: body.datetime1,
            [Op.lte]: body.datetime2,
        };
        query_begin.date_time =  {
            [Op.lt]: body.datetime1,
        };
        query_end.date_time =  {
            [Op.lte]: body.datetime2,
        }
        result = await Register_kassaModel.findAll({
            attributes : [ 
                'id', 'doctor_id', "type", "date_time", "doc_type",
                [sequelize.literal("SUM(CASE WHEN register_kassa.date_time < " + datetime1 + " THEN register_kassa.price * power(-1, 'type') ELSE 0 END)"), 'total'],
                [sequelize.literal("SUM(CASE WHEN register_kassa.date_time >= " + datetime1 + " and register_kassa.date_time <= " + datetime2 + " AND register_kassa.doc_type = 'Kirim' THEN register_kassa.price ELSE 0 END)"), 'total_kirim'],
                [sequelize.literal("SUM(CASE WHEN register_kassa.date_time >= " + datetime1 + " and register_kassa.date_time <= " + datetime2 + " AND register_kassa.doc_type = 'chiqim' THEN register_kassa.price ELSE 0 END)"), 'total_chiqim'],
            ],
            include: [
                { model: DoctorModel, as: 'doctor', attributes: ['name', 'id'] },
            ],
            order: [
                ['date_time', 'ASC']
            ],
            raw: true
        }) 
        let resultx = [];
        for(let i = 0; i < result.length; i++){
            let kassa_register = await Register_kassaModel.findOne({
                attributes : [ 'id', 'doctor_id', "type", "date_time", "doc_type",
                    [sequelize.literal('sum(`price` * power(-1, `type` + 1))'), 'total'],
                ],
                where : query_begin,
                raw: true,
                include: [
                    { model: DoctorModel, as: 'doctor', attributes: ['name', 'id'] },
                ],
            });
            let kassa_registerx = await Register_kassaModel.findOne({
                attributes : [ 'id', 'doctor_id', "type", "date_time", "doc_type",
                    [sequelize.literal('sum(`price` * power(-1, `type` + 1))'), 'total'],
                ],
                where : query_end,
                include: [
                    { model: DoctorModel, as: 'doctor', attributes: ['name', 'id'] },
                ],
                raw: true
            }); 
            resultx.push(
                {
                    'pay_type' : result[i].pay_type,
                    'begin_total' : (kassa_register != null ? kassa_register.total : 0),
                    'total' : result[i].total,
                    'total_kirim' : result[i].total_kirim,
                    'total_chiqim' : result[i].total_chiqim,
                    'end_total' : (kassa_registerx != null ? kassa_registerx.total : 0),
                    'doctor': result[i]['doctor.name'],
                    "doctor_id": result[i]['doctor.id'],
                    'type': result[i].type,
                    'date_time': result[i].date_time,
                    'id': result[i].id,
                    "doc_type": result[i].doc_type
                }
            );
        }
        res.send(resultx);
    };
    search = async (req, res, next) => {
        let ModelList = await PatientModel.findAll({
            where:{ 
                fullname:{  [Op.like]: '%'+req.body.name+'%'}
            },
            order: [
                ['name', 'ASC'],
                ['id', 'ASC']
            ],
            limit:100        });
        res.send({
            "error": false,
            "error_code": 200,
            "message": "Product list filial:02 Феендо махсулотлари",
            data: ModelList
        });
    };
    
    searchs = async (req, res, next) => {
        let ModelList = await ModelModel.findAll({
            include:[ 
                {
                    model: UserModel, as: 'user', attributes: ['user_name']
                },

                {
                    model: Registration_doctorModel, as: 'registration_doctor',
                    include:[
                        {
                            model: Registration_recipeModel, as: 'registration_recipe'
                        }
                    ]
                },
                {
                    model: Registration_inspectionModel, as: 'registration_inspection',
                    include:[
                        {
                            model: Registration_inspection_childModel, as: 'registration_inspection_child'
                        }
                    ]
                },
                {model: PatientModel, as: 'patient', 
                where:{ 
                    fullname:{  [Op.like]: '%'+req.body.name+'%'}
                }
            },
            {
                model: UserModel, as: 'user', attributes: ['user_name']
            },
            {
                model: Registration_doctorModel, as: 'registration_doctor',
                include:[
                    {
                        model: Registration_recipeModel, as: 'registration_recipe'
                    }
                ]
            },
            {
                model: Registration_inspectionModel, as: 'registration_inspection',
                include:[
                    {
                        model: Registration_inspection_childModel, as: 'registration_inspection_child'
                    }
                ]
            } 
            ],
            limit:100
        });
        
        if(req.body.name.length == 0){
            let model = await ModelModel.findAll({
                limit: 50,
                include:[
                    {
                        model: UserModel, as: 'user', attributes: ['user_name']
                    },
    
                    {
                        model: Registration_doctorModel, as: 'registration_doctor',
                        include:[
                            {
                                model: Registration_recipeModel, as: 'registration_recipe'
                            }
                        ]
                    },
                    {
                        model: Registration_inspectionModel, as: 'registration_inspection',
                        include:[
                            {
                                model: Registration_inspection_childModel, as: 'registration_inspection_child'
                            }
                        ]
                    },
                    {model: PatientModel, as:'patient'}
                ]
            })
            res.send({
                "error": false,
                "error_code": 200,
                "message": "Product list filial:02 Феендо махсулотлари",
                data: model
            });
        }
        else{
            res.send({
                "error": false,
                "error_code": 200,
                "message": "Product list filial:02 Феендо махсулотлари",
                data: ModelList
            });
        }
       
    };
    Imtiyozli = async (req, res, next) => {
        let bemor_id = req.body.patient_id;
        let date =Math.floor(new Date().getTime()/1000);      
        const model = await RegistrationModel.findAll({
            attributes: ['user_id', 'direct_id', 'created_at', 'updated_at', 'status', 'patient_id', 
            'type_service', 'complaint','summa','pay_summa','backlog','discount','hospital_summa','tramma_type'],
            where:{
                patient_id: bemor_id
            }
        })
        if(!model){
            throw HttpException(404, "bemor oldin kelmagan")
        }
        if(model.length != 0){
            model.forEach(value => {
                let beshinchiKun = moment(value.created_at*1000).day(8).format();
                let kelganKuni = moment(value.created_at*1000).format();
                let bugungiVaqt = moment(date *1000).format();
                let onBeshinchiKun = moment(value.created_at*1000).day(18).format();
                let birOy = moment(value.created_at*1000).day(31).format();
                if(beshinchiKun > bugungiVaqt && kelganKuni < bugungiVaqt ){
                    let day = "5 kun oralig'ida";
                    res.send({
                        "error": false,
                        "error_code": 0,
                        "message": "malumot topildi",
                        data: day
                    });
                }
                else if(onBeshinchiKun > bugungiVaqt && kelganKuni < bugungiVaqt){
                    let day = "15 kun oralig'ida";
                    res.send({
                        "error": false,
                        "error_code": 0,
                        "message": "malumot topildi",
                        data: day
                    });
                }
                else if(birOy > bugungiVaqt && kelganKuni < bugungiVaqt){
                    let day = "Bir oy oralig'ida";
                    res.send({
                        "error": false,
                        "error_code": 0,
                        "message": "malumot topildi",
                        data: day
                    });
                }
                else{
                    let day = "Bir oydan ortiq";
                    res.send({
                        "error": false,
                        "error_code": 200,
                        "message": "malumot topildi",
                        data: day
                    });
                }
            })
        }
        else{
            res.send({
                "error": false,
                "error_code": 200,
                "message": "malumot topildi",
                data: "Bir oydan ortiq"
            });
        }
    }
    inspection = async (req, res, next) => {
        this.checkValidation(req);
        let query = {}, queryx = {};
        let body = req.body;
        let datetime1 = body.datetime1;
        let datetime2 = body.datetime2;
        if(body.inspection_category !== null){
            query.id = {[Op.eq] : body.inspection_category }  
            queryx.inspection_category = {[Op.eq]: body.inspection_category}
            
        };
          
        let result = await Register_inspectionModel.findAll({
            attributes: [
                 'id', "type", "date_time", "inspection_category", "doc_id","comment",
                [sequelize.literal("SUM(CASE WHEN register_inspection.date_time >= " + datetime1 + " and register_inspection.date_time <= " + datetime2 + " AND register_inspection.doc_type = 'kirim' THEN register_inspection.price ELSE 0 END)"), 'total_kirim'],
                [sequelize.literal("SUM(CASE WHEN register_inspection.date_time >= " + datetime1 + " and register_inspection.date_time <= " + datetime2 + " AND register_inspection.doc_type = 'chiqim' THEN register_inspection.price ELSE 0 END)"), 'total_chiqim'],
                [sequelize.literal("COUNT(Case WHEN register_inspection.date_time >=" + datetime1 + " and register_inspection.date_time <= " + datetime2 + " and register_inspection.inspection_category = inspection.id then register_inspection.inspection_category else 0 end)"), 'count']
            ],
            include: [
                { model: inspectionCategory, as: 'inspection', attributes: ['name', 'id'], where: query},
            ],
            where: queryx,
            raw: true,
            group: ['inspection_category'],
            order: [
                ['id', 'ASC']
            ],
        })
        res.send(result);
    };
    InspectionSverka = async (req, res, next) => {
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
            attributes: [ 'doc_type', 'id', 'date_time', "doc_id","comment","inspection_id","place",
               [sequelize.literal("SUM(CASE WHEN register_inspection.date_time < " + datetime1 + " THEN price * power(-1, 'type') ELSE 0 END)"), 'begin_total'],
               [sequelize.literal("SUM(CASE WHEN register_inspection.date_time >= " + datetime1 + " and register_inspection.date_time <= " + datetime2 + " AND register_inspection.doc_type = 'kirim' THEN register_inspection.price ELSE 0 END)"), 'kirim'],
               [sequelize.literal("SUM(CASE WHEN register_inspection.date_time >= " + datetime1 + " and register_inspection.date_time <= " + datetime2 + " AND register_inspection.doc_type = 'chiqim' THEN register_inspection.price ELSE 0 END)"), 'chiqim'],
               [sequelize.literal("SUM(CASE WHEN register_inspection.date_time <= " + datetime2 + " THEN price * power(-1, 'type') ELSE 0 END)"), 'end_total'],
        ],
           group: ['id']
        })
        res.send(model)
       }
    kassaAll = async (req, res, next) =>{
        const model = await Register_kassaModel.findAll({
            include:[
                {model: DoctorModel, as: 'doctor'}
            ]
        })
        res.send({
            error_code: 200,
            error: false,
            message: "malumotlar chiqdi",
            data: model
        })
    }
    
   
    directHisobot = async (req, res, next) => {
        this.checkValidation(req);
        let query = {}, queryx = {};
        let body = req.body;
        let datetime1 = body.datetime1;
        let datetime2 = body.datetime2;
        if(body.direct_id !== null){
            query.id = {[Op.eq] : body.direct_id }  
            queryx.direct_id = {[Op.eq]: body.direct_id}
        };
        const model = await registerDirectModel.findAll({
            attributes: [
                'id', "type", "date_time", "direct_id", "doc_id","comment", "place", "doc_type",
               [sequelize.literal("SUM(CASE WHEN register_direct.date_time >= " + datetime1 + " and register_direct.date_time <= " + datetime2 + " AND register_direct.doc_type = 'kirim' THEN register_direct.price ELSE 0 END)"), 'total_kirim'],
               [sequelize.literal("SUM(CASE WHEN register_direct.date_time >= " + datetime1 + " and register_direct.date_time <= " + datetime2 + " AND register_direct.doc_type = 'chiqim' THEN register_direct.price ELSE 0 END)"), 'total_chiqim'],
               [sequelize.literal("COUNT(Case WHEN register_direct.date_time >=" + datetime1 + " and register_direct.date_time <= " + datetime2 + ` and register_direct.direct_id = ${body.direct_id} then register_direct.direct_id else 0 end)`), 'count']
           ],
           where: queryx
        })
        res.send(model)
    };
    
    directSverka = async (req, res, next) => {
        this.checkValidation(req);
        let query = {}, queryx = {};
        let body = req.body;
        let datetime1 = body.datetime1;
        let datetime2 = body.datetime2;
        if(body.direct_id !== null){
            query.id = {[Op.eq] : body.direct_id }  
            queryx.direct_id = {[Op.eq]: body.direct_id}
        };
          
        let result = await registerDirectModel.findAll({
            attributes: [
                'id', "type", "date_time", "direct_id", "doc_id","comment", "place", "doc_type",
               [sequelize.literal("SUM(CASE WHEN register_direct.date_time >= " + datetime1 + " and register_direct.date_time <= " + datetime2 + " AND register_direct.doc_type = 'kirim' THEN register_direct.price ELSE 0 END)"), 'total_kirim'],
               [sequelize.literal("SUM(CASE WHEN register_direct.date_time >= " + datetime1 + " and register_direct.date_time <= " + datetime2 + " AND register_direct.doc_type = 'chiqim' THEN register_direct.price ELSE 0 END)"), 'total_chiqim'],
               [sequelize.literal("SUM(CASE WHEN register_direct.date_time <= " + datetime2 + " THEN price * power(-1, 'type') ELSE 0 END)"), 'end_total']
           ], 
           where: queryx,
           group: ['id']
           
        })
        res.send(result);
    };
    
    deleted = async (req, res, next) => {
        let models = await ModelModel.findAll();
        if(models.length > 0){
            db.query('DELETE from registration')
            db.query('DELETE from registration_doctor')
            db.query('DELETE from registration_inspection')
            db.query('DELETE from registration_inspection_child')
            db.query('DELETE from registration_pay')
            db.query('DELETE from registration_recipe')
            db.query('DELETE from register_doctor')
            db.query('DELETE from register_inspection')
            db.query('DELETE from register_kassa')
            db.query('DELETE from register_mkb')
            db.query('DELETE from register_palata')
            db.query('DELETE from uplata')
            db.query('DELETE from queue')
            db.query('DELETE from patient')
        }
        else{
            throw new HttpException(401, "bazada malumot mavjud emas")
        }
        res.status(200).send({
            error: false,
            error_code: 200,
            message: 'Malumotlar o\'chirildi'
        });
    }
    delete = async (req, res, next) => {
        const user = await ModelModel.findOne({
            where:{
                id: req.params.id
            }
          })
          await QueueModel.destroy({
            where:{
                patient_id: user.dataValues.patient_id
            }
          })
          await this.uplataModel.destroy({
            where:{
                user_id: user.dataValues.user_id
            }
          })
      const doctor = await Registration_doctorModel.destroy({
            where:{
                registration_id: req.params.id
            }
           })
           await Registration_filesModel.destroy({
               where:{
                registration_id: req.params.id
               }
              })
            const inspection = await Registration_inspectionModel.destroy({
               where:{
                registration_id: req.params.id
               }
              })
              await Registration_inspection_childModel.destroy({
               where:{
                registration_id: req.params.id
               }
              })
              await Register_inspectionModel.destroy({
                where:{
                    doc_id: req.params.id
                }
              })
              await RegisterDoctorModel.destroy({
                where:{
                    doc_id: req.params.id
                }
              })
              await register_mkb.destroy({
                where:{
                    registration_id: req.params.id
                }
              })
           const pay = await Registration_payModel.destroy({
               where:{
                registration_id: req.params.id
               }
              })
              await Registration_recipeModel.destroy({
               where:{
                registration_id: req.params.id
               }
              })
              await Register_kassaModel.destroy({
                  where:{
                      doctor_id: req.params.id,
                      place: 'registration'
                  }
              })
              const model =  await ModelModel.destroy({ 
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
    queueAll = async (req, res, next) => {
        const model = await QueueModel.findAll({
            where:{
                status:{[Op.not]:'complate'}
            },
            include:[
                {model: RoomModel, as: 'room', attributes: ['name'],
            include:[
                {model: UserModel, as: 'users', attributes: ['doctor_id'],
                include:[
                    {model: DoctorModel, as: 'doctor', attributes: ['name']}
                ]
            }
            ]
            },
                {model: PatientModel, as: 'patient', attributes: ['fullname']},
            ],
            group:['room_id'],
            limit: 100,
            order: [
                ['number', 'ASC']
            ],
        });
         res.send({
            error_code: 200,
            error: false,
            message: "malumotlar chiqdi",
            data: model
         })
        
    }
    
    registerAll = async (req, res, next) => {
        const model = await Register_kassaModel.findAll({
            include:[
                {model: DoctorModel, as: 'doctor', attributes: ['name']}
            ]
        });
    
        res.send({
            error_code: 201,
            error: false,
            message: "malumotlar chiqdi",
            data: model
        })
    }
    
}



module.exports = new RegistrationController;