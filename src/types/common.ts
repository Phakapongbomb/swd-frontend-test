export interface btnProps {
    link?: string;
    text?: string; 
    callBack?(): void;
    type?: 'submit' | 'button' | 'reset';
    className?: string;
}