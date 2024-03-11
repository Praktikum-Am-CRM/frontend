// import {
//   BarElement,
//   CategoryScale,
//   Chart as ChartJS,
//   Legend,
//   LinearScale,
//   Title,
//   Tooltip,
// } from 'chart.js';
// import { Bar } from 'react-chartjs-2';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// );

// export default function StatsFromPrograms(data: any) {
//   const options = {
//     indexAxis: 'x',
//     elements: {
//       bar: {
//         borderWidth: 2,
//       },
//     },
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top',
//       },
//       title: {
//         display: true,
//         text: 'Распределение по статусам',
//       },
//     },
//   };

//   const labels = data && data?.map(item => item.status_name);

//   const chartData = {
//     labels,
//     datasets: [
//       {
//         label: 'Количество амбассадоров',
//         data: data && data?.map(item => item.count),
//         backgroundColor: [
//           'rgba(75, 192, 192, 0.2)',
//           'rgba(153, 102, 255, 0.2)',
//           'rgba(255, 159, 64, 0.2)',
//           'rgba(201, 203, 207, 0.2)',
//           'rgba(54, 162, 235, 0.2)',
//           'rgba(255, 99, 132, 0.2)',
//         ],
//         borderColor: [
//           'rgb(75, 192, 192)',
//           'rgb(153, 102, 255)',
//           'rgb(255, 159, 64)',
//           'rgb(201, 203, 207)',
//           'rgb(54, 162, 235)',
//           'rgb(255, 99, 132)',
//         ],
//         borderWidth: 1,
//       },
//     ],
//   };

//   return <Bar options={options} data={chartData} />;
// }
