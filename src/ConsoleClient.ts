import TelloServer from './TelloServer';

// init
const tello = new TelloServer();

const runCommand = (command: string) => {
  const [verb, ...params] = command.split(' ');
  console.log(verb);
  console.log(params);
  switch(verb) {
    case 'takeoff': tello.control.takeOff(); break;
    case 'land': tello.control.land(); break;
    case 'rotatecw': tello.control.rotateCW(Number(params[0])); break;
    case 'rotateccw': tello.control.rotateCCW(Number(params[0])); break;
    case 'up': tello.control.up(Number(params[0])); break;
    case 'down': tello.control.down(Number(params[0])); break;
    case 'forward': tello.control.forward(Number(params[0])); break;
    case 'back': tello.control.back(Number(params[0])); break;
    case 'left': tello.control.left(Number(params[0])); break;
    case 'right': tello.control.right(Number(params[0])); break;
    case 'flip': tello.control.flip(params[0]); break;
    // set commands
    case 'speed': tello.set.speed(Number(params[0])); break;
    case 'wifi': tello.set.wifi(params[0], params[1]); break;
  }
};

// console interface
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);
rl.setPrompt('give me your command dude > ');
rl.prompt();

// capture commands
rl.on('line', (line: string) => {
    runCommand(line);
    rl.prompt();
}).on('close', () => {
    tello.control.OHFUCK();
    tello.close();
    process.exit(0);
});