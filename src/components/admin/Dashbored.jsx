import React, { useContext } from 'react';
import { ContextForAdmin } from "../../contexts/AdminContext";
import { UserDataContext } from '../../contexts/UserContext';
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);
function Dashboard() {
  const { product } = useContext(ContextForAdmin); 
  const { user ,totalOrder} = useContext(UserDataContext);
  const id = localStorage.getItem("id")
  const block=user.filter((user)=>user.status===false)
  const blockCount=block.length
  const emptyProduct=product.filter((product)=>product.quantity===0)
  const lessProduct=product.filter((product)=>product.quantity<50)
  const salePrice=user.reduce((acc,cur)=>acc+cur.order.reduce((acc,order)=>acc+order.total,0),0)
  const categoryCounts = totalOrder.reduce((acc, order) => {
    order.items.forEach((item) => {
      if (acc[item.category]) {
        acc[item.category] += item.quantity;
      } else {
        acc[item.category] = item.quantity;
      }
    });
    return acc;
  }, {});
  const pieData = {
    labels: Object.keys(categoryCounts),
    datasets: [
      {
        label: "Product Categories",
        data: Object.values(categoryCounts),
        backgroundColor: [
          "#FF6384", "#36A2EB", "#FFCE56", "#8A2BE2", "#00FA9A", "#FF7F50", "#6495ED"
        ],
        hoverBackgroundColor: [
          "#FF6384", "#36A2EB", "#FFCE56", "#8A2BE2", "#00FA9A", "#FF7F50", "#6495ED"
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
    <div>
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      <div className="p-4 bg-gray-100 rounded-lg shadow flex justify-center">
        <p className="text-xl font-semibold">products: {product.length}</p>
      </div>
      <div className="p-4 bg-gray-100 rounded-lg shadow flex justify-center">
        <p className="text-xl font-semibold">Empty products: {emptyProduct.length}</p>
      </div>
      <div className="p-4 bg-gray-100 rounded-lg shadow flex justify-center">
        <p className="text-xl font-semibold">user: {user.length}</p>
      </div>
      <div className="p-4 bg-gray-100 rounded-lg shadow flex justify-center">
        <p className="text-xl font-semibold">Blocked user: {blockCount}</p>
      </div>
      <div className="p-4 bg-gray-100 rounded-lg shadow flex justify-center">
        <p className="text-xl font-semibold">sale price: {salePrice}</p>
      </div>
    </div>
    <div className="flex flex-col md:flex-row">
  <div className="md:w-1/2 w-full md:mr-4">
    <h3 className="m-2 text-center">Stock Out</h3>
    <table className="w-full text-sm text-left rtl:text-right text-gray-900 my-2">
      <thead className="text-xs text-white uppercase bg-gray-800">
        <tr>
          <th className="px-3 py-2">Name</th>
          <th className="px-3 py-2">Category</th>
          <th className="px-3 py-2">Quantity</th>
        </tr>
      </thead>
      <tbody>
        {lessProduct.map((product) => (
          <tr key={product.id} className="hover:bg-gray">
            <td className="px-3 py-2">{product.name}</td>
            <td className="px-3 py-2">{product.category}</td>
            <td className="px-3 py-2">{product.quantity}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  <div className="md:w-1/2 w-full">
    <h3 className="m-2 text-center">Orders Data</h3>
    <div className="mb-8">
      <Pie data={pieData} options={pieOptions} />
    </div>
  </div>
</div>

    </div>
  );
}

export default Dashboard;
