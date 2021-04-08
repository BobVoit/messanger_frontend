import io from 'socket.io-client';
import { SETTINGS } from '../settings';

const socket = io(SETTINGS.WS_BASE, { autoConnect: false });

export default socket;