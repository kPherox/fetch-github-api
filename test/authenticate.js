import test from 'ava';
import FetchGitHubApi from '../lib/index';
import totpToken from './helpers/getTotpToken.js';
import dotenv from 'dotenv';
dotenv.config();

test('Basic authentication', async t => {
    let fetchGitHubApi = new FetchGitHubApi('/user');

    fetchGitHubApi.basicAuth = process.env.GITHUB_BASIC_USER;
    fetchGitHubApi.otpToken = totpToken();

    let res = await fetchGitHubApi.fetchApi().catch(err => {
        console.log(err.message);
        t.fail();
    });

    t.is(res.status, 200);
})

test('OAuth2 token', async t => {
    let fetchGitHubApi = new FetchGitHubApi('/user');

    fetchGitHubApi.accessToken = process.env.GITHUB_ACCESS_TOKEN;

    let res = await fetchGitHubApi.fetchApi().catch(err => {
        console.log(err.message);
        t.fail();
    });

    t.is(res.status, 200);
})

