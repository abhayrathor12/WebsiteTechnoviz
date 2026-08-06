import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { FaIndustry, FaCheckCircle, FaExclamationTriangle, FaChartBar, FaChartPie, FaPowerOff, FaPlay } from "react-icons/fa";
import { MdDashboard, MdProductionQuantityLimits } from "react-icons/md";
import { AiFillThunderbolt } from "react-icons/ai";
import client from "../types/mqtt";
import logo from "../public/logo.jpg";

interface MQTTStatus {
  ProductionValue: number;
  ActualProduction: number;
  MachineRunning: boolean;
  timestamp: number;
}

const MQTTDashboard: React.FC = () => {
  const [connected, setConnected] = useState<boolean>(false);
  const [production, setProduction] = useState<number>(0);
  const [actualProduction, setActualProduction] = useState<number>(0);
  const [machineRunning, setMachineRunning] = useState<boolean>(false);
  const [timestamp, setTimestamp] = useState<string>("");

  useEffect(() => {
    const handleConnect = () => {
      console.log("Connected to MQTT");
      setConnected(true);

      client.subscribe("myhome/test1", (err) => {
        if (err) {
          console.error("Subscribe Error:", err);
        } else {
          console.log("Subscribed Successfully");
        }
      });
    };

    const handleClose = () => {
      setConnected(false);
    };

    const handleMessage = (_topic: string, message: Uint8Array) => {
      try {
        const data = JSON.parse(new TextDecoder().decode(message));
        const status: MQTTStatus = data.payload[0].status;

        const productionValue = status.ProductionValue / 65536;
        const actualProductionValue = status.ActualProduction / 65536;

        setProduction(productionValue);
        setActualProduction(actualProductionValue);
        setMachineRunning(status.MachineRunning);
        setTimestamp(new Date(status.timestamp * 1000).toLocaleString());
      } catch (err) {
        console.error("Invalid MQTT Message:", err);
      }
    };

    client.on("connect", handleConnect);
    client.on("message", handleMessage);
    client.on("close", handleClose);

    return () => {
      client.removeListener("connect", handleConnect);
      client.removeListener("message", handleMessage);
      client.removeListener("close", handleClose);
    };
  }, []);

  const rejectedProduction = production - actualProduction;
  const rejectionRate = production > 0 ? ((rejectedProduction / production) * 100).toFixed(1) : "0.0";

  const barData = [
    {
      name: "Production",
      Actual: Number(actualProduction.toFixed(2)),
      Scrap: Number(rejectedProduction.toFixed(2)),
    },
  ];

  const pieData = [
    { name: "Actual Production", value: Number(actualProduction.toFixed(2)), color: "#3b6cb0" },
    { name: "Scrap", value: Number(Math.max(0, rejectedProduction).toFixed(2)), color: "#ddaf26" },
  ];

  const metrics = [
    {
      title: "Production Value",
      value: production.toFixed(2),
      icon: FaIndustry,
      color: "text-blue-400",
      bgColor: "bg-blue-500/20",
      gradient: "from-[#203f78] to-[#2a4d8a]",
      delay: 0,
    },
    {
      title: "Actual Production",
      value: actualProduction.toFixed(2),
      icon: FaCheckCircle,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/20",
      gradient: "from-[#1a4a3a] to-[#2a6a4a]",
      delay: 0.1,
    },
    {
      title: "Rejected Production",
      value: Math.max(0, rejectedProduction).toFixed(2),
      icon: FaExclamationTriangle,
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/20",
      gradient: "from-[#8a6a1a] to-[#6a4a1a]",
      delay: 0.2,
    },
  ];

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-gray-900 via-[#203f78] to-[#1a335a] relative overflow-hidden flex items-center justify-center">
      {/* Animated Background Blobs - Hidden on mobile */}
      <motion.div
        className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-[#203f78]/30 to-[#2a4d8a]/30 rounded-full blur-3xl hidden sm:block"
        animate={{ x: [0, 100, 0], y: [0, 50, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-[#1a335a]/25 to-[#203f78]/25 rounded-full blur-3xl hidden sm:block"
        animate={{ x: [0, -80, 0], y: [0, -60, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <div className="w-full h-full max-w-[1600px] mx-auto px-1.5 sm:px-3 md:px-4 py-1.5 sm:py-2 relative z-10 flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-wrap items-center justify-between gap-1 sm:gap-2 mb-1.5 sm:mb-2 bg-white/5 backdrop-blur-lg border border-white/10 rounded-lg sm:rounded-xl p-1.5 sm:p-3 flex-shrink-0"
        >
          {/* Left: PLC Live Dashboard */}
          <div className="flex items-center gap-1.5 sm:gap-3 flex-1 min-w-[120px]">
            <MdDashboard className="text-[#ddaf26] text-base sm:text-xl md:text-2xl flex-shrink-0" />
            <div>
              <h1 className="text-xs sm:text-base md:text-xl font-bold text-white font-poppins leading-tight">
                Live <span className="text-[#ddaf26]">Production</span>
                <span className="hidden xs:inline"> Dashboard</span>
              </h1>
              <p className="text-gray-400 text-[8px] sm:text-xs hidden xs:block">Real-time Production Monitoring</p>
            </div>
          </div>

          {/* Center: Logo */}
          <div className="flex items-center justify-center flex-shrink-0">
            <img src={logo} alt="Logo" className="h-6 sm:h-8 md:h-10 w-auto object-contain" />
            <span className="text-[10px] sm:text-xs text-gray-300 ml-1 sm:ml-2 font-semibold hidden xs:inline">TechnoViz</span>
          </div>

          {/* Right: Machine Status & Connection Status */}
          <div className="flex items-center gap-1 sm:gap-3 flex-1 min-w-[100px] justify-end">
            {/* Machine Running Status */}
            <motion.div
              animate={{ scale: machineRunning ? [1, 1.05, 1] : 1 }}
              transition={{ duration: 2, repeat: machineRunning ? Infinity : 0 }}
              className={`flex items-center gap-1 px-1.5 sm:px-3 py-0.5 sm:py-1.5 rounded-full border ${machineRunning
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                  : "bg-red-500/10 border-red-500/30 text-red-400"
                }`}
            >
              {machineRunning ? (
                <FaPlay className="text-[6px] sm:text-[8px] md:text-[10px]" />
              ) : (
                <FaPowerOff className="text-[6px] sm:text-[8px] md:text-[10px]" />
              )}
              <span className={`w-1 h-1 sm:w-2 sm:h-2 rounded-full ${machineRunning ? "bg-emerald-400 animate-pulse" : "bg-red-400"}`} />
              <span className="text-[8px] sm:text-xs font-semibold hidden xs:inline">
                {machineRunning ? "Running" : "Stopped"}
              </span>
            </motion.div>

            {/* MQTT Connection Status */}
            <div className="text-right hidden xs:block">
              <p className="text-gray-400 text-[6px] sm:text-[10px] uppercase tracking-wider">Last Update</p>
              <p className="text-white text-[8px] sm:text-xs font-mono truncate max-w-[60px] sm:max-w-[100px]">{timestamp || "Waiting..."}</p>
            </div>
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className={`flex items-center gap-1 px-1.5 sm:px-3 py-0.5 sm:py-1.5 rounded-full border ${connected
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                  : "bg-red-500/10 border-red-500/30 text-red-400"
                }`}
            >
              <span className={`w-1 h-1 sm:w-2 sm:h-2 rounded-full ${connected ? "bg-emerald-400" : "bg-red-400"} animate-pulse`} />
              <span className="text-[8px] sm:text-xs font-semibold">{connected ? "Live" : "Offline"}</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Machine Status Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="grid grid-cols-1 sm:grid-cols-4 gap-1 sm:gap-2 md:gap-3 mb-1.5 sm:mb-2 flex-shrink-0"
        >
          {/* Machine Status Indicator Card */}
          <motion.div
            whileHover={{ y: -2 }}
            className={`group relative backdrop-blur-lg border rounded-lg sm:rounded-xl p-1.5 sm:p-3 shadow-lg ${machineRunning
                ? "bg-gradient-to-br from-emerald-900/30 to-emerald-800/20 border-emerald-500/30"
                : "bg-gradient-to-br from-red-900/30 to-red-800/20 border-red-500/30"
              }`}
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${machineRunning ? "from-emerald-500/10 to-emerald-400/5" : "from-red-500/10 to-red-400/5"
              } opacity-5 group-hover:opacity-15 transition-opacity duration-500 rounded-lg sm:rounded-xl`} />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-0.5 sm:mb-1">
                <div className={`p-1 sm:p-2 rounded-lg ${machineRunning ? "bg-emerald-500/20" : "bg-red-500/20"
                  }`}>
                  {machineRunning ? (
                    <FaPlay className="text-emerald-400 text-xs sm:text-base md:text-xl" />
                  ) : (
                    <FaPowerOff className="text-red-400 text-xs sm:text-base md:text-xl" />
                  )}
                </div>
                <motion.div
                  className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full ${machineRunning ? "bg-emerald-400" : "bg-red-400"
                    }`}
                  animate={machineRunning ? { scale: [1, 1.5, 1], opacity: [1, 0.5, 1] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <h3 className="text-[6px] sm:text-[10px] md:text-xs text-gray-300 uppercase tracking-wider mb-0.5 truncate">Machine Status</h3>
              <motion.p
                key={machineRunning ? "running" : "stopped"}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`text-xs sm:text-xl md:text-3xl font-bold font-mono ${machineRunning ? "text-emerald-400" : "text-red-400"
                  }`}
              >
                {machineRunning ? "RUNNING" : "STOPPED"}
              </motion.p>
            </div>
          </motion.div>

          {/* Production Metric Cards */}
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: metric.delay + 0.05 }}
              whileHover={{ y: -2 }}
              className="group relative bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-lg border border-white/10 rounded-lg sm:rounded-xl p-1.5 sm:p-3 shadow-lg"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${metric.gradient} opacity-5 group-hover:opacity-15 transition-opacity duration-500 rounded-lg sm:rounded-xl`} />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-0.5 sm:mb-1">
                  <div className={`p-1 sm:p-2 rounded-lg ${metric.bgColor}`}>
                    <metric.icon className={`text-xs sm:text-base md:text-xl ${metric.color}`} />
                  </div>
                  <motion.div
                    className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#ddaf26] rounded-full"
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                  />
                </div>
                <h3 className="text-[6px] sm:text-[10px] md:text-xs text-gray-300 uppercase tracking-wider mb-0.5 truncate">{metric.title}</h3>
                <motion.p
                  key={metric.value}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-xs sm:text-xl md:text-3xl font-bold text-white font-mono"
                >
                  {metric.value}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Rejection Rate Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-1.5 sm:mb-2 bg-gray-800/80 backdrop-blur-lg border border-white/10 rounded-lg sm:rounded-xl p-1.5 sm:p-2 flex items-center justify-between flex-shrink-0 shadow-lg"
        >
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-[#ddaf26]/20 rounded-lg flex items-center justify-center">
              <FaChartBar className="text-[#ddaf26] text-[10px] sm:text-sm md:text-base" />
            </div>
            <div>
              <p className="text-gray-400 text-[7px] sm:text-[10px]">Rejection Rate</p>
              <p className="text-white font-bold text-xs sm:text-sm md:text-base">{rejectionRate}%</p>
            </div>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <span className="text-[8px] sm:text-xs text-gray-400 hidden xs:inline">Actual</span>
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#3b6cb0]" />
            <span className="text-[8px] sm:text-xs text-gray-400 hidden xs:inline">Scrap</span>
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#ddaf26]" />
          </div>
        </motion.div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 md:gap-3 flex-1 min-h-0">
          {/* Bar Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gray-800/80 backdrop-blur-lg border border-white/10 rounded-lg sm:rounded-xl p-1.5 sm:p-3 flex flex-col shadow-lg"
          >
            <div className="flex items-center justify-between mb-0.5 sm:mb-2 flex-shrink-0">
              <h3 className="text-white font-bold text-[8px] sm:text-xs md:text-sm flex items-center gap-1 sm:gap-2">
                <span className="w-0.5 h-3 sm:h-4 md:h-5 bg-gradient-to-b from-[#203f78] to-[#ddaf26] rounded-full" />
                Production Overview
              </h3>
              <FaChartBar className="text-gray-400 text-xs sm:text-sm md:text-base" />
            </div>
            <div className="flex-1 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} barGap={4}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={8} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={8} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(26, 51, 90, 0.95)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "6px",
                      color: "#fff",
                      fontSize: "10px",
                      padding: "4px 8px",
                    }}
                    cursor={{ fill: "rgba(255,255,255,0.02)" }}
                  />
                  <Legend
                    wrapperStyle={{ paddingTop: "0.2rem", fontSize: "8px" }}
                    formatter={(value) => <span className="text-gray-300 text-[8px]">{value}</span>}
                  />
                  <Bar dataKey="Actual" fill="#3b6cb0" radius={[3, 3, 0, 0]} maxBarSize={30} />
                  <Bar dataKey="Scrap" fill="#ddaf26" radius={[3, 3, 0, 0]} maxBarSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Pie Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-gray-800/80 backdrop-blur-lg border border-white/10 rounded-lg sm:rounded-xl p-1.5 sm:p-3 flex flex-col shadow-lg"
          >
            <div className="flex items-center justify-between mb-0.5 sm:mb-2 flex-shrink-0">
              <h3 className="text-white font-bold text-[8px] sm:text-xs md:text-sm flex items-center gap-1 sm:gap-2">
                <span className="w-0.5 h-3 sm:h-4 md:h-5 bg-gradient-to-b from-[#ddaf26] to-[#203f78] rounded-full" />
                Production Distribution
              </h3>
              <FaChartPie className="text-gray-400 text-xs sm:text-sm md:text-base" />
            </div>
            <div className="flex-1 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={25}
                    outerRadius={45}
                    paddingAngle={3}
                    dataKey="value"
                    stroke="none"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(26, 51, 90, 0.95)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "6px",
                      color: "#fff",
                      fontSize: "10px",
                      padding: "4px 8px",
                    }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    height={20}
                    wrapperStyle={{ fontSize: "8px" }}
                    formatter={(value) => <span className="text-gray-300 text-[8px]">{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-0.5 sm:mt-1 text-center text-gray-500 text-[6px] sm:text-[10px] flex-shrink-0"
        >
          <p className="flex items-center justify-center gap-0.5 sm:gap-1">
            <AiFillThunderbolt className="text-[#ddaf26] text-[8px] sm:text-xs" />
            <span className="hidden xs:inline">PLC Monitoring System • </span>
            Real-time Data via MQTT
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default MQTTDashboard;