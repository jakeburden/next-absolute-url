/// <reference types="node" />
import { IncomingMessage } from 'http';
declare function absoluteUrl(req?: IncomingMessage, localhostAddress?: string, options?: {
    https: boolean;
}): {
    protocol: string;
    host: string;
    origin: string;
};
export default absoluteUrl;
