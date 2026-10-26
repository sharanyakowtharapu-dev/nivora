"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Transaction = {
  id: string;
  amount: string | number;
  type: "INCOME" | "EXPENSE";
  category: string;
  description: string | null;
  date: string;
};

export default function TransactionList() {
  const router = useRouter();

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  // Edit states
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editAmount, setEditAmount] = useState("");
  const [editType, setEditType] =
    useState<"INCOME" | "EXPENSE">("EXPENSE");
  const [editCategory, setEditCategory] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editDate, setEditDate] = useState("");
  const [updating, setUpdating] = useState(false);

  // Filter
  const [filter, setFilter] = useState<
    "ALL" | "INCOME" | "EXPENSE"
  >("ALL");

  // Load transactions
  async function loadTransactions() {
    try {
      const response = await fetch("/api/transactions");

      const responseText = await response.text();

      let data: {
        transactions?: Transaction[];
        error?: string;
      } = {};

      if (responseText) {
        try {
          data = JSON.parse(responseText);
        } catch {
          data = {};
        }
      }

      if (response.ok) {
        setTransactions(data.transactions || []);
      } else {
        setMessage(
          data.error || "Unable to load transactions."
        );
      }
    } catch (error) {
      console.error(
        "Failed to load transactions:",
        error
      );

      setMessage("Unable to load transactions.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTransactions();
    const handleTransactionAdded = () => {
    loadTransactions();
  };

  window.addEventListener(
    "transactionAdded",
    handleTransactionAdded
  );

  return () => {
    window.removeEventListener(
      "transactionAdded",
      handleTransactionAdded
    );
  };
  }, []);

  // Start editing
  function startEditing(transaction: Transaction) {
    setEditingId(transaction.id);
    setEditAmount(String(transaction.amount));
    setEditType(transaction.type);
    setEditCategory(transaction.category);
    setEditDescription(transaction.description || "");

    const transactionDate = new Date(transaction.date);

    const year = transactionDate.getFullYear();

    const month = String(
      transactionDate.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
      transactionDate.getDate()
    ).padStart(2, "0");

    setEditDate(`${year}-${month}-${day}`);
    setMessage("");
  }

  // Update transaction
  async function handleUpdate() {
    if (!editingId) {
      return;
    }

    setUpdating(true);
    setMessage("");

    try {
      const response = await fetch("/api/transactions", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: editingId,
          amount: editAmount,
          type: editType,
          category: editCategory,
          description: editDescription,
          date: editDate,
        }),
      });

      const responseText = await response.text();

      let data: {
        error?: string;
        message?: string;
        transaction?: Transaction;
      } = {};

      if (responseText) {
        try {
          data = JSON.parse(responseText);
        } catch {
          data = {};
        }
      }

      if (!response.ok) {
        setMessage(
          data.error || "Unable to update transaction."
        );
        return;
      }

      if (data.transaction) {
        setTransactions((currentTransactions) =>
          currentTransactions.map((transaction) =>
            transaction.id === editingId
              ? data.transaction!
              : transaction
          )
        );
      }

      setEditingId(null);

      setMessage(
        data.message ||
          "Transaction updated successfully."
      );

      // Refresh dashboard summary cards
      router.refresh();
    } catch (error) {
      console.error(
        "Update transaction error:",
        error
      );

      setMessage("Unable to update transaction.");
    } finally {
      setUpdating(false);
    }
  }

  // Delete transaction
  async function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this transaction?"
    );

    if (!confirmed) {
      return;
    }

    setDeletingId(id);
    setMessage("");

    try {
      const response = await fetch("/api/transactions", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const responseText = await response.text();

      let data: {
        error?: string;
        message?: string;
      } = {};

      if (responseText) {
        try {
          data = JSON.parse(responseText);
        } catch {
          data = {};
        }
      }

      if (!response.ok) {
        setMessage(
          data.error || "Unable to delete transaction."
        );
        return;
      }

      setTransactions((currentTransactions) =>
        currentTransactions.filter(
          (transaction) => transaction.id !== id
        )
      );

      setMessage(
        data.message ||
          "Transaction deleted successfully."
      );

      // Refresh dashboard summary cards
      router.refresh();
    } catch (error) {
      console.error(
        "Delete transaction error:",
        error
      );

      setMessage("Unable to delete transaction.");
    } finally {
      setDeletingId(null);
    }
  }

  // Filter transactions
  const filteredTransactions = transactions.filter(
    (transaction) =>
      filter === "ALL" ||
      transaction.type === filter
  );

  if (loading) {
    return (
      <div className="mt-8 rounded-3xl border border-[#d5e1dc] bg-white p-6 shadow-sm">
        <p className="text-[#667871]">
          Loading transactions...
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 rounded-3xl border border-[#d5e1dc] bg-white p-6 shadow-sm">

      {/* Heading */}
      <div>
        <h2 className="text-2xl font-bold text-[#102a43]">
          Recent Transactions
        </h2>

        <p className="mt-1 text-sm text-[#667871]">
          Your latest income and expenses.
        </p>
      </div>

      {/* Transaction Filters */}
      <div className="mt-6 flex flex-wrap gap-2">

        <button
          type="button"
          onClick={() => setFilter("ALL")}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
            filter === "ALL"
              ? "bg-[#1d6b55] text-white"
              : "border border-[#d5e1dc] text-[#667871] hover:bg-[#f5f8f6]"
          }`}
        >
          All
        </button>

        <button
          type="button"
          onClick={() => setFilter("INCOME")}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
            filter === "INCOME"
              ? "bg-[#1d6b55] text-white"
              : "border border-[#d5e1dc] text-[#667871] hover:bg-[#f5f8f6]"
          }`}
        >
          Income
        </button>

        <button
          type="button"
          onClick={() => setFilter("EXPENSE")}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
            filter === "EXPENSE"
              ? "bg-[#1d6b55] text-white"
              : "border border-[#d5e1dc] text-[#667871] hover:bg-[#f5f8f6]"
          }`}
        >
          Expenses
        </button>

      </div>

      {/* Message */}
      {message && (
        <p className="mt-4 rounded-xl bg-[#eef7f3] px-4 py-3 text-center text-sm font-medium text-[#1d6b55]">
          {message}
        </p>
      )}

      {/* Empty State */}
      {transactions.length === 0 ? (
        <p className="mt-6 text-[#667871]">
          No transactions yet.
        </p>
      ) : filteredTransactions.length === 0 ? (
        <p className="mt-6 text-[#667871]">
          No {filter === "INCOME" ? "income" : "expense"}{" "}
          transactions found.
        </p>
      ) : (
        <div className="mt-6 space-y-3">

          {filteredTransactions.map((transaction) => (

            <div
              key={transaction.id}
              className="rounded-2xl border border-[#e5ece8] p-4"
            >

              {editingId === transaction.id ? (

                /* EDIT FORM */
                <div className="space-y-4">

                  {/* Amount */}
                  <div>
                    <label className="mb-1 block text-sm font-medium text-[#102a43]">
                      Amount
                    </label>

                    <input
                      type="number"
                      value={editAmount}
                      onChange={(e) =>
                        setEditAmount(e.target.value)
                      }
                      min="0"
                      step="0.01"
                      className="w-full rounded-xl border border-[#d5e1dc] px-3 py-2 outline-none focus:border-blue-400"
                    />
                  </div>

                  {/* Type */}
                  <div>
                    <label className="mb-1 block text-sm font-medium text-[#102a43]">
                      Type
                    </label>

                    <select
                      value={editType}
                      onChange={(e) =>
                        setEditType(
                          e.target.value as
                            | "INCOME"
                            | "EXPENSE"
                        )
                      }
                      className="w-full rounded-xl border border-[#d5e1dc] px-3 py-2 outline-none focus:border-blue-400"
                    >
                      <option value="EXPENSE">
                        Expense
                      </option>

                      <option value="INCOME">
                        Income
                      </option>
                    </select>
                  </div>

                  {/* Category */}
                  <div>
                    <label className="mb-1 block text-sm font-medium text-[#102a43]">
                      Category
                    </label>

                    <input
                      type="text"
                      value={editCategory}
                      onChange={(e) =>
                        setEditCategory(e.target.value)
                      }
                      className="w-full rounded-xl border border-[#d5e1dc] px-3 py-2 outline-none focus:border-blue-400"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="mb-1 block text-sm font-medium text-[#102a43]">
                      Description
                    </label>

                    <input
                      type="text"
                      value={editDescription}
                      onChange={(e) =>
                        setEditDescription(e.target.value)
                      }
                      className="w-full rounded-xl border border-[#d5e1dc] px-3 py-2 outline-none focus:border-blue-400"
                    />
                  </div>

                  {/* Date */}
                  <div>
                    <label className="mb-1 block text-sm font-medium text-[#102a43]">
                      Date
                    </label>

                    <input
                      type="date"
                      value={editDate}
                      onChange={(e) =>
                        setEditDate(e.target.value)
                      }
                      className="w-full rounded-xl border border-[#d5e1dc] px-3 py-2 outline-none focus:border-blue-400"
                    />
                  </div>

                  {/* Edit Buttons */}
                  <div className="flex gap-3">

                    <button
                      type="button"
                      onClick={handleUpdate}
                      disabled={updating}
                      className="rounded-lg bg-[#1d6b55] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#155442] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {updating
                        ? "Saving..."
                        : "Save Changes"}
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setEditingId(null)
                      }
                      disabled={updating}
                      className="rounded-lg border border-[#d5e1dc] px-4 py-2 text-sm font-medium text-[#667871] transition hover:bg-[#f5f8f6] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Cancel
                    </button>

                  </div>

                </div>

              ) : (

                /* NORMAL TRANSACTION VIEW */
                <div className="flex items-center justify-between gap-4">

                  {/* Transaction Information */}
                  <div className="min-w-0">

                    <p className="font-semibold text-[#102a43]">
                      {transaction.category}
                    </p>

                    <p className="truncate text-sm text-[#667871]">
                      {transaction.description ||
                        "No description"}
                    </p>

                    <p className="mt-1 text-xs text-[#81918b]">
                      {new Date(
                        transaction.date
                      ).toLocaleDateString()}
                    </p>

                  </div>

                  {/* Amount + Buttons */}
                  <div className="flex items-center gap-4">

                    <p
                      className={`whitespace-nowrap font-bold ${
                        transaction.type === "INCOME"
                          ? "text-[#1d6b55]"
                          : "text-[#102a43]"
                      }`}
                    >
                      {transaction.type === "INCOME"
                        ? "+"
                        : "-"}
                      ₹
                      {Number(
                        transaction.amount
                      ).toFixed(2)}
                    </p>

                    {/* Edit */}
                    <button
                      type="button"
                      onClick={() =>
                        startEditing(transaction)
                      }
                      className="rounded-lg border border-blue-200 px-3 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-50"
                    >
                      Edit
                    </button>

                    {/* Delete */}
                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(transaction.id)
                      }
                      disabled={
                        deletingId === transaction.id
                      }
                      className="rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {deletingId === transaction.id
                        ? "Deleting..."
                        : "Delete"}
                    </button>

                  </div>

                </div>

              )}

            </div>

          ))}

        </div>
      )}

    </div>
  );
}