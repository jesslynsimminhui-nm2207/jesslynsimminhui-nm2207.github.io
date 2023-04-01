
//REquest json file


const processData = function(data) {
    const rows = data.split("\r\n");
    rows.forEach((row, index) => {
        const item = row.split(",");
        dataTable.push(item);
    });
}





//PART 1: Overall Data
var data = fetch("https://jesslynsimminhui-nm2207.github.io/matches.json").then(
    (prom) => (prom.json())
).then(
    function (json) {
        var stats = {
            //interactions: 0, //size of json object
            likes: 0,
            blocks: 0,
            matches: 0,
        }

        //Separate Interactions because don't want it in the Chart 
        var z = { interactions: 0,}
        z.interactions = json.length;

        //ALL BACKEND AND MATH WORKS ------------------------------------------------------------
        //Overall Chart Absolute Data
        for (var i = 0; i < json.length; i++) {

            var obj = json[i];
            for (const item in obj) {
                // console.log(item);
                if (item == "block") {
                    stats.blocks++;
                };
                if (item == "like") {
                    stats.likes++;
                };
                if (item == "match") {
                    stats.matches++;
                };
            

            }
        }
         //console.log("So far: ");
        //console.log(stats);
        //console.log(z);



        // ALL THE DIFFERENT CHARTS BELOW ---------------------------------------------------------
        //FORMATING THE OVERALL TABLE 
        var dataHeaders = [];
        var dataArray = [];

        for (const key of Object.keys(stats)) {
            console.log(key);
            dataHeaders.push(key);
        }
        for (const value of Object.values(stats)) {
            console.log(value);
            dataArray.push(value);
        }

        const dataObj = {
            labels: dataHeaders,
            datasets: [{
                label: "My Hinge",
                data: dataArray,
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235, 0.8)',
                    'rgb(255, 205, 86)'
                ],
                hoverOffset: 4
            }]
        }
        
        //FORMATING Percentage Chart Data 
        const blockperc = Math.round((stats.blocks/z.interactions) * 100);
        const likeperc = Math.round((stats.likes/z.interactions) * 100);
        const matchperc = Math.round((stats.matches/z.interactions) * 100);
       
        
        var percdataHeaders = ["likes","blocks", "matches"];
        var percdataArray = [likeperc, blockperc, matchperc];

        const percdataObj = {
            labels: percdataHeaders,
            datasets: [{
                label: "Perc Data",
                data: percdataArray,
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235, 0.8)',
                    'rgb(255, 205, 86)'
                ],
                hoverOffset: 4
            }]
        }
        
        //ALL THE VISIBLE DATA POINTS HERE ---------------------------------------------------

        //HingeInteraction
        document.getElementById("HingeInteraction").innerHTML = "You've interacted with " + z.interactions + " people";

        //First Chart
        new Chart("overallchart",
            {
                type: 'doughnut',
                data: dataObj,
                options: {
                    title: {
                        display: true,
                        fontFamily: "Ibarra Real Nova",
                        fontSize: 24,
                        fontColor: 'rgb(250, 244, 220)',
                        text: ["In a Glance"],
                    },
                    legend: {
                        labels: {
                            fontColor: 'rgb(250, 244, 220)',
                        }

                    }

                }
            }
        )

        new Chart("percchart",
            {
                type: 'pie',
                data: percdataObj,
                options: {
                    title: {
                        display: true,
                        fontFamily: "Ibarra Real Nova",
                        fontSize: 24,
                        fontColor: 'rgb(250, 244, 220)',
                        text: ["Percentage Data"],
                    },
                    legend: {
                        labels: {
                            fontColor: 'rgb(250, 244, 220)',
                        }

                    }

                }
            }
        )
        //MATH FOR  
       
        let likesmorethanblocks = function(){
            if(blockperc>likeperc){

            }
         
        }

       
        }
        //document.getElementById("generateResult").addEventListener("click", );
        
            
    
        //document.getElementById("generateResult").addEventListener("click", );
        
    },


)


