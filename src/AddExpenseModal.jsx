import React, { useId } from "react";

export default function Modal({
  onClose,
  onAddExpense,
  initialExpense,
  onEditSaveClick,
}) {
  const id = useId();
  return (
    <div
      id="defaultModal"
      tabIndex={-1}
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-50 w-full p-4 bg-black bg-opacity-30 grid place-items-center overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] min-h-full"
    >
      <div className="relative w-full max-w-2xl max-h-full">
        {/* Modal content */}
        <div className="relative bg-white rounded-lg shadow ">
          {/* Modal header */}
          <div className="flex items-start justify-between p-4 border-b rounded-t ">
            <h3 className="text-xl font-semibold text-gray-900 ">
              {initialExpense ? "Edit Expense" : "Add Expense"}
            </h3>
            <button
              type="button"
              className="inline-flex items-center justify-center w-8 h-8 ml-auto text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900 "
              onClick={onClose}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {/* Modal body */}
          <div className="p-6 space-y-6">
            <form
              onSubmit={(e) => {
                const userDetails = JSON.parse(
                  localStorage.getItem("userDetails")
                );
                e.preventDefault();
                const expense = {
                  id: initialExpense ? initialExpense.id : id,
                  name: e.target[0].value,
                  doe: e.target[1].value,
                  category: e.target[2].value,
                  desc: e.target[3].value,
                  amount: e.target[4].value,
                  createdBy: userDetails?.email,
                  updatedAt: Date.now(),
                };
                if (initialExpense) {
                  onEditSaveClick(expense);
                  return;
                }
                onAddExpense(expense);
              }}
            >
              <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="Name"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="Name"
                    defaultValue={initialExpense?.name}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="John"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="date_of_expense"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Date of Expense
                  </label>
                  <input
                    type="date"
                    defaultValue={initialExpense?.doe}
                    id="date_of_expense"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="DOE"
                  />
                </div>
                <div>
                  <label
                    htmlFor="category"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    defaultValue={initialExpense?.category}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  >
                    <option selected>Choose a category</option>
                    <option value="Health">Health</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Travel">Travel</option>
                    <option value="Education">Education</option>
                    <option value="Books">Books</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="desc"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Description
                  </label>
                  <input
                    type="text"
                    id="desc"
                    defaultValue={initialExpense?.desc}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="Description"
                  />
                </div>
                <div>
                  <label
                    htmlFor="amount"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Amount
                  </label>
                  <input
                    type="number"
                    id="amount"
                    defaultValue={initialExpense?.amount}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="100"
                    min="0"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
