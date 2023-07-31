import React, { useEffect, useRef, useState } from "react";
import Modal from "./AddExpenseModal";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate=useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [editExpense, setEditExpense] = useState();
  const [filterDate, setFilterDate] = useState();
  const filterRef = useRef();

  useEffect(() => {
    const prevExpenses = JSON.parse(localStorage.getItem("expenses"));
    if (prevExpenses) setExpenses(prevExpenses);
  }, []);

  function getCurrentDateTime(currentTimestamp) {
    const currentDate = new Date(currentTimestamp);

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const seconds = String(currentDate.getSeconds()).padStart(2, "0");

    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedDateTime;
  }

  const handleSearch = (searchTerm) => {
    if (!searchTerm || searchTerm === "") {
      const prevExpenses = JSON.parse(localStorage.getItem("expenses"));
      if (prevExpenses) setExpenses(prevExpenses);
      else setExpenses([]);
      return;
    }
    const filteredExpenses = expenses.filter((e) =>
      e.name.includes(searchTerm)
    );
    setExpenses([...filteredExpenses]);
  };

  return (
    <div className="px-6 pt-6">
      <div className="relative min-h-screen p-6 overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex items-center justify-end gap-6 pb-4">
          <div className="flex items-center gap-4">
            <label
              htmlFor="date_of_expense"
              className="flex-shrink-0 block mb-2 text-sm font-medium text-gray-900 flex-nowrap "
            >
              Filter by Date
            </label>
            <input
              type="date"
              value={filterDate}
              onChange={(e) => {
                setFilterDate(e.target.value);
                const filteredExpenses = expenses.filter(
                  (ex) => ex.doe === e.target.value
                );
                setExpenses([...filteredExpenses]);
              }}
              id="date_of_expense"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="DOE"
            />
            {filterDate && (
              <button
                type="button"
                onClick={() => {
                  setFilterDate("");
                  const prevExpenses = JSON.parse(
                    localStorage.getItem("expenses")
                  );
                  if (prevExpenses) setExpenses(prevExpenses);
                  else setExpenses([]);
                }}
                className="text-white bg-blue-700 flex-shrink-0 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 "
              >
                Reset
              </button>
            )}
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              id="table-search"
              onChange={(e) => {
                handleSearch(e.target.value);
              }}
              className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
              placeholder="Search for items"
            />
          </div>
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 "
          >
            Add expense
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 "
          >
            Log Out
          </button>
        </div>

        <table className="w-full text-sm text-left text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Date of Expense
              </th>
              <th scope="col" className="px-6 py-3">
                Amount
              </th>
              <th scope="col" className="px-6 py-3">
                Updated At
              </th>
              <th scope="col" className="px-6 py-3">
                Created by
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((e, idx) => (
              <tr className="bg-white border-b ">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                >
                  {e.name}
                </th>
                <td className="px-6 py-4">{e.category}</td>
                <td className="px-6 py-4">{e.doe}</td>
                <td className="px-6 py-4">{e.amount}</td>
                <td className="px-6 py-4">{getCurrentDateTime(e.updatedAt)}</td>
                <td className="px-6 py-4">
                  <p>Me</p>
                </td>
                <td className="flex gap-6 px-6 py-4">
                  <div onClick={() => setEditExpense(e)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="green"
                      className="w-6 h-6 cursor-pointer"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                      />
                    </svg>
                  </div>
                  <div
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this expense?')){
                      expenses.splice(idx, 1);
                      localStorage.setItem(
                        "expenses",
                        JSON.stringify(expenses)
                      );
                      setExpenses([...expenses]);
                    }}}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="red"
                      className="w-6 h-6 cursor-pointer"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
      {(showModal || editExpense) && (
        <Modal
          onClose={() => setShowModal(false)}
          initialExpense={editExpense}
          onAddExpense={(e) => {
            setExpenses((prev) => {
              const allExpenses = [...prev, e];
              localStorage.setItem("expenses", JSON.stringify(allExpenses));
              return allExpenses;
            });
            setShowModal(false);
          }}
          onEditSaveClick={(e) => {
            const idx = expenses.findIndex((f) => f.id === e.id);
            expenses?.splice(idx, 1);
            expenses?.splice(idx, 0, e);
            setExpenses([...expenses]);
            localStorage.setItem("expenses", JSON.stringify(expenses));
            setEditExpense(undefined);
          }}
        />
      )}
      
    </div>
    
  );
}
