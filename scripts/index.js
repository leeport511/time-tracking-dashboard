let timeframe = 'weekly'; // default timeframe
let data = [] //to store de fetched data


// fetch data from JSON

fetch('../data/data.json')
      .then(resp => resp.json())
      .then(json => {
            data = json;
            updatedCards(timeframe); // initial render
              
      })
      .catch(err => console.error('Error Fetching data', err));

      //function to render cards based on selected timeframes.

      const updatedCards = (selectedTimeframe) => {
            timeframe = selectedTimeframe; //update the timeframe
            const container = document.getElementById('time-cards-container');
            container.innerHTML = ''; // clear previous cards

            data.forEach( item => {
      
              const card = document.createElement('article');
              card.classList.add('time-card');
              card.innerHTML = `
                    <div>
                          <img src="${item.image} alt="${item.title}" >
                    </div>
                    <div>
                          <div>
                                <h5>${item.title}</h5>
                                <img src= "#" alt="menu">
                          </div>
                          <div>
                                <p>${item.timeframes[timeframe].current} hrs</p>
                                <p>Last${item.timeframes[timeframe].previous} hrs</p>
                          </div>
                    </div>
              `
            });

      }
