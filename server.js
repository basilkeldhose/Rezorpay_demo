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
app.get('/cart',(req,res)=>{
    res.render('cart')
})

app.post('/api/payment/order', (req, res) => {
    params  = req.body;
    instance.orders.create(params).then((data) => {
        res.send({ "sub": data, "stsatus": "success" })
    }).catch((error) => {
        res.send({ "sub": error, "status": "faild" })
    })
});



app.listen(8000, () => console.log("server connected on the port 8000....!!"))