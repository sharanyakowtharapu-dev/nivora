import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/session";

import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";
import Analytics from "./Analytics";

export default async function DashboardPage() {
  const cookieStore = await cookies();

  const sessionToken =
    cookieStore.get("nivora_session")?.value;

  if (!sessionToken) {
    redirect("/login");
  }

  const session = await verifySession(sessionToken);

  if (!session) {
    redirect("/login");
  }

  const transactions =
    await prisma.transaction.findMany({
      where: {
        userId: session.userId,
      },
      orderBy: {
        date: "desc",
      },
    });

  const income = transactions
    .filter(
      (transaction) =>
        transaction.type === "INCOME"
    )
    .reduce(
      (total, transaction) =>
        total + Number(transaction.amount),
      0
    );

  const expenses = transactions
    .filter(
      (transaction) =>
        transaction.type === "EXPENSE"
    )
    .reduce(
      (total, transaction) =>
        total + Number(transaction.amount),
      0
    );

  const balance = income - expenses;

  // Convert Prisma values into data
  // that can safely be passed to the client component.
  const analyticsTransactions = transactions.map(
    (transaction) => ({
      id: transaction.id,
      amount: Number(transaction.amount),
      type: transaction.type,
      category: transaction.category,
      description: transaction.description,
      date: transaction.date.toISOString(),
    })
  );

  return (
    <main className="min-h-screen bg-[#f5f8f6] px-6 py-10">
      <div className="mx-auto max-w-7xl">

        {/* Dashboard Header */}
        <div>
          <h1 className="text-4xl font-bold text-[#102a43]">
            Nivora Dashboard
          </h1>

          <p className="mt-2 text-[#667871]">
            Manage your finances and understand
            your spending.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="mt-8 grid gap-6 md:grid-cols-3">

          {/* Balance */}
          <div className="rounded-3xl border border-[#d5e1dc] bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-[#667871]">
              Total Balance
            </p>

            <p className="mt-2 text-3xl font-bold text-[#102a43]">
              ₹{balance.toFixed(2)}
            </p>
          </div>

          {/* Income */}
          <div className="rounded-3xl border border-[#d5e1dc] bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-[#667871]">
              Total Income
            </p>

            <p className="mt-2 text-3xl font-bold text-[#1d6b55]">
              ₹{income.toFixed(2)}
            </p>
          </div>

          {/* Expenses */}
          <div className="rounded-3xl border border-[#d5e1dc] bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-[#667871]">
              Total Expenses
            </p>

            <p className="mt-2 text-3xl font-bold text-[#102a43]">
              ₹{expenses.toFixed(2)}
            </p>
          </div>

        </div>

        {/* Add Transaction */}
        <TransactionForm />

        {/* Analytics */}
        <Analytics
          transactions={analyticsTransactions}
        />

        {/* Recent Transactions */}
        <TransactionList />

      </div>
    </main>
  );
}