import type { Metadata } from "next";
import ApolloProviderWrapper from '../components/apolloProviderWrapper';
import { Poppins } from "next/font/google";
import "./globals.css";


const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "700"],
});


export const metadata: Metadata = {
  title: "Skydiving Town - Edition Marin 2025",
  description: "Skydiving Town est un événement de parachutisme unique en Tunisie, prévu pour 2025. Plus de 4 000 sauts seront réalisés entre 3 500 et 4 500 mètres d’altitude, avec une équipe professionnelle et expérimentée. En plus des sensations fortes en chute libre, l’événement sera animé au sol par une town vibrante, idéale pour passer une journée inoubliable avec vos amis et votre famille. Les dates exactes de l’événement et le lieu seront communiqués au plus tard en mars 2025. STAY TUNED pour toutes les informations à venir !",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased`}
      >
        <ApolloProviderWrapper>
          {children}
        </ApolloProviderWrapper>
      </body>
    </html>
  );
}
