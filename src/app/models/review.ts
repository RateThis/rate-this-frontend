export type EntityType = 'movie' | 'series' | 'game' | 'book' | 'music'

export type Entity = {
    id: string,
    type: EntityType
}

export interface Review {
    id: number,
    userId: number,
    entity: Entity,
    uuid: string,
    rating: number,
    text?: string,
    createDate: Date,
    editDate: Date
}

export interface ReviewHttp {
    id: number,
    id_user: number,
    entity_type: EntityType,
    id_entity: string,
    uuid: string,
    rating: number,
    text?: string,
    create_time: Date,
    last_edit_time: Date
}