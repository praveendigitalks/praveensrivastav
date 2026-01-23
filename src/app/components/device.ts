import DeviceDetector from 'device-detector-js';
import { v4 as uuidv4 } from 'uuid';

const detector = new DeviceDetector();

export function getDeviceInfo() {
  const device = detector.parse(navigator.userAgent);

  return {
    deviceName: `${device.client?.name || 'Unknown'} on ${device.os?.name || 'Unknown'}`,
    browser: device.client?.name,
    os: device.os?.name,
    deviceType: device.device?.type || 'desktop',
    userAgent: navigator.userAgent,
  };
}

export function getDeviceId(): string {
  let deviceId = localStorage.getItem('deviceId');

  if (!deviceId) {
    deviceId = uuidv4();
    localStorage.setItem('deviceId', deviceId);
  }

  return deviceId;
}
