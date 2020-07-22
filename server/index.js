require('newrelic');
const { QueryTypes } = require('sequelize');
var cluster = require('cluster');
const express = require('express');
const cors = require('cors')
const path = require('path');
const connection = require('./connectionWithSequelize.js')
const redis = require('redis');
const morgan = require('morgan');

// if (cluster.isMaster) {
//   var numWorkers = require('os').cpus().length;

//   console.log('Master cluster setting up ' + numWorkers + ' workers...');

//   for(var i = 0; i < numWorkers; i++) {
//     cluster.fork();
//   }

//   cluster.on('online', function(worker) {
//     console.log('Worker ' + worker.process.pid + ' is online');
//   });

//   cluster.on('exit', function(worker, code, signal) {
//     console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
//     console.log('Starting a new worker');
//     cluster.fork();
//   });

// } else {

  // const REDIS_PORT = process.env.PORT || 6379;
  // const client = redis.createClient(REDIS_PORT);
  const app = express();
  const port = 3001;

  app.use(cors());
  // app.use(morgan('dev'));

  //cache middleware
  function cache(req,res, next){
    let id = req.query.id
    client.get(id,(err, data)=>{
      if (err) throw err;
      if (data !== null){
        // console.log("called cache")
        res.send(data)
      } else{
        // console.log("called get")
        get(req, res)
      }
    })
  }

  app.use(express.json())
  app.use(express.static(path.join(__dirname, '/../dist')))
  app.get('/api/products', (req,res)=>{
  // const get = (req, res) => {
    const id = req.query.id;
    // connection.connection.query(`select * from products INNER JOIN images ON products.id = images."productId" where products.id =${id}`, { type: QueryTypes.SELECT })
    // connection.connection.query(`select * from products where products.id = ${id}`, { type: QueryTypes.SELECT })
    connection.ProductsModel.findAll({
      where: { id : id },
      include:[{
        model: connection.ImagesModel, as: 'variations'
      }]
    })
    .then((product) => {
      let update = []
      for (let i = 0; i < product[0].dataValues.variations.length; i++){
        let tmp = product[0].dataValues.variations[i].image
        update.push( { "src": tmp })
        product[0].dataValues.variations[i].dataValues.images = update
      }
      // client.set(id.toString(), JSON.stringify(product));
      res.status(200).send(product)
    })
    .catch((err)=>{
      res.status(404).send(err)
    })
  })

  app.post('/api/products', (req, res) => {
    let data = filterBody(req);
    connection.ProductsModel.create(data)
      .then((product)=>{
        res.status(200).send(product)
      })
      .catch((err)=>{
        res.status(400).send(err)
      })
    });

    app.put('/api/products', (req, res) => {
      const id = req.query.id;
      let data = filterBody(req);
      const filter = { id: id };
      connection.ProductsModel.update(data,{
        where: filter
      })
      .then((product) => {
        res.status(200).send(product);
      })
      .catch((error)=>{
        res.status(404).send('put error')
      })
    });

    app.delete('/api/products', (req, res) => {
      const id = req.query.id;
      const filter = { id: id };
      connection.ProductsModel.destory({
        where: filter
      })
      .then((product) => {
        res.status(200).send(product);
      })
      .catch((error)=>{
        res.status(404).send('delete error')
      })
    });


    const filterBody = (req) =>{
      return {
        title: req.body.title,
        description: req.body.description,
        rating: req.body.rating
      };
    }

  var server = app.listen(port, () => {console.log(`Listening at http://localhost:${port}`)});

  module.exports = server;

// }