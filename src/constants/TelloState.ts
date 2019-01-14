export interface TelloState {
	pitch: number;
	roll: number;
	yaw: number;
	velocityX: number;
	velocityY: number;
	velocityZ: number;
	tempLow: number;
	tempHigh: number;
	tof: number;
	height: number;
	battery: number;
	barometer: number;
	time: number;
	accelerationX: number;
	accelerationY: number;
	accelerationZ: number;
}

const setTelloStateParam = (state: TelloState, param: { name: string; value: string }) => {
	switch (param.name) {
		case 'pitch':
			state.pitch = Number(param.value);
			break;
		case 'roll':
			state.roll = Number(param.value);
			break;
		case 'yaw':
			state.yaw = Number(param.value);
			break;
		case 'vgx':
			state.velocityX = Number(param.value);
			break;
		case 'vgy':
			state.velocityY = Number(param.value);
			break;
		case 'vgz':
			state.velocityZ = Number(param.value);
			break;
		case 'templ':
			state.tempLow = Number(param.value);
			break;
		case 'temph':
			state.tempHigh = Number(param.value);
			break;
		case 'tof':
			state.tof = Number(param.value);
			break;
		case 'h':
			state.height = Number(param.value);
			break;
		case 'bat':
			state.battery = Number(param.value);
			break;
		case 'baro':
			state.barometer = Number(param.value);
			break;
		case 'time':
			state.time = Number(param.value);
			break;
		case 'agx':
			state.accelerationX = Number(param.value);
			break;
		case 'agy':
			state.accelerationY = Number(param.value);
			break;
		case 'agz':
			state.accelerationZ = Number(param.value);
			break;
	}
};

export const mapStreamToTelloState = (stream: string) => {
	const params = stream.split(';').map(element => {
		const split = element.split(':');
		return {
			name: split[0],
			value: split[1],
		};
	});

	const telloState: TelloState = {
		pitch: 0,
		roll: 0,
		yaw: 0,
		velocityX: 0,
		velocityY: 0,
		velocityZ: 0,
		tempLow: 0,
		tempHigh: 0,
		tof: 0,
		height: 0,
		battery: 0,
		barometer: 0,
		time: 0,
		accelerationX: 0,
		accelerationY: 0,
		accelerationZ: 0,
	};

	params.forEach(param => setTelloStateParam(telloState, param));
	return telloState;
};

export const mapBufferToTelloState = (buffer: Buffer) => {
  return mapStreamToTelloState(buffer.toString());
};