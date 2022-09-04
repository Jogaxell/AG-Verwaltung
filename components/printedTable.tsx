import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from '@mantine/core';
import {resize} from "next/dist/server/lib/squoosh/impl";
import {Club} from "../models/club";
import DateFormatter from "./dateFormatter";

export default function PrintedTable({clubs}: { clubs: Club[] }) {
    return (
        <table className="table-fixed w-full">
            <thead>
            <tr className="text-left">
                <th className="w-1/4">Arbeitsgemeinschaft</th>
                <th className="w-1/4">Kursleiter/in</th>
                <th className="w-1/4">Termin der AG</th>
                <th className="w-1/4">findet statt in Raum:</th>
            </tr>
            </thead>
            <tbody>{clubs.map(club => {
                return (
                    <tr className="" key={club.name}>
                        <td className="p-1 border-b border-black-200 font-bold">{club.name}</td>
                        <td className="border-b border-black-200">{club.teacher.join(", ")}</td>
                        <td className="border-b border-black-200">{<DateFormatter date={club.date}
                                                                                  type="short"/>}, {club.lesson} {club.lesson.endsWith("Uhr") ? "" : "Stunde"}</td>
                        <td className="border-b border-black-200">{club.room}</td>
                    </tr>
                )
            })}</tbody>
        </table>
    )
}

