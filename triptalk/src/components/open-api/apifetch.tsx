const CATURL = 'https://api.thecatapi.com/v1'

const HTTPMETHOD = [
    'GET',
    'POST',
    'HEAD',
    'PUT',
    'DELETE',
    'CONNECT',
    'OPTIONS',
    'TRACE',
    'PATCH'
] as const;

type Method = typeof HTTPMETHOD[number];

interface CatApiParams {
    path: string
    param: URLSearchParams
    headers: Headers
    method: Method
}
const fetchCats = async (
    props: CatApiParams
) => {
    try {
        const URL: string[] = [`${CATURL}/${props.path}?`];
        Object.entries(props.param).forEach(([k, v]) => {
            URL.push(`${k}=${v}`);
        });
        props.headers.append('x-api-key', process.env.CATKEY!);
        const resolved = await fetch(`${URL.join('')}`, {
            method: props.method,
            headers: props.headers
        });
        const data = await resolved.json();
        return data;
    } catch (error: unknown) {
        console.log(error);
    }
}   

export { fetchCats }
export type {Method, CatApiParams}