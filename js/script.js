$(document).ready(function() {
  $.ajax(
    {
    'url': "https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0",
    'method': "GET",
    'success': function (data, name) {
    // $("#risultati").html(data);
    console.log(data, name);
    },
    'error': function (richiesta, stato, errori) { alert("E' avvenuto un errore. " + errore);
      }
    }
  );
  
});
