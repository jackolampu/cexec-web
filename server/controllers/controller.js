require('../models/db');
//const Category = require('../models/Category');
//const Recipe = require('../models/Recipe');

/**
 * GET /
 * Homepage 
*/
exports.homepage = async(req, res) => {
    try {
     
      res.render('home', { title: 'Cexec Cofee - Home'/*, categories, food */} );
    } catch (error) {
      res.status(500).send({message: error.message || "Error Occured" });
    }
  }