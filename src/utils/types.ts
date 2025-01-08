export interface Pokemon {
    id: number;
    name: string;
    sprites: {
        front_default: string;
        front_shiny: string;
        front_female: string | null;
        front_shiny_female: string | null;
        back_default: string;
        back_shiny: string;
        back_female: string | null;
        back_shiny_female: string | null;
        other: {
            dream_world: {
                front_default: any;
                front_female: any;
            };
            home: {
                front_default: string;
            };
        };
    };
    weight: number;
    height: number;
    types: Array<{
        slot: number;
        type: {
            name: string;
        };
    }>;
abilities: Array<{
    ability: {
        name: string;
        url: string;
    };
    is_hidden: boolean;
    slot: number;
}>;
base_experience: number;
cries: {
    latest: string;
    legacy: string | null;
};
forms: Array<{
    name: string;
    url: string;
}>;
is_default: boolean;
location_area_encounters: string;
moves: Array<{
    move: {
        name: string;
        url: string;
    };
    version_group_details: Array<{
        level_learned_at: number;
        move_learn_method: {
            name: string;
            url: string;
        };
        version_group: {
            name: string;
            url: string;
        };
    }>;
}>;
order: number;
species: {
    name: string;
    url: string;
};
stats: Array<{
    base_stat: number;
    effort: number;
    stat: {
        name: string;
        url: string;
    };
}>;
}

