import { HOST, ports } from './constants/Connections';
import { CommandDispatcher } from './CommandDispatcher';
import dgram, { Socket } from 'dgram';
import {
	DispatchCommand,
	connect,
	land,
	takeOff,
	videoStreamOn,
	videoStreamOff,
	OHFUCK,
	up,
	left,
	right,
	forward,
	back,
	down,
	rotateCW,
	rotateCCW,
	flip,
	speed,
	wifi,
} from './CommandCreator';
import { EventEmitter } from 'events';
import { commandDelays } from './constants/CommandDelays';
import { ControlCommands } from './constants/Commands';
import { mapStreamToTelloState, mapBufferToTelloState, TelloState } from './constants/TelloState';

const DELAY_EXPIRED = 'delay_expired';
export class TelloServer {
	private commandClient: Socket;
	private stateClient: Socket;
	private videoClient: Socket;

	private sendAddress: string;

	private commandSendPort: number;
	private commandReceivePort: number;
	private stateReceivePort: number;
	private videoReceivePort: number;

	private dispatcher: CommandDispatcher;

	private canDispatch: boolean;
	private dispatchEmitter: EventEmitter;
	private stateEmitter: EventEmitter;

	constructor(
		sendAddress = HOST,
		commandSendPort = ports.COMMANDS,
		commandReceivePort = ports.COMMANDS,
		stateReceivePort = ports.STATE,
		videoReceivePort = ports.VIDEO
	) {
		this.canDispatch = false;
		this.dispatchEmitter = new EventEmitter();
		this.dispatchEmitter.on(DELAY_EXPIRED, () => {
			this.canDispatch = true;
		});
		this.stateEmitter = new EventEmitter();

		this.sendAddress = sendAddress;
		this.commandSendPort = commandSendPort;
		this.commandReceivePort = commandReceivePort;
		this.stateReceivePort = stateReceivePort;
		this.videoReceivePort = videoReceivePort;

		this.createSockets();
		this.bindSockets();
		this.setupSocketHandlers();
		this.dispatcher = new CommandDispatcher(this.commandClient, this.sendAddress, this.commandSendPort);
		this.canDispatch = true;
		this.connect();
	}

	private createSockets = () => {
		this.commandClient = dgram.createSocket('udp4');
		this.stateClient = dgram.createSocket('udp4');
		this.videoClient = dgram.createSocket('udp4');
	};

	// TODO: add callbacks to set proper flags
	private bindSockets = () => {
		this.commandClient.bind(this.commandReceivePort);
		this.stateClient.bind(this.stateReceivePort);
		// this.videoClient.bind(this.videoReceivePort);
	};

	private setupSocketHandlers = () => {
		this.commandClient.on('message', this.handleReceiveCommand);
		this.stateClient.on('message', this.handleReceiveState);
	};

	private handleReceiveCommand = (msg: Buffer, info: { address: string; family: string; port: number; size: number }) =>
		console.info(`Received command: ${msg.toString()}`);

	private handleReceiveState = (msg: Buffer, info: { address: string; family: string; port: number; size: number }) => {
		const state = mapBufferToTelloState(msg);
		// console.info(`Received command: ${msg.toString()}`);
		// console.info(mapBufferToTelloState(msg));
		this.stateEmitter.emit('message', state);
	};
	
	connect = (): boolean => {
		return this.dispatch(connect());
	};

	dispatch = (command: DispatchCommand): boolean => {
		if (this.canDispatch) {
			this.canDispatch = false;
			this.dispatcher.dispatch(command);
			setTimeout(() => this.dispatchEmitter.emit(DELAY_EXPIRED), commandDelays.get(command.type));
			return true;
		}
		// dispatch failed due to delay
		console.info(`Command ${command.buffer.toString()} not dispatched due to delay`);
		return false;
	};

	close = () => {
		this.commandClient.close();
		this.stateClient.close();
		this.videoClient.close();
	};

	addStateListener = (callback: (state: TelloState) => any) => {
		this.stateEmitter.on('message', callback);
	};

	control = {
		connect: () => this.dispatch(connect()),
		takeOff: () => this.dispatch(takeOff()),
		land: () => this.dispatch(land()),
		videoStreamOn: () => this.dispatch(videoStreamOn()),
		videoStreamOff: () => this.dispatch(videoStreamOff()),
		OHFUCK: () => this.dispatch(OHFUCK()),
		up: (distance: number) => this.dispatch(up(distance)),
		down: (distance: number) => this.dispatch(down(distance)),
		left: (distance: number) => this.dispatch(left(distance)),
		right: (distance: number) => this.dispatch(right(distance)),
		forward: (distance: number) => this.dispatch(forward(distance)),
		back: (distance: number) => this.dispatch(back(distance)),
		rotateCW: (angle: number) => this.dispatch(rotateCW(angle)),
		rotateCCW: (angle: number) => this.dispatch(rotateCCW(angle)),
		flip: (direction: string) => this.dispatch(flip(direction)),
	};

	set = {
		speed: (velocity: number) => this.dispatch(speed(velocity)),
		wifi: (ssid: string, password: string) => this.dispatch(wifi(ssid, password)),
	};
}

export default TelloServer;
