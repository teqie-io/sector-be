import { CollectionConfig } from 'payload/types';
import { isAdmin } from '../permissions';

const HotCard: CollectionConfig = {
    slug: 'hot-card',
    admin: {
        useAsTitle: 'hotCard'
    },
    access: {
        read: () => true,
        delete: isAdmin,
        update: isAdmin,
        create: isAdmin
    },
    fields: [
        {
            name: 'hotCard',
            type: 'relationship',
            relationTo: 'card',
            unique: true,
            hasMany: false,
            required: true
        }
    ]
};

export default HotCard;
