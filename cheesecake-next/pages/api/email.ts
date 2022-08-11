
export default async function handle(req, res) {
    try{
        const { 
            email,
            products,
        } = JSON.parse(req.body);
        // send email to user 
        // send email to business
        return res.json(true);
    } catch(err: any){
        console.log(err.message);
        res.status(500).send("Server Error");
    }
}
