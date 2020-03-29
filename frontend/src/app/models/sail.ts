export interface Sail {
    id: string;     //serial
    type:string;
    category: string;
    model: string;
    size: number;
    year: number;
    whenCame:Date;
    whenGone:Date;
    whenSold:Date;
    repair:boolean;
    sold:boolean;
}