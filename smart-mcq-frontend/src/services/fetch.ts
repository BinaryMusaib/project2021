
interface RequestOptions {
    headers?: Record<string, string>,
    body?: any
}

interface FetchResponse<T> {
    ok: boolean
    status: number
    body?: T
    errors?: string[]
}

async function makeJSONRequest<T>(url: string, method: string, {
    headers,
    body
}: RequestOptions) {
    return fetch(url, {
        method,
        headers: {
            "Content-Type": "application/json",
            ...headers,
        },
        body: typeof body === "object" ? JSON.stringify(body) : body,
    }).then(res => handleJSONResponse<T>(res));
}

async function getJSON<T>(url: string, options: RequestOptions = {}) {
    return await makeJSONRequest<T>(url, "GET", options);
}

async function postJSON<T>(url: string, options: RequestOptions) {
    return await makeJSONRequest<T>(url, "POST", options);
}

async function putJSON<T>(url: string, options: RequestOptions) {
    return await makeJSONRequest<T>(url, "PUT", options);
}

async function deleteJSON<T>(url: string, options: RequestOptions = {}) {
    return await makeJSONRequest<T>(url, "DELETE", options);
}

const Fetch = {
    getJSON,
    postJSON,
    putJSON,
    deleteJSON
};

export default Fetch;

async function handleJSONResponse<T>(res: Response): Promise<FetchResponse<T>> {
    if (res.status === 400) { // Form fails
        return Promise.reject({
            ok: res.ok,
            status: res.status,
            errors: toFormErrors((await res.json()).message)
        });
    } else if (res.ok) { // Success
        try {
            return {
                ok: res.ok,
                status: res.status,
                body: await res.json() as T
            };
        } catch (error) {
            return {
                ok: res.ok,
                status: res.status
            };
        }
    } else {
        return Promise.reject({
            ok: res.ok,
            status: res.status,
        });
    }
}

export interface FormError {
    fieldErrors: Partial<Record<string, string>>
    formErrors: string[];
}

function toFormErrors(errors?: string | any[]): FormError {
    if (typeof errors === "string")
        return { formErrors: [errors], fieldErrors: {} };
    else if (Array.isArray(errors)) {
        const formErrors = errors.filter(error => typeof error === "string");
        const fieldErrors = errors.filter(error => typeof error !== "string")
            .reduce((fieldErrors: Partial<Record<string, string>>, error) => {
                return {
                    ...fieldErrors,
                    [error.property]
                        : error.constraints[Object.keys(error.constraints)[0]]
                };
            }, {});
        return {
            formErrors,
            fieldErrors
        };
    }
    else return {
        fieldErrors: {},
        formErrors: []
    };

};
