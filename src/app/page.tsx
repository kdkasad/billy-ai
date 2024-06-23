import ActionButton from "./action-button";

export default function Page() {
  return (
    <>
      <main className="container relative pb-24">
        <div className="mx-auto mt-32 sm:mt-48 xl:mt-56">
          <div className="text-center">
            <h1 className="max-w-3xl mx-auto text-4xl font-bold tracking-tighter text-foreground drop-shadow-xl sm:text-6xl">
              Create and share your own legislation.
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-balance text-xl font-light leading-8 tracking-wide text-muted-foreground">
              Description
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <ActionButton />
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#4e8fff] to-[#ff8383] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          ></div>
        </div>
        <div
          className="absolute inset-x-0 bottom-20 -z-10 transform-gpu overflow-hidden blur-3xl md:bottom-0"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#4e8fff] to-[#ff8383] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          ></div>
        </div>
      </main>
    </>
  );
}
