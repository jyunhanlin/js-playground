// Behavioral Design Patterns

// Mediator 協調 ex:尋求PM協調出相關人力

class TrafficTower {
  constructor() {
    this.airplanes = [];
  }

  requestPositions() {
    return this.airplanes.map((airplane) => {
      return airplane.position;
    });
  }
}

class Airplane {
  constructor(position, trafficTower) {
    this.position = position;
    this.trafficTower = trafficTower;
    this.trafficTower.airplanes.push(this);
  }

  requestPositions() {
    return this.trafficTower.requestPositions();
  }
}

// -------

var Participant = function (name) {
  this.name = name;
  this.chatroom = null;
};

Participant.prototype = {
  send: function (message, to) {
    this.chatroom.send(message, this, to);
  },
  receive: function (message, from) {
    console.log(from.name + ' to ' + this.name + ': ' + message);
  },
};

var Chatroom = function () {
  var participants = {};

  return {
    register: function (participant) {
      participants[participant.name] = participant;
      participant.chatroom = this;
    },

    send: function (message, from, to) {
      if (to) {
        // single message
        to.receive(message, from);
      } else {
        // broadcast message
        for (key in participants) {
          if (participants[key] !== from) {
            participants[key].receive(message, from);
          }
        }
      }
    },
  };
};

function run() {
  var yoko = new Participant('Yoko');
  var john = new Participant('John');
  var paul = new Participant('Paul');
  var ringo = new Participant('Ringo');

  var chatroom = new Chatroom();
  chatroom.register(yoko);
  chatroom.register(john);
  chatroom.register(paul);
  chatroom.register(ringo);

  yoko.send('All you need is love.');
  yoko.send('I love you John.');
  john.send('Hey, no need to broadcast', yoko);
  paul.send('Ha, I heard that!');
}
