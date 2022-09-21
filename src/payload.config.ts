import { buildConfig } from 'payload/config';
import path from 'path';

import { User, Card, LiveBreak, FavouriteProduct, Bidding, Order, Shipping } from './collections';

export default buildConfig({
    admin: {
        user: User.slug
    },
    cors: '*',
    collections: [
        User,
        Card,
        LiveBreak,
        FavouriteProduct,
        Bidding,
        Order,
        Shipping,
        {
            slug: 'media',
            access: {
                read: () => true
            },
            fields: [
                {
                    name: 'alt',
                    type: 'text'
                }
            ],
            upload: true
        }
    ],
    typescript: {
        outputFile: path.resolve(__dirname, 'payload-types.ts')
    },
    graphQL: {
        schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql')
    }
});
