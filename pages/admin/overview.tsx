import Head from 'next/head'
import AdminSidebar from '../../components/adminSidebar'
import {useSession} from "next-auth/react"
import LoginBtn from "../../components/login-btn";
import {GetServerSideProps} from "next";
import {Club} from "../../models/club";
import ClubList from "../../components/clubList";
import {Badge, Button} from '@mantine/core';
import {useState} from "react";
import ClubModal from "../../components/clubModal";
import {NotificationsProvider} from '@mantine/notifications';


export default function Overview(props: any) {
    const [opened, setOpened] = useState(false);
    const {data: session, status} = useSession()
    if (status === 'loading') {
        return (<></>)
    }
    if (!session || !session.user || !session.user.email) {
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

    const disabledClubs = clubs.filter((club) => !club.active);
    clubs = clubs.filter((club) => club.active);

    // @ts-ignore
    const ownClubs: Club[] = clubs.filter(club => (club.teacher.some(teacher => teacher.toLowerCase() === session.user?.name?.toLowerCase())) || club.teacher.some(teacher => teacher.toLowerCase().includes(session.user?.name?.split(" ")[1].toLowerCase())))


    return (
        <div>
            <Head>
                <title>AG-Verwaltung</title>
                <link rel="icon" href="/cropped-wglogo-512x512.png"/>
            </Head>

            {opened &&
                <ClubModal onClose={
                    () => {
                        setOpened(false)
                    }
                }/>
            }

            <main>
                <NotificationsProvider>
                    <div className="flex">
                        <AdminSidebar/>
                        <div>
                            <div className="float-right m-4">
                                <Button onClick={() => {
                                    setOpened(true);
                                }} variant="outline" radius="md"
                                        size="md">
                                    Neue AG
                                </Button>
                            </div>
                            <div>
                                {/*ownClubs.length > 0 &&
                                    <>
                                        <h1 className="p-4 text-3xl font-bold py-5">
                                            Eigene AGs
                                            <Badge className="m-2 align-middle">{ownClubs.length}</Badge>
                                        </h1>
                                        <ClubList clubs={ownClubs}/>
                                    </>
                                */}
                            </div>
                            <div>
                                <h1 className="p-4 text-3xl font-bold pb-5">
                                    Alle AGs
                                    <Badge className="m-2 align-middle">{clubs.length}</Badge>
                                </h1>
                                <ClubList clubs={clubs} menu={true}/>
                            </div>
                            <div>
                                {disabledClubs.length > 0 &&
                                    <>
                                        <h1 className="p-4 text-3xl font-bold pb-5">
                                            Deaktivierte AGs
                                            <Badge className="m-2 align-middle">{disabledClubs.length}</Badge>
                                        </h1>
                                        <ClubList clubs={disabledClubs} menu={true} reactivate={true}/>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </NotificationsProvider>
            </main>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    let mongoose = require('mongoose');
    await mongoose.connect(process.env.MONGO_URI);

    const Club = require('../../models/club');

    let result = await Club.find().exec();

    result = JSON.stringify(result)

    return {
        props: {
            clubs: result
        }
    }
}
