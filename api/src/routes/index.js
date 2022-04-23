const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Receta, Diets } = require('../db.js');
const { Op } = require("sequelize");
const {API_KEY} = process.env;
const fetch = require('node-fetch');

const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//Busca todas las recetas de la BD
router.get('/allrecipes', async function (req, res){
    try{
        const {name} = req.query;
        const recetas = await Receta.findAll({
            include: Diets,
            attributes: { exclude: [ 'createdAt', 'updatedAt'] }
        });
        /* if(recetas.diets.length>0){
            var a = recetas.diets.map(d => d.nombre)
            recetas.diets = a;
        } */
        if(recetas.length>0){
            res.json(recetas);   
        }
        else{
            throw new Error;
        }
    } catch(error){
        res.status(404).send('No se encontraron recetas')
    }  
    
})


//Busca recetas desde la BD que contengan la palabra
router.get('/recipes', async function (req, res){
    try{
        const {name} = req.query;
        if(!name){res.status(404).send('No se ingreso un query valido')}
        const recetas = await Receta.findAll({
            include: Diets,
            where: {title: {[Op.substring]: `%${name}`}}
        });
        if(recetas.length>0){
            res.json(recetas);   
        }
        else{
            throw new Error;
        }
    } catch(error){
        res.status(404).send('No se encontraron recetas')
    }
})

//Busca recetas desde la BD por ID
router.get('/recipes/:idReceta', async function (req, res){
    try{
        const {idReceta} = req.params;
        const receta = await Receta.findAll({
            include: Diets,
            where: {id: idReceta}}
        );
        //const receta = await Receta.findByPk(idReceta);
        if(receta.length>0){
            res.json(receta[0]);   
        }
        else{
            throw new Error;
        }
    }catch(error){
        console.log('e:', error)
        res.status(404).send('No se encontraron recetas')}
})

//Busca todas las recetas de la API y la DB
router.get('/allapirecipes/', async function (req, res){
    try{
        var recetasAPI = await fetch (`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
        .then(r => r.json())
        var recetasDB = await Receta.findAll({
            include: [{model: Diets, attributes: ['nombre']}]
        });


        var result = await recetasDB.concat(recetasAPI.results)
        res.json(result)
        var recetasDB = null;
    } catch(e){
        res.status(404).send(['No se encontraron recetas'])
    }
})


//Busca recetas desde la API por ID
router.get('/recipesapi/:id', async function (req, res){
    
    const {id} = req.params;
    var receta;
    fetch (`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)
    .then(r => r.json())
    .then((result) => {
        if (result.status!==404){
            return res.json(result);
        }
        else{
            throw new Error;
        }
    })
    .catch(() =>{
        res.status(404).send('No se encontraron recetas')
    })
})

//Busca recetas desde la API por nombre
router.get('/recipesapi', async function (req, res){
   

    try{
        const {name} = req.query;
        var recetasAPI = await fetch (`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${name}&number=100&addRecipeInformation=true`)
        .then(r => r.json())
        var recetasDB = await Receta.findAll({
            include: Diets,
            where: {title: {[Op.substring]: `%${name}%`}}
        });

        var result = recetasDB.concat(recetasAPI.results)
        console.log('holaaaaaaaaa', recetasDB)
        //console.log('resultadoooooo', result)
        var recetasDB = null;
        if(result.length>0){
            res.json(result)
        }else{
            throw new Error;
        }
    } catch(e){
        res.status(404).send(['No se encontraron recetas'])
    }
})



router.get('/types', async function (req, res){
    try{
        const types = await Diets.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });
        if(types.length<1){ 
            return res.status(400).send('No se encontraron tipos de recetas')}
        res.json(types);
    }catch(error){
        console.log('e:', error)
        res.status(404).send('No se encontraron tipos de recetas')}
})

router.post('/recipe', async function (req, res){
    try{
        const {title, summary, spoonacularScore, healthScore, instructions, dietas, image} = req.body;
        var nuevaReceta = await Receta.create({
            title,
            summary,
            spoonacularScore,
            healthScore,
            instructions,
            image
        });
        const dietas1 = await Diets.findAll({
            where: { id: dietas }
        })
        await nuevaReceta.setDiets(dietas1);
        
        return res.json(nuevaReceta);
    }catch(error){
        console.log('e:', error)
        res.status(404).send('No se creo la receta')}
})


module.exports = router;
