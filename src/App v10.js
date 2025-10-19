import React, { useState, useCallback, useEffect } from 'react';
import { Menu, X, Facebook, Instagram, MapPin, Camera, Mail, User, Edit, Trash2, Plus, Youtube, Newspaper, Pencil, ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react';import { Twitter as XIcon } from 'lucide-react';

// ===== COMPONENT AD BANNER =====
const AdBanner = ({ slot = "test", format = "auto", isTest = true }) => {
  if (isTest) {
    return (
      <div className="my-8 flex justify-center">
        <div className="bg-gradient-to-r from-gray-800 to-gray-700 border-2 border-yellow-400 rounded-lg p-6 max-w-4xl w-full">
          <div className="text-center">
            <p className="text-yellow-400 font-bold text-lg mb-2">🎯 TEST AD</p>
            <p className="text-gray-300 text-sm mb-4">Slot: {slot} | Format: {format}</p>
            <div className="bg-gray-900 rounded p-8 text-gray-400">
              <p className="text-2xl mb-2">📢 Ad Placement</p>
              <p className="text-sm">In production, a real Google AdSense ad will appear here</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="my-8 flex justify-center">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-1234567890123456"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
};

// ===== COMPONENT PAGINATION =====
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center space-x-2 my-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-2 rounded-lg ${currentPage === 1 ? 'bg-gray-800 text-gray-600 cursor-not-allowed' : 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black hover:shadow-lg'}`}
      >
        <ChevronLeft size={20} />
      </button>

      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          disabled={page === '...'}
          className={`px-4 py-2 rounded-lg font-bold ${page === currentPage ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black' : page === '...' ? 'bg-transparent text-gray-400 cursor-default' : 'bg-gray-800 text-white hover:bg-gray-700'}`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-lg ${currentPage === totalPages ? 'bg-gray-800 text-gray-600 cursor-not-allowed' : 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black hover:shadow-lg'}`}
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

// ===== COMPONENT LOGIN =====
const LoginPage = ({ username, setUsername, password, setPassword, onLogin }) => (
  <div className="px-4 max-w-md mx-auto">
    <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-lg shadow-2xl">
      <h1 className="text-3xl font-bold mb-8 text-white flex items-center justify-center">
        <User className="mr-3 text-yellow-400" />
        Admin
      </h1>
      <div className="space-y-6">
        <div>
          <label className="block text-gray-300 mb-2">Email</label>
          <input
            type="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onLogin()}
            placeholder="admin@dlpworks.com"
            className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
        <div>
          <label className="block text-gray-300 mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onLogin()}
            placeholder="••••••••"
            className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
        <button
          onClick={onLogin}
          className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold py-3 rounded-lg hover:shadow-lg hover:shadow-yellow-400/50 transition-all"
        >
          Sign In
        </button>
        <p className="text-xs text-gray-500 text-center">
          Demo: admin@dlpworks.com / dlpworks2025
        </p>
      </div>
    </div>
  </div>
);

// ===== MAIN COMPONENT =====
const DLPWorksSite = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [newsPage, setNewsPage] = useState(1);
  const [articlesPage, setArticlesPage] = useState(1);
  const ITEMS_PER_PAGE = 10;
  const [mapHeight, setMapHeight] = useState(500);


  const ThreadsIcon = ({ size = 24, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 192 192" fill="currentColor" className={className}>
      <path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883Z"/>
    </svg>
  );

  const [news, setNews] = useState([
    { id: 1, title: "New attraction announced", date: "2025-10-01", tweet: "1910969757756449015", content: "Disneyland Paris announces a new attraction..." },
    { id: 2, title: "Castle renovation", date: "2025-09-28", tweet: "1721163361692327977", content: "Renovation work is progressing..." },
    { id: 3, title: "Halloween at Disneyland", date: "2025-09-25", tweet: "1910969757756449015", content: "Discover Halloween novelties..." },
    { id: 4, title: "New shows", date: "2025-09-20", tweet: "1721163361692327977", content: "Magical shows arrive..." },
    { id: 5, title: "New restaurant opening", date: "2025-09-15", tweet: "1910969757756449015", content: "A gourmet restaurant opens its doors..." },
    { id: 6, title: "Lion King Festival", date: "2025-09-10", tweet: "1721163361692327977", content: "Celebrate the Lion King with us..." },
    { id: 7, title: "Princess Parade", date: "2025-09-05", tweet: "1910969757756449015", content: "A magical parade arrives..." },
    { id: 8, title: "Marvel Festival", date: "2025-08-30", tweet: "1721163361692327977", content: "Superheroes invade the park..." },
    { id: 9, title: "Star Wars shop", date: "2025-08-25", tweet: "1910969757756449015", content: "Discover the galaxy..." },
    { id: 10, title: "Disney Concert", date: "2025-08-20", tweet: "1721163361692327977", content: "An exceptional concert..." },
    { id: 11, title: "Mickey meeting", date: "2025-08-15", tweet: "1910969757756449015", content: "Mickey awaits you..." },
    { id: 12, title: "Spectacular fireworks", date: "2025-08-10", tweet: "1721163361692327977", content: "The biggest fireworks of the year..." }
  ]);

  const [aerialViews, setAerialViews] = useState([
    { id: 1, title: "Castle View", date: "2025-09-30", image: "https://media.disneylandparis.com/d4th/fr-fr/images/n033755_2027jun24_world_main-street-usa-castle_2-1_tcm808-270423.jpg?w=1200&f=webp" },
    { id: 2, title: "Avengers Campus", date: "2025-09-25", image: "https://media.disneylandparis.com/d4th/fr-fr/images/hd16242_2050dec31_world_avengers-campus-key-visual_16-9_tcm808-236755.jpg?w=960" }
  ]);

  const [articles, setArticles] = useState([
    { id: 1, title: "History of Disneyland Paris", date: "2025-09-20", content: "Since its opening in 1992, Disneyland Paris has continued to evolve...", image: "https://cdn1.parksmedia.wdprapps.disney.com/media/blog/wp-content/uploads/2024/04/fghgfaghgfasghjhgasghjhgfsa.jpg", fullContent: "Since its opening in 1992, Disneyland Paris has fascinated millions of visitors." },
    { id: 2, title: "Imagineers Secrets", date: "2025-09-15", content: "Discover the creation process of attractions...", image: "https://news.disneylandparis.com//app/uploads/2025/04/Adventure-Way-4-2-scaled.jpeg", fullContent: "Imagineers are the creators of magic behind every attraction." },
    { id: 3, title: "Classic attractions", date: "2025-09-10", content: "Classic attractions are part of the park's DNA...", image: "https://cdn1.parksmedia.wdprapps.disney.com/media/blog/wp-content/uploads/2024/04/fghgfaghgfasghjhgasghjhgfsa.jpg", fullContent: "These timeless attractions have delighted generations." },
    { id: 4, title: "Christmas Magic", date: "2025-09-05", content: "The park transforms into a winter wonderland...", image: "https://news.disneylandparis.com//app/uploads/2025/04/Adventure-Way-4-2-scaled.jpeg", fullContent: "Christmas at Disneyland Paris is a unique experience." },
    { id: 5, title: "Park Restaurants", date: "2025-08-30", content: "Complete guide to dining options...", image: "https://cdn1.parksmedia.wdprapps.disney.com/media/blog/wp-content/uploads/2024/04/fghgfaghgfasghjhgasghjhgfsa.jpg", fullContent: "Gastronomy is part of the Disney experience." },
    { id: 6, title: "Disney Hotels", date: "2025-08-25", content: "Stay in the magic with themed hotels...", image: "https://news.disneylandparis.com//app/uploads/2025/04/Adventure-Way-4-2-scaled.jpeg", fullContent: "Disney hotels offer total immersion in magic." },
    { id: 7, title: "Visitor Tips", date: "2025-08-20", content: "Tips to make the most of your visit...", image: "https://cdn1.parksmedia.wdprapps.disney.com/media/blog/wp-content/uploads/2024/04/fghgfaghgfasghjhgasghjhgfsa.jpg", fullContent: "Good preparation is key to a successful visit." },
    { id: 8, title: "Must-see shows", date: "2025-08-15", content: "Guide to shows and parades...", image: "https://news.disneylandparis.com//app/uploads/2025/04/Adventure-Way-4-2-scaled.jpeg", fullContent: "Shows are at the heart of the Disney experience." },
    { id: 9, title: "Walt Disney Studios Park", date: "2025-08-10", content: "Evolution of the second park...", image: "https://cdn1.parksmedia.wdprapps.disney.com/media/blog/wp-content/uploads/2024/04/fghgfaghgfasghjhgasghjhgfsa.jpg", fullContent: "Walt Disney Studios Park has undergone many transformations." },
    { id: 10, title: "Disney Shops", date: "2025-08-05", content: "Shopping guide at Disneyland Paris...", image: "https://news.disneylandparis.com//app/uploads/2025/04/Adventure-Way-4-2-scaled.jpeg", fullContent: "Shopping is part of the magical experience." },
    { id: 11, title: "Special events", date: "2025-07-30", content: "Marathon, private evenings, festivals...", image: "https://cdn1.parksmedia.wdprapps.disney.com/media/blog/wp-content/uploads/2024/04/fghgfaghgfasghjhgasghjhgfsa.jpg", fullContent: "Disneyland Paris regularly organizes unique events." },
    { id: 12, title: "30 years of magic", date: "2025-07-25", content: "30 years of emotions and memories...", image: "https://news.disneylandparis.com//app/uploads/2025/04/Adventure-Way-4-2-scaled.jpeg", fullContent: "In 2022, Disneyland Paris celebrated 30 years." }
  ]);

  const handleLogin = useCallback(() => {
    if (username === 'admin@dlpworks.com' && password === 'dlpworks2025') {
      setIsAdmin(true);
      setCurrentPage('admin-dashboard');
      alert('Login successful!');
    } else {
      alert('Incorrect credentials');
    }
  }, [username, password]);

  const NavBar = () => (
    <nav className="bg-black text-white fixed w-full top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
			<div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentPage('home')}>
			<img 
				src="https://i.ibb.co/Z6q3W8Mv/LOGO-alphabackground.png" 
				alt="DLP Works Logo" 
				className="w-10 h-10 rounded-full object-cover shadow-lg" 
				onError={(e) => e.target.style.display = 'none'} 
			/>
			  <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
				DLP Works
			  </span>
			</div>
          
          <div className="hidden md:flex space-x-6">
            <button onClick={() => setCurrentPage('home')} className={`hover:text-yellow-400 ${currentPage === 'home' ? 'text-yellow-400' : ''}`}>Home</button>
            <button onClick={() => setCurrentPage('map')} className={`hover:text-yellow-400 ${currentPage === 'map' ? 'text-yellow-400' : ''}`}>Map</button>
            <button onClick={() => setCurrentPage('news')} className={`hover:text-yellow-400 ${currentPage === 'news' ? 'text-yellow-400' : ''}`}>News</button>
            <button onClick={() => setCurrentPage('aerial')} className={`hover:text-yellow-400 ${currentPage === 'aerial' ? 'text-yellow-400' : ''}`}>Photos</button>
            <button onClick={() => setCurrentPage('articles')} className={`hover:text-yellow-400 ${currentPage === 'articles' ? 'text-yellow-400' : ''}`}>Articles</button>
            <button onClick={() => setCurrentPage('contact')} className={`hover:text-yellow-400 ${currentPage === 'contact' ? 'text-yellow-400' : ''}`}>Contact</button>
            {isAdmin ? (
              <>
                <button onClick={() => setCurrentPage('admin-dashboard')} className={`hover:text-yellow-400 ${currentPage === 'admin-dashboard' ? 'text-yellow-400' : ''}`}>Admin</button>
                <button onClick={() => { setIsAdmin(false); setCurrentPage('home'); }} className="text-yellow-400 hover:text-yellow-300">Logout</button>
              </>
            ) : (
              <button onClick={() => setCurrentPage('login')} className={`hover:text-yellow-400 ${currentPage === 'login' ? 'text-yellow-400' : ''}`}>Admin</button>
            )}
          </div>
          
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );

  const HomePage = () => {
    useEffect(() => {
      if (!window.twttr) {
        const script = document.createElement('script');
        script.src = 'https://platform.twitter.com/widgets.js';
        script.async = true;
        document.body.appendChild(script);
      } else if (window.twttr && window.twttr.widgets) {
        window.twttr.widgets.load();
      }
    }, []);

    return (
      <div className="space-y-16">
        <section className="text-center py-20 bg-gradient-to-b from-black via-gray-900 to-black">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400 bg-clip-text text-transparent animate-pulse">
            DLP Works
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8 px-4">
            The passionate community following Disneyland Paris behind the scenes
          </p>
          
          <div className="flex justify-center space-x-6">
            <a href="https://x.com/DLPWorks" target="_blank" rel="noopener noreferrer" className="transform hover:scale-110 transition-transform">
              <XIcon size={32} className="text-white hover:text-yellow-400" />
            </a>
            <a href="https://www.facebook.com/Dlp.works" target="_blank" rel="noopener noreferrer" className="transform hover:scale-110 transition-transform">
              <Facebook size={32} className="text-white hover:text-yellow-400" />
            </a>
            <a href="https://www.instagram.com/dlp.works/" target="_blank" rel="noopener noreferrer" className="transform hover:scale-110 transition-transform">
              <Instagram size={32} className="text-white hover:text-yellow-400" />
            </a>
            <a href="https://www.threads.net/@dlp.works" target="_blank" rel="noopener noreferrer" className="transform hover:scale-110 transition-transform">
              <ThreadsIcon size={32} className="text-white hover:text-yellow-400" />
            </a>
            <a href="https://www.youtube.com/@DLPWorks" target="_blank" rel="noopener noreferrer" className="transform hover:scale-110 transition-transform">
              <Youtube size={32} className="text-white hover:text-yellow-400" />
            </a>
          </div>
        </section>

        <AdBanner slot="1234567890" format="horizontal" isTest={true} />

        <section className="px-4 max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-white flex items-center">
            <Newspaper className="mr-3 text-yellow-400" />
            Latest News
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {news.slice(0, 2).map(item => (
              <div key={item.id} onClick={() => setCurrentPage('news')} className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-lg shadow-2xl hover:shadow-yellow-400/20 transition-all transform hover:-translate-y-2 cursor-pointer">
                <h3 className="text-2xl font-bold text-yellow-400 mb-2">{item.title}</h3>
                <p className="text-gray-400 mb-4">{item.date}</p>
                <p className="text-gray-300 mb-4">{item.content}</p>
                {item.tweet && (
                  <div className="mt-6 twitter-embed-container" data-theme="dark">
                    <blockquote className="twitter-tweet" data-width="550">
                      <a href={`https://twitter.com/x/status/${item.tweet}`}>Loading tweet...</a>
                    </blockquote>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <AdBanner slot="2345678901" format="auto" isTest={true} />

        <section className="px-4 max-w-7xl mx-auto pb-16">
          <h2 className="text-4xl font-bold mb-8 text-white flex items-center">
            <Pencil className="mr-3 text-yellow-400" />
            Recent Articles
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {articles.slice(0, 2).map(item => (
              <div key={item.id} onClick={() => setCurrentPage('articles')} className="bg-gradient-to-br from-gray-900 to-black rounded-lg overflow-hidden shadow-2xl hover:shadow-yellow-400/20 transition-all transform hover:-translate-y-2 cursor-pointer">
                <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-yellow-400 mb-2">{item.title}</h3>
                  <p className="text-gray-400 mb-4">{item.date}</p>
                  <p className="text-gray-300">{item.content}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <AdBanner slot="3456789012" format="horizontal" isTest={true} />
      </div>
    );
  };

const MapPage = () => {
  const handleResize = (direction) => {
    if (direction === 'up') {
      setMapHeight(Math.min(mapHeight + 100, 1000));
    } else {
      setMapHeight(Math.max(mapHeight - 100, 300));
    }
  };

  const mapHTML = `
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Interactive Map - Disneyland Paris</title>
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" crossorigin=""/>
  <style>
    html, body { margin:0; padding:0; height:100%; background:#e0e0e0; }
    #map { width:100%; height:100%; }
  </style>
</head>
<body>
<div id="map"></div>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script>
const TILE_ROOT = 'https://media.disneylandparis.com/mapTiles/images';
const MIN_Z = 14;
const MAX_Z = 20;
const TILE_SIZE = 256;

const map = L.map('map', {
  minZoom: MIN_Z,
  maxZoom: MAX_Z,
  center: [48.8722, 2.7758],
  zoom: 16,
  attributionControl: true
});

const southWest = L.latLng(48.85, 2.74);
const northEast = L.latLng(48.89, 2.81);
const bounds = L.latLngBounds(southWest, northEast);
map.setMaxBounds(bounds);

const fallbackTile = "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(\`
  <svg xmlns='http://www.w3.org/2000/svg' width='256' height='256'>
    <rect width='100%' height='100%' fill='#fdf6ff'/>
    <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='20' fill='#a07acc' font-family='Verdana'>✨ Disney ✨</text>
  </svg>\`);

const disneyLayer = L.tileLayer(\`\${TILE_ROOT}/{z}/{x}/{y}.jpg\`, {
  minZoom: MIN_Z,
  maxZoom: MAX_Z,
  tileSize: TILE_SIZE,
  noWrap: true,
  errorTileUrl: fallbackTile
});

disneyLayer.addTo(map);
</script>
</body>
</html>
  `;

  return (
    <div className="px-4 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-white flex items-center">
        <MapPin className="mr-3 text-yellow-400" />
        Interactive Map of Disneyland Paris
      </h1>
      
      <AdBanner slot="4567890123" format="horizontal" isTest={true} />
      
      <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-lg shadow-2xl">
        <div className="flex gap-2 mb-4 justify-end">
          <button 
            onClick={() => handleResize('up')} 
            className="p-2 bg-yellow-400 text-black rounded hover:bg-yellow-500 transition-colors"
            title="Enlarge map"
          >
            <Maximize2 size={20} />
          </button>
          <button 
            onClick={() => handleResize('down')} 
            className="p-2 bg-yellow-400 text-black rounded hover:bg-yellow-500 transition-colors"
            title="Shrink map"
          >
            <Minimize2 size={20} />
          </button>
        </div>
        <div className="bg-gray-800 rounded-lg overflow-hidden" style={{ height: `${mapHeight}px` }}>
          <iframe
            srcDoc={mapHTML}
            style={{ width: '100%', height: '100%', border: 'none' }}
            title="Interactive Map Disneyland Paris"
          />
        </div>
      </div>
      
      <AdBanner slot="5678901234" format="auto" isTest={true} />
    </div>
  );
};

  const NewsPage = () => {
    const totalPages = Math.ceil(news.length / ITEMS_PER_PAGE);
    const startIndex = (newsPage - 1) * ITEMS_PER_PAGE;
    const currentNews = news.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    useEffect(() => {
      if (!window.twttr) {
        const script = document.createElement('script');
        script.src = 'https://platform.twitter.com/widgets.js';
        script.async = true;
        document.body.appendChild(script);
      } else if (window.twttr && window.twttr.widgets) {
        window.twttr.widgets.load();
      }
    }, []);

    return (
      <div className="px-4 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-white flex items-center">
          <Newspaper className="mr-3 text-yellow-400" />
          News ({news.length} total)
        </h1>
        
        <AdBanner slot="6789012345" format="horizontal" isTest={true} />
        
        <div className="space-y-6">
          {currentNews.map(item => (
            <div key={item.id} className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-lg shadow-2xl">
              <h2 className="text-2xl font-bold text-yellow-400 mb-2">{item.title}</h2>
              <p className="text-gray-400 mb-4">{item.date}</p>
              <p className="text-gray-300 mb-4">{item.content}</p>
              {item.tweet && (
                <div className="mt-6 twitter-embed-container" data-theme="dark">
                  <blockquote className="twitter-tweet" data-width="550">
                    <a href={`https://twitter.com/x/status/${item.tweet}`}>Loading tweet...</a>
                  </blockquote>
                </div>
              )}
            </div>
          ))}
        </div>

        {totalPages > 1 && <Pagination currentPage={newsPage} totalPages={totalPages} onPageChange={setNewsPage} />}
        
        <AdBanner slot="7890123456" format="horizontal" isTest={true} />
      </div>
    );
  };

  const ArticlesPage = () => {
    const totalPages = Math.ceil(articles.length / ITEMS_PER_PAGE);
    const startIndex = (articlesPage - 1) * ITEMS_PER_PAGE;
    const currentArticles = articles.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
      <>
        <div className="px-4 max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-white flex items-center">
            <Pencil className="mr-3 text-yellow-400" />
            Articles ({articles.length} total)
          </h1>
          
          <AdBanner slot="0123456789" format="horizontal" isTest={true} />
          
          <div className="space-y-8">
            {currentArticles.map(item => (
              <div key={item.id} onClick={() => setSelectedArticle(item)} className="bg-gradient-to-br from-gray-900 to-black rounded-lg overflow-hidden shadow-2xl hover:shadow-yellow-400/20 transition-all transform hover:-translate-y-2 cursor-pointer">
                <img src={item.image} alt={item.title} className="w-full h-64 object-cover" />
                <div className="p-6">
                  <h2 className="text-3xl font-bold text-yellow-400 mb-2">{item.title}</h2>
                  <p className="text-gray-400 mb-4">{item.date}</p>
                  <p className="text-gray-300">{item.content}</p>
                  <p className="text-yellow-400 mt-4">Click to read full article →</p>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && <Pagination currentPage={articlesPage} totalPages={totalPages} onPageChange={setArticlesPage} />}
          
          <AdBanner slot="1234567890" format="horizontal" isTest={true} />
        </div>

        {selectedArticle && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 overflow-y-auto" onClick={() => setSelectedArticle(null)}>
            <div className="min-h-screen py-8 px-4">
              <div className="max-w-4xl mx-auto bg-gradient-to-br from-gray-900 to-black rounded-lg overflow-hidden" onClick={(e) => e.stopPropagation()}>
                <button onClick={() => setSelectedArticle(null)} className="absolute top-4 right-4 text-white hover:text-yellow-400 transition-colors z-10">
                  <X size={40} />
                </button>
                <img src={selectedArticle.image} alt={selectedArticle.title} className="w-full h-96 object-cover" />
                <div className="p-8">
                  <h1 className="text-4xl font-bold text-yellow-400 mb-4">{selectedArticle.title}</h1>
                  <p className="text-gray-400 mb-6">{selectedArticle.date}</p>
                  <div className="text-gray-300 text-lg leading-relaxed prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: selectedArticle.fullContent.replace(/\n/g, '<br />') }} />
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  const AerialPage = () => (
    <>
      <div className="px-4 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-white flex items-center">
          <Camera className="mr-3 text-yellow-400" />
          Aerial Views
        </h1>
        
        <AdBanner slot="8901234567" format="horizontal" isTest={true} />
        
        <div className="grid md:grid-cols-2 gap-6">
          {aerialViews.map(item => (
            <div key={item.id} onClick={() => setSelectedImage(item)} className="group relative overflow-hidden rounded-lg shadow-2xl cursor-pointer">
              <img src={item.image} alt={item.title} className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold text-yellow-400">{item.title}</h3>
                  <p className="text-gray-300">{item.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <AdBanner slot="9012345678" format="auto" isTest={true} />
      </div>

      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
          <button onClick={() => setSelectedImage(null)} className="absolute top-4 right-4 text-white hover:text-yellow-400 transition-colors">
            <X size={40} />
          </button>
          <div className="max-w-7xl max-h-full">
            <img src={selectedImage.image} alt={selectedImage.title} className="max-w-full max-h-[90vh] object-contain" />
            <div className="text-center mt-4">
              <h3 className="text-2xl font-bold text-yellow-400">{selectedImage.title}</h3>
              <p className="text-gray-300">{selectedImage.date}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );

  const ContactPage = () => (
    <div className="px-4 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-white flex items-center">
        <Mail className="mr-3 text-yellow-400" />
        Contact & Legal
      </h1>
      
      <AdBanner slot="2345678901" format="horizontal" isTest={true} />
      
      <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-lg shadow-2xl space-y-6 text-gray-300">
        <section>
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">About DLP Works</h2>
          <p>DLP Works is a community of passionate fans following the evolution of Disneyland Paris.</p>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">Legal Information</h2>
          <p className="mb-2"><strong>Name :</strong> DLP Works</p>
          <p className="mb-2"><strong>Contact :</strong> contact@dlpworks.com</p>
          <p className="mb-2"><strong>Host :</strong> Netlify</p>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">Intellectual Property</h2>
          <p>This site is managed by fans and is not affiliated with The Walt Disney Company or Disneyland Paris.</p>
        </section>
      </div>
      
      <AdBanner slot="3456789012" format="auto" isTest={true} />
    </div>
  );

  const AdminDashboard = () => (
    <div className="px-4 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-white">Admin Dashboard</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <button onClick={() => setCurrentPage('admin-map')} className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-lg shadow-2xl hover:shadow-yellow-400/20 transition-all transform hover:-translate-y-2">
          <div className="text-yellow-400 mb-4 text-3xl"><MapPin size={32} /></div>
          <h3 className="text-xl font-bold text-white mb-2">Map</h3>
          <p className="text-gray-400">Manage map annotations</p>
        </button>
        <button onClick={() => setCurrentPage('admin-news')} className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-lg shadow-2xl hover:shadow-yellow-400/20 transition-all transform hover:-translate-y-2">
          <div className="text-yellow-400 mb-4 text-3xl"><Newspaper size={32} /></div>
          <h3 className="text-xl font-bold text-white mb-2">News</h3>
          <p className="text-gray-400">Add and manage news</p>
        </button>
        <button onClick={() => setCurrentPage('admin-aerial')} className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-lg shadow-2xl hover:shadow-yellow-400/20 transition-all transform hover:-translate-y-2">
          <div className="text-yellow-400 mb-4 text-3xl"><Camera size={32} /></div>
          <h3 className="text-xl font-bold text-white mb-2">Aerial Views</h3>
          <p className="text-gray-400">Manage photos</p>
        </button>
        <button onClick={() => setCurrentPage('admin-articles')} className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-lg shadow-2xl hover:shadow-yellow-400/20 transition-all transform hover:-translate-y-2">
          <div className="text-yellow-400 mb-4 text-3xl"><Pencil size={32} /></div>
          <h3 className="text-xl font-bold text-white mb-2">Articles</h3>
          <p className="text-gray-400">Write and manage articles</p>
        </button>
      </div>
    </div>
  );

const [mapAnnotations, setMapAnnotations] = useState([
  { id: 1, lat: 48.8722, lng: 2.7758, title: "Magic Kingdom", description: "The main park", type: "attraction", photo: null, tweetLink: null },
]);

	const AdminMap = () => {
	  const [newTitle, setNewTitle] = useState('');
	  const [newDescription, setNewDescription] = useState('');
	  const [newLat, setNewLat] = useState('48.8722');
	  const [newLng, setNewLng] = useState('2.7758');
	  const [newType, setNewType] = useState('attraction');
	  const [newPhoto, setNewPhoto] = useState('');
	  const [newTweetLink, setNewTweetLink] = useState('');
	  const [editingId, setEditingId] = useState(null);

	  const saveAnnotation = () => {
		if (!newTitle || !newLat || !newLng) {
		  alert('Please fill in title, latitude, and longitude');
		  return;
		}
		if (editingId) {
		  setMapAnnotations(mapAnnotations.map(a => 
			a.id === editingId 
			  ? { ...a, title: newTitle, description: newDescription, lat: parseFloat(newLat), lng: parseFloat(newLng), type: newType, photo: newPhoto || null, tweetLink: newTweetLink || null } 
			  : a
		  ));
		  setEditingId(null);
		} else {
		  setMapAnnotations([
			{ id: Date.now(), title: newTitle, description: newDescription, lat: parseFloat(newLat), lng: parseFloat(newLng), type: newType, photo: newPhoto || null, tweetLink: newTweetLink || null }, 
			...mapAnnotations
		  ]);
		}
		setNewTitle('');
		setNewDescription('');
		setNewLat('48.8722');
		setNewLng('2.7758');
		setNewType('attraction');
		setNewPhoto('');
		setNewTweetLink('');
		alert(editingId ? 'Annotation updated!' : 'Annotation added!');
	  };

	  const deleteAnnotation = (id) => {
		if (window.confirm('Delete this annotation?')) {
		  setMapAnnotations(mapAnnotations.filter(a => a.id !== id));
		}
	  };

	  const startEdit = (item) => {
		setEditingId(item.id);
		setNewTitle(item.title);
		setNewDescription(item.description);
		setNewLat(item.lat.toString());
		setNewLng(item.lng.toString());
		setNewType(item.type);
		setNewPhoto(item.photo || '');
		setNewTweetLink(item.tweetLink || '');
	  };

	  return (
		<div className="px-4 max-w-7xl mx-auto">
		  <h1 className="text-4xl font-bold text-white mb-6">Manage Map Annotations</h1>
		  <div className="bg-gray-800 p-6 rounded-lg space-y-4 mb-8">
			<h2 className="text-2xl font-bold text-yellow-400 mb-4">{editingId ? 'Edit Annotation' : 'Add Annotation'}</h2>
			<input 
			  type="text" 
			  placeholder="Title *" 
			  value={newTitle} 
			  onChange={(e) => setNewTitle(e.target.value)} 
			  className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400" 
			/>
			<textarea 
			  placeholder="Description" 
			  value={newDescription} 
			  onChange={(e) => setNewDescription(e.target.value)} 
			  className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg h-20 focus:outline-none focus:ring-2 focus:ring-yellow-400" 
			/>
			<div className="grid md:grid-cols-2 gap-4">
			  <input 
				type="number" 
				placeholder="Latitude *" 
				value={newLat} 
				onChange={(e) => setNewLat(e.target.value)} 
				step="0.0001" 
				className="px-4 py-2 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400" 
			  />
			  <input 
				type="number" 
				placeholder="Longitude *" 
				value={newLng} 
				onChange={(e) => setNewLng(e.target.value)} 
				step="0.0001" 
				className="px-4 py-2 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400" 
			  />
			</div>
			<select 
			  value={newType} 
			  onChange={(e) => setNewType(e.target.value)} 
			  className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
			>
			  <option value="attraction">Attraction</option>
			  <option value="restaurant">Restaurant</option>
			  <option value="shop">Shop</option>
			  <option value="event">Event</option>
			</select>
			<input 
			  type="url" 
			  placeholder="Photo URL" 
			  value={newPhoto} 
			  onChange={(e) => setNewPhoto(e.target.value)} 
			  className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400" 
			/>
			<input 
			  type="url" 
			  placeholder="Tweet Link" 
			  value={newTweetLink} 
			  onChange={(e) => setNewTweetLink(e.target.value)} 
			  className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400" 
			/>
			<div className="flex gap-2">
			  <button 
				onClick={saveAnnotation} 
				className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-6 py-3 rounded-lg flex items-center hover:shadow-lg font-bold"
			  >
				<Plus size={20} className="mr-2" />
				{editingId ? 'Update' : 'Add'}
			  </button>
			  {editingId && (
				<button 
				  onClick={() => { 
					setEditingId(null); 
					setNewTitle(''); 
					setNewDescription(''); 
					setNewLat('48.8722'); 
					setNewLng('2.7758'); 
					setNewType('attraction'); 
					setNewPhoto(''); 
					setNewTweetLink(''); 
				  }} 
				  className="bg-gray-600 text-white px-6 py-3 rounded-lg font-bold"
				>
				  Cancel
				</button>
			  )}
			</div>
		  </div>

		  <div className="space-y-4">
			<h2 className="text-2xl font-bold text-white mb-4">Existing Annotations</h2>
			{mapAnnotations.map(item => (
			  <div key={item.id} className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-lg shadow-xl flex justify-between items-start">
				<div className="flex-1">
				  <h3 className="text-xl font-bold text-yellow-400">{item.title}</h3>
				  <p className="text-gray-400 text-sm mb-2">{item.lat.toFixed(4)}, {item.lng.toFixed(4)}</p>
				  <p className="text-gray-300 text-sm mb-2">{item.description}</p>
				  <p className="text-gray-400 text-xs">Type: {item.type}</p>
				  {item.photo && <p className="text-gray-400 text-xs">Photo: {item.photo.substring(0, 50)}...</p>}
				  {item.tweetLink && <p className="text-gray-400 text-xs">Tweet: {item.tweetLink}</p>}
				</div>
				<div className="flex space-x-2 ml-4">
				  <button 
					onClick={() => startEdit(item)} 
					className="p-2 bg-gray-800 rounded hover:bg-yellow-400 hover:text-black transition-colors"
				  >
					<Edit size={20} />
				  </button>
				  <button 
					onClick={() => deleteAnnotation(item.id)} 
					className="p-2 bg-gray-800 rounded hover:bg-red-600 transition-colors"
				  >
					<Trash2 size={20} />
				  </button>
				</div>
			  </div>
			))}
		  </div>
		</div>
	  );
	};

  const AdminNews = () => {
    const [newTitle, setNewTitle] = useState('');
    const [newDate, setNewDate] = useState('');
    const [newTweet, setNewTweet] = useState('');
    const [newContent, setNewContent] = useState('');
    const [editingId, setEditingId] = useState(null);

    const saveNews = () => {
      if (!newTitle || !newContent) {
        alert('Please fill in title and content');
        return;
      }
      if (editingId) {
        setNews(news.map(n => n.id === editingId ? { ...n, title: newTitle, date: newDate || n.date, tweet: newTweet, content: newContent } : n));
        setEditingId(null);
      } else {
        setNews([{ id: Date.now(), title: newTitle, date: newDate || new Date().toISOString().split('T')[0], tweet: newTweet, content: newContent }, ...news]);
      }
      setNewTitle('');
      setNewDate('');
      setNewTweet('');
      setNewContent('');
      alert(editingId ? 'News updated!' : 'News added!');
    };

    const deleteNews = (id) => {
      if (window.confirm('Delete this news item?')) {
        setNews(news.filter(n => n.id !== id));
      }
    };

    const startEdit = (item) => {
      setEditingId(item.id);
      setNewTitle(item.title);
      setNewDate(item.date);
      setNewTweet(item.tweet || '');
      setNewContent(item.content);
    };

    return (
      <div className="px-4 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-6">Manage News</h1>
        <div className="bg-gray-800 p-6 rounded-lg space-y-4 mb-8">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">{editingId ? 'Edit News' : 'Add News'}</h2>
          <input type="text" placeholder="Title *" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400" />
          <input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400" />
          <input type="text" placeholder="Tweet ID" value={newTweet} onChange={(e) => setNewTweet(e.target.value)} className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400" />
          <textarea placeholder="Content *" value={newContent} onChange={(e) => setNewContent(e.target.value)} className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-yellow-400" />
          <div className="flex gap-2">
            <button onClick={saveNews} className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-6 py-3 rounded-lg flex items-center hover:shadow-lg font-bold">
              <Plus size={20} className="mr-2" />
              {editingId ? 'Update' : 'Add'}
            </button>
            {editingId && <button onClick={() => { setEditingId(null); setNewTitle(''); setNewDate(''); setNewTweet(''); setNewContent(''); }} className="bg-gray-600 text-white px-6 py-3 rounded-lg font-bold">Cancel</button>}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white mb-4">Existing News</h2>
          {news.map(item => (
            <div key={item.id} className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-lg shadow-xl flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-yellow-400">{item.title}</h3>
                <p className="text-gray-400 mb-2">{item.date}</p>
                <p className="text-gray-300">{item.content.substring(0, 100)}...</p>
              </div>
              <div className="flex space-x-2 ml-4">
                <button onClick={() => startEdit(item)} className="p-2 bg-gray-800 rounded hover:bg-yellow-400 hover:text-black transition-colors">
                  <Edit size={20} />
                </button>
                <button onClick={() => deleteNews(item.id)} className="p-2 bg-gray-800 rounded hover:bg-red-600 transition-colors">
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const AdminAerial = () => {
    const [newTitle, setNewTitle] = useState('');
    const [newDate, setNewDate] = useState('');
    const [newImage, setNewImage] = useState('');
    const [editingId, setEditingId] = useState(null);

    const saveAerial = () => {
      if (!newTitle || !newImage) {
        alert('Please fill in title and image URL');
        return;
      }
      if (editingId) {
        setAerialViews(aerialViews.map(a => a.id === editingId ? { ...a, title: newTitle, date: newDate || a.date, image: newImage } : a));
        setEditingId(null);
      } else {
        setAerialViews([{ id: Date.now(), title: newTitle, date: newDate || new Date().toISOString().split('T')[0], image: newImage }, ...aerialViews]);
      }
      setNewTitle('');
      setNewDate('');
      setNewImage('');
      alert(editingId ? 'Photo updated!' : 'Photo added!');
    };

    const deleteAerial = (id) => {
      if (window.confirm('Delete this photo?')) {
        setAerialViews(aerialViews.filter(a => a.id !== id));
      }
    };

    const startEdit = (item) => {
      setEditingId(item.id);
      setNewTitle(item.title);
      setNewDate(item.date);
      setNewImage(item.image);
    };

    return (
      <div className="px-4 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-6">Manage Aerial Views</h1>
        <div className="bg-gray-800 p-6 rounded-lg space-y-4 mb-8">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">{editingId ? 'Edit Photo' : 'Add Photo'}</h2>
          <input type="text" placeholder="Title *" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400" />
          <input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400" />
          <input type="url" placeholder="Image URL *" value={newImage} onChange={(e) => setNewImage(e.target.value)} className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400" />
          <div className="flex gap-2">
            <button onClick={saveAerial} className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-6 py-3 rounded-lg flex items-center hover:shadow-lg font-bold">
              <Plus size={20} className="mr-2" />
              {editingId ? 'Update' : 'Add'}
            </button>
            {editingId && <button onClick={() => { setEditingId(null); setNewTitle(''); setNewDate(''); setNewImage(''); }} className="bg-gray-600 text-white px-6 py-3 rounded-lg font-bold">Cancel</button>}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {aerialViews.map(item => (
            <div key={item.id} className="bg-gradient-to-br from-gray-900 to-black rounded-lg shadow-xl overflow-hidden">
              <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-bold text-yellow-400">{item.title}</h3>
                <p className="text-gray-400 text-sm mb-3">{item.date}</p>
                <div className="flex space-x-2">
                  <button onClick={() => startEdit(item)} className="flex-1 p-2 bg-gray-800 rounded hover:bg-yellow-400 hover:text-black transition-colors">
                    <Edit size={18} />
                  </button>
                  <button onClick={() => deleteAerial(item.id)} className="flex-1 p-2 bg-red-600 rounded hover:bg-red-700 transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const AdminArticles = () => {
    const [newTitle, setNewTitle] = useState('');
    const [newDate, setNewDate] = useState('');
    const [newContent, setNewContent] = useState('');
    const [newFullContent, setNewFullContent] = useState('');
    const [newImage, setNewImage] = useState('');
    const [editingId, setEditingId] = useState(null);

    const applyFormatting = (tag) => {
      const textarea = document.getElementById('fullContentTextarea');
      if (!textarea) return;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = newFullContent.substring(start, end);
      
      if (!selectedText) {
        alert('Please select text to format');
        return;
      }

      let formattedText = '';
      switch(tag) {
        case 'bold': formattedText = `<strong>${selectedText}</strong>`; break;
        case 'italic': formattedText = `<em>${selectedText}</em>`; break;
        case 'underline': formattedText = `<u>${selectedText}</u>`; break;
        case 'h2': formattedText = `<h2 class="text-3xl font-bold text-yellow-400 my-4">${selectedText}</h2>`; break;
        case 'h3': formattedText = `<h3 class="text-2xl font-bold text-yellow-300 my-3">${selectedText}</h3>`; break;
        default: formattedText = selectedText;
      }

      const newText = newFullContent.substring(0, start) + formattedText + newFullContent.substring(end);
      setNewFullContent(newText);
    };

    const applyColor = (color) => {
      const textarea = document.getElementById('fullContentTextarea');
      if (!textarea) return;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = newFullContent.substring(start, end);
      
      if (!selectedText) {
        alert('Please select text to color');
        return;
      }

      const formattedText = `<span style="color: ${color}">${selectedText}</span>`;
      const newText = newFullContent.substring(0, start) + formattedText + newFullContent.substring(end);
      setNewFullContent(newText);
    };

    const saveArticle = () => {
      if (!newTitle || !newContent) {
        alert('Please fill in title and content');
        return;
      }
      if (editingId) {
        setArticles(articles.map(a => a.id === editingId ? { ...a, title: newTitle, date: newDate || a.date, content: newContent, fullContent: newFullContent || newContent, image: newImage } : a));
        setEditingId(null);
      } else {
        setArticles([{ id: Date.now(), title: newTitle, date: newDate || new Date().toISOString().split('T')[0], content: newContent, fullContent: newFullContent || newContent, image: newImage }, ...articles]);
      }
      setNewTitle('');
      setNewDate('');
      setNewContent('');
      setNewFullContent('');
      setNewImage('');
      alert(editingId ? 'Article updated!' : 'Article added!');
    };

    const deleteArticle = (id) => {
      if (window.confirm('Delete this article?')) {
        setArticles(articles.filter(a => a.id !== id));
      }
    };

    const startEdit = (item) => {
      setEditingId(item.id);
      setNewTitle(item.title);
      setNewDate(item.date);
      setNewContent(item.content);
      setNewFullContent(item.fullContent || item.content);
      setNewImage(item.image || '');
    };

    return (
      <div className="px-4 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-6">Manage Articles</h1>
        <div className="bg-gray-800 p-6 rounded-lg space-y-4 mb-8">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">{editingId ? 'Edit Article' : 'Add Article'}</h2>
          <input type="text" placeholder="Title *" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400" />
          <input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400" />
          <input type="url" placeholder="Cover image URL" value={newImage} onChange={(e) => setNewImage(e.target.value)} className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400" />
          <textarea placeholder="Short summary *" value={newContent} onChange={(e) => setNewContent(e.target.value)} className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg h-24 focus:outline-none focus:ring-2 focus:ring-yellow-400" />
          
          <div className="bg-gray-900 p-3 rounded-lg">
            <p className="text-yellow-400 text-sm mb-2">Formatting tools:</p>
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={() => applyFormatting('bold')} className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 font-bold text-sm">B</button>
              <button type="button" onClick={() => applyFormatting('italic')} className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 italic text-sm">I</button>
              <button type="button" onClick={() => applyFormatting('underline')} className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 underline text-sm">U</button>
              <button type="button" onClick={() => applyFormatting('h2')} className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 text-sm font-bold">H2</button>
              <button type="button" onClick={() => applyFormatting('h3')} className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 text-sm font-bold">H3</button>
              <button type="button" onClick={() => applyColor('#f59e0b')} className="w-8 h-8 rounded" style={{ backgroundColor: '#f59e0b' }} title="Yellow" />
              <button type="button" onClick={() => applyColor('#ef4444')} className="w-8 h-8 rounded" style={{ backgroundColor: '#ef4444' }} title="Red" />
              <button type="button" onClick={() => applyColor('#3b82f6')} className="w-8 h-8 rounded" style={{ backgroundColor: '#3b82f6' }} title="Blue" />
              <button type="button" onClick={() => applyColor('#10b981')} className="w-8 h-8 rounded" style={{ backgroundColor: '#10b981' }} title="Green" />
            </div>
          </div>

          <textarea id="fullContentTextarea" placeholder="Full article content (use formatting tools above)" value={newFullContent} onChange={(e) => setNewFullContent(e.target.value)} className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg h-64 focus:outline-none focus:ring-2 focus:ring-yellow-400 font-mono text-sm" />
          <p className="text-gray-400 text-xs">💡 You can also write HTML directly - Press Enter to create line breaks</p>
          
          <div className="flex gap-2">
            <button onClick={saveArticle} className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-6 py-3 rounded-lg flex items-center hover:shadow-lg font-bold">
              <Plus size={20} className="mr-2" />
              {editingId ? 'Update' : 'Add'}
            </button>
            {editingId && <button onClick={() => { setEditingId(null); setNewTitle(''); setNewDate(''); setNewContent(''); setNewFullContent(''); setNewImage(''); }} className="bg-gray-600 text-white px-6 py-3 rounded-lg font-bold">Cancel</button>}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white mb-4">Existing Articles</h2>
          {articles.map(item => (
            <div key={item.id} className="bg-gradient-to-br from-gray-900 to-black rounded-lg shadow-xl overflow-hidden">
              <div className="flex flex-col md:flex-row">
                {item.image && <img src={item.image} alt={item.title} className="w-full md:w-48 h-48 object-cover" />}
                <div className="flex-1 p-6">
                  <h3 className="text-xl font-bold text-yellow-400 mb-2">{item.title}</h3>
                  <p className="text-gray-400 mb-3">{item.date}</p>
                  <p className="text-gray-300 mb-4">{item.content.substring(0, 100)}...</p>
                  <div className="flex space-x-2">
                    <button onClick={() => startEdit(item)} className="p-2 bg-gray-800 rounded hover:bg-yellow-400 hover:text-black transition-colors">
                      <Edit size={20} />
                    </button>
                    <button onClick={() => deleteArticle(item.id)} className="p-2 bg-gray-800 rounded hover:bg-red-600 transition-colors">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <NavBar />
      
      <main className="pt-24 pb-16">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'map' && <MapPage />}
        {currentPage === 'news' && <NewsPage />}
        {currentPage === 'aerial' && <AerialPage />}
        {currentPage === 'articles' && <ArticlesPage />}
        {currentPage === 'contact' && <ContactPage />}
        {currentPage === 'login' && !isAdmin && <LoginPage username={username} setUsername={setUsername} password={password} setPassword={setPassword} onLogin={handleLogin} />}
        {currentPage === 'admin-dashboard' && isAdmin && <AdminDashboard />}
        {currentPage === 'admin-map' && isAdmin && <AdminMap />}
        {currentPage === 'admin-news' && isAdmin && <AdminNews />}
        {currentPage === 'admin-aerial' && isAdmin && <AdminAerial />}
        {currentPage === 'admin-articles' && isAdmin && <AdminArticles />}
      </main>
      
      <footer className="bg-black border-t border-gray-800 py-8 text-center text-gray-400">
        <p>&copy; 2025 DLP Works - Community of Disney Fans</p>
      </footer>
    </div>
  );
};

export default DLPWorksSite;