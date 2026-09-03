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
        title: "The light on the Corniche at dusk.",
        body: [
          "There's a particular kind of light along the Corniche at dusk — the kind that makes the sea look like it's breathing.",
          "I used to think home was a place. Now I think it's a feeling that returns to you the moment your feet touch familiar ground, before your mind has even caught up.",
          "Home is humidity on an airport walkway. A language changing mid-sentence at the dinner table. A version of me that never has to explain herself."
        ],
        video: { label: "A moment from the Corniche", type: "video", src: "media/auh-home-3.mp4" }
      },
      {
        id: "passion",
        lat: 24.4696, lng: 54.3900,
        pillar: "Passion",
        title: "Nine years of dance, and counting.",
        body: [
          "Dance found me before I could really choose it, and somewhere along the way it stopped being a hobby and became a language I think in.",
          "Nine years of Bharatanatyam taught me discipline long before school did — how to repeat something a hundred times until it finally looks effortless, how to be exhausted and still stand up straight.",
          "It culminated in my Arangetram, but the real gift wasn't the performance. It was learning that passion isn't a feeling you wait to arrive — it's a practice you show up for, especially on the days it doesn't feel like magic.",
          "That's the lens I bring to everything else now, whether it's a codebase or a competition: show up, repeat it until it's right, and let the discipline become the thing people mistake for talent."
        ],
        video: { label: "Arangetram, and the years of dance before it", type: "video", src: "media/dance-2.mp4" }
      },
      {
        id: "character",
        lat: 24.4915, lng: 54.3703,
        pillar: "Character",
        title: "Live intentionally.",
        body: [
          "My motto in life is live intentionally — and if I had to explain my character in one line, that would probably be it.",
          "I'm intentional about who I surround myself with, the opportunities I say yes to, and how I spend my time. I don't want a life that just looks impressive from the outside; I want my choices to actually reflect what I believe in.",
          "Character, to me, doesn't mean being agreeable or fitting into every room. I have strong beliefs, and I'm comfortable standing by them even when they aren't the popular ones. I'd rather be genuine and stand apart than shrink myself to belong.",
          "A family that let me be strong-willed, and eventually the nerve to move across the world for something I wanted, taught me the same lesson twice: discipline means very little if you don't know what you're working toward."
        ],
        video: { label: "Growing up in Abu Dhabi", type: "image", src: "media/character.jpg" }
      },
      {
        id: "academics",
        lat: 24.4360, lng: 54.4520,
        pillar: "Academics",
        title: "Sixty students, four AP exams, one Talent Day.",
        body: [
          "There's a version of me that led a team of around sixty students through Talent Day while quietly surviving four AP exams — and somehow neither thing suffered for the other.",
          "That was also around when I first fell for computer science: the way a problem could have a hundred wrong approaches and still one elegant answer waiting underneath. It felt like the same kind of discipline dance had already taught me, just in a new language.",
          "School taught me that ambition isn't loud, it's just persistent. My Grade 11 and 12 classmates taught me the rest: that the people beside you during the hardest stretch of your life become part of your permanent architecture, whether you meant for them to or not."
        ],
        video: { label: "School, Talent Day, graduation" }
      },
      {
        id: "friendship",
        lat: 24.4103, lng: 54.5622,
        pillar: "Friendship",
        title: "I've known some of my friends my whole life.",
        body: [
          "Some friendships get built over a semester. Mine were built over a childhood.",
          "I grew up alongside the same group of people from school — through every recital, every exam season, every version of myself I tried on and outgrew. They watched me become who I am because they were there for all the drafts, not just the final one.",
          "There's something no new friendship can replicate: the shorthand, the inside jokes with no origin story because you were both there when it started, the certainty that someone has known you long enough to call you out and love you anyway."
        ],
        video: { label: "School friends, over the years" }
      },
      {
        id: "service",
        lat: 24.5150, lng: 54.4950,
        pillar: "Service",
        title: "This pin goes further than Abu Dhabi.",
        linksTo: "gurgaon",
        body: [
          "I have always been ambitious, but I never wanted that ambition to end at my own doorstep.",
          "Somewhere between one country and another, I learned that the people I was trying to help were never abstract — they had names, mornings, small griefs.",
          "Follow this one and it will fly you somewhere further. It will take you to where that lesson started."
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
        title: "Paying attention, really paying attention.",
        body: [
          "Volunteering here never felt like a line I was building for later. It felt like paying attention — really paying attention — to people whose problems weren't hypothetical to me anymore.",
          "I learned that the things we build can either make someone's life quietly easier, or completely miss what they needed in the first place.",
          "I carry that lesson everywhere now, including into every line of code I write."
        ],
        video: { label: "Volunteering in Gurgaon" }
      },
      {
        id: "roots",
        lat: 28.4400, lng: 77.0650,
        pillar: "Roots",
        title: "A place I carry, not a place I visit.",
        body: [
          "Before I was from Abu Dhabi, I was from somewhere else entirely — a language, a cuisine, a way of celebrating that lives in me even though I've never lived here full-time.",
          "My roots aren't a place I visit. They're a place I carry, folded into the way I dance, the food I crave when I'm homesick, the festivals I still light up for even eight thousand miles away."
        ],
        video: { label: "Moments of my culture" }
      }
    ]
  },

  dubai: {
    view: { center: [25.1972, 55.2744], zoom: 11 },
    pin: {
      id: "dubai-continued",
      lat: 25.1972, lng: 55.2744,
      pillar: "Home Away From Home",
      title: "An hour up a road I could drive with my eyes closed.",
      body: [
        "Dubai was never home the way Abu Dhabi was. But it was always close — toward cousins, toward friends, toward a skyline that looked like proof the region could move fast if it wanted to.",
        "This is also where the Dabhol group story lives. Two fathers, roommates on a power plant project in the 1990s, whose children would grow up an ocean apart from where they met — and somehow ended up close anyway, gathering here more weekends than not.",
        "I didn't pick that group of people. I inherited them. And if I had the choice all over again, I'd pick them right back.",
        "Home doesn't always stay in one city. Sometimes it just spreads a little further down the coast."
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
        title: "I didn't come here to blend in.",
        body: [
          "Being a girl in a room mostly full of boys taught me to stop shrinking to make people comfortable.",
          "I chose Computer Science and Linguistics at UT Austin because I wanted the harder, stranger intersection — language, people, and machines all trying to understand each other.",
          "I came here ready for a challenge. I came here to be impossible to overlook."
        ],
        video: { label: "UT Austin, CS life" }
      },
      {
        id: "service-austin",
        lat: 30.3078, lng: -97.7433,
        pillar: "Service",
        title: "It didn't stay behind when I moved.",
        body: [
          "Gurgaon taught me that service isn't a resume line. Austin is proof it didn't stay behind when I moved eight thousand miles away.",
          "Through Women in Computer Science and the UTCS Roadshow, I get to hand a robotics kit to some kid who's never seen one before and watch their face do that thing — that flicker of 'oh, I could do this too.'",
          "That flicker is the whole point."
        ],
        video: { label: "Teaching robotics in Austin" }
      },
      {
        id: "ambition",
        lat: 30.2711, lng: -97.7437,
        pillar: "Ambition",
        title: "Ambition, lived intentionally.",
        body: [
          "I don't measure my life only in degrees or titles. Living intentionally means my ambition has to point somewhere — not just up, but toward something.",
          "I want to build a life that touches people, contributes something meaningful, and leaves every place I've been a little better than I found it. Even if the impact is small, I want it to be on purpose.",
          "When I picture myself at thirty, I'm not picturing a job title. I'm picturing someone who built things that mattered, loved people well, and never let comfort talk her out of something worth doing."
        ],
        video: { label: "What I'm building" }
      },
      {
        id: "friendship-austin",
        lat: 30.2586, lng: -97.7387,
        pillar: "Friendship",
        title: "I've found some. Not all of them yet.",
        body: [
          "I knew no one when I landed here. Not one person. I had to learn how to walk into a room alone, start a conversation I wasn't sure would go anywhere, and let a few of those conversations become something real.",
          "I'm scared of being perceived — I'll admit that outright. But Austin has slowly taught me that you can't build a life while waiting to feel completely comfortable first.",
          "I've found some people here. Not all of them yet. But some."
        ],
        video: { label: "New friends, first year" }
      },
      {
        id: "home-austin",
        lat: 30.2650, lng: -97.7420,
        pillar: "Home — still looking",
        title: "I'm not there yet. But I'm building it anyway.",
        body: [
          "I don't know yet if Austin will ever feel like home the way Abu Dhabi does. Maybe it doesn't have to.",
          "Maybe home isn't a place you replace — it's a feeling you slowly build a second version of, somewhere else, out of new mornings and new people and enough repetition that one day a street corner just feels familiar without you noticing when it happened.",
          "I'm still building that here. I'm not there yet. But I'm building it anyway."
        ],
        video: { label: "Austin, day to day" }
      }
    ]
  }
};
