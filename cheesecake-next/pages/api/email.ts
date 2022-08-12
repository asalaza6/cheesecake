import nodemailer from 'nodemailer';

export default async function handle(req, res) {
    try{
        const { 
            email,
            products,
        } = JSON.parse(req.body);

        const transport = nodemailer.createTransport({
            host: 'smtp.mailtrap.io',
            port: 2525,
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASS,
            }
        });

        const businessEmail = 'asalazar9949@gmail.com';

        const mailOptions = {
            from: `The Cheesecake Connect <${businessEmail}>`,
            to: `${businessEmail}, ${email}`,
            subject: 'Cheesecake test',
            text: JSON.stringify(products),
            html: JSON.stringify(products),
        };
        
        transport.sendMail(mailOptions, (error, info) => {
            if (error) {
                throw error;
            }
            return res.json(info);
        })

        // send email to user 
        // send email to business
        return res.json(true);
    } catch(err: any){
        console.log(err.message);
        res.status(500).send("Server Error");
    }
}
