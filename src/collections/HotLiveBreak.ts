import { CollectionConfig } from 'payload/types';
import payload from "payload";

import { isAdmin } from '../permissions';

const HotLiveBreak: CollectionConfig = {
    slug: 'hot-live-break',
    admin: {
        useAsTitle: 'hotLiveBreak'
    },
    access: {
        read: () => true,
        delete: isAdmin,
        update: isAdmin,
        create:  async ({ req: { user } }) => {
            if (!user || user.role !== 'admin') {
                return false;
            }
            return (await payload.find({
                collection: 'hot-live-break'
            })).totalDocs < 6;
        }
    },
    fields: [
        {
            name: 'hotLiveBreak',
            type: 'relationship',
            relationTo: 'live-break',
            maxDepth: 3,
            unique: true,
            hasMany: false,
            required: true
        }
    ]
};

export default HotLiveBreak;
