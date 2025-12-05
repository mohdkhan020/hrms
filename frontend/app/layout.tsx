// import "./globals.css";


// export const metadata = {
// title: "HRMS Tool",
// description: "HRMS Tool - Next.js App Router Example",
// };


// export default function RootLayout({ children }: { children: React.ReactNode }) {
// return (
// <html lang="en">
// <body>
// {children}
// </body>
// </html>
// );
// }


import "./globals.css";

export const metadata = {
  title: "HRMS Tool",
  description: "HRMS Tool - Next.js App Router Example",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        {children}
         <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI"
          crossOrigin="anonymous"
        ></script>
      </body>
    </html>
  );
}
