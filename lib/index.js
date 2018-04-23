'use strict';

const { fetch, Request, Response, Headers } = require('fetch-ponyfill')();
const { URL, URLSearchParams } = require('universal-url');
const linkParser = require('parse-link-header');
const base64 = require('base-64');

module.exports = class FetchGitHubApi {

    constructor(endpoint, params = {}, max = 0, per = 0) {
        this.endpoint = endpoint;
        this.maxPage = Number.isInteger(max) ? max : 0;
        this.perPage = Number.isInteger(per) ? per > 100 ? 100 : per : 0;
        this.params = params;
    }

    get password() {
        return this._pass ? this._pass : "";
    }

    set password(value) {
        this._pass = value;
    }

    get basicAuth() {
        if (this.username)
            return base64.encode(this.username + ":" + this.password);

        return null;
    }

    set basicAuth(value) {
        let basicUser = value.split(':');

        this.username = basicUser[0];
        this.password = basicUser[1];
    }

    get params() {
        let params = this._params;

        if (this.perPage)
            params['per_page'] = this.perPage;

        return params;
    }

    set params(params) {
        this._params = params ? params : {};
    }

    fetchJson() {
        return this.fetchApi()
            .then(async res => {
                let linkHeader = linkParser(res.headers.get('Link'))
                  , hasLast = linkHeader ? linkHeader.hasOwnProperty('last') : false
                  , jsonData = res.json();

                if (hasLast) {
                    let nextPage = Number(linkHeader['next']['page'])
                      , lastPage = Number(linkHeader['last']['page'])
                      , promises = [];

                    for (let i = nextPage; i <= lastPage; ++i) {
                        if (this.maxPage && i > this.maxPage)
                            break;

                        promises.push(this.fetchApi(i).then(res => res.json()));
                    }

                    let results = await Promise.all(promises);
                    jsonData = jsonData.then(json => {
                        for (let result of results) {
                            json.push(...result);
                        }

                        return json;
                    });
                }

                return jsonData;
            });
    }

    fetchApi(pageNumber = 0) {
        let params = this.params
          , headers = new Headers();

        if (pageNumber)
            params['page'] = pageNumber;

        if (this.basicAuth) {
            headers.append('Authorization', 'Basic ' + this.basicAuth);
        } else if (this.accessToken) {
            headers.append('Authorization', 'token ' + this.accessToken);
        }

        if (this.otpToken)
            headers.append('X-GitHub-OTP', this.otpToken);

        return fetch(this.apiUrl(params), {
            headers: headers
        }).then(this.responseCheck);
    }

    async responseCheck(res) {
        if (!res.ok) {
            let json = await res.json().then(json => JSON.stringify({
                    'data': json,
                    'status': res.status,
                    'statusText': res.statusText
                }))
              , err = Error(json);
            err.name = 'HTTPStatusError'
            throw err;
        }

        return res;
    }

    apiUrl(params = {}) {
        let url = new URL('https://api.github.com' + this.endpoint);
        Object.keys(params).forEach(key => url.searchParams.append(key, this.params[key]));

        return url.href;
    }

}

