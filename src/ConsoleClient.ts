import TelloServer from './TelloServer';

// init
const tello = new TelloServer();

// command mapping
const runCommand = (command: string) => {
	const [verb, ...params] = command.split(' ');
	console.info(`runCommand verb: ${verb}`);
	console.info(`runCommand params: ${params}`);
	switch (verb) {
		// control commands
		case 'takeoff':
			return tello.control.takeOff();
		case 'land':
			return tello.control.land();
		case 'rotatecw':
			return tello.control.rotateCW(Number(params[0]));
		case 'rotateccw':
			return tello.control.rotateCCW(Number(params[0]));
		case 'up':
			return tello.control.up(Number(params[0]));
		case 'down':
			return tello.control.down(Number(params[0]));
		case 'forward':
			return tello.control.forward(Number(params[0]));
		case 'back':
			return tello.control.back(Number(params[0]));
		case 'left':
			return tello.control.left(Number(params[0]));
		case 'right':
			return tello.control.right(Number(params[0]));
		case 'flip':
			return tello.control.flip(params[0]);
		case 'videoon':
			return tello.control.videoStreamOn();
		case 'videooff':
			return tello.control.videoStreamOff();
		// set commands
		case 'speed':
			return tello.set.speed(Number(params[0]));
		case 'wifi':
			return tello.set.wifi(params[0], params[1]);
		default: {
			console.info('INVALID COMMAND');
			return false;
		}
	}
};

// console interface
import readline from 'readline';
const rl = readline.createInterface(process.stdin, process.stdout);
rl.setPrompt('give me your command dude > ');
rl.prompt();

// capture commands
rl.on('line', (line: string) => {
	console.info(`read line: ${line}`);
	if (!runCommand(line)) console.info('DELAY TRIGGERED!');
	rl.prompt();
}).on('close', () => {
	tello.control.OHFUCK();
	tello.close();
	process.exit(0);
});
