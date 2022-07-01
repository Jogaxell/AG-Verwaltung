import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

export const authOptions = {
    providers: [
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_CLIENT_SECRET
        }),
        {
            id: "iserv",
            name: "IServ",
            type: "oauth",
            wellKnown: "https://wilhelm-gym.net/iserv/public/.well-known/openid-configuration",
            authorization: {params: {scope: "openid profile email groups"}},
            clientId: process.env.ISERV_CLIENT_ID,
            clientSecret: process.env.ISERV_CLIENT_SECRET,
            profile(profile, token) {
                return {
                    ...profile,
                    id: profile.sub
                };
            }
        }
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            console.log(user)
            console.log(profile)
            console.log(account)
            const isAllowedToSignIn = true
            if (isAllowedToSignIn) {
                return true
            } else {

                //TODO: Validate if user has the roles

                // Return false to display a default error message
                return false
                // Or you can return a URL to redirect to:
                // return '/unauthorized'
            }
        },
        async redirect({ url, baseUrl }) {
            return baseUrl
        },
        async session({ session, user, token }) {
            return session
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            return token
        }
    }
}

export default NextAuth(authOptions)