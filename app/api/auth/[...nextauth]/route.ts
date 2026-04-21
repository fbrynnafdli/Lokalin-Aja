import { authOptions } from "@/lib/auth"; // Import dari file logic yang tadi
import NextAuth from "next-auth";

// Inisialisasi Handler NextAuth dengan opsi kita
const handler = NextAuth(authOptions);

// Export sebagai GET dan POST biar bisa menangani request login & session
export { handler as GET, handler as POST };