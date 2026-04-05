import { MenuProps } from "antd";

export interface btnProps {
    link?: string;
    text?: string; 
    callBack?(): void;
    type?: 'submit' | 'button' | 'reset';
    className?: string;
}

export interface DropdownInputProps {
    name: string;
    items: MenuProps['items']
    value: string
    callback?: (info: { key: string }) => void;
    title: string
    placehoder: string
    isRequired?: boolean;
    isTouched?: boolean;
    onBlur?: (name: string) => void;
    errorText?: string
}