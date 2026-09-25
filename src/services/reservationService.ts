/**
 * THE GREY · RESERVATION SERVICE & INBOX STORE
 * 
 * Provides storage and management for all incoming guest table bookings,
 * allowing the host desk and admin to confirm, seat, delete, or manage table status.
 */

export type ReservationStatus = 'pending' | 'confirmed' | 'seated' | 'cancelled';

export interface ReservationRequest {
  id?: string;
  fullName: string;
  phone: string;
  email: string;
  date: string;
  timeSlot: string;
  guests: number;
  seatingArea: 'indoor' | 'outdoor' | 'no-preference' | 'hearth' | 'window' | 'terrace';
  specialRequests?: string;
  status?: ReservationStatus;
  confirmationCode?: string;
  createdAt?: string;
}

export interface ReservationResponse {
  success: boolean;
  confirmationCode: string;
  data: ReservationRequest;
  timestamp: string;
  message: string;
}

const STORAGE_KEY = 'the_grey_reservations';

// Authentic table time slots during operating hours (11:00 AM – 11:30 PM)
export const AUTHENTIC_TIME_SLOTS = [
  '11:30 AM',
  '12:00 PM',
  '12:30 PM',
  '1:00 PM',
  '1:30 PM',
  '2:00 PM',
  '2:30 PM',
  '3:00 PM',
  '3:30 PM',
  '4:00 PM',
  '4:30 PM',
  '5:00 PM',
  '5:30 PM',
  '6:00 PM',
  '6:30 PM',
  '7:00 PM',
  '7:30 PM',
  '8:00 PM',
  '8:30 PM',
  '9:00 PM',
  '9:30 PM',
  '10:00 PM',
  '10:30 PM',
  '11:00 PM',
  '11:30 PM',
];

/**
 * Get all stored reservations
 */
export function getAllReservations(): ReservationRequest[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return [];
    }
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Error reading reservations:', err);
    return [];
  }
}

/**
 * Save reservations to local storage
 */
export function saveReservations(reservations: ReservationRequest[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reservations));
    window.dispatchEvent(
      new CustomEvent('the_grey_reservations_updated', { detail: reservations })
    );
  } catch (err) {
    console.error('Error saving reservations:', err);
  }
}

/**
 * Update reservation status
 */
export function updateReservationStatus(
  idOrCode: string,
  newStatus: ReservationStatus
): boolean {
  const current = getAllReservations();
  const index = current.findIndex(
    (r) => r.id === idOrCode || r.confirmationCode === idOrCode
  );

  if (index === -1) return false;

  current[index] = {
    ...current[index],
    status: newStatus,
  };

  saveReservations(current);
  return true;
}

/**
 * Delete a reservation record by ID or Confirmation Code
 */
export function deleteReservation(idOrCode: string): boolean {
  const current = getAllReservations();
  const filtered = current.filter(
    (r) => r.id !== idOrCode && r.confirmationCode !== idOrCode
  );

  if (filtered.length === current.length) return false;

  saveReservations(filtered);
  return true;
}

/**
 * Add a manual reservation directly from host desk
 */
export function addManualReservation(req: ReservationRequest): ReservationRequest {
  const current = getAllReservations();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const confirmationCode = req.confirmationCode || `GREY-${req.date.replace(/-/g, '').slice(2)}-${randomSuffix}`;
  
  const newBooking: ReservationRequest = {
    ...req,
    id: `res-${Date.now()}`,
    confirmationCode,
    status: req.status || 'confirmed',
    createdAt: new Date().toISOString(),
  };

  const updated = [newBooking, ...current];
  saveReservations(updated);
  return newBooking;
}

/**
 * Submit reservation handler abstraction (called by customer frontend)
 */
export async function submitReservation(
  request: ReservationRequest
): Promise<ReservationResponse> {
  await new Promise((resolve) => setTimeout(resolve, 350));

  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const confirmationCode = `GREY-${request.date.replace(/-/g, '').slice(2)}-${randomSuffix}`;

  const newBooking: ReservationRequest = {
    ...request,
    id: `res-${Date.now()}`,
    confirmationCode,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  try {
    const current = getAllReservations();
    const updated = [newBooking, ...current];
    saveReservations(updated);
  } catch (err) {
    console.warn('Could not save booking:', err);
  }

  return {
    success: true,
    confirmationCode,
    data: newBooking,
    timestamp: new Date().toISOString(),
    message: 'Reservation inquiry received. Our host team will hold your table for 15 minutes.',
  };
}
