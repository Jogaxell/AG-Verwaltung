import {unstable_getServerSession} from "next-auth/next"

import {NextApiRequest, NextApiResponse} from "next";

// @ts-ignore
import {authOptions} from '/pages/api/auth/[...nextauth]'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        if (!req.body) {
            res.status(400).send({
                success: false,
                error: {message: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.'}
            })
            return
        }
        //TODO: handle editing with id

        const session = await unstable_getServerSession(req, res, authOptions)

        //TODO: look if user actually has permissions to edit/create club
        if (!session) {
            res.status(401).json({message: "You must be logged in."});
            return;
        }


        let {titel, description, grade, date, lesson, room, teacher, talentPromotion, active} = req.body
        if (!titel || !description || !grade || !date || !lesson || !room || !teacher || talentPromotion == undefined || active == undefined) {
            res.status(400).send({success: false, error: {message: 'Nicht alle Felder wurden ausgefüllt.'}})
            return
        }
        teacher = teacher.split(",").map((t: string) => t.trim())
        if (teacher.length == 0) {
            res.status(400).send({success: false, error: {message: 'Nicht alle Felder wurden ausgefüllt.'}})
            return
        }
        const Club = require('../../models/club')
        const createdClub = await Club.create({
            name: titel,
            description: description,
            grade: grade,
            date: date,
            lesson: lesson,
            room: room,
            teacher: teacher,
            talentPromotion: talentPromotion,
            active: active
        })

        return res.status(200).json({message: 'Success'})
    } else {
        // @ts-ignore
        res.status(405).send("Method not allowed");
    }
}