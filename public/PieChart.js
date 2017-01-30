var PieChart = function(data){
  var chart = new Highcharts.Chart({
    chart: {
      type: "pie",
      renderTo: data.container,
    },
    title: {
      text: data.title,
    },
    series: data.series,
  });
}