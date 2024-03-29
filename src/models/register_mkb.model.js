const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
class register_mkb extends Model {
    toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
} 

register_mkb.init({
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true, 
    allowNull: false
},
mkb_id : {
    type: DataTypes.INTEGER,
},
registration_id: {
    type: DataTypes.INTEGER(),
    allowNull: false
},
patient_id: {
  type: DataTypes.INTEGER(),
  allowNull: false
},
datetime:{
  type: DataTypes.INTEGER
},
name:{
  type: DataTypes.STRING(),
  allowNull: false
},
doctor_id:{
  type: 'int',
  allowNull: false
}



}, {
  sequelize,
  modelName: 'register_mkb',
  tableName: 'register_mkb',
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
    {
      name: "PRIMARY",
      using: "BTREE",
      fields: [
        { name: "mkb_id" },
      ]
    },
    {
      name: "PRIMARY",
      using: "BTREE",
      fields: [
        { name: "registration_id" },
      ]
    },
    {
      name: "PRIMARY",
      using: "BTREE",
      fields: [
        { name: "patient_id" },
      ]
    }
  ],
  //findOne da yoki findAll da chaqirish kerak
});
module.exports = register_mkb;