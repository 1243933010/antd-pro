export interface DataType {
    key: React.Key;
    time: string;
    workType: number;
    label: string;
    description: string;
    mounthTime?:string
    id?:number;
    tag?:JSON;
    workList?:{id:number,workId:number,value:string}[]
}

export interface DialogForm{
    workType:string;
    time?:string[]
    mounthTime?:string
    tag?:object[]
}

export interface TableType{
    id:number;
    endTime?:string;
    startTime?:string;
    key:number;
    tag?:string;
    userId:number
    workList?:object[]|[]
    workType:number
}
export interface TagType{
    color:string;
    value:string
}

export interface SubmitType extends DialogForm{
    // time?:''
    startTime?:string
    endTime?:string

}