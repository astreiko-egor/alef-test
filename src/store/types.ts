export interface IEditChild {
    id: string | number;
    filed: string;
    value: string | number;
}

export interface IData {
    id?: string | number;
    name: string;
    age: number | string;
    [key: string]: string | number | undefined;
}

export interface IGroupData {
    parentInfo: IData;
    childrens: IData[];
}

export interface IRootState {
    preview: IGroupData;
    fields: IGroupData;
}
