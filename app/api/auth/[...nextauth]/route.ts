import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

// Initialize NextAuth with the custom configuration options from lib/auth.ts
const handler = NextAuth(authOptions);

// Export the handler for both GET and POST requests
export { handler as GET, handler as POST };