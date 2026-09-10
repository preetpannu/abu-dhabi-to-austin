// ============================================================
// STORY DATA — pillars edition.
// Everything here is what you'll want to edit: text, pillar
// names, and video slots. Coordinates are close approximations —
// nudge any [lat, lng] to the exact spot once you know it.
//
// Each pin's `video` is a placeholder. Once you have a real file,
// replace it with a real <video> src in app.js's buildVideoSlot(),
// or just tell me the file names and I'll wire it up.
// ============================================================

const STORY = {

  world: {
    center: [16, 24],
    zoom: 2.5,
    uae: { lat: 24.4539, lng: 54.3773 }
  },

  wideUAE: { center: [24.85, 54.82], zoom: 9 },

  abudhabi: {
    view: { center: [24.46, 54.42], zoom: 11 },
    pins: [
      {
        id: "home",
        lat: 24.4764, lng: 54.3352,
        pillar: "Home",
        title: "home is a feeling, not a zip code.",
        location: "Corniche, Abu Dhabi",
        body: [
          "My body knows I'm home before my brain catches up; something about the humidity as I walk out the plane and drive to the island that's the only home I've ever known.",
          "It's the Corniche sunsets and a language that switches mid-sentence and never having to explain a word."
        ],
        video: { label: "A moment from the Corniche", type: "video", src: "media/auh-home-3.mp4" }
      },
      {
        id: "passion",
        lat: 24.4696, lng: 54.3900,
        pillar: "Passion",
        title: "nine years of bharatanatyam and a lifetime worth of lessons",
        location: "Al Zahiyah, Abu Dhabi",
        body: [
          "Dance taught me discipline before school did; to show up, repeat it a hundred times and make it look effortless just became the way I lived life.",
          "PS: I've performed a full Arangetram so hours of dance memorized down to the eyebrow flick!",
        ],
        video: { label: "Arangetram, and the years of dance before it", type: "video", src: "media/dance-2.mp4" }
      },
      {
        id: "character",
        lat: 24.4915, lng: 54.3703,
        pillar: "Character",
        title: "what's a life not lived intentionally?",
        location: "Al Khalidiyah, Abu Dhabi",
        body: [
          "I have strong opinions and zero interest in hiding them just to fit in.",
          "Nine years of dance plus one very stubborn family equals someone who picks purpose over popularity, every time.",
          "Moving across the world alone was the clearest proof: I don't wait for permission to want more."
        ],
        video: { label: "Growing up in Abu Dhabi", type: "image", src: "media/character.jpg" }
      },
      {
        id: "academics",
        lat: 24.4360, lng: 54.4520,
        pillar: "Academics",
        title: "my high school life in a nut shell?",
        location: "Al Maryah Island, Abu Dhabi",
        body: [
          "Imagine directing a Shakespeare's play while juggling four AP exams in 2 weeks - yeah I lived that all throughout high school ouch.",
          "Turns out debugging code and debugging school use the exact same muscle."
        ],
        video: { label: "School, Talent Day, graduation", type: "video", src: "media/academics-auh.mp4" }
      },
      {
        id: "friendship",
        lat: 24.4103, lng: 54.5622,
        pillar: "Friendship",
        title: "they knew me before I knew myself",
        location: "Al Reem Island, Abu Dhabi",
        body: [
          "I have given these people my ugliest crying, my worst decisions, my most humiliating years and gotten over it when some left.",
          "Still, leaving all of them for Austin was the first heartbreak nobody warns you about. Screw a breakup; this was the loudest heartbreak."
        ],
        video: { label: "School friends, over the years", type: "video", src: "media/friends-huh.mp4" }
      },
      {
        id: "service",
        lat: 24.5150, lng: 54.4950,
        pillar: "Service",
        title: "this pin flies further than Abu Dhabi",
        location: "Al Bahia, Abu Dhabi",
        linksTo: "gurgaon",
        body: [
          "My ambition too has a passport. It never stopped at just my own doorstep.",
          "Follow this pin to where that lesson actually started."
        ],
        video: null,
        cta: "Fly to Gurgaon, India →"
      }
    ]
  },

  gurgaon: {
    wide: { center: [23, 79], zoom: 4 },
    view: { center: [28.4595, 77.0266], zoom: 11 },
    pins: [
      {
        id: "volunteering",
        lat: 28.4595, lng: 77.0266,
        pillar: "Service",
        title: "paying attention",
        location: "Sector 7, Gurgaon",
        body: [
          "Interacting with these people here taught me that humans are never abstract — they have names, mornings and a whole life of stories.",
          "That lesson now lives in every line of code I write."
        ],
        video: { label: "Volunteering in Gurgaon", type: "video", src: "media/india-volunteering.mp4" }
      },
      {
        id: "roots",
        lat: 28.4400, lng: 77.0650,
        pillar: "Roots",
        title: "roots don't need a residency",
        location: "DLF Phase 3, Gurgaon",
        body: [
          "My last name, Pannu, is a Punjabi surname older than any border I have ever crossed.",
          "I grew up switching between Hindi, Punjabi and English mid-sentence because turns out roots don't do fractions, they simply multiply."
        ],
        video: { label: "Moments of my culture", type: "video", src: "media/india-roots.mp4" }
      }
    ]
  },

  dubai: {
    view: { center: [25.1972, 55.2744], zoom: 11 },
    pin: {
      id: "dubai-continued",
      lat: 25.1972, lng: 55.2744,
      pillar: "Home Away From Home",
      title: "an hour up the road I know like the back of my hand",
      location: "Dubai Marina, Dubai",
      body: [
        "Home just spread a little further to the mainland.",
        "This is where the Dabhol story lives — four guys in their 20s & a power plant project in India started a circle where the kids never got a say in becoming close."
      ],
      video: { label: "Weekends in Dubai, the Dabhol group", type: "video", src: "media/dubai-video.mp4" }
    }
  },

  // driving waypoints, Abu Dhabi -> Dubai (roughly E11 / Sheikh Zayed Rd)
  road: [
    [24.4667, 54.3667],
    [24.6205, 54.4306],
    [24.8607, 54.6086],
    [24.9857, 54.7500],
    [25.0700, 54.9200],
    [25.1300, 55.1000],
    [25.2048, 55.2708]
  ],

  departuresBoard: [
    { dest: "LONDON", flight: "BA 108", status: "DEPARTED" },
    { dest: "MUMBAI", flight: "EY 234", status: "DEPARTED" },
    { dest: "SINGAPORE", flight: "SQ 493", status: "BOARDING" },
    { dest: "NEW YORK · AUSTIN", flight: "EY 101", status: "FINAL CALL", highlight: true },
    { dest: "PARIS", flight: "AF 655", status: "ON TIME" }
  ],

  boardingPass: {
    passenger: "Preet Pannu",
    origin: "Abu Dhabi",
    destination: "Austin",
    via: "New York (JFK)",
    date: "August 2025",
    seat: "Still figuring it out"
  },

  usa: {
    wideUS: { center: [39.8, -98.5], zoom: 4 },
    wideTexas: { center: [31.0, -99.9], zoom: 6 }
  },

  austin: {
    view: { center: [30.2755, -97.7423], zoom: 12 },
    pins: [
      {
        id: "cs",
        lat: 30.2849, lng: -97.7341,
        pillar: "Academics",
        title: "i didn't come here to blend in",
        location: "UT Austin Campus, Austin",
        body: [
          "Being one of a handful of girls in a 300 person lecture hall stopped feeling like a flex and started feeling like data.",
          "CS wasn't the safest bet but it was one nobody could talk me out of. So I try to be the loudest in every CS class, taking one for me and the other 5 girls."
        ],
        video: { label: "UT Austin, CS life", type: "video", src: "media/utcs.mp4" }
      },
      {
        id: "service-austin",
        lat: 30.3078, lng: -97.7433,
        pillar: "Service",
        title: "followed me 8,000 miles",
        location: "Mount Bonnel, Austin",
        body: [
          "I've handed robotics kits to kids in towns smaller than my old apartment building back home.",
          "A girl asked if I was 'actually a real engineer' so I said watch me but she built her robot first (yes, it was super embaraasing)."
        ],
        video: { label: "Teaching robotics in Austin", type: "image", src: "media/ut-volunteer.jpg" }
      },
      {
        id: "ambition",
        lat: 30.2711, lng: -97.7437,
        pillar: "Ambition",
        title: "live for the experience, not the result",
        location: "Black Sheep Coffee, Austin",
        body: [
          "Nothing can come between me and my goals and what I remember is rarely the outcome — it's the people, the conversations & the spontaneous yeses.",
          "I moved knowing almost no one, chasing a life bigger than the one I'd always known — one I'd actually be there for."
        ],
        video: { label: "What I'm building", type: "image", src: "media/ambition.jpg" }
      },
      {
        id: "friendship-austin",
        lat: 30.2586, lng: -97.7387,
        pillar: "Friendship",
        title: "found some, still counting",
        location: "West Campus, Austin",
        body: [
          "I know I'm still far from having found my people.",
          "But I'm scared of being alone so all in all, you know I was forced to find some anyways; and I'm glad I did."
        ],
        video: { label: "New friends, first year", type: "video", src: "media/friends-ut.mp4" }
      },
      {
        id: "home-austin",
        lat: 30.2650, lng: -97.7420,
        pillar: "Home — still looking",
        title: "building a second home, on purpose",
        location: "South Congress, Austin",
        body: [
          "Austin isn't home yet — but I'm collecting the mornings and street corners that might make it one.",
          "Not there yet; building it anyway."
        ],
        video: { label: "Austin, day to day", type: "video", src: "media/ut-home.mp4" }
      }
    ]
  }
};
