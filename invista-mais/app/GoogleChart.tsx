import React from 'react';
import { View, StyleSheet, Text, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import { Chart } from 'react-google-charts';

interface GoogleChartProps {
  data: Array<Array<string | number>>;
  title: string;
  chartType?: 'PieChart' | 'BarChart' | 'LineChart' | 'ColumnChart';
}

const GoogleChart: React.FC<GoogleChartProps> = ({
  data,
  title,
  chartType = 'LineChart'
}) => {
  const commonOptions = {
    title,
    titleTextStyle: {
      color: '#FFF',
      fontSize: 20,
      fontName: 'KronaOne-Regular',
    },
    legend: {
      textStyle: {
        color: '#FFF',
        fontSize: 16,
        fontName: 'KronaOne-Regular',
      },
    },
    colors: ['#ff4444', '#4CAF50', '#2196F3'],
    backgroundColor: 'transparent',
    curveType: 'function',
    lineWidth: 3,
    pointSize: 6,
    hAxis: {
      textStyle: {
        color: '#FFF',
        fontSize: 20,
      },
      title: 'Meses',
      titleTextStyle: {
        color: '#FFF',
        fontSize: 20,
      },
    },
    vAxis: {
      textStyle: {
        color: '#FFF',
        fontSize: 18,
      },
      title: 'Valores (R$)',
      titleTextStyle: {
        color: '#FFF',
        fontSize: 16,
      },
    },
    chartArea: {
      width: '75%',
      height: '75%',
      backgroundColor: 'transparent',
    },
  };

  if (Platform.OS === 'web') {
    return (
      <View style={styles.webContainer}>
        <Chart
          chartType={chartType}
          data={data}
          options={commonOptions}
          width="100%"
          height="400px"
        />
      </View>
    );
  }

  const htmlContent = `
    <html>
      <head>
        <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
        <script type="text/javascript">
          google.charts.load('current', { packages: ['corechart'] });
          google.charts.setOnLoadCallback(drawChart);

          function drawChart() {
            var data = google.visualization.arrayToDataTable(${JSON.stringify(data)});
            
            var options = ${JSON.stringify(commonOptions)};

            var chart = new google.visualization.LineChart(
              document.getElementById('chart')
            );

            chart.draw(data, options);
          }
        </script>
      </head>
      <body style="background-color: transparent; margin: 0;">
        <div id="chart" style="width: 100%; height: 100%;"></div>
      </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={{ html: htmlContent }}
        style={styles.chart}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        scrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 400,
    borderRadius: 12,
    overflow: 'hidden',
  },
  chart: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  webContainer: {
    width: '100%',
    height: 400,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    padding: 15,
  },
});

export default GoogleChart;
