'use strict';

class FetchGitHubApi {

    constructor(endpoint, params = {}, max = 0, per = 30) {
        this.endpoint = endpoint;
        this.maxPage = max;
        this.perPage = per;
        this.params = params;
        this.linkParser = require('parse-link-header');
    }

    get params() {
        let params = this._params;
        params['per_page'] = this.perPage;
        return params;
    }

    set params(params = {}) {
        this._params = params;
    }

    fetchJson() {
        return fetchApi(this.params)
            .then(async function(res) {
                let linkHeader = this.linkParser(res.headers.get('Link'))
                  , hasLast = linkHeader ? linkHeader.hasOwnProperty('last') : false
                  , jsonData = res.json();

                if (hasLast) {
                    let nextPage = linkHeader['next']['page']
                      , lastPage = linkHeader['last']['page']
                      , promises = []
                      , params = this.params;

                    for (i = nextPage; i <= lastPage; i++) {
                        if (i > this.maxPage)
                            break;
                        params['page'] = i;
                        promises.push(fetchApi(params).then(res => res.json()));
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

    fetchApi(params = {}) {
        return fetch(this.apiUrl(params)).then(this.responseCheck);
    }

    responseCheck(res) {
        if (!res.ok)
            throw Error(res.statusText);

        return res;
    }

    apiUrl(params = {}) {
        let url = new URL('https://api.github.com' + this.endpoint);
        Object.keys(params).forEach(key => url.searchParams.append(key, this.params[key]))
        return url;
    }

}

module.exports = FetchGitHubApi;
