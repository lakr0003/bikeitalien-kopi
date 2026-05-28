import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import LinkButton from "@/app/components/LinkButton";

export default function BetalingSide() {
  return (
    <>
      <header className="sticky top-0 z-60 col-[full] grid grid-cols-subgrid">
        <Header />
      </header>
      <main className="grid">
        <section className="col-[content] flex min-h-[60vh] flex-col items-center justify-center gap-6 py-24 text-center">
          <h2 className="font-semibold">Dette er betalingssiden</h2>
          <p className="max-w-175">
            I en færdig løsning ville brugeren nu blive sendt videre til
            betalingsmulighederne for at gennemføre bookingen af den valgte
            rejse.
          </p>
          <LinkButton
            href="/"
            variant="accent"
            className="w-fit place-content-center"
          >
            Gå tilbage til forsiden
          </LinkButton>
        </section>
      </main>
      <footer className="col-[full] grid grid-cols-subgrid">
        <Footer />
      </footer>
    </>
  );
}
