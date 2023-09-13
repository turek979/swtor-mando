const mysql = require('mysql');
const http = require('http');
const fs = require('fs');

// Create a MySQL connection
const connection = mysql.createConnection({
    host: 'https://auth-db446.hstgr.io/index.php',
    user: 'u856024603_turek979',
    password: '@BFlm[1yZ',
    database: 'u856024603_SWTOR_Mando'
});

// Connect to the database
connection.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Create an HTTP server
const server = http.createServer((req, res) => {
    // Check for the request URL
    if (req.url === '/') {
        // Query to fetch product data from the database
        const query = 'SELECT Name, CM_Price, Source FROM Armors';

        // Execute the query
        connection.query(query, (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
                return;
            }

            // Create an array to store product data
            const products = results;

            // Create an HTML string to display the product list
            const productListHTML = products.map(product => {
                return `<li>${product.Name} - $${product.CM_Price}</li>`;
            }).join('');

            // Send the HTML response
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Product List</title>
                </head>
                <body>
                    <h1>Product List</h1>
                    <ul>
                        ${productListHTML}
                    </ul>
                </body>
                </html>
            `);
        });
    } else {
        // Handle other requests
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

// Start the HTTP server
const port = 3000;
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


// document.addEventListener("DOMContentLoaded", function () {
//     const products = [
//         {
//             name: "Product 1",
//             description: "This is the description for Product 1.",
//             price: "$19.99",
//             imageUrl: "product1.jpg",
//         },
//         {
//             name: "Product 2",
//             description: "This is the description for Product 2.",
//             price: "$29.99",
//             imageUrl: "product2.jpg",
//         },
//         {
//             name: "Product 3",
//             description: "This is the description for Product 3.",
//             price: "$39.99",
//             imageUrl: "product3.jpg",
//         },
//         {
//             name: "Product 4",
//             description: "This is the description for Product 4.",
//             price: "$60.99",
//             imageUrl: "product4.jpg",
//         },
//     ];

//     const productContainer = document.getElementById("product-list");

//     products.forEach((product) => {
//         const productItem = document.createElement("div");
//         productItem.classList.add("product");

//         productItem.innerHTML = `
//             <h2>${product.name}</h2>
//             <img src="${product.imageUrl}" alt="${product.name}">
//             <p>${product.description}</p>
//             <p><strong>Price:</strong> ${product.price}</p>
//         `;

//         productContainer.appendChild(productItem);
//     });
// });
