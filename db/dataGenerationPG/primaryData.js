const faker = require('faker');

function writeTenMillionProducts(writer, encoding, callback) {
  writer.write('title,description,rating\n', 'utf8');

  let i = 10000000;
  // var i = 10000;
  var data = '';
  var title = '';
  var description = '';
  var rating = 0;

  write();
  function write() {
    let ok = true;
    do {
      i--;
      title = faker.commerce.productName();
      description = faker.lorem.paragraph();
      rating = Math.random() * 5;
      data = title + "," + description + "," + rating.toFixed(2) +"\n"
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

module.exports = writeTenMillionProducts