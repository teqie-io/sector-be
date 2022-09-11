import { CollectionConfig } from 'payload/types';
const OrderDetails: CollectionConfig = {
    slug: 'orderDetails',
    fields: [
        {
            name: 'order',
            type: 'relationship',
            relationTo: 'order',
            index: true,
            required: true
        }
    ]
}

export default OrderDetails;