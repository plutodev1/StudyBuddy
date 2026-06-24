import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main style={{ paddingTop: '80px', flex: 1 }}>
        {children}
      </main>
      <Footer />
    </>
  );
}
