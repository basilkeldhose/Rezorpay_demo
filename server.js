const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const path = require('path')
const Razorpay=require("razorpay")

let instance = new Razorpay({
    key_id: "rzp_test_ItPFd7jw0ooxNL",
    key_secret: "LjueYxQO2kh1mmvfXx7zzM6J"
})


const app = express();

app.use(bodyparser());
app.use(cors());

app.use(express.static('pulic'))
app.use('/image',express.static(__dirname + 'public/image'))

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    res.render('index')
})
app.get('/payment',(req,res)=>{
    res.render('payment')
})

app.post('/api/payment/order', (req, res) => {
    params  = req.body;
    instance.orders.create(params).then((data) => {
        res.send({ "sub": data, "stsatus": "success" })
    }).catch((error) => {
        res.send({ "sub": error, "status": "faild" })
    })
});


app.post("/api/payment/verify",(req,res)=>{
    body=req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
    var crypto = require("crypto");
    var expectedSignature = crypto.createHmac('sha256', 'LjueYxQO2kh1mmvfXx7zzM6J')
                                    .update(body.toString())
                                    .digest('hex');
                                    console.log("sig"+req.body.razorpay_signature);
                                    console.log("sig"+expectedSignature);
    var response = {"status":"failure"}
    if(expectedSignature === req.body.razorpay_signature)
     response={"status":"success"}
        res.send(response);
    });

app.listen(8000, () => console.log("server connected on the port 8000....!!"))