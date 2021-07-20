process.env.NODE_ENV = 'test';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import { db } from '../../db';

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();

describe('Geese Info Routes', () => {
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

  describe('GET /api/geese-info/:id', () => {
    it('should return a goose pod with specific ID when called', done => {
      chai
        .request(app)
        .get('/api/geese-info/2')
        .end((err, res) => {
          if (res.error.text) {
            console.error(res.error.text);
          }
          res.should.have.status(200);
          expect(res.body).to.have.keys(['id', 'name', 'description', 'updatedAt']);
          done();
        })
    });
    it('should return 404 for a non-existent pod when called', done => {
      chai
        .request(app)
        .get('/api/geese-info/9001')
        .end((err, res) => {
          res.should.have.status(404);
          done();
        })
    });
  });

  describe('GET /api/geese-info/images/:id', () => {
    it('should return a list of images for a goose pod when called', done => {
      chai
        .request(app)
        .get('/api/geese-info/images/1')
        .end((err, res) => {
          if (res.error.text) {
            console.error(res.error.text);
          }
          res.should.have.status(200);
          res.body.forEach(element => {
            expect(element).to.have.keys(['id', 'gooseId', 'imgDir'])
          });
          done();
        })
    });
    it('should return 404 for a non-existent pod or a pod with no images when called', done => {
      chai
        .request(app)
        .get('/api/geese-info/images/9001')
        .end((err, res) => {
          res.should.have.status(404);
          done();
        })
    });
  });

  describe('POST /api/geese-info/', () => {
    it('should add a goose pod to the db with a well formed input', done => {
      chai.request(app)
        .post('/api/geese-info/')
        .send({
          name: 'Goose X',
          description: "The up and coming Goose X available Feb 30, 2999",
          updatedAt: 1609518840000,
        })
        .end((err, res) => {
          if (res.error.text) {
            console.error(res.error.text);
          }
          res.should.have.status(200);
          expect(res.body).to.have.length(1)
          chai.request(app)
            .get(`/api/geese-info/${res.body[0]}`)
            .end((err, res) => {
              if (res.error.text) {
                console.error(res.error.text);
              }
              res.should.have.status(200);
              expect(res.body).to.have.property('id')
              expect(res.body).to.have.property('description', 'The up and coming Goose X available Feb 30, 2999')
              expect(res.body).to.have.property('name', 'Goose X')
              expect(res.body).to.have.property('updatedAt')
              done();
            })
        });
    });

    it('should return 400 with no input supplied', done => {
      chai.request(app)
        .post('/api/geese-info/')
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it('should return 400 with some required inputs not provided', done => {
      chai.request(app)
        .post('/api/geese-info/')
        .send({
          name: 'Tesla Inc.'
        })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });

  describe('POST /api/geese-info/images', () => {
    it('should add geese pod images to the db with a well formed input', done => {
      chai.request(app)
        .post('/api/geese-info/images')
        .send([
          {
            gooseId: 1,
            imgDir: "fungoose.jpg"
          },
          {
            gooseId: 1,
            imgDir: "funnygeese.gif"
          },
          {
            gooseId: 2,
            imgDir: "0.jpg"
          }
        ])
        .end((err, res) => {
          if (res.error.text) {
            console.error(res.error.text);
          }
          res.should.have.status(200);
          chai.request(app)
            .get('/api/geese-info/images/1')
            .end((err, res) => {
              if (res.error.text) {
                console.error(res.error.text);
              }
              res.should.have.status(200);
              expect(res.body).to.deep.include.members([
                {
                  id: 5,
                  gooseId: 1,
                  imgDir: "fungoose.jpg"
                },
                {
                  id: 6,
                  gooseId: 1,
                  imgDir: "funnygeese.gif"
                }
              ]);
              // TODO: Refactor this and other code similar to it so that callbacks aren't nested.
              chai.request(app)
                .get('/api/geese-info/images/2')
                .end((err, res) => {
                  if (res.error.text) {
                    console.error(res.error.text);
                  }
                  res.should.have.status(200);
                  expect(res.body).to.include.deep.members([
                    {
                      id: 7,
                      gooseId: 2,
                      imgDir: "0.jpg"
                    }
                  ])
                  done();
                });
            })
        });
    });

    it('should return 400 with no input supplied', done => {
      chai.request(app)
        .post('/api/geese-info/images')
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it('should return 400 with malformed inputs provided', done => {
      chai.request(app)
        .post('/api/geese-info/images')
        .send({
          gooseId: 1,
          imgDir: "0.jpg",
          somethingExtra: "sd"
        },
        {
          gooseId: 5,
          imgDir: "0.jpg"
        })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });

  describe('PATCH /api/geese-info/:id', () => {
    it('should update the entry with "id" to match the new body', done => {
      chai.request(app)
        .patch('/api/geese-info/1')
        .send({
          name: 'Goose MMXXI',
          updatedAt: 2147483647000
        })
        .end((err, res) => {
          if (res.error.text) {
            console.error(res.error.text);
          }
          res.should.have.status(200);
          chai.request(app)
            .get('/api/geese-info/1')
            .end((err2, res2) => {
              if (res2.error.text) {
                console.error(res.error.text);
              }
              res2.should.have.status(200);
              expect(res2.body).to.have.property('id', 1)
              expect(res2.body).to.have.property('name', 'Goose MMXXI')
              expect(res2.body).to.have.property('description')
              expect(res2.body).to.have.property('updatedAt')
              done();
            });
        })
    })

    it('should return 400 if an id is not provided', done => {
      chai.request(app)
        .patch('/api/geese-info/')
        .send({
          name: 'Goose MMXXI',
          description: "henlo",
          updatedAt: 2147483647000
        })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it('should return 400 when body is missing', done => {
      chai.request(app)
        .patch('/api/geese-info/1')
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });

  describe('DELETE /api/geese-info/:id', () => {
    it('should delete a goose info entry with "id" that exists', done => {
      chai.request(app)
        .del('/api/geese-info/1')
        .end((err, res) => {
          if (res.error.text) {
            console.error(res.error.text);
          }
          res.should.have.status(200);
          chai.request(app)
            .get('/api/geese-info/1')
            .end((err2, res2) => {
              if (res2.error.text) {
                console.error(res2.error.text);
              }
              res2.should.have.status(404);
              done();
            });
        });
    });

    it('should return 400 when an id is not provided', done => {
      chai.request(app)
        .del('/api/geese-info/')
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it('should return 404 if the id does not exist', done => {
      chai.request(app)
        .del('/api/geese-info/987654321')
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });

  describe('DELETE /api/geese-info/images/:id', () => {
    it('should delete a goose image entry with "id" that exists', done => {
      chai.request(app)
        .del('/api/geese-info/images/3')
        .end((err, res) => {
          if (res.error.text) {
            console.error(res.error.text);
          }
          res.should.have.status(200);
          chai.request(app)
            .get('/api/geese-info/images/2')
            .end((err2, res2) => {
              if (res2.error.text) {
                console.error(res2.error.text);
              }
              res2.should.have.status(404);
              done();
            });
        });
    });

    it('should return 400 when an id is not provided', done => {
      chai.request(app)
        .del('/api/geese-info/images/')
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it('should return 404 if the id does not exist', done => {
      chai.request(app)
        .del('/api/geese-info/images/987654321')
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
});
