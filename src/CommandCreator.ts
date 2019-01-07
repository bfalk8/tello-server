import { TelloCommand, ControlCommands, SetCommands } from './constants/Commands';
import * as _ from 'lodash';

export interface DispatchCommand {
	type: TelloCommand;
	buffer: Buffer;
	size: number;
	offset: number;
}

const createCommand = (command: TelloCommand, ...params: string[]): DispatchCommand => {
	const buffer = Buffer.from(`${command}${params.map(param => ` ${param}`).join('')}`);
	return {
		buffer,
		type: command,
		size: buffer.length,
		offset: 0,
	};
};

// Control Commands
export const connect = () => createCommand(ControlCommands.COMMAND);
export const takeOff = () => createCommand(ControlCommands.TAKEOFF);
export const land = () => createCommand(ControlCommands.LAND);
export const videoStreamOn = () => createCommand(ControlCommands.STREAM_ON);
export const videoStreamOff = () => createCommand(ControlCommands.STREAM_OFF);
export const OHFUCK = () => createCommand(ControlCommands.OH_FUCK);
export const up = (distance: number) => createCommand(ControlCommands.UP, _.clamp(distance, 20, 500).toString());
export const down = (distance: number) => createCommand(ControlCommands.DOWN, _.clamp(distance, 20, 500).toString());
export const left = (distance: number) => createCommand(ControlCommands.LEFT, _.clamp(distance, 20, 500).toString());
export const right = (distance: number) => createCommand(ControlCommands.RIGHT, _.clamp(distance, 20, 500).toString());
export const forward = (distance: number) => createCommand(ControlCommands.FORWARD, _.clamp(distance, 20, 500).toString());
export const back = (distance: number) => createCommand(ControlCommands.BACK, _.clamp(distance, 20, 500).toString());
export const rotateCW = (angle: number) => createCommand(ControlCommands.ROTATE_CLOCKWISE, _.clamp(angle, 1, 3600).toString());
export const rotateCCW = (angle: number) => createCommand(ControlCommands.ROTATE_COUNTER_CLOCKWISE, _.clamp(angle, 1, 3600).toString());
export const flip = (direction: string) => createCommand(ControlCommands.FLIP, direction);

// Set Commands
export const speed = (velocity: number) => createCommand(SetCommands.SPEED, _.clamp(velocity, 10, 100).toString());
export const wifi = (ssid: string, password: string) => createCommand(SetCommands.WIFI, ssid, password);

// Read Commands

export default {
	connect,
	takeOff,
	land,
};
