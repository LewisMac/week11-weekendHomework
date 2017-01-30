var ColumnChart = function(data){
  var chart = new Highcharts.Chart({
    chart: {
      type: "column",
      renderTo: data.container
    },
    title: {
      text: data.title
    },
    series: data.series,
    xAxis: {
      categories: data.columnNames
    }
  })
}