import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './create-booking.dto';
export declare class PublicBookingsController {
    private bookings;
    constructor(bookings: BookingsService);
    create(body: CreateBookingDto): import(".prisma/client").Prisma.Prisma__BookingClient<{
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
}
export declare class AdminBookingsController {
    private bookings;
    constructor(bookings: BookingsService);
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
    stats(): import(".prisma/client").Prisma.GetBookingGroupByPayload<{
        by: "status"[];
        _count: {
            status: true;
        };
    }>;
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
    remove(id: string): import(".prisma/client").Prisma.Prisma__BookingClient<{
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
}
