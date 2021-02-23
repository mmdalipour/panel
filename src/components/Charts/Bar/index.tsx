import { useTheme, fade } from '@material-ui/core/styles';

import { Bar as BarChart, ChartData, ChartDataFunction } from 'react-chartjs-2';

import { makeStyles, Theme } from '@material-ui/core/styles';
import { useRef } from 'react';

export type BarProps = {};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    height: '100%',
  },
}));

function Bar({}: BarProps) {
  const classes = useStyles();

  const theme = useTheme();

  const chart = useRef(null);

  return (
    <BarChart
      data={{
        labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL'],
        datasets: [
          {
            label: 'مرد',
            borderWidth: 0,
            backgroundColor: theme.palette.primary.main,
            barThickness: 10,
            data: [250, 120, 150, 170, 180, 170, 160],
          },
          {
            label: 'زن',
            barThickness: 10,
            borderWidth: 0,
            backgroundColor: theme.palette.secondary.main,
            data: [200, 400, 100, 150, 110, 326, 70],
          },
          {
            label: 'مشتری جدید',
            barThickness: 10,
            borderWidth: 0,
            backgroundColor: '#D5D7E3',
            data: [200, 400, 100, 400, 50, 126, 270],
          },
        ],
      }}
      options={{
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        scales: {
          yAxes: [
            {
              gridLines: {
                color: theme.palette.divider,
                zeroLineColor: theme.palette.divider,
              },
              ticks: {
                fontColor: theme.palette.text.secondary,
                beginAtZero: true,
                maxTicksLimit: 5,
                padding: 20,
              },
              stacked: true,
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: false,
              },
              ticks: {
                padding: 20,
                fontColor: theme.palette.text.secondary,
                fontStyle: 'bold',
              },
              stacked: true,
            },
          ],
        },
      }}
    />
  );
}

export default Bar;
