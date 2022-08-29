import { CollectionConfig } from 'payload/types';
import { isAdmin, isAdminOrSeller } from '../permissions';

const Card: CollectionConfig = {
    slug: 'card',
    admin: {
        useAsTitle: 'playerName',
        defaultColumns: ['year', 'brand', 'playerName']
    },
    access: {
        read: () => true,
        update: isAdminOrSeller,
        delete: isAdminOrSeller
    },
    fields: [
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            required: true
        },
        {
            name: 'playerName',
            type: 'text',
            index: true,
            required: true
        },
        {
            name: 'type',
            type: 'select',
            options: ['Single cards', 'Boxes'],
            required: true,
            defaultValue: 'Single cards',
            index: true
        },
        {
            name: 'marketType',
            type: 'select',
            options: ['Shop', 'Marketplace'],
            required: true,
            defaultValue: 'Shop',
            index: true
        },
        {
            name: 'sportType',
            type: 'text',
            index: true,
            required: true
        },
        {
            name: 'year',
            type: 'date',
            index: true,
            required: true
        },
        {
            name: 'price',
            type: 'number',
            min: 0,
            index: true,
            required: true
        },
        {
            name: 'leagueTeam',
            type: 'select',
            options: ['NBA', 'NFL', 'MLB', 'NHL', 'Random team'],
            index: true,
            required: true
        },
        {
            name: 'specialFeature',
            type: 'text',
            index: true,
            required: true
        },
        {
            name: 'brand',
            type: 'text',
            index: true,
            required: true
        },
        {
            name: 'gradeBy',
            type: 'text',
            index: true,
            required: true
        },
        {
            name: 'rating',
            type: 'number',
            min: 0,
            max: 10,
            index: true,
            required: true
        },
        {
            name: 'seller',
            type: 'relationship',
            relationTo: 'user',
            access: {
                read: () => true
            },
            admin: {
                readOnly: true,
                position: 'sidebar',
                condition: (data) => Boolean(data?.seller)
            }
        },
        {
            name: 'published',
            type: 'checkbox',
            access: {
                read: () => true,
                update: isAdmin
            },
            admin: {
                position: 'sidebar',
                condition: (data) => Boolean(data?.seller)
            }
        }
    ],
    hooks: {
        beforeChange: [
            ({ req, operation, data }) => {
                if (operation === 'create') {
                    if (req.user) {
                        data.seller = req.user.id;
                        data.published = false;
                        return data;
                    }
                }
            }
        ]
    }
};

export default Card;
