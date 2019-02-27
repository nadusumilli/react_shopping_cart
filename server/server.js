const fs = require("fs");
const path = require("path");
// const jwt = require("jsonwebtoken");
const jsonServer = require("json-server");
const middlewares = jsonServer.defaults();

const server = jsonServer.create();
const router = jsonServer.router("./server/db.json");
server.use(middlewares);

// database files
const generaldb = JSON.parse(fs.readFileSync("./server/db.json", "UTF-8"));
// const userdb = JSON.parse(fs.readFileSync("./users.json", "UTF-8"));

// Get all cart items
server.get("/cart", (req, res) => {
    res.jsonp(generaldb.cart);
});

server.use(jsonServer.bodyParser);
// Post items to cart.
server.post("/cart", (req, res) => {
    try {
        const item = req.body;
        let itemIndx = generaldb.cart.items.findIndex(
            Fitem => Fitem.id === item.id
        );
        if (itemIndx >= 0) {
            generaldb.cart.items[itemIndx].quantity += 1;
        } else {
            generaldb.cart.items.push(item);
        }
        generaldb.cart.total_quantity += 1;
        generaldb.cart.total_price += item.price;
        fs.writeFileSync("./server/db.json", JSON.stringify(generaldb));
    } catch (e) {
        console.log(e);
    }
    res.jsonp(generaldb.cart);
});

// update and delete items from the cart.
server.put("/cart", (req, res) => {
    const { item, remove } = req.body;
    try {
        if (!remove) {
            let itemIndx = generaldb.cart.items.findIndex(
                Fitem => Fitem.id === item.id
            );
            if (itemIndx >= 0) {
                generaldb.cart.items[itemIndx].quantity += 1;
                generaldb.cart.total_quantity += 1;
                generaldb.cart.total_price += item.price;
            }
        } else {
            let itemIndx = generaldb.cart.items.findIndex(
                Fitem => Fitem.id === item.id
            );
            if (itemIndx >= 0) {
                if (generaldb.cart.items[itemIndx].quantity <= 1) {
                    generaldb.cart.items.splice(itemIndx, 1);
                } else {
                    generaldb.cart.items[itemIndx].quantity -= 1;
                }
                generaldb.cart.total_quantity -= 1;
                generaldb.cart.total_price -= item.price;
            }
        }
        fs.writeFileSync("./server/db.json", JSON.stringify(generaldb));
    } catch (e) {
        console.log(e);
    }
    res.jsonp(generaldb.cart);
});

server.delete("/cart", (req, res) => {
    try {
        resetCart();
    } catch (e) {
        console.log(e);
    }
    res.jsonp(generaldb.cart);
});

server.use(router);
server.listen(3000, () => {
    console.log("Server running on port 3000");
});

function resetCart() {
    generaldb.cart = {
        items: [],
        total_price: 0,
        checkout: false,
        total_quantity: 0
    };
    fs.writeFileSync("./server/db.json", JSON.stringify(generaldb));
}

// // Auth sercrets
//// const SECRET_KEY = "123456789";
//// const expiresIn = "1h";
// // To handle POST, PUT and PATCH you need to use a body-parser
// // You can use the one used by JSON Server
// // server.use(jsonServer.bodyParser);
// // server.post("/auth/login", (req, res) => {
// //     const { email, password } = req.body;
// //     if (!isAuthenticated({ email, password })) {
// //         const status = 401;
// //         const message = "Incorrect email or password";
// //         res.status(status).json({ status, message });
// //         return;
// //     }
// //     const access_token = createToken({ email, password });
// //     res.status(200).json({ access_token });
// // });

// // server.use(/^(?!\/auth).*$/, (req, res, next) => {
// //     if (
// //         req.headers.authorization === undefined ||
// //         req.headers.authorization.split(" ")[0] !== "Bearer"
// //     ) {
// //         const status = 401;
// //         const message = "Error in authorization format";
// //         res.status(status).json({ status, message });
// //         return;
// //     }
// //     try {
// //         verifyToken(req.headers.authorization.split(" ")[1]);
// //         next();
// //     } catch (err) {
// //         const status = 401;
// //         const message = "Error access_token is revoked";
// //         res.status(status).json({ status, message });
// //     }
// // });

// // Util functions for the server.
// // Create a token from a payload
//// function createToken(payload) {
////     return jwt.sign(payload, SECRET_KEY, { expiresIn });
//// }

// // Verify the token
//// function verifyToken(token) {
////     return jwt.verify(token, SECRET_KEY, (err, decode) =>
////         decode !== undefined ? decode : err
////     );
//// }

// // Check if the user exists in database
//// function isAuthenticated({ email, password }) {
////     return (
////         userdb.users.findIndex(
////             user => user.email === email && user.password === password
////         ) !== -1
////     );
//// }
