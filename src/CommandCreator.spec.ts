import { expect } from 'chai';
import 'mocha';

import {
  connect,
  takeOff,
  land,
  videoStreamOn,
  videoStreamOff,
  OHFUCK,
  up,
  down,
  left,
  right,
  forward,
  back,
  rotateCW,
  rotateCCW,
  flip,
  speed,
  wifi,
} from './CommandCreator';

export const testCommand = describe('connect function', () => {
  it('should return connect command', () => {
    const result = connect();
    expect(result.buffer.toString()).to.equal('command');
  });
});

export const testTakeOff = describe('takeOff function', () => {
  it('should return takeoff command', () => {
    const result = takeOff();
    expect(result.buffer.toString()).to.equal('takeoff');
  });
});

export const testLand = describe('land function', () => {
  it('should return land command', () => {
    const result = land();
    expect(result.buffer.toString()).to.equal('land');
  })
})

export const testVideoStreamOn = describe('videoStreamOn function', () => {
  it('should return streamon command', () => {
    const result = videoStreamOn();
    expect(result.buffer.toString()).to.equal('streamon');
  });
});

export const testVideoStreamOff = describe('videoStreamOff function', () => {
  it('should return streamoff command', () => {
    const result = videoStreamOff();
    expect(result.buffer.toString()).to.equal('streamoff');
  });
});

export const testOHFUCK = describe('OHFUCK function', () => {
  it('should return emergency command', () => {
    const result = OHFUCK();
    expect(result.buffer.toString()).to.equal('emergency');
  });
});

export const testUp = describe('up 100 function', () => {
  it('should return up 100', () => {
    const result = up(100);
    expect(result.buffer.toString()).to.equal('up 100');
  });
});

export const testDown = describe('down 100 function', () => {
  it('should return down 100 command', () => {
    const result = down(100);
    expect(result.buffer.toString()).to.equal('down 100');
  });
});

export const testLeft = describe('left 100 function', () => {
  it('should return left 100 command', () => {
    const result = left(100);
    expect(result.buffer.toString()).to.equal('left 100');
  });
});

export const testRight = describe('right 100 function', () => {
  it('should return right 100 command', () => {
    const result = right(100);
    expect(result.buffer.toString()).to.equal('right 100');
  });
});

export const testForward = describe('forward 100 function', () => {
  it('should return forward 100 command', () => {
    const result = forward(100);
    expect(result.buffer.toString()).to.equal('forward 100');
  });
});

export const testBack = describe('back 100 function', () => {
  it('should return back 100 command', () => {
    const result = back(100);
    expect(result.buffer.toString()).to.equal('back 100');
  });
});

export const testRotateCW = describe('rotateCW 90 function', () => {
  it('should return cw 90 command', () => {
    const result = rotateCW(90);
    expect(result.buffer.toString()).to.equal('cw 90');
  });
});

export const testRotateCCW = describe('rotateCCW 90 function', () => {
  it('should return ccw 90 command', () => {
    const result = rotateCCW(90);
    expect(result.buffer.toString()).to.equal('ccw 90');
  });
});

export const testFlip = describe('flip l function', () => {
  it('should return flip l command', () => {
    const result = flip('l');
    expect(result.buffer.toString()).to.equal('flip l');
  });
});

// set commands
export const testSetSpeed = describe('set speed 100 function', () => {
  it('should return speed 100 command', () => {
    const result = speed(100);
    expect(result.buffer.toString()).to.equal('speed 100');
  });
});

export const testSetWifi = describe('set wifi skynet judgementday', () => {
  it('should return wifi skynet judgementday command', () => {
    const result = wifi('skynet', 'judgementday');
    expect(result.buffer.toString()).to.equal('wifi skynet judgementday');
  });
});