const faker = require('faker');

function writeTenMillionProducts(writer, encoding, callback) {
  writer.write('id,title,description,rating\n', 'utf8');

  let i = 10000000;
  // var i = 1000;
  var id = 0
  var data = '';
  var title = '';
  var description = '';
  var rating = 0;

  write();
  function write() {
    let ok = true;
    do {
      i--;
      id++
      title = faker.commerce.productName();
      description = faker.lorem.paragraph();
      rating = Math.random() * 5;
      data = id + "," + title + "," + description + "," + rating.toFixed(2) +"\n"
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