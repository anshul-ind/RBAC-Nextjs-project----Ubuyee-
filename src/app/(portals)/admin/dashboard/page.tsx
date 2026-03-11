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
      backgroundColor: "var(--neutral-bg)",
      border: "1px solid var(--neutral-border)",
      borderRadius: "12px",
      padding: "1.5rem",
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: "0.75rem",
      minWidth: "16rem",
    }}
  >
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      <div
        style={{
          width: "2.5rem",
          height: "2.5rem",
          borderRadius: "8px",
          backgroundColor: "var(--primary-bg)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon size="1.25rem" color="var(--primary-text)" />
      </div>
      <div style={{ width: "80px", height: "40px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <Bar dataKey="val" fill="var(--primary-text)" radius={[2, 2, 0, 0]} opacity={0.6} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
    
    <div>
      <div style={{ fontSize: "1.875rem", fontWeight: 800, color: "var(--accent-text)" }}>{value}</div>
      <div style={{ fontSize: "0.8rem", color: "var(--neutral-muted)" }}>{label}</div>
    </div>

    <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--success-text)" }}>
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
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      
      {/* ROW 1: Stats */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem" }}>
        <StatCard label="Total Users" value="158" trend="+12.4% this month" icon={Users} data={miniChartData} />
        <StatCard label="Total Vendors" value="89" trend="+8.1% this month" icon={Store} data={miniChartData} />
        <StatCard label="Total Orders" value="24" trend="+20.3% last month" icon={ShoppingBag} data={miniChartData} />
        <StatCard label="Revenue" value="$42,350" trend="+15.7% last month" icon={TrendingUp} data={miniChartData} />
      </div>

      {/* ROW 2: Charts */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem" }}>
        {/* Overview Chart */}
        <div
          style={{
            flex: 1.5,
            minWidth: "30rem",
            backgroundColor: "var(--neutral-bg)",
            border: "1px solid var(--neutral-border)",
            borderRadius: "12px",
            padding: "1.5rem",
          }}
        >
          <h3 style={{ fontSize: "1.0rem", fontWeight: 700, color: "var(--accent-text)", marginBottom: "1.5rem" }}>Overview</h3>
          <div style={{ width: "100%", height: "280px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={orderHistory}>
                <defs>
                  <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary-text)" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="var(--primary-text)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--neutral-border)" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "var(--neutral-muted)" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "var(--neutral-muted)" }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "var(--neutral-bg)", border: "1px solid var(--neutral-border)", borderRadius: "8px" }}
                  labelStyle={{ fontWeight: 600, color: "var(--accent-text)" }}
                />
                <Area type="monotone" dataKey="orders" stroke="var(--primary-text)" strokeWidth={2} fillOpacity={1} fill="url(#colorOrders)" dot={{ r: 4, fill: "var(--primary-text)" }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Distribution Chart */}
        <div
          style={{
            flex: 1,
            minWidth: "20rem",
            backgroundColor: "var(--neutral-bg)",
            border: "1px solid var(--neutral-border)",
            borderRadius: "12px",
            padding: "1.5rem",
          }}
        >
          <h3 style={{ fontSize: "1.0rem", fontWeight: 700, color: "var(--accent-text)", marginBottom: "1.5rem" }}>Distribution</h3>
          <div style={{ width: "100%", height: "280px" }}>
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
                <Legend layout="horizontal" verticalAlign="bottom" align="center" wrapperStyle={{ fontSize: "12px", paddingTop: "20px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ROW 3: Table */}
      <div
        style={{
          backgroundColor: "var(--neutral-bg)",
          border: "1px solid var(--neutral-border)",
          borderRadius: "12px",
          padding: "1.5rem",
          overflow: "hidden"
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <h3 style={{ fontSize: "1.0rem", fontWeight: 700, color: "var(--accent-text)", margin: 0 }}>Recent Orders</h3>
          <select 
            style={{ 
              fontSize: "0.8rem", 
              padding: "0.5rem", 
              borderRadius: "8px", 
              border: "1px solid var(--neutral-border)",
              backgroundColor: "var(--accent-bg)",
              color: "var(--neutral-text)",
              outline: "none"
            }}
          >
            <option>All Status</option>
            <option>Completed</option>
            <option>Pending</option>
          </select>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ textAlign: "left" }}>
              <th style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--neutral-muted)", borderBottom: "1px solid var(--neutral-border)", padding: "0.75rem 1rem" }}>Order ID</th>
              <th style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--neutral-muted)", borderBottom: "1px solid var(--neutral-border)", padding: "0.75rem 1rem" }}>Customer</th>
              <th style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--neutral-muted)", borderBottom: "1px solid var(--neutral-border)", padding: "0.75rem 1rem" }}>Vendor</th>
              <th style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--neutral-muted)", borderBottom: "1px solid var(--neutral-border)", padding: "0.75rem 1rem" }}>Amount</th>
              <th style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--neutral-muted)", borderBottom: "1px solid var(--neutral-border)", padding: "0.75rem 1rem" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order, idx) => (
              <tr 
                key={idx} 
                style={{ cursor: "pointer", transition: "background 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--accent-bg)")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                <td style={{ fontSize: "0.875rem", color: "var(--accent-text)", padding: "0.875rem 1rem", borderBottom: "1px solid var(--neutral-border)" }}>{order.id}</td>
                <td style={{ fontSize: "0.875rem", color: "var(--accent-text)", padding: "0.875rem 1rem", borderBottom: "1px solid var(--neutral-border)" }}>{order.customer}</td>
                <td style={{ fontSize: "0.875rem", color: "var(--accent-text)", padding: "0.875rem 1rem", borderBottom: "1px solid var(--neutral-border)" }}>{order.vendor}</td>
                <td style={{ fontSize: "0.875rem", color: "var(--accent-text)", fontWeight: 600, padding: "0.875rem 1rem", borderBottom: "1px solid var(--neutral-border)" }}>{order.amount}</td>
                <td style={{ fontSize: "0.875rem", padding: "0.875rem 1rem", borderBottom: "1px solid var(--neutral-border)" }}>
                  <StatusBadge status={order.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
