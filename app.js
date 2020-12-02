d3.json("data/samples.json").then((samples) => {

    //check data from json
    console.log(samples)

    var samplenames = samples.names
    var location = d3.select("#selDataset");
    samplenames.forEach((x) => {

        location.append("option").text(x).property("value", x)

    });


   buildtable(samplenames[0])

});

function buildtable(sampleID) {

    d3.json("data/samples.json").then((samples) => {

    
        var samplemeta = samples.metadata
        var location = d3.select("#sample-metadata");

        console.log(samplemeta)
        var filterdata = samplemeta.filter(x => x.id == sampleID)
        console.log(filterdata[0])

        Object.entries(filterdata[0]).forEach(([key, value]) => {
            var row = location.append("tr");
            row.append("td").html(`<strong><font size = '1'>${key}</font></strong>:`);
            row.append('td').html(`<font size ='1'>${value}</font>`);
          });
    })
};

function optionChanged(newSample) {
    buildtable(newSample);
   //buildCharts(newSample);
 }

    //  Create the Traces
    // var trace1 = {
    //   x: samples.sample_values,
    //   y: samples.otu_ids,
    //   type: "bar",
    //   name: "Top",
    //   orientation: "h"
    // };
  
//     // Create the data array for the plot
//     var data = [trace1];
  
//     // Define the plot layout
//     var layout = {
//       title: "Square Root of Cancer Survival by Organ",
//       xaxis: { title: "Organ" },
//       yaxis: { title: "Square Root of Survival" }
//     };
  
//     // Plot the chart to a div tag with id "plot"
//     Plotly.newPlot("plot", data, layout);
//   });