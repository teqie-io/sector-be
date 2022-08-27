import { buildConfig } from 'payload/config';
import path from 'path';

import { User, Card, FavouriteProduct, Bidding, LiveBreak, Checkout } from './collections';

export default buildConfig({
    admin: {
        user: User.slug
    },
    cors: '*',
    collections: [
        User,
        Card,
        FavouriteProduct,
        Bidding,
        Checkout,
        LiveBreak,
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
