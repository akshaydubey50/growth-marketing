import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import connectToDB from "@/lib/dbConnect";
// import UserModel from "@/model/User";
import connectDB from "@/db/dbConnect";
import UserModel from "@/models/user/User.model";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      id: "credentials",
      type: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials: any): Promise<any> {
        await connectDB();
        try {
          //TODO: check here code if you are getting error while login
          console.log({ credentials });
          const user = await UserModel.findOne({
            $or: [{ email: credentials.email }],
          });
          if (!user) {
            throw new Error("User not found");
          }
          /* if (!user.isVerified) {
            throw new Error("Please verify your account before logging.");
          } */
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password,
          );
          if (isPasswordCorrect) {
            return user;
          } else {
            throw new Error("Incorrect Password");
          }
        } catch (e: any) {
          console.log("Error while creating credentials", e.message);
          throw new Error(e);
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET!,
  callbacks: {
    async signIn({ user, account }) {
      await connectDB();
      try {
        if (account?.provider === "google") {
          const existingUser = await UserModel.findOne({ email: user.email });
          if (!existingUser) {
            const newUser = new UserModel({
              email: user.email,
              isVerified: true,
              // name: user.name,
              // Add any other fields you want to save for Google users
            });
            await newUser.save();
            // user._id = newUser._id;
            user._id = newUser._id.toString();
          } else {
            user._id = existingUser._id.toString();
          }
        }

        return true;
      } catch (error) {
        console.error("Erorr while creating user signIn with google", error);
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.email = user.email;
        // token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.email = token.email;
        // session.user.name = token.name;
      }
      return session;
    },
  },
};

export default authOptions;
