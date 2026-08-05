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
import { FaIndustry, FaCheckCircle, FaExclamationTriangle, FaChartBar, FaChartPie } from "react-icons/fa";
import { MdDashboard, MdProductionQuantityLimits } from "react-icons/md";
import { AiFillThunderbolt } from "react-icons/ai";
import client from "../types/mqtt";
import logo from "../public/logo.jpg";

interface MQTTStatus {
  ProductionValue: number;
  ActualProduction: number;
  timestamp: number;
}

const MQTTDashboard: React.FC = () => {
  const [connected, setConnected] = useState<boolean>(false);
  const [production, setProduction] = useState<number>(0);
  const [actualProduction, setActualProduction] = useState<number>(0);
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
    <div className="h-screen bg-gradient-to-br from-gray-900 via-[#203f78] to-[#1a335a] relative overflow-hidden flex items-center justify-center">
      {/* Animated Background Blobs */}
      <motion.div
        className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-[#203f78]/30 to-[#2a4d8a]/30 rounded-full blur-3xl"
        animate={{ x: [0, 100, 0], y: [0, 50, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-[#1a335a]/25 to-[#203f78]/25 rounded-full blur-3xl"
        animate={{ x: [0, -80, 0], y: [0, -60, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Floating Particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-1 h-1 rounded-full ${i % 3 === 0 ? "bg-[#203f78]" : i % 3 === 1 ? "bg-[#2a4d8a]" : "bg-[#ddaf26]"
            }`}
          animate={{
            x: [0, Math.random() * 150 - 75],
            y: [0, Math.random() * 150 - 75],
            opacity: [0, 1, 0],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
          style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
        />
      ))}

      <div className="w-full max-w-[1600px] mx-auto px-2 sm:px-3 md:px-4 py-2 relative z-10 h-full max-h-screen flex flex-col">
        {/* Header with Logo & Status - Compact */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-2 mb-2 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-2 sm:p-3 flex-shrink-0"
        >
          {/* Left: PLC Live Dashboard */}
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
            <MdDashboard className="text-[#ddaf26] text-xl sm:text-2xl" />
            <div>
              <h1 className="text-base sm:text-lg md:text-xl font-bold text-white font-poppins">
                PLC <span className="text-[#ddaf26]">Live</span> Dashboard
              </h1>
              <p className="text-gray-400 text-[10px] sm:text-xs hidden xs:block">Real-time Production Monitoring</p>
            </div>
          </div>

          {/* Center: Logo */}
          <div className="flex items-center justify-center w-full sm:w-auto">
            <img src={logo} alt="Logo" className="h-8 sm:h-10 md:h-12 w-auto object-contain" />
          </div>

          {/* Right: Status Badge */}
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-end">
            <div className="text-right">
              <p className="text-gray-400 text-[8px] sm:text-[10px] uppercase tracking-wider">Last Update</p>
              <p className="text-white text-[10px] sm:text-xs font-mono truncate max-w-[100px] sm:max-w-none">{timestamp || "Waiting..."}</p>
            </div>
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border ${connected
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                : "bg-red-500/10 border-red-500/30 text-red-400"
                }`}
            >
              <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${connected ? "bg-emerald-400" : "bg-red-400"} animate-pulse`} />
              <span className="text-[10px] sm:text-xs font-semibold">{connected ? "Connected" : "Disconnected"}</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Metric Cards - Compact with better visibility */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 mb-2 flex-shrink-0">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: metric.delay }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="group relative bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-lg border border-white/10 rounded-xl p-3 overflow-hidden shadow-lg"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${metric.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-1">
                  <div className={`p-1.5 sm:p-2 rounded-lg ${metric.bgColor}`}>
                    <metric.icon className={`text-lg sm:text-xl ${metric.color}`} />
                  </div>
                  <motion.div
                    className="w-1.5 h-1.5 bg-[#ddaf26] rounded-full"
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                  />
                </div>
                <h3 className="text-gray-300 text-[10px] sm:text-xs uppercase tracking-wider mb-0.5">{metric.title}</h3>
                <motion.p
                  key={metric.value}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-xl sm:text-2xl md:text-3xl font-bold text-white font-mono"
                >
                  {metric.value}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Rejection Rate Banner - Compact */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-2 bg-gray-800/80 backdrop-blur-lg border border-white/10 rounded-xl p-2 flex items-center justify-between flex-shrink-0 shadow-lg"
        >
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-[#ddaf26]/20 rounded-lg flex items-center justify-center">
              <FaChartBar className="text-[#ddaf26] text-sm sm:text-base" />
            </div>
            <div>
              <p className="text-gray-400 text-[9px] sm:text-[10px]">Rejection Rate</p>
              <p className="text-white font-bold text-sm sm:text-base">{rejectionRate}%</p>
            </div>
          </div>
          <div className="hidden md:block h-6 w-px bg-white/10" />
          <div className="hidden md:flex items-center gap-2 text-xs text-gray-400">
            <span className="w-2 h-2 rounded-full bg-[#3b6cb0]" /> Actual
            <span className="w-2 h-2 rounded-full bg-[#ddaf26] ml-1" /> Scrap
          </div>
          <div className="md:hidden flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#3b6cb0]" />
            <span className="w-2 h-2 rounded-full bg-[#ddaf26]" />
          </div>
        </motion.div>

        {/* Charts Section - Flex grow to fill remaining space */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-3 flex-1 min-h-0">
          {/* Bar Chart */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="bg-gray-800/80 backdrop-blur-lg border border-white/10 rounded-xl p-2 sm:p-3 flex flex-col shadow-lg"
          >
            <div className="flex items-center justify-between mb-1 sm:mb-2 flex-shrink-0">
              <h3 className="text-white font-bold text-xs sm:text-sm flex items-center gap-2">
                <span className="w-1 h-4 sm:h-5 bg-gradient-to-b from-[#203f78] to-[#ddaf26] rounded-full" />
                Production Overview
              </h3>
              <FaChartBar className="text-gray-400 text-sm sm:text-base" />
            </div>
            <div className="flex-1 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} barGap={8}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(26, 51, 90, 0.95)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "8px",
                      color: "#fff",
                      fontSize: "11px",
                      padding: "6px 10px",
                    }}
                    cursor={{ fill: "rgba(255,255,255,0.02)" }}
                  />
                  <Legend
                    wrapperStyle={{ paddingTop: "0.3rem", fontSize: "10px" }}
                    formatter={(value) => <span className="text-gray-300 text-[10px]">{value}</span>}
                  />
                  <Bar dataKey="Actual" fill="#3b6cb0" radius={[4, 4, 0, 0]} maxBarSize={50} />
                  <Bar dataKey="Scrap" fill="#ddaf26" radius={[4, 4, 0, 0]} maxBarSize={50} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Pie Chart */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-gray-800/80 backdrop-blur-lg border border-white/10 rounded-xl p-2 sm:p-3 flex flex-col shadow-lg"
          >
            <div className="flex items-center justify-between mb-1 sm:mb-2 flex-shrink-0">
              <h3 className="text-white font-bold text-xs sm:text-sm flex items-center gap-2">
                <span className="w-1 h-4 sm:h-5 bg-gradient-to-b from-[#ddaf26] to-[#203f78] rounded-full" />
                Production Distribution
              </h3>
              <FaChartPie className="text-gray-400 text-sm sm:text-base" />
            </div>
            <div className="flex-1 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={35}
                    outerRadius={65}
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
                      borderRadius: "8px",
                      color: "#fff",
                      fontSize: "11px",
                      padding: "6px 10px",
                    }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    height={25}
                    wrapperStyle={{ fontSize: "10px" }}
                    formatter={(value) => <span className="text-gray-300 text-[10px]">{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Footer - Minimal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-1 text-center text-gray-500 text-[8px] sm:text-[10px] flex-shrink-0"
        >
          <p className="flex items-center justify-center gap-1">
            <AiFillThunderbolt className="text-[#ddaf26] text-[10px] sm:text-xs" />
            PLC Monitoring System • Real-time Data via MQTT
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default MQTTDashboard;