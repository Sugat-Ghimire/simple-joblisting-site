interface PaginationProps {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  onPageChange: (page: number) => void; // Changed from setCurrentPage
}

export default function Pagination({
  itemsPerPage,
  totalItems,
  currentPage,
  onPageChange, // Changed prop name
}: PaginationProps) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex justify-center mt-8">
      <ul className="flex space-x-2">
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => onPageChange(number)} // Updated function call
              className={`px-4 py-2 rounded-md transition-colors duration-300 ${
                currentPage === number
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
