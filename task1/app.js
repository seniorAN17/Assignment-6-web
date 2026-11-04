/* Task 1: Selector Detective (selectors and traversal) */


/*
   Task 1, step 1: the party from the picture as an array
   */

var rooms = [
  { id: 'balcony', name: 'Balcony',     floor: 2 },
  { id: 'hall',    name: 'Hall',        floor: 2 },
  { id: 'kitchen', name: 'Kitchen',     floor: 1 },
  { id: 'living',  name: 'Living room', floor: 1 }
];

// guests are written from left to right, room by room
var guests = [
  // Balcony
  { room: 'balcony', name: 'Aigerim', color: 'green',  time: '20:45', aitu: true,  things: ['cup', 'crumbs'] },
  { room: 'balcony', name: 'Aliya',   color: 'black',  time: '21:15', aitu: false, things: ['phone', 'cup'] },
  { room: 'balcony', name: 'Madina',  color: 'green',  time: '22:10', aitu: false, things: ['phone', 'bag', 'crumbs'] },
  { room: 'balcony', name: 'Ivan',    color: 'black',  time: '20:10', aitu: true,  things: ['cup'] },

  // Hall
  { room: 'hall', name: 'Arman',   color: 'yellow', time: '20:35', aitu: false, things: ['bag', 'glasses'] },
  { room: 'hall', name: 'Sophia',  color: 'purple', time: '21:20', aitu: true,  things: ['phone'] },
  { room: 'hall', name: 'Dias',    color: 'green',  time: '19:45', aitu: true,  things: [] },
  { room: 'hall', name: 'Bekzat',  color: 'purple', time: '20:55', aitu: false, things: ['bag', 'cup', 'crumbs'] },
  { room: 'hall', name: 'Aruzhan', color: 'blue',   time: '21:50', aitu: true,  things: ['phone'] },
  { room: 'hall', name: 'Saule',   color: 'green',  time: '21:25', aitu: false, things: ['glasses'] },

  // Kitchen
  { room: 'kitchen', name: 'Nurlan', color: 'red',    time: '19:40', aitu: true,  things: ['phone', 'cup'] },
  { room: 'kitchen', name: 'Emma',   color: 'black',  time: '20:15', aitu: false, things: ['bag'] },
  { room: 'kitchen', name: 'Timur',  color: 'green',  time: '21:05', aitu: true,  things: ['phone', 'bag', 'crumbs'] },
  { room: 'kitchen', name: 'Sergey', color: 'yellow', time: '20:50', aitu: false, things: [] },
  { room: 'kitchen', name: 'Yerlan', color: 'red',    time: '21:40', aitu: true,  things: ['glasses', 'phone'] },
  { room: 'kitchen', name: 'Kamila', color: 'green',  time: '20:05', aitu: false, things: ['cup'] },

  // Living room
  { room: 'living', name: 'Daniel', color: 'blue',   time: '19:55', aitu: true,  things: ['glasses'] },
  { room: 'living', name: 'Zarina', color: 'green',  time: '21:10', aitu: false, things: ['bag', 'phone', 'crumbs'] },
  { room: 'living', name: 'Natasha', color: 'yellow', time: '20:30', aitu: true,  things: [] },
  { room: 'living', name: 'Askar',  color: 'black',  time: '21:00', aitu: true,  things: ['phone'] },
  { room: 'living', name: 'Inkar',  color: 'purple', time: '20:20', aitu: false, things: ['bag'] }
];

var icons = {
  phone:   '📱',
  glasses: '👓',
  bag:     '👜',
  cup:     '☕',
  crumbs:  '🍰'
};


/*
   Task 1, step 2: build the page from the array with jQuery
   */

