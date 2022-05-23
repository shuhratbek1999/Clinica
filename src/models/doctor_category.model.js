const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
class UserModel extends Model {
    toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
}

UserModel.init({
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  price:{
    type: DataTypes.DECIMAL(),
    allowNull: false
  },

}, {
  sequelize,
  modelName: 'doctor_category',
  tableName: 'doctor_category',
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

module.exports = UserModel;