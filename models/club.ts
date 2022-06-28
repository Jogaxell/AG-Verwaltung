import * as mongoose from "mongoose";
import {Document, Schema} from "mongoose";

export interface Club extends Document {
    name: string,
    description: string,
    grade: number[],
    date: string,
    lesson: number[],
    room: string,
    teacher: string,
    talentPromotion: boolean
}

const ClubsSchema: Schema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    grade: {type: [Number], required: true},
    date: {type: String, required: true},
    lesson: {type: [Number], required: true},
    room: {type: String, required: true},
    teacher: {type: String, required: true},
    talentPromotion: {type: Boolean, required: true, default: false},
})

module.exports = mongoose.models.clubs || mongoose.model<Club>("clubs", ClubsSchema);