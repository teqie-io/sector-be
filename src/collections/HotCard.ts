import { CollectionConfig } from 'payload/types';
import { isAdmin } from '../permissions';
import payload from "payload";

const HotCard: CollectionConfig = {
    slug: 'hot-card',
    admin: {
        useAsTitle: 'hotCard'
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
                collection: 'hot-card'
            })).totalDocs < 6;
        }
    },
    fields: [
        {
            name: 'hotCard',
            type: 'relationship',
            relationTo: 'card',
            maxDepth: 3,
            unique: true,
            hasMany: false,
            required: true
        }
    ]
};

export default HotCard;
