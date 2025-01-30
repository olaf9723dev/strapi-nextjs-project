

import { strapiSDK } from '@strapi/sdk-js';
const sdk = strapiSDK({ baseURL: 'http://localhost:1337/api' });
export default sdk;
