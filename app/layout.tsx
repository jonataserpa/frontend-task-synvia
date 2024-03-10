import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CreateServiceModal } from "@/components/modals/create-service-modal";
import Toast from "@/components/toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: "Cash flow",
  description: "Cash flow - finances",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toast />
        <CreateServiceModal />
        {children}
      </body>
    </html>
  );
}
