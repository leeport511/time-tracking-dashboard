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

              const previousLabel = getPreviousLabel(timeframe, item.timeframes[timeframe].previous);    
      
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
                                <p>${previousLabel}</p>
                          </div>
                    </div>
              `;

              container.appendChild(card)
            });

            
      }
      
      const getPreviousLabel = (timeframe, previousValue) => {

            switch (timeframe) {
                  case 'daily':
                        
                        return `Last day - ${previousValue} hrs`;
                  
                  case 'weekly':
                              
                        return `Last week - ${previousValue} hrs`;
                  
                  case 'monthly':
                        
                        return `Last month - ${previousValue} hrs`; 
            
                  default:

                        return `Previous - ${previousValue} hrs`;;
            }
      }



      //buttons

      const btnDaily = document.getElementById('btn-daily');
      const btnWeekly = document.getElementById('btn-weekly');
      const btnMonthly = document.getElementById('btn-monthly');


      btnDaily.addEventListener('click', () => {
            updatedCards('daily')
      })

      btnWeekly.addEventListener('click', () => {
            updatedCards('weekly')
      })

      btnMonthly.addEventListener('click', () => {
            updatedCards('monthly')
      })