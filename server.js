const express = require('express');
var cors = require('cors');
const stripe = require('stripe')('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');

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.post("/checkout", async (req, res) => {
    console.log(req.body);
    const items = req.body.items;
    let lineItems = [];
    items.forEach((item)=> {
        lineItems.push(
            {
                price: item.id,
                quantity: item.quantity
            }
        )
    });

    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        success_url: "http://alien-bikes.com/success",
        cancel_url: "http://alien-bikes.com/cancel"
    });

    res.send(JSON.stringify({
        url: session.url
    }));
});

app.listen(4000, () => console.log("Listening on port 4000!"));