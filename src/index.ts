import { HOST, ports } from './constants/Connections';
import { CommandDispatcher } from './CommandDispatcher';
import dgram from 'dgram';
import CommandCreator from './CommandCreator';
const client = dgram.createSocket('udp4');

const dispatcher = new CommandDispatcher(client, HOST, ports.COMMANDS);

client.on('message', (msg, info) => {
	console.log(`Data received from server : ${msg.toString()}`);
	console.log('Received %d bytes from %s:%d\n', msg.length, info.address, info.port);
});

client.bind(ports.COMMANDS);

dispatcher.dispatch(CommandCreator.connect());

process.stdin.on('keypress', (str, key) => {
	if (key.ctrl && key.name === 'c') {
		client.close();
		process.exit(); 
	} 
});

const readline = require('readline');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

rl.question('do you want to takeoff?', (answer: string) => {
	console.log(`take off: ${answer}`);
	if (answer === 'y') {
		dispatcher.dispatch(CommandCreator.takeOff());
		rl.question('do you want to land?', (answer: string) => {
			dispatcher.dispatch(CommandCreator.land());
			console.log(`land: ${answer}`);
			rl.close();
		});
	} else {
		rl.close();
	}
});
