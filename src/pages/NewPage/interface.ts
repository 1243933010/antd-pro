export interface DetailData{
    id?:number
    time?:string
    type?:number
    masterNum:number
    devNum:number
}


export interface PropData{
    titleText:string
    // detailData:DetailData
}

export interface TableDetail{
    masterName: string; 
    type: number;
     devName?: string;
     key:number;
     id:number; 
}