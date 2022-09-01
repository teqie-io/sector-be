import { CollectionConfig } from 'payload/types';
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
        create: isAdmin
    },
    fields: [
        {
            name: 'hotLiveBreak',
            type: 'relationship',
            relationTo: 'live-break',
            unique: true,
            hasMany: false,
            required: true
        }
    ]
};

export default HotLiveBreak;
