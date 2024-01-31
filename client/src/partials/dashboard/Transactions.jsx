import { useMemo } from "react";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { getSecondsSinceDate, convertSecondsToDHMS } from "../../utils/Utils";
import { formatCoin } from "../../utils/Utils";

function Transactions({ title, transactionData }) {
  const transactions = useMemo(() => {
    if (transactionData?.length <= 0)
      return (
        <div className="text-center text-gray-500 text-sm pt-4">
          No transactions yet...
        </div>
      );
    return transactionData?.map((transaction) => {
      const date = convertSecondsToDHMS(
        getSecondsSinceDate(transaction.createdAt)
      );
      return (
        <tr key={transaction._id}>
          <td className={` p-2 whitespace-nowrap`}>
            <div className="flex items-center">
              <div className="shrink-0 mr-2">
                {transaction.receiver !== "You" && (
                  <FaUserCircle className="w-6 h-10 text-gray-300" />
                )}
              </div>
              <div
                className={`font-medium ${
                  transaction.receiver === "You"
                    ? "text-green-500"
                    : "text-slate-800 "
                }`}
              >
                {transaction.receiver}
              </div>
            </div>
          </td>
          <td className="p-2 whitespace-nowrap">
            <div className="flex items-center text-left">
              <div className="shrink-0">
                {transaction.sender !== "You" && (
                  <FaUserCircle className="w-6 h-10 text-gray-300 mr-2" />
                )}
              </div>
              <div
                className={`font-medium ${
                  transaction.sender === "You"
                    ? "text-green-500"
                    : "text-slate-800 "
                }`}
              >
                {transaction.sender}
              </div>
            </div>
          </td>
          <td className="p-2 whitespace-nowrap">
            <div className="text-left font-medium text-green-500">
              {formatCoin(transaction.amount)}
            </div>
          </td>

          <td className="p-4 whitespace-nowrap">
            <div className="relative flex items-center justify-center">
              <div className="flex items-center mx-2">
                <div className="text-xs text-center capitalize mr-2">
                  {transaction.symbol}
                </div>
                <div className="w-12">
                  <img
                    className="h-4 w-4 object-cover"
                    src={transaction.link}
                  />
                </div>
              </div>
            </div>
          </td>
          <td className="p-2 whitespace-nowrap">
            <div className="text-xs text-center capitalize">
              {date.hours === 0 ? "" : `${date.hours}h`}{" "}
              {date.minutes === 0 ? "" : `${date.minutes}m`} {date.seconds}s Ago
            </div>
          </td>
          <td className="">
            <div className="flex justify-center items-center capitalize">
              <AiOutlineCheckCircle className="text-green-500 w-5 h-5" />
            </div>
          </td>
        </tr>
      );
    });
  }, [transactionData]);

  return (
    <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">{title}</h2>
      </header>
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-slate-400 bg-slate-50">
              <tr>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Receiver</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Sender</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Amount</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Currency</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Time</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Completed</div>
                </th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-slate-100">
              {transactions}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Transactions;
