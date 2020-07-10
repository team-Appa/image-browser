const fs = require('fs');
const primary = require('./primaryData.js')
const secondary = require('./secondaryData.js')

const writeProducts = fs.createWriteStream(__dirname + '/data/products.csv');
const writeImages = fs.createWriteStream(__dirname + '/data/variations.csv');

( async ()=>{
  await primary(writeProducts, 'utf8', () => writeProducts.end() )
  await secondary(writeImages, 'utf8', () => writeImages.end() )
})()












// const fs = require('fs');
// const csv = require('fast-csv');
// const faker = require('faker');

// const writeProducts = fs.createWriteStream('products.csv');

// function writeTenMillionProducts(writer, encoding, callback) {
//   let i = 100000;
//   let data = '';
//   var title = '';
//   var description = '';
//   var rating = 0;

//   write();
//   function write() {
//     let ok = true;
//     do {
//       i--;
//       if (i === 0) {
//         writer.write(data, encoding, callback);
//       } else {
//         title = faker.commerce.productName();
//         description = faker.lorem.paragraph();
//         rating = Math.random() * 5;
//         data = title + "," + description + "," + rating + "\n"
//         ok = writer.write(data, encoding);
//       }
//     } while (i > 0 && ok);
//     if (i > 0) {
//       writer.once('drain', write);
//     }
//   }
// }

// writeTenMillionProducts(writeProducts, 'utf8', () => writeProducts.end() )