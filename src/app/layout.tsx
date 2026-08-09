import type { Metadata } from "next";
import "./globals.css";
import GalaxyBackground from "@/components/effects/GalaxyBackground";
import CustomCursor from "@/components/effects/CustomCursor";

export const metadata: Metadata = {
  title: "TITAN — پلتفرم گیمینگ و اسپورت",
  description: "بازی کن. رقابت کن. فتح کن. پلتفرم گیمینگ و مسابقات اسپورت تایتان — فروشگاه محصولات دیجیتال گیمینگ و تورنمنت‌های حرفه‌ای",
  keywords: ["گیمینگ", "اسپورت", "تورنمنت", "فورتنایت", "ولورنت", "تایتان", "بازی"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <CustomCursor />
        <GalaxyBackground />
        {children}
      </body>
    </html>
  );
}
