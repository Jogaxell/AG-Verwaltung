import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

export default NextAuth({
    providers: [
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_CLIENT_SECRET
        }),
        {
            id: "iserv",
            name: "Iserv",
            type: "oauth",
            authorization: "https://wilhelm-gym.net/iserv/oauth/v2/auth",
            token: "https://wilhelm-gym.net/iserv/oauth/v2/token",
            userinfo: "https://wilhelm-gym.net/iserv/public/oauth/userinfo",
            jwks: {
                keys: [
                    {
                        n: "tid-SZeqaEvayv3ygdwIFl4pS-esraS2JCI5dMEp-pB5UoSKIt27hAOvWEGHzi_i7EBz30Lhf0N7MydyckoJBdbH5a1xfimEKVYlUkIN2eYO3YfuehNqcvxCdv6mwHBmcgRBrNlgOwJY7EIf05ikvhAwAgBEGrUy1qEAcN0Hy7vZIt-HPCCRjYHhwC-KNQDq5TWcRvm0seoEvDA8InqYhAgvUtx0j98EAejPNngUD1xyGO7Ck0oIz-al8tueNIhIfXGnmDYTbAQXLTudxJYkBY6N5yKoa9sXEBgnl1NQK6gf20V7JC4aFpuG3lEAnY-qXCXoRz2MGuWvgHeC-I7byOd7qyGyaWA2A7gT3wS_64OXtC6_o_6OWD28RjZ4zw4IrnAKrMf_KQlZLpaUoMssxKlFjmeZzfQE7QjzVWeeI2tjtbPYmxRNHHk4jpnU7gskX4IpnV0jCdatoDf5jFsBaxqM4PU02wNpHvtc470WLO57I1HomnXJxv8DCZh8spv1WwJY7sdnbqZvSw_eWly0PYJmxaT-fnbUuoZG6JSAoWWBja6oBt68n8kfJydutVOB3OFNjQ3unJhc3F08iouHoDM1v8wQevq3Hr35L5AYZj70M5ycIUM_SvqvjdRIWkuHe1Ve0oFnrkDvFM7QV2N1fg1-RlrWVIxz18kEIEhjFMs",
                        e: "AQAB",
                        kty: "RSA",
                        alg: "RS256",
                        use: "sig",
                        kid: "AE5D6180-1DBA-11E8-8BE9-8207F7ECDF94"
                    }
                ]
            },
            clientId: process.env.ISERV_CLIENT_ID,
            clientSecret: process.env.ISERV_CLIENT_SECRET
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
})