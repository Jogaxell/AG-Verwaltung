import {GetServerSideProps} from "next";
import Head from 'next/head'
import {Club} from "../../../models/club";
import DateFormatter from "../../../components/dateFormatter";
import PrintedTable from "../../../components/printedTable";

export default function Weekdays(props: any) {

    let clubs: Club[] = JSON.parse(props.clubs)

    clubs = clubs.sort((a, b) => a.name.localeCompare(b.name))


    return (
        <div>
            <Head>
                <title>AG-Verwaltung</title>
                <link rel="icon" href="/cropped-wglogo-512x512.png"/>

            </Head>

            <main className="font-serif">
                <h1 className="p-2 px-4 pb-1 font-bold text-2xl">Arbeitsgemeinschaften im 1. Halbjahr 2022/23</h1>
                <h1 className="px-4 text-1xl">Wochenplan</h1>
                <div className="p-4 mb-4">
                    <h1 className="font-bold text-xl">Montag</h1>
                    <PrintedTable clubs={clubs.filter(club => club.date.includes("1"))}/>
                </div>
                <div className="p-4 mb-4">
                    <h1 className="font-bold text-xl">Dienstag</h1>
                    <PrintedTable clubs={clubs.filter(club => club.date.includes("2"))}/>
                </div>
                <div className="p-4 mb-4">
                    <h1 className="font-bold text-xl">Mittwoch</h1>
                    <PrintedTable clubs={clubs.filter(club => club.date.includes("3"))}/>
                </div>
                <div className="p-4 mb-4">
                    <h1 className="font-bold text-xl">Donnerstag</h1>
                    <PrintedTable clubs={clubs.filter(club => club.date.includes("4"))}/>
                </div>
                <div className="p-4 mb-4">
                    <h1 className="font-bold text-xl">Freitag</h1>
                    <PrintedTable clubs={clubs.filter(club => club.date.includes("5"))}/>
                </div>
                <div className="p-4 mb-4">
                    <h1 className="font-bold text-xl">nach Vereinbarung</h1>
                    <PrintedTable clubs={clubs.filter(club => club.date[0] == "9")}/>
                </div>
            </main>
        </div>
    )
}


export const getServerSideProps: GetServerSideProps = async (context) => {

    let mongoose = require('mongoose');
    await mongoose.connect(process.env.MONGO_URI);

    const Club = require('../../../models/club');

    let result = await Club.find().exec();

    result = result.filter((club: Club) => club.active);

    result = JSON.stringify(result)

    return {
        props: {
            clubs: result
        }
    }
}

