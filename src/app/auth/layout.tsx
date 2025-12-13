import { UserProvider } from "@/contexts/UserContext";
import Providers from "../(root)/providers";
import "../globals.css"
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <Toaster />
        <UserProvider>
          <Providers>{children}</Providers>
        </UserProvider>
      </body>
    </html>
  );
}
