module.exports = function (app, db) {
  app.get('/companies', (req, res) => {
    db.collection('companies').find().project({infoPageData: 0, chartStats: 0} ).toArray((err, result) => {
      if (err) {
        res.send({
          'error': 'An error has occurred'
        });
      } else {
        res.send(result);
      }
    });
  });

  app.post('/company', (req, res) => {
    const company = {
      id: +req.body.id,
      name: req.body.name,
      logo: req.body.logo,
      weight: +req.body.weight,
      price: +req.body.price,
      infoPageData: req.body.infoPageData,
      chartStats: req.body.chartStats
    };

    db.collection('companies').insert(company, (err, result) => {
      if (err) {
        res.send({
          'error': 'An error has occurred'
        });
      } else {
        res.send(result.ops[0]);
      }
    });
  });

  app.get('/company/:id', (req, res) => {
    const id = {
      'id': +req.params.id
    };
    db.collection('companies').findOne(id, (err, item) => {
      if (err) {
        res.send({
          'error': 'An error has occurred'
        });
      } else {
        res.send(item);
      }
    });
  });

  app.delete('/company/:id', (req, res) => {
    const id = {
      'id': +req.params.id
    }
    db.collection('companies').remove(id, (err, item) => {
      if (err) {
        res.send({
          'error': 'An error has occurred'
        });
      } else {
        res.send(item);
      }
    });
  });

  app.put('/company/:id', (req, res) => {
    const id = {
      'id': +req.params.id
    };
    const company = {
      id: +req.body.id,
      name: req.body.name,
      logo: req.body.logo,
      weight: +req.body.weight,
      price: +req.body.price,
      infoPageData: req.body.infoPageData,
      chartStats: req.body.chartStats
    };
    db.collection('companies').update(id, company, (err, result) => {
      if (err) {
        res.send({
          'error': 'An error has occurred'
        });
      } else {
        res.send(company);
      }
    });
  });
};