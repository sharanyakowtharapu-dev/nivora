export default function Home() {
  return (
    <main className="min-h-screen">

      {/* NAVBAR */}
      <header className="border-b border-[#e4eae7] bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1d6b55] font-bold text-white">
              N
            </div>

            <span className="text-xl font-extrabold tracking-wide">
              NIVORA
            </span>
          </div>

          <nav className="hidden gap-8 text-sm text-gray-600 md:flex">
            <a href="#features" className="hover:text-[#1d6b55]">
              Features
            </a>

            <a href="#journey" className="hover:text-[#1d6b55]">
              Your Journey
            </a>

            <a href="#about" className="hover:text-[#1d6b55]">
              About
            </a>
          </nav>

          <button className="rounded-xl bg-[#1d6b55] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#15533f]">
            Get Started
          </button>

        </div>
      </header>


      {/* HERO */}
      <section className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-24 lg:grid-cols-2">

        <div>

          <div className="mb-6 inline-block rounded-full bg-[#edf6f1] px-4 py-2 text-sm font-medium text-[#28735b]">
            ✦ Financial clarity for your next step
          </div>

          <h1 className="max-w-3xl text-5xl font-extrabold leading-tight tracking-tight md:text-7xl">
            Build your
            <span className="text-[#1d6b55]"> financial foundation.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-[#68736e]">
            Nivora helps students and first-job professionals understand
            their income, organize their finances, plan their goals and
            move toward financial independence.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">

            <button className="rounded-xl bg-[#1d6b55] px-6 py-4 font-semibold text-white shadow-lg transition hover:-translate-y-1 hover:bg-[#15533f]">
              Start Your Journey →
            </button>

            <button className="rounded-xl border border-[#dce4e0] bg-white px-6 py-4 font-semibold text-gray-700 transition hover:bg-[#edf6f1]">
              Explore Nivora
            </button>

          </div>

          <div className="mt-12 flex gap-12">

            <div>
              <p className="text-2xl font-bold text-[#1d6b55]">01</p>
              <p className="mt-1 text-sm text-gray-500">Understand</p>
            </div>

            <div>
              <p className="text-2xl font-bold text-[#1d6b55]">02</p>
              <p className="mt-1 text-sm text-gray-500">Plan</p>
            </div>

            <div>
              <p className="text-2xl font-bold text-[#1d6b55]">03</p>
              <p className="mt-1 text-sm text-gray-500">Grow</p>
            </div>

          </div>

        </div>


        {/* DASHBOARD PREVIEW */}
        <div className="rounded-3xl border border-[#e4eae7] bg-white p-6 shadow-2xl">

          <div className="mb-6 flex items-center justify-between">

            <div>
              <p className="text-xs text-gray-400">
                Good morning 👋
              </p>

              <h2 className="mt-1 font-bold">
                Your Financial Overview
              </h2>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#edf6f1] font-bold text-[#1d6b55]">
              S
            </div>

          </div>


          {/* Income */}
          <div className="rounded-2xl bg-[#1d6b55] p-6 text-white">

            <p className="text-sm text-[#b8d9cc]">
              Monthly Income
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              ₹50,000
            </h2>

            <p className="mt-2 text-xs text-[#b9dfd1]">
              ↑ 8.4% from last month
            </p>

          </div>


          {/* Mini cards */}
          <div className="mt-3 grid grid-cols-2 gap-3">

            <div className="rounded-2xl bg-[#f7f9f8] p-5">

              <p className="text-xs text-gray-400">
                Expenses
              </p>

              <h3 className="mt-2 text-xl font-bold">
                ₹22,000
              </h3>

            </div>


            <div className="rounded-2xl bg-[#f7f9f8] p-5">

              <p className="text-xs text-gray-400">
                Savings
              </p>

              <h3 className="mt-2 text-xl font-bold">
                ₹15,000
              </h3>

            </div>

          </div>


          {/* Goal */}
          <div className="mt-3 rounded-2xl border border-[#edf0ee] p-5">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-xs text-gray-400">
                  Financial Goal
                </p>

                <h3 className="mt-1 font-bold">
                  💻 New Laptop
                </h3>
              </div>

              <span className="font-bold text-[#1d6b55]">
                68%
              </span>

            </div>


            <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-200">

              <div className="h-full w-[68%] rounded-full bg-[#5eaa8e]" />

            </div>

            <p className="mt-2 text-xs text-gray-400">
              ₹40,800 of ₹60,000
            </p>

          </div>


          {/* Next step */}
          <div className="mt-3 flex items-center gap-3 rounded-2xl bg-[#edf6f1] p-4">

            <span className="text-xl">
              ✦
            </span>

            <div>

              <p className="text-xs text-gray-400">
                Your next step
              </p>

              <p className="text-sm font-semibold">
                Build your emergency fund
              </p>

            </div>

            <button className="ml-auto flex h-8 w-8 items-center justify-center rounded-lg bg-white">
              →
            </button>

          </div>

        </div>

      </section>


      {/* FEATURES */}
      <section id="features" className="bg-white px-6 py-24">

        <div className="mx-auto max-w-7xl">

          <div className="max-w-2xl">

            <p className="text-xs font-bold tracking-widest text-[#318069]">
              WHAT NIVORA DOES
            </p>

            <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
              More than tracking money.
            </h2>

            <p className="mt-5 leading-7 text-gray-500">
              Nivora helps you understand your financial life and make
              better decisions.
            </p>

          </div>


          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

            <Feature
              icon="💼"
              title="Understand Your Salary"
              text="Understand CTC, in-hand salary, PF, TDS and other salary components."
            />

            <Feature
              icon="🎯"
              title="Financial Goals"
              text="Create goals for laptops, education, emergency funds and other priorities."
            />

            <Feature
              icon="🗓️"
              title="90-Day Financial Plan"
              text="Follow a personalized plan to build strong financial habits."
            />

            <Feature
              icon="🔮"
              title="Life Scenarios"
              text="Explore how changes in your life could affect your financial position."
            />

            <Feature
              icon="🤖"
              title="AI Financial Assistant"
              text="Ask questions and get simple explanations about your financial information."
            />

            <Feature
              icon="📊"
              title="Financial Insights"
              text="Understand spending, savings and progress through interactive analytics."
            />

          </div>

        </div>

      </section>


      {/* JOURNEY */}
      <section id="journey" className="bg-[#edf4f1] px-6 py-24">

        <div className="mx-auto max-w-7xl">

          <p className="text-xs font-bold tracking-widest text-[#318069]">
            YOUR JOURNEY
          </p>

          <h2 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">
            From first income to financial confidence.
          </h2>


          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

            <Step number="01" title="Understand">
              Understand where your money comes from.
            </Step>

            <Step number="02" title="Organize">
              Organize your income, expenses and savings.
            </Step>

            <Step number="03" title="Plan">
              Create goals and build a personalized plan.
            </Step>

            <Step number="04" title="Grow">
              Make informed decisions and move toward independence.
            </Step>

          </div>

        </div>

      </section>


      {/* CTA */}
      <section id="about" className="bg-[#1d6b55] px-6 py-24 text-white">

        <div className="mx-auto max-w-7xl">

          <p className="text-xs font-bold tracking-widest text-[#bde2d4]">
            START YOUR JOURNEY
          </p>

          <h2 className="mt-4 max-w-2xl text-4xl font-bold tracking-tight md:text-6xl">
            Your first income is only the beginning.
          </h2>

          <p className="mt-5 text-[#c7ded5]">
            Build a stronger financial foundation with Nivora.
          </p>

          <button className="mt-8 rounded-xl bg-white px-6 py-4 font-semibold text-[#1d6b55]">
            Get Started →
          </button>

        </div>

      </section>


      {/* FOOTER */}
      <footer className="bg-[#12251f] px-6 py-8 text-white">

        <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div className="flex items-center gap-3">

            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1d6b55] font-bold">
              N
            </div>

            <span className="font-bold tracking-wide">
              NIVORA
            </span>

          </div>

          <p className="text-sm text-[#94a59e]">
            Build Today. Grow Tomorrow.
          </p>

          <p className="text-xs text-[#94a59e]">
            © 2026 Nivora
          </p>

        </div>

      </footer>

    </main>
  );
}


/* FEATURE COMPONENT */

function Feature({
  icon,
  title,
  text,
}: {
  icon: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-[#e7ece9] bg-[#fdfefe] p-7 transition hover:-translate-y-1 hover:shadow-lg">

      <div className="mb-6 text-3xl">
        {icon}
      </div>

      <h3 className="text-lg font-bold">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-gray-500">
        {text}
      </p>

    </div>
  );
}


/* JOURNEY STEP COMPONENT */

function Step({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>

      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#1d6b55] text-sm font-bold text-white">
        {number}
      </div>

      <h3 className="text-lg font-bold">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-gray-500">
        {children}
      </p>

    </div>
  );
}