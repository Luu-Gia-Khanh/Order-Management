import { ShippingUnit } from '../types/ShippingUnit';
import { mapJsonToShipping } from '../utils/shipping.util';
import shippingDb from '../../../../public/data/shippings.json';

export const shippingRepository = {
    async fetchAllShippings(): Promise<ShippingUnit[]> {
        return shippingDb.map(mapJsonToShipping);
    },
};
