const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


export default async function handle(req, res) {
    try{
        const { data: productList = [] } = await stripe.products.list({});
        const { data: priceList = [] } = await stripe.prices.list({});

        const idToPrice = {

        };

        priceList.forEach((item) => {
            const { id, unit_amount = 0 } = item;
            idToPrice[id] = unit_amount / 100.0;
        });
        productList.forEach((item) => {
            item.price = idToPrice[item.default_price] || 0;
        });

        return res.json({ productList });
    } catch(err: any){
        console.log(err.message);
        res.status(500).send("Server Error");
    }
}
