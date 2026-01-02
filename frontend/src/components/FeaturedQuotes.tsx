interface FeaturedQuotesProps {
  quotes: { quote: string; author: string }[];
}

const FeaturedQuotes = ({ quotes }: FeaturedQuotesProps) => {

  return (
    <>
      <h2 className="mx-5 mt-5 font-bold text-2xl">Featured Quotes</h2>
      <div className="flex">
        {quotes.map((arr, index) => (
          <div key={index} className="shadow rounded w-1/3 m-5 p-5 flex flex-col gap-5">
            <p>{arr.quote}</p>
            <p>{arr.author}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default FeaturedQuotes;
