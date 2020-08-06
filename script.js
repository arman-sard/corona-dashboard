const ctx = document.getElementById("myChart").getContext('2d');
const ctx2 = document.getElementById("myChart2").getContext('2d');
let CountriesArray = [];

const mySearch = (searchValue) => {
    for (let i = 0; i < CountriesArray.length; i++) {
        const CoData = CountriesArray[i];
        if (CoData.Country === searchValue) {
            console.log("yes", CoData);
            document.getElementById("inputAnswer").value = CoData.NewDeaths;
        }
    }
};

window.onload = () => {
    fetch('https://api.covid19api.com/dayone/country/germany/status/confirmed/live').then(response => {
        return response.json();
    })
        .then(responseData => {

            let date_list = [];
            let case_list = [];

            for (i = 0; i < responseData.length; i++) {
                case_list.push(responseData[i].Cases);
                date_list.push(responseData[i].Date);
            }

            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: date_list,
                    datasets: [{
                        label: 'Corona virus Chart',
                        data: case_list,
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
        });

    const visualise = (curr) => {
        document.getElementById(curr.Slug + "-text").innerHTML = `Total Deaths in ${curr.Country} for today is: `;
        document.getElementById(curr.Slug + "-num").innerHTML = curr.TotalDeaths;
    }
    const TotalResults = () => {
        fetch('https://api.covid19api.com/summary').then(response => {
            return response.json();
        })
            .then(responseData => {

                CountriesArray = responseData.Countries;

                for (let i = 0; i < CountriesArray.length; i++) {
                    const curr = CountriesArray[i];

                    // if (curr.Country === 'Armenia') {
                    //     visualise(curr);
                    // }
                    // if (curr.Country === 'United Kingdom') {
                    //     visualise(curr);
                    // }
                    // if (curr.Country === 'Germany') {
                    //     visualise(curr);
                    // }

                    switch (curr.Country) {
                        case 'Armenia':
                            visualise(curr);
                            break;
                        case 'United Kingdom':
                            visualise(curr);
                            break;
                        case 'Germany':
                            visualise(curr);
                            break;
                    }
                }
            });
        console.log("------------------- 1/3")
    };

    TotalResults();
    setTimeout(myReload, 3000);

    document.getElementById("myBtn").addEventListener("click", function (event) {
        const inputValue = document.getElementById("inputSearch").value;
        mySearch(inputValue);
    });
};

myReload = () => {
    fetch('https://api.covid19api.com/summary').then(response => {
        return response.json();
    })
        .then(responseData => {
            console.log("--------------------2")
            let date_list = [];
            let case_list = [];

            for (i = 0; i < responseData.Countries.length; i++) {
                case_list.push(responseData.Countries[i].TotalDeaths);
                date_list.push(responseData.Countries[i].Country);
            }

            new Chart(ctx2, {
                type: 'line',
                data: {
                    labels: date_list,
                    datasets: [{
                        label: 'Corona virus Chart 2',
                        data: case_list,
                        backgroundColor: 'rgba(4, 255, 0, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
            // console.log(responseData);
        });
};



