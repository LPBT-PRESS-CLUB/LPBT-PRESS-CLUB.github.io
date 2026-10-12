/* ============================================================================
   LPBT Press Club — site content
   ----------------------------------------------------------------------------
   This is the only file you need to edit to change what the site says.
   Staff are real; desks and events are still PLACEHOLDER copy.
   Portraits are served from the club's Google Drive folder.
   ========================================================================== */

/* Ticker headlines running along the top of the page. */
const WIRE = [
  'Press Club founded; nobody asks for credentials',
  'Photo desk acquires second lens, declares itself a studio',
  'Style guide amended: the Oxford comma stays',
  'Opinion desk writes 2,000 words on tabs; nobody finishes it',
  'Letters box confirmed anonymous, editor mildly nervous',
  'Sports desk still counting',
];

/* ----------------------------------------------------------------------------
   DESKS (communities). `id` is used by staff + events to reference a desk.
   `color` is the desk's colour code; `ink` is the text colour used on top of it.
   -------------------------------------------------------------------------- */
const DESKS = [
  {
    id: 'newsdesk',
    name: 'Newsdesk',
    color: '#B3202C',
    ink: '#FFFFFF',
    tagline: 'Hard news & the wire',
    blurb: 'Breaking items, announcements and anything with a deadline attached. Short sentences, checked twice.',
  },
  {
    id: 'tech',
    name: 'Tech & Dev',
    color: '#1B6B7A',
    ink: '#FFFFFF',
    tagline: 'Code, tooling & infrastructure',
    blurb: 'Build logs, teardowns, release notes and the occasional post-mortem of something that caught fire.',
  },
  {
    id: 'arts',
    name: 'Arts & Culture',
    color: '#7A4EA8',
    ink: '#FFFFFF',
    tagline: 'Reviews, criticism & features',
    blurb: 'Long-form pieces, interviews and reviews. The desk most likely to argue about an adjective.',
  },
  {
    id: 'opinion',
    name: 'Opinion',
    color: '#2E4A8B',
    ink: '#FFFFFF',
    tagline: 'Columns & editorials',
    blurb: 'Signed arguments, clearly labelled as arguments. Publication is not endorsement, as we keep saying.',
  },
  {
    id: 'photo',
    name: 'Photo Desk',
    color: '#A5741B',
    ink: '#FFFFFF',
    tagline: 'Images & layout',
    blurb: 'Portraits, event coverage, cover art and the thankless work of making columns line up.',
  },
  {
    id: 'sports',
    name: 'Sports',
    color: '#1E6B3C',
    ink: '#FFFFFF',
    tagline: 'Tournaments & scoreboards',
    blurb: 'Brackets, results and post-match quotes from people who take a friendly game extremely seriously.',
  },
];

/* ----------------------------------------------------------------------------
   STAFF — identities of the newsroom.
   `desks` holds one or more desk ids from DESKS above.
   `handle`, `beat` and `bio` are optional and only shown when set.
   -------------------------------------------------------------------------- */
const IMG = 'https://lh3.googleusercontent.com/d/';

