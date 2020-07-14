const fs = require('fs');
const primary = require('./primaryData.js')
const secondary = require('./secondaryData.js')

const writeProducts = fs.createWriteStream(__dirname + '/data/products.csv');
const writeImages = fs.createWriteStream(__dirname + '/data/variations.csv');

( async ()=>{
  await primary( writeProducts, 'utf8', () => writeProducts.end() )
  await secondary( writeImages, 'utf8', () => writeImages.end() )
})()