'use strict';

const country = 'south africa'; // Name of the country of data being fetched

fetch(
	'https://covid-19-data.p.rapidapi.com/country?format=undefined&name=' +
		country +
		'',
	{
		method: 'GET',
		headers: {
			'x-rapidapi-host': 'covid-19-data.p.rapidapi.com',
			'x-rapidapi-key': 'API_KEY'
		}
	}
)
	.then((response) => {
		return response.json();
	})
	.then((data) => {
		//console.log(data);
		if (data == '') {
			const errView = document.getElementById('error');
			errView.innerText = 'Display Data pending...';
		} else {
			console.log(data);
			const view = document.getElementById('wrap');
			data.forEach((item) => {
				const {
					country,
					confirmed,
					recovered,
					critical,
					deaths,
					latitude,
					longitude
				} = item;
				view.innerHTML = `
      <div class="content">
        <h1> ${country} </h1> <hr />
        <h4> Confirmed Cases : ${confirmed} </h4>
        <h4> Recovered Patients : ${recovered} </h4>
        <h4> Patients in critical condition : ${critical} </h4>
        <h4> Patients who passed away : <span class="deaths">${deaths}</span> </h4>
        <h4> Geo Posit : Lat ${latitude}  Lon ${longitude} </h4>
      </div>`;
			});
		}
	})
	.catch((err) => {
		const errView = document.getElementById('error');
		errView.innerHTML = err;
	});

// World-wide covid data API
const url = 'https://covid-193.p.rapidapi.com/statistics';
const options = {
	method: 'GET',
	headers: {
		'Content-Type': 'application/json',
		'x-rapidapi-host': 'covid-193.p.rapidapi.com',
		'x-rapidapi-key': 'API_KEY'
	}
};
// Getting input value
const getCountryToSearch = () => {
	const input = document.getElementById('country').value;
	getCovidData(input);
};

const getCovidData = (input) => {
	fetch(url, options)
		.then((res) => res.json())
		.then((data) => {
      console.log(data)
			if (data == '') {
				const errView = document.getElementById('error');
				errView.innerText = 'Display Data pending...';
			} else {
				const extractedData = data.response;
				//console.log(extractedData)
				const finder = extractedData.find((item) => item.country == input);
				const view = document.getElementById('global');
				const template = `
      <div class="content">
        <h1> ${finder.country} </h1> <hr />
        <h4> Population : ${finder.population} </h4>
        <h4> New Cases : ${finder.cases.new} </h4>
        <h4> Active cases : ${finder.cases.active} - Critical cases : ${finder
					.cases.critical}</h4>
        <h4> Recovered Cases : ${finder.cases.recovered} </h4>
        <h4> Total Number of Cases Reported : ${finder.cases.total} </h4>
        <h4> Deaths: New : <span class="deaths">${finder.deaths.new}</span>
         - Total : <span class="deaths">${finder.deaths.total}</span></h4>
        <h4> Number of Tests Done : ${finder.tests.total} </h4>
        <h4> Data last Update : ${finder.day} </h4> 
      </div>`;
				view.innerHTML = template;
			}
		})
		.catch((err) => {
			console.log(err);
			const errView = document.getElementById('error');
			errView.innerHTML = err;
		});
};
