const F = require('lodash/fp');
const isEmpty = require('lodash/isEmpty');
const queryString = require('query-string');

function isAbsoluteURL (resource) {
    return F.startsWith(resource, 'https://') || F.startsWith(resource, 'http://');
}

const DEFAULT_HEADERS = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
};

class XHR {
    constructor (url, headers = DEFAULT_HEADERS) {
        this._url = url;
        this._headers = headers;
    }

    setHeader (key, value) {
        if (isEmpty(key)) {
            return false;
        }

        if (F.isNil(value)) {
            this._headers = F.omit([key], this._headers);
        } else {
            this._headers = F.merge(this._headers, {
                [key]: value,
            });
        }
        return true;
    }

    removeHeader (key) {
        this.setHeader(key, null);
    }

    get (url, query, headers) {
        return this.sendRequest('GET', url, query, null, headers);
    }

    put (url, query, body, headers) {
        return this.sendRequest('PUT', url, query, body, headers);
    }

    patch (url, query, body, headers) {
        return this.sendRequest('PATCH', url, query, body, headers);
    }

    post (url, query, body, headers) {
        return this.sendRequest('POST', url, query, body, headers);
    }

    delete (url, query, body, headers) {
        return this.sendRequest('DELETE', url, query, body, headers);
    }

    sendRequest (method, resource, query, body, headers = {}) {
        const targetUrl = isAbsoluteURL(resource) ? resource : `${this._url}${resource}`;

        const requestInfo = {
            headers: F.merge(this._headers, headers),
            method,
        };

        const params = queryString.stringify(query);

        switch (method) {
        case 'POST':
        case 'PUT':
        case 'DELETE':
        case 'PATCH':
            requestInfo.body = JSON.stringify(body);
            break;
        default:
            break;
        }

        if (process.env.NODE_ENV === 'development') {
            console.info('REQUEST:', targetUrl, requestInfo, params, body);
        }

        return fetch(`${targetUrl}?${params}`, requestInfo)
            .then(x => x.json());
    }
}

// TODO:(tk) enter in correct value
module.exports = new XHR('http://mark.gl');
