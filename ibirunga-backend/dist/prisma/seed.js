"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcrypt"));
const prisma = new client_1.PrismaClient();
async function main() {
    const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD ?? 'admin123', 10);
    await prisma.admin.upsert({
        where: { email: process.env.ADMIN_EMAIL ?? 'admin@ibirunga.com' },
        update: {},
        create: {
            email: process.env.ADMIN_EMAIL ?? 'admin@ibirunga.com',
            passwordHash,
            name: 'Admin',
        },
    });
    await prisma.siteSetting.upsert({
        where: { id: 'default' },
        update: {},
        create: {
            id: 'default',
            name: 'Ibirunga View Resort',
            tagline: 'Your gateway to volcanoes',
            phone: '+250 798 145 330',
            phoneAlt: '+250 783 378 828',
            email: 'ibirungaviewresort@gmail.com',
            address: 'Musanze, Nyarubande, Rwanda',
            logoUrl: '/logo.png',
        },
    });
    const navLinks = [
        { label: 'Home', href: '#home', sortOrder: 0 },
        { label: 'About', href: '#about', sortOrder: 1 },
        { label: 'Our Rooms', href: '#rooms', sortOrder: 2 },
        { label: 'Facilities', href: '#amenities', sortOrder: 3 },
        { label: 'Blog', href: '#blog', sortOrder: 4 },
        { label: 'Contact', href: '#contact', sortOrder: 5 },
    ];
    if ((await prisma.navLink.count()) === 0) {
        await prisma.navLink.createMany({ data: navLinks });
    }
    const sections = [
        {
            id: 'hero',
            data: JSON.stringify({
                headline: 'Enjoy A Luxury Experience',
                subtext: 'Nestled in the heart of Musanze with breathtaking volcano views, Ibirunga View Resort offers refined comfort, warm hospitality, and unforgettable stays.',
                ctaLabel: 'Discover',
                ctaUrl: '#about',
                backgroundImage: '/LUCIMAGES_20.JPG',
            }),
        },
        {
            id: 'about',
            data: JSON.stringify({
                eyebrow: 'About Us',
                title: 'Most Safe & Rated Hotel In Musanze.',
                paragraphs: [
                    'Ibirunga View Resort blends modern comfort with the natural beauty of Rwanda\'s volcanic highlands. Every space is designed for calm, clarity, and a sense of arrival.',
                    'Whether you are here for gorilla trekking, hillside calm, or a family getaway, our team ensures a welcoming stay from check-in to farewell.',
                ],
                mainImage: '/LUCIMAGES_15.JPG',
                sideImage: '/LUCIMAGES_26.JPG',
                features: [
                    'Clean, comfortable guest rooms',
                    'Restaurant, bar & coffee shop',
                    'Sauna & massage wellness',
                    'Rooftop and garden spaces',
                ],
                ctaLabel: 'Learn More',
                ctaUrl: '#rooms',
            }),
        },
        {
            id: 'amenities-meta',
            data: JSON.stringify({
                eyebrow: 'Explore',
                title: 'The Hotel',
                description: 'Everything you need for a calm, comfortable stay — rooms, dining, wellness, and open-air spaces with hillside views.',
            }),
        },
        {
            id: 'rooms-meta',
            data: JSON.stringify({
                eyebrow: 'Accommodation',
                title: 'Rooms & Suites',
                description: 'Choose from thoughtfully designed rooms and suites with hillside views, fresh linens, and warm hospitality.',
            }),
        },
        {
            id: 'extra-meta',
            data: JSON.stringify({
                eyebrow: 'Best Prices',
                title: 'Extra Services',
                paragraphs: [
                    'Make your visit smoother with dining packages, room care, and thoughtful extras planned around your schedule at Ibirunga View Resort.',
                    'From welcome drinks to daily refresh options, choose what fits your stay and enjoy warm hospitality with every detail handled for you.',
                ],
            }),
        },
        {
            id: 'testimonials-meta',
            data: JSON.stringify({
                eyebrow: 'Testimonial',
                title: 'What Our Clients Say',
            }),
        },
        {
            id: 'booking-form',
            data: JSON.stringify({
                title: 'Book A Room',
                image: '/LUCIMAGES_16.JPG',
            }),
        },
        {
            id: 'video',
            data: JSON.stringify({
                title: 'Take A Tour Of Luxury',
                backgroundImage: '/LUCIMAGES_22.JPG',
                youtubeUrl: '',
            }),
        },
        {
            id: 'blog-meta',
            data: JSON.stringify({
                eyebrow: 'Our Blog',
                title: 'Latest News & Updates',
                description: 'Stories, tips, and updates from Ibirunga View Resort — dining, stays, and experiences in Musanze.',
            }),
        },
        {
            id: 'footer',
            data: JSON.stringify({
                newsletterDescription: 'Subscribe for stay offers, dining news, and seasonal updates from the resort.',
            }),
        },
    ];
    for (const section of sections) {
        await prisma.sectionContent.upsert({
            where: { id: section.id },
            update: { data: section.data },
            create: section,
        });
    }
    if ((await prisma.amenity.count()) === 0) {
        await prisma.amenity.createMany({
            data: [
                { title: 'Quality Room', description: 'Comfortable beds, fresh linens, and thoughtfully arranged spaces for restful nights.', image: '/LUCIMAGES_48.JPG', sortOrder: 0 },
                { title: 'Garden Terrace', description: 'Open-air lounges and green hillside spaces perfect for morning views and evening calm.', image: '/LUCIMAGES_34.JPG', sortOrder: 1 },
                { title: 'Best Accommodation', description: 'Welcoming rooms and suites prepared with care for couples, families, and travelers.', image: '/LUCIMAGES_26.JPG', sortOrder: 2 },
                { title: 'Wellness & Spa', description: 'Unwind with sauna and massage services after a day of volcano adventures.', image: '/LUCIMAGES_22.JPG', sortOrder: 3 },
                { title: 'Restaurants & Bars', description: 'Enjoy local and international dishes with drinks in a warm dining setting.', image: '/LUCIMAGES_21.JPG', sortOrder: 4 },
                { title: 'Special Offers', description: 'Thoughtful packages for longer stays, dining extras, and seasonal getaways.', image: '/LUCIMAGES_37.JPG', sortOrder: 5 },
            ],
        });
    }
    if ((await prisma.room.count()) === 0) {
        await prisma.room.createMany({
            data: [
                { title: 'Deluxe Double Room', category: 'Deluxe', price: '$85', image: '/LUCIMAGES_26.JPG', sortOrder: 0 },
                { title: 'Standard Twin Room', category: 'Standard', price: '$65', image: '/LUCIMAGES_46.JPG', sortOrder: 1 },
                { title: 'Family Suite', category: 'Suite', price: '$120', image: '/LUCIMAGES_48.JPG', sortOrder: 2 },
                { title: 'Executive Room', category: 'Executive', price: '$95', image: '/LUCIMAGES_27.JPG', sortOrder: 3 },
                { title: 'Garden View Room', category: 'Deluxe', price: '$75', image: '/LUCIMAGES_30.JPG', sortOrder: 4 },
            ],
        });
    }
    if ((await prisma.extraService.count()) === 0) {
        await prisma.extraService.createMany({
            data: [
                {
                    title: 'Room Cleaning',
                    subtitle: 'Perfect for a fresh, spotless stay',
                    price: '$39.99',
                    features: JSON.stringify(['Daily room refresh', 'Premium linen change', 'Bathroom restock']),
                    sortOrder: 0,
                },
                {
                    title: 'Drinks Included',
                    subtitle: 'Perfect for relaxed evenings in',
                    price: '$49.99',
                    features: JSON.stringify(['Welcome drink on arrival', 'Soft drinks with meals', 'Coffee & tea service']),
                    sortOrder: 1,
                },
            ],
        });
    }
    if ((await prisma.testimonial.count()) === 0) {
        await prisma.testimonial.createMany({
            data: [
                { name: 'Sarah Mitchell', role: 'Guest from UK', image: '/LUCIMAGES_42.JPG', text: 'A peaceful stay with beautiful views and warm hospitality. The rooms were spotless and the breakfast was delightful.', sortOrder: 0 },
                { name: 'Jean Claude', role: 'Traveler from Kigali', image: '/LUCIMAGES_21.JPG', text: 'Perfect base for visiting the volcanoes. Staff were attentive and the lounge areas felt calm and inviting.', sortOrder: 1 },
                { name: 'Emily Carter', role: 'Family Stay', image: '/LUCIMAGES_33.JPG', text: 'We loved the garden terrace and the comfortable family suite. Everything felt clean, clear, and well looked after.', sortOrder: 2 },
                { name: 'David Foster', role: 'Business Guest', image: '/LUCIMAGES_16.JPG', text: 'Quiet rooms, reliable service, and a calm lounge made my work trip surprisingly restful.', sortOrder: 3 },
                { name: 'Aline Uwase', role: 'Weekend Escape', image: '/LUCIMAGES_39.JPG', text: 'The balcony breakfast and hillside views made our weekend feel special from the first morning.', sortOrder: 4 },
            ],
        });
    }
    if ((await prisma.blogPost.count()) === 0) {
        await prisma.blogPost.createMany({
            data: [
                { title: 'Fresh Breakfast With Mountain Views', excerpt: 'Start your day with tropical fruit and local flavours on our terrace.', date: '12 Jan', image: '/LUCIMAGES_34.JPG', sortOrder: 0 },
                { title: 'Warm Hospitality At Every Turn', excerpt: 'Our team is dedicated to making every stay feel personal and memorable.', date: '05 Feb', image: '/LUCIMAGES_21.JPG', sortOrder: 1 },
                { title: 'Spotless Rooms Ready For You', excerpt: 'Housekeeping details that turn a good night into a great escape.', date: '18 Mar', image: '/LUCIMAGES_37.JPG', sortOrder: 2 },
            ],
        });
    }
    if ((await prisma.footerService.count()) === 0) {
        await prisma.footerService.createMany({
            data: [
                { label: 'Restaurant & Bar', sortOrder: 0 },
                { label: 'Spa & Massage', sortOrder: 1 },
                { label: 'Coffee Shop', sortOrder: 2 },
                { label: 'Airport Transfer', sortOrder: 3 },
                { label: 'Garden Terrace', sortOrder: 4 },
                { label: 'Meeting Room', sortOrder: 5 },
            ],
        });
    }
}
main()
    .then(async () => {
    await prisma.$disconnect();
})
    .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
//# sourceMappingURL=seed.js.map