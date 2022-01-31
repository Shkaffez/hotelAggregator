import { ID } from "../id.type";
import { Reservation } from "./schemas/reservation.schema";

export interface ReservationDto {
    user: ID;
    hotel: ID;
    room: ID;
    dateStart: Date;
    dateEnd: Date;
  }
  
export interface ReservationSearchOptions {
    user: ID;
    dateStart: Date;
    dateEnd: Date;
  }
export interface IReservation {
    addReservation(data: ReservationDto): Promise<Reservation>;
    removeReservation(id: ID): Promise<void>;
    getReservations(
      filter: ReservationSearchOptions
    ): Promise<Array<Reservation>>;
  }