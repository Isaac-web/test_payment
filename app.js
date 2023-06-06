require("dotenv").config();
const express = require("express");
const app = express();
const paystack = require("paystack")(process.env.PAYSTACK_SECRET_KEY);

if (!process.env.PAYSTACK_SECRET_KEY) {
    throw new Error("PAYSTACK_SECRET_KEY is required");
}


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));


app.post("/pay", async (req, res) => {
    paystack.transaction.initialize({
            email: "kanytakiy@gmail.com", 
            amount: 10
    }).then(result => {
        res.send(result.data.authorization_url)
    }).catch(err => {
        res.status(500).send({message: err.message})
    })
});


app.post("/paystack_webhook", (req, res) => {
    const {event, data} = req;

    console.log(event, data)

    res.send("Done")
})


app.post("/paystack_webhook")

app.get("/", (req, res) => {
    res.end("Hello Payment App")
});



const port = 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`))