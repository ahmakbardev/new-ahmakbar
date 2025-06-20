import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {
  Plus_Jakarta_Sans,
  Outfit,
  Montserrat,
  Sniglet,
} from "next/font/google";
import SmoothScroll from "./components/SmoothScroll";
import CustomProgressBar from "@/components/CustomProgressBar";
// import InitialSplashScreenWithWave from "@/components/InitialSplashScreen";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const sniglet = Sniglet({
  subsets: ["latin"],
  weight: ["400", "800"],
  variable: "--font-sniglet",
});
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-montserrat",
});

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body
        className={`${jakarta.variable} ${outfit.variable} ${montserrat.variable} ${sniglet.variable} font-jakarta overflow-x-hidden bg-[#0052FF]`}
      >
        <CustomProgressBar />
        <SmoothScroll />
        {/* <InitialSplashScreenWithWave /> */}
        <NextIntlClientProvider>
          <Header />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
