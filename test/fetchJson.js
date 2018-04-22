import test from 'ava';
import FetchGitHubApi from '../lib/index';
import dotenv from 'dotenv';
dotenv.config();

test('Check json', async t => {
    let fetchGitHubApi = new FetchGitHubApi('/', {'access_token': process.env.GITHUB_ACCESS_TOKEN});
    let json = await fetchGitHubApi.fetchJson().catch(err => {
        console.log(err.message);
        t.fail();
    });
    t.is(json["current_user_url"], "https://api.github.com/user");
})

test('With per page and max page', async t => {
    let fetchGitHubApi = new FetchGitHubApi('/events', {'access_token': process.env.GITHUB_ACCESS_TOKEN}, 3, 15);
    let json = await fetchGitHubApi.fetchJson().catch(err => {
        console.log(err.message);
        t.fail();
    });
    t.is(json.length, 45);
})

