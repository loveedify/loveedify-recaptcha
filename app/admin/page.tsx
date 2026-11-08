'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase, type InspirationalPost, type NewsletterSubscriber, type PrayerRequest, type EnrollmentInquiry, type ContactMessage, type CenterEvent, type GalleryPhoto } from '@/lib/supabase';
import { Heart, BookOpen, Users, Bell, MessageSquare, Plus, Trash2, Eye, EyeOff, Star, LayoutDashboard, LogOut, X, Check, CreditCard as Edit2, CalendarDays, Images, Megaphone } from 'lucide-react';
import AdminPostForm from '@/components/admin/AdminPostForm';
import AdminEventForm from '@/components/admin/AdminEventForm';
import AdminGalleryForm from '@/components/admin/AdminGalleryForm';
import AdminAnnouncementForm from '@/components/admin/AdminAnnouncementForm';

type Tab = 'dashboard' | 'posts' | 'subscribers' | 'prayers' | 'enrollments' | 'messages' | 'events' | 'gallery' | 'announcements';

type Stats = {
  posts: number;
  subscribers: number;
  prayers: number;
  enrollments: number;
  messages: number;
  events: number;
};

export default function AdminPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [stats, setStats] = useState<Stats>({ posts: 0, subscribers: 0, prayers: 0, enrollments: 0, messages: 0, events: 0 });
  const [posts, setPosts] = useState<InspirationalPost[]>([]);
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [prayers, setPrayers] = useState<PrayerRequest[]>([]);
  const [enrollments, setEnrollments] = useState<EnrollmentInquiry[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [events, setEvents] = useState<CenterEvent[]>([]);
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [showPostForm, setShowPostForm] = useState(false);
  const [editingPost, setEditingPost] = useState<InspirationalPost | null>(null);
  const [showEventForm, setShowEventForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CenterEvent | null>(null);
  const [showGalleryForm, setShowGalleryForm] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState<GalleryPhoto | null>(null);
  const [loading, setLoading] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [authChecking, setAuthChecking] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) { router.replace('/admin/login'); return; }
      setAdminEmail(session.user.email ?? '');
      setAuthChecking(false);
      loadAll();
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) router.replace('/admin/login');
    });
    return () => subscription.unsubscribe();
  }, [router]);

  async function loadAll() {
    setLoading(true);
    const [p, s, pr, e, m, ev, gal] = await Promise.all([
      supabase.from('inspirational_posts').select('*').order('created_at', { ascending: false }),
      supabase.from('newsletter_subscribers').select('*').order('subscribed_at', { ascending: false }),
      supabase.from('prayer_requests').select('*').order('created_at', { ascending: false }),
      supabase.from('enrollment_inquiries').select('*').order('created_at', { ascending: false }),
      supabase.from('contact_messages').select('*').order('created_at', { ascending: false }),
      supabase.from('center_events').select('*').order('event_date', { ascending: true }),
      supabase.from('gallery_photos').select('*').order('display_order', { ascending: true }).order('created_at', { ascending: true }),
    ]);
    const postsData = p.data || [];
    const subsData = s.data || [];
    const prayData = pr.data || [];
    const enrollData = e.data || [];
    const msgData = m.data || [];
    const eventsData = ev.data || [];
    const photosData = gal.data || [];
    setPosts(postsData);
    setSubscribers(subsData);
    setPrayers(prayData);
    setEnrollments(enrollData);
    setMessages(msgData);
    setEvents(eventsData);
    setPhotos(photosData);
    const today = new Date().toISOString().split('T')[0];
    setStats({
      posts: postsData.length,
      subscribers: subsData.filter((sub) => sub.active).length,
      prayers: prayData.length,
      enrollments: enrollData.filter((enr) => enr.status === 'new').length,
      messages: msgData.filter((msg) => !msg.read).length,
      events: eventsData.filter((ev) => ev.published && ev.event_date >= today).length,
    });
    setLoading(false);
  }

  async function togglePublished(post: InspirationalPost) {
    await supabase.from('inspirational_posts').update({ published: !post.published }).eq('id', post.id);
    loadAll();
  }
  async function toggleFeatured(post: InspirationalPost) {
    await supabase.from('inspirational_posts').update({ featured: !post.featured }).eq('id', post.id);
    loadAll();
  }
  async function deletePost(id: string) {
    if (!confirm('Delete this post?')) return;
    await supabase.from('inspirational_posts').delete().eq('id', id);
    loadAll();
  }
  async function markAnswered(id: string, is_answered: boolean) {
    await supabase.from('prayer_requests').update({ is_answered }).eq('id', id);
    loadAll();
  }
  async function updateEnrollmentStatus(id: string, status: string) {
    await supabase.from('enrollment_inquiries').update({ status }).eq('id', id);
    loadAll();
  }
  async function markMessageRead(id: string) {
    await supabase.from('contact_messages').update({ read: true }).eq('id', id);
    loadAll();
  }
  async function deleteSubscriber(id: string) {
    if (!confirm('Remove this subscriber?')) return;
    await supabase.from('newsletter_subscribers').delete().eq('id', id);
    loadAll();
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.replace('/admin/login');
  }

  async function toggleEventPublished(event: CenterEvent) {
    await supabase.from('center_events').update({ published: !event.published }).eq('id', event.id);
    loadAll();
  }
  async function deleteEvent(id: string) {
    if (!confirm('Delete this event?')) return;
    await supabase.from('center_events').delete().eq('id', id);
    loadAll();
  }

  async function togglePhotoPublished(photo: GalleryPhoto) {
    await supabase.from('gallery_photos').update({ published: !photo.published }).eq('id', photo.id);
    loadAll();
  }
  async function deletePhoto(id: string) {
    if (!confirm('Delete this photo?')) return;
    await supabase.from('gallery_photos').delete().eq('id', id);
    loadAll();
  }

  const navItems: { id: Tab; label: string; shortLabel: string; icon: typeof LayoutDashboard; badge?: number }[] = [
    { id: 'dashboard', label: 'Dashboard', shortLabel: 'Home', icon: LayoutDashboard },
    { id: 'posts', label: 'Inspirational Posts', shortLabel: 'Posts', icon: BookOpen, badge: stats.posts },
    { id: 'subscribers', label: 'Newsletter', shortLabel: 'Newsletter', icon: Bell, badge: stats.subscribers },
    { id: 'prayers', label: 'Prayer Requests', shortLabel: 'Prayer', icon: Heart, badge: stats.prayers },
    { id: 'enrollments', label: 'Enrollments', shortLabel: 'Enroll', icon: Users, badge: stats.enrollments },
    { id: 'messages', label: 'Messages', shortLabel: 'Messages', icon: MessageSquare, badge: stats.messages },
    { id: 'events', label: 'Events Calendar', shortLabel: 'Events', icon: CalendarDays, badge: stats.events },
    { id: 'gallery', label: 'Photo Gallery', shortLabel: 'Gallery', icon: Images, badge: photos.length },
    { id: 'announcements', label: 'Announcements', shortLabel: 'Notice', icon: Megaphone },
  ];

  const activeLabel = navItems.find((n) => n.id === activeTab)?.label || 'Dashboard';

  if (authChecking) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-forest-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col lg:flex-row">
      {/* ── Desktop Sidebar (lg+) ── */}
      <aside className="hidden lg:flex w-64 bg-forest-500 flex-shrink-0 flex-col min-h-screen">
        <div className="px-5 py-6 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 p-1 bg-white rounded-xl flex items-center justify-center">
              <img src="https://static.wixstatic.com/shapes/c73eb8_4c3d83c3e6104f6485e207603ce3b1c1.svg" alt="Love Edify logo" className="h-7 w-auto" />
            </div>
            <div>
              <span className="font-poppins font-700 text-white text-sm block">Love Edify</span>
              <span className="text-golden-300 text-[10px] font-inter">Admin Dashboard</span>
            </div>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-inter text-sm transition-all duration-150 ${
                activeTab === item.id ? 'bg-white/15 text-white font-medium' : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <item.icon className="w-4 h-4" />
                {item.label}
              </div>
              {item.badge !== undefined && item.badge > 0 && (
                <span className="bg-golden-500 text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
                  {item.badge > 99 ? '99+' : item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>
        <div className="px-5 py-4 border-t border-white/10 space-y-2">
          {adminEmail && (
            <p className="text-white/40 text-[10px] font-inter truncate">{adminEmail}</p>
          )}
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-1.5 text-white/60 text-xs font-inter hover:text-white/90 transition-colors">
              Back to Site
            </a>
            <span className="text-white/20 text-xs">·</span>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-1.5 text-white/60 text-xs font-inter hover:text-white/90 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* ── Mobile Top Header ── */}
      <header className="lg:hidden bg-forest-500 px-4 py-3 flex items-center justify-between flex-shrink-0 sticky top-0 z-30 shadow-lg">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 p-1 bg-white rounded-lg flex items-center justify-center">
            <img src="https://static.wixstatic.com/shapes/c73eb8_4c3d83c3e6104f6485e207603ce3b1c1.svg" alt="Love Edify logo" className="h-6 w-auto" />
          </div>
          <div>
            <span className="font-poppins font-700 text-white text-sm">{activeLabel}</span>
          </div>
        </div>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-1.5 text-white/70 text-xs font-inter hover:text-white transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Sign Out</span>
        </button>
      </header>

      {/* ── Main Content ── */}
      <main className="flex-1 overflow-auto pb-20 lg:pb-0">
        <div className="p-4 md:p-6">

          {/* ── Dashboard ── */}
          {activeTab === 'dashboard' && (
            <div>
              <h1 className="hidden lg:block font-poppins font-700 text-2xl text-forest-500 mb-6">Dashboard Overview</h1>

              {/* Stats Grid — 2-col on mobile, 6-col on desktop */}
              <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 mb-6">
                {[
                  { label: 'Posts Published', value: posts.filter(p => p.published).length, icon: BookOpen, color: 'text-forest-500', bg: 'bg-forest-50' },
                  { label: 'Active Subscribers', value: subscribers.filter(s => s.active).length, icon: Bell, color: 'text-golden-600', bg: 'bg-golden-50' },
                  { label: 'Prayer Requests', value: prayers.length, icon: Heart, color: 'text-forest-500', bg: 'bg-forest-50' },
                  { label: 'New Enrollments', value: enrollments.filter(e => e.status === 'new').length, icon: Users, color: 'text-golden-600', bg: 'bg-golden-50' },
                  { label: 'Unread Messages', value: messages.filter(m => !m.read).length, icon: MessageSquare, color: 'text-forest-500', bg: 'bg-forest-50' },
                  { label: 'Upcoming Events', value: stats.events, icon: CalendarDays, color: 'text-golden-600', bg: 'bg-golden-50' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white rounded-2xl p-4 border border-cream-100 shadow-soft">
                    <div className={`w-9 h-9 ${stat.bg} rounded-xl flex items-center justify-center mb-3`}>
                      <stat.icon className={`w-4 h-4 ${stat.color}`} />
                    </div>
                    <div className="font-poppins font-700 text-2xl md:text-3xl text-forest-500 leading-none mb-1">{stat.value}</div>
                    <div className="text-muted-gray font-inter text-xs leading-tight">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Recent Activity — stacked on mobile */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl p-4 border border-cream-100 shadow-soft">
                  <h2 className="font-poppins font-600 text-forest-500 text-sm mb-3">Recent Enrollments</h2>
                  {enrollments.slice(0, 5).map((e) => (
                    <div key={e.id} className="flex items-center justify-between py-2.5 border-b border-cream-100 last:border-0">
                      <div className="min-w-0 flex-1">
                        <p className="font-inter text-sm font-medium text-charcoal truncate">{e.child_name}</p>
                        <p className="font-inter text-xs text-muted-gray truncate">{e.parent_name}</p>
                      </div>
                      <span className={`ml-2 flex-shrink-0 text-xs font-inter font-medium px-2 py-1 rounded-full ${
                        e.status === 'new' ? 'bg-golden-50 text-golden-600' :
                        e.status === 'enrolled' ? 'bg-sage-100 text-sage-600' : 'bg-cream-100 text-muted-gray'
                      }`}>{e.status}</span>
                    </div>
                  ))}
                  {enrollments.length === 0 && <p className="text-muted-gray text-sm font-inter">No enrollments yet.</p>}
                </div>

                <div className="bg-white rounded-2xl p-4 border border-cream-100 shadow-soft">
                  <h2 className="font-poppins font-600 text-forest-500 text-sm mb-3">Recent Messages</h2>
                  {messages.slice(0, 5).map((m) => (
                    <div key={m.id} className="flex items-center gap-2.5 py-2.5 border-b border-cream-100 last:border-0">
                      {!m.read && <div className="w-2 h-2 bg-golden-500 rounded-full flex-shrink-0" />}
                      <div className="flex-1 min-w-0">
                        <p className={`font-inter text-sm truncate ${m.read ? 'text-muted-gray' : 'font-medium text-charcoal'}`}>{m.name}</p>
                        <p className="font-inter text-xs text-muted-gray truncate">{m.subject}</p>
                      </div>
                      <span className="text-xs text-muted-gray font-inter flex-shrink-0">{new Date(m.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    </div>
                  ))}
                  {messages.length === 0 && <p className="text-muted-gray text-sm font-inter">No messages yet.</p>}
                </div>
              </div>
            </div>
          )}

          {/* ── Inspirational Posts ── */}
          {activeTab === 'posts' && (
            <div>
              <div className="hidden lg:flex items-center justify-between mb-6">
                <h1 className="font-poppins font-700 text-2xl text-forest-500">Inspirational Posts</h1>
                <button onClick={() => { setEditingPost(null); setShowPostForm(true); }} className="btn-primary flex items-center gap-2 text-sm">
                  <Plus className="w-4 h-4" /> New Post
                </button>
              </div>

              {/* Full-screen modal on mobile, centered modal on desktop */}
              {showPostForm && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center">
                  <div className="bg-white w-full sm:max-w-2xl sm:rounded-3xl sm:m-6 rounded-t-3xl shadow-2xl flex flex-col max-h-[95vh] sm:max-h-[90vh]">
                    <div className="flex items-center justify-between px-5 py-4 border-b border-cream-100 flex-shrink-0">
                      <h2 className="font-poppins font-700 text-lg text-forest-500">
                        {editingPost ? 'Edit Post' : 'New Inspirational Post'}
                      </h2>
                      <button onClick={() => setShowPostForm(false)} className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-gray hover:text-charcoal hover:bg-cream transition-colors">
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="overflow-y-auto flex-1 p-5">
                      <AdminPostForm
                        post={editingPost}
                        onSave={() => { setShowPostForm(false); loadAll(); }}
                        onCancel={() => setShowPostForm(false)}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                {posts.map((post) => (
                  <div key={post.id} className="bg-white rounded-2xl p-4 border border-cream-100 shadow-soft">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-1.5 mb-1">
                          <span className="bg-forest-50 text-forest-600 text-xs font-inter font-medium px-2 py-0.5 rounded-full capitalize">{post.category}</span>
                          {post.featured && (
                            <span className="bg-golden-50 text-golden-600 text-xs font-inter font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
                              <Star className="w-2.5 h-2.5 fill-golden-500" /> Featured
                            </span>
                          )}
                          {!post.published && (
                            <span className="bg-cream-100 text-muted-gray text-xs font-inter px-2 py-0.5 rounded-full">Draft</span>
                          )}
                        </div>
                        <h3 className="font-poppins font-600 text-forest-500 text-sm leading-snug">{post.title}</h3>
                        {post.scripture_reference && (
                          <p className="text-muted-gray font-inter text-xs mt-0.5">{post.scripture_reference}</p>
                        )}
                      </div>
                    </div>
                    {/* Action row — large touch targets */}
                    <div className="flex gap-2 pt-2 border-t border-cream-100">
                      <button
                        onClick={() => toggleFeatured(post)}
                        title={post.featured ? 'Remove featured' : 'Set as featured'}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-inter font-medium transition-colors ${
                          post.featured ? 'bg-golden-100 text-golden-700' : 'bg-cream text-muted-gray hover:bg-golden-50 hover:text-golden-600'
                        }`}
                      >
                        <Star className={`w-3.5 h-3.5 ${post.featured ? 'fill-golden-500' : ''}`} />
                        <span className="hidden sm:inline">{post.featured ? 'Featured' : 'Feature'}</span>
                      </button>
                      <button
                        onClick={() => togglePublished(post)}
                        title={post.published ? 'Unpublish' : 'Publish'}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-inter font-medium transition-colors ${
                          post.published ? 'bg-sage-100 text-sage-600' : 'bg-cream text-muted-gray hover:bg-sage-50 hover:text-sage-600'
                        }`}
                      >
                        {post.published ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                        <span className="hidden sm:inline">{post.published ? 'Published' : 'Publish'}</span>
                      </button>
                      <button
                        onClick={() => { setEditingPost(post); setShowPostForm(true); }}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-inter font-medium bg-cream text-muted-gray hover:bg-forest-50 hover:text-forest-500 transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Edit</span>
                      </button>
                      <button
                        onClick={() => deletePost(post.id)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-inter font-medium bg-cream text-muted-gray hover:bg-red-50 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
                {posts.length === 0 && (
                  <div className="text-center py-16">
                    <BookOpen className="w-12 h-12 text-muted-gray mx-auto mb-3 opacity-30" />
                    <p className="text-muted-gray font-inter text-sm">No posts yet. Create your first post!</p>
                  </div>
                )}
              </div>

              {/* Floating action button on mobile */}
              <button
                onClick={() => { setEditingPost(null); setShowPostForm(true); }}
                className="lg:hidden fixed bottom-20 right-4 w-14 h-14 bg-golden-500 text-white rounded-full shadow-golden flex items-center justify-center z-20 hover:bg-golden-600 transition-colors"
                aria-label="New post"
              >
                <Plus className="w-6 h-6" />
              </button>
            </div>
          )}

          {/* ── Newsletter Subscribers ── */}
          {activeTab === 'subscribers' && (
            <div>
              <div className="hidden lg:block mb-6">
                <h1 className="font-poppins font-700 text-2xl text-forest-500 mb-1">Newsletter Subscribers</h1>
                <p className="text-muted-gray font-inter text-sm">{subscribers.filter(s => s.active).length} active subscribers</p>
              </div>
              <p className="lg:hidden text-muted-gray font-inter text-sm mb-4">{subscribers.filter(s => s.active).length} active subscribers</p>

              {/* Card list on mobile, table on desktop */}
              <div className="lg:hidden space-y-3">
                {subscribers.map((sub) => (
                  <div key={sub.id} className="bg-white rounded-2xl p-4 border border-cream-100 shadow-soft">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        {sub.name && <p className="font-inter font-medium text-charcoal text-sm truncate">{sub.name}</p>}
                        <p className="font-inter text-sm text-muted-gray truncate">{sub.email}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className={`text-xs font-inter font-medium px-2 py-0.5 rounded-full ${sub.active ? 'bg-sage-100 text-sage-600' : 'bg-cream-100 text-muted-gray'}`}>
                            {sub.active ? 'Active' : 'Inactive'}
                          </span>
                          <span className="text-xs text-muted-gray font-inter">{new Date(sub.subscribed_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => deleteSubscriber(sub.id)}
                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-cream text-muted-gray hover:bg-red-50 hover:text-red-500 transition-colors flex-shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
                {subscribers.length === 0 && (
                  <div className="text-center py-16">
                    <Bell className="w-12 h-12 text-muted-gray mx-auto mb-3 opacity-30" />
                    <p className="text-muted-gray font-inter text-sm">No subscribers yet.</p>
                  </div>
                )}
              </div>

              {/* Desktop table */}
              <div className="hidden lg:block bg-white rounded-2xl border border-cream-100 shadow-soft overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-cream border-b border-cream-100">
                      <th className="px-5 py-3.5 text-left text-xs font-inter font-medium text-muted-gray uppercase tracking-wider">Name</th>
                      <th className="px-5 py-3.5 text-left text-xs font-inter font-medium text-muted-gray uppercase tracking-wider">Email</th>
                      <th className="px-5 py-3.5 text-left text-xs font-inter font-medium text-muted-gray uppercase tracking-wider">Date</th>
                      <th className="px-5 py-3.5 text-left text-xs font-inter font-medium text-muted-gray uppercase tracking-wider">Status</th>
                      <th className="px-5 py-3.5"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-cream-100">
                    {subscribers.map((sub) => (
                      <tr key={sub.id} className="hover:bg-cream/50 transition-colors">
                        <td className="px-5 py-3.5 font-inter text-sm text-charcoal">{sub.name || '—'}</td>
                        <td className="px-5 py-3.5 font-inter text-sm text-charcoal">{sub.email}</td>
                        <td className="px-5 py-3.5 font-inter text-xs text-muted-gray">{new Date(sub.subscribed_at).toLocaleDateString()}</td>
                        <td className="px-5 py-3.5">
                          <span className={`text-xs font-inter font-medium px-2.5 py-1 rounded-full ${sub.active ? 'bg-sage-100 text-sage-600' : 'bg-cream-100 text-muted-gray'}`}>
                            {sub.active ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-5 py-3.5">
                          <button onClick={() => deleteSubscriber(sub.id)} className="text-muted-gray hover:text-red-500 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {subscribers.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-gray font-inter text-sm">No subscribers yet.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── Prayer Requests ── */}
          {activeTab === 'prayers' && (
            <div>
              <h1 className="hidden lg:block font-poppins font-700 text-2xl text-forest-500 mb-6">Prayer Requests</h1>
              <div className="space-y-3">
                {prayers.map((prayer) => (
                  <div key={prayer.id} className="bg-white rounded-2xl p-4 border border-cream-100 shadow-soft">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="font-poppins font-600 text-forest-500 text-sm">{prayer.name || 'Anonymous'}</span>
                      {prayer.email && <span className="text-muted-gray text-xs font-inter truncate max-w-[160px]">({prayer.email})</span>}
                      {prayer.is_private && <span className="bg-cream-100 text-muted-gray text-xs font-inter px-2 py-0.5 rounded-full">Private</span>}
                      {prayer.is_answered && <span className="bg-sage-100 text-sage-600 text-xs font-inter font-medium px-2 py-0.5 rounded-full">Answered!</span>}
                    </div>
                    <p className="text-charcoal font-inter text-sm leading-relaxed mb-3">{prayer.request}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-muted-gray font-inter text-xs">
                        {new Date(prayer.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                      <button
                        onClick={() => markAnswered(prayer.id, !prayer.is_answered)}
                        className={`flex items-center gap-1.5 text-xs font-inter font-medium px-3 py-2 rounded-xl transition-colors ${
                          prayer.is_answered
                            ? 'bg-sage-100 text-sage-600 hover:bg-sage-200'
                            : 'bg-cream text-muted-gray hover:bg-sage-100 hover:text-sage-600'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5" />
                        {prayer.is_answered ? 'Answered' : 'Mark Answered'}
                      </button>
                    </div>
                  </div>
                ))}
                {prayers.length === 0 && (
                  <div className="text-center py-16">
                    <Heart className="w-12 h-12 text-muted-gray mx-auto mb-3 opacity-30" />
                    <p className="text-muted-gray font-inter text-sm">No prayer requests yet.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── Enrollments ── */}
          {activeTab === 'enrollments' && (
            <div>
              <h1 className="hidden lg:block font-poppins font-700 text-2xl text-forest-500 mb-6">Enrollment Inquiries</h1>
              <div className="space-y-3">
                {enrollments.map((enr) => (
                  <div key={enr.id} className="bg-white rounded-2xl p-4 border border-cream-100 shadow-soft">
                    <div className="mb-3">
                      <h3 className="font-poppins font-600 text-forest-500 text-base">{enr.child_name}</h3>
                      <p className="text-charcoal font-inter text-sm mt-0.5">Parent: {enr.parent_name}</p>
                      <p className="text-muted-gray font-inter text-sm mt-0.5 break-all">{enr.email}{enr.phone && ` · ${enr.phone}`}</p>
                      <p className="text-muted-gray font-inter text-xs mt-1">{enr.program_interest}</p>
                      {enr.message && <p className="text-muted-gray font-inter text-xs mt-1.5 line-clamp-2">{enr.message}</p>}
                      <p className="text-muted-gray font-inter text-xs mt-1">
                        Submitted {new Date(enr.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    {/* Full-width status selector */}
                    <select
                      value={enr.status}
                      onChange={(e) => updateEnrollmentStatus(enr.id, e.target.value)}
                      className={`w-full text-sm font-inter font-medium px-4 py-3 rounded-xl border-0 focus:ring-2 focus:ring-forest-400 outline-none cursor-pointer ${
                        enr.status === 'new' ? 'bg-golden-50 text-golden-700' :
                        enr.status === 'contacted' ? 'bg-forest-50 text-forest-700' :
                        enr.status === 'enrolled' ? 'bg-sage-100 text-sage-700' :
                        'bg-cream-100 text-muted-gray'
                      }`}
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="enrolled">Enrolled</option>
                      <option value="declined">Declined</option>
                    </select>
                  </div>
                ))}
                {enrollments.length === 0 && (
                  <div className="text-center py-16">
                    <Users className="w-12 h-12 text-muted-gray mx-auto mb-3 opacity-30" />
                    <p className="text-muted-gray font-inter text-sm">No enrollment inquiries yet.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── Contact Messages ── */}
          {activeTab === 'messages' && (
            <div>
              <h1 className="hidden lg:block font-poppins font-700 text-2xl text-forest-500 mb-6">Contact Messages</h1>
              <div className="space-y-3">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`bg-white rounded-2xl p-4 border shadow-soft ${msg.read ? 'border-cream-100' : 'border-golden-200'}`}
                  >
                    <div className="flex items-start gap-2 mb-2">
                      {!msg.read && <div className="w-2 h-2 bg-golden-500 rounded-full flex-shrink-0 mt-1.5" />}
                      <div className="flex-1 min-w-0">
                        <span className="font-poppins font-600 text-forest-500 text-sm">{msg.name}</span>
                        <span className="text-muted-gray font-inter text-xs ml-2">— {msg.subject}</span>
                        <p className="text-muted-gray font-inter text-xs mt-0.5 break-all">{msg.email}{msg.phone && ` · ${msg.phone}`}</p>
                      </div>
                    </div>
                    <p className="text-charcoal font-inter text-sm leading-relaxed mb-3">{msg.message}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-muted-gray font-inter text-xs">
                        {new Date(msg.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                      {!msg.read && (
                        <button
                          onClick={() => markMessageRead(msg.id)}
                          className="flex items-center gap-1.5 text-xs font-inter font-medium px-3 py-2 rounded-xl bg-forest-50 text-forest-600 hover:bg-forest-100 transition-colors"
                        >
                          <Check className="w-3.5 h-3.5" />
                          Mark Read
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                {messages.length === 0 && (
                  <div className="text-center py-16">
                    <MessageSquare className="w-12 h-12 text-muted-gray mx-auto mb-3 opacity-30" />
                    <p className="text-muted-gray font-inter text-sm">No messages yet.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── Events Calendar ── */}
          {activeTab === 'events' && (
            <div>
              <div className="hidden lg:flex items-center justify-between mb-6">
                <h1 className="font-poppins font-700 text-2xl text-forest-500">Events Calendar</h1>
                <button
                  onClick={() => { setEditingEvent(null); setShowEventForm(true); }}
                  className="btn-primary flex items-center gap-2 text-sm"
                >
                  <Plus className="w-4 h-4" /> New Event
                </button>
              </div>

              {/* Event form modal — bottom-sheet on mobile, centered on desktop */}
              {showEventForm && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center">
                  <div className="bg-white w-full sm:max-w-xl sm:rounded-3xl sm:m-6 rounded-t-3xl shadow-2xl flex flex-col max-h-[95vh] sm:max-h-[90vh]">
                    <div className="flex items-center justify-between px-5 py-4 border-b border-cream-100 flex-shrink-0">
                      <h2 className="font-poppins font-700 text-lg text-forest-500">
                        {editingEvent ? 'Edit Event' : 'New Event'}
                      </h2>
                      <button
                        onClick={() => setShowEventForm(false)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-gray hover:text-charcoal hover:bg-cream transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="overflow-y-auto flex-1">
                      <AdminEventForm
                        event={editingEvent}
                        onSaved={() => { setShowEventForm(false); loadAll(); }}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                {events.map((ev) => (
                  <div key={ev.id} className="bg-white rounded-2xl p-4 border border-cream-100 shadow-soft">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="flex-shrink-0 bg-forest-50 rounded-xl p-2.5 text-center min-w-[52px]">
                        <p className="font-poppins font-700 text-forest-500 text-lg leading-none">
                          {new Date(ev.event_date + 'T00:00:00').getDate()}
                        </p>
                        <p className="font-inter text-xs text-forest-400 uppercase">
                          {new Date(ev.event_date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short' })}
                        </p>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-1.5 mb-1">
                          <span className={`text-xs font-inter font-medium px-2 py-0.5 rounded-full capitalize ${
                            ev.category === 'holiday' ? 'bg-golden-50 text-golden-600' :
                            ev.category === 'closed' ? 'bg-red-50 text-red-500' :
                            ev.category === 'field_trip' ? 'bg-sage-100 text-sage-600' :
                            ev.category === 'parent_event' ? 'bg-forest-50 text-forest-600' :
                            'bg-cream-100 text-muted-gray'
                          }`}>
                            {ev.category.replace('_', ' ')}
                          </span>
                          {!ev.published && (
                            <span className="bg-cream-100 text-muted-gray text-xs font-inter px-2 py-0.5 rounded-full">Draft</span>
                          )}
                        </div>
                        <h3 className="font-poppins font-600 text-forest-500 text-sm leading-snug">{ev.title}</h3>
                        {ev.location && <p className="text-muted-gray font-inter text-xs mt-0.5">{ev.location}</p>}
                        {!ev.all_day && ev.start_time && (
                          <p className="text-muted-gray font-inter text-xs mt-0.5">
                            {ev.start_time}{ev.end_time ? ` – ${ev.end_time}` : ''}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2 pt-2 border-t border-cream-100">
                      <button
                        onClick={() => toggleEventPublished(ev)}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-inter font-medium transition-colors ${
                          ev.published ? 'bg-sage-100 text-sage-600' : 'bg-cream text-muted-gray hover:bg-sage-50 hover:text-sage-600'
                        }`}
                      >
                        {ev.published ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                        <span className="hidden sm:inline">{ev.published ? 'Published' : 'Publish'}</span>
                      </button>
                      <button
                        onClick={() => { setEditingEvent(ev); setShowEventForm(true); }}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-inter font-medium bg-cream text-muted-gray hover:bg-forest-50 hover:text-forest-500 transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Edit</span>
                      </button>
                      <button
                        onClick={() => deleteEvent(ev.id)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-inter font-medium bg-cream text-muted-gray hover:bg-red-50 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
                {events.length === 0 && (
                  <div className="text-center py-16">
                    <CalendarDays className="w-12 h-12 text-muted-gray mx-auto mb-3 opacity-30" />
                    <p className="text-muted-gray font-inter text-sm">No events yet. Add your first event!</p>
                  </div>
                )}
              </div>

              {/* FAB on mobile */}
              <button
                onClick={() => { setEditingEvent(null); setShowEventForm(true); }}
                className="lg:hidden fixed bottom-20 right-4 w-14 h-14 bg-golden-500 text-white rounded-full shadow-golden flex items-center justify-center z-20 hover:bg-golden-600 transition-colors"
                aria-label="New event"
              >
                <Plus className="w-6 h-6" />
              </button>
            </div>
          )}

          {/* ── Announcements ── */}
          {activeTab === 'announcements' && (
            <div>
              <h1 className="hidden lg:block font-poppins font-700 text-2xl text-forest-500 mb-1">Announcements</h1>
              <p className="hidden lg:block text-muted-gray font-inter text-sm mb-6">Closures and schedule changes shown to families on the site.</p>
              <div className="max-w-2xl">
                <AdminAnnouncementForm />
              </div>
            </div>
          )}

          {/* ── Photo Gallery ── */}
          {activeTab === 'gallery' && (
            <div>
              <div className="hidden lg:flex items-center justify-between mb-6">
                <h1 className="font-poppins font-700 text-2xl text-forest-500">Photo Gallery</h1>
                <button onClick={() => { setEditingPhoto(null); setShowGalleryForm(true); }} className="btn-primary flex items-center gap-2 text-sm">
                  <Plus className="w-4 h-4" /> Add Photo
                </button>
              </div>

              {/* Gallery form modal */}
              {showGalleryForm && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center">
                  <div className="bg-white w-full sm:max-w-lg sm:rounded-3xl sm:m-6 rounded-t-3xl shadow-2xl flex flex-col max-h-[95vh] sm:max-h-[90vh]">
                    <div className="flex items-center justify-between px-5 py-4 border-b border-cream-100 flex-shrink-0">
                      <h2 className="font-poppins font-700 text-lg text-forest-500">
                        {editingPhoto ? 'Edit Photo' : 'Add Gallery Photo'}
                      </h2>
                      <button onClick={() => setShowGalleryForm(false)} className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-gray hover:text-charcoal hover:bg-cream transition-colors">
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="overflow-y-auto flex-1">
                      <AdminGalleryForm
                        photo={editingPhoto}
                        onSave={() => { setShowGalleryForm(false); loadAll(); }}
                        onCancel={() => setShowGalleryForm(false)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Photo grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {photos.map((photo) => (
                  <div key={photo.id} className="bg-white rounded-2xl overflow-hidden border border-cream-100 shadow-soft">
                    {/* Thumbnail */}
                    <div className="aspect-[16/10] overflow-hidden bg-cream-100">
                      <img
                        src={photo.image_url}
                        alt={photo.title || 'Gallery photo'}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    {/* Info */}
                    <div className="p-3">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className="font-inter text-xs text-muted-gray">#{photo.display_order}</span>
                            {!photo.published && (
                              <span className="bg-cream-100 text-muted-gray text-xs font-inter px-2 py-0.5 rounded-full">Draft</span>
                            )}
                          </div>
                          {photo.title && (
                            <p className="font-poppins font-600 text-forest-500 text-sm leading-snug truncate">{photo.title}</p>
                          )}
                          {photo.caption && (
                            <p className="text-muted-gray font-inter text-xs mt-0.5 line-clamp-2">{photo.caption}</p>
                          )}
                        </div>
                      </div>
                      {/* Actions */}
                      <div className="flex gap-1.5 pt-2 border-t border-cream-100">
                        <button
                          onClick={() => togglePhotoPublished(photo)}
                          title={photo.published ? 'Unpublish' : 'Publish'}
                          className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-xl text-xs font-inter font-medium transition-colors ${
                            photo.published ? 'bg-sage-100 text-sage-600' : 'bg-cream text-muted-gray hover:bg-sage-50 hover:text-sage-600'
                          }`}
                        >
                          {photo.published ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                          <span className="hidden sm:inline">{photo.published ? 'Live' : 'Draft'}</span>
                        </button>
                        <button
                          onClick={() => { setEditingPhoto(photo); setShowGalleryForm(true); }}
                          className="flex-1 flex items-center justify-center gap-1 py-2 rounded-xl text-xs font-inter font-medium bg-cream text-muted-gray hover:bg-forest-50 hover:text-forest-500 transition-colors"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Edit</span>
                        </button>
                        <button
                          onClick={() => deletePhoto(photo.id)}
                          className="flex-1 flex items-center justify-center gap-1 py-2 rounded-xl text-xs font-inter font-medium bg-cream text-muted-gray hover:bg-red-50 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {photos.length === 0 && (
                <div className="text-center py-16">
                  <Images className="w-12 h-12 text-muted-gray mx-auto mb-3 opacity-30" />
                  <p className="text-muted-gray font-inter text-sm">No photos yet. Add your first photo!</p>
                </div>
              )}

              {/* FAB on mobile */}
              <button
                onClick={() => { setEditingPhoto(null); setShowGalleryForm(true); }}
                className="lg:hidden fixed bottom-20 right-4 w-14 h-14 bg-golden-500 text-white rounded-full shadow-golden flex items-center justify-center z-20 hover:bg-golden-600 transition-colors"
                aria-label="Add photo"
              >
                <Plus className="w-6 h-6" />
              </button>
            </div>
          )}
        </div>
      </main>

      {/* ── Mobile Bottom Tab Bar ── */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-cream-100 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div className="grid grid-cols-9 h-16">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center gap-0.5 relative transition-colors ${
                activeTab === item.id ? 'text-forest-500' : 'text-muted-gray hover:text-forest-400'
              }`}
            >
              <div className="relative">
                <item.icon className="w-5 h-5" />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-golden-500 text-white text-[9px] font-medium rounded-full w-4 h-4 flex items-center justify-center leading-none">
                    {item.badge > 9 ? '9+' : item.badge}
                  </span>
                )}
              </div>
              <span className="text-[9px] font-inter font-medium leading-none">{item.shortLabel}</span>
              {activeTab === item.id && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-forest-500 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
