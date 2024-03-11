import {
  useGetStatisticsOnAmbassadorsQuery,
  useGetStatisticsOnProgramQuery,
} from '../../store/amCrm/amCrm.api';
import 'chart.js/auto';
import { Bar, Pie } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js';

import { STATS_COLORS } from '../../utils/constants';

export default function StatisticsPage() {
  const { data: ambStatusesStats } = useGetStatisticsOnAmbassadorsQuery();
  const { data: programStats } = useGetStatisticsOnProgramQuery();

  const options: ChartOptions<`bar`> = {
    indexAxis: 'x',
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Распределение по статусам',
      },
    },
  };

  const labels =
    ambStatusesStats && ambStatusesStats.map(item => item.status_name);

  const ambStatusesStatsChartData = {
    labels,
    datasets: [
      {
        label: 'Количество амбассадоров',
        data: ambStatusesStats && ambStatusesStats.map(item => item.count),
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(201, 203, 207, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 99, 132, 0.2)',
        ],
        borderColor: [
          'rgb(75, 192, 192)',
          'rgb(153, 102, 255)',
          'rgb(255, 159, 64)',
          'rgb(201, 203, 207)',
          'rgb(54, 162, 235)',
          'rgb(255, 99, 132)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const programStatsChartData = {
    labels: programStats && programStats.map(item => item.program_name),
    datasets: [
      {
        label: 'Количество амбассадоров',
        data: programStats && programStats.map(item => item.count),
        backgroundColor: STATS_COLORS,
        hoverBackgroundColor: STATS_COLORS,
      },
    ],
  };

  return (
    <>
      <Bar options={options} data={ambStatusesStatsChartData} />
      <Pie data={programStatsChartData} />
    </>
  );
}
