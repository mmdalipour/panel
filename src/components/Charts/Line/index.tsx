import { useTheme, fade } from '@material-ui/core/styles';

import { Line as LineChart, ChartData } from 'react-chartjs-2';

import { makeStyles, Theme } from '@material-ui/core/styles';
import { useRef } from 'react';

export type BarProps = {};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    height: '100%',
  },
}));

function Line({}: BarProps) {
  const classes = useStyles();

  const theme = useTheme();

  const chart = useRef(null);

  const dataRender = (canvas: HTMLElement) => {
    const ctx = (canvas as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D;

    const primaryGradient = ctx.createLinearGradient(0, 0, 0, 175);
    primaryGradient.addColorStop(0, fade(theme.palette.primary.main, 0.25));
    primaryGradient.addColorStop(1, fade(theme.palette.primary.main, 0.01));

    const secondaryGradient = ctx.createLinearGradient(0, 0, 0, 150);
    secondaryGradient.addColorStop(0, fade(theme.palette.secondary.main, 0.25));
    secondaryGradient.addColorStop(1, fade(theme.palette.secondary.main, 0.01));

    return {
      labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL'],
      datasets: [
        {
          borderWidth: 2,
          label: 'مرد',
          borderColor: theme.palette.primary.main,
          pointBackgroundColor: theme.palette.primary.main,
          pointHoverRadius: 8,
          pointRadius: 3,
          fill: 'start',
          backgroundColor: secondaryGradient,
          data: [250, 120, 150, 170, 180, 170, 160],
        },
        {
          borderWidth: 2,
          label: 'زن',
          borderColor: theme.palette.secondary.main,
          pointBackgroundColor: theme.palette.secondary.main,
          pointHoverRadius: 8,
          pointRadius: 3,
          fill: 'start',
          backgroundColor: secondaryGradient,
          data: [200, 400, 100, 50, 10, 26, 70],
        },
      ],
    };
  };

  return (
    <LineChart
      data={dataRender}
      options={{
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        scales: {
          yAxes: [
            {
              ticks: {
                fontColor: theme.palette.text.secondary,
                beginAtZero: true,
                maxTicksLimit: 5,
                padding: 20,
              },
              gridLines: {
                drawTicks: false,
                display: false,
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                zeroLineColor: 'transparent',
                color: theme.palette.divider,
              },
              ticks: {
                padding: 20,
                fontColor: theme.palette.text.secondary,
                fontStyle: 'bold',
              },
            },
          ],
        },
      }}
    />
  );
}

export default Line;
