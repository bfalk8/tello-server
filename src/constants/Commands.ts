export enum ControlCommands {
  COMMAND = 'command',
  TAKEOFF = 'takeoff',
  LAND = 'land',
  STREAM_ON = 'streamon',
  STREAM_OFF = 'streamoff',
  OH_FUCK = 'emergency',
  UP = 'up',
  DOWN = 'down',
  LEFT = 'left',
  RIGHT = 'right',
  FORWARD = 'forward',
  BACK = 'back',
  ROTATE_CLOCKWISE = 'cw',
  ROTATE_COUNTER_CLOCKWISE = 'ccw',
  FLIP = 'flip',
  // TODO: more to add here
};

export enum SetCommands {
  SPEED = 'speed',
  RC = 'rc',
  WIFI = 'wifi',
}

export enum ReadCommands {
  SPEED,
  BATTERY,
  TIME,
  HEIGHT,
  TEMP,
  ATTITUDE,
  BAROMETER,
  ACCELERATION,
  TOF,
  WIFI,
}

export type TelloCommand = ControlCommands | SetCommands | ReadCommands;