import Head from 'next/head'
import Sidebar from '../components/sidebar'
import {useSession} from "next-auth/react"
import LoginBtn from "../components/login-btn";
import {GetServerSideProps} from "next";
import {Club} from "../models/club";
import ClubList from "../components/clubList";
import {Badge, Button, Popover, Text} from '@mantine/core';
import {useState} from "react";


export default function Overview(props: any) {
    const [opened, setOpened] = useState(false);
    const {data: session, status} = useSession()
    if (status === 'loading') {
        return (<></>)
    }
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
    let clubs: Club[] = JSON.parse(props.clubs);

    //sort alphabetically
    clubs = clubs.sort((a, b) => a.name.localeCompare(b.name))
    const ownClubs: Club[] = clubs.filter(club => club.teacher == session.user?.name)


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
                    <div>
                        <div className="float-right m-4">
                            <Popover
                                opened={opened}
                                onClose={() => setOpened(false)}
                                target={<Button onClick={() => setOpened((o) => !o)} variant="outline" radius="md"
                                                size="md">
                                    Neue AG
                                </Button>}
                                width={170}
                                position="bottom"
                                withArrow
                            >
                                <div style={{display: 'flex', color: "red"}}>
                                    <Text size="sm">Not yet implemented</Text>
                                </div>
                            </Popover>

                        </div>
                        <div>
                            {ownClubs.length > 0 &&
                                <>
                                    <h1 className="p-4 text-3xl font-bold py-5">
                                        Eigene AGs
                                        <Badge className="m-2 align-middle">{ownClubs.length}</Badge>
                                    </h1>
                                    <ClubList clubs={ownClubs}/>
                                </>
                            }
                        </div>
                        <div>
                            <h1 className="p-4 text-3xl font-bold pb-5">
                                Alle AGs
                                <Badge className="m-2 align-middle">{clubs.length}</Badge>
                            </h1>
                            <ClubList clubs={clubs} menu={false}/>
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
