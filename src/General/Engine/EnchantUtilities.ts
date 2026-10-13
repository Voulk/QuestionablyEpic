import EnchantDB from '../../Databases/EnchantDB.json';


export const getFlaskIcon = (flaskID: number): string => {
    const flask = EnchantDB.find(item => item.id === flaskID && item.enchantType === 'flask');
    return flask ? flask.icon : '';
};

export const getFlaskIDs = (): number[] => {
    return EnchantDB.filter(item => item.enchantType === 'flask').map(item => item.id);
};

export const getEnchantByID = (effectID: number): any => {
    const effect = EnchantDB.find(item => item.id === effectID);
    return effect ? effect : null;
};

export const getEnchantIcon = (effectID: number): string => {
    const effect = EnchantDB.find(item => item.id === effectID);
    return effect ? effect.icon : '';
};  