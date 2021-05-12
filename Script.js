
function vai(){
    var citta = document.getElementById("citta").value;
    var scelta = document.getElementById("scelta").value;
    console.log(citta);
    console.log(scelta);

    var url1 = "https://api.openweathermap.org/data/2.5/weather?q=" + citta + "&appid=50b8a4667907c58365081a0f136e6c34";
    var url2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + citta + "&appid=50b8a4667907c58365081a0f136e6c34";

    if (scelta == "meteoAttuale"){
        $.getJSON(url1, function (result){
            console.log(result);
            meteoAttuale = result.weather[0].description;
            temperatura = result.main.temp - 273.15;
            temperaturaMax = result.main.temp_max - 273.15;
            temperaturaMin = result.main.temp_min - 273.15;
            temperaturaPerc = result.main.feels_like - 273.15;

            temperatura = temperatura ;
            document.getElementById("meteo").innerText = "Meteo: " + meteoAttuale + " Temperatura: " + Math.round(temperatura) + "Cº";
            var ctx = document.getElementById('myChart').getContext('2d');
            var chart = new Chart(ctx, {
                // The type of chart we want to create
                type: 'bar',

                // The data for our dataset
                data: {
                    labels: ['Temperatura Attuale', 'Temperatura Massima', 'Temperatura Minima', 'Temperatura Percepita'],
                    datasets: [{
                        label: 'Temperatura',
                        backgroundColor: 'orange',
                        borderColor: 'orange',
                        data: [temperatura, temperaturaMax, temperaturaMin, temperaturaPerc]
                    }]
                },

                // Configuration options go here
                options: {}
            });
        });

    } else if(scelta == "previsioniMeteo"){
        $.getJSON(url2, function (result){
            console.log(result);
            var previsioni = "";
            var giorno = 1;
            var temperatura = [];
            for (i = 0; i < 25; i+=5){
                meteoMattina = result.list[i].weather[0].description;
                meteoPomeriggio = result.list[i+4].weather[0].description;
                temperatura.push(Math.round(result.list[i+4].main.temp - 273.15));
                previsioni += " Giorno " + giorno + " " + "mattino: " + meteoMattina + " pomeriggio: " + meteoPomeriggio;
                giorno++;
            }
            console.log(temperatura);
            document.getElementById("meteo").innerText = previsioni;
            var ctx = document.getElementById('myChart').getContext('2d');
            var chart = new Chart(ctx, {
                // The type of chart we want to create
                type: 'line',

                // The data for our dataset
                data: {
                    labels: ['Oggi', 'Domani', 'Dopo Domani', 'Tra 3 Giorni', 'Tra 4 Giorni'],
                    datasets: [{
                        label: 'Previsioni',
                        backgroundColor: 'orange',
                        borderColor: 'orange',

                        data: temperatura
                    }]
                },

                // Configuration options go here
                options: {}
            });
        });
    } else if (scelta == "inquinamentoAria") {
        $.getJSON(url1, function (result){
            lat = result.coord.lat;
            lon = result.coord.lon;
            var url3 = "https://api.openweathermap.org/data/2.5/air_pollution?lat=" + lat + "&lon=" + lon + "&appid=50b8a4667907c58365081a0f136e6c34";
            $.getJSON(url3, function (result1){
               console.log(result1);
                var co = result1.list[0].components.co;
                var nh3 = result1.list[0].components.nh3;
                var no = result1.list[0].components.no;
                var no2 = result1.list[0].components.no2;
                var o3 = result1.list[0].components.o3;
                var pm2_5 = result1.list[0].components.pm2_5;
                var pm10 = result1.list[0].components.pm10;
                var so2 = result1.list[0].components.so2;
                inquinamento = "co: " + co + " nh3: " + nh3 + " no: " + no + " no2: " + no2 + " o3: " + o3 + " pm2_5: " + pm2_5 + " pm10: " + pm10 + " so2: " + so2;
                document.getElementById("meteo").innerText = inquinamento;
                var ctx = document.getElementById('myChart').getContext('2d');
                var chart = new Chart(ctx, {
                    // The type of chart we want to create
                    type: 'pie',

                    // The data for our dataset
                    data: {
                        labels: ['co', 'nh3', 'no', 'no2', 'o3', 'pm2_5', 'pm10', 'so2'],
                        datasets: [{
                            label: 'Previsioni',
                            backgroundColor: ['red', 'blue', 'orange', 'pink', 'green', 'yellow', 'black', 'gray'],
                            borderColor: 'orange',

                            data: [co, nh3, no, no2, o3, pm2_5, pm10, so2]
                        }]
                    },

                    // Configuration options go here
                    options: {}
                });
            });
        });
    }

}

