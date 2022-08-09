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
      name: 'product',
      type: 'relationship',
      relationTo: 'product',
      index: true,
      required: true
    },
  ],
}

export default FavouriteProduct;