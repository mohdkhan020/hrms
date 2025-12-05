export function classNames(...arr: Array<string | undefined | false>) {
return arr.filter(Boolean).join(' ');
}