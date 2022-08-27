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
        },
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
        },
    ]
}

export default Checkout;