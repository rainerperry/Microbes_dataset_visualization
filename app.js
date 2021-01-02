

function init() {
d3.json("data/samples.json").then((samples) => {

    //check data from json
    console.log(samples)


//populate drop down menu with sample names

    var samplenames = samples.names
    var location = d3.select("#selDataset");
    samplenames.forEach((x) => {

        location.append("option").text(x).property("value", x)

    });

   buildtable(samplenames[0]);
   dataDisplay(samplenames[0])
});
}

//prepare plots

function buildtable(sampleID) {

    d3.json("data/samples.json").then(function(sampleList) {
        var chartdata = sampleList.samples    
        var filterdata = chartdata.filter(x => x.id == sampleID)
        console.log(filterdata[0])

        //get top 10 OTUs
        var otuId = filterdata[0].otu_ids.slice(0,10).map(x=> `OTU ${x}`).reverse();
        console.log(otuId)
        var sampleValues = filterdata[0].sample_values.slice(0, 10).reverse();
        console.log(sampleValues)
        var otuLabels = filterdata[0].otu_labels.slice(0, 10).reverse();

        //get OTUs in ascending order:
        //code here???

        //build traces
        var trace1 = {
        x: sampleValues,
        y: otuId,
        type: "bar",
        orientation: "h",
        color: "blue"
        }

        // data & laoyout variable

        
        var data1 = [trace1];

        var layout1 = {
            title: "Top 10 OTU per Individual",
            //yaxis: {tickmode: "linear"},
            margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 100
            }
        };
        
        //bar plot
        Plotly.newPlot("bar", data1, layout1);

        // data & layout for bubble plot

        var trace2 = {
            x: filterdata[0].otu_ids,
            y: filterdata[0].sample_values,
            mode: 'markers',
            marker: {
            size: filterdata[0].sample_values,
            color: filterdata[0].otu_ids
            },
            text: filterdata[0].otu_labels
        };

    //data & layout variables
    
        var data2 = [trace2];
    
        var layout2 = {
            xaxis: {title: "OTU ID"},
            // yaxis??
            height: 600,
            width: 1000
        };
    
        //bubble graph
        Plotly.newPlot('bubble', data2, layout2);
    });
}

//4. Function to filter & display the sample metadata in box "Demographic Info" 

function dataDisplay(demoInfo) {

    d3.json("data/samples.json").then((data) => {
        var samplemeta = data.metadata;
        var location = d3.select("#sample-metadata");

        console.log(samplemeta)
        var filterdata = samplemeta.filter(x => x.id == demoInfo)
        console.log(filterdata[0])
        location.html("")
        Object.entries(filterdata[0]).forEach(([key, value]) => {
            var row = location.append("tr");
            row.append("td").html(`<strong><font size = '1'>${key}</font></strong>:`);
            row.append('td').html(`<font size ='1'>${value}</font>`);
          });
    });
};

function optionChanged(newSample) {
    buildtable(newSample);

    dataDisplay(newSample);
 }


init()


