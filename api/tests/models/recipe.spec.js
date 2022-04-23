const { Receta, Diets, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Recipe model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Receta.sync({ force: true }));
    describe('Recipe name', () => {
      it('should throw an error if recipe name is null', (done) => {
        Receta.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Receta.create({ title: 'Milanesa a la napolitana' });
      });
    });
    describe('SpoonacularScore', () => {
      it('SpoonacularScore should be a number', (done) => {
        Receta.create({ title: 'Milanesa a la napolitana', spoonacularScore: 'asd' })
          .then(() => done(new Error('It requires a valid spoonacularScore')))
          .catch(() => done());
      });
      it('SpoonacularScore should be a number between 0 and 100', () => {
        Receta.create({ title: 'Milanesa a la napolitana', spoonacularScore: 150 });
      });
    });
  });
});
