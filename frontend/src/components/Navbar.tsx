const Navbar = () => {
    const arr = ["Home", "Featured Quotes", "Quotes Table", "Add Quote"]
  return (
    <>
        <nav>
            <ul className="flex justify-center gap-10 m-5">
                {arr.map((arr, index) => (
                    <li key={index} className="hover:cursor-pointer hover:text-blue-500">{arr}</li>
                ))}
            </ul>
        </nav>
    </>
  )
}

export default Navbar