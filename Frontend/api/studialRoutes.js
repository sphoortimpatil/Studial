import apiUrl from './client';
const studial = apiUrl + 'studial/';
const home = studial + 'home';

const getFile = studial + 'getFile';
const upvote = studial + 'upvote';
const downvote = studial + 'downvote';
export default {home, getFile, upvote, downvote};
