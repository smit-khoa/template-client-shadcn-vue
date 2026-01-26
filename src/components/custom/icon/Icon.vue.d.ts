import { DefineComponent } from "vue";

export interface IconProps {
    name: string;
    size?: number | string;
    color?: string;
    className?: string;
}

declare const Icon: DefineComponent<IconProps>;
export default Icon;
