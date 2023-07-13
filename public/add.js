console.log('add code running');

const button_add = document.getElementById('add_meassurement');
button_add.addEventListener('click', function (e) {
  console.log('add_meassurement was clicked');

  fetch('/add_meassurement', { method: 'POST' })
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