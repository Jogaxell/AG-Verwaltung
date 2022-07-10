import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from '@mantine/core';
import {resize} from "next/dist/server/lib/squoosh/impl";

export default function dateFormatter({date}: {date: string | string[]}) {
    const dates = [
        {label: "Montag", value: "1"},
    {label: "Dienstag", value: "2"},
    {label: "Mittwoch", value: "3"},
    {label: "Donnerstag", value: "4"},
    {label: "Freitag", value: "5"},
    {label: "14-tägig", value: "8"},
    {label: "nach Vereinbarung", value: "9"}]

    let result: string = ""
    if(date instanceof Array) {
        result = date.map(d => dates.find(d2 => d2.value === d)?.label).join(", ")
    }else {
        result = dates.find(d => d.value === date)?.label as string
    }

    return (
        <>{result}</>
    )

}