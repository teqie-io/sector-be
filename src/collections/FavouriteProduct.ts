import { CollectionConfig } from 'payload/types';

const FavouriteProduct: CollectionConfig = {
    slug: 'favouriteProduct',
    fields: [
        {
            name: 'user',
            type: 'relationship',
            relationTo: 'user',
            index: true,
            required: true
        },
        {
            name: 'card',
            type: 'relationship',
            relationTo: 'card',
            index: true,
            required: true
        }
    ]
};

export default FavouriteProduct;
