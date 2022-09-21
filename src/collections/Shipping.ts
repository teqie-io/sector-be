import { CollectionConfig } from 'payload/types';
const Shipping: CollectionConfig = {
    slug: 'shippings',
    access: {
        read: () => true
    },
    admin: {
        useAsTitle: 'id'
    },
    fields: [
        {
            name: 'firstName',
            type: 'text',
            required: true
        },
        {
            name: 'lastName',
            type: 'text',
            required: true
        },
        {
            name: 'address',
            type: 'text',
            required: true
        },
        {
            name: 'city',
            type: 'text',
            required: true
        },
        {
            name: 'state',
            type: 'text',
            required: true
        },
        {
            name: 'postCode',
            type: 'text',
            required: true
        },
        {
            name: 'email',
            type: 'text',
            required: true
        },
        {
            name: 'phoneNumber',
            type: 'text',
            required: true
        }
    ]
}

export default Shipping;