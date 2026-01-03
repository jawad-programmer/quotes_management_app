import axios from "axios";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";

interface AddQuoteFormProps {
  onSuccess?: () => void
}

interface QuoteFormData {
  quote: string;
  author: string;
}

const AddQuoteForm = ({onSuccess}: AddQuoteFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<QuoteFormData>();

  const sendQuoteToBackend: SubmitHandler<QuoteFormData> = async (formData) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/quotes`, formData, {
        headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(`${import.meta.env.VITE_API_URL}/api/quotes`)
      console.log("Backend response:", response.data);
      alert("Quote added successfully");
      reset();
      onSuccess?.()
    } catch (error) {
      console.error("Error sending quote:", error);
      alert("Failed to add quote");
    }
  };

  return (
    <div className="bg-gray-50 max-w-md shadow-lg rounded-xl p-6 mx-auto my-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-5 text-center">
        Add New Quote
      </h2>

      <form onSubmit={handleSubmit(sendQuoteToBackend)} className="space-y-4">
        {/* Quote */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Quote
          </label>
          <input
            type="text"
            {...register("quote", { required: "Quote is required" })}
            className="border border-gray-300 rounded-lg px-3 py-2
            focus:outline-none focus:ring-2 focus:ring-gray-700"
            placeholder="Enter quote text"
          />
          {errors.quote && (
            <span className="text-red-500 text-sm">{errors.quote?.message}</span>
          )}
        </div>

        {/* Author */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Author
          </label>
          <input
            type="text"
            {...register("author", { required: "Author is required" })}
            className="border border-gray-300 rounded-lg px-3 py-2
            focus:outline-none focus:ring-2 focus:ring-gray-700"
            placeholder="Author name"
          />
          {errors.author && (
            <span className="text-red-500 text-sm">
              {errors.author?.message}
            </span>
          )}
        </div>

        {/* Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-gray-800 text-white py-2 px-6 rounded-full font-semibold
            hover:bg-gray-950 hover:cursor-pointer transition duration-200"
          >
            Add Quote
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddQuoteForm;
