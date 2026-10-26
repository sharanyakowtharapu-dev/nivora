"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TransactionForm() {
  const router = useRouter();
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("EXPENSE");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          type,
          category,
          description,
          date: date || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error || "Something went wrong.");
        return;
      }

      setMessage("Transaction added successfully!");
      window.location.reload();

      setAmount("");
      setType("EXPENSE");
      setCategory("");
      setDescription("");
      setDate("");
    } catch (error) {
      console.error(error);
      setMessage("Unable to add transaction.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-8 rounded-3xl border border-[#d5e1dc] bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-[#102a43]">
        Add Transaction
      </h2>

      <p className="mt-1 text-sm text-[#667871]">
        Record your income or expenses.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">

        <div>
          <label className="mb-2 block text-sm font-medium text-[#102a43]">
            Amount
          </label>

          <input
            type="number"
            step="0.01"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            required
            className="w-full rounded-xl border border-[#d5e1dc] px-4 py-3 outline-none focus:border-[#1d6b55]"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-[#102a43]">
            Transaction Type
          </label>

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full rounded-xl border border-[#d5e1dc] px-4 py-3 outline-none focus:border-[#1d6b55]"
          >
            <option value="EXPENSE">Expense</option>
            <option value="INCOME">Income</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-[#102a43]">
            Category
          </label>

          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Food, Travel, Salary..."
            required
            className="w-full rounded-xl border border-[#d5e1dc] px-4 py-3 outline-none focus:border-[#1d6b55]"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-[#102a43]">
            Description
          </label>

          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What was this transaction for?"
            className="w-full rounded-xl border border-[#d5e1dc] px-4 py-3 outline-none focus:border-[#1d6b55]"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-[#102a43]">
            Date
          </label>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-xl border border-[#d5e1dc] px-4 py-3 outline-none focus:border-[#1d6b55]"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-[#1d6b55] py-3 font-semibold text-white transition hover:bg-[#155a47] disabled:opacity-60"
        >
          {loading ? "Adding..." : "Add Transaction →"}
        </button>

        {message && (
          <p className="text-center text-sm font-medium text-[#1d6b55]">
            {message}
          </p>
        )}
      </form>
    </div>
  );
}