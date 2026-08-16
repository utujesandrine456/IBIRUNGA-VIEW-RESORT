import { PrismaService } from '../prisma/prisma.service';
export declare class ContentService {
    private prisma;
    constructor(prisma: PrismaService);
    getPublicContent(): Promise<{
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
    getSection(id: string): Promise<{
        id: string;
    }>;
    updateSection(id: string, data: Record<string, unknown>): Promise<{
        id: string;
        data: string;
    }>;
    getSite(): import(".prisma/client").Prisma.Prisma__SiteSettingClient<{
        id: string;
        email: string;
        name: string;
        tagline: string;
        phone: string;
        phoneAlt: string;
        address: string;
        logoUrl: string;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    updateSite(data: {
        name: string;
        tagline: string;
        phone: string;
        phoneAlt: string;
        email: string;
        address: string;
        logoUrl: string;
    }): import(".prisma/client").Prisma.Prisma__SiteSettingClient<{
        id: string;
        email: string;
        name: string;
        tagline: string;
        phone: string;
        phoneAlt: string;
        address: string;
        logoUrl: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    listNavLinks(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        label: string;
        href: string;
        sortOrder: number;
        published: boolean;
    }[]>;
    createNavLink(data: {
        label: string;
        href: string;
        sortOrder?: number;
        published?: boolean;
    }): import(".prisma/client").Prisma.Prisma__NavLinkClient<{
        id: string;
        label: string;
        href: string;
        sortOrder: number;
        published: boolean;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    updateNavLink(id: string, data: Partial<{
        label: string;
        href: string;
        sortOrder: number;
        published: boolean;
    }>): import(".prisma/client").Prisma.Prisma__NavLinkClient<{
        id: string;
        label: string;
        href: string;
        sortOrder: number;
        published: boolean;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    deleteNavLink(id: string): import(".prisma/client").Prisma.Prisma__NavLinkClient<{
        id: string;
        label: string;
        href: string;
        sortOrder: number;
        published: boolean;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    listAmenities(includeUnpublished?: boolean): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        sortOrder: number;
        published: boolean;
        title: string;
        description: string;
        image: string;
    }[]>;
    createAmenity(data: {
        title: string;
        description: string;
        image: string;
        sortOrder?: number;
        published?: boolean;
    }): import(".prisma/client").Prisma.Prisma__AmenityClient<{
        id: string;
        sortOrder: number;
        published: boolean;
        title: string;
        description: string;
        image: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    updateAmenity(id: string, data: Partial<{
        title: string;
        description: string;
        image: string;
        sortOrder: number;
        published: boolean;
    }>): import(".prisma/client").Prisma.Prisma__AmenityClient<{
        id: string;
        sortOrder: number;
        published: boolean;
        title: string;
        description: string;
        image: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    deleteAmenity(id: string): import(".prisma/client").Prisma.Prisma__AmenityClient<{
        id: string;
        sortOrder: number;
        published: boolean;
        title: string;
        description: string;
        image: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    listRooms(includeUnpublished?: boolean): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        sortOrder: number;
        published: boolean;
        title: string;
        description: string;
        image: string;
        category: string;
        price: string;
    }[]>;
    createRoom(data: {
        title: string;
        category: string;
        price: string;
        description?: string;
        image: string;
        sortOrder?: number;
        published?: boolean;
    }): import(".prisma/client").Prisma.Prisma__RoomClient<{
        id: string;
        sortOrder: number;
        published: boolean;
        title: string;
        description: string;
        image: string;
        category: string;
        price: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    updateRoom(id: string, data: Partial<{
        title: string;
        category: string;
        price: string;
        description: string;
        image: string;
        sortOrder: number;
        published: boolean;
    }>): import(".prisma/client").Prisma.Prisma__RoomClient<{
        id: string;
        sortOrder: number;
        published: boolean;
        title: string;
        description: string;
        image: string;
        category: string;
        price: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    deleteRoom(id: string): import(".prisma/client").Prisma.Prisma__RoomClient<{
        id: string;
        sortOrder: number;
        published: boolean;
        title: string;
        description: string;
        image: string;
        category: string;
        price: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    listExtraServices(includeUnpublished?: boolean): Promise<{
        features: string[];
        id: string;
        title: string;
        subtitle: string;
        price: string;
        sortOrder: number;
        published: boolean;
    }[]>;
    createExtraService(data: {
        title: string;
        subtitle: string;
        price: string;
        features: string[];
        sortOrder?: number;
        published?: boolean;
    }): Promise<{
        features: string[];
        id: string;
        title: string;
        subtitle: string;
        price: string;
        sortOrder: number;
        published: boolean;
    }>;
    updateExtraService(id: string, data: Partial<{
        title: string;
        subtitle: string;
        price: string;
        features: string[];
        sortOrder: number;
        published: boolean;
    }>): Promise<{
        features: string[];
        id: string;
        title: string;
        subtitle: string;
        price: string;
        sortOrder: number;
        published: boolean;
    }>;
    deleteExtraService(id: string): import(".prisma/client").Prisma.Prisma__ExtraServiceClient<{
        id: string;
        sortOrder: number;
        published: boolean;
        title: string;
        price: string;
        subtitle: string;
        features: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    listTestimonials(includeUnpublished?: boolean): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        name: string;
        sortOrder: number;
        published: boolean;
        image: string;
        role: string;
        text: string;
    }[]>;
    createTestimonial(data: {
        name: string;
        role: string;
        text: string;
        image: string;
        sortOrder?: number;
        published?: boolean;
    }): import(".prisma/client").Prisma.Prisma__TestimonialClient<{
        id: string;
        name: string;
        sortOrder: number;
        published: boolean;
        image: string;
        role: string;
        text: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    updateTestimonial(id: string, data: Partial<{
        name: string;
        role: string;
        text: string;
        image: string;
        sortOrder: number;
        published: boolean;
    }>): import(".prisma/client").Prisma.Prisma__TestimonialClient<{
        id: string;
        name: string;
        sortOrder: number;
        published: boolean;
        image: string;
        role: string;
        text: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    deleteTestimonial(id: string): import(".prisma/client").Prisma.Prisma__TestimonialClient<{
        id: string;
        name: string;
        sortOrder: number;
        published: boolean;
        image: string;
        role: string;
        text: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    listBlogPosts(includeUnpublished?: boolean): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        sortOrder: number;
        published: boolean;
        title: string;
        image: string;
        excerpt: string;
        date: string;
    }[]>;
    createBlogPost(data: {
        title: string;
        excerpt: string;
        date: string;
        image: string;
        sortOrder?: number;
        published?: boolean;
    }): import(".prisma/client").Prisma.Prisma__BlogPostClient<{
        id: string;
        sortOrder: number;
        published: boolean;
        title: string;
        image: string;
        excerpt: string;
        date: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    updateBlogPost(id: string, data: Partial<{
        title: string;
        excerpt: string;
        date: string;
        image: string;
        sortOrder: number;
        published: boolean;
    }>): import(".prisma/client").Prisma.Prisma__BlogPostClient<{
        id: string;
        sortOrder: number;
        published: boolean;
        title: string;
        image: string;
        excerpt: string;
        date: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    deleteBlogPost(id: string): import(".prisma/client").Prisma.Prisma__BlogPostClient<{
        id: string;
        sortOrder: number;
        published: boolean;
        title: string;
        image: string;
        excerpt: string;
        date: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    listFooterServices(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        label: string;
        sortOrder: number;
    }[]>;
    createFooterService(data: {
        label: string;
        sortOrder?: number;
    }): import(".prisma/client").Prisma.Prisma__FooterServiceClient<{
        id: string;
        label: string;
        sortOrder: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    updateFooterService(id: string, data: Partial<{
        label: string;
        sortOrder: number;
    }>): import(".prisma/client").Prisma.Prisma__FooterServiceClient<{
        id: string;
        label: string;
        sortOrder: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    deleteFooterService(id: string): import(".prisma/client").Prisma.Prisma__FooterServiceClient<{
        id: string;
        label: string;
        sortOrder: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
