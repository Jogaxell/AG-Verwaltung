import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from '@mantine/core';

export default function LoginBtn() {
    const { data: session } = useSession()
    if (session) {
        return (
            <>
                <Button onClick={() => signOut()} variant="default" color="gray" radius="md" size="xl">
                    Logout
                </Button>
            </>
        )
    }
    return (
        <>
            <Button onClick={() => signIn()} variant="default" color="gray" radius="md" size="xl">
                Login
            </Button>
        </>
    )
}