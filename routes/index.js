const {Router} = require('express');
const router = Router();
const stripe = require('stripe')('SECRET_KEY');

router.get('/', (req, res) =>{
    res.render('index');
})

router.post('/checkout', async (req, res) => {
    console.log(req.body);
    const customer =  await stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken
    });
    const charge = await stripe.charges.create({
        amount: '3000', //hardcodeado
        currency: 'usd',
        customer: customer.id,
        description: 'Anything'
    });
    console.log(charge.id);
    res.render(''); //caso de exito
})

module.exports = router;