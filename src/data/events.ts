/**
 * Content for /services/event-branding-entertainment. The service's listing
 * fields (name, short, perfectFor, FAQs, related) live in data/services.tsx
 * like every other service; this file holds what only that page renders.
 *
 * Images in /public/events are AI-generated illustrations (Codex gpt-image-2),
 * not photos of Hensa's own events. Swap in real event photography as it
 * becomes available: keep the file names and the alt text honest.
 */

export interface BrandingGroup {
  id: string;
  title: string;
  lead: string;
  items: string[];
  image: { src: string; alt: string };
}

export interface Act {
  id: string;
  title: string;
  body: string;
  image: { src: string; alt: string };
  /** object-position for the wide crop when the act is featured (portrait photos) */
  focus?: string;
}

export const EVENT_SERVICE_SLUG = "event-branding-entertainment";

export const hero = {
  image: {
    src: "/events/hero.jpg",
    alt: "Acrobats forming a three-person human tower on a stage lit green and orange at a corporate gala dinner",
  },
  lead: "Event branding and live entertainment from One Trusted Partner: backdrops, signage, delegate kits and corporate gifts, plus dancers, acrobats, musicians and hosts who fill the stage.",
};

export const branding = {
  heading: "Event Branding Solutions",
  intro: [
    "An event only looks professional when every piece of branding matches. Our event branding is built around your needs, whether you are hosting a corporate conference, gala dinner, product launch, wedding, exhibition or private celebration.",
    "From creative concepts and branded décor to signage, backdrops and promotional displays, we provide the complete range of event branding and corporate promotional items, designed together so the whole event looks like one brand.",
  ],
  image: {
    src: "/events/branding-stationery.jpg",
    alt: "Delegate welcome kit in green and orange: lanyards, name badges, notebooks, pens, a folder and a certificate",
  },
  closing:
    "Whether you are launching a new product, hosting a corporate conference, attending an exhibition or organising a high-profile summit, we handle your event branding from concept to execution and keep it consistent from the entrance to the stage.",
  groups: [
    {
      id: "branding-signage",
      title: "Branding & signage",
      lead: "Our solutions include",
      items: [
        "Branded stationery",
        "Notebooks",
        "Journals",
        "Diaries",
        "Pens",
        "Folders",
        "Document bags",
        "Lanyards",
        "Name tags",
        "Badges",
        "Certificates",
        "Banners",
        "Roll-up banners",
        "Backdrops",
        "Flags",
        "Directional signage",
        "Table branding",
        "Podium branding",
        "Stage branding",
        "Branded tents",
        "Promotional displays",
      ],
      image: {
        src: "/events/branding-venue.jpg",
        alt: "Conference hall dressed in green and orange with a stage backdrop, branded podium, roll-up banners and flags",
      },
    },
    {
      id: "gifts-merchandise",
      title: "Corporate gifts & merchandise",
      lead: "A wide selection of corporate gifts and merchandise, including",
      items: [
        "Mugs",
        "Water bottles",
        "Tumblers",
        "Travel mugs",
        "Keyholders",
        "Umbrellas",
        "Tote bags",
        "Backpacks",
        "Caps",
        "T-shirts",
        "Shirts",
        "Jackets",
        "Power banks",
        "USB drives",
        "Tech accessories",
        "Executive gift sets",
        "Customised gift hampers",
      ],
      image: {
        src: "/events/branding-gifts.jpg",
        alt: "Corporate gifts in green and orange: mugs, bottles, tumblers, an umbrella, tote bag, cap, power bank and a gift hamper",
      },
    },
    {
      id: "conferences-launches",
      title: "Conferences, summits & launches",
      lead: "For conferences, summits and product launches, we can provide",
      items: [
        "Delegate bags",
        "Conference kits",
        "Registration materials",
        "Branded notebooks & pens",
        "Speaker gifts",
        "VIP gifts",
        "Exhibitor materials",
        "Presentation folders",
        "Brochures",
        "Flyers",
        "Catalogues",
        "Product packaging",
        "Promotional giveaways",
      ],
      image: {
        src: "/events/branding-conference.jpg",
        alt: "Registration desk at a product launch, a staff member handing a delegate bag to an arriving guest",
      },
    },
  ] satisfies BrandingGroup[],
};

