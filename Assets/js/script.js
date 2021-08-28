/*==========================
DEPENDENCIES 
=========================*/

var container = $('.container');
var schedulerTimeTags = $('.input-group-text');
var currentDateHTML = $('#current-date');
var savedEntries = 'sdfsdf';

/*=========================
DATA
=========================*/

var today = moment();
var currentDate = today.format('MMM Do, YYYY');

/*=========================
FUNCTIONS 
=========================*/

function colorCodeEntries () {
    var time = $(this)[0].innerText.toLowerCase();
    time = moment(time, 'ha');
    todaysTime = moment(today.format('ha'), 'ha');
    var colorClass = $(this).parent().siblings()[0].className;

    // console.log(time);
    // console.log(todaysTime);

    if (time.isBefore(today.format('ha'))) {
        $(this).parent().siblings()[0].className = colorClass + ' past';
    } else if (time.isAfter(todaysTime)) {
        $(this).parent().siblings()[0].className = colorClass + ' future';
    } else {
        $(this).parent().siblings()[0].className = colorClass + ' present';
    };
};

function loadSavedEntries () {
    savedEntries = JSON.parse(localStorage.getItem('savedEntries'));

    if (savedEntries) {
        for (var i=0; i<savedEntries.length; i++) {
            var currEntry = savedEntries[i];
            
            if (currEntry.date == currentDate) {
                console.log(`.${currEntry.time}`.toLowerCase());
                $(`#${currEntry.time}`.toLowerCase()).parent().siblings().text(currEntry.entry);
            };
        };
    } else {
        savedEntries = [];
        // console.log('else')
    };

    return savedEntries; //not necessary?
};

function saveEntry (event) {
    event.preventDefault();

    var entry = $(this).parent().parent()[0][0].value;
    var entryTime = $(this).parent().siblings().children().children()[0].innerText.toUpperCase();

    var savedEntry = {
        'date' : currentDate,
        'time' : entryTime,
        'entry' : entry,
    };
    
    // console.log(savedEntries);
    // console.log(savedEntry)

    savedEntries.push(savedEntry);

    localStorage.setItem('savedEntries', JSON.stringify(savedEntries));
    // json stringify

};

/*=========================
INITIALIZATIONS
=========================*/

currentDateHTML.text(currentDate);
schedulerTimeTags.each(colorCodeEntries);
savedEntries = loadSavedEntries();

// console.dir(savedEntries);

container.on('click', '.saveBtn', saveEntry);
// localStorage.setItem('savedEntries',[]);
