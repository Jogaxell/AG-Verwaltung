import Head from 'next/head'
import Link from "next/link";
import {Button} from "@mantine/core";

export default function FourOhFour() {
    return (
        <div>
            <Head>
                <title>AG-Verwaltung</title>
                <link rel="icon" href="/cropped-wglogo-512x512.png"/>
            </Head>

            <main>
                <h1 className="p-2 text-2xl font-bold">404</h1>
                <p className="p-2">Ups! Da ist leider was schief gelaufen!</p>
                <Link href="/">
                    <Button variant="outline" size="lg">
                        Zurück zur Startseite
                    </Button>
                </Link>
            </main>
        </div>
    )
}

