import type {NextPage} from 'next'
import Head from 'next/head'
import {useSession} from "next-auth/react"
import LoginBtn from "../components/login-btn";
import Link from "next/link";

const Home: NextPage = () => {
    const {data: session, status} = useSession()

    return (
        <div>
            <Head>
                <title>AG-Verwaltung</title>
                <link rel="icon" href="/cropped-wglogo-512x512.png"/>
            </Head>

            <main>
                <h1 className="p-4 text-3xl font-bold text-center pb-5">
                    Willkommen
                </h1>

                <LoginBtn/>

                {session &&
                <div>
                    {session.user?.name}
                    <br/>
                    <Link href="/admin/">ADMIN</Link>
                </div>}
            </main>
        </div>
    )
}

export default Home
