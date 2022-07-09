import { unstable_getServerSession } from "next-auth/next"

import { NextApiResponse, NextApiRequest } from "next";

// @ts-ignore
import { authOptions } from '/pages/api/auth/[...nextauth]'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method === "POST") {
        if(!req.body) {
            res.status(400).send({success: false, error: {message: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.'}})
            return
        }

        //TODO: handle editing with id

        const { titel, description, grade, date, lesson, room, teacher, talentPromotion, active } = req.body

        console.log(req.body)

        res.status(404).send({success: true, error: {message: 'Es hat Funktioniert!'}})
        return

        // Optional logging to see the responses
        // in the command line where next.js app is running.

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
            data: {
            }
        })
    }else {
        // @ts-ignore
        res.status(405).send("Method not allowed");
    }
}