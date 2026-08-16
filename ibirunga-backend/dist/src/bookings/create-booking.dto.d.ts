export declare class CreateBookingDto {
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
}
