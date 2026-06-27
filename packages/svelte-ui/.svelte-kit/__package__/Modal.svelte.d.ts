import type { Snippet } from 'svelte';
interface Props {
    open?: boolean;
    onclose?: () => void;
    header?: Snippet;
    children?: Snippet;
}
declare const Modal: import("svelte").Component<Props, {}, "">;
type Modal = ReturnType<typeof Modal>;
export default Modal;
