import { CollectionConfig } from 'payload/types';
import { isAdmin } from '../permissions';

const LiveBreak: CollectionConfig = {
    slug: 'liveBreak',
    admin: {
        useAsTitle: 'name',
        defaultColumns: ['name', 'sportType', 'brand', 'overview', 'hot']
    },
    access: {
        read: () => true,
        create: isAdmin,
        update: isAdmin,
        delete: isAdmin
    },
    fields: [
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            required: true
        },
        {
            name: 'name',
            type: 'text',
            index: true,
            required: true
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
            name: 'brand',
            type: 'text',
            index: true,
            required: true
        },
        {
            name: 'leagueTeam',
            type: 'array',
            fields: [
                {
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media',
                    required: true
                },
                {
                    name: 'team',
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
                        'Chicago Bulls',
                        'Brooklyn Nets',
                        'Charlotte Hornets',
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
                    name: 'price',
                    type: 'number',
                    min: 0.01,
                    required: true
                }
            ],
            required: true
        },
        {
            name: 'overview',
            type: 'richText',
            required: true
        },
        {
            name: 'detail',
            type: 'richText',
            required: true
        },
        {
            name: 'shipping',
            type: 'richText',
            required: true
        },
        {
            name: 'hot',
            type: 'select',
            unique: true,
            options: [
                {
                    label: 'None',
                    value: '0'
                },
                {
                    label: 'Top 1',
                    value: '1'
                },
                {
                    label: 'Top 2',
                    value: '2'
                },
                {
                    label: 'Top 3',
                    value: '3'
                },
                {
                    label: 'Top 4',
                    value: '4'
                },
                {
                    label: 'Top 5',
                    value: '5'
                },
                {
                    label: 'Top 6',
                    value: '6'
                }
            ],
            access: {
                read: () => true,
                update: isAdmin
            },
            admin: {
                position: 'sidebar'
            }
        }
    ]
};

export default LiveBreak;
