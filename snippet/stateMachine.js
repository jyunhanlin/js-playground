function* stateMachine() {
  let state = 'start';

  while (true) {
    switch (state) {
      case 'start':
        console.log('Enter start state');
        state = yield 'start';
        break;

      case 'middle':
        console.log('Enter middle state');
        state = yield 'middle';
        break;

      case 'end':
        console.log('Enter end state');
        state = yield 'end';
        break;
    }
  }
}

const sm = stateMachine();

console.log(sm.next().value); // Enter start state
console.log(sm.next('middle').value); // Enter middle state
console.log(sm.next('end').value); // Enter end state
