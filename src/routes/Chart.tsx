import { useQuery } from '@tanstack/react-query';
import { useOutletContext } from 'react-router-dom';
import { fetchCoinHistory } from '../api';
import ApexChart from 'react-apexcharts';
import { useTheme } from 'styled-components';

interface ContextProps {
  coinId: string;
}

interface HistoryInterface {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

function Chart() {
  const { coinId } = useOutletContext<ContextProps>();

  const { isLoading, data } = useQuery<HistoryInterface[]>(
    ['coinHistory', coinId],
    () => fetchCoinHistory(coinId)
  );

  let validData = data ?? [];
  if ('error' in validData) {
    validData = [];
  }

  const theme = useTheme();

  return (
    <div>
      {isLoading ? (
        'Loading chart...'
      ) : (
        <>
          <ApexChart
            series={[
              {
                name: '금액',
                data: validData.map((price) => parseFloat(price.close)),
              },
            ]}
            width="100%"
            height="160px"
            options={{
              noData: {
                text: '차트 데이터가 없습니다.',
                align: 'center',
                verticalAlign: 'middle',
                offsetX: 0,
                offsetY: 0,
                style: {
                  color: theme.textColor,
                  fontSize: '16px',
                },
              },
              theme: {
                mode: 'dark',
              },
              chart: {
                toolbar: {
                  show: false,
                },
                animations: {
                  enabled: true,
                  easing: 'easeinout',
                  speed: 800,
                  animateGradually: {
                    enabled: true,
                    delay: 150,
                  },
                  dynamicAnimation: {
                    enabled: true,
                    speed: 350,
                  },
                },
                background: 'transparent',
                fontFamily: '"Pretendard", sans-serif',
              },
              colors: [theme.accentColor],
              grid: {
                show: false,
              },
              tooltip: {
                y: {
                  formatter: (value) => `$${value.toFixed(2)}`,
                },
              },
              xaxis: {
                labels: {
                  show: false,
                },
                type: 'datetime',
                categories: validData.map((price) => price.time_close * 1000),
                axisTicks: {
                  show: false,
                },
                axisBorder: {
                  show: false,
                },
                tooltip: {
                  enabled: false,
                },
              },
              yaxis: {
                labels: {
                  show: false,
                },
              },
              stroke: {
                curve: 'smooth',
                width: 4,
              },
            }}
          />
          <ApexChart
            type="candlestick"
            series={[
              {
                name: '시세',
                data: validData.map((price) => ({
                  x: price.time_close * 1000,
                  y: [price.open, price.high, price.low, price.close],
                })),
              },
            ]}
            width="100%"
            height="160px"
            options={{
              noData: {
                text: '',
              },
              plotOptions: {
                candlestick: {
                  colors: {
                    upward: theme.upwardColor,
                    downward: theme.downwardColor,
                  },
                  wick: {
                    useFillColor: true,
                  },
                },
              },
              fill: {
                opacity: 0,
              },
              theme: {
                mode: 'dark',
              },
              chart: {
                toolbar: {
                  show: false,
                },
                background: 'transparent',
                fontFamily: '"Pretendard", sans-serif',
                width: 500,
                height: 300,
              },
              // colors: [theme.accentColor],
              grid: {
                show: false,
              },
              tooltip: {
                y: {
                  formatter: (value) => `$${value.toFixed(2)}`,
                },
              },
              xaxis: {
                labels: {
                  show: false,
                },
                type: 'datetime',
                categories: validData.map((price) => price.time_close * 1000),
                axisTicks: {
                  show: false,
                },
                axisBorder: {
                  show: false,
                },
                tooltip: {
                  enabled: false,
                },
              },
              yaxis: {
                labels: {
                  show: false,
                },
              },
              stroke: {
                width: 2,
              },
            }}
          />
        </>
      )}
    </div>
  );
}

export default Chart;
