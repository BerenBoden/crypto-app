import React, { useState, useEffect } from "react";
import RealtimeChart from "../../charts/RealtimeChart";
import { tailwindConfig, hexToRGB } from "../../utils/Utils";
import { formatCurrency } from "../../utils/Utils";

function LineChartRealTime({ userDataIsLoading, user }) {
  const [slicedData, setSlicedData] = useState([]);
  const now = new Date();
  useEffect(() => {
    if (user?.cryptoBalanceHistory) {
      const newData = [...user.cryptoBalanceHistory].slice(0, 2);
      const newSlicedData = newData
        .slice(Math.max(newData.length - 2, 0))
        .reverse();
      setSlicedData(newSlicedData);
    }
  }, [user]);
  const chartData = {
    labels: [`${new Date(now - 2000 - 1 * 2000)}`, `${new Date()}`],
    datasets: [
      {
        data: slicedData,
        fill: true,
        backgroundColor: `rgba(${hexToRGB(
          tailwindConfig().theme.colors.blue[500]
        )}, 0.08)`,
        borderColor: tailwindConfig().theme.colors.indigo[500],
        borderWidth: 2,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: tailwindConfig().theme.colors.indigo[500],
        clip: 20,
      },
    ],
  };
  if (userDataIsLoading) return <div>Loading...</div>;
  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100 flex items-center">
        <h2 className="font-semibold text-slate-800">Total Crypto Assets</h2>
      </header>
      <RealtimeChart
        data={chartData}
        width={595}
        height={248}
        currentBalance={formatCurrency(user?.cryptoBalance)}
      />
    </div>
  );
}

export default LineChartRealTime;