// makes one guest card (the data is stored in classes and data-* attributes)
function createCard(guest) {
  var card = $('<div></div>');

  // classes
  card.addClass('guest');
  card.addClass('c-' + guest.color);
  if (guest.aitu) {
    card.addClass('aitu');
  }
  for (var i = 0; i < guest.things.length; i++) { // add a class for every thing
    card.addClass(guest.things[i]); // things[i] gets index of thing then addClass create a class for that thing
  }

  // data-* attributes
  card.attr('data-name', guest.name);
  card.attr('data-time', guest.time);
  card.attr('data-room', guest.room);
  card.attr('data-color', guest.color);
  card.attr('data-aitu', guest.aitu);
  card.attr('data-things', guest.things.join(' '));

  // what we see on the card
  var inner = $('<div class="inner"></div>');
  inner.append('<img src="avatars/' + guest.name + '.svg">');
  if (guest.aitu) {
    inner.append('<span class="badge">🎓</span>');
  }
  inner.append('<b>' + guest.name + '</b>');
  inner.append('<small>⏱ ' + guest.time + '</small>');

  var thingsText = '';
  for (var j = 0; j < guest.things.length; j++) {
    thingsText = thingsText + icons[guest.things[j]] + ' ';
  }
  inner.append('<div>' + thingsText + '&nbsp;</div>');

  card.append(inner);
  return card;
}

// builds the whole house again from the arrays
function buildPage() {
  $('.fly').remove();
  $('#house').empty();

  var floorNumbers = [2, 1];

  for (var f = 0; f < floorNumbers.length; f++) {
    var number = floorNumbers[f];

    var floorDiv = $('<div class="floor"></div>');
    floorDiv.addClass('floor-' + number);
    floorDiv.attr('data-floor', number);
    floorDiv.append('<div class="label">FLOOR ' + number + '</div>');

    for (var r = 0; r < rooms.length; r++) {
      var room = rooms[r];
      if (room.floor !== number) {
        continue;
      }

      var roomDiv = $('<div class="room"></div>');
      roomDiv.attr('id', room.id);

      var headerDiv = $('<div class="header"></div>');
      headerDiv.append('<h3>' + room.name + '</h3>');
      roomDiv.append(headerDiv);

      var guestsDiv = $('<div class="guests"></div>');
      for (var g = 0; g < guests.length; g++) {
        if (guests[g].room === room.id) {
          guestsDiv.append(createCard(guests[g]));
        }
      }
      roomDiv.append(guestsDiv);

      floorDiv.append(roomDiv);
    }

    $('#house').append(floorDiv);
  }
}


/*
   Task 1, step 4: the 20 cases.
   Every case is ONE jQuery chain that searches the page.
   */

  /* This is a jQuery chain:
   $('#hall .guest'); firts find a hall and then find a guest inside it and return it. */

