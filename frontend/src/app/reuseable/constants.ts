export const BEGINNERS = {
    'Sail': { 'Synergy': [1.2, 2.1, 2.6, 3.1, 3.6, 4.1], 'XS': [2.0, 2.5, 3.0] },
    'Board': { 'JP Funster': [160, 180, 205, 240], 'JP Explorer': [145, 165, 195], 'Starboard Rio': ['S', 'M', 'L'], 'Starboard Start': ['S', 'M', 'L'] }
}


export const ACCESSORIES = {
    'Wetsuit': { 'Unisex': ['XXS', 'XS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'], 'Man': ['XXS', 'XS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'], 'Woman': ['XXS', 'XS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'], 'Kid': [6, 8, 10, 12, 14] },
    'Harness': { 'Mystic': ['XS', 'S', 'M', 'L', 'XL', 'XXL'], 'NP': ['XS', 'S', 'M', 'L', 'XL', 'XXL'] },
    'Harness Lines': { 'Severne': ['22"-28"', '28"-32"'] },
    'Boom': { 'Severne Metal': ['140-190', '170-220'], 'Severne Enigma': ['140-190', '170-220'], 'Beginner': ['custom'] },
    'Mast': { 'Severne Gorilla': [340, 370, 400, 430, 460, 490], 'Severne Blue': [340, 370, 400, 430, 460, 490], 'Beginner': ['custom'] },
    'Extension': { 'Severne ALU': [24, 36], 'Severne CARBON': [24, 36] },
    'Mast Base': { 'Severne': ['standard'], 'Others': ['standard'] },
}

var accessoriesUrl = 'accessories/?type='


export const GENERAL_URLS = {
    sails: 'sails/', worldCupSails: 'sails/?category=world%20cup', premiumSails: 'sails/?category=premium', boards: 'boards/',
    premiumBoards: 'boards/?category=premium', worldCupBoards: 'boards/?category=world%20cup', sportBoards: 'boards/?category=sport',
    beginnerBoards: 'beginners/?type=Board', beginnerSails: 'beginners/?type=Sail',
    masts: accessoriesUrl + 'Mast', worldCupMasts: accessoriesUrl + 'Mast&model=Severne Gorilla', premiumMasts: accessoriesUrl + 'Mast&model=Severne Blue',
    beginnerMasts: accessoriesUrl + 'Mast&model=Beginner',
    booms: accessoriesUrl + 'Boom', premiumBooms: accessoriesUrl + 'Boom&model=Severne Enigma', worldCupBooms: accessoriesUrl + 'Boom&model=Severne Enigma',
    beginnerBooms: accessoriesUrl + 'Boom&model=Beginner',
    extensions: accessoriesUrl + 'Extension',
    mastBases: accessoriesUrl + 'Mast%20Base',
    wetsuits: accessoriesUrl + 'Wetsuit', unisexWetsuits: accessoriesUrl + 'Wetsuit&model=Unisex', manWetsuits: accessoriesUrl + 'Wetsuit&model=Man',
    womanWetsuits: accessoriesUrl + 'Wetsuit&model=Woman', kidWetsuits: accessoriesUrl + 'Wetsuit&model=Kid',
    harnesses: accessoriesUrl + 'Harness',
    harnesLines: accessoriesUrl + 'Harness%20Lines'
}