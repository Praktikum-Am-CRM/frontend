// import { PolarArea } from 'react-chartjs-2';
// import 'chart.js/auto';

// export default function PolarAreaChart(data: any) {
//   // Extracting program names and counts from the dataset
//   const labels = data && data?.map(item => item.program_name);
//   const counts = data && data?.map(item => item.count);

//   // Configure the dataset for Chart.js
//   const chartData = {
//     labels: labels,
//     datasets: [
//       {
//         label: 'Program Counts',
//         data: counts,
//         backgroundColor: [
//           // You can specify the color for each slice of the chart here
//           'rgba(255, 99, 132, 0.2)',
//           // ... add more colors for each data entry
//         ],
//         borderWidth: 1,
//       },
//     ],
//   };

//   // Chart options
//   const options = {
//     responsive: true,
//     scales: {
//       r: {
//         angleLines: {
//           display: false,
//         },
//         suggestedMin: 0,
//       },
//     },
//   };

//   return <PolarArea data={chartData} options={options} />;
// }
