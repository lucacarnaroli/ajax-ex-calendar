$(document).ready(function() {
  var mese = 1;
  var url = 'https://flynn.boolean.careers/exercises/api/holidays?year=2018&month='+ (mese-1);
  calcMesi(mese);

  $.ajax(
    {
    'url': url ,
    'method': "GET",
    'success': function(data) {
      for (var i = 0; i < data.response.length; i++) {
        $('li').each(function() {
          if (data.response[i].date == $(this).attr('data')) {
            $(this).addClass('red');
          }
        });
      };
    },
    'error': function (richiesta, stato, errori) {
      alert("E' avvenuto un errore. " + errore);
    }
  }
  );


});

// funzioni
function calcMesi(mese) {
  var daysMonth = moment('2018-' + mese).daysInMonth();
  console.log(daysMonth);
  for (var i = 0; i < daysMonth; i++) {
    var source = $('#entry-template').html();
    var template = Handlebars.compile(source);
    var context = {
      data : i+1,
      mese : moment().month(mese -1).format('MMM'),
      attr : '2018-' + addZero(mese) + '-' + addZero(i+1)
    };
    var html = template(context);
    $('.days').append(html);
  }
}

function addZero(num) {
  if (num < 10) {
    return '0'+ num
  } else {
    return num
  }
}
