import { ContentService } from './content.service';
export declare class PublicContentController {
    private content;
    constructor(content: ContentService);
    getAll(): Promise<{
        site: {
            id: string;
            email: string;
            name: string;
            tagline: string;
            phone: string;
            phoneAlt: string;
            address: string;
            logoUrl: string;
        } | null;
        navLinks: {
            id: string;
            label: string;
            href: string;
            sortOrder: number;
            published: boolean;
        }[];
        hero: Record<string, unknown>;
        about: Record<string, unknown>;
        amenitiesMeta: Record<string, unknown>;
        roomsMeta: Record<string, unknown>;
        extraMeta: Record<string, unknown>;
        testimonialsMeta: Record<string, unknown>;
        bookingForm: Record<string, unknown>;
        video: Record<string, unknown>;
        blogMeta: Record<string, unknown>;
        footer: Record<string, unknown>;
        amenities: {
            id: string;
            sortOrder: number;
            published: boolean;
            title: string;
            description: string;
            image: string;
        }[];
        rooms: {
            src: string;
            id: string;
            sortOrder: number;
            published: boolean;
            title: string;
            description: string;
            image: string;
            category: string;
            price: string;
        }[];
        extraServices: {
            features: string[];
            id: string;
            title: string;
            subtitle: string;
            price: string;
            sortOrder: number;
            published: boolean;
        }[];
        testimonials: {
            id: string;
            name: string;
            sortOrder: number;
            published: boolean;
            image: string;
            role: string;
            text: string;
        }[];
        blog: {
            src: string;
            id: string;
            sortOrder: number;
            published: boolean;
            title: string;
            image: string;
            excerpt: string;
            date: string;
        }[];
        footerServices: string[];
    }>;
}
