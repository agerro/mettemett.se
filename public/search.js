console.log('search code running');

const button_load = document.getElementById('query');
button_load.addEventListener('click', function (e) {
  console.log('query was clicked');

  fetch('/query', { method: 'POST' })
    .then(function (response) {
      if (response.ok) {
        console.log('query was recorded');
        return;
      }
      throw new Error('Request failed.');
    })
    .catch(function (error) {
      console.log(error);
    });
});