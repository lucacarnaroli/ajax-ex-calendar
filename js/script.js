$(document).ready(function() {
  var source = $('#entry-template').html();
  var template = Handlebars.compile(source);
  for (var i = 1; i <= 31; i++) {
   $('.days').append(' '+ i + ' ');
  }


  $.ajax(
    {
    'url': "https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0",
    'method': "GET",
    'data': {
      year: 2018,
      month : 0,
    },
    'success': function(date,stato) {
      console.log(date.response);
    },
    'error': function (richiesta, stato, errori) {
      alert("E' avvenuto un errore. " + errore);
      }
    }
  );

});
