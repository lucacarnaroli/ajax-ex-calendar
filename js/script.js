$(document).ready(function() {
  var meseIniziale = 0;
  var anno = 2018;
  var mese = moment({
    year: anno,
    month: meseIniziale
  });

  calcMesi(mese);
  giorniFestivi(mese);

  function giorniFestivi(mese) {
    $.ajax(
      {
      'url': 'https://flynn.boolean.careers/exercises/api/holidays',
      'method': "GET",
      'data': {
        year : mese.year(),
        month : mese.month()
      },
      'success': function(data) {
        console.log(data);
        for (var i = 0; i < data.response.length; i++) {
          $('li').each(function() {
            if (data.response[i].date == $(this).attr('data-complete-date')) {
              $(this).addClass('red');
              $(this).children('.festivita').append(data.response[i].name);
            }
          });
        };
      },
      'error': function (richiesta, stato, errori) {
        alert("E' avvenuto un errore. " + errore);
      }
    });
  }
});

// funzioni
function calcMesi(mese) {
  $('.mese').text(mese.format('MMMM-YYYY'));
  // var thisMonth = $('.mese').attr('data-this-month', mese.format('YYYY-MMM'));
  $('.mese').attr('data-this-month',mese.format('YYYY-MM'));
  $('.days').html('');
  var daysMonth = mese.daysInMonth();
  console.log(daysMonth);
  for (var i = 1; i <= daysMonth; i++) {
    var source = $('#entry-template').html();
    var template = Handlebars.compile(source);
    var context = {
      'data' : addZero(i),
      'mese' : mese.format('MMMM'),
      'complete-date' : '2018-' + mese.format('MM') + '-' + addZero(i)
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

$('.next').click(function() {
  var thisMonth = $('.mese').attr('data-this-month');
  var date = moment(thisMonth).add(1, 'months');

  calcMesi(date);
  giorniFestivi(date);

});

$('.prev').click(function() {
  var thisMonth = $('.mese').attr('data-this-month');
  var date = moment(thisMonth).subtract(1, 'months');

  calcMesi(date);
  giorniFestivi(date);

});
