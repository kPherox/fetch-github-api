'use strict';

import test from 'ava';
import FetchGitHubApi from '../lib/index';

test('Check access api', async t => {
    let fetchGitHubApi = new FetchGitHubApi('/', {'access_token': process.env.GITHUB_ACCESS_TOKEN});
    let res = await fetchGitHubApi.fetchApi().catch(err => {
        console.log(err.message);
        t.fail();
    });

    t.is(res.status, 200);
})

test('Check http error', async t => {
    let fetchGitHubApi = new FetchGitHubApi('/notfound', {'access_token': process.env.GITHUB_ACCESS_TOKEN});
    let res = await fetchGitHubApi.fetchApi().catch(err => {
        let errMsg = JSON.parse(err.message);
        t.is(errMsg['data']['message'], 'Not Found');
    });
})

