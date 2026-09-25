import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart3,
  UtensilsCrossed,
  CalendarCheck,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  RefreshCw,
  Search,
  Eye,
  Users,
  Calendar,
  Sparkles,
  Phone,
  Mail,
  ShieldCheck,
  ArrowUpRight,
  LogOut,
  AlertTriangle,
  Upload,
  Image as ImageIcon,
  Activity,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { LoginModal } from '../components/LoginModal';
import {
  getRealTrafficStats,
  RealTrafficStats,
} from '../services/trafficTracker';
import {
  getLiveMenuItems,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
  resetMenuToDefault,
} from '../services/menuStore';
import {
  getLiveGalleryItems,
  addGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  resetGalleryToDefault,
} from '../services/galleryStore';
import {
  getAllReservations,
  updateReservationStatus,
  deleteReservation,
  addManualReservation,
  ReservationRequest,
  ReservationStatus,
  AUTHENTIC_TIME_SLOTS,
} from '../services/reservationService';
import { MenuItem, menuCategories } from '../data/menu';
import { GalleryItem } from '../data/gallery';

export const Admin: React.FC = () => {
  const { isAuthenticated, logout, staffUser } = useAuth();

  // Navigation Tabs: 'analytics' | 'content' | 'reservations'
  const [activeTab, setActiveTab] = useState<'analytics' | 'content' | 'reservations'>('analytics');

  // Sub-tab for 'content': 'menu' | 'gallery'
  const [contentSubTab, setContentSubTab] = useState<'menu' | 'gallery'>('menu');

  // 100% Authentic Real Traffic Stats with Daily Trend Bar Graph
  const [traffic, setTraffic] = useState<RealTrafficStats>(() => getRealTrafficStats());

  // Menu items state
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => getLiveMenuItems());
  const [menuSearch, setMenuSearch] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
  const [isEditingDish, setIsEditingDish] = useState(false);
  const [currentDish, setCurrentDish] = useState<Partial<MenuItem>>({
    name: '',
    category: 'mains',
    categoryLabel: 'Mains & Grills',
    description: '',
    price: 'Rs 2,200',
    dietary: [],
    isSignature: false,
  });

  // Gallery photos state
  const [galleryList, setGalleryList] = useState<GalleryItem[]>(() => getLiveGalleryItems());
  const [gallerySearch, setGallerySearch] = useState('');
  const [isEditingPhoto, setIsEditingPhoto] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState<Partial<GalleryItem>>({
    title: '',
    category: 'interior',
    categoryLabel: 'Interior',
    src: '',
    alt: '',
    caption: '',
    aspect: 'landscape',
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reservations state
  const [reservations, setReservations] = useState<ReservationRequest[]>(() => getAllReservations());
  const [reservationSearch, setReservationSearch] = useState('');
  const [reservationFilter, setReservationFilter] = useState<string>('all');
  const [isAddingBooking, setIsAddingBooking] = useState(false);
  const [manualBooking, setManualBooking] = useState<ReservationRequest>({
    fullName: '',
    phone: '',
    email: '',
    date: new Date().toISOString().split('T')[0],
    timeSlot: '7:30 PM',
    guests: 2,
    seatingArea: 'indoor',
    specialRequests: '',
    status: 'confirmed',
  });

  // Inline delete confirmation modal state
  const [itemToDelete, setItemToDelete] = useState<{
    type: 'menu' | 'gallery' | 'reservation';
    id: string;
    title: string;
  } | null>(null);

  // Notification Toast
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // Sync real-time updates across open tabs and storage events
  useEffect(() => {
    const handleTraffic = () => setTraffic(getRealTrafficStats());
    const handleMenu = (e: CustomEvent<MenuItem[]>) => {
      if (e.detail) setMenuItems(e.detail);
    };
    const handleGallery = (e: CustomEvent<GalleryItem[]>) => {
      if (e.detail) setGalleryList(e.detail);
    };
    const handleRes = (e: CustomEvent<ReservationRequest[]>) => {
      if (e.detail) {
        setReservations(e.detail);
        setTraffic(getRealTrafficStats());
      }
    };

    window.addEventListener('the_grey_traffic_logged', handleTraffic);
    window.addEventListener('the_grey_menu_updated', handleMenu as EventListener);
    window.addEventListener('the_grey_gallery_updated', handleGallery as EventListener);
    window.addEventListener('the_grey_reservations_updated', handleRes as EventListener);

    return () => {
      window.removeEventListener('the_grey_traffic_logged', handleTraffic);
      window.removeEventListener('the_grey_menu_updated', handleMenu as EventListener);
      window.removeEventListener('the_grey_gallery_updated', handleGallery as EventListener);
      window.removeEventListener('the_grey_reservations_updated', handleRes as EventListener);
    };
  }, []);

  // Universal deletion executor
  const handleConfirmDelete = () => {
    if (!itemToDelete) return;

    if (itemToDelete.type === 'menu') {
      deleteMenuItem(itemToDelete.id);
      setMenuItems(getLiveMenuItems());
      showNotification(`Dish "${itemToDelete.title}" deleted.`);
    } else if (itemToDelete.type === 'gallery') {
      deleteGalleryItem(itemToDelete.id);
      setGalleryList(getLiveGalleryItems());
      showNotification(`Photo "${itemToDelete.title}" deleted from gallery.`);
    } else if (itemToDelete.type === 'reservation') {
      deleteReservation(itemToDelete.id);
      const updated = getAllReservations();
      setReservations(updated);
      setTraffic(getRealTrafficStats());
      showNotification(`Reservation "${itemToDelete.title}" deleted.`);
    }

    setItemToDelete(null);
  };

  // Menu Handlers
  const handleOpenAddDish = () => {
    setCurrentDish({
      name: '',
      category: 'mains',
      categoryLabel: 'Mains & Grills',
      description: '',
      price: 'Rs 2,200',
      dietary: [],
      isSignature: false,
    });
    setIsEditingDish(true);
  };

  const handleEditDish = (dish: MenuItem) => {
    setCurrentDish({ ...dish });
    setIsEditingDish(true);
  };

  const handleSaveDish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentDish.name || !currentDish.price) {
      alert('Please fill in dish name and price.');
      return;
    }

    if (currentDish.id) {
      updateMenuItem(currentDish as MenuItem);
      showNotification(`Dish "${currentDish.name}" updated.`);
    } else {
      addMenuItem(currentDish as Omit<MenuItem, 'id'>);
      showNotification(`Dish "${currentDish.name}" added.`);
    }

    setIsEditingDish(false);
    setMenuItems(getLiveMenuItems());
  };

  const handleResetMenu = () => {
    if (confirm('Reset menu to default items?')) {
      resetMenuToDefault();
      setMenuItems(getLiveMenuItems());
      showNotification('Menu reset to default.');
    }
  };

  // Gallery Handlers
  const handleOpenAddPhoto = () => {
    setCurrentPhoto({
      title: '',
      category: 'interior',
      categoryLabel: 'Interior',
      src: '',
      alt: '',
      caption: '',
      aspect: 'landscape',
    });
    setIsEditingPhoto(true);
  };

  const handleEditPhoto = (photo: GalleryItem) => {
    setCurrentPhoto({ ...photo });
    setIsEditingPhoto(true);
  };

  // Direct file upload handler: converts chosen file to browser Data URL
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (JPEG, PNG, WebP, etc.).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        setCurrentPhoto((prev) => ({
          ...prev,
          src: dataUrl,
          title: prev.title || file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSavePhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPhoto.title || !currentPhoto.src) {
      alert('Please provide a title and upload an image file.');
      return;
    }

    if (currentPhoto.id) {
      updateGalleryItem(currentPhoto as GalleryItem);
      showNotification(`Photo "${currentPhoto.title}" updated.`);
    } else {
      addGalleryItem({
        title: currentPhoto.title,
        category: currentPhoto.category || 'interior',
        categoryLabel:
          currentPhoto.category === 'exterior'
            ? 'Architecture & Hills'
            : currentPhoto.category === 'culinary'
            ? 'Culinary'
            : currentPhoto.category === 'atmosphere'
            ? 'Atmosphere'
            : 'Interior',
        src: currentPhoto.src,
        alt: currentPhoto.alt || currentPhoto.title,
        caption: currentPhoto.caption || '',
        aspect: currentPhoto.aspect || 'landscape',
      });
      showNotification(`New photo uploaded to gallery.`);
    }

    setIsEditingPhoto(false);
    setGalleryList(getLiveGalleryItems());
  };

  const handleResetGallery = () => {
    if (confirm('Reset gallery back to default photographs?')) {
      resetGalleryToDefault();
      setGalleryList(getLiveGalleryItems());
      showNotification('Gallery reset to default.');
    }
  };

  // Reservation Handlers
  const handleStatusChange = (codeOrId: string, status: ReservationStatus) => {
    updateReservationStatus(codeOrId, status);
    setReservations(getAllReservations());
    showNotification(`Reservation marked as ${status}.`);
  };

  const handleManualBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualBooking.fullName.trim() || !manualBooking.phone.trim()) {
      alert('Please enter guest name and contact phone number.');
      return;
    }

    addManualReservation(manualBooking);
    setIsAddingBooking(false);
    setReservations(getAllReservations());
    setTraffic(getRealTrafficStats());
    showNotification('Reservation recorded in host desk.');

    setManualBooking({
      fullName: '',
      phone: '',
      email: '',
      date: new Date().toISOString().split('T')[0],
      timeSlot: '7:30 PM',
      guests: 2,
      seatingArea: 'indoor',
      specialRequests: '',
      status: 'confirmed',
    });
  };

  // Filtered lists
  const filteredMenuItems = menuItems.filter((item) => {
    const matchesCategory =
      selectedCategoryFilter === 'all' || item.category === selectedCategoryFilter;
    const matchesSearch =
      item.name.toLowerCase().includes(menuSearch.toLowerCase()) ||
      item.description.toLowerCase().includes(menuSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filteredGalleryItems = galleryList.filter((item) => {
    return (
      item.title.toLowerCase().includes(gallerySearch.toLowerCase()) ||
      item.caption.toLowerCase().includes(gallerySearch.toLowerCase()) ||
      item.categoryLabel.toLowerCase().includes(gallerySearch.toLowerCase())
    );
  });

  const filteredReservations = reservations.filter((res) => {
    const matchesStatus =
      reservationFilter === 'all' || res.status === reservationFilter;
    const matchesSearch =
      res.fullName.toLowerCase().includes(reservationSearch.toLowerCase()) ||
      res.phone.includes(reservationSearch) ||
      (res.confirmationCode && res.confirmationCode.toLowerCase().includes(reservationSearch.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  // Calculate highest daily traffic count for relative bar scaling
  const maxDayViews = Math.max(...traffic.dailyTrend.map((d) => d.views), 1);

  if (!isAuthenticated) {
    return <LoginModal isOpen={true} />;
  }

  const handleLogout = () => {
    logout();
    showNotification('Signed out.');
  };

  return (
    <div className="bg-[#0C0D0F] text-[#F5F3EF] pt-28 pb-24 min-h-screen">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-24 right-6 z-50 bg-[#C5A880] text-[#0C0D0F] px-5 py-3 text-xs uppercase tracking-widest font-semibold shadow-2xl animate-fade-in flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{notification}</span>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {itemToDelete && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#0C0D0F]/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
        >
          <div className="bg-[#14161A] border border-rose-500/30 max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-rose-400">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <h3 className="font-serif text-lg text-[#F5F3EF]">
                Confirm Permanent Deletion
              </h3>
            </div>
            <p className="text-xs text-[#8E8D8A] leading-relaxed">
              Are you sure you want to permanently delete{' '}
              <strong className="text-[#F5F3EF]">&ldquo;{itemToDelete.title}&rdquo;</strong>? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/5">
              <button
                type="button"
                onClick={() => setItemToDelete(null)}
                className="px-4 py-2 border border-white/10 text-xs uppercase tracking-wider text-[#8E8D8A] hover:text-[#F5F3EF] transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs uppercase tracking-wider font-semibold transition-colors"
              >
                Delete Now
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-8 border-b border-white/10 gap-6">
          <div>
            <div className="flex items-center gap-3 text-xs tracking-[0.25em] uppercase text-[#C5A880] mb-2 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>Admin Management Dashboard</span>
              <span aria-hidden="true">·</span>
              <span>{staffUser || 'The Grey'}</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#F5F3EF] tracking-tight">
              Control Center
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              target="_blank"
              className="px-4 py-2 bg-[#14161A] hover:bg-[#1E2127] border border-white/10 text-xs uppercase tracking-wider text-[#F5F3EF] inline-flex items-center gap-1.5 transition-colors"
            >
              <span>View Website</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#C5A880]" />
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="px-4 py-2 bg-[#14161A] hover:bg-rose-950/40 border border-white/10 hover:border-rose-800/40 text-xs uppercase tracking-wider text-[#8E8D8A] hover:text-rose-300 inline-flex items-center gap-1.5 transition-colors"
              title="Sign out of staff portal"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Primary Tab Navigation */}
        <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-8">
          <button
            type="button"
            onClick={() => setActiveTab('analytics')}
            className={`px-5 py-2.5 text-xs uppercase tracking-[0.18em] transition-all inline-flex items-center gap-2 font-medium ${
              activeTab === 'analytics'
                ? 'bg-[#C5A880] text-[#0C0D0F]'
                : 'text-[#8E8D8A] hover:text-[#F5F3EF] bg-[#14161A]'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Analytics</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('content')}
            className={`px-5 py-2.5 text-xs uppercase tracking-[0.18em] transition-all inline-flex items-center gap-2 font-medium ${
              activeTab === 'content'
                ? 'bg-[#C5A880] text-[#0C0D0F]'
                : 'text-[#8E8D8A] hover:text-[#F5F3EF] bg-[#14161A]'
            }`}
          >
            <UtensilsCrossed className="w-4 h-4" />
            <span>Manage Content</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('reservations')}
            className={`px-5 py-2.5 text-xs uppercase tracking-[0.18em] transition-all inline-flex items-center gap-2 font-medium ${
              activeTab === 'reservations'
                ? 'bg-[#C5A880] text-[#0C0D0F]'
                : 'text-[#8E8D8A] hover:text-[#F5F3EF] bg-[#14161A]'
            }`}
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Reservations ({reservations.length})</span>
          </button>
        </div>

        {/* ==================================================
            TAB 1: AUTHENTIC REAL ANALYTICS & BAR GRAPH
            ================================================== */}
        {activeTab === 'analytics' && (
          <div className="space-y-8 animate-fade-in">
            {/* Top Stat Cards - 100% genuine real counts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 bg-[#14161A] border border-white/5">
                <div className="flex items-center justify-between text-[#8E8D8A] mb-3">
                  <span className="text-xs uppercase tracking-wider">Total Page Views</span>
                  <Eye className="w-4 h-4 text-[#C5A880]" />
                </div>
                <div className="font-serif text-3xl sm:text-4xl text-[#F5F3EF] tabular-nums mb-1">
                  {traffic.totalPageViews}
                </div>
                <div className="text-[11px] text-[#8E8D8A]">
                  Real recorded page loads
                </div>
              </div>

              <div className="p-6 bg-[#14161A] border border-white/5">
                <div className="flex items-center justify-between text-[#8E8D8A] mb-3">
                  <span className="text-xs uppercase tracking-wider">Unique Visitors</span>
                  <Users className="w-4 h-4 text-[#C5A880]" />
                </div>
                <div className="font-serif text-3xl sm:text-4xl text-[#F5F3EF] tabular-nums mb-1">
                  {traffic.uniqueVisitors}
                </div>
                <div className="text-[11px] text-[#8E8D8A]">
                  Distinct visitor browser sessions
                </div>
              </div>

              <div className="p-6 bg-[#14161A] border border-white/5">
                <div className="flex items-center justify-between text-[#8E8D8A] mb-3">
                  <span className="text-xs uppercase tracking-wider">Today's Page Views</span>
                  <Calendar className="w-4 h-4 text-[#C5A880]" />
                </div>
                <div className="font-serif text-3xl sm:text-4xl text-[#F5F3EF] tabular-nums mb-1">
                  {traffic.todayViews}
                </div>
                <div className="text-[11px] text-[#8E8D8A]">
                  Logged since 00:00 midnight
                </div>
              </div>

              <div className="p-6 bg-[#14161A] border border-white/5">
                <div className="flex items-center justify-between text-[#8E8D8A] mb-3">
                  <span className="text-xs uppercase tracking-wider">Active Reservations</span>
                  <Sparkles className="w-4 h-4 text-[#C5A880]" />
                </div>
                <div className="font-serif text-3xl sm:text-4xl text-[#C5A880] tabular-nums mb-1">
                  {traffic.totalReservations}
                </div>
                <div className="text-[11px] text-[#8E8D8A]">
                  Current table bookings in desk
                </div>
              </div>
            </div>

            {/* Eye-Pleasing Real-Time Bar Graph Card */}
            <div className="p-8 bg-[#14161A] border border-white/5 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/5 gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-[#C5A880]" />
                    <h3 className="font-serif text-xl text-[#F5F3EF]">
                      7-Day Visitor Traffic
                    </h3>
                  </div>
                  <p className="text-xs text-[#8E8D8A] font-light mt-0.5">
                    Real recorded sessions over the past seven days.
                  </p>
                </div>
                <div className="text-xs text-[#C5A880] uppercase tracking-wider font-mono">
                  {traffic.todayViews} visits today
                </div>
              </div>

              {/* Bar Chart Visual */}
              <div className="pt-6">
                <div className="grid grid-cols-7 gap-3 sm:gap-6 items-end h-48 sm:h-56 pb-2">
                  {traffic.dailyTrend.map((point, index) => {
                    const heightPercent =
                      point.views > 0
                        ? Math.max(12, Math.round((point.views / maxDayViews) * 100))
                        : 4;
                    const isToday = point.dayName === 'Today';

                    return (
                      <div
                        key={index}
                        className="flex flex-col items-center justify-end h-full gap-2 group"
                      >
                        {/* Tooltip on hover / value counter */}
                        <span className="text-[11px] font-mono text-[#C5A880] opacity-75 group-hover:opacity-100 transition-opacity tabular-nums">
                          {point.views}
                        </span>

                        {/* Bar Pillar */}
                        <div className="w-full bg-[#1F2126] rounded-t-sm overflow-hidden flex flex-col justify-end h-full max-w-[48px]">
                          <div
                            style={{ height: `${heightPercent}%` }}
                            className={`w-full rounded-t-sm transition-all duration-500 ${
                              isToday
                                ? 'bg-gradient-to-t from-[#A68860] to-[#E3CBB0]'
                                : point.views > 0
                                ? 'bg-[#C5A880] hover:bg-[#D8BD97]'
                                : 'bg-[#2A2D35]'
                            }`}
                          />
                        </div>

                        {/* Day Label */}
                        <span
                          className={`text-xs uppercase font-mono tracking-wider ${
                            isToday ? 'text-[#C5A880] font-semibold' : 'text-[#8E8D8A]'
                          }`}
                        >
                          {point.dayName}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Clear, professional status overview */}
            <div className="p-8 bg-[#14161A] border border-white/5">
              <h3 className="font-serif text-xl text-[#F5F3EF] mb-2">
                Real-Time Traffic System
              </h3>
              <p className="text-xs text-[#8E8D8A] font-light max-w-2xl leading-relaxed mb-6">
                All numbers shown in this portal reflect genuine browser activity and real table bookings. Every time a user opens a page on the website or submits a reservation, the figures and bar graph update immediately.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-white/5 text-xs text-[#8E8D8A]">
                <div>
                  <span className="block text-[#C5A880] uppercase tracking-wider text-[11px] mb-1">Telemetry</span>
                  <span className="text-[#F5F3EF]">Direct Session Logger (Active)</span>
                </div>
                <div>
                  <span className="block text-[#C5A880] uppercase tracking-wider text-[11px] mb-1">Data Integrity</span>
                  <span className="text-[#F5F3EF]">Strictly authentic, 0% simulated</span>
                </div>
                <div>
                  <span className="block text-[#C5A880] uppercase tracking-wider text-[11px] mb-1">Host Inquiries</span>
                  <span className="text-[#F5F3EF]">{reservations.length} records in database</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================
            TAB 2: MANAGE CONTENT (MENU & GALLERY)
            ================================================== */}
        {activeTab === 'content' && (
          <div className="space-y-8 animate-fade-in">
            {/* Sub-tab navigation */}
            <div className="flex items-center gap-2 border-b border-white/5 pb-4">
              <button
                type="button"
                onClick={() => setContentSubTab('menu')}
                className={`px-4 py-2 text-xs uppercase tracking-wider font-medium transition-colors ${
                  contentSubTab === 'menu'
                    ? 'bg-[#1E2127] text-[#C5A880] border border-[#C5A880]/30'
                    : 'text-[#8E8D8A] hover:text-[#F5F3EF]'
                }`}
              >
                Menu Items ({menuItems.length})
              </button>
              <button
                type="button"
                onClick={() => setContentSubTab('gallery')}
                className={`px-4 py-2 text-xs uppercase tracking-wider font-medium transition-colors ${
                  contentSubTab === 'gallery'
                    ? 'bg-[#1E2127] text-[#C5A880] border border-[#C5A880]/30'
                    : 'text-[#8E8D8A] hover:text-[#F5F3EF]'
                }`}
              >
                Gallery Photos ({galleryList.length})
              </button>
            </div>

            {/* ----------------- SUB-TAB: MENU ----------------- */}
            {contentSubTab === 'menu' && (
              <div className="space-y-6">
                {/* Search & Actions Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-[#14161A] border border-white/5">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="relative">
                      <Search className="w-4 h-4 text-[#8E8D8A] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={menuSearch}
                        onChange={(e) => setMenuSearch(e.target.value)}
                        placeholder="Search dish name or description..."
                        className="bg-[#0C0D0F] border border-white/10 pl-9 pr-4 py-2 text-xs text-[#F5F3EF] placeholder-[#555] focus-visible:outline-none focus-visible:border-[#C5A880] w-64"
                      />
                    </div>

                    <select
                      value={selectedCategoryFilter}
                      onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                      className="bg-[#0C0D0F] border border-white/10 px-3 py-2 text-xs text-[#F5F3EF] focus-visible:outline-none focus-visible:border-[#C5A880]"
                    >
                      <option value="all">All Categories</option>
                      {menuCategories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={handleResetMenu}
                      className="px-3.5 py-2 border border-white/10 hover:border-white/20 text-[#8E8D8A] hover:text-[#F5F3EF] text-xs uppercase tracking-wider inline-flex items-center gap-1.5 transition-colors"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Reset Menu</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleOpenAddDish}
                      className="px-4 py-2 bg-[#C5A880] text-[#0C0D0F] hover:bg-[#D8BD97] text-xs uppercase tracking-wider font-semibold inline-flex items-center gap-1.5 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Menu Item</span>
                    </button>
                  </div>
                </div>

                {/* Menu Table */}
                <div className="bg-[#14161A] border border-white/5 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="text-[#8E8D8A] uppercase tracking-wider border-b border-white/5 text-[11px] bg-[#0C0D0F]/50">
                        <tr>
                          <th className="py-3.5 px-6 font-medium">Dish Name</th>
                          <th className="py-3.5 px-6 font-medium">Category</th>
                          <th className="py-3.5 px-6 font-medium">Description</th>
                          <th className="py-3.5 px-6 font-medium">Price</th>
                          <th className="py-3.5 px-6 font-medium text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 text-[#D4D0C7]">
                        {filteredMenuItems.map((item) => (
                          <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                            <td className="py-4 px-6 font-medium text-[#F5F3EF] whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                <span>{item.name}</span>
                                {item.isSignature && (
                                  <span className="px-1.5 py-0.5 text-[9px] uppercase tracking-wider bg-[#C5A880]/20 text-[#C5A880] border border-[#C5A880]/30 font-semibold">
                                    Signature
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="py-4 px-6 whitespace-nowrap text-[#8E8D8A]">
                              {item.categoryLabel}
                            </td>
                            <td className="py-4 px-6 max-w-md">
                              <p className="line-clamp-2 text-[#8E8D8A] font-light leading-relaxed">
                                {item.description}
                              </p>
                            </td>
                            <td className="py-4 px-6 whitespace-nowrap font-mono text-[#C5A880]">
                              {item.price}
                            </td>
                            <td className="py-4 px-6 whitespace-nowrap text-right">
                              <div className="inline-flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => handleEditDish(item)}
                                  className="p-1.5 text-[#8E8D8A] hover:text-[#C5A880] transition-colors"
                                  title="Edit Dish"
                                >
                                  <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setItemToDelete({ type: 'menu', id: item.id, title: item.name })}
                                  className="p-1.5 text-[#8E8D8A] hover:text-rose-400 transition-colors"
                                  title="Delete Dish"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ----------------- SUB-TAB: GALLERY ----------------- */}
            {contentSubTab === 'gallery' && (
              <div className="space-y-6">
                {/* Search & Actions Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-[#14161A] border border-white/5">
                  <div className="relative">
                    <Search className="w-4 h-4 text-[#8E8D8A] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={gallerySearch}
                      onChange={(e) => setGallerySearch(e.target.value)}
                      placeholder="Search photo title or category..."
                      className="bg-[#0C0D0F] border border-white/10 pl-9 pr-4 py-2 text-xs text-[#F5F3EF] placeholder-[#555] focus-visible:outline-none focus-visible:border-[#C5A880] w-64"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={handleResetGallery}
                      className="px-3.5 py-2 border border-white/10 hover:border-white/20 text-[#8E8D8A] hover:text-[#F5F3EF] text-xs uppercase tracking-wider inline-flex items-center gap-1.5 transition-colors"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Reset Gallery</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleOpenAddPhoto}
                      className="px-4 py-2 bg-[#C5A880] text-[#0C0D0F] hover:bg-[#D8BD97] text-xs uppercase tracking-wider font-semibold inline-flex items-center gap-1.5 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Upload Gallery Photo</span>
                    </button>
                  </div>
                </div>

                {/* Consistent 4:3 Uniform Gallery Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredGalleryItems.map((photo) => (
                    <div
                      key={photo.id}
                      className="bg-[#14161A] border border-white/5 overflow-hidden flex flex-col justify-between group"
                    >
                      <div className="aspect-[4/3] bg-[#0C0D0F] relative overflow-hidden">
                        <img
                          src={photo.src}
                          alt={photo.alt}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-2 left-2 px-2 py-0.5 bg-[#0C0D0F]/80 text-[10px] uppercase tracking-wider text-[#C5A880]">
                          {photo.categoryLabel}
                        </span>
                      </div>

                      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                        <div>
                          <h4 className="font-serif text-base text-[#F5F3EF] mb-1 truncate">
                            {photo.title}
                          </h4>
                          <p className="text-xs text-[#8E8D8A] line-clamp-2 font-light">
                            {photo.caption || photo.alt}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-[#8E8D8A]">
                          <span className="text-[11px] font-mono text-[#555]">
                            {photo.categoryLabel}
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleEditPhoto(photo)}
                              className="p-1 hover:text-[#C5A880] transition-colors"
                              title="Edit Photo"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => setItemToDelete({ type: 'gallery', id: photo.id, title: photo.title })}
                              className="p-1 hover:text-rose-400 transition-colors"
                              title="Delete Photo"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Modal: Edit/Add Dish */}
            {isEditingDish && (
              <div
                role="dialog"
                aria-modal="true"
                className="fixed inset-0 z-50 bg-[#0C0D0F]/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
              >
                <div className="bg-[#14161A] border border-white/10 max-w-xl w-full p-8 shadow-2xl space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <h3 className="font-serif text-2xl text-[#F5F3EF]">
                      {currentDish.id ? 'Edit Dish' : 'Add New Menu Item'}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setIsEditingDish(false)}
                      className="p-1 text-[#8E8D8A] hover:text-[#F5F3EF]"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveDish} className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[#8E8D8A] uppercase tracking-wider mb-1.5">
                          Dish Name
                        </label>
                        <input
                          type="text"
                          required
                          value={currentDish.name || ''}
                          onChange={(e) => setCurrentDish({ ...currentDish, name: e.target.value })}
                          placeholder="e.g. Mountain Trout"
                          className="w-full bg-[#0C0D0F] border border-white/10 px-4 py-3 text-sm text-[#F5F3EF] focus-visible:outline-none focus-visible:border-[#C5A880]"
                        />
                      </div>
                      <div>
                        <label className="block text-[#8E8D8A] uppercase tracking-wider mb-1.5">
                          Category
                        </label>
                        <select
                          value={currentDish.category || 'mains'}
                          onChange={(e) => {
                            const cat = menuCategories.find((c) => c.id === e.target.value);
                            setCurrentDish({
                              ...currentDish,
                              category: e.target.value as any,
                              categoryLabel: cat ? cat.label : 'Mains & Grills',
                            });
                          }}
                          className="w-full bg-[#0C0D0F] border border-white/10 px-4 py-3 text-sm text-[#F5F3EF] focus-visible:outline-none focus-visible:border-[#C5A880]"
                        >
                          {menuCategories.filter((c) => c.id !== 'all').map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[#8E8D8A] uppercase tracking-wider mb-1.5">
                        Description
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={currentDish.description || ''}
                        onChange={(e) => setCurrentDish({ ...currentDish, description: e.target.value })}
                        placeholder="Ingredients and culinary notes..."
                        className="w-full bg-[#0C0D0F] border border-white/10 px-4 py-2.5 text-sm text-[#F5F3EF] focus-visible:outline-none focus-visible:border-[#C5A880]"
                      />
                    </div>

                    <div>
                      <label className="block text-[#8E8D8A] uppercase tracking-wider mb-1.5">
                        Price (e.g. Rs 2,200)
                      </label>
                      <input
                        type="text"
                        required
                        value={currentDish.price || ''}
                        onChange={(e) => setCurrentDish({ ...currentDish, price: e.target.value })}
                        placeholder="Rs 2,200"
                        className="w-full bg-[#0C0D0F] border border-white/10 px-4 py-3 text-sm text-[#F5F3EF] focus-visible:outline-none focus-visible:border-[#C5A880]"
                      />
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <input
                        type="checkbox"
                        id="isSig"
                        checked={currentDish.isSignature || false}
                        onChange={(e) => setCurrentDish({ ...currentDish, isSignature: e.target.checked })}
                        className="accent-[#C5A880] w-4 h-4"
                      />
                      <label htmlFor="isSig" className="text-sm text-[#F5F3EF]">
                        Mark as House Signature dish
                      </label>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/5">
                      <button
                        type="button"
                        onClick={() => setIsEditingDish(false)}
                        className="px-4 py-2.5 border border-white/10 text-[#8E8D8A] hover:text-[#F5F3EF]"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-[#C5A880] text-[#0C0D0F] font-semibold hover:bg-[#D8BD97]"
                      >
                        Save Dish
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Modal: Edit/Upload Photo */}
            {isEditingPhoto && (
              <div
                role="dialog"
                aria-modal="true"
                className="fixed inset-0 z-50 bg-[#0C0D0F]/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
              >
                <div className="bg-[#14161A] border border-white/10 max-w-xl w-full p-8 shadow-2xl space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <h3 className="font-serif text-2xl text-[#F5F3EF]">
                      {currentPhoto.id ? 'Edit Gallery Photo' : 'Upload Gallery Photo'}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setIsEditingPhoto(false)}
                      className="p-1 text-[#8E8D8A] hover:text-[#F5F3EF]"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleSavePhoto} className="space-y-4 text-xs">
                    {/* File Upload Zone */}
                    <div>
                      <label className="block text-[#8E8D8A] uppercase tracking-wider mb-1.5 font-medium">
                        Upload Image File
                      </label>
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />

                      {currentPhoto.src ? (
                        <div className="space-y-2">
                          <div className="aspect-[4/3] w-full max-h-48 bg-[#0C0D0F] border border-white/10 relative rounded overflow-hidden">
                            <img
                              src={currentPhoto.src}
                              alt="Upload preview"
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              className="absolute bottom-2 right-2 px-3 py-1.5 bg-[#0C0D0F]/90 hover:bg-[#0C0D0F] border border-white/20 text-[#F5F3EF] text-[11px] uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                            >
                              <Upload className="w-3.5 h-3.5" />
                              <span>Replace File</span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div
                          onClick={() => fileInputRef.current?.click()}
                          className="border-2 border-dashed border-white/15 hover:border-[#C5A880]/60 p-6 text-center cursor-pointer transition-colors bg-[#0C0D0F] flex flex-col items-center justify-center gap-2 group"
                        >
                          <Upload className="w-7 h-7 text-[#8E8D8A] group-hover:text-[#C5A880] transition-colors" />
                          <div className="text-xs text-[#F5F3EF] font-medium">
                            Click to select an image from your computer
                          </div>
                          <div className="text-[11px] text-[#8E8D8A]">
                            PNG, JPG, WebP supported
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[#8E8D8A] uppercase tracking-wider mb-1.5">
                          Photo Title
                        </label>
                        <input
                          type="text"
                          required
                          value={currentPhoto.title || ''}
                          onChange={(e) => setCurrentPhoto({ ...currentPhoto, title: e.target.value })}
                          placeholder="e.g. Pine Deck at Twilight"
                          className="w-full bg-[#0C0D0F] border border-white/10 px-4 py-3 text-sm text-[#F5F3EF] focus-visible:outline-none focus-visible:border-[#C5A880]"
                        />
                      </div>
                      <div>
                        <label className="block text-[#8E8D8A] uppercase tracking-wider mb-1.5">
                          Category
                        </label>
                        <select
                          value={currentPhoto.category || 'interior'}
                          onChange={(e) => {
                            const val = e.target.value as any;
                            const label =
                              val === 'exterior'
                                ? 'Architecture & Hills'
                                : val === 'culinary'
                                ? 'Culinary'
                                : val === 'atmosphere'
                                ? 'Atmosphere'
                                : 'Interior';
                            setCurrentPhoto({
                              ...currentPhoto,
                              category: val,
                              categoryLabel: label,
                            });
                          }}
                          className="w-full bg-[#0C0D0F] border border-white/10 px-4 py-3 text-sm text-[#F5F3EF] focus-visible:outline-none focus-visible:border-[#C5A880]"
                        >
                          <option value="interior">Interior</option>
                          <option value="exterior">Architecture & Hills</option>
                          <option value="culinary">Culinary</option>
                          <option value="atmosphere">Atmosphere</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[#8E8D8A] uppercase tracking-wider mb-1.5">
                        Caption / Description
                      </label>
                      <textarea
                        rows={2}
                        value={currentPhoto.caption || ''}
                        onChange={(e) => setCurrentPhoto({ ...currentPhoto, caption: e.target.value })}
                        placeholder="Brief description for gallery view..."
                        className="w-full bg-[#0C0D0F] border border-white/10 px-4 py-2.5 text-sm text-[#F5F3EF] focus-visible:outline-none focus-visible:border-[#C5A880]"
                      />
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/5">
                      <button
                        type="button"
                        onClick={() => setIsEditingPhoto(false)}
                        className="px-4 py-2.5 border border-white/10 text-[#8E8D8A] hover:text-[#F5F3EF]"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={!currentPhoto.src}
                        className="px-6 py-2.5 bg-[#C5A880] text-[#0C0D0F] font-semibold hover:bg-[#D8BD97] disabled:opacity-50 transition-colors"
                      >
                        Save Photo
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ==================================================
            TAB 3: RESERVATIONS DESK
            ================================================== */}
        {activeTab === 'reservations' && (
          <div className="space-y-6 animate-fade-in">
            {/* Filter and Action Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-[#14161A] border border-white/5">
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-[#8E8D8A] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={reservationSearch}
                    onChange={(e) => setReservationSearch(e.target.value)}
                    placeholder="Search guest, phone, or code..."
                    className="bg-[#0C0D0F] border border-white/10 pl-9 pr-4 py-2 text-xs text-[#F5F3EF] placeholder-[#555] focus-visible:outline-none focus-visible:border-[#C5A880] w-64"
                  />
                </div>

                <select
                  value={reservationFilter}
                  onChange={(e) => setReservationFilter(e.target.value)}
                  className="bg-[#0C0D0F] border border-white/10 px-3 py-2 text-xs text-[#F5F3EF] focus-visible:outline-none focus-visible:border-[#C5A880]"
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="seated">Seated</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <button
                type="button"
                onClick={() => setIsAddingBooking(true)}
                className="px-5 py-2.5 bg-[#C5A880] text-[#0C0D0F] hover:bg-[#D8BD97] text-xs uppercase tracking-wider font-semibold inline-flex items-center gap-1.5 transition-colors shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Log Walk-in / Phone Table</span>
              </button>
            </div>

            {/* Reservations Table */}
            <div className="bg-[#14161A] border border-white/5 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="text-[#8E8D8A] uppercase tracking-wider border-b border-white/5 text-[11px] bg-[#0C0D0F]/50">
                    <tr>
                      <th className="py-3.5 px-6 font-medium">Ref Code</th>
                      <th className="py-3.5 px-6 font-medium">Guest Name</th>
                      <th className="py-3.5 px-6 font-medium">Contact</th>
                      <th className="py-3.5 px-6 font-medium">Date & Time</th>
                      <th className="py-3.5 px-6 font-medium">Party & Area</th>
                      <th className="py-3.5 px-6 font-medium">Status</th>
                      <th className="py-3.5 px-6 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-[#D4D0C7]">
                    {filteredReservations.map((res, index) => {
                      const idKey = res.id || res.confirmationCode || `res-${index}`;
                      return (
                        <tr key={idKey} className="hover:bg-white/[0.02] transition-colors">
                          <td className="py-4 px-6 whitespace-nowrap font-mono text-[11px] text-[#C5A880]">
                            {res.confirmationCode}
                          </td>
                          <td className="py-4 px-6 max-w-xs">
                            <span className="font-serif text-base text-[#F5F3EF] block">
                              {res.fullName}
                            </span>
                            {res.specialRequests && (
                              <span className="text-[11px] text-[#8E8D8A] line-clamp-1 italic">
                                &ldquo;{res.specialRequests}&rdquo;
                              </span>
                            )}
                          </td>
                          <td className="py-4 px-6 whitespace-nowrap space-y-0.5">
                            <div className="flex items-center gap-1 text-[#F5F3EF]">
                              <Phone className="w-3 h-3 text-[#8E8D8A]" />
                              <span>{res.phone}</span>
                            </div>
                            {res.email && (
                              <div className="flex items-center gap-1 text-[#8E8D8A] text-[10px]">
                                <Mail className="w-3 h-3" />
                                <span>{res.email}</span>
                              </div>
                            )}
                          </td>
                          <td className="py-4 px-6 whitespace-nowrap">
                            <span className="text-[#F5F3EF] font-medium block">{res.date}</span>
                            <span className="text-[#C5A880] text-[11px]">{res.timeSlot}</span>
                          </td>
                          <td className="py-4 px-6 whitespace-nowrap">
                            <span className="text-[#F5F3EF] block">{res.guests} Guests</span>
                            <span className="text-[#8E8D8A] text-[11px] capitalize">
                              {res.seatingArea.replace('-', ' ')}
                            </span>
                          </td>
                          <td className="py-4 px-6 whitespace-nowrap">
                            <span
                              className={`px-2.5 py-1 text-[10px] uppercase tracking-wider font-semibold ${
                                res.status === 'confirmed'
                                  ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40'
                                  : res.status === 'seated'
                                  ? 'bg-[#C5A880]/20 text-[#C5A880] border border-[#C5A880]/30'
                                  : res.status === 'cancelled'
                                  ? 'bg-rose-950/60 text-rose-400 border border-rose-800/40'
                                  : 'bg-amber-950/60 text-amber-300 border border-amber-800/40'
                              }`}
                            >
                              {res.status}
                            </span>
                          </td>
                          <td className="py-4 px-6 whitespace-nowrap text-right">
                            <div className="inline-flex items-center gap-2">
                              {res.status !== 'confirmed' && (
                                <button
                                  type="button"
                                  onClick={() => handleStatusChange(res.confirmationCode || res.id || '', 'confirmed')}
                                  className="px-2.5 py-1 bg-[#1F2126] hover:bg-emerald-950/40 text-emerald-400 border border-white/5 hover:border-emerald-800/40 text-[10px] uppercase tracking-wider font-medium transition-colors"
                                >
                                  Confirm
                                </button>
                              )}
                              {res.status !== 'seated' && res.status !== 'cancelled' && (
                                <button
                                  type="button"
                                  onClick={() => handleStatusChange(res.confirmationCode || res.id || '', 'seated')}
                                  className="px-2.5 py-1 bg-[#1F2126] hover:bg-[#C5A880]/20 text-[#C5A880] border border-white/5 hover:border-[#C5A880]/30 text-[10px] uppercase tracking-wider font-medium transition-colors"
                                >
                                  Seat
                                </button>
                              )}
                              {res.status !== 'cancelled' && (
                                <button
                                  type="button"
                                  onClick={() => handleStatusChange(res.confirmationCode || res.id || '', 'cancelled')}
                                  className="px-2.5 py-1 bg-[#1F2126] hover:bg-rose-950/40 text-rose-400 border border-white/5 hover:border-rose-800/40 text-[10px] uppercase tracking-wider font-medium transition-colors"
                                >
                                  Cancel
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={() =>
                                  setItemToDelete({
                                    type: 'reservation',
                                    id: res.confirmationCode || res.id || '',
                                    title: `${res.fullName} (${res.confirmationCode})`,
                                  })
                                }
                                className="p-1.5 text-[#8E8D8A] hover:text-rose-400 transition-colors ml-1"
                                title="Delete Reservation"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Modal: Manual Table Log */}
            {isAddingBooking && (
              <div
                role="dialog"
                aria-modal="true"
                className="fixed inset-0 z-50 bg-[#0C0D0F]/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
              >
                <div className="bg-[#14161A] border border-white/10 max-w-lg w-full p-8 shadow-2xl space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <h3 className="font-serif text-2xl text-[#F5F3EF]">
                      Log Walk-in / Phone Reservation
                    </h3>
                    <button
                      type="button"
                      onClick={() => setIsAddingBooking(false)}
                      className="p-1 text-[#8E8D8A] hover:text-[#F5F3EF]"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleManualBookingSubmit} className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[#8E8D8A] uppercase tracking-wider mb-1.5">
                          Guest Full Name
                        </label>
                        <input
                          type="text"
                          required
                          value={manualBooking.fullName}
                          onChange={(e) => setManualBooking({ ...manualBooking, fullName: e.target.value })}
                          placeholder="e.g. Asad Khan"
                          className="w-full bg-[#0C0D0F] border border-white/10 px-4 py-3 text-sm text-[#F5F3EF] focus-visible:outline-none focus-visible:border-[#C5A880]"
                        />
                      </div>
                      <div>
                        <label className="block text-[#8E8D8A] uppercase tracking-wider mb-1.5">
                          Phone Number
                        </label>
                        <input
                          type="text"
                          required
                          value={manualBooking.phone}
                          onChange={(e) => setManualBooking({ ...manualBooking, phone: e.target.value })}
                          placeholder="0300 1234567"
                          className="w-full bg-[#0C0D0F] border border-white/10 px-4 py-3 text-sm text-[#F5F3EF] focus-visible:outline-none focus-visible:border-[#C5A880]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[#8E8D8A] uppercase tracking-wider mb-1.5">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        value={manualBooking.email}
                        onChange={(e) => setManualBooking({ ...manualBooking, email: e.target.value })}
                        placeholder="guest@gmail.com"
                        className="w-full bg-[#0C0D0F] border border-white/10 px-4 py-3 text-sm text-[#F5F3EF] focus-visible:outline-none focus-visible:border-[#C5A880]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[#8E8D8A] uppercase tracking-wider mb-1.5">
                          Date
                        </label>
                        <input
                          type="date"
                          required
                          value={manualBooking.date}
                          onChange={(e) => setManualBooking({ ...manualBooking, date: e.target.value })}
                          className="w-full bg-[#0C0D0F] border border-white/10 px-3 py-3 text-sm text-[#F5F3EF] focus-visible:outline-none focus-visible:border-[#C5A880]"
                        />
                      </div>
                      <div>
                        <label className="block text-[#8E8D8A] uppercase tracking-wider mb-1.5">
                          Time Slot
                        </label>
                        <select
                          value={manualBooking.timeSlot}
                          onChange={(e) => setManualBooking({ ...manualBooking, timeSlot: e.target.value })}
                          className="w-full bg-[#0C0D0F] border border-white/10 px-3 py-3 text-sm text-[#F5F3EF] focus-visible:outline-none focus-visible:border-[#C5A880]"
                        >
                          {AUTHENTIC_TIME_SLOTS.map((slot) => (
                            <option key={slot} value={slot}>
                              {slot}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[#8E8D8A] uppercase tracking-wider mb-1.5">
                          Guests
                        </label>
                        <input
                          type="number"
                          min={1}
                          max={30}
                          required
                          value={manualBooking.guests}
                          onChange={(e) => setManualBooking({ ...manualBooking, guests: parseInt(e.target.value) || 2 })}
                          className="w-full bg-[#0C0D0F] border border-white/10 px-3 py-3 text-sm text-[#F5F3EF] focus-visible:outline-none focus-visible:border-[#C5A880]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[#8E8D8A] uppercase tracking-wider mb-1.5">
                        Seating Area
                      </label>
                      <select
                        value={manualBooking.seatingArea}
                        onChange={(e) => setManualBooking({ ...manualBooking, seatingArea: e.target.value as any })}
                        className="w-full bg-[#0C0D0F] border border-white/10 px-4 py-3 text-sm text-[#F5F3EF] focus-visible:outline-none focus-visible:border-[#C5A880]"
                      >
                        <option value="indoor">Indoor Dining Room (Forest View)</option>
                        <option value="outdoor">Outdoor Pine Deck & Lawn</option>
                        <option value="no-preference">First Available Table</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[#8E8D8A] uppercase tracking-wider mb-1.5">
                        Special Notes
                      </label>
                      <textarea
                        rows={2}
                        value={manualBooking.specialRequests || ''}
                        onChange={(e) => setManualBooking({ ...manualBooking, specialRequests: e.target.value })}
                        placeholder="Dietary requests, outdoor preference..."
                        className="w-full bg-[#0C0D0F] border border-white/10 px-4 py-2 text-sm text-[#F5F3EF] focus-visible:outline-none focus-visible:border-[#C5A880]"
                      />
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/5">
                      <button
                        type="button"
                        onClick={() => setIsAddingBooking(false)}
                        className="px-4 py-2.5 border border-white/10 text-[#8E8D8A] hover:text-[#F5F3EF]"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-[#C5A880] text-[#0C0D0F] font-semibold hover:bg-[#D8BD97]"
                      >
                        Save Reservation
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
