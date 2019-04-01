import fetch from 'dva-no-router/fetch';
import * as HttpStatus from 'http-status-codes';

function checkStatus(response: any) {
    if (response.status >= HttpStatus.OK && response.status < HttpStatus.MULTIPLE_CHOICES) {
        return response;
    }
    const errortext = `${HttpStatus.getStatusText(response.status) || response.statusText} ${
        response.status
    }: ${response.url}`;
    const error = new Error(errortext);
    error.name = response.status;
    (error as any).response = response;
    throw error;
}

export default function request(url: any, options?: any) {
    const defaultOptions = {
        credentials: 'include',
    };
    const newOptions = { ...defaultOptions, ...options };
    if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
        if (!(newOptions.body instanceof FormData)) {
            newOptions.headers = {
                Accept: 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
                ...newOptions.headers,
            };
            newOptions.body = JSON.stringify(newOptions.body);
        } else {
            // newOptions.body is FormData
            newOptions.headers = {
                Accept: 'application/json',
                ...newOptions.headers,
            };
        }
    }

    return fetch(url, newOptions)
        .then(checkStatus)
        .then((response: any) => {
            if (newOptions.method === 'DELETE' || response.status === 204) {
                return response.text();
            }
            return response.json();
        })
        .catch((e: any) => {
            console.error(e);
            return false;
        });
}
