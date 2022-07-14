import * as mongoose from "mongoose";
import {Document, Schema} from "mongoose";

export interface Club extends Document {
    name: string,
    description: string,
    grade: string[],
    date: string[],
    lesson: string,
    room: string,
    teacher: string[],
    talentPromotion: boolean,
    active: boolean
}

const ClubsSchema: Schema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    grade: {type: [String], required: true},
    date: {type: [String], required: true},
    lesson: {type: String, required: true},
    room: {type: String, required: true},
    teacher: {type: [String], required: true},
    talentPromotion: {type: Boolean, required: true, default: false},
    active: {type: Boolean, required: true, default: true}
})

module.exports = mongoose.models.clubs || mongoose.model<Club>("clubs", ClubsSchema);