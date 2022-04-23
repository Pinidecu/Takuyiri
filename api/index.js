const server = require('./src/app.js');
const { conn } = require('./src/db.js');


const { Receta, Diets } = require('./src/db.js');



// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(process.env.PORT, () => {
    console.log("%s listening at 3000"); // eslint-disable-line no-console
  });
  
  /* var papas_al_horno =  Receta.create({
    title: 'papas al horno',
    summary: 'Papas cortadas en rodajas zazonadas con aceite y condimentada',
    spoonacularScore: 88,
    healthScore: 42,
    instructions:'pelar la papa, cortarla, meter al horno'
  });
  
  var fideos =  Receta.create({
    title: 'fideos con tuco',
    summary: 'Fideos hervidos con salsa de tomate',
    spoonacularScore: 75,
    healthScore: 66,
    instructions:'Poner a hervir agua, agregar los fideos, colarlos'
  });

  var pure =  Receta.create({
    title: 'pure de papas',
    summary: 'papas pisadas para acompañar comidas',
    spoonacularScore: 92,
    healthScore: 71,
    instructions:'pelar la papa, cortarla, hervirla y pisarla'
  }); */

  

  // creando tipos de dietas
  dietas = ['Gluten Free', 'Ketogenic', 'Vegetarian', 'Lacto-Vegetarian', 'Ovo-Vegetarian', 'Vegan', 'Pescetarian', 'Paleo', 'Primal', 'Whole30']

  dietas.forEach((d) =>{
    Diets.findOrCreate({
      where: {
        nombre: d
      }
    })
  })


});
