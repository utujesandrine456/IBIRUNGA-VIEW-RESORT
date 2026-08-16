import { PrismaService } from '../prisma/prisma.service';
export declare class BookingsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: {
        checkIn: string;
        checkOut: string;
        adults: number;
        children?: number;
        roomType?: string;
        roomCount?: number;
        guestName: string;
        email: string;
        phone: string;
        specialRequests?: string;
        source?: string;
    }): import(".prisma/client").Prisma.Prisma__BookingClient<{
        id: string;
        checkIn: Date;
        checkOut: Date;
        adults: number;
        children: number;
        roomType: string | null;
        roomCount: number;
        guestName: string;
        email: string;
        phone: string;
        specialRequests: string | null;
        status: string;
        source: string;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(status?: string): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        checkIn: Date;
        checkOut: Date;
        adults: number;
        children: number;
        roomType: string | null;
        roomCount: number;
        guestName: string;
        email: string;
        phone: string;
        specialRequests: string | null;
        status: string;
        source: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        checkIn: Date;
        checkOut: Date;
        adults: number;
        children: number;
        roomType: string | null;
        roomCount: number;
        guestName: string;
        email: string;
        phone: string;
        specialRequests: string | null;
        status: string;
        source: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateStatus(id: string, status: string): import(".prisma/client").Prisma.Prisma__BookingClient<{
        id: string;
        checkIn: Date;
        checkOut: Date;
        adults: number;
        children: number;
        roomType: string | null;
        roomCount: number;
        guestName: string;
        email: string;
        phone: string;
        specialRequests: string | null;
        status: string;
        source: string;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    delete(id: string): import(".prisma/client").Prisma.Prisma__BookingClient<{
        id: string;
        checkIn: Date;
        checkOut: Date;
        adults: number;
        children: number;
        roomType: string | null;
        roomCount: number;
        guestName: string;
        email: string;
        phone: string;
        specialRequests: string | null;
        status: string;
        source: string;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findByEmail(email: string): never[] | import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        checkIn: Date;
        checkOut: Date;
        adults: number;
        children: number;
        roomType: string | null;
        guestName: string;
        status: string;
        createdAt: Date;
    }[]>;
    stats(): import(".prisma/client").Prisma.GetBookingGroupByPayload<{
        by: "status"[];
        _count: {
            status: true;
        };
    }>;
}
