import test from 'ava';
import FetchGitHubApi from '../lib/index';
import dotenv from 'dotenv';
dotenv.config();

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
        if (err.name === 'HTTPStatusError') {
            let errMsg = JSON.parse(err.message);
            t.is(errMsg['data']['message'], 'Not Found');
            return;
        }

        t.fail()
    });
})

