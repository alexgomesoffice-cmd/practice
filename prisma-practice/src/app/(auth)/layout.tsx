export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"

    >
      <body className="min-h-full flex flex-col">
          <main className="min-h-screen pt-20">{children}</main>
      </body>
    </html>
  );
}