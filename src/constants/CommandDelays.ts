import { TelloCommand, ControlCommands, SetCommands } from './Commands';

export const commandDelays = new Map<TelloCommand, number>([
	[ControlCommands.COMMAND, 500],
	[ControlCommands.TAKEOFF, 5000],
	[ControlCommands.LAND, 5000],
	[ControlCommands.UP, 7000],
	[ControlCommands.DOWN, 7000],
	[ControlCommands.LEFT, 5000],
	// go: 7000,
	[ControlCommands.RIGHT, 5000],
	[ControlCommands.FORWARD, 5000],
	[ControlCommands.BACK, 5000],
	[ControlCommands.ROTATE_CLOCKWISE, 5000],
	[ControlCommands.ROTATE_COUNTER_CLOCKWISE, 5000],
	[ControlCommands.FLIP, 3000],
	[SetCommands.SPEED, 3000],
	// 'battery?': 500,
	// 'speed?': 500,
	// 'time?': 500,
]);
