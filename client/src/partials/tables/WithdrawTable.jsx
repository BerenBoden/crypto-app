import { AiOutlineCheckCircle } from "react-icons/ai";
function WithdrawTable({ title, withdraws }) {
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
                  <div className="font-semibold text-left">
                    Receiver Wallet Address
                  </div>
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
            {/* Table body */}
            <tbody className="text-sm divide-y divide-slate-100">
              {withdraws.map(({ address, amount, key, currency }) => {
                return (
                  <tr key={key}>
                    <td className={` p-2 whitespace-nowrap`}>
                      <div className="flex items-center">
                        <div className="shrink-0 mr-2"></div>
                        <div>{address}</div>
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left font-medium text-green-500">
                        {amount}
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-center font-medium">{currency}</div>
                    </td>

                    <td className="p-2 whitespace-nowrap">
                      <div className="text-xs text-center capitalize">1y</div>
                    </td>
                    <td className="p-2 flex items-center justify-center">
                      <AiOutlineCheckCircle className="text-green-500 w-5 h-5" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default WithdrawTable;
