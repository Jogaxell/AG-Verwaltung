import { useSession, signIn, signOut } from "next-auth/react"

export default function LoginBtn() {
    const { data: session } = useSession()
    if (session) {
        return (
            <>
                Eingeloggt als {session.user.email} <br />
                <button onClick={() => signOut()}>Ausloggen</button>
            </>
        )
    }
    return (
        <>
            Nicht eingeloggt<br/>
            <button onClick={() => signIn()}>Einloggen</button>
        </>
    )
}