import {unstable_getServerSession} from "next-auth/next"

import {NextApiRequest, NextApiResponse} from "next";

// @ts-ignore
import {authOptions} from '/pages/api/auth/[...nextauth]'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        if (!req.body) {
            res.status(400).send({
                success: false,
                message: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.'
            })
            return
        }
        const session = await unstable_getServerSession(req, res, authOptions)

        //TODO: look if user actually has permissions to edit/create club
        if (!session) {
            res.status(401).json({message: "You must be logged in."});
            return;
        }


        let {titel, description, grade, date, lesson, room, teacher, talentPromotion, active} = req.body
        if (!titel || !description || !grade || !date || !lesson || !room || !teacher || talentPromotion == undefined || active == undefined) {
            res.status(400).send({success: false, message: 'Nicht alle Felder wurden ausgefüllt.'})
            return
        }
        teacher = teacher.split(",").map((t: string) => t.trim())
        if (teacher.length == 0) {
            res.status(400).send({success: false, message: 'Nicht alle Felder wurden ausgefüllt.'})
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
    } else if (req.method === "DELETE") {
        const session = await unstable_getServerSession(req, res, authOptions)
        console.log(session)
        //TODO: look if user actually has permissions to delete club
        if (!session) {
            res.status(401).json({message: "You must be logged in."});
            return;
        }
        const {id} = req.body

        const Club = require('../../models/club')
        const deletedClub = await Club.deleteOne({_id: id})
        res.status(200).json({message: 'Success'})
    } else if (req.method === "PATCH") {
        if (!req.body) {
            res.status(400).send({
                success: false,
                message: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.'
            })
            return
        }
        const session = await unstable_getServerSession(req, res, authOptions)

        //TODO: look if user actually has permissions to edit club
        if (!session) {
            res.status(401).json({message: "You must be logged in."});
            return;
        }

        console.log(req.body)
        const {id, reactivate} = req.body
        if(reactivate != undefined) {
            const Club = require('../../models/club')
            const updatedClub = await Club.updateOne({_id: id}, {active: reactivate})
            return res.status(200).json({message: 'Success'})
        }

        let {titel, description, grade, date, lesson, room, teacher, talentPromotion, active} = req.body.club
        if (!titel || !description || !grade || !date || !lesson || !room || !teacher || talentPromotion == undefined || active == undefined) {
            res.status(400).send({
                success: false,
                message: 'Nicht alle Felder wurden ausgefüllt. Bitte versuche es erneut.'
            })
            return
        }
        if (teacher instanceof Array) teacher = teacher.join(", ")
        teacher = teacher.split(",").map((t: string) => t.trim())
        if (teacher.length == 0) {
            res.status(400).send({success: false, message: 'Nicht alle Felder wurden ausgefüllt.'})
            return
        }

        const Club = require('../../models/club')
        const edited = await Club.findOneAndUpdate({_id: id}, {
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