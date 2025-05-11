import {WallabagApi} from './wallabag-api.js';
import {Cache} from './cache.js';

const api = new WallabagApi();

const cache = new Cache(true); // TODO - here checking option
const existCache = new Cache(true);

api.init().then(data => {
    api.GetTags().then(tags => { cache.set('allTags', tags); });
});

export async function setup() {
  await api.load();

  if (!api.checkParams()) {
    throw new Error({ message: Common.translate('Options_not_defined')})
  }
  return api.data;
}

export function saveSetup(data) {
    api.setsave(data);
    return api.data;
}

export function openSetup() {
    openOptionsPage();
}

export async function setupGetToken(data) {
    api.setsave(data);
    try {
      await api.PasswordToken();
      return [api.data, true];
    } catch (e) {
      return [api.data, false];
    }
}

export async function setupCheckUrl(data) {
    api.setsave(data);
    try {
      await api.CheckUrl()
      return [api.data, true];
    } catch (e) {
      api.clear();
      return [api.data, false];
    }
}
