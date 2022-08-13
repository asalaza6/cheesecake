import nodemailer from 'nodemailer';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import { LineItem, ProductTypeName } from '../../util';

const transportSendMailAsync = (transport: any, mailOptions): Promise<{ success: boolean, data: any }> => {
    return new Promise((resolve, reject) => {
        transport.sendMail(mailOptions, (error, info) => {
            if (error) {
                resolve({
                    success: false,
                    data: error,
                });
            } else {
                resolve({
                    success: true,
                    data: info,
                });
            }
        })
    });
}

export default async function handle(req, res) {
    try{
        const { 
            // email,
            products,
            session_id,
        } = JSON.parse(req.body);

        // get email from checkout session
        const session = await stripe.checkout.sessions.retrieve(session_id);

        const {
            customer_email: email,
        } = session;

        const transport = nodemailer.createTransport({
            host: 'smtp.mailtrap.io',
            port: 2525,
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASS,
            }
        });

        const businessEmail = 'asalazar9949@gmail.com';

        const orderedProducts = (products as LineItem[]).filter(item => item.quantity);

        const thanksMessage = 'Thank you for ordering from The Cheesecake Connect!';

        const byeMessage = 'We will fulfill your order very soon. Please contact us for any questions!'

        const summary: string[] = orderedProducts.map((item) => {
            return (
                `${item.quantity} ` +
                `${item.name} - ${item.metadata?.flavors || ProductTypeName[item.metadata?.type]} (${item.priceAmount}$)` +
                ` = ${item.priceAmount*item.quantity}$`
            );
        });
        const totalAmount = orderedProducts.reduce((reducer, reducerItem) => {
            reducer += reducerItem.priceAmount * reducerItem.quantity;
            return reducer;
        }, 0);

        const total = `Total ${totalAmount}$`;

        const text = thanksMessage+'\n' + summary.join('\n') + '\n' + total + '\n' + byeMessage;
        const html = `<p>${thanksMessage}</p>` + 
            `<ul>${summary.map((item)=>`<li>${item}</li>`).join()}</ul>` +
            `<p>${total}</p>` + 
            '<br/>' +
            `<p>${byeMessage}</p>`;

        const mailOptions = {
            from: `The Cheesecake Connect <${businessEmail}>`,
            to: `${businessEmail}, ${email}`,
            subject: 'Cheesecake test',
            text,
            html,
        };
        const emailRes = await transportSendMailAsync(transport, mailOptions);
        res.json(emailRes);

        // send email to user 
        // send email to business
        // return res.json(true);
    } catch(err: any){
        console.log(err.message);
        res.status(500).send("Server Error");
    }
}
