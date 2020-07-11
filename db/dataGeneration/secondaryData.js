const faker = require('faker');

function writeTenMillionImages(writer, encoding, callback) {
  writer.write('productId,cost,color,image\n', 'utf8');

  // let i = 10000000;
  let i = 4000000;
  let count = 0
  let data = '';
  var cost = 0;
  var color = '';
  var image = '';
  var productID = ''
  var numOfVariations = 0;

  write();
  function write() {
    let ok = true;
    do {
      i--;
      count++;
      data = '';
      numOfVariations = Math.ceil((Math.random() * 4));
      for (let j = 0; j < numOfVariations; j ++){
        productID = count;
        cost = faker.commerce.price();
        color = faker.commerce.color();
        image = createImage()
        data += productID + ","+ cost + "," + color + "," + image + "\n"
      }
      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
}

var createImage = function() {
  var url = 'http://picsum.photos/seed/'
  var urlend='/846/1038'
  var randomNumber = Math.floor(Math.random() * 1000);
  return url+randomNumber+urlend;
}

module.exports = writeTenMillionImages