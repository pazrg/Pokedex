//HTML STRUCTURE
$('header').after('<div class="container"></div>');

//VARIABLES
var url = 'http://pokeapi.co/api/v2/'
var request = new XMLHttpRequest();
var input;
var f = 0;

//REQUEST PROCESSING
request.onreadystatechange = function() { //javascript onreadystatechange for button requests
    if (request.readyState === 4) {
        if (request.status === 200) {
            if (input === 1) { //BUTTON ID
                var responsetext = JSON.parse(request.responseText);
                container(responsetext) // card constructor
            } else { //BUTTON TYPE
                var array = [];
                var responsetext2 = JSON.parse(request.responseText);
                var j = 0;
                while (j < 10) {
                    array.push(responsetext2.pokemon[j].pokemon.url) //url-array (memorize each url)
                    j++
                }
                // Ajax get for each url within the url-array: it takes some time (just wait and see)
                array.forEach(function(element) {
                    $.get(element, function(data) {
                        container(data) // card constructor
                        f++;
                    });
                });

            }
        }
    }
}

//REQUEST WHEN INPUT ID
$('#id_button').on("click", function() {
    $('.row.first').remove() // reset panel
    var pokemon_id = $('#id').val();
    var new_url = url + "pokemon/" + pokemon_id + "/"; //Adds the query 
    request.open('GET', new_url, true); //javascript open request
    request.send(); // javascript request send
    input = 1;
});

//REQUEST WHEN INPUT TYPE
$('#type_button').on("click", function() {
    $('.row.first').remove() // reset panel
    var pokemon_type = $('#type').val();
    var new_url = url + "type/" + pokemon_type; //Adds the query 
    request.open('GET', new_url, true); //javascript open request
    request.send(); // javascript request send
    input = 2;
});

//card constructor
function container(responsetext) {
    //card
    $('.container').append('<div class="row first" id="' + f + '"></div>');
    $('#' + f).append('<div class="col-md-2"></div>');
    $('#' + f).append('<div class="card u-full-width"></div>')
    $('#' + f + " " + '.card.u-full-width').append('<div class="row name"></div>');
    $('#' + f + " " + '.row.name').append('<h3 class="twelve columns pokemon-name"></h3>');
    $('#' + f + " " + '.card.u-full-width').append('<div class="row pic"></div>');
    $('#' + f + " " + '.card.u-full-width').append('<div class="row stats"></div>');

    //filling-card
    $('#' + f + " " + '.twelve.columns.pokemon-name').html(responsetext.name)
    $('#' + f + " " + '.row.pic').append('<img src=' + responsetext.sprites.front_shiny + '>') //picture
    $('img').addClass("center-block") //centering picture
    $('#' + f + " " + '.row.stats').append('<p>' + "Peso: " + responsetext.weight + '</p>')
    $('#' + f + " " + '.row.stats').append('<p>' + "Altura: " + responsetext.height + '</p>')
    $('#' + f + " " + '.row.stats').append('<p>' + "Tipo(s): " + '</p>')

    var d = responsetext.types.length,
        i = 0;
    while (i < d) {
        $('#' + f + " " + '.row.stats').append('<p>' + responsetext.types[i].type.name + '</p>')
        i++
    }
}