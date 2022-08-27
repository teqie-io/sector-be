import { CollectionConfig } from 'payload/types';
const Checkout: CollectionConfig = {
    slug: 'checkout',
    admin: {
        useAsTitle: 'name'
    },
    access: {
        read: () => true
    },
    fields: [
        {
            name: 'transactionId',
            type: 'text',
            required: true
        },
        {
            name: 'totalAmount',
            type: 'number',
            min: 0,
            index: true,
            required: true
        },
        {
            name: 'checkoutTime',
            type: 'date',
            required: true,
            defaultValue: new Date()
        },
        {
            name: 'type',
            type: 'text',
            required: true
        },
        {
            name: 'paymentMethod',
            type: 'text',
            required: true
        },
        {
            name: 'status',
            type: 'text'
        }
    ]
};

export default Checkout;
