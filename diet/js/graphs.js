/** 
 *  Check for data stored in cookies.  If present, use to populate table
 */
// Check for data stored in cookies
checkCookie();
var ageCookie = getCookie('ageCookie');
var sexCookie = getCookie('sexCookie');
var weightCookie = getCookie('weightCookie');
var waistCookie = getCookie('waistCookie');
var hipsCookie = getCookie('hipsCookie');
var armCookie = getCookie('armCookie');
var thighCCookie = getCookie('thighCCookie');
var chestCookie = getCookie('chestCookie');
var bellyCookie = getCookie('bellyCookie');
var thighFCookie = getCookie('thighFCookie');

// If data present, use to populate table
if (ageCookie) { 
    $('#age').val(ageCookie);
} 

if (sexCookie) {
    if (sexCookie == 'M') {
	$('#male-radio').attr('checked', true);
    } else {
	$('#female-radio').attr('checked', true);
    }
}


function populate(cookieName, className) {
    if (cookieName) {
	var classVals = cookieName.split(',');
	if (classVals.length > nrows) {
	    var addTimes = Math.floor((classVals.length - 1) / 10);
	    for (var a = 0; a < addTimes; a++) { addRows(); }
	}
	var i = 0;
	$(className).each(function() {
            $(this).val(classVals[i]);
	    i++
	});
    }
}

populate(weightCookie, '.weight');
populate(waistCookie, '.waist');
populate(hipsCookie, '.hips');
populate(armCookie, '.arm');
populate(thighCCookie, '.thigh-c');
populate(chestCookie, '.chest');
populate(bellyCookie, '.belly');
populate(thighFCookie, '.thigh-f');






// Create data object
var age, sex, days = [];
    data = { weight: [], waist: [], hips: [], arm: [], thighC: [],
             chest: [], belly:[], thighF: [] };


// Helper function:
// Take inputs x = [x1, x2, ..., xn] and
//             y = [y1, y2, ..., yn] and return
// outData = [ [x1, y1], [x2, y2], ... [xn, yn] ]
function structureData(x, y) {
    outData = [];
    for (var i in x) {
	if (x[i] && y[i]) {
	    outData.push([x[i], y[i]]);
	}
    }

    return outData;
};


// Generalize scatterplot function
function scatterplot(x, y, xlab, ylab) {
// Height and width
    var h = 300,
	w = 500,
	padding = 50;

    var dataset = structureData(x, y);

    // Scale functions
    var xScale = d3.scale.linear()
	.domain([ d3.min(dataset, function(d) { return d[0]; }), 
		  d3.max(dataset, function(d) { return d[0]; }) ])
	.range([padding, w - padding * 2]);
    
    var yScale = d3.scale.linear()
	.domain([ d3.min(dataset, function(d) { return d[1]; }), 
		  d3.max(dataset, function(d) { return d[1]; }) ])
	.range([h - padding, padding]);
    
    // Define axes
    var xAxis = d3.svg.axis()
	.scale(xScale)
	.orient('bottom')
	.ticks(5);
    
    var yAxis = d3.svg.axis()
	.scale(yScale)
	.orient('left')
	.ticks(5);
    
    // Create <svg>
    var svg = d3.select('#graphs')
	.append('svg')
	.attr('height', h)
	.attr('width', w);
    
    // Plot points
    svg.selectAll('circle')
	.data(dataset)
	.enter()
	.append('circle')
	.attr('cx', function(d) { return xScale(d[0]); })
	.attr('cy', function(d) { return yScale(d[1]); })
	.attr('r', 3);

    // Create smoothed line
    var scaledData = [];
    for (i in dataset) {
	scaledData[i] = [xScale(dataset[i][0]), yScale(dataset[i][1])];
    }
	
    var smoothed = svg.append('path')
	.data([scaledData])
	.attr('d', d3.svg.line().interpolate('bundle'))
	.attr('stroke-weight', '5px')
	.attr('stroke', 'red')
	.attr('fill', 'none')
	.attr('class', 'poly');
    
	
    // Create axes
    svg.append('g')
	.attr('class', 'axis')
	.attr( 'transform', 'translate(0, ' + (h - padding) + ')')
	.call(xAxis);

    svg.append('g')
	.attr('class', 'axis')
	.attr('transform', 'translate(' + padding + ',0)')
	.call(yAxis);

    // ...and labels
    svg.append('text')
	.attr('x', w / 2)
	.attr('y', h - padding/2)
	.style('text-anchor', 'middle')
	.text(xlab);

    svg.append('text')
	.attr('transform', 'rotate(-90)')
	.attr('x', -h / 2)
	.attr('y', 0)
	.attr('dy', '1em')
	.style('text-anchor', 'middle')
	.text(ylab);
    
};


