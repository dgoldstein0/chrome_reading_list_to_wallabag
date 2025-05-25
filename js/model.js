import {WallabagApi} from './wallabag-api.js';

const api = new WallabagApi();


api.init()

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

export async function migrateToWallabag(options) {
  const {migrateUnread, migrateRead, archiveUnread, archiveRead, tagsToAdd, readingListEntries} = options;

  let skipped = 0;
  let migrated = 0;

  for (const entry of readingListEntries) {

    const shouldMigrate = entry.hasBeenRead ? migrateRead : migrateUnread;
    const shouldArchive = entry.hasBeenRead ? archiveRead : archiveUnread;

    if (shouldMigrate) {

      const {exists} = await api.EntryExists(entry.url);

      if (!exists) {
        console.log(`migrating ${entry.url}`);
        // if a url is already in wallabag, saving it again will effectively clobber it
        // hence we only want to do this for urls that don't already exist in wallabag.
        const {id: articleId} = await api.SavePage({
          url: entry.url,
          title: entry.title,
          archive: shouldArchive,
        })
        migrated++;

        await api.SaveTags(articleId, tagsToAdd);
      } else {
        console.log(`Found ${entry.url} already in wallabag, not migrating`);
        skipped++;
      }
    }

  }

  return {
    migrated,
    skipped
  };
}

export async function deleteWallabagUrlsFromChromeReadingList(readingListEntries) {
  let deleted = 0;

  // fire off requests in parallel for faster processing
  const urlToExistsPromise =  readingListEntries.map(entry => entry.url).map(getUrlToExistsPromiseMap);

  for (const [url, existsPromise] of urlToExistsPromise) {
    const {exists} = await existsPromise;

    if (exists) {
      console.log(`Deleting ${url} from chrome reading list as it was found in wallabag`);
      await chrome.readingList.removeEntry({url});
      deleted++;
    }
  }

  return deleted;
}

function getUrlToExistsPromiseMap(urls) {
  return new Map(urls.map(url => [url, api.EntryExists(url)]));
}
