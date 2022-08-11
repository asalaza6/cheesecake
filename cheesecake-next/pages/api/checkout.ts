const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);




export default async function handle(req, res) {
    try{
        const { 
            line_items,
            metadata,
        } = JSON.parse(req.body);
        const session = await stripe.checkout.sessions.create({
          line_items,
          mode: 'payment',
          success_url: `${process.env.DOMAIN_URL}/buy?success=true`,
          cancel_url: `${process.env.DOMAIN_URL}/buy?canceled=true`,
          metadata,
        });
        return res.json(session.url);
    } catch(err: any){
        console.log(err.message);
        res.status(500).send("Server Error");
    }
}
