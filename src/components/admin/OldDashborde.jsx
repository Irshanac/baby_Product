// src/OrdersGraph.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const OrdersGraph = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/users");
        const users = response.data;

        // Extract all orders from users
        const allOrders = users.reduce((acc, user) => {
          if (user.order && user.order.length > 0) {
            return acc.concat(user.order);
          }
          return acc;
        }, []);

        setOrders(allOrders);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to fetch orders.");
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>{error}</p>;

  // Helper function to format date (e.g., '2024-10-10')
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toISOString().split("T")[0];
  };

  // Aggregate total sales per day
  const salesPerDay = orders.reduce((acc, order) => {
    const date = formatDate(order.date);
    if (acc[date]) {
      acc[date] += order.total;
    } else {
      acc[date] = order.total;
    }
    return acc;
  }, {});

  // Prepare data for Bar Chart (Total Sales Over Time)
  const barData = {
    labels: Object.keys(salesPerDay),
    datasets: [
      {
        label: "Total Sales ($)",
        data: Object.values(salesPerDay),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Total Sales Over Time",
      },
    },
  };

  // Aggregate number of orders per day
  const ordersPerDay = orders.reduce((acc, order) => {
    const date = formatDate(order.date);
    if (acc[date]) {
      acc[date] += 1;
    } else {
      acc[date] = 1;
    }
    return acc;
  }, {});

  // Prepare data for Line Chart (Number of Orders Over Time)
  const lineData = {
    labels: Object.keys(ordersPerDay),
    datasets: [
      {
        label: "Number of Orders",
        data: Object.values(ordersPerDay),
        fill: false,
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Number of Orders Over Time",
      },
    },
  };

  // Aggregate product categories
  const categoryCounts = orders.reduce((acc, order) => {
    order.items.forEach((item) => {
      if (acc[item.category]) {
        acc[item.category] += item.quantity;
      } else {
        acc[item.category] = item.quantity;
      }
    });
    return acc;
  }, {});

  // Prepare data for Pie Chart (Product Categories Distribution)
  const pieData = {
    labels: Object.keys(categoryCounts),
    datasets: [
      {
        label: "Product Categories",
        data: Object.values(categoryCounts),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#8A2BE2",
          "#00FA9A",
          "#FF7F50",
          "#6495ED",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#8A2BE2",
          "#00FA9A",
          "#FF7F50",
          "#6495ED",
        ],
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: "Product Categories Distribution",
      },
    },
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Orders Analytics</h1>
      
      <div className="mb-8">
        <Bar data={barData} options={barOptions} />
      </div>

      <div className="mb-8">
        <Line data={lineData} options={lineOptions} />
      </div>

      <div className="mb-8">
        <Pie data={pieData} options={pieOptions} />
      </div>
    </div>
  );
};

export default OrdersGraph;
