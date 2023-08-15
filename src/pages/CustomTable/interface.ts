export interface DataType {
    key: React.Key;
    time: string;
    workType: number;
    // label: string;
    description: string;
    mounthTime?: string
    id?: number;
    tag?: JSON;
    workTags?: { workTag: { id: number, workId: number, value: string } }[]
    workList?: { id: number, workId: number, value: string }[]
}

export interface DialogForm {
    workType: string;
    time?: string[]
    mounthTime?: string
    tag?: object[]
}

export interface TableType {
    id?: number;
    endTime?: string;
    startTime?: string;
    key?: number;
    tag?: any;
    userId: number
    workList?: object[] | []
    workType: number,
    time?:any
    workTags?:ConvertTags[]
}
export interface TagType {
    workTag: {
        color: string;
        value: string
        tag: string
    }
}

export interface SubmitType extends DialogForm {
    // time?:''
    id?:number
    startTime?: string
    endTime?: string

}

export interface ConvertTags{
    color?: string;
    value?: string;
    tag?: string;
    children?:string
    key?:string

}