// 'named-placeholders' module declaration

declare module 'named-placeholders' {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    export type placeholders = { [key: string]: any };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    export type Placeholders = (query: string, object: placeholders) => [string, any];

    export default function named(): Placeholders;
}