export const entertainment = {
  heading: "Live Entertainment & Performances",
  intro: [
    "Bring the energy of Africa to your event with live entertainment. We provide a wide range of professional performers and experiences that get your guests on their feet and give them something to remember.",
    "From traditional Kenyan dancers and acrobats to magicians and fire performers, our entertainment is tailored to suit the theme, audience and atmosphere of your event.",
  ],
  image: {
    src: "/events/ent-intro.jpg",
    alt: "Kenyan traditional dancers in beaded necklaces and kitenge skirts performing on a hotel lawn while drummers play",
  },
  acts: [
    {
      id: "traditional",
      title: "Traditional & Cultural Performances",
      body: "Celebrate African heritage with traditional dances, cultural showcases, drummers, storytellers and authentic musical performances.",
      image: {
        src: "/events/opt-traditional.jpg",
        alt: "Drummers and dancers in beaded collars and sisal skirts performing a Kenyan cultural dance",
      },
      focus: "50% 30%",
    },
    {
      id: "acrobatics",
      title: "Acrobatic Shows",
      body: "High-energy acrobatic performances with stunts, balancing acts and coordinated routines that keep audiences engaged.",
      image: {
        src: "/events/opt-acrobatics.jpg",
        alt: "An acrobat holding a handstand on another acrobat's raised hands under green stage light",
      },
      // keep the handstand in frame; the default centre crop cuts it off
      focus: "50% 6%",
    },
    {
      id: "magic",
      title: "Magic & Illusion Shows",
      body: "Interactive magic and illusion performances that surprise your guests and pull them into the act.",
      image: {
        src: "/events/opt-magic.jpg",
        alt: "A magician fanning a deck of cards at a gala table while guests react",
      },
    },
    {
      id: "fire",
      title: "Fire Performances",
      body: "Create a dramatic atmosphere with professionally choreographed fire shows and fire dancing.",
      image: {
        src: "/events/opt-fire.jpg",
        alt: "A fire performer spinning flaming poi at night, tracing circles of orange light",
      },
    },
    {
      id: "band",
      title: "Live Bands & Musicians",
      body: "Set the mood with live bands, acoustic musicians, instrumentalists, DJs and other musical acts.",
      image: {
        src: "/events/opt-band.jpg",
        alt: "An Afro-fusion band performing on an outdoor stage under orange and green lights",
      },
    },
    {
      id: "dancers",
      title: "Dancers & Dance Shows",
      body: "From contemporary and Afro-fusion to cultural and choreographed performances, our dancers add movement and excitement to your event.",
      image: {
        src: "/events/opt-dancers.jpg",
        alt: "An Afro-fusion dance troupe mid-move on stage in flowing orange and green costumes",
      },
    },
    {
      id: "kids",
      title: "Kids Entertainment",
      body: "Face painting, balloon artists, mascots, games, clowns and interactive activities for your younger guests.",
      image: {
        src: "/events/opt-kids.jpg",
        alt: "A face painter painting a butterfly on a young girl's cheek while a balloon artist works nearby",
      },
    },
    {
      id: "photobooth",
      title: "Photo Booths & 360° Experiences",
      body: "Photo booths, 360° video booths and branded photo experiences that let guests capture the night and share it.",
      image: {
        src: "/events/opt-photobooth.jpg",
        alt: "Two guests dancing on a lit 360-degree video booth platform as the camera arm circles them",
      },
    },
    {
      id: "interactive",
      title: "Interactive Entertainment",
      body: "Keep guests involved with games, challenges, audience participation, trivia, dance-offs and other interactive experiences.",
      image: {
        src: "/events/opt-interactive.jpg",
        alt: "Colleagues in a dance-off surrounded by cheering guests and falling confetti",
      },
    },
    {
      id: "caricature",
      title: "Caricature Artists",
      body: "Caricature artists who sketch your guests live at the event, so everyone takes home a drawing of themselves.",
      image: {
        src: "/events/opt-caricature.jpg",
        alt: "A caricature artist sketching a laughing guest on an easel while other guests look on",
      },
    },
  ] satisfies Act[],
};

export const closing = {
  heading: ["Let's make your event ", "unforgettable"] as const,
  body: "Whether you want to celebrate Kenyan culture, create a polished corporate atmosphere or simply entertain your guests, we bring together the right performers, creative concepts and event experiences for your occasion.",
  kicker: "Let's create an experience your guests will talk about long after the event.",
  image: {
    src: "/events/closing.jpg",
    alt: "A fire performer spinning a flaming staff at a night event while dancers perform on the stage behind",
  },
};
