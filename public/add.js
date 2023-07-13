console.log('add code running');

const button_add = document.getElementById('add_meassurement');
button_add.addEventListener('click', function (e) {
  console.log('add_meassurement was clicked');

  const params = {
    name: document.getElementById('meassure_name').value,
    value: document.getElementById('meassure_value').value,
    unit: document.getElementById('meassure_unit').value
  };

  console.log(JSON.stringify(params))

  fetch('/add_meassurement', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(params)
  })
    .then(function (response) {
      if (response.ok) {
        console.log('add_meassurement was recorded');
        return;
      }
      throw new Error('Request failed.');
    })
    .catch(function (error) {
      console.log(error);
    });
});