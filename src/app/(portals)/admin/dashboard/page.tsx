"use client";

import React from "react";
import {
  Users,
  Store,
  ShoppingBag,
  TrendingUp,
  LucideIcon
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

// Mock Data
const orderHistory = [
  { month: "Jan", orders: 400 },
  { month: "Feb", orders: 300 },
  { month: "Mar", orders: 600 },
  { month: "Apr", orders: 200 },
  { month: "May", orders: 500 },
  { month: "Jun", orders: 450 },
  { month: "Jul", orders: 700 },
  { month: "Aug", orders: 800 },
  { month: "Sep", orders: 550 },
  { month: "Oct", orders: 900 },
  { month: "Nov", orders: 850 },
  { month: "Dec", orders: 1100 },
];

const distribution = [
  { name: "Users", value: 580, color: "var(--info-text)" },
  { name: "Vendors", value: 89, color: "var(--primary-text)" },
  { name: "Orders", value: 1204, color: "var(--success-text)" },
];

const recentOrders = [
  { id: "#001234", customer: "John Doe", vendor: "Organic Farms", amount: "$120.00", status: "Completed" },
  { id: "#001235", customer: "Jane Smith", vendor: "Tech Hub", amount: "$450.00", status: "In Progress" },
  { id: "#001236", customer: "Mike Ross", vendor: "Fashion Street", amount: "$89.50", status: "Pending" },
  { id: "#001237", customer: "Sarah Connor", vendor: "Bake Shop", amount: "$32.00", status: "Cancelled" },
  { id: "#001238", customer: "Dave Lister", vendor: "Star Curry", amount: "$15.00", status: "Completed" },
];

interface StatCardProps {
  label: string;
  value: string;
  trend: string;
  icon: LucideIcon;
  data: any[];
}

const StatCard = ({ label, value, trend, icon: Icon, data }: StatCardProps) => (
  <div
    style={{
      backgroundColor: "var(--color-0)",
      border: "1px solid var(--color-100)",
      borderRadius: "var(--radius-2xl)",
      padding: "clamp(1rem, 3vw, 1.5rem)",
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: "0.75rem",
      minWidth: "min(100%, 240px)",
      boxSizing: "border-box",
    }}
  >
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      <div
        style={{
          width: "2.25rem",
          height: "2.25rem",
          borderRadius: "10px",
          backgroundColor: "var(--color-primary-light)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon size="1.1rem" color="var(--color-primary)" />
      </div>
      <div style={{ width: "60px", height: "30px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <Bar dataKey="val" fill="var(--color-primary)" radius={[2, 2, 0, 0]} opacity={0.4} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
    
    <div>
      <div style={{ fontSize: "clamp(1.5rem, 4vw, 1.875rem)", fontWeight: 700, color: "var(--color-900)" }}>{value}</div>
      <div style={{ fontSize: "0.75rem", color: "var(--color-500)", fontWeight: 500 }}>{label}</div>
    </div>

    <div style={{ fontSize: "0.7rem", fontWeight: 600, color: "var(--color-success)" }}>
      {trend}
    </div>
  </div>
);

const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, React.CSSProperties> = {
    "Completed": { backgroundColor: "var(--success-bg)", color: "var(--success-text)" },
    "In Progress": { backgroundColor: "var(--warning-bg)", color: "var(--warning-text)" },
    "Pending": { backgroundColor: "var(--info-bg)", color: "var(--info-text)" },
    "Cancelled": { backgroundColor: "var(--error-bg)", color: "var(--error-text)" },
  };
  
  return (
    <span
      style={{
        padding: "4px 10px",
        borderRadius: "999px",
        fontSize: "0.7rem",
        fontWeight: 600,
        ...styles[status]
      }}
    >
      {status}
    </span>
  );
};

export default function AdminDashboardPage() {
  const miniChartData = [
    { val: 10 }, { val: 20 }, { val: 15 }, { val: 30 }, { val: 25 }, { val: 40 }
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "clamp(1rem, 4vw, 1.5rem)" }}>
      
      {/* ROW 1: Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "clamp(1rem, 3vw, 1.5rem)" }}>
        <StatCard label="Total Users" value="158" trend="+12.4% this month" icon={Users} data={miniChartData} />
        <StatCard label="Total Vendors" value="89" trend="+8.1% this month" icon={Store} data={miniChartData} />
        <StatCard label="Total Orders" value="24" trend="+20.3% last month" icon={ShoppingBag} data={miniChartData} />
        <StatCard label="Revenue" value="$42,350" trend="+15.7% last month" icon={TrendingUp} data={miniChartData} />
      </div>

      {/* ROW 2: Charts */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "clamp(1rem, 3vw, 1.5rem)" }}>
        {/* Overview Chart */}
        <div
          style={{
            backgroundColor: "var(--color-0)",
            border: "1px solid var(--color-100)",
            borderRadius: "var(--radius-2xl)",
            padding: "clamp(1rem, 3vw, 1.5rem)",
            gridColumn: "span 1",
          }}
          className="lg:col-span-2"
        >
          <h3 style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--color-900)", marginBottom: "clamp(1rem, 3vw, 1.5rem)" }}>Overview</h3>
          <div style={{ width: "100%", height: "clamp(240px, 40vw, 300px)" }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={orderHistory}>
                <defs>
                  <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-100)" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "var(--color-400)" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "var(--color-400)" }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "var(--color-0)", border: "1px solid var(--color-100)", borderRadius: "8px" }}
                  labelStyle={{ fontWeight: 600, color: "var(--color-900)" }}
                />
                <Area type="monotone" dataKey="orders" stroke="var(--color-primary)" strokeWidth={2} fillOpacity={1} fill="url(#colorOrders)" dot={{ r: 4, fill: "var(--color-primary)" }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Distribution Chart */}
        <div
          style={{
            backgroundColor: "var(--color-0)",
            border: "1px solid var(--color-100)",
            borderRadius: "var(--radius-2xl)",
            padding: "clamp(1rem, 3vw, 1.5rem)",
            gridColumn: "span 1",
          }}
        >
          <h3 style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--color-900)", marginBottom: "clamp(1rem, 3vw, 1.5rem)" }}>Distribution</h3>
          <div style={{ width: "100%", height: "clamp(240px, 40vw, 300px)" }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={distribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {distribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend layout="horizontal" verticalAlign="bottom" align="center" wrapperStyle={{ fontSize: "11px", paddingTop: "10px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ROW 3: Table */}
      <div
        style={{
          backgroundColor: "var(--color-0)",
          border: "1px solid var(--color-100)",
          borderRadius: "var(--radius-2xl)",
          padding: "clamp(1rem, 3vw, 1.5rem)",
          overflow: "hidden"
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "clamp(1rem, 3vw, 1.5rem)", flexWrap: "wrap", gap: "1rem" }}>
          <h3 style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--color-900)", margin: 0 }}>Recent Orders</h3>
          <select 
            style={{ 
              fontSize: "0.75rem", 
              padding: "0.4rem 0.75rem", 
              borderRadius: "8px", 
              border: "1px solid var(--color-100)",
              backgroundColor: "var(--color-50)",
              color: "var(--color-700)",
              outline: "none"
            }}
          >
            <option>All Status</option>
            <option>Completed</option>
            <option>Pending</option>
          </select>
        </div>

        <div style={{ width: "100%", overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
          <table style={{ width: "100%", minWidth: "700px", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ textAlign: "left" }}>
                {["Order ID", "Customer", "Vendor", "Amount", "Status"].map((h) => (
                  <th key={h} style={{ fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--color-400)", borderBottom: "1px solid var(--color-100)", padding: "1rem" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order, idx) => (
                <tr 
                  key={idx} 
                  style={{ cursor: "pointer", transition: "all 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--color-50)")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                >
                  <td style={{ fontSize: "0.825rem", color: "var(--color-700)", padding: "1rem", borderBottom: "1px solid var(--color-100)" }}>{order.id}</td>
                  <td style={{ fontSize: "0.825rem", color: "var(--color-900)", fontWeight: 500, padding: "1rem", borderBottom: "1px solid var(--color-100)" }}>{order.customer}</td>
                  <td style={{ fontSize: "0.825rem", color: "var(--color-700)", padding: "1rem", borderBottom: "1px solid var(--color-100)" }}>{order.vendor}</td>
                  <td style={{ fontSize: "0.825rem", color: "var(--color-900)", fontWeight: 600, padding: "1rem", borderBottom: "1px solid var(--color-100)" }}>{order.amount}</td>
                  <td style={{ fontSize: "0.825rem", padding: "1rem", borderBottom: "1px solid var(--color-100)" }}>
                    <StatusBadge status={order.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
