"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const staff = await prisma.user.upsert({
        where: { email: 'staff@example.com' },
        update: {},
        create: {
            email: 'staff@example.com',
            name: 'Staff User',
            role: 'STAFF',
        },
    });
    await prisma.event.createMany({
        data: [
            {
                title: 'London Jazz Festival',
                description: `Join us for a weekend of world-class jazz across multiple venues in London.
Featuring headline acts, up-and-coming artists, and late-night jam sessions.
Don’t miss our special closing concert at the Southbank Centre!`,
                location: 'Southbank Centre, London',
                datetime: new Date('2025-06-14T19:30:00Z').toISOString(),
                imageUrl: 'https://images.unsplash.com/photo-1520975918733-8f7e2f2a8820',
                createdById: staff.id,
            },
            {
                title: 'Tech Talks: AI in Everyday Life',
                description: `A panel discussion on how artificial intelligence is reshaping our daily routines—from smart homes to personalised healthcare.
Hear from industry experts about the ethical considerations and future prospects.
Network with speakers and fellow tech enthusiasts afterward over drinks.`,
                location: 'Level39, Canary Wharf, London',
                datetime: new Date('2025-07-02T18:00:00Z').toISOString(),
                imageUrl: 'https://images.unsplash.com/photo-1581093588401-0b1a07ce40f9',
                createdById: staff.id,
            },
            {
                title: 'Sunset Kayaking on the Thames',
                description: `Paddle alongside the heart of London as the sun dips below the skyline.
All skill levels welcome—guides will teach flatwater techniques before launch.
Finish the evening with hot cocoa and a riverside bonfire on the bank.`,
                location: 'Westminster Pier, London',
                datetime: new Date('2025-06-21T20:00:00Z').toISOString(),
                imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
                createdById: staff.id,
            },
            {
                title: 'Artisanal Bread Baking Workshop',
                description: `Learn the art of sourdough and rye in this hands-on baking class.
Our master baker will guide you through mixing, kneading, and crust development.
Take home your own loaf and recipes to impress at home.`,
                location: 'Battersea Community Kitchen, London',
                datetime: new Date('2025-08-10T10:00:00Z').toISOString(),
                imageUrl: 'https://images.unsplash.com/photo-1546549031-66fa46bc1e07',
                createdById: staff.id,
            },
            {
                title: 'Poetry Slam Night',
                description: `Step up to the mic or cheer from the audience at our monthly poetry slam.
Themes this month include identity, change, and hope—bring your original work.
Doors open at 7pm with open-mic signups before the main event begins.`,
                location: 'The Poetry Café, Covent Garden',
                datetime: new Date('2025-06-28T19:00:00Z').toISOString(),
                imageUrl: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93',
                createdById: staff.id,
            },
            {
                title: 'Silent Disco in the Park',
                description: `Grab your wireless headphones and dance under the stars.
Choose between three live DJs spinning everything from disco to dubstep.
Refreshments, glow sticks, and picnic blankets welcome—lager and soda on sale.`,
                location: 'Regent’s Park, London',
                datetime: new Date('2025-07-12T21:00:00Z').toISOString(),
                imageUrl: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3',
                createdById: staff.id,
            },
            {
                title: 'Charity Fun Run 5K',
                description: `Join runners of all paces for a scenic 5K through Hyde Park.
All proceeds go to local youth sports programs.
Medals and post-race refreshments provided—walkers and strollers welcome!`,
                location: 'Hyde Park, London',
                datetime: new Date('2025-09-05T09:00:00Z').toISOString(),
                imageUrl: 'https://images.unsplash.com/photo-1517964603305-1c4bbd7104f7',
                createdById: staff.id,
            },
            {
                title: 'DIY Terrarium Workshop',
                description: `Create your own miniature green world in glass.
We supply succulents, moss, soil, and all the tools—just bring your green thumb.
Perfect for sprucing up your home or gifting to a friend.`,
                location: 'Camden Arts Studio, London',
                datetime: new Date('2025-07-19T11:00:00Z').toISOString(),
                imageUrl: 'https://images.unsplash.com/photo-1556912998-5bdb2a98ec12',
                createdById: staff.id,
            },
            {
                title: 'Beginner’s Salsa Class',
                description: `Get moving with our high-energy salsa lesson for complete beginners.
Our instructor will break down basic steps and partner work.
No partner needed—come solo or with a friend, and stay for the social dance after class.`,
                location: 'Shoreditch Dance Loft, London',
                datetime: new Date('2025-08-02T18:30:00Z').toISOString(),
                imageUrl: 'https://images.unsplash.com/photo-1526401485004-9549ef9af3b1',
                createdById: staff.id,
            },
            {
                title: 'London Photography Walking Tour',
                description: `Capture the hidden corners and iconic landmarks of London.
Our pro photographer guide will share composition tips and editing tricks.
Bring your DSLR or smartphone—limited to 12 participants for a personal experience.`,
                location: 'Meeting point: Tower Bridge',
                datetime: new Date('2025-06-30T09:30:00Z').toISOString(),
                imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
                createdById: staff.id,
            },
            {
                title: 'Stand-up Comedy Open Mic',
                description: `Watch emerging comedians test new material at this friendly open-mic.
Sign-ups at the door; slots are first-come, first-served.
Bar open from 7pm with drink specials, show starts at 8pm sharp!`,
                location: 'The Comedy Store, London',
                datetime: new Date('2025-07-25T20:00:00Z').toISOString(),
                imageUrl: 'https://images.unsplash.com/photo-1569429608918-46a9a9b3ceb6',
                createdById: staff.id,
            },
            {
                title: 'Historical Pub Crawl',
                description: `Discover centuries-old taverns and the stories behind them.
A guided walk through historic London pubs with tastings along the way.
Limited to 15 people—includes a keepsake beer glass and map booklet.`,
                location: 'Starting at The George Inn, Southwark',
                datetime: new Date('2025-08-16T17:00:00Z').toISOString(),
                imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93',
                createdById: staff.id,
            },
            {
                title: 'Outdoor Cinema Night: Classic Films',
                description: `Settle in under the stars for a screening of beloved classics.
Bring your blankets and low-chairs; popcorn and snacks available for purchase.
This month’s feature: “The Wizard of Oz.” Seating opens at sunset.`,
                location: 'Brockwell Park, London',
                datetime: new Date('2025-09-10T19:30:00Z').toISOString(),
                imageUrl: 'https://images.unsplash.com/photo-1502136969935-8d0fdb7f6a26',
                createdById: staff.id,
            },
            {
                title: 'Mindfulness Meditation Session',
                description: `Find your calm with a guided meditation in the heart of the city.
Suitable for all levels—no prior experience needed.
Bring a mat or towel; we’ll supply cushions and tea afterward.`,
                location: 'Kew Gardens, London',
                datetime: new Date('2025-07-08T08:00:00Z').toISOString(),
                imageUrl: 'https://images.unsplash.com/photo-1502767089025-6572583495b0',
                createdById: staff.id,
            },
            {
                title: 'Community Garden Planting Day',
                description: `Get your hands dirty and help us revitalize the local community garden.
Learn planting techniques from urban gardeners, and take home a herb starter kit.
Family-friendly—kids can plant their own veggies.`,
                location: 'Hackney Community Garden, London',
                datetime: new Date('2025-08-23T10:00:00Z').toISOString(),
                imageUrl: 'https://images.unsplash.com/photo-1524594157363-97be1862bb25',
                createdById: staff.id,
            },
            {
                title: 'Indie Folk Music Evening',
                description: `An intimate evening of acoustic performances by local folk artists.
Enjoy homemade pies and craft ales from our pop-up kitchen.
Limited seating—book early to reserve your spot!`,
                location: 'Union Chapel, Islington',
                datetime: new Date('2025-09-20T18:30:00Z').toISOString(),
                imageUrl: 'https://images.unsplash.com/photo-1511376777868-611b54f68947',
                createdById: staff.id,
            },
        ],
    });
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
