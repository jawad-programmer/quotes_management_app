import { useState } from "react";

interface QuotesTableProps {
  quotes: any[];
  setQuotes: React.Dispatch<React.SetStateAction<any[]>>;
}

const QuotesTable = ({ quotes, setQuotes }: QuotesTableProps) => {
  const [editingQuote, setEditingQuote] = useState<any | null>(null);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/quotes/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to delete quote");

      // Update state
      setQuotes((prev) => prev.filter((q) => q._id !== id));
    } catch (err: any) {
      alert(err.message || "Failed to delete quote");
    }
  };

  const handleUpdate = async (quote: any) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/quotes/${quote._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quote: quote.quote, author: quote.author }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update quote");

      // Update state in table
      setQuotes((prev) =>
        prev.map((q) => (q._id === quote._id ? { ...q, ...quote } : q))
      );

      setEditingQuote(null); // Close modal
      alert("Quote updated successfully!");
    } catch (err: any) {
      alert(err.message || "Failed to update quote");
    }
  };

  return (
    <>
      {editingQuote && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Edit Quote</h2>

            <input
              type="text"
              value={editingQuote.quote}
              onChange={(e) =>
                setEditingQuote({ ...editingQuote, quote: e.target.value })
              }
              className="border w-full mb-3 p-2 rounded"
              placeholder="Quote"
            />

            <input
              type="text"
              value={editingQuote.author}
              onChange={(e) =>
                setEditingQuote({ ...editingQuote, author: e.target.value })
              }
              className="border w-full mb-3 p-2 rounded"
              placeholder="Author"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditingQuote(null)}
                className="px-3 py-1 rounded border"
              >
                Cancel
              </button>
              <button
                onClick={() => handleUpdate(editingQuote)}
                className="px-3 py-1 rounded bg-blue-600 text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto max-w-4xl mx-auto mt-6">
        <table className="min-w-full border border-gray-300 shadow-md rounded-lg">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Quote</th>
              <th className="px-4 py-2 text-left">Author</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {quotes.map((item, index) => (
              <tr key={index} className="border-t hover:bg-gray-100 transition">
                <td className="px-4 py-2">{item.quote}</td>
                <td className="px-4 py-2">{item.author}</td>
                <td className="px-4 py-2 text-center space-x-2">
                  <button
                    onClick={() => setEditingQuote(item)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default QuotesTable;
