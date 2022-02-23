import apiUrl from './client';

const user = apiUrl + 'user/';

const addbookmarks = user + 'addBookmark';
const bookmarks = user + 'bookmarks';
const uploadedFiles = user + '/all-uploads';
export default {addbookmarks, bookmarks, uploadedFiles};
