import { PROTOCOL } from '@/config/config';

function CheckProtocol(protocol: string) {
  return protocol === PROTOCOL;
}

export default CheckProtocol;