const STAFF = [
  {
    name: 'Soujoud Ouerghi',
    role: 'President',
    desks: ['newsdesk'],
    since: '2026',
    img: IMG + '10WQgEvwYft03RhiAaFOPs2IkOwCoRDe6=w800',
    alt: 'Portrait of Soujoud Ouerghi, President.',
  },
  {
    name: 'Yosr Romdhani',
    role: 'Vice President',
    desks: ['newsdesk'],
    since: '2026',
    img: IMG + '1xnBHh59q3-8RbOzdQb2VqHWYhHyu2_-e=w800',
    alt: 'Portrait of Yosr Romdhani, Vice President.',
  },
  {
    name: 'Anas Ghazeil',
    role: 'Head of Protocol',
    desks: ['newsdesk'],
    since: '2026',
    img: IMG + '1pp7WCn1Q8ZmiPoG3nN4FqHfi9axS_vVk=w800',
    alt: 'Portrait of Anas Ghazeil, Head of Protocol.',
  },
  {
    name: 'Moemen Arfeoui',
    role: 'General Secretary',
    desks: ['newsdesk'],
    since: '2026',
    img: IMG + '1t4oa51yEiAWYzNOQ_vK2VNGYDruCMEf6=w800',
    alt: 'Portrait of Moemen Arfeoui, General Secretary.',
  },
  {
    name: 'Yassmine Khili',
    role: 'Assistant General Secretary',
    desks: ['newsdesk'],
    since: '2026',
    img: IMG + '1BVJOI8pqHAIzykAwZ2aF_sqL6i28sVXz=w800',
    alt: 'Portrait of Yassmine Khili, Assistant General Secretary.',
  },
  {
    name: 'Nour El Houdee Bchini',
    role: 'Treasurer',
    desks: ['newsdesk'],
    since: '2026',
    img: IMG + '1RhcV0420TSg_-0dhlJnfv-8tClsxpx7F=w800',
    alt: 'Portrait of Nour El Houdee Bchini, Treasurer.',
  },
  {
    name: 'Farah Ben Hamida',
    role: 'Human Resources Manager',
    desks: ['newsdesk'],
    since: '2026',
    img: IMG + '1cv1h7NGMqsvyp5jWx-tW6nkyLklmSGAG=w800',
    alt: 'Portrait of Farah Ben Hamida, Human Resources Manager.',
  },
  {
    name: 'Israa Ben Amor',
    role: 'Head of Media & Communications',
    desks: ['photo'],
    since: '2026',
    img: IMG + '1U3WptGp8Ng5grcxHb44FLjj1E5vEh753=w800',
    alt: 'Portrait of Israa Ben Amor, Head of Media & Communications.',
  },
  {
    name: 'Mouhamed Adem Fetni',
    role: 'Committees Coordinator',
    desks: ['newsdesk'],
    since: '2026',
    img: IMG + '1oDe8c8FdsOf9kG99dpo0rRXPmEfyHbRz=w800',
    alt: 'Portrait of Mouhamed Adem Fetni, Committees Coordinator.',
  },
  {
    name: 'Fares Mogaadi',
    role: 'Art Director',
    desks: ['arts'],
    since: '2026',
    img: IMG + '1ZlY7Lz9mroVjBRexViLWRk726KQ8LccB=w800',
    alt: 'Portrait of Fares Mogaadi, Art Director.',
  },
];

/* ----------------------------------------------------------------------------
   EVENTS — previous events and their descriptions. Newest first is not
   required; the page sorts by date automatically.
   -------------------------------------------------------------------------- */
const EVENTS = [
  {
    date: '2026-09-12',
    title: 'Night Desk Marathon',
    desk: 'newsdesk',
    location: 'Newsroom, online',
    edition: 'No. 06',
    dek: 'Twelve hours, one rotating desk, and a front page assembled between midnight and noon.',
    body: 'Members took the wire in two-hour shifts and published a full edition without a single planning meeting. Nine items ran; two were killed in copy; one correction was issued before breakfast.',
  },
  {
    date: '2026-08-28',
    title: 'Open Photo Walk',
    desk: 'photo',
    location: 'City centre',
    edition: 'No. 05',
    dek: 'The photo desk went outside, on purpose, and came back with a cover.',
    body: 'A guided walk for anyone holding a camera or a phone. Attendees shot to a single brief, then sat down to select and caption together. The winning frame ran above the fold the following week.',
  },
  {
    date: '2026-08-02',
    title: 'The Great Style Guide Debate',
    desk: 'opinion',
    location: 'Voice channel',
    edition: 'No. 04',
    dek: 'Two hours on punctuation. Nobody left early.',
    body: 'A moderated debate on house style, ending in three binding rulings: the Oxford comma stays, headlines use sentence case, and nobody is allowed to write "utilise" again.',
  },
  {
    date: '2026-07-19',
    title: 'Build-in-Public Workshop',
    desk: 'tech',
    location: 'Workshop room',
    edition: 'No. 03',
    dek: 'Members shipped small tools live and wrote the release notes in the same session.',
    body: 'Pairs picked one tiny idea, built it in ninety minutes, and published a short teardown of what broke. Five tools shipped; four still work.',
  },
  {
    date: '2026-06-30',
    title: 'Summer Reading Review Night',
    desk: 'arts',
    location: 'Reading room',
    edition: 'No. 02',
    dek: 'Six reviews, read aloud, defended in front of the people who disagreed.',
    body: 'A review-swap evening: each member brought one piece, read it to the room, and took questions. The transcript became the first Arts & Culture feature spread.',
  },
  {
    date: '2026-06-14',
    title: 'Inaugural Club Tournament',
    desk: 'sports',
    location: 'Online brackets',
    edition: 'No. 01',
    dek: 'The first bracket, the first upset, and the first post-match quote worth printing.',
    body: 'Sixteen entrants, four rounds, one contested semi-final. The sports desk was founded roughly forty minutes into the event because somebody had to keep score.',
  },
  {
    date: '2026-05-30',
    title: 'Founding Meeting',
    desk: 'newsdesk',
    location: 'Wherever everyone was',
    edition: 'Charter',
    dek: 'The club is declared into existence; a masthead is drawn on the back of something.',
    body: 'Members agreed on three rules: publish under your own name, correct yourself in public, and keep the letters box anonymous. The rest was left deliberately unwritten.',
  },
];
