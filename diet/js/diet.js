// Hide or display instructions
$('#instructions').on('click', function() {
	$('#instructions-text').slideDown();
	$('#instructions-general').slideDown();
	$('#hide').show();
    });

$('#hide').on('click', function(e) {
	$('#hide').hide();
	$('#instructions-text').slideUp();
	$('#instructions-general').slideUp();
	e.stopPropagation();
    });


// Create first 9 extra rows
for (var i = 2; i <= 10; i++) {
    $('#diet-table').append(          
        '<tr><td class="day">' + i + '</td>' +
	'<td><input class="weight" type="number" step="0.1" size="10"/></td>' +
	'<td><input class="waist" type="number" step="0.1" size="10" /></td>' +
	'<td><input class="hips" type="number" step="0.1" size="10" /></td>' +
	'<td><input class="arm" type="number" step="0.1" size="10" /></td>' +
	'<td><input class="thigh-c" type="number" step="0.1" size="10" /></td>'
	+
	'<td><input class="chest" type="number" step="0.1" size="10" /></td>' +
	'<td><input class="belly" type="number" step="0.1" size="10" /></td>' +
	'<td><input class="thigh-f" type="number" step="0.1" size="10" /></td>'
	+ '</tr>' );
}

// Add additional rows:
var nrows = 10;

function addRows() {
    for (var i = nrows + 1; i <= nrows + 10; i++) {
        $('#diet-table').append(
            '<tr><td class="day">' + i + '</td>' +
            '<td><input class="weight" type="number" step="0.1" size="10"/>' + 
	    '</td>' +
            '<td><input class="waist" type="number" step="0.1" size="10" />' +
	    '</td>' +
            '<td><input class="hips" type="number" step="0.1" size="10" />' + 
	    '</td>' +
            '<td><input class="arm" type="number" step="0.1" size="10" /></td>'
	    +
            '<td><input class="thigh-c" type="number" step="0.1" size="10" />'
	    + '</td>' +
            '<td><input class="chest" type="number" step="0.1" size="10" />' + 
	    '</td>' +
            '<td><input class="belly" type="number" step="0.1" size="10" />' + 
	    '</td>' +
            '<td><input class="thigh-f" type="number" step="0.1" size="10" />' 
	    + '</td>' +
            '</tr>' );
    }

    nrows += 10;
}

$('#add-rows').on('click', addRows);