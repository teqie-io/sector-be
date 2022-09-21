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
            name: 'shipping',
            type: 'relationship',
            relationTo: 'shipping',
            required: true
        },
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
    ]
};

export default Checkout;
