import { CollectionConfig } from 'payload/types';

const Bidding: CollectionConfig = {
    slug: 'bidding',
    admin: {
        useAsTitle: 'card'
    },
    access: {
        read: () => true
    },
    fields: [
        {
            name: 'card',
            type: 'relationship',
            relationTo: 'card',
            index: true,
            required: true
        },
        {
            name: 'user',
            type: 'relationship',
            relationTo: 'user',
            index: true,
            required: true
        },
        {
            name: 'price',
            type: 'number',
            min: 0,
            required: true
        }
    ]
};

export default Bidding;
