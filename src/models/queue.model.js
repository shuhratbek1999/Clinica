const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
const PatientModel = require('./patient.model');
const RoomModel = require('../models/room.model')
class QueueModel extends Model {
    toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
}

QueueModel.init({
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true,  
    allowNull: false
},
room_id : {
    type: DataTypes.INTEGER,
},
patient_id : {
    type: DataTypes.INTEGER,
},
number : {
    type: DataTypes.INTEGER,
},
date_time: {
    type: DataTypes.INTEGER,
},
status: {
    type: DataTypes.STRING(20),
}

}, {
  sequelize,
  modelName: 'queue',
  tableName: 'queue',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "id" },
      ]
    },
  ],
  //findOne da yoki findAll da chaqirish kerak
  
});
QueueModel.belongsTo(RoomModel, {as: 'room', foreignKey: 'room_id'})
QueueModel.belongsTo(PatientModel, {as: 'patient', foreignKey: 'patient_id'})
module.exports = QueueModel;