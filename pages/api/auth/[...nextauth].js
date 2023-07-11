import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";

import User from '../../../models/user'

export default NextAuth({
    session: {
        strategy: 'jwt'
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials) {

                const { email, password } = credentials;

                // Check if email and password is entered
                if (!email || !password) {
                    throw new Error('Please enter email or password');
                }

                // Find user in the database
                const user = await User.findOne({ email }).select('+password')

                if (!user) {
                    throw new Error('Invalid Email or Password')
                }

                // Check if password is correct or not
                const isPasswordMatched = await user.comparePassword(password);

                if (!isPasswordMatched) {
                    throw new Error('Invalid Email or Password')
                }

                return Promise.resolve(user)

            }
        })
    ],
    callbacks: {
        jwt: async ({ token, user }) => {
            console.log('in jwt: ')
            console.log('token is: ', token)
            console.log('user is: ', token)

            user && (token.user = user)
            return Promise.resolve(token)
        },
        session: async ({ session, user }) => {
            console.log('in session: ')
            console.log('session is: ', session)
            console.log('user is: ', user)
            session.user = user.user
            return Promise.resolve(session)
        }
    }
})