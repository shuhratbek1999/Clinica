const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
class register_palataModel extends Model {
    // toJSON () {//Api da ishladi
    // var values = Object.assign({}, this.get());
    //     delete values.password_hash;
    //     return values;
    // }
}

register_palataModel.init({
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true 
  },
 date_time:{
   type: DataTypes.INTEGER
 },
 palata_id: {
   type: DataTypes.INTEGER(400)
 },
 price:{
   type: DataTypes.DECIMAL()
 },
 registration_id:{
   type: DataTypes.INTEGER,
 },
 patient_id:{
  type: DataTypes.INTEGER,
},
 day:{
  type: DataTypes.INTEGER
},
date_to:{
  type: DataTypes.INTEGER
},
date_do:{
  type: DataTypes.INTEGER
},


}, {
  sequelize,
  modelName: 'register_palata',
  tableName: 'register_palata',
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
        { name: "palata_id" },
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
        { name: "direct_id" },
      ]
    }
  ],
 
});
module.exports = register_palataModel;