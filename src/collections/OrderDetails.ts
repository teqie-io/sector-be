import { CollectionConfig } from 'payload/types';
const OrderDetails: CollectionConfig = {
    slug: 'orderDetails',
    fields: [
        {
            name: 'checkout',
            type: 'relationship',
            relationTo: 'checkout',
            index: true,
            required: true
        },
        {
            name: 'card',
            type: 'relationship',
            relationTo: 'card',
            index: true,
            required: true
        },
        {
            name: 'productName',
            type: 'text',
            required: true
        },
        {
            name: 'productPrice',
            type: 'number',
            min: 0.01,
            required: true
        },
        {
            name: 'productDiscount',
            type: 'number',
            required: true
        },
        {
            name: 'productFinalPrice',
            type: 'number',
            required: true
        }
    ]
}

export default OrderDetails;