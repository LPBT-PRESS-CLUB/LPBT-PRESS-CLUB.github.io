/* ============================================================================
   LPBT Press Club — site content
   ----------------------------------------------------------------------------
   This is the only file you need to edit to change what the site says.
   Everything below is PLACEHOLDER copy: swap in the real desks, staff and
   events. Portraits are placeholders pulled from
   github.com/cat-milk/Anime-Girls-Holding-Programming-Books
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
   -------------------------------------------------------------------------- */
const IMG = 'https://raw.githubusercontent.com/cat-milk/Anime-Girls-Holding-Programming-Books/master/';

const STAFF = [
  {
    name: 'Lain',
    handle: '@not-so-lain',
    role: 'Editor-in-Chief',
    desks: ['tech', 'opinion'],
    since: '2026',
    beat: 'Everything, eventually',
    bio: 'Runs the front page, signs off the final proof, and answers the letters box personally.',
    img: IMG + 'Go/Iwakura_Lain_Reading_Introducing_Go.png',
    alt: 'Placeholder portrait: an illustrated character reading a Go programming book.',
  },
  {
    name: 'Anya',
    handle: '@anya',
    role: 'Junior Correspondent',
    desks: ['newsdesk'],
    since: '2026',
    beat: 'Announcements & rumours',
    bio: 'First on the wire, last to file. Has never once missed a piece of gossip worth printing.',
    img: IMG + 'Python/Anya_with_python_book.png',
    alt: 'Placeholder portrait: an illustrated character holding a Python book.',
  },
  {
    name: 'Mio',
    handle: '@mio',
    role: 'Copy Chief',
    desks: ['arts', 'opinion'],
    since: '2026',
    beat: 'Style, grammar, mercy',
    bio: 'Keeper of the style guide. Will delete your semicolon and will not apologise for it.',
    img: IMG + 'Rust/Akiyama_Mio_Holding_The_Rust_Programming_Language.png',
    alt: 'Placeholder portrait: an illustrated character holding The Rust Programming Language.',
  },
  {
    name: 'Mokou',
    handle: '@mokou',
    role: 'Night Editor',
    desks: ['newsdesk'],
    since: '2026',
    beat: 'The 3 a.m. shift',
    bio: 'Holds the desk while everyone else sleeps. Files clean copy at hours that should not produce clean copy.',
    img: IMG + 'Haskell/Fujiwara_No_Mokou_LYAHFGG.png',
    alt: 'Placeholder portrait: an illustrated character holding a Haskell book.',
  },
  {
    name: 'Isana',
    handle: '@isana',
    role: 'Systems & Print Ops',
    desks: ['tech'],
    since: '2026',
    beat: 'Deploys, pipelines, uptime',
    bio: 'Keeps the presses running. If the site is up, thank this desk; if it is down, it is already being fixed.',
    img: IMG + 'Linux/Isana_Higashira_Holding_The_Linux_Command_Line.png',
    alt: 'Placeholder portrait: an illustrated character holding The Linux Command Line.',
  },
  {
    name: 'Konata',
    handle: '@konata',
    role: 'Columnist',
    desks: ['opinion', 'tech'],
    since: '2026',
    beat: 'Weekly column, strong views',
    bio: 'Writes the column everyone claims not to read and everyone quotes by Wednesday.',
    img: IMG + 'Typescript/Izumi_Konata_Essential_Typescript.png',
    alt: 'Placeholder portrait: an illustrated character holding Essential TypeScript.',
  },
  {
    name: 'Sophie',
    handle: '@sophie',
    role: 'Critic-at-Large',
    desks: ['arts'],
    since: '2026',
    beat: 'Reviews & long reads',
    bio: 'Reviews the thing, then reviews the assumptions behind the thing. Word counts are a suggestion.',
    img: IMG + 'Lisp/Sophie_Neuenmuller_Land_of_Lisp.png',
    alt: 'Placeholder portrait: an illustrated character holding Land of Lisp.',
  },
  {
    name: 'Eru',
    handle: '@eru',
    role: 'Investigations',
    desks: ['newsdesk', 'tech'],
    since: '2026',
    beat: 'Long-running inquiries',
    bio: 'Asks the second question. Maintains a notebook nobody else is permitted to read.',
    img: IMG + 'Javascript/Chitanda_Eru_Holding_Programming_Books_With_Deno_Manual_On_The_Top.png',
    alt: 'Placeholder portrait: an illustrated character holding a stack of programming books.',
  },
  {
    name: 'Reina',
    handle: '@reina',
    role: 'Photo Editor',
    desks: ['photo', 'arts'],
    since: '2026',
    beat: 'Portraits & event coverage',
    bio: 'Decides which image runs above the fold, and crops it without consulting anyone.',
    img: IMG + 'C/Aharen_Reina_Holding_C_Programming_Language.png',
    alt: 'Placeholder portrait: an illustrated character holding The C Programming Language.',
  },
  {
    name: 'Alice',
    handle: '@alice',
    role: 'Sports Desk Lead',
    desks: ['sports'],
    since: '2026',
    beat: 'Brackets & results',
    bio: 'Maintains the standings table and treats every friendly match as a matter of historical record.',
    img: IMG + 'Java/Alice_Kuonji_Java_8.png',
    alt: 'Placeholder portrait: an illustrated character holding a Java book.',
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
