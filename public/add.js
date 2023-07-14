console.log('add code running');

const button_add = document.getElementById('add_meassurement');
button_add.addEventListener('click', function (e) {
  console.log('add_meassurement was clicked');

  const params = {
    name: document.getElementById('meassure_name').value,
    value: document.getElementById('meassure_value').value,
    unit: document.getElementById('meassure_unit').value
  };

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
      console.log("status code" + response.status)
      if (response.ok) {
        console.log('add_meassurement was recorded');
        //add clearing the input
        document.getElementById('meassure_name').value = "";
        document.getElementById('meassure_value').value = "";
        document.getElementById('meassure_unit').value = "";
        document.getElementById("input_success").style.display = "block";
        setTimeout(function () {
          document.getElementById("input_success").style.display = 'none';
        }, 3000);
        //add green icons
        return;
      } else if (response.status == 400) {
        console.log("NOK input found");
        document.getElementById("input_alert").style.display = "block"
        setTimeout(function () {
          document.getElementById("input_alert").style.display = 'none';
        }, 3000);
      }
      throw new Error('Request failed.');
    })
    .catch(function (error) {
      console.log(error);
      //add input to user about issues
      //add red icons
    });
});