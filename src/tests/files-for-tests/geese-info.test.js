process.env.NODE_ENV = 'test';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import { db } from '../../db';

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();

describe('Shorter Geese Info Routes', () => {
// Rollback migrations.
  beforeEach('reseed', async function () {
    this.timeout(60 * 1000); // Resetting the DB can take a few seconds
    await db.migrate.rollback();
    await db.migrate.latest();
    return db.seed.run();
  });

  // Rollback migration again.
  afterEach(async function() {
    this.timeout(60 * 1000); // Resetting the DB can take a few seconds
    return db.migrate.rollback();
  });

  describe('GET /api/geese-info/', () => {
    it('should return a list of geese info when called', done => {
      chai
        .request(app)
        .get('/api/geese-info/')
        .end((err, res) => {
          if (res.error.text) {
            console.error(res.error.text);
            done(res.error.text);
          }
          res.should.have.status(200);
          res.body.forEach((item) => {
            expect(item).to.have.keys(['id', 'name', 'description', 'updatedAt'])
          });
          done();
        })
    });
  });

});