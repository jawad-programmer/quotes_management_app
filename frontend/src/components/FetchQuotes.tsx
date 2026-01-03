import { useState, useEffect } from "react";
import AddQuoteForm from "./AddQuoteForm";
import QuotesTable from "./QuotesTable";
import FeaturedQuotes from "./FeaturedQuotes";

const FetchQuotes = () => {
  const [quotes, setQuotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Trigger refresh (after adding or deleting quote)
  const triggerRefresh = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/quotes`);
      const data = await res.json();
      setQuotes(data);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to fetch quotes");
    } finally {
      setLoading(false);
    }
  };

  // Fetch initially
  useEffect(() => {
    triggerRefresh();
  }, []);

  if (loading) return <div className="text-center mt-6">Loading...</div>;
  if (error) return <div className="text-center mt-6 text-red-600">{error}</div>;

  return (
    <div>
      <FeaturedQuotes quotes={quotes.slice(-3).reverse()} /> {/* latest 3 */}
      <QuotesTable quotes={quotes} setQuotes={setQuotes} />
      <AddQuoteForm onSuccess={triggerRefresh} />
    </div>
  );
};

export default FetchQuotes;
