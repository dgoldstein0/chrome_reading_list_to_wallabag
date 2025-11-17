# Chrome Reading List to Wallabag Migrator

This Chrome extension exists to read Chrome's reading list and migrate things on it to Wallabag.

It logs into Wallabag the same way as wallabagger.  Then the user has the options to:

- copy read items to wallabag, optionally archiving them.  Only urls not in wallabag will be copied.
- copy unread items to wallabag, optionally archiving them.  Only urls not in wallabag will be copied.
- tag any newly-created items in wallabag with a tag of your choice
- delete any items from Chrome's reading list which are already in wallabag
- copy all bookmarks to wallabag, optionally with a tag, and either none archived or all archived.

For copying items to Wallabag, only items that don't yet exist in Wallabag are copied, so the migration is generally safe to run multiple times.  That said this is a one-directional tool - it does not support copying items from Wallabag into Chrome's reading list or bookmarks.

# Attribution & License

This project was started by copying code from the Wallabagger project.  It is also released under the MIT license.  See COPYING.md for details.
