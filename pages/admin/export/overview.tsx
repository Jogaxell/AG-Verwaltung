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
                <h1 className="px-4 text-1xl">alphabetisch sortiert</h1>
                <div className="p-4 mb-4">
                    <PrintedTable clubs={clubs}/>
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

