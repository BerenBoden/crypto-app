import React, { useRef, useEffect } from "react";

import {
  Chart,
  LineController,
  LineElement,
  Filler,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip,
} from "chart.js";
import "chartjs-adapter-moment";

// Import utilities
import { tailwindConfig, formatValue } from "../utils/Utils";

Chart.register(
  LineController,
  LineElement,
  Filler,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip
);

function RealtimeChart({ data, width, height, currentBalance }) {
  const canvas = useRef(null);
  const chartValue = useRef(null);
  const chartDeviation = useRef(null);

  useEffect(() => {
    const ctx = canvas.current.getContext("2d"); // Add getContext here
  
    const chart = new Chart(ctx, {
      type: "line",
      data: data,
      options: {
        layout: {
          padding: 20,
        },
        scales: {
          y: {
            beginAtZero: true, // you might want to add this
            suggestedMin: 2,
            suggestedMax: 2,
            ticks: {
              maxTicksLimit: 5,
              callback: (value) => formatValue(value),
            },
          },
          x: {
            type: "time",
            time: {
              tooltipFormat: "MMM DD, H:mm:ss a",
            },
            ticks: {
              autoSkipPadding: 48,
              maxRotation: 0,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            titleFont: {
              weight: "600",
            },
            callbacks: {
              label: (context) => formatValue(context.parsed.y),
            },
          },
        },
        interaction: {
          intersect: false,
          mode: "nearest",
        },
        animation: false,
        maintainAspectRatio: false,
        resizeDelay: 0,
      },
    });
  
    return () => {
      console.log('Cleaning up chart...');
      if (chart) {
        chart.destroy();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  // Update header values
  useEffect(() => {
    const currentValue = data.datasets[0].data[1];
    const previousValue = data.datasets[0].data[0];
    const diff = ((currentValue - previousValue) / previousValue) * 100;
    chartValue.current.innerHTML = currentBalance;
    if (diff > 0) {
      chartDeviation.current.style.backgroundColor =
        tailwindConfig().theme.colors.green[500];
    } else {
      chartDeviation.current.style.backgroundColor =
        tailwindConfig().theme.colors.red[500];
    }
    chartDeviation.current.innerHTML = `${
      diff == 0 ? "" : diff > 0 ? "+" : "-"
    }${Math.abs(diff.toFixed(2))}%`;
  }, [data]);

  return (
    <React.Fragment>
      <div className="px-5 py-3">
        <div className="flex items-start">
          <div className="text-3xl font-bold text-slate-800 mr-2 tabular-nums">
            {<span ref={chartValue}></span>}
          </div>
          <div
            ref={chartDeviation}
            className="text-sm font-semibold text-white px-1.5 rounded-full "
          ></div>
        </div>
      </div>
      <div className="grow">
        <canvas ref={canvas} data={data} width={width} height={height}></canvas>
      </div>
    </React.Fragment>
  );
}

export default RealtimeChart;
