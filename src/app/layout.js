import "./globals.css";

export const metadata = {
  title: "Scarcom",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
