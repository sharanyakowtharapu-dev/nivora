"use client";

import { useState } from "react";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

type Transaction = {
  id: string;
  amount: string | number;
  type: "INCOME" | "EXPENSE";
  category: string;
  description: string | null;
  date: string;
};

type AnalyticsProps = {
  transactions: Transaction[];
};

export default function Analytics({
  transactions,
}: AnalyticsProps) {
  // --------------------------------
  // Analytics Period
  // --------------------------------

  const [period, setPeriod] = useState<
    | "ALL"
    | "THIS_MONTH"
    | "LAST_MONTH"
    | "LAST_3_MONTHS"
    | "THIS_YEAR"
  >("ALL");

  // --------------------------------
  // Date Calculations
  // --------------------------------

  const now = new Date();

  const startOfCurrentMonth = new Date(
    now.getFullYear(),
    now.getMonth(),
    1
  );

  const startOfLastMonth = new Date(
    now.getFullYear(),
    now.getMonth() - 1,
    1
  );

  const startOfThreeMonthsAgo = new Date(
    now.getFullYear(),
    now.getMonth() - 2,
    1
  );

  const startOfCurrentYear = new Date(
    now.getFullYear(),
    0,
    1
  );

  // --------------------------------
  // Filter Transactions
  // --------------------------------

  const filteredTransactions = transactions.filter(
    (transaction) => {
      const transactionDate = new Date(
        transaction.date
      );

      if (period === "ALL") {
        return true;
      }

      if (period === "THIS_MONTH") {
        return transactionDate >= startOfCurrentMonth;
      }

      if (period === "LAST_MONTH") {
        return (
          transactionDate >= startOfLastMonth &&
          transactionDate < startOfCurrentMonth
        );
      }

      if (period === "LAST_3_MONTHS") {
        return transactionDate >= startOfThreeMonthsAgo;
      }

      if (period === "THIS_YEAR") {
        return transactionDate >= startOfCurrentYear;
      }

      return true;
    }
  );

  // --------------------------------
  // Total Income
  // --------------------------------

  const income = filteredTransactions
    .filter(
      (transaction) =>
        transaction.type === "INCOME"
    )
    .reduce(
      (total, transaction) =>
        total + Number(transaction.amount),
      0
    );

  // --------------------------------
  // Total Expenses
  // --------------------------------

  const expenses = filteredTransactions
    .filter(
      (transaction) =>
        transaction.type === "EXPENSE"
    )
    .reduce(
      (total, transaction) =>
        total + Number(transaction.amount),
      0
    );

  // --------------------------------
  // Expenses by Category
  // --------------------------------

  const categoryTotals: Record<string, number> = {};

  filteredTransactions
    .filter(
      (transaction) =>
        transaction.type === "EXPENSE"
    )
    .forEach((transaction) => {
      const category = transaction.category;

      categoryTotals[category] =
        (categoryTotals[category] || 0) +
        Number(transaction.amount);
    });

  const categoryData = Object.entries(
    categoryTotals
  ).map(([category, amount]) => ({
    name: category,
    value: amount,
  }));

  // --------------------------------
  // Income vs Expenses
  // --------------------------------

  const incomeExpenseData = [
    {
      name: "Income",
      value: income,
    },
    {
      name: "Expenses",
      value: expenses,
    },
  ];

  // --------------------------------
  // Monthly Analytics
  // --------------------------------

  const monthlyTotals: Record<
    string,
    {
      income: number;
      expenses: number;
    }
  > = {};

  filteredTransactions.forEach((transaction) => {
    const date = new Date(transaction.date);

    const monthKey = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}`;

    if (!monthlyTotals[monthKey]) {
      monthlyTotals[monthKey] = {
        income: 0,
        expenses: 0,
      };
    }

    if (transaction.type === "INCOME") {
      monthlyTotals[monthKey].income += Number(
        transaction.amount
      );
    } else {
      monthlyTotals[monthKey].expenses += Number(
        transaction.amount
      );
    }
  });

  const monthlyData = Object.entries(monthlyTotals)
    .sort(([monthA], [monthB]) =>
      monthA.localeCompare(monthB)
    )
    .map(([month, values]) => {
      const [year, monthNumber] =
        month.split("-");

      const monthName = new Date(
        Number(year),
        Number(monthNumber) - 1
      ).toLocaleString("en-US", {
        month: "short",
      });

      return {
        month: `${monthName} ${year}`,
        income: values.income,
        expenses: values.expenses,
      };
    });

  return (
    <div className="mt-8">

      {/* -------------------------------- */}
      {/* Analytics Header */}
      {/* -------------------------------- */}

      <div className="mb-6">

        <h2 className="text-3xl font-bold text-[#102a43]">
          Financial Analytics
        </h2>

        <p className="mt-1 text-[#667871]">
          Understand your income, expenses, and
          spending patterns.
        </p>

      </div>

      {/* -------------------------------- */}
      {/* Period Selector */}
      {/* -------------------------------- */}

      <div className="mb-6 flex flex-wrap gap-2">

        <button
          type="button"
          onClick={() => setPeriod("ALL")}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
            period === "ALL"
              ? "bg-[#1d6b55] text-white"
              : "border border-[#d5e1dc] bg-white text-[#667871] hover:bg-[#f5f8f6]"
          }`}
        >
          All Time
        </button>

        <button
          type="button"
          onClick={() =>
            setPeriod("THIS_MONTH")
          }
          className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
            period === "THIS_MONTH"
              ? "bg-[#1d6b55] text-white"
              : "border border-[#d5e1dc] bg-white text-[#667871] hover:bg-[#f5f8f6]"
          }`}
        >
          This Month
        </button>

        <button
          type="button"
          onClick={() =>
            setPeriod("LAST_MONTH")
          }
          className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
            period === "LAST_MONTH"
              ? "bg-[#1d6b55] text-white"
              : "border border-[#d5e1dc] bg-white text-[#667871] hover:bg-[#f5f8f6]"
          }`}
        >
          Last Month
        </button>

        <button
          type="button"
          onClick={() =>
            setPeriod("LAST_3_MONTHS")
          }
          className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
            period === "LAST_3_MONTHS"
              ? "bg-[#1d6b55] text-white"
              : "border border-[#d5e1dc] bg-white text-[#667871] hover:bg-[#f5f8f6]"
          }`}
        >
          Last 3 Months
        </button>

        <button
          type="button"
          onClick={() =>
            setPeriod("THIS_YEAR")
          }
          className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
            period === "THIS_YEAR"
              ? "bg-[#1d6b55] text-white"
              : "border border-[#d5e1dc] bg-white text-[#667871] hover:bg-[#f5f8f6]"
          }`}
        >
          This Year
        </button>

      </div>

      {/* -------------------------------- */}
      {/* Monthly Income & Expenses */}
      {/* -------------------------------- */}

      <div className="rounded-3xl border border-[#d5e1dc] bg-white p-6 shadow-sm">

        <h2 className="text-2xl font-bold text-[#102a43]">
          Monthly Income & Expenses
        </h2>

        <p className="mt-1 text-sm text-[#667871]">
          Compare your income and expenses
          month by month.
        </p>

        {monthlyData.length === 0 ? (

          <div className="flex h-80 items-center justify-center text-[#667871]">
            No transaction data available
            for this period.
          </div>

        ) : (

          <div className="mt-4 h-80">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart data={monthlyData}>

                <CartesianGrid
                  strokeDasharray="3 3"
                />

                <XAxis dataKey="month" />

                <YAxis />

                <Tooltip
                  formatter={(value) =>
                    `₹${Number(value).toFixed(2)}`
                  }
                />

                <Legend />

                <Bar
                  dataKey="income"
                  name="Income"
                  fill="#1d6b55"
                  radius={[
                    6,
                    6,
                    0,
                    0,
                  ]}
                />

                <Bar
                  dataKey="expenses"
                  name="Expenses"
                  fill="#102a43"
                  radius={[
                    6,
                    6,
                    0,
                    0,
                  ]}
                />

              </BarChart>
            </ResponsiveContainer>

          </div>

        )}

      </div>

      {/* -------------------------------- */}
      {/* Income vs Expenses + Category */}
      {/* -------------------------------- */}

      <div className="mt-6 grid gap-6 lg:grid-cols-2">

        {/* Income vs Expenses */}

        <div className="rounded-3xl border border-[#d5e1dc] bg-white p-6 shadow-sm">

          <h2 className="text-2xl font-bold text-[#102a43]">
            Income vs Expenses
          </h2>

          <p className="mt-1 text-sm text-[#667871]">
            Overview of your total income
            and expenses.
          </p>

          {income === 0 &&
          expenses === 0 ? (

            <div className="flex h-80 items-center justify-center text-[#667871]">
              No transaction data available
              for this period.
            </div>

          ) : (

            <div className="mt-4 h-80">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <PieChart>

                  <Pie
                    data={incomeExpenseData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >

                    <Cell fill="#1d6b55" />

                    <Cell fill="#102a43" />

                  </Pie>

                  <Tooltip
                    formatter={(value) =>
                      `₹${Number(value).toFixed(2)}`
                    }
                  />

                  <Legend />

                </PieChart>

              </ResponsiveContainer>

            </div>

          )}

        </div>

        {/* Expenses by Category */}

        <div className="rounded-3xl border border-[#d5e1dc] bg-white p-6 shadow-sm">

          <h2 className="text-2xl font-bold text-[#102a43]">
            Expenses by Category
          </h2>

          <p className="mt-1 text-sm text-[#667871]">
            See where your money is being
            spent.
          </p>

          {categoryData.length === 0 ? (

            <div className="flex h-80 items-center justify-center text-[#667871]">
              No expense data available
              for this period.
            </div>

          ) : (

            <div className="mt-4 h-80">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <PieChart>

                  <Pie
                    data={categoryData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >

                    {categoryData.map(
                      (entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            [
                              "#1d6b55",
                              "#102a43",
                              "#667871",
                              "#81918b",
                              "#d5e1dc",
                            ][index % 5]
                          }
                        />
                      )
                    )}

                  </Pie>

                  <Tooltip
                    formatter={(value) =>
                      `₹${Number(value).toFixed(2)}`
                    }
                  />

                  <Legend />

                </PieChart>

              </ResponsiveContainer>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}