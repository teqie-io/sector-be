import { CollectionConfig } from 'payload/types';
import { isAdmin } from '../permissions';

const HotLiveBreak: CollectionConfig = {
    slug: 'hotLiveBreak',
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
            relationTo: 'card',
            unique: true
        }
    ]
};

export default HotLiveBreak;
