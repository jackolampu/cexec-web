require('../models/db');
//const Category = require('../models/Category');
const Menu = require('../models/menu');

/**
 * GET /
 * Homepage 
*/
exports.homepage = async(req, res) => {
    try {
      
      const menu = await Menu.find({});
      
      res.render('home' , { title: 'Cexec Cofee - Home', menu } );
    } catch (error) {
      res.status(500).send({message: error.message || "Error Occured" });
    }
  }