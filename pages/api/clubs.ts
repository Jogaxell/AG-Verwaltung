import { unstable_getServerSession } from "next-auth/next"

import { authOptions } from '/pages/api/auth/[...nextauth]'

export default async (req: Request, res: Response) => {
    if(req.method === "POST") {
        const session = await unstable_getServerSession(req, res, authOptions)
        //TODO: look if user actualy has permissions to edit/create club
        if (!session) {
            // @ts-ignore
            res.status(401).json({ message: "You must be logged in." });
            return;
        }

        // @ts-ignore
        return res.status(200).json({
            message: 'Success',
        })
    }else {
        // @ts-ignore
        res.status(405).send("Method not allowed");
    }
}