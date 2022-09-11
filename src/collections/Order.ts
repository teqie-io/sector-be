import { CollectionConfig } from 'payload/types';
const Order: CollectionConfig = {
    slug: 'order',
    fields: [
        {
            name: 'card',
            type: 'relationship',
            relationTo: 'card',
            index: true,
            required: true
        }
    ]
}

export default Order;