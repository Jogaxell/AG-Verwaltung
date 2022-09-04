import type {NextPage} from 'next'
import Head from 'next/head'
import AdminSidebar from '../../../components/adminSidebar'
import {useSession} from "next-auth/react"
import LoginBtn from "../../../components/login-btn";
import {Button} from "@mantine/core";
import {File} from "tabler-icons-react";
import Link from "next/link";

export default function Index() {
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
    return (
        <div>
            <Head>
                <title>AG-Verwaltung</title>
                <link rel="icon" href="/cropped-wglogo-512x512.png"/>
            </Head>

            <main>
                <div className="flex">
                    <AdminSidebar/>
                    <div className="flex flex-col h-screen">
                        <div>
                            <h1 className="p-3 text-3xl font-bold pb-5">Exportieren</h1>
                        </div>
                        <div className="grid grid-cols-2 gap-7">
                            <div className="place-self-center ">
                                <Link href="/admin/export/weekdays" target="_blank">
                                    <Button variant="outline" size="lg" leftIcon={<File></File>}>
                                        Sortiert nach Wochentagen
                                    </Button>
                                </Link>
                            </div>
                            <div className="place-self-center " >
                                <Link href="/admin/export/descriptions" target="_blank">
                                    <Button variant="outline" size="lg" leftIcon={<File></File>}>
                                        mit Beschreibungen
                                    </Button>
                                </Link>
                            </div>
                            <div className="place-self-center ">
                                <Link href="/admin/export/overview" target="_blank">
                                    <Button variant="outline" size="lg" leftIcon={<File></File>}>
                                        Übersicht
                                    </Button>
                                </Link>
                            </div>
                            <div className="place-self-center ">
                                <Link href="/admin/export/promotion" target="_blank">
                                    <Button variant="outline" size="lg" leftIcon={<File></File>}>
                                        Begabungsförderung
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
