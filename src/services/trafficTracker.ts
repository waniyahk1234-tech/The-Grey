/**
 * THE GREY · REAL-TIME WEBSITE TRAFFIC & ANALYTICS SERVICE
 * 
 * Authentic traffic tracking based strictly on real visitor sessions.
 * Never displays fabricated or inflated numbers.
 */

export interface DayTrafficPoint {
  dayName: string;
  views: number;
  dateKey: string;
}

export interface RealTrafficStats {
  totalPageViews: number;
  uniqueVisitors: number;
  todayViews: number;
  totalReservations: number;
  dailyTrend: DayTrafficPoint[];
}

const STORAGE_KEY = 'the_grey_traffic_hits';
const SESSION_ID_KEY = 'the_grey_session_id';

interface StoredHit {
  id: string;
  sessionId: string;
  path: string;
  timestamp: string;
}

/**
 * Get or initialize an authentic session identifier for the current browser
 */
function getOrCreateSessionId(): string {
  if (typeof window === 'undefined') return 'server';
  let sid = sessionStorage.getItem(SESSION_ID_KEY);
  if (!sid) {
    sid = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    sessionStorage.setItem(SESSION_ID_KEY, sid);
  }
  return sid;
}

/**
 * Record a real page view event
 */
export function trackPageView(path: string): void {
  if (typeof window === 'undefined') return;

  try {
    let hits: StoredHit[] = [];
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      hits = JSON.parse(stored);
      if (!Array.isArray(hits)) hits = [];
    }

    const sessionId = getOrCreateSessionId();

    hits.unshift({
      id: `hit_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      sessionId,
      path,
      timestamp: new Date().toISOString(),
    });

    // Retain up to 300 real hits
    localStorage.setItem(STORAGE_KEY, JSON.stringify(hits.slice(0, 300)));
    window.dispatchEvent(new CustomEvent('the_grey_traffic_logged'));
  } catch (err) {
    console.warn('Traffic tracking note:', err);
  }
}

/**
 * Calculate genuine metrics strictly from logged hits
 */
export function getRealTrafficStats(): RealTrafficStats {
  let hits: StoredHit[] = [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      hits = JSON.parse(stored);
      if (!Array.isArray(hits)) hits = [];
    }
  } catch {}

  const totalPageViews = hits.length;

  // Real unique visitors: count distinct session IDs
  const uniqueSessions = new Set<string>();
  hits.forEach((h) => {
    if (h.sessionId) uniqueSessions.add(h.sessionId);
  });
  const uniqueVisitors = uniqueSessions.size;

  // Real today's page views
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const todayHits = hits.filter((h) => new Date(h.timestamp).getTime() >= startOfDay);
  const todayViews = todayHits.length;

  // Real reservation count from stored database
  let totalReservations = 0;
  try {
    const storedRes = JSON.parse(localStorage.getItem('the_grey_reservations') || '[]');
    if (Array.isArray(storedRes)) {
      totalReservations = storedRes.length;
    }
  } catch {}

  // 7-day authentic bar graph computation
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dailyTrend: DayTrafficPoint[] = [];

  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dayStart = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
    const dayEnd = dayStart + 24 * 60 * 60 * 1000;
    const dateKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

    const matchingHits = hits.filter((h) => {
      const hitTime = new Date(h.timestamp).getTime();
      return hitTime >= dayStart && hitTime < dayEnd;
    });

    dailyTrend.push({
      dayName: i === 0 ? 'Today' : dayNames[d.getDay()],
      views: matchingHits.length,
      dateKey,
    });
  }

  return {
    totalPageViews,
    uniqueVisitors,
    todayViews,
    totalReservations,
    dailyTrend,
  };
}
