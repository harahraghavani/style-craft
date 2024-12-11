import "./globals.css";

export const metadata = {
  title: "Style Craft",
  description: "Generate CSS styles for your next project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
