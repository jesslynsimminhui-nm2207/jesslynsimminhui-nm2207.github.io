
//PART 1: Fetching the matches.json file which shows a length of likes, blocks and chats 
var data = fetch("https://jesslynsimminhui-nm2207.github.io/matches.json").then(
    (prom) => (prom.json())
).then(
    function (json) {

//RIGHT COLOUMN STATISTICS

    //Creating the variables to count the likes, blocks and matches 
        var stats = {
            likes: 0,
            blocks: 0,
            matches: 0,
        }

    //Creating the variables to count the chats and overall interaction
        var sideStats = { 
            interactions: 0,
            chats: 0, 
                }
    //Creating the made-up variables for the rizz personality 
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
        //Calculating overall interaction as json length 
        sideStats.interactions = json.length;

       
       


//ALL BACKEND AND MATH WORKS ------------------------------------------------------------
        
        //Running through the whole data sheet, identifying each UNIQUE persons, 
        //create a checklist of whether they liked/matched/blocked/chatted
        for (var i = 0; i < json.length; i++) {

            var person = json[i];
            var boy = {
                "liked":false,
                "matched":false,
                "blocked":false,
                "chatted":false,
            };
        //Counting the UNIQUE persons who liked/blocked/matched for 2 sets of variables (stat and boy)
        //Stats data for overall chart and percentage chart
        //boy data for radar chart and rizz data
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

        //Creating the conditions for the Rizz data and counting accordingly

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

        //Creating the variables for Radar Chart to be on a scale of 10 and capped at 10
        var newradarStats = {
            rizz: Math.min((radarStats.rizz.yes/radarStats.rizz.no)*10,10),
            friendly: Math.min((radarStats.friendly.yes/radarStats.friendly.no)*10,10),
            forgiving: Math.min((radarStats.forgiving.yes/radarStats.forgiving.no)*10,10),
            attraction: Math.min((radarStats.attraction.yes/radarStats.attraction.no)*10,10),
            value: Math.min((radarStats.value.yes/sideStats.interactions)*10,10)
        
        }
        

//LEFT COLOUMN: Raw RIzz Data to reflect absolute number from above conditions
        //Get all element by ID
        var RizzpercentageBar = document.getElementById("RizzpercentageBar");
        var FriendlypercentageBar = document.getElementById("FriendlypercentageBar");
        var ForgivingpercentageBar = document.getElementById("ForgivingpercentageBar");
        var AttractionpercentageBar = document.getElementById("AttractionpercentageBar");
        var ValuepercentageBar = document.getElementById("ValuepercentageBar");
        var updateButton = document.getElementById("updateButton");
       
            //Only when the button is clicked
            updateButton.addEventListener("click", function() {

            // Replace with new percentage value
            var RizznewPercentage = newradarStats.rizz*10; 
            RizzpercentageBar.style.width = RizznewPercentage + "%";
            // Update the content
            RizzpercentageBar.innerHTML = RizznewPercentage + "%";  

            //Repeat for all other variables
            var FriendlynewPercentage = newradarStats.friendly*10; 
            FriendlypercentageBar.style.width = FriendlynewPercentage + "%";
            FriendlypercentageBar.innerHTML = FriendlynewPercentage + "%"; 
        
            
            var ForgivingnewPercentage = newradarStats.forgiving*10; 
            ForgivingpercentageBar.style.width = ForgivingnewPercentage + "%";
            ForgivingpercentageBar.innerHTML = ForgivingnewPercentage + "%"; 


            var AttractionnewPercentage = newradarStats.attraction*10; 
            AttractionpercentageBar.style.width = AttractionnewPercentage + "%";
            AttractionpercentageBar.innerHTML = AttractionnewPercentage + "%"; 

        
            var ValuenewPercentage = newradarStats.value*10; 
            ValuepercentageBar.style.width = ValuenewPercentage + "%";
            ValuepercentageBar.innerHTML = ValuenewPercentage + "%"; 

    });

// ALL THE DIFFERENT CHARTS BELOW ---------------------------------------------------------
        

        //FORMATING THE OVERALL TABLE 
        var dataHeaders = [];
        var dataArray = [];

        //Push keys and variable for all stats
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
                    '#C0F8D1',
                    '#800080',
                    '#f2ba35'
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
                    '#C0F8D1',
                    '#800080',
                    '#f2ba35'
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
                backgroundColor: 'rgb(192,248,209, 0.5)',
                borderColor: 'rgb(250, 244, 220)',
                pointBackgroundColor: 'rgb(255, 99, 132)',
                pointBorderColor: 'rgb(250, 244, 220)',
                pointHoverBackgroundColor: 'rgb(250, 244, 220)',
                pointHoverBorderColor: 'rgb(250, 244, 220)'
            }]
        };
        
        
        
        
//ALL THE VISIBLE DATA POINTS HERE ---------------------------------------------------


        //Overall Chart
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
                        fontSize: 32,
                        fontColor: 'grey',
                        text: ["In a Glance"],
                    },
                    legend: {
                        labels: {
                            fontColor: 'grey',
                        },
                    layout: {
                            padding: 30
                        }
                    }

                }
            }
        )
        
        //Percentage Chart
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
                        fontSize: 32,
                        fontColor: 'grey',
                        text: ["Percentage Data"],
                    },
                    legend: {
                        labels: {
                            fontColor: 'grey',
                        }

                    },
                    layout: {
                        padding: 30
                    },

                }
            }
        )
        
        //Radar Chart 
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
                                fontColor:'grey',
                                
                            },


                            labels: {
                                fontSize: 18,
                                fontColor: 'purple',
                                fontStyle: 'bold', 
                                fontFamily: 'Ibarra Real Nova' 
                            
                            },
                        
                            gridLines: {
                                lineWidth: 2,
                                color: 'grey',
                            },

                            pointLabels: {
                                fontColor: 'purple',
                                fontSize: 24,
                              }
                    },
                
                    title: {
                        display: true,
                        fontFamily: "Ibarra Real Nova",
                        fontSize: 32,
                        fontColor: 'purple',
                        text: ["Personalised Rizz Data"],
                    },
                    elements: {
                        line:{
                            borderWidth: 3
                        }
                    },

                   
                     
                }
            })},
        );
        
    
        

    }


)


