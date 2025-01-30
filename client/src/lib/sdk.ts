import { getStrapiURL } from "@/lib/utils";
import { strapiSDK } from '@strapi/sdk-js';

const BASE_API_URL = getStrapiURL() + "/api";
const sdk = strapiSDK({ baseURL: BASE_API_URL });
export default sdk;
