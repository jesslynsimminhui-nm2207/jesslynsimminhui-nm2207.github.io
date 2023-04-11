
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
        var sideStats = { 
            interactions: 0,
            chats: 0, 
                }

        var radarStats = {
            rizz: {
                yes: 0,
                no: 0,
            },
            friendly: {
                yes:0,
                no:0,
            },
            forgiving:{
                yes:0,
                no:0,
            },
            attraction:{
                yes:0,
                no:0,
            },
            value:{
                yes:0,
                no:0,
            },

            
            
        }
        sideStats.interactions = json.length;

        //Separate Chats because don't want it in the Chart
       


        //ALL BACKEND AND MATH WORKS ------------------------------------------------------------
        //Overall Chart Absolute Data
        for (var i = 0; i < json.length; i++) {

            var person = json[i];
            var boy = {
                "liked":false,
                "matched":false,
                "blocked":false,
                "chatted":false,
            };

            for (const item in person) {
                // console.log(item);
                if (item == "block") {
                    stats.blocks++;
                    boy.blocked = true;
                };
                if (item == "like") {
                    stats.likes++;
                    boy.liked = true;
                };
                if (item == "match") {
                    stats.matches++;
                    boy.matched = true;
                };
                if (item == "chats") {
                    sideStats.chats++;
                    boy.chats = true;
                }
            }

            // Assess Rizz: whether person got game
            if (boy.liked && boy.matched && boy.chats) {
                radarStats.rizz.yes++;
            } else if (boy.liked == true) {
                radarStats.rizz.no++;
            }

            // Assess Friendliness: whether person chatted with people who like them (like how outgoing are they)
            if(boy.chats && boy.matched){
                radarStats.friendly.yes++;
            }
            if (boy.matched == true) {
                radarStats.friendly.no++;
            }
            
            // Assessing Forgivingness: whether person blocks matches 
            if(boy.matched && boy.blocked){
                radarStats.forgiving.no++;
            }else if(boy.matched == true){
                radarStats.forgiving.yes++
            }

             // Assessing Attraction: whether person is attractive
             if(boy.liked && boy.matched){
                radarStats.attraction.yes++;
            }else if(boy.liked == true){
                radarStats.attraction.no++
            }

            //Assesing Market Value: whether the person has more choice of matching
            if(boy.liked == false){
                radarStats.value.yes++;
            }
        }

        var newradarStats = {
            rizz: (radarStats.rizz.yes/radarStats.rizz.no)*10,
            friendly: (radarStats.friendly.yes/radarStats.friendly.no)*10,
            forgiving: (radarStats.forgiving.yes/radarStats.forgiving.no)*10,
            attraction: (radarStats.attraction.yes/radarStats.attraction.no)*10,
            value: (radarStats.value.yes/sideStats.interactions)*10
        }
        

    
         //console.log("So far: ");
        console.log(radarStats);
        console.log(sideStats);



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
        const blockperc = Math.round((stats.blocks/sideStats.interactions) * 100);
        const likeperc = Math.round((stats.likes/sideStats.interactions) * 100);
        const matchperc = Math.round((stats.matches/sideStats.interactions) * 100);
       
        
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
         
        //FORMATTING Radar Chart 
        var radarHeaders = [];
        var radarArray = [];

        for (const key of Object.keys(newradarStats)) {
            console.log(key);
            radarHeaders.push(key);
        }
        for (const value of Object.values(newradarStats)) {
            console.log(value);
            radarArray.push(value);
        }
        const radardataObj = {
            labels: radarHeaders,
            datasets: [{
                label: 'Radar Stats',
                data: radarArray,
                fill: true,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgb(255, 99, 132)',
                pointBackgroundColor: 'rgb(255, 99, 132)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(255, 99, 132)'
            }]
        };
        
        
        
        
        //ALL THE VISIBLE DATA POINTS HERE ---------------------------------------------------

        //HingeInteraction
        document.getElementById("HingeInteraction").innerHTML = "You've interacted with " + sideStats.interactions + " people";

        //First Chart
        new Chart("overallchart",
            {
                type: 'doughnut',
                data: dataObj,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    width: 200,
                    height: 200,
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
                    responsive: true,
                    maintainAspectRatio: false,
                    width: 200,
                    height: 200,
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
        
        document.getElementById('generateChartButton').addEventListener
        ('click', function()
            {new Chart("radarchart",
            {
                type: 'radar',
                data: radardataObj,
                options: {

                    scale:{
                        display:true,

                            ticks: {
                            min:0,
                            max:10,
                            stepSize:1,
                            beginAtZero: true,
                            },


                            labels: {
                                fontSize: 18,
                                fontColor: 'rgb(192, 75, 75)',
                                fontStyle: 'bold', 
                                fontFamily: 'Ibarra Real Nova' 
                            
                            },
                    },
                
                    title: {
                        display: true,
                        fontFamily: "Ibarra Real Nova",
                        fontSize: 24,
                        fontColor: 'rgb(250, 244, 220)',
                        text: ["Final Radar Data"],
                    },
                    elements: {
                        line:{
                            borderWidth: 3
                        }
                    }
                }
            })},
        );
        
        //document.getElementById("generateResult").addEventListener("click", );
        

    }


)


