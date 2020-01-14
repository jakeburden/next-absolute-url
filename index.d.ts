/// <reference types="node" />
import { IncomingMessage } from 'http';
declare function absoluteUrl(req?: IncomingMessage, localhostAdress?: string): {
    protocol: string;
    host: string;
    origin: string;
};
export default absoluteUrl;
