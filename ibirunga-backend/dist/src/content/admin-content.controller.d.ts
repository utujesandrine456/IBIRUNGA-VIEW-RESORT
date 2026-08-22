import { BookingsService } from '../bookings/bookings.service';
import { ContentService } from './content.service';
export declare class AdminContentController {
    private content;
    private bookings;
    constructor(content: ContentService, bookings: BookingsService);
    dashboard(): Promise<{
        counts: {
            amenities: number;
            rooms: number;
            testimonials: number;
            blogPosts: number;
            extraServices: number;
            bookings: number;
            pendingBookings: number;
        };
        recentActivities: {
            id: string;
            type: string;
            title: string;
            description: string;
            status: string;
            date: Date;
        }[];
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
    updateSite(body: Parameters<ContentService['updateSite']>[0]): import(".prisma/client").Prisma.Prisma__SiteSettingClient<{
        id: string;
        email: string;
        name: string;
        tagline: string;
        phone: string;
        phoneAlt: string;
        address: string;
        logoUrl: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    getSection(id: string): Promise<{
        id: string;
    }>;
    updateSection(id: string, body: Record<string, unknown>): Promise<{
        id: string;
        data: string;
    }>;
    listNavLinks(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        label: string;
        href: string;
        sortOrder: number;
        published: boolean;
    }[]>;
    createNavLink(body: {
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
    updateNavLink(id: string, body: Record<string, unknown>): import(".prisma/client").Prisma.Prisma__NavLinkClient<{
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
    listAmenities(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        sortOrder: number;
        published: boolean;
        title: string;
        description: string;
        image: string;
    }[]>;
    createAmenity(body: {
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
    updateAmenity(id: string, body: Record<string, unknown>): import(".prisma/client").Prisma.Prisma__AmenityClient<{
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
    listRooms(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        sortOrder: number;
        published: boolean;
        title: string;
        description: string;
        image: string;
        category: string;
        price: string;
    }[]>;
    createRoom(body: Parameters<ContentService['createRoom']>[0]): import(".prisma/client").Prisma.Prisma__RoomClient<{
        id: string;
        sortOrder: number;
        published: boolean;
        title: string;
        description: string;
        image: string;
        category: string;
        price: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    updateRoom(id: string, body: Record<string, unknown>): import(".prisma/client").Prisma.Prisma__RoomClient<{
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
    listExtraServices(): Promise<{
        features: string[];
        id: string;
        title: string;
        subtitle: string;
        price: string;
        sortOrder: number;
        published: boolean;
    }[]>;
    createExtraService(body: {
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
    updateExtraService(id: string, body: Record<string, unknown>): Promise<{
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
    listTestimonials(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        name: string;
        sortOrder: number;
        published: boolean;
        image: string;
        role: string;
        text: string;
    }[]>;
    createTestimonial(body: Parameters<ContentService['createTestimonial']>[0]): import(".prisma/client").Prisma.Prisma__TestimonialClient<{
        id: string;
        name: string;
        sortOrder: number;
        published: boolean;
        image: string;
        role: string;
        text: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    updateTestimonial(id: string, body: Record<string, unknown>): import(".prisma/client").Prisma.Prisma__TestimonialClient<{
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
    listBlogPosts(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        sortOrder: number;
        published: boolean;
        title: string;
        image: string;
        excerpt: string;
        date: string;
    }[]>;
    createBlogPost(body: Parameters<ContentService['createBlogPost']>[0]): import(".prisma/client").Prisma.Prisma__BlogPostClient<{
        id: string;
        sortOrder: number;
        published: boolean;
        title: string;
        image: string;
        excerpt: string;
        date: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    updateBlogPost(id: string, body: Record<string, unknown>): import(".prisma/client").Prisma.Prisma__BlogPostClient<{
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
    createFooterService(body: {
        label: string;
        sortOrder?: number;
    }): import(".prisma/client").Prisma.Prisma__FooterServiceClient<{
        id: string;
        label: string;
        sortOrder: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    updateFooterService(id: string, body: Record<string, unknown>): import(".prisma/client").Prisma.Prisma__FooterServiceClient<{
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
