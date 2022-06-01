const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
const Inspection_categoryModel = require('./inspector_category.model')
const Registration_inspection_childModel = require('./registration_inspection_child.model');
class Registration_inspectionModel extends Model {
    toJSON () {//Api da ishladi
    var values = Object.assign({}, this.get());
        delete values.password_hash;
        return values;
    }
}

Registration_inspectionModel.init({
  id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true, 
      allowNull: false
  },
  inspection_id: {
      type: DataTypes.INTEGER,
      allowNull: false
  },
  registration_id : {
      type: DataTypes.INTEGER,
      allowNull: false
  },
  type:{
      type:DataTypes.BOOLEAN,
      allowNull: false
  },
  price:{
      type: DataTypes.INTEGER,
      allowNull: false
  },
//inspection_category
  category_id:{
      type: DataTypes.INTEGER,
      allowNull: false
  },
  status:{
      type: DataTypes.STRING(20),
      allowNull: false
  }
}, {
  sequelize,
  modelName: 'registration_inspection',
  tableName: 'registration_inspection',
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
  scopes: {
    withoutPassword: {
      attributes: { exclude: ['password_hash'] },
    }
  }
});
// Registration_inspection_childModel.belongsTo(Registration_inspectionModel, {as: 'registration_inspection_child', foreignKey: 'parent_id'})
Registration_inspectionModel.belongsTo(Registration_inspection_childModel, {as: 'registration_Child', foreignKey: 'inspection_id'})
// Registration_inspectionModel.belongsTo(Inspection_categoryModel, {as: 'inspection_category', foreignKey: 'category_id'})
module.exports = Registration_inspectionModel;