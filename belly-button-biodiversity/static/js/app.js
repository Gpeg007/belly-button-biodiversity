function buildMetadata(sample) {
  var MetaData = `/metadata/${sample}`;
  d3.json(MetaData).then(function(response) {
    var panelData = d3.select("#sample-metadata");
    panelData.html("");

    var data = Object.entries(response);
    data.forEach(function(item) {
    panelData.append("div").text(item);
   });
   })}


function buildCharts(sample) {
var sampleData = `/samples/${sample}`;

  d3.json(sampleData).then(function(response) {
  
    var bubbleOtuIds = response.otu_ids;
    var bubbleOuLabels = response.otu_labels;
    var bubbleSampleValues = response.sample_values;

    var bubbleChartData = {
      mode: 'markers',
      x: bubbleOtuIds,
      y: bubbleSampleValues,
      text: bubbleOuLabels,
      marker: {color: bubbleOtuIds, colorscale: 'Rainbow', size: bubbleSampleValues}
    };

    var bb1Data = [bubbleChartData];

    var layout = {
      showlegend: false,
      height: 600,
      width: 1200
    };

    Plotly.newPlot('bubble', bb1Data, layout);
  })

    d3.json(sampleData).then(function(response) {
      var topTenOtuIds = response.otu_ids;
      var topOtuLabels = response.otu_labels;
      var topTenSampleValues = response.sample_values;

      var data = [{
        "labels" : topTenOtuIds,
        "values" : topTenSampleValues,
        "hovertext" : topOtuLabels,
        "type" : "bar"
      }];

      Plotly.newPlot('bar', data);
      })
  };


function init() {
  var selector = d3.select("#selDataset");

  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  buildCharts(newSample);
  buildMetadata(newSample);
}

init();

