export interface PokemonModel {
    id: number;
    name: string;
    img: string;
    isSelected?: boolean;
}

export interface PokemonApiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Array<{
        name: string;
        url: string;
    }>;
}

export interface PokemonDetail {
    id: number;
    name: string;
    height: number;
    weight: number;
    img: string;
    stats: ItemStat[];
}

export interface Stats {
    stats: ItemStat[];
}

export interface ItemStat {
    base_stat: number;
    effort: number;
    stat: Stat;
}

export interface Stat {
    name: string;
    url: string;
};
