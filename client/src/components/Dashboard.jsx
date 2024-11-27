import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  Flame,
  Zap,
  Activity,
  Cpu,
  Settings,
  Monitor,
  Wrench,
  Clock,
} from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const machines = {
    blowRoom: {
      name: "Blow Room",
      icon: <Flame className="text-blue-400" />,
      metrics: {
        temperature: { current: 45, optimal: { min: 25, max: 45 } },
        vibration: { current: 2.5, optimal: { max: 2.0 } },
        power: { current: 160, optimal: { max: 150 } },
        operationalHours: { current: 110, total: 500 },
      },
      historicalData: {
        temperature: [42, 44, 45, 46, 45],
        vibration: [2.6, 2.5, 2.4, 2.3, 2.5],
        power: [155, 158, 160, 162, 160],
        operationalHours: [100, 105, 110, 115, 110],
      },
      maintenance: {
        lastMaintenance: "2024-01-15",
        nextMaintenance: "2024-04-15",
        hoursUntilMaintenance: 390,
      },
    },
    carding: {
      name: "Carding",
      icon: <Cpu className="text-orange-400" />,
      metrics: {
        temperature: { current: 42, optimal: { min: 30, max: 50 } },
        vibration: { current: 1.8, optimal: { max: 2.5 } },
        power: { current: 140, optimal: { max: 140 } },
        operationalHours: { current: 230, total: 600 },
      },
      historicalData: {
        temperature: [40, 41, 42, 43, 42],
        vibration: [2.0, 1.9, 1.8, 1.7, 1.8],
        power: [135, 138, 140, 142, 140],
        operationalHours: [210, 220, 230, 240, 230],
      },
      maintenance: {
        lastMaintenance: "2024-02-01",
        nextMaintenance: "2024-07-01",
        hoursUntilMaintenance: 370,
      },
    },
    drawFrame: {
      name: "Draw Frame",
      icon: <Monitor className="text-green-400" />,
      metrics: {
        temperature: { current: 48, optimal: { min: 35, max: 55 } },
        vibration: { current: 3.0, optimal: { max: 2.5 } },
        power: { current: 170, optimal: { max: 160 } },
        operationalHours: { current: 300, total: 700 },
      },
      historicalData: {
        temperature: [45, 46, 48, 49, 48],
        vibration: [3.2, 3.1, 3.0, 2.9, 3.0],
        power: [165, 168, 170, 172, 170],
        operationalHours: [280, 290, 300, 310, 300],
      },
      maintenance: {
        lastMaintenance: "2024-02-10",
        nextMaintenance: "2024-08-10",
        hoursUntilMaintenance: 400,
      },
    },
    ringFrame: {
      name: "Ring Frame",
      icon: <Wrench className="text-purple-400" />,
      metrics: {
        temperature: { current: 43, optimal: { min: 30, max: 50 } },
        vibration: { current: 1.9, optimal: { max: 2.0 } },
        power: { current: 180, optimal: { max: 170 } },
        operationalHours: { current: 450, total: 800 },
      },
      historicalData: {
        temperature: [41, 42, 43, 44, 43],
        vibration: [2.0, 1.9, 1.8, 1.9, 1.9],
        power: [175, 178, 180, 182, 180],
        operationalHours: [430, 440, 450, 460, 450],
      },
      maintenance: {
        lastMaintenance: "2024-03-01",
        nextMaintenance: "2024-09-01",
        hoursUntilMaintenance: 350,
      },
    },
    autoconer: {
      name: "Autoconer",
      icon: <Settings className="text-teal-400" />,
      metrics: {
        temperature: { current: 50, optimal: { min: 40, max: 55 } },
        vibration: { current: 2.7, optimal: { max: 2.0 } },
        power: { current: 200, optimal: { max: 190 } },
        operationalHours: { current: 500, total: 900 },
      },
      historicalData: {
        temperature: [48, 49, 50, 51, 50],
        vibration: [2.8, 2.7, 2.6, 2.5, 2.7],
        power: [195, 198, 200, 202, 200],
        operationalHours: [480, 490, 500, 510, 500],
      },
      maintenance: {
        lastMaintenance: "2024-03-10",
        nextMaintenance: "2024-10-10",
        hoursUntilMaintenance: 400,
      },
    },
  };

  const [selectedMachine, setSelectedMachine] = useState("blowRoom");
  const [isAnimating, setIsAnimating] = useState(true);
  const currentMachine = machines[selectedMachine];

  useEffect(() => {
    const animationTimer = setTimeout(() => {
      setIsAnimating(false);
    }, 2000);

    return () => clearTimeout(animationTimer);
  }, [selectedMachine]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1500,
      easing: "easeInOutQuart",
    },
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Machine Metrics" },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const renderMetricStatus = (metric, value, optimal) => {
    if (typeof optimal.max === "number") {
      return value > optimal.max
        ? "High"
        : value < (optimal.min || 0)
        ? "Low"
        : "Optimal";
    }
    return "N/A";
  };

  const renderMetricCard = (title, value, optimalRange, icon) => (
    <div
      className={`
      bg-gray-800 rounded-lg p-4 flex flex-col 
      transform transition-all duration-500 
      ${isAnimating ? "scale-95 opacity-0" : "scale-100 opacity-100"}
    `}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-400">{title}</span>
        {icon}
      </div>
      <div className="flex justify-between items-center">
        <span className="text-2xl font-bold animate-pulse">{value}</span>
        <span
          className={`
          text-sm font-semibold
          ${
            renderMetricStatus(title, parseFloat(value), optimalRange) ===
            "Optimal"
              ? "text-green-500"
              : "text-red-500"
          }
        `}
        >
          {renderMetricStatus(title, parseFloat(value), optimalRange)}
        </span>
      </div>
      <div className="text-xs text-gray-500 mt-1">
        Optimal: {optimalRange.min || 0} - {optimalRange.max}
      </div>
    </div>
  );

  const createMetricChart = (title, data, color) => {
    const chartData = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May"],
      datasets: [
        {
          label: title,
          data: data,
          borderColor: color,
          backgroundColor: color.replace("rgb", "rgba").replace(")", ", 0.1)"),
          tension: 0.1,
          fill: true,
        },
      ],
    };

    return (
      <div
        className={`
        bg-gray-800 rounded-lg p-6 h-80 
        transform transition-all duration-700 
        ${
          isAnimating ? "translate-y-10 opacity-0" : "translate-y-0 opacity-100"
        }
      `}
      >
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <Line data={chartData} options={chartOptions} />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-4">
      <div className="container mx-auto">
        <h1
          className={`
          text-3xl font-bold mb-6 text-center text-transparent bg-clip-text 
          bg-gradient-to-r from-blue-400 to-purple-600
          animate-gradient-x
        `}
        >
          ZietSense - Industrial Machine Intelligence
        </h1>

        {/* Machine Selector */}
        <div className="flex justify-center space-x-4 mb-6">
          {Object.entries(machines).map(([key, machine]) => (
            <button
              key={key}
              onClick={() => {
                setSelectedMachine(key);
                setIsAnimating(true);
              }}
              className={`
                flex items-center space-x-2 px-4 py-2 rounded-lg transition-all 
                hover:scale-105 hover:shadow-lg
                ${
                  selectedMachine === key
                    ? "bg-blue-600 text-white"
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                }
              `}
            >
              {machine.icon}
              <span>{machine.name}</span>
            </button>
          ))}
        </div>

        {/* Metrics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {renderMetricCard(
            "Temperature",
            `${currentMachine.metrics.temperature.current}°C`,
            currentMachine.metrics.temperature.optimal,
            <Flame className="text-red-400" />
          )}
          {renderMetricCard(
            "Vibration",
            `${currentMachine.metrics.vibration.current} m/s²`,
            currentMachine.metrics.vibration.optimal,
            <Activity className="text-blue-400" />
          )}
          {renderMetricCard(
            "Power",
            `${currentMachine.metrics.power.current} W`,
            currentMachine.metrics.power.optimal,
            <Zap className="text-yellow-400" />
          )}
          {renderMetricCard(
            "Operational Hours",
            `${currentMachine.metrics.operationalHours.current}/${currentMachine.metrics.operationalHours.total}`,
            { min: 0, max: currentMachine.metrics.operationalHours.total },
            <Clock className="text-green-400" />
          )}
        </div>

        {/* Performance Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {createMetricChart(
            "Temperature",
            currentMachine.historicalData.temperature,
            "rgb(255, 99, 132)"
          )}
          {createMetricChart(
            "Vibration",
            currentMachine.historicalData.vibration,
            "rgb(54, 162, 235)"
          )}
          {createMetricChart(
            "Power",
            currentMachine.historicalData.power,
            "rgb(75, 192, 192)"
          )}
          {createMetricChart(
            "Operational Hours",
            currentMachine.historicalData.operationalHours,
            "rgb(153, 102, 255)"
          )}
        </div>

        {/* Maintenance Section */}
        <div
          className={`
          bg-gray-800 rounded-lg p-6 
          transform transition-all duration-1000 
          ${isAnimating ? "scale-95 opacity-0" : "scale-100 opacity-100"}
        `}
        >
          <h2 className="text-xl font-bold mb-4">Maintenance Overview</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <p className="text-gray-400">Last Maintenance</p>
              <p className="font-semibold">
                {currentMachine.maintenance.lastMaintenance}
              </p>
            </div>
            <div>
              <p className="text-gray-400">Next Maintenance</p>
              <p className="font-semibold">
                {currentMachine.maintenance.nextMaintenance}
              </p>
            </div>
            <div>
              <p className="text-gray-400">Hours Until Maintenance</p>
              <p className="font-semibold text-yellow-500">
                {currentMachine.maintenance.hoursUntilMaintenance}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
