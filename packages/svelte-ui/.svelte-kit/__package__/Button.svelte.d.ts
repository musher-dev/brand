import type { Snippet } from 'svelte';
import type { HTMLButtonAttributes } from 'svelte/elements';
type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
interface Props extends HTMLButtonAttributes {
    variant?: Variant;
    children?: Snippet;
}
declare const Button: import("svelte").Component<Props, {}, "">;
type Button = ReturnType<typeof Button>;
export default Button;
