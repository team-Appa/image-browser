const fs = require('fs');
const csv = require('fast-csv');
const faker = require('faker');

const writeProducts = fs.createWriteStream('products.csv');

function writeTenMillionTimes(writer, encoding, callback) {
  let i = 10;
  let id = 0;
  let data = '';
  let numOfVariations = 0;
  write();

  function write() {
    let ok = true;
    do {
      i--;
      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
        numOfVariations = Math.ceil((Math.random() * 4));
        data = JSON.stringify( generateEntry(numOfVariations, id++) ) +'\n\n';
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
}

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

writeTenMillionTimes(writeProducts, 'utf8', () => writeProducts.end() )