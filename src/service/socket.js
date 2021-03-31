import io from 'socket.io-client';
import { SETTINGS } from '../settings';
export const socket = io(SETTINGS.WS_BASE);