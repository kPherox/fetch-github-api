import fetchPonyfill from 'fetch-ponyfill';
import universalUrl from 'universal-url';
import linkParser from 'parse-link-header';

const { fetch, Request, Response, Headers } = fetchPonyfill();
const { URL, URLSearchParams } = universalUrl;

export default class FetchGitHubApi {

    constructor(endpoint, params = {}, max = 0, per = 0) {
        this.endpoint = endpoint;
        this.maxPage = Number.isInteger(max) ? max : 0;
        this.perPage = Number.isInteger(per) ? per > 100 ? 100 : per : 0;
        this.params = params;
    }

    get params() {
        let params = this._params;
        if (this.perPage)
            params['per_page'] = this.perPage;

        return params;
    }

    set params(params = {}) {
        this._params = params;
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
        let params = this.params;

        if (pageNumber)
            params['page'] = pageNumber;

        return fetch(this.apiUrl(params)).then(this.responseCheck);
    }

    async responseCheck(res) {
        if (!res.ok) {
            let json = await res.json().then(json => JSON.stringify({
                'data': json,
                'status': res.status,
                'statusText': res.statusText
            }));
            throw Error(json);
        }

        return res;
    }

    apiUrl(params = {}) {
        let url = new URL('https://api.github.com' + this.endpoint);
        Object.keys(params).forEach(key => url.searchParams.append(key, this.params[key]));

        return url.href;
    }

}

