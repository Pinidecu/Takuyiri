const { DataTypes } = require('sequelize');


var Sequelize = require('sequelize');
const S = Sequelize;

const { STRING, ENUM, TEXT, VIRTUAL, INTEGER, ARRAY, JSON } = S.DataTypes;
//console.log(S.DataTypes)

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('receta', {
    title: { type: STRING, allowNull: false, unique: true },
    summary: {type: TEXT, allowNull: false},
    spoonacularScore: {type: INTEGER, validate: {min: 0,max: 100}, defaultValue: 0},
    healthScore: {type: INTEGER, validate: {min: 0,max: 100}, defaultValue: 0},
    instructions:{type: TEXT} ,
    origen: {type: DataTypes.STRING, defaultValue: "db"},
    image: { type: STRING, defaultValue: ''}
  });

  sequelize.define('diets', {
    nombre: {type: STRING, allowNull:false}
  }, {timestamps: false})

  
};