var cases = [
  // 1. Who is in the hall?
  {
    title: 'Who is in the hall?',
    find: function () {
      return $('#hall .guest');
    }
  },

  // 2. Who is dressed in yellow or purple?
  {
    title: 'Who is dressed in yellow or purple?',
    find: function () {
      return $('.guest.c-yellow, .guest.c-purple');
    }
  },

  // 3. Which AITU students are upstairs?
  {
    title: 'Which AITU students are upstairs?',
    find: function () {
      return $('.floor-2 .guest.aitu');
    }
  },

  // 4. Who has glasses or a bag?
  {
    title: 'Who has glasses or a bag?',
    find: function () {
      return $('.guest.glasses, .guest.bag');
    }
  },

  // 5. Who came with nothing at all?
  {
    title: 'Who came with nothing at all?',
    find: function () {
      return $('.guest')
        .not('.phone')
        .not('.glasses')
        .not('.bag')
        .not('.cup')
        .not('.crumbs');
    }
  },

  // 6. Who has a phone but no bag?
  {
    title: 'Who has a phone but no bag?',
    find: function () {
      return $('.guest.phone:not(.bag)');
    }
  },

  // 7. Who arrived between 20:30 and 21:00, both included?
  {
    title: 'Who arrived between 20:30 and 21:00?',
    find: function () {
      return $('.guest').filter(function () {
        var time = $(this).attr('data-time');
        return time >= '20:30' && time <= '21:00';
      });
    }
  },

  // 8. Who arrived after 21:00 and is not an AITU student?
  {
    title: 'Who arrived after 21:00 and is not AITU?',
    find: function () {
      return $('.guest:not(.aitu)').filter(function () {
        return $(this).attr('data-time') > '21:00';
      });
    }
  },

  // 9. Who stands right next to Askar? (siblings that stand right before or after him)
  {
    title: 'Who stands right next to Askar?',
    find: function () {
      return $('.guest[data-name="Askar"]')
        .siblings()
        .filter(function () {
          // a neighbour is a sibling that has Askar right before or right after it
          return $(this).prev().is('[data-name="Askar"]') ||
                 $(this).next().is('[data-name="Askar"]');
        });
    }
  },

  // 10. Who stands last in each room?
  {
    title: 'Who stands last in each room?',
    find: function () {
      return $('.room .guest:last-child');
    }
  },

  // 11. Who stands third in each room?
  {
    title: 'Who stands third in each room?',
    find: function () {
      return $('.room .guest:nth-child(3)');
    }
  },

  // 12. Who stands after Timur in his room?
  {
    title: 'Who stands after Timur in his room?',
    find: function () {
      return $('.guest[data-name="Timur"]').nextAll();
    }
  },

  // 13. Who stands right before someone in black?
  {
    title: 'Who stands right before someone in black?',
    find: function () {
      return $('.guest.c-black').prev();
    }
  },

  // 14. In which room is Aruzhan?
  {
    title: 'In which room is Aruzhan?',
    find: function () {
      return $('.guest[data-name="Aruzhan"]').closest('.room');
    }
  },

  // 15. Which rooms have fewer than 6 guests?
  {
    title: 'Which rooms have fewer than 6 guests?',
    find: function () {
      return $('.room').filter(function () {
        return $(this).find('.guest').length < 6;
      });
    }
  },

  // 16. In which rooms does somebody have a cup, but nobody wears glasses?
  {
    title: 'Rooms with a cup but without glasses',
    find: function () {
      return $('.room:has(.cup):not(:has(.glasses))');
    }
  },

  // 17. Who came first to each room?
  {
    title: 'Who came first to each room?',
    find: function () {
      return $('.room').map(function () {
        var first = null;
        $(this).find('.guest').each(function () {
          if (first === null || $(this).attr('data-time') < $(first).attr('data-time')) {
            first = this;
          }
        });
        return first;
      });
    }
  },

  // 18. Miras comes between Askar and Inkar (fadeIn)
  {
    title: 'Miras comes to the living room',
    find: function () {
      var miras = createCard({
        room: 'living', name: 'Miras', color: 'blue',
        time: '21:20', aitu: true, things: ['phone']
      });
      return miras
        .hide()
        .insertAfter('.guest[data-name="Askar"]')
        .fadeIn(800);
    }
  },

  // 19. Natasha goes home (fadeOut, then remove)
  {
    title: 'Natasha goes home',
    noJump: true,
    find: function () {
      return $('.guest[data-name="Natasha"]').fadeOut(800, function () {
        $(this).remove();
      });
    }
  },

  // 20. Who took the cake?
  {
    title: 'Who took the cake?',
    find: function () {
      return $('.floor-1 .guest.crumbs:not(.cup)')
        .filter(function () {
          var time = $(this).attr('data-time');
          return time > '21:00' && time < '21:30';
        })
        .filter(function () {
          return $(this).prev().add($(this).next()).filter('.aitu').length > 0;
        });
    }
  }
];


/*
   Task 1, step 3: case buttons (highlight, jump, show names)
   */

function runCase(index) {
  // build the page again before every case
  buildPage();

  var found = cases[index].find();

  // collect the names (a room has no name, so we take its title)
  var names = [];
  found.each(function () {
    var name = $(this).attr('data-name');
    if (!name) {
      name = $(this).find('h3').text();
    }
    names.push(name);
  });

  // highlight
  found.addClass('hit');

  // jump once with animate()
  if (!cases[index].noJump) {
    found.animate({ top: -15 }, 150).animate({ top: 0 }, 150);
  }

  $('#result').text('Case ' + (index + 1) + ': ' + cases[index].title +
                    ' → ' + names.length + ': ' + names.join(', '));
}

$(document).ready(function () {
  for (var i = 0; i < cases.length; i++) {
    var button = $('<button></button>');
    button.text(i + 1);
    button.attr('title', cases[i].title);
    button.data('index', i);
    $('#cases').append(button);
  }

  $('#cases').on('click', 'button', function () {
    runCase($(this).data('index'));
  });

  buildPage();
});
