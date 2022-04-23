/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Receta, conn } = require('../../src/db.js');

const agent = session(app);
const recipe = {
  title: 'Milanesa a la napolitana',
  summary: 'Carne empanada'
};

describe('Recipe routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Receta.sync({ force: true })
    .then(() => Receta.create(recipe)));
  describe('GET /allapirecipes', () => {
    it('should get 200', () =>
      agent.get('/allapirecipes').expect(200)
    );
  });
  describe('GET /recipesapi/:id', function () {
    it('responde con 404 cuando la página no existe', function() {
      return agent.get('/recipesapi/noexiste')
        .expect(404);
    });
    it('responde con 200 cuando la página existe', function() {
      return agent.get('/recipesapi/123456')
          .expect(200);
      })
    });
    describe('GET /recipesapi?name=xxx', function () {
      it('responde con 404 cuando no encuetra ninguna receta con ese nombre', function() {
        return agent.get('/recipesapi?name=xxxxx')
          .expect(404);
      });
      it('responde con 200 cuando encuentra recetas con ese nombre', function() {
        return agent.get('/recipesapi?name=arroz')
            .expect(200);
        })
      });
});
