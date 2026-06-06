export default function Loading() {
  return (
    <section className="col-[content] py-24">
      <div className="h-10 w-72 animate-pulse rounded bg-[var(--grey-100)]" />
      <div className="mt-8 h-[400px] animate-pulse rounded-[20px] bg-[var(--grey-100)]" />
      <div className="mt-8 h-[70px] animate-pulse rounded-[20px] bg-[var(--grey-100)]" />
      <div className="mt-8 h-[200px] animate-pulse rounded-[20px] bg-[var(--grey-100)]" />
    </section>
  );
}
