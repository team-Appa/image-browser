##Postgres - query results

###products - 10 million records

SELECT * FROM products WHERE id = 10000000;
Time: 1.517 ms

SELECT * FROM products WHERE id = 9500000;
Time: 0.496 ms

SELECT * FROM products WHERE id = 9100000;
Time: 4.807 ms

###images - 25 million records

select * from products INNER JOIN images ON products.id = images."productId" where products.id =10000000;
Time: 0.801 ms

select * from products INNER JOIN images ON products.id = images."productId" where products.id =9500000;
Time: 4.621 ms

select * from products INNER JOIN images ON products.id = images."productId" where products.id =9000000;
Time: 4.165 ms

##Cassandra - query results

###products - 10 million records

select * from products Where id = 10000000;
Time: 22.385 ms

select * from products Where id = 9500000;
Time: 25.797 ms

select * from products Where id = 9000000;
Time: 1.883 ms

###images - 25 million records

select * from images Where productid = 10000000;
Time: 1.654 ms

select * from images Where productid = 9500000;
Time: 3.908 ms

select * from images Where productid = 9000000;
Time: 4.424 ms