import { DispatchCommand } from './CommandCreator';
import { Socket } from 'dgram';

export class CommandDispatcher {
	private client: Socket;
	private address: string;
	private port: number;
	constructor(client: Socket, address: string, port: number) {
		this.client = client;
		this.address = address;
		this.port = port;
	}

	private commandCallback = (err: Error, bytes: number) => console.error(err);

	dispatch = ({ buffer, size, offset, type }: DispatchCommand) => {
    console.log(`Dispatching command: ${type}, to addr: ${this.address}:${this.port}`)
		this.client.send(buffer, offset, size, this.port, this.address, this.commandCallback);
	};
}
