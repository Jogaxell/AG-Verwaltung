import Head from 'next/head'
import Sidebar from '../components/sidebar'
import {useSession} from "next-auth/react"
import LoginBtn from "../components/login-btn";
import {GetServerSideProps} from "next";
import {Club} from "../models/club";
import {Divider, Menu, Skeleton, Table, Text} from '@mantine/core';
import {ArrowsLeftRight, MessageCircle, Pencil, Photo, Search, Settings, Trash} from "tabler-icons-react";
import {useState} from "react";

export default function Overview(props: any) {

    const [opened, setOpened] = useState(false);

    const clubs: Club[] = JSON.parse(props.clubs);

    const {data: session, status} = useSession()
    if (status === 'loading') {
        return (<></>)
    }
    console.log(clubs)

    if (!session) {
        return (
            <>
                <div className="flex flex-col items-center justify-center h-screen">
                    <h1 className="text-3xl font-bold text-center pb-5">
                        Nicht eingeloggt
                    </h1>
                    <LoginBtn/>
                </div>
            </>
        )
    }

    const ownClubs: Club[] = clubs.filter(club => club.teacher == session.user?.name)


    //https://www.youtube.com/watch?v=CVpUuw9XSjY
    //redux

    const rows = ownClubs.map((element) => (
        <tr key={element.name}>
            <td>{element.name}</td>
            <td>{element.description}</td>
            <td>{element.grade.join(", ")}</td>
            <td>{element.date}</td>
            <td>{element.lesson.join(", ")}</td>
            <td>{element.room}</td>
            <td>{element.teacher}</td>
            <td>{element.talentPromotion.toString()}</td>
            <td>
                <Menu>
                <Menu.Label>Bearbeiten</Menu.Label>
                <Menu.Item onClick={() => console.log('Hello')} icon={<Pencil size={14} />}>Bearbeiten</Menu.Item>

                <Divider />

                <Menu.Label>Danger zone</Menu.Label>
                <Menu.Item icon={<ArrowsLeftRight size={14} />}>Kopieren</Menu.Item>
                <Menu.Item color="red" icon={<Trash size={14} />}>Löschen</Menu.Item>
            </Menu></td>
        </tr>
    ));
    //TODO: user Mantine Drawer to edit the clubs

    return (
        <div>
            <Head>
                <title>AG-Verwaltung</title>
                <link rel="icon" href="/cropped-wglogo-512x512.png"/>
            </Head>

            <main>
                <div className="flex">
                    <Sidebar/>
                    <div className="">
                        <div className="">
                            <h1 className="p-4 text-3xl font-bold py-5">
                                Eigene AGs
                            </h1>
                            <Table highlightOnHover className="p">
                                <thead>
                                <tr>
                                    <th>Titel</th>
                                    <th>Beschreibung</th>
                                    <th>Jahrgang</th>
                                    <th>Datum</th>
                                    <th>Stunde</th>
                                    <th>Raum</th>
                                    <th>Lehrer</th>
                                    <th>Förderung</th>
                                    <th> </th>
                                </tr>
                                </thead>
                                <tbody>{rows}</tbody>
                            </Table>
                        </div>
                        <div className="">
                            <h1 className="p-4 text-3xl font-bold text-center pb-5">
                                Alle AGs
                            </h1>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    let mongoose = require('mongoose');
    await mongoose.connect(process.env.MONGO_URI);

    const Club = require('../models/club');

    let result = await Club.find().limit(10).exec();

    result = JSON.stringify(result)

    return {
        props: {
            clubs: result
        }
    }
}
