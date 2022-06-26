import type {NextPage} from 'next'
import Head from 'next/head'
import Sidebar from '../components/sidebar'
import {useSession} from "next-auth/react"
import LoginBtn from "../components/login-btn";

const Home: NextPage = () => {
    const {data: session} = useSession()
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
                    <Sidebar/>
                    <div className="flex flex-col h-screen">
                        <h1 className="p-4 text-3xl font-bold text-center pb-5">
                            Willkommen zurück <b>{session.user?.name}</b>
                        </h1>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Home
