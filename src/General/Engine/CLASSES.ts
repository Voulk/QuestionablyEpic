
// We're going to build up the functionality of this file over time but anything connected to individual specs should end up here so we don't end up with
// mentions in every file. Instead we can just call the class we want.

export const GETCLASSDATA = (className: string, param: string) => {
    return CLASSES[className][param]
}

type ClassData = {
    [key: string]: any
}

type ClassDataMap = {
    [key: string]: ClassData
}

const CLASSES: ClassDataMap = {
    // Retail Specs
    "Restoration Druid": {

    },
    "Holy Paladin": {

    },
    "Preservation Evoker": {

    },
    "Discipline Priest": {

    },
    "Holy Priest": {

    },
    "Restoration Shaman": {

    },
    "Mistweaver Monk": {

    },

    // Classic Specs
    "Restoration Druid Classic": {

    },
    "Holy Paladin Classic": {

    },
    "Discipline Priest Classic": {

    },
    "Holy Priest Classic": {

    },
    "Restoration Shaman Classic": {

    },
    "Mistweaver Monk Classic": {

    },

}