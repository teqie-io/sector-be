import { CollectionConfig } from 'payload/types';
import { isAdmin, isAdminOrSeller, isAdminOrSellerOrPublished } from '../permissions';

const Card: CollectionConfig = {
    slug: 'card',
    admin: {
        useAsTitle: 'playerName',
        defaultColumns: ['playerName', 'brand', 'year', 'seller', 'published']
    },
    access: {
        read: isAdminOrSellerOrPublished,
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
            type: 'number',
            defaultValue: new Date().getFullYear(),
            validate: (value) => {
                if (Number.isInteger(value)) {
                    if (value < 1900) {
                        return `"${value}" is before 1900.`;
                    }
                    if (value > new Date().getFullYear()) {
                        return `"${value}" is after the current year.`;
                    }
                    return true;
                }
                return `"${value}" is not an integer.`;
            },
            index: true,
            required: true
        },
        {
            name: 'price',
            type: 'number',
            min: 0.01,
            index: true,
            required: true
        },
        {
            name: 'leagueTeam',
            type: 'select',
            options: [
                'Dallas Mavericks',
                'Denver Nuggets',
                'Golden State Warriors',
                'Houston Rockets',
                'Los Angeles Clippers',
                'Los Angeles Lakers',
                'Memphis Grizzlies',
                'Minnesota Timberwolves',
                'New Orleans Pelicans',
                'Oklahoma City Thunder',
                'Phoenix Suns',
                'Portland Trail Blazers',
                'Sacramento Kings',
                'San Antonio Spurs',
                'Utah Jazz',
                'Atlanta Hawks',
                'Boston Celtics',
                'Brooklyn Nets',
                'Charlotte Hornets',
                'Chicago Bulls',
                'Cleveland Cavaliers',
                'Detroit Pistons',
                'Indiana Pacers',
                'Miami Heat',
                'Milwaukee Bucks',
                'New York Knicks',
                'Orlando Magic',
                'Philadelphia 76ers',
                'Toronto Raptors',
                'Washington Wizards'
            ],
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
            min: 1,
            max: 10,
            index: true,
            required: true
        },
        {
            name: 'seller',
            type: 'relationship',
            relationTo: 'user',
            access: {
                update: () => false
            },
            admin: {
                position: 'sidebar',
                condition: (data) => Boolean(data?.seller),
                description: "Email of card's seller"
            },
            required: true,
            index: true,
        },
        {
            name: 'published',
            type: 'checkbox',
            access: {
                update: isAdmin
            },
            required: true,
            index: true,
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
