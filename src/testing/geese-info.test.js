describe('File Upload Routes', () => {
  describe('POST /api/upload', () => {
    it('should return a url to the image uploaded', async () => {
      chai
        .request(app)
        .post('/api/upload',)
        .set('Content-Type', 'multipart/form-data')
        .attach('files', fs.readFileSync('/waterloop/src/tests/files/test.png'), 'test.png')
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body).to.have.keys(['message', 'data']);
          expect(res.body.data).to.have.lengthOf(1);
          expect(res.body.data[0]).to.deep.equal(`/waterloop/tmp/test.png`);
        });
    });
  })
})
