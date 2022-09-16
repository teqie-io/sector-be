import { CollectionConfig } from 'payload/types';
const Checkout: CollectionConfig = {
    slug: 'checkout',
    admin: {
        useAsTitle: 'transactionId'
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
            name: 'currency',
            type: 'text',
            required: true
        },
        {
            name: 'totalAmount',
            type: 'number',
            min: 0,
            index: true,
            required: true,
            validate: (value) => {
                if (Number.isInteger(value)) {
                    if (value < 0 || value > 999999) {
                        return `Your total amount must be less than $999,999 (${value})`;
                    }
                }
                return `"${value}" is not an integer.`;
            }
        },
        {
            name: 'checkoutTime',
            type: 'text',
            required: true
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
        }
    ]
};

export default Checkout;
