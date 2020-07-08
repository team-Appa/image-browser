const express = require('express');
const cors = require('cors')
const morgan = require('morgan');
const path = require('path');
const app = express();
const Product = require('../db/model.js')
const faker = require('faker');

const port = 3001;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json())
app.use(express.static(path.join(__dirname, '/../dist')))

app.get('/api/products', (req, res) => {
  const id = req.query.id;
  Product.find({id: id})
    .then((product) => {
      res.status(200).send(product);
    })
    .catch((error)=>{
      res.status(404).send('get error')
    })
});

app.post('/api/products', (req, res) => {
  const body = req.body;
  Product.count({})
    .then((result)=>{
      body.id = result + 1;
      Product.create([body])
      .then((product) => {
        res.status(201).send(product);
      })
      .catch((error)=>{
        res.status(404).send('post error')
      })
    })
    .catch((error)=>{
      res.status(404).send('post error')
    })
  });

  app.put('/api/products', (req, res) => {
    const id = req.query.id;
    const update = req.body;
    const filter = { id: id };
    Product.findOneAndUpdate(filter, update, {
      new: true
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
    Product.findOneAndRemove({id: id})
    .then((product) => {
      res.status(200).send(product);
    })
    .catch((error)=>{
      res.status(404).send('delete error')
    })
  });

  // var numOfVariations = Math.ceil((Math.random() * 4));
  // let data =[]
  // let sampleData = generateEntry(numOfVariations,result+1)
  // data.push(sampleData);


  var generateEntry = function(numOfVariations, newId) {

    var randomTitle = faker.commerce.productName();
    var randomDescription = faker.lorem.paragraph();
    var randomRating = Math.random() * 5;
    var variations = [];
  var imageCount = 1;

  for (var i = 0; i < numOfVariations; i++) {
    var randomColor = faker.commerce.color(); // Fender Stratocaster
    var randomCost = faker.commerce.price(); // 492.00
    var numOfImages = Math.ceil((Math.random() * 5));
    var randomImages = [] // 4 random image urls

    var createImage = function() {
      var url = 'http://picsum.photos/seed/'
      var urlend='/846/1038'
      var randomNumber = Math.floor(Math.random() * 1000);
      return url+randomNumber+urlend;
    }

    for (var j = 0; j < numOfImages; j++) {
      //var source = "https://picsum.photos/846/1038?random=" + imageCount;
      var source = createImage();
      randomImages.push({src: source})
      imageCount++;
    }

    var variation = {
      color: randomColor,
      cost: randomCost,
      images: randomImages
    }
    variations.push(variation);
  }

  var entry = {
    id: newId,
    title: randomTitle,
    description: randomDescription,
    rating: randomRating.toFixed(2),
    variations : variations
  }
  return entry;
}


var server = app.listen(port, () => {console.log(`Listening at http://localhost:${port}`)});

module.exports = server;