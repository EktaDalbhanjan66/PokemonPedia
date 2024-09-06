import React from "react";

const Pagination = ({ currentPage,  onNext, onPrev ,totalPages}) => {
  return (
    <div className="flex justify-center mt-4 space-x-4">
      <button
        onClick={onPrev}
        disabled={currentPage === 0}
        className="px-4 py-2 bg-yellow-200 text-black rounded disabled:bg-gray-300 font-semibold"
      >
        Previous
      </button>
      <div className="px-4 py-2 bg-yellow-200 text-black rounded disabled:bg-gray-300 font-semibold">
      Page {currentPage + 1} of {totalPages}
      </div>
      <button
        onClick={onNext}
        disabled={currentPage >= totalPages - 1}
        className="px-4 py-2 bg-yellow-200 text-black rounded disabled:bg-gray-300 font-semibold"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
