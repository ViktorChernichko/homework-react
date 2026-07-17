import "./globals.css";

export const metadata = {
  title: "Таблиця кольорів",
  description: "Визначення домінуючих кольорів зображення",
};

export default function RootLayout({ children }) {
  return (
    <html lang="uk">
      <body>{children}</body>
    </html>
  );
}