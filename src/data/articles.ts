/**
 * Journal articles.
 *
 * `body` is an array of paragraphs. A string beginning with "## " renders as a
 * subheading; everything else renders as a paragraph. That keeps the data
 * readable without pulling in a markdown dependency for six posts.
 */

export interface Article {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    date: string;
    image: string;
    body: string[];
  }
  
  export const articles: Article[] = [
    {
      slug: 'jet-card-vs-membership',
      title: 'Jet Card or Membership: which one actually costs you less',
      excerpt:
        'The two most common ways to buy private aviation suit very different flying patterns. The honest answer usually comes down to one number.',
      category: 'Guide',
      date: 'April 2026',
      image: '/images/membership_window_hero.jpg',
      body: [
        'Almost every conversation about buying private aviation arrives at the same fork: a jet card, or an annual membership. Operators have an interest in steering you toward whichever is more profitable for them. Here is the version without that interest.',
        '## The number that decides it',
        'How many hours you fly in a year. Below roughly fifty, a card will often cost less if you value a fixed rate and can use the hours before they expire. Above it, membership usually becomes stronger because the reduced hourly rate has enough flying behind it to offset the annual fee.',
        'That is the starting calculation. Notice periods, peak-day access, aircraft preferences and unused-hour terms decide the rest.',
        '## What a card actually buys',
        'A jet card is hours bought in advance at a rate fixed for the term. The value is not the discount, which is often modest. It is that the rate does not move with fuel, season or demand — the flight you budget in January costs the same in August.',
        'For anyone whose flying is unpredictable but not frequent, that certainty is worth more than a lower headline rate.',
        '## What a membership actually buys',
        'Lower hourly rates, a shorter booking window, and someone who knows your schedule before you send it. On the busiest weekends of the year, guaranteed availability at twenty-four hours is the entire product.',
        'It is a worse deal below fifty hours and a clearly better one above it.',
        '## Unused hours are where cards differ most',
        'Read the expiry terms before the rate. Some cards expire hours at the end of a term; others roll them into a renewal; a few refund the balance at cost. On a twenty-five hour card, that single clause can be worth more than the difference in hourly rate between two providers.',
        '## The question to ask an operator',
        'Ask them to price both against your actual last twelve months. Any operator unwilling to do that, or who returns only the more expensive option, has answered a different question than the one you asked.',
      ],
    },
    {
      slug: 'empty-legs-explained',
      title: 'Empty legs explained, including what nobody tells you',
      excerpt:
        'A private jet at a fraction of the charter rate is real. The catch is real too, and it is not the one most people expect.',
      category: 'Guide',
      date: 'May 2026',
      image: '/images/hero_clouds_wing.jpg',
      body: [
        'Aircraft rarely finish where they started. After dropping passengers, one has to return to base or move to its next booking, and on that leg it flies empty. Selling those seats costs the operator nothing they were not already spending, which is why the price falls so far.',
        '## Why the discount is so large',
        'The flight is happening regardless. Fuel, crew and handling are already committed. Anything recovered is better than nothing, so discounts of fifty to sixty-five per cent are normal rather than promotional.',
        '## The catch is not the aircraft',
        'People assume the trade-off is an older or smaller aircraft. It is not — it is the same aircraft that just flew a full-price charter. The trade-off is control.',
        'The departure is a window, not a time. The route is fixed at both ends. And if the booking that owns the aircraft changes, your flight changes with it.',
        '## When an empty leg is the wrong answer',
        'If the trip has to leave at nine on Thursday, charter it properly. An empty leg is superb for a flexible weekend and a poor choice for a meeting you cannot miss. Any operator who does not say that plainly is selling you the wrong thing.',
        '## What it is not',
        'It is not a shared flight. The aircraft is yours for that leg, with nobody else aboard, and the service is identical to a full-price charter. Nothing about the cabin, the crew or the catering is reduced to match the price.',
        '## How to actually catch one',
        'Register the route and the window you could travel in. Legs are usually offered to card holders and members before they are published, so on popular routes the difference between taking one and reading about it is being on the list.',
        'Widen the window as far as you honestly can. A leg that matches a fixed Thursday is rare; one that matches any day across a weekend is common. Most people who never find an empty leg have simply asked for a departure rather than a range.',
      ],
    },
    {
      slug: 'safety-in-private-aviation',
      title: 'What "safety audited" actually means',
      excerpt:
        'Every operator flying commercially holds a certificate. That is the legal minimum, not a standard. Here is what to ask instead.',
      category: 'Safety',
      date: 'March 2026',
      image: '/images/safety_runway_hero.jpg',
      body: [
        'Safety language in charter is unusually loose, and almost all of it sounds identical. The useful questions are narrower than the marketing suggests.',
        '## A certificate is not an audit',
        'An air operator certificate means a regulator has permitted the operator to fly commercially. Every legal operator has one. It says nothing about how they compare to their peers.',
        'An independent audit is different: a third party with no commercial interest arrives, examines the operation against a published standard, and issues a finding that can be checked with them directly.',
        '## The names worth knowing',
        'ARGUS and Wyvern are the two most recognised independent programmes in business aviation. IS-BAO, run by IBAC, assesses whether a safety management system is genuinely embedded rather than documented.',
        'You do not need to understand the methodology. You need to know that the ratings exist, that they can be verified with the issuer, and that an operator who has them will send you the report.',
        '## The three questions',
        'Who is actually operating my flight? What did their last audit find? Can I see the certificate?',
        'Those three, asked before booking, separate operators far more effectively than any brochure. An operator who hesitates on the first one is worth leaving.',
        '## Who is actually flying you',
        'A broker arranges the flight; an operator performs it. Those are different companies with different certificates, and the name on the website is frequently not the name on the aircraft. Neither arrangement is wrong, but you are entitled to know which is which before you commit.',
        '## Crew, quietly the biggest factor',
        'Two pilots on every sector regardless of aircraft size. Both type-rated on the aircraft, both trained in a full-motion simulator, both current on the route. Ask about the minimum total hours a captain must hold, and ask whether crew have absolute authority to refuse a sector without commercial consequence.',
        'The answer to that last one tells you more about a company than anything on its safety page.',
      ],
    },
    {
      slug: 'best-private-jet-destinations',
      title: 'Four places private aviation genuinely changes',
      excerpt:
        'For some destinations the private option is a comfort upgrade. For these, it changes what is possible in a day.',
      category: 'Destinations',
      date: 'May 2026',
      image: '/images/destinations/maldives.jpg',
      body: [
        'Flying private to a major hub saves you an hour of queuing. Flying private to somewhere with no scheduled service saves you a day, and occasionally makes the trip possible at all. The second category is the interesting one.',
        '## Where the runway is the constraint',
        'Scheduled services need long runways, terminal capacity and slots. A private aircraft needs none of that, which opens thousands of regional fields — the ones that sit near ski resorts, coastlines and estates rather than an hour and a half from them.',
        '## Aspen, Colorado',
        'A field at altitude, surrounded by terrain, with a short runway and demanding approach procedures. Commercial service is limited and weather-sensitive. Private access turns a connection through Denver into a direct arrival twenty minutes from the mountain.',
        '## The Maldives',
        'The scheduled option lands you at Malé, after which the actual journey begins by seaplane or boat. Private arrival puts you closer to the transfer, on your own schedule, and removes the connection that most often breaks the day.',
        '## Monaco and the Côte d\'Azur',
        'Nice is well served commercially. What private aviation changes here is not access but time: a helicopter transfer arranged airside turns arrival into a seven-minute hop instead of an hour in coastal traffic.',
        '## Courchevel and the fields that need a rating',
        'Some airfields require a specific captain qualification before an aircraft may use them at all. Courchevel is the famous example, with a sloped runway and a single approach. These are the destinations where private aviation is not a preference but the only option, and where the operator you choose genuinely determines whether you can land.',
        '## The pattern',
        'Ask one question of any destination: how far is the nearest airport with scheduled service, and how far is the nearest airport a private aircraft can use? Where those two answers differ by an hour or more, private aviation is buying you something a first-class seat cannot.',
      ],
    },
    {
      slug: 'in-flight-catering',
      title: 'Why aircraft catering is a harder problem than it looks',
      excerpt:
        'Altitude dulls taste, cabins are dry, and there is no kitchen. Good aircraft catering is an engineering problem before it is a culinary one.',
      category: 'Experience',
      date: 'March 2026',
      image: '/images/experience/cabin.jpg',
      body: [
        'A cabin at altitude is pressurised to around six to eight thousand feet and is drier than most deserts. Both facts change how food tastes, and neither is something a chef on the ground has to think about.',
        '## What altitude does to taste',
        'Perception of salt and sweetness drops noticeably at cabin pressure. Aroma, which carries most of what we call flavour, is blunted by the dry air. A dish that is perfectly seasoned in a restaurant will taste flat at thirty-nine thousand feet.',
        'Good aircraft catering compensates deliberately — more acidity, more aromatics, more texture, because texture is the one thing altitude does not dull.',
        '## There is no kitchen',
        'Most cabins have a galley capable of reheating, not cooking. Everything is prepared on the ground and finished on board, which rules out anything that depends on being served the moment it leaves the pan.',
        'That is why the best aircraft menus lean toward dishes that improve on standing rather than fight it.',
        '## Sourcing beats catering',
        'The single largest improvement is not technique but origin. Food sourced from restaurants at the departure city, a few hours before the flight, will beat an airline kitchen every time — and on a short sector it barely has time to age.',
        '## The dryness is the harder problem',
        'Cabin humidity often sits in single figures, which is drier than most deserts. It blunts aroma, and aroma carries the majority of what we experience as flavour. It is also why a dish that seemed generous on the ground can feel heavy at altitude, and why lighter courses served more often tends to work better than a single large one.',
        '## What to ask for',
        'Tell the operator the sector length, the departure time, and what you are doing when you land. A menu built around those three answers will serve you better than a list of luxury ingredients.',
      ],
    },
    {
      slug: 'why-private-aviation',
      title: 'The real argument for private aviation is arithmetic',
      excerpt:
        'The case is not comfort or status. It is how many working hours a scheduled itinerary quietly removes from a week.',
      category: 'Insight',
      date: 'June 2026',
      image: '/images/journey_city.jpg',
      body: [
        'The usual defence of private aviation is comfort, and it is the weakest one available. A first-class seat is comfortable. The argument that actually holds is about time, and it is easier to make with a calendar than a brochure.',
        '## Count the day, not the flight',
        'A commercial return between two European cities is rarely two hours of flying. It is a transfer, a check-in, a security queue, a gate wait, a flight, a baggage carousel, another transfer — and the same again coming back.',
        'For a senior team of four, that is most of two working days. The comparison that matters is against those hours, not against a seat price.',
        '## Three cities in a day',
        'What changes is not the individual flight but what becomes possible across a day. Boarding fifteen minutes before departure, with multiple stops on one itinerary and an aircraft that waits for the meeting that overruns, makes a schedule feasible that simply is not otherwise.',
        '## The second-order effect',
        'The gain is not only the hours recovered. It is that a schedule built around private aviation can be committed to earlier and changed later, because the aircraft moves when you do. Meetings get arranged that would otherwise have been declined on the grounds that the travel did not work.',
        '## Where the argument fails',
        'It fails for a single traveller on a well-served route with a flexible schedule. It fails when the trip could have been a call. Any operator who will not say that is selling rather than advising.',
        '## The honest framing',
        'Private aviation buys back time at a known cost per hour. Whether that trade is worth making depends entirely on what the hours are worth to you — which is a question only you can answer, and one worth answering before anyone quotes you a rate.',
      ],
    },
  ];
  
  export function getArticleBySlug(slug: string): Article | undefined {
    return articles.find((a) => a.slug === slug);
  }
  
  export const articleCategories = ['All', ...Array.from(new Set(articles.map((a) => a.category)))];
  