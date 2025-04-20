
async function populatePopup() {
  const readingListEntries = await chrome.readingList.query({});

  let numRead = 0;
  let numUnread = 0;
  for (const entry of readingListEntries) {
    if (entry.hasBeenRead) {
      numRead++;
    } else {
      numUnread++;
    }
  }

  document.getElementById("status").innerText = `Found ${numRead} read entries and ${numUnread} unread entries on the reading list`;
}

populatePopup();
