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

	constructor(
		sendAddress = HOST,
		commandSendPort = ports.COMMANDS,
		commandReceivePort = ports.COMMANDS,
		stateReceivePort = ports.STATE,
		videoReceivePort = ports.VIDEO
	) {
		this.sendAddress = sendAddress;
		this.commandSendPort = commandSendPort;
		this.commandReceivePort = commandReceivePort;
		this.stateReceivePort = stateReceivePort;
		this.videoReceivePort = videoReceivePort;

		this.createSockets();
		this.bindSockets();
		this.setupSocketHandlers();
		this.dispatcher = new CommandDispatcher(this.commandClient, this.sendAddress, this.commandSendPort);
		this.dispatcher.dispatch(connect());
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
		this.videoClient.bind(this.videoReceivePort);
	};

	private setupSocketHandlers = () => {
		this.commandClient.on('message', this.handleReceiveCommand);
	};

	private handleReceiveCommand = (msg: string, info: { address: string; family: string; port: number; size: number }) =>
		console.log(msg.toString());

	dispatch = (command: DispatchCommand): void => {
		this.dispatcher.dispatch(command);
	};

	close = () => {
		this.commandClient.close();
		this.stateClient.close();
		this.videoClient.close();
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
