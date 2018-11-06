module.exports = {
  async register(req, res) {
    const { username, password } = req.body;

    req.app
      .get('db')
      .duplicateuser([username])
      .then(duplicateUser => {
        if (duplicateUser[0]) {
          res.status(401).send();
        } else {
          req.app
            .get('db')
            .registerUser([username, password])
            .then(() => {
              req.app
                .get('db')
                .login([username, password])
                .then(user => {
                  req.session.user = user[0];
                  res.status(200).send(req.session.user);
                });
            });
        }
      });
  },

  login(req, res) {
    const { username, password } = req.body;
    req.app
      .get('db')
      .login([username, password])
      .then(user => {
        if (user[0]) {
          req.session.user = user[0];
          res.status(200).send(req.session.user);
        } else {
          res.status(401).send();
        }
      });
  },

  getAllHouses(req, res) {
    req.app
      .get('db')
      .getAllHouses()
      .then(houses => res.status(200).send(houses));
  },

  favorite(req, res) {
    const { id: paramsId } = req.params;
    const { user } = req.session;
    const DB = req.app.get('db');
    if (user) {
      DB.checkDuplicateFavorite([user.id, paramsId]).then(matches => {
        if (matches[0]) {
          DB.deleteFavorite([user.id, paramsId]).then(() => {
            DB.getUsersFavorites([users.id]).then(favorites => {
              res.send(favorites);
            });
          });
        } else {
          DB.addFavorite([user.id, paramsId]).then(() => {
            DB.getUsersFavorites([user.id]).then(favorites => {
              res.send(favorites);
            });
          });
        }
      });
    } else {
      res.send([]);
    }
  },

  async getFavoritesId(req, res) {
    if (req.session.user) {
      req.app
        .get('bd')
        .getUsersFavorites([req.session.user.id])
        .then(favorites => {
          res.send(favorites);
        });
    } else {
      res.send([]);
    }
  },

  unfavorite(req, res) {
    const DB = req.app.get('db');
    if (req.session.user) {
      DB.deleteFavorite([req.session.user.id, req.params.id]).then(() => {
        DB.getUsersFavorites([req.session.user.id]).then(favorites => {
          res.send(favorites);
        });
      });
    } else {
      res.send([]);
    }
  },

  getHouse(req, res) {
    const DB = req.app.get('db');
    DB.getHouse(req.params.id).then(house => {
      if (house[0]) {
        DB.getImages(req.params.id).then(images => {
          house[0].image = images;
          res.send(house[0]);
        });
      } else {
        res.status(404).send();
      }
    });
  },

  addHouse(req, res) {
    const DB = req.app.get('db');
    const userId = req.session.user.i;
    const {
      title,
      desc,
      address,
      city,
      state,
      zip,
      images,
      loanAmount,
      monthlyMortgage,
      recomendedRent,
      desiredRent,
    } = req.body;
    DB.createListing([
      images[0],
      title,
      loanAmount,
      desc,
      desiredRent,
      address,
      zip,
      city,
      state,
      recomendedRent,
      monthlyMortgage,
      userId,
    ]).then(house => {
      images.forEach(img => {
        DB.addImage(house.id, img.url);
      });
      res.send();
    });
  },

  getListed(req, res) {
    const DB = req.app.get('db');
    if (req.session.user) {
      DB.getListed(req.session.user.id).then(listed => {
        res.status(200).send(listed);
      });
    } else {
      res.status(200).send([]);
    }
    res.send(200);
  },

  updateHouse(req, res) {
    const DB = req.app.get('db');
    const {
      loan,
      title,
      description,
      desired_rent,
      address,
      zip,
      city,
      state,
      recomended_rent,
      mortgage,
      id,
    } = req.body;
    DB.updateHouse([
      loan,
      title,
      description,
      desired_rent,
      address,
      zip,
      city,
      state,
      recomended_rent,
      mortgage,
      id,
    ]).then(() => {
      res.status(200).send();
    });
  },

  delete(req, res) {
    const DB = req.app.get('db');
    const { id } = req.params;
    if (req.session.user) {
      DB.deleteImages(id);
      DB.deleteHouse([id, req.session.user.id]);
      res.status(200).send();
    } else {
      res.status(401).send();
    }
  },

  logout(req, res) {
    req.session.destroy();
    res.status(200).send();
  },
};