// Main event: read in user's data and generate plots
$('#graph-button').on('click', function() {

	// Read in user data
        age = $('#age').val();
	setCookie('ageCookie', age, 3);

	sex = $('input:radio[name=sex]:checked').val();
	setCookie('sexCookie', sex, 3);

	if (sex == 'M') {
	    sex = -5.62;
	} else {
	    sex = 0;
	}

	$('.day').each(function() {
		days.push($(this).text());
	    });
	
        $('.weight').each(function() {
                data['weight'].push($(this).val());
            });
	setCookie('weightCookie', data['weight'], 3);

        $('.waist').each(function() {
                data['waist'].push($(this).val());
            });
	setCookie('waistCookie', data['waist'], 3);


        $('.hips').each(function() {
                data['hips'].push($(this).val());
            });
	setCookie('hipsCookie', data['hips'], 3);

        $('.arm').each(function() {
                data['arm'].push($(this).val());
            });
	setCookie('armCookie', data['arm'], 3);

        $('.thigh-c').each(function() {
                data['thighC'].push($(this).val());
            });
	setCookie('thighCCookie', data['thighC'], 3);

        $('.chest').each(function() {
                data['chest'].push($(this).val());
            });
	setCookie('chestCookie', data['chest'], 3);

        $('.belly').each(function() {
                data['belly'].push($(this).val());
            });
	setCookie('bellyCookie', data['belly'], 3);

        $('.thigh-f').each(function() {
                data['thighF'].push($(this).val());
            });
	setCookie('thighFCookie', data['thighF'], 3);


	// Hide table
	$('#data-entry-container').slideUp();
	$('#table-button').slideDown();



	// Create extra varibales
	var armLeg = [],
	    waistHip = [],
	    totalmm = [],
	    bodyFat = [];
	
	for (var i in data['arm']) {
	    armLeg[i] = +data['arm'][i] + +data['thighC'][i];
	    waistHip[i] = +data['waist'][i] + +data['hips'][i];
	    totalmm[i] = +data['chest'][i] + +data['belly'][i] + 
		+data['thighF'][i];
	}

       
	    
	// Create Body Fat Variable
	for (var i in totalmm) {
	    if (totalmm[i]) {
		bodyFat[i] = 2.612 + 0.33 * totalmm[i] - 
		    0.0002905 * Math.pow(totalmm[i], 2) +
		    0.08114 * age + sex;
	    }
	}
	    

	
	// Create weight by days graph
	scatterplot(days, data['weight'], 'Days', 'Weight');
	scatterplot(days, bodyFat, 'Days', '% Body Fat')
	scatterplot(days, armLeg, 'Days', 'Arm + Leg');
	scatterplot(days, waistHip, 'Days', 'Waist + Hips');
	
}); 



// Show table
$('#table-button').on('click', function() {
	$('#data-entry-container').slideDown();
	$('#table-button').slideUp();

	// TO DO: Delete SVGs (they are regenerated if needed)
	$('svg').remove();
	data = { weight: [], waist: [], hips: [], arm: [], thighC: [],
		 chest: [], belly:[], thighF: [] };
	days = [];
	
});





// Cookies                                                              
function setCookie(cName, cVal, expYears) {
    var d = new Date();
    d.setTime(d.getTime() + expYears * 365 * 24 * 60 * 60 * 10000);
    var expires = 'expires=' + d.toUTCString();
    document.cookie = cName + '=' + cVal + '; ' + expires;
}



function getCookie(cName) {
    var name = cName + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
	var c = ca[i];
	while (c.charAt(0) == ' ') {
            c = c.substring(1);
	}

        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
	}
    }

    return '';
}



function checkCookie() {
    var user = getCookie('username');
    if (user != '') {
	$('#data-entry-container').prepend('<div><p>Keep up the good work, ' +
					   user + '!</p></div>');
    } else {
	user = prompt('Please enter your name:', '');
	if (user != '' && user != null) {
            setCookie('username', user, 3);
	}
    }
}




