// ===== IMPORTS =====
import React, { useState, useCallback, useEffect } from 'react';
// Import des icônes de lucide-react pour l'interface
import { Menu, X, Facebook, Instagram, MapPin, Camera, FileText, Mail, User, LogOut, Edit, Trash2, Plus, Youtube } from 'lucide-react';
// Import de l'icône X (Twitter) - renommée pour éviter les conflits avec le composant X
import { Twitter as XIcon } from 'lucide-react';

// IMPORTANT: Décommentez cette ligne quand vous aurez créé supabaseClient.js
// import { supabase } from './supabaseClient';

// ===== COMPOSANT LOGIN EXTRAIT =====
// Ce composant est extrait pour éviter les problèmes de re-render et perte de focus
const LoginPage = ({ username, setUsername, password, setPassword, onLogin }) => {
  return (
    <div className="px-4 max-w-md mx-auto">
      <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-lg shadow-2xl">
        <h1 className="text-3xl font-bold mb-8 text-white flex items-center justify-center">
          <User className="mr-3 text-yellow-400" />
          Administration
        </h1>
        <div className="space-y-6">
          {/* Champ identifiant (email) */}
          <div>
            <label className="block text-gray-300 mb-2">Identifiant (Email)</label>
            <input
              type="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => {
                // Connexion en appuyant sur Entrée
                if (e.key === 'Enter') {
                  e.preventDefault();
                  onLogin();
                }
              }}
              autoComplete="username"
              placeholder="admin@dlpworks.com"
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          
          {/* Champ mot de passe */}
          <div>
            <label className="block text-gray-300 mb-2">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                // Connexion en appuyant sur Entrée
                if (e.key === 'Enter') {
                  e.preventDefault();
                  onLogin();
                }
              }}
              autoComplete="current-password"
              placeholder="••••••••"
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          
          {/* Bouton de connexion */}
          <button
            onClick={onLogin}
            type="button"
            className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold py-3 rounded-lg hover:shadow-lg hover:shadow-yellow-400/50 transition-all"
          >
            Se connecter
          </button>
          
          {/* Indication des identifiants de démo */}
          <p className="text-xs text-gray-500 text-center">
            Demo: admin / dlpworks2025
          </p>
        </div>
      </div>
    </div>
  );
};

// ===== COMPOSANT PRINCIPAL =====
const DLPWorksSite = () => {
  // États pour la navigation
  const [currentPage, setCurrentPage] = useState('home'); // Page actuelle
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Menu mobile ouvert/fermé
  const [isAdmin, setIsAdmin] = useState(false); // Utilisateur connecté en admin
  
  // États pour les formulaires de connexion
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  // États pour les modals
  const [selectedImage, setSelectedImage] = useState(null); // Image agrandie
  const [selectedArticle, setSelectedArticle] = useState(null); // Article en lecture
  
  // États pour les données - initialement vides, seront remplis par Supabase
  const [news, setNews] = useState([
    { id: 1, title: "Nouvelle attraction annoncée", date: "2025-10-01", tweet: "https://x.com/DLPWorks/status/1910969757756449015", content: "Disneyland Paris annonce une nouvelle attraction..." },
    { id: 2, title: "Rénovation du Château", date: "2025-09-28", tweet: "https://x.com/DLPWorks/status/1721163361692327977", content: "Les travaux de rénovation avancent..." }
  ]);
  
  const [aerialViews, setAerialViews] = useState([
    { id: 1, title: "Vue du Château", date: "2025-09-30", image: "https://media.disneylandparis.com/d4th/fr-fr/images/n033755_2027jun24_world_main-street-usa-castle_2-1_tcm808-270423.jpg?w=1200&f=webp" },
    { id: 2, title: "Avengers Campus", date: "2025-09-25", image: "https://media.disneylandparis.com/d4th/fr-fr/images/hd16242_2050dec31_world_avengers-campus-key-visual_16-9_tcm808-236755.jpg?w=960" }
  ]);
  
  const [articles, setArticles] = useState([
    { id: 1, title: "L'histoire de Disneyland Paris", date: "2025-09-20", content: "Depuis son ouverture en 1992, Disneyland Paris n'a cessé d'évoluer et de faire rêver des millions de visiteurs.", image: "https://cdn1.parksmedia.wdprapps.disney.com/media/blog/wp-content/uploads/2024/04/fghgfaghgfasghjhgasghjhgfsa.jpg", fullContent: "Depuis son ouverture en 1992, Disneyland Paris n'a cessé d'évoluer...\n\nContenu complet de l'article ici..." },
    { id: 2, title: "Les secrets des Imagineers", date: "2025-09-15", content: "Découvrez les coulisses de la création des attractions et des décors féeriques de Disneyland Paris.", image: "https://news.disneylandparis.com//app/uploads/2025/04/Adventure-Way-4-2-scaled.jpeg", fullContent: "Les Imagineers sont les créateurs de magie...\n\nContenu complet de l'article ici..." }
  ]);

  // ===== FONCTION DE CONNEXION =====
  // useCallback évite la recréation de la fonction à chaque render
  const handleLogin = useCallback(() => {
    // VERSION SIMPLE (sans Supabase pour le moment)
    if (username === 'admin' && password === 'dlpworks2025') {
      setIsAdmin(true);
      setCurrentPage('admin-dashboard');
      alert('Connexion réussie !');
    } else {
      alert('Identifiants incorrects');
    }
    
    /* VERSION AVEC SUPABASE (à décommenter quand Supabase est configuré)
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: username,
        password: password,
      });

      if (error) throw error;

      setIsAdmin(true);
      setCurrentPage('admin-dashboard');
      alert('Connexion réussie !');
      
    } catch (error) {
      console.error('Erreur login:', error);
      alert('Identifiants incorrects : ' + error.message);
    }
    */
  }, [username, password]);

  // ===== BARRE DE NAVIGATION =====
  const NavBar = () => (
    <nav className="bg-black text-white fixed w-full top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo et nom du site */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentPage('home')}>
            {/* MODIFICATION: Logo DLP Works depuis Google Drive */}
            <img 
              src="https://drive.google.com/uc?export=view&id=18bjIcS8bExtr6bHP8MQu0vntmjAuXdkN" 
              alt="DLP Works Logo" 
              className="w-10 h-10 rounded-full object-cover shadow-lg"
              onError={(e) => {
                // Si l'image ne charge pas, afficher un emoji de secours
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            {/* Logo de secours si l'image Google Drive ne charge pas */}
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full items-center justify-center shadow-lg hidden">
              <span className="text-2xl">🏰</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
              DLP Works
            </span>
          </div>
          
          {/* Menu desktop */}
          <div className="hidden md:flex space-x-6">
            <NavLink page="home" label="Accueil" />
            <NavLink page="map" label="Carte Interactive" />
            <NavLink page="news" label="Actualités" />
            <NavLink page="aerial" label="Vues Aériennes" />
            <NavLink page="articles" label="Articles" />
            <NavLink page="contact" label="Contact" />
            {/* Affichage conditionnel si admin connecté */}
            {isAdmin ? (
              <>
                <NavLink page="admin-dashboard" label="Dashboard Admin" />
                <button onClick={() => { setIsAdmin(false); setCurrentPage('home'); }} className="text-yellow-400 hover:text-yellow-300 flex items-center">
                  <LogOut size={18} className="mr-1" /> Déconnexion
                </button>
              </>
            ) : (
              <NavLink page="login" label="Admin" />
            )}
          </div>
          
          {/* Bouton menu mobile */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Menu mobile déroulant */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <MobileNavLink page="home" label="Accueil" />
            <MobileNavLink page="map" label="Carte Interactive" />
            <MobileNavLink page="news" label="Actualités" />
            <MobileNavLink page="aerial" label="Vues Aériennes" />
            <MobileNavLink page="articles" label="Articles" />
            <MobileNavLink page="contact" label="Contact" />
            {isAdmin ? (
              <>
                <MobileNavLink page="admin-dashboard" label="Dashboard Admin" />
                <button onClick={() => { setIsAdmin(false); setCurrentPage('home'); }} className="block w-full text-left py-2 text-yellow-400">
                  Déconnexion
                </button>
              </>
            ) : (
              <MobileNavLink page="login" label="Admin" />
            )}
          </div>
        )}
      </div>
    </nav>
  );

  // Composant lien de navigation
  const NavLink = ({ page, label }) => (
    <button
      onClick={() => setCurrentPage(page)}
      className={`hover:text-yellow-400 transition-colors ${currentPage === page ? 'text-yellow-400' : ''}`}
    >
      {label}
    </button>
  );

  // Composant lien de navigation mobile (ferme le menu après clic)
  const MobileNavLink = ({ page, label }) => (
    <button
      onClick={() => { setCurrentPage(page); setIsMenuOpen(false); }}
      className={`block w-full text-left py-2 hover:text-yellow-400 ${currentPage === page ? 'text-yellow-400' : ''}`}
    >
      {label}
    </button>
  );

  // ===== PAGE D'ACCUEIL =====
  const HomePage = () => (
    <div className="space-y-16">
      {/* Section hero avec titre et réseaux sociaux */}
      <section className="text-center py-20 bg-gradient-to-b from-black via-gray-900 to-black">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400 bg-clip-text text-transparent animate-pulse">
          DLP Works
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8 px-4">
          La communauté passionnée qui suit les coulisses et l'évolution de Disneyland Paris
        </p>
        
        {/* MODIFICATION: Logos réseaux sociaux - X (Twitter) et Threads ajoutés */}
        <div className="flex justify-center space-x-6">
          {/* Logo X (anciennement Twitter) */}
          <a href="https://x.com/DLPWorks" target="_blank" rel="noopener noreferrer" className="transform hover:scale-110 transition-transform">
            <XIcon size={32} className="text-white hover:text-yellow-400" />
          </a>
          {/* Logo Facebook */}
          <a href="https://www.facebook.com/Dlp.works" target="_blank" rel="noopener noreferrer" className="transform hover:scale-110 transition-transform">
            <Facebook size={32} className="text-white hover:text-yellow-400" />
          </a>
          {/* Logo Instagram */}
          <a href="https://www.instagram.com/dlp.works/" target="_blank" rel="noopener noreferrer" className="transform hover:scale-110 transition-transform">
            <Instagram size={32} className="text-white hover:text-yellow-400" />
          </a>
          {/* Logo Threads */}
          <a href="https://www.threads.net/@dlp.works" target="_blank" rel="noopener noreferrer" className="transform hover:scale-110 transition-transform">
            {/* Icône Threads (SVG personnalisé car pas dans lucide-react) */}
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="text-white hover:text-yellow-400">
              <path d="M12.186 3.094c-.908 0-1.715.166-2.416.497a5.155 5.155 0 0 0-1.772 1.388 6.182 6.182 0 0 0-1.062 2.005c-.276.768-.414 1.576-.414 2.426 0 .85.138 1.658.414 2.426a6.182 6.182 0 0 0 1.062 2.005 5.155 5.155 0 0 0 1.772 1.388c.701.331 1.508.497 2.416.497.908 0 1.715-.166 2.416-.497a5.155 5.155 0 0 0 1.772-1.388 6.182 6.182 0 0 0 1.062-2.005c.276-.768.414-1.576.414-2.426 0-.85-.138-1.658-.414-2.426a6.182 6.182 0 0 0-1.062-2.005 5.155 5.155 0 0 0-1.772-1.388c-.701-.331-1.508-.497-2.416-.497zm0 1.5c.682 0 1.29.124 1.818.372.53.248.975.585 1.338 1.011.363.426.635.919.818 1.478.182.56.274 1.148.274 1.763 0 .615-.092 1.203-.274 1.763a4.682 4.682 0 0 1-.818 1.478c-.363.426-.809.763-1.338 1.011-.528.248-1.136.372-1.818.372-.682 0-1.29-.124-1.818-.372a3.655 3.655 0 0 1-1.338-1.011 4.682 4.682 0 0 1-.818-1.478c-.182-.56-.274-1.148-.274-1.763 0-.615.092-1.203.274-1.763.183-.56.455-1.052.818-1.478.363-.426.809-.763 1.338-1.011.528-.248 1.136-.372 1.818-.372z"/>
            </svg>
          </a>
          {/* Logo YouTube */}
          <a href="https://www.youtube.com/@DLPWorks" target="_blank" rel="noopener noreferrer" className="transform hover:scale-110 transition-transform">
            <Youtube size={32} className="text-white hover:text-yellow-400" />
          </a>
        </div>
      </section>

      {/* MODIFICATION: Section actualités - cliquable et redirige vers la page actualités */}
      <section className="px-4 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-white flex items-center">
          <FileText className="mr-3 text-yellow-400" />
          Dernières Actualités
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {news.slice(0, 2).map(item => (
            <div 
              key={item.id} 
              onClick={() => setCurrentPage('news')} // Redirection vers page actualités
              className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-lg shadow-2xl hover:shadow-yellow-400/20 transition-all transform hover:-translate-y-2 cursor-pointer"
            >
              <h3 className="text-2xl font-bold text-yellow-400 mb-2">{item.title}</h3>
              <p className="text-gray-400 mb-4">{item.date}</p>
              <p className="text-gray-300">{item.content}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MODIFICATION: Section vues aériennes - cliquable et redirige vers la page photos */}
      <section className="px-4 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-white flex items-center">
          <Camera className="mr-3 text-yellow-400" />
          Dernières Vues Aériennes
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {aerialViews.slice(0, 2).map(item => (
            <div 
              key={item.id} 
              onClick={() => setCurrentPage('aerial')} // Redirection vers page vues aériennes
              className="group relative overflow-hidden rounded-lg shadow-2xl cursor-pointer"
            >
              <img src={item.image} alt={item.title} className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-yellow-400">{item.title}</h3>
                  <p className="text-gray-300">{item.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MODIFICATION: Section articles - cliquable et redirige vers la page articles */}
      <section className="px-4 max-w-7xl mx-auto pb-16">
        <h2 className="text-4xl font-bold mb-8 text-white flex items-center">
          <FileText className="mr-3 text-yellow-400" />
          Articles Récents
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {articles.slice(0, 2).map(item => (
            <div 
              key={item.id} 
              onClick={() => setCurrentPage('articles')} // Redirection vers page articles
              className="bg-gradient-to-br from-gray-900 to-black rounded-lg overflow-hidden shadow-2xl hover:shadow-yellow-400/20 transition-all transform hover:-translate-y-2 cursor-pointer"
            >
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
    </div>
  );

  // ===== PAGE CARTE INTERACTIVE =====
  const MapPage = () => {
    // HTML complet de la carte Leaflet avec les tuiles Disney
    const mapHTML = `
<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Plan interactif Disneyland Paris</title>
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
// Configuration des tuiles Disney
const TILE_ROOT = 'https://media.disneylandparis.com/mapTiles/images';
const MIN_Z = 14;
const MAX_Z = 20;
const TILE_SIZE = 256;

// Initialisation de la carte
const map = L.map('map', {
  minZoom: MIN_Z,
  maxZoom: MAX_Z,
  center: [48.8722, 2.7758], // Coordonnées Disneyland Paris
  zoom: 16,
  attributionControl: true
});

// Définir les limites géographiques
const southWest = L.latLng(48.85, 2.74);
const northEast = L.latLng(48.89, 2.81);
const bounds = L.latLngBounds(southWest, northEast);
map.setMaxBounds(bounds);

// Image de secours si tuile manquante
const fallbackTile = "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(\`
  <svg xmlns='http://www.w3.org/2000/svg' width='256' height='256'>
    <rect width='100%' height='100%' fill='#fdf6ff'/>
    <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='20' fill='#a07acc' font-family='Verdana'>✨ Disney ✨</text>
  </svg>\`);

// Ajout du layer de tuiles Disney
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
          Carte Interactive de Disneyland Paris
        </h1>
        <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-lg shadow-2xl">
          {/* Iframe contenant la carte Leaflet */}
          <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden">
            <iframe
              srcDoc={mapHTML}
              style={{ width: '100%', height: '100%', border: 'none' }}
              title="Carte Interactive Disneyland Paris"
            />
          </div>
        </div>
      </div>
    );
  };

  // ===== PAGE ACTUALITÉS =====
  const NewsPage = () => {
    // Charger le script Twitter pour l'embed des tweets (une seule fois)
    useEffect(() => {
      // Vérifier si le script est déjà chargé
      if (!window.twttr) {
        const script = document.createElement('script');
        script.src = 'https://platform.twitter.com/widgets.js';
        script.async = true;
        script.charset = 'utf-8';
        document.body.appendChild(script);
      } else {
        // Si le script est déjà chargé, recharger les widgets
        window.twttr.widgets.load();
      }
    }, [news]); // Recharger quand les news changent

    return (
      <div className="px-4 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-white flex items-center">
          <FileText className="mr-3 text-yellow-400" />
          Actualités
        </h1>
        <div className="space-y-6">
          {news.map(item => (
            <div key={item.id} className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-lg shadow-2xl">
              <h2 className="text-2xl font-bold text-yellow-400 mb-2">{item.title}</h2>
              <p className="text-gray-400 mb-4">{item.date}</p>
              <p className="text-gray-300 mb-4">{item.content}</p>
              
              {/* MODIFICATION: Affichage du tweet intégré avec blockquote Twitter */}
              {item.tweet && (
                <div className="mt-6">
                  {/* Conteneur pour le tweet intégré */}
                  <div className="twitter-embed-container bg-gray-800 p-4 rounded-lg">
                    {/* Blockquote Twitter - sera transformé par le script Twitter */}
                    <blockquote className="twitter-tweet" data-theme="dark">
                      <a href={item.tweet}>Voir le tweet</a>
                    </blockquote>
                  </div>
                  
                  {/* Lien vers le tweet original */}
                  <a 
                    href={item.tweet} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center text-yellow-400 hover:text-yellow-300 mt-4"
                  >
                    <XIcon size={18} className="mr-2" />
                    Ouvrir sur X
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ===== PAGE VUES AÉRIENNES =====
  const AerialPage = () => (
    <>
      <div className="px-4 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-white flex items-center">
          <Camera className="mr-3 text-yellow-400" />
          Vues Aériennes
        </h1>
        <div className="grid md:grid-cols-3 gap-6">
          {aerialViews.map(item => (
            <div 
              key={item.id} 
              onClick={() => setSelectedImage(item)} // Ouvrir le modal d'agrandissement
              className="group relative overflow-hidden rounded-lg shadow-2xl cursor-pointer"
            >
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
      </div>

      {/* Modal d'agrandissement de l'image */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)} // Fermer en cliquant sur le fond
        >
          {/* Bouton de fermeture (croix) */}
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white hover:text-yellow-400 transition-colors"
          >
            <X size={40} />
          </button>
          {/* Image agrandie */}
          <div className="max-w-7xl max-h-full">
            <img 
              src={selectedImage.image} 
              alt={selectedImage.title} 
              className="max-w-full max-h-[90vh] object-contain"
            />
            {/* Informations de l'image */}
            <div className="text-center mt-4">
              <h3 className="text-2xl font-bold text-yellow-400">{selectedImage.title}</h3>
              <p className="text-gray-300">{selectedImage.date}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );

  // ===== PAGE ARTICLES =====
  const ArticlesPage = () => (
    <>
      <div className="px-4 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-white flex items-center">
          <FileText className="mr-3 text-yellow-400" />
          Articles
        </h1>
        <div className="space-y-8">
          {articles.map(item => (
            <div 
              key={item.id} 
              onClick={() => setSelectedArticle(item)} // Ouvrir le modal de lecture
              className="bg-gradient-to-br from-gray-900 to-black rounded-lg overflow-hidden shadow-2xl hover:shadow-yellow-400/20 transition-all transform hover:-translate-y-2 cursor-pointer"
            >
              <img src={item.image} alt={item.title} className="w-full h-64 object-cover" />
              <div className="p-6">
                <h2 className="text-3xl font-bold text-yellow-400 mb-2">{item.title}</h2>
                <p className="text-gray-400 mb-4">{item.date}</p>
                <p className="text-gray-300">{item.content}</p>
                <p className="text-yellow-400 mt-4">Cliquez pour lire l'article complet →</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal d'affichage de l'article complet */}
      {selectedArticle && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 overflow-y-auto"
          onClick={() => setSelectedArticle(null)} // Fermer en cliquant sur le fond
        >
          <div className="min-h-screen py-8 px-4">
            <div 
              className="max-w-4xl mx-auto bg-gradient-to-br from-gray-900 to-black rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()} // Ne pas fermer si clic sur l'article
            >
              {/* Bouton de fermeture */}
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 text-white hover:text-yellow-400 transition-colors z-10"
              >
                <X size={40} />
              </button>
              {/* Image de couverture */}
              <img src={selectedArticle.image} alt={selectedArticle.title} className="w-full h-96 object-cover" />
              {/* Contenu de l'article */}
              <div className="p-8">
                <h1 className="text-4xl font-bold text-yellow-400 mb-4">{selectedArticle.title}</h1>
                <p className="text-gray-400 mb-6">{selectedArticle.date}</p>
                <div className="text-gray-300 text-lg leading-relaxed whitespace-pre-wrap">
                  {selectedArticle.fullContent || selectedArticle.content}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );

  // ===== PAGE CONTACT =====
  const ContactPage = () => (
    <div className="px-4 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-white flex items-center">
        <Mail className="mr-3 text-yellow-400" />
        Contact & Mentions Légales
      </h1>
      <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-lg shadow-2xl space-y-6 text-gray-300">
        <section>
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">À propos de DLP Works</h2>
          <p>DLP Works est une communauté de passionnés qui suit l'évolution et les coulisses de Disneyland Paris.</p>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">Mentions Légales</h2>
          <p className="mb-2"><strong>Nom de l'association :</strong> DLP Works</p>
          <p className="mb-2"><strong>Contact :</strong> contact@dlpworks.com</p>
          <p className="mb-2"><strong>Hébergeur :</strong> Netlify</p>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">Propriété Intellectuelle</h2>
          <p>Ce site est géré par des fans et n'est pas affilié à The Walt Disney Company ou Disneyland Paris. Tous les droits sur les marques Disney appartiennent à leurs propriétaires respectifs.</p>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">Protection des Données</h2>
          <p>Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données personnelles.</p>
        </section>
      </div>
    </div>
  );

  // ===== DASHBOARD ADMIN =====
  const AdminDashboard = () => (
    <div className="px-4 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-white">Espace Administrateur</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Cartes de gestion */}
        <AdminCard
          icon={<MapPin size={32} />}
          title="Carte Interactive"
          description="Gérer les annotations de la carte"
          onClick={() => setCurrentPage('admin-map')}
        />
        <AdminCard
          icon={<FileText size={32} />}
          title="Actualités"
          description="Ajouter et gérer les actualités"
          onClick={() => setCurrentPage('admin-news')}
        />
        <AdminCard
          icon={<Camera size={32} />}
          title="Vues Aériennes"
          description="Gérer les photos aériennes"
          onClick={() => setCurrentPage('admin-aerial')}
        />
        <AdminCard
          icon={<FileText size={32} />}
          title="Articles"
          description="Rédiger et gérer les articles"
          onClick={() => setCurrentPage('admin-articles')}
        />
      </div>
    </div>
  );

  // Composant carte admin (bouton de navigation)
  const AdminCard = ({ icon, title, description, onClick }) => (
    <button
      onClick={onClick}
      className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-lg shadow-2xl hover:shadow-yellow-400/20 transition-all transform hover:-translate-y-2 text-left"
    >
      <div className="text-yellow-400 mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </button>
  );

  // ===== PAGE GESTION DES ACTUALITÉS =====
  const AdminNews = () => {
    // États pour le formulaire d'ajout
    const [newTitle, setNewTitle] = useState('');
    const [newDate, setNewDate] = useState('');
    const [newTweet, setNewTweet] = useState('');
    const [newContent, setNewContent] = useState('');

    // Fonction pour ajouter une actualité
    const addNews = () => {
      // Validation des champs obligatoires
      if (!newTitle || !newContent) {
        alert('Veuillez remplir au moins le titre et le contenu');
        return;
      }

      // Création du nouvel objet actualité
      const newItem = {
        id: Date.now(), // ID unique basé sur timestamp
        title: newTitle,
        date: newDate || new Date().toISOString().split('T')[0], // Date du jour si vide
        tweet: newTweet,
        content: newContent
      };

      // Ajout en début de liste (plus récent en premier)
      setNews([newItem, ...news]);

      // Réinitialisation du formulaire
      setNewTitle('');
      setNewDate('');
      setNewTweet('');
      setNewContent('');
      alert('Actualité ajoutée avec succès !');
    };

    // Fonction pour supprimer une actualité
    const deleteNews = (id) => {
      if (window.confirm('Êtes-vous sûr de vouloir supprimer cette actualité ?')) {
        setNews(news.filter(n => n.id !== id)); // Filtrer l'élément à supprimer
        alert('Actualité supprimée !');
      }
    };

    return (
      <div className="px-4 max-w-7xl mx-auto">
        {/* Formulaire d'ajout */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-6">Gestion des Actualités</h1>
          <div className="bg-gray-800 p-6 rounded-lg space-y-4">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">Ajouter une actualité</h2>
            
            {/* Champ titre */}
            <input
              type="text"
              placeholder="Titre *"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            
            {/* Champ date */}
            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            
            {/* Champ lien tweet */}
            <input
              type="url"
              placeholder="Lien tweet (URL complète)"
              value={newTweet}
              onChange={(e) => setNewTweet(e.target.value)}
              className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            
            {/* Champ contenu */}
            <textarea
              placeholder="Contenu de l'actualité *"
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            
            {/* Bouton d'ajout */}
            <button
              onClick={addNews}
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-6 py-3 rounded-lg flex items-center hover:shadow-lg font-bold"
            >
              <Plus size={20} className="mr-2" />
              Ajouter l'actualité
            </button>
          </div>
        </div>

        {/* Liste des actualités existantes */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white mb-4">Actualités existantes</h2>
          {news.map(item => (
            <div key={item.id} className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-lg shadow-xl flex justify-between items-start">
              {/* Contenu de l'actualité */}
              <div className="flex-1">
                <h3 className="text-xl font-bold text-yellow-400">{item.title}</h3>
                <p className="text-gray-400 mb-2">{item.date}</p>
                <p className="text-gray-300 mb-2">{item.content}</p>
                {item.tweet && (
                  <a href={item.tweet} target="_blank" rel="noopener noreferrer" className="text-blue-400 text-sm">
                    {item.tweet}
                  </a>
                )}
              </div>
              {/* Boutons d'action */}
              <div className="flex space-x-2 ml-4">
                <button className="p-2 bg-gray-800 rounded hover:bg-yellow-400 hover:text-black transition-colors">
                  <Edit size={20} />
                </button>
                <button
                  onClick={() => deleteNews(item.id)}
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

  // ===== PAGE GESTION DES VUES AÉRIENNES =====
  const AdminAerial = () => {
    // États pour le formulaire
    const [newTitle, setNewTitle] = useState('');
    const [newDate, setNewDate] = useState('');
    const [newImage, setNewImage] = useState('');

    // Fonction pour ajouter une vue aérienne
    const addAerial = () => {
      if (!newTitle || !newImage) {
        alert('Veuillez remplir au moins le titre et l\'URL de l\'image');
        return;
      }

      const newItem = {
        id: Date.now(),
        title: newTitle,
        date: newDate || new Date().toISOString().split('T')[0],
        image: newImage
      };

      setAerialViews([newItem, ...aerialViews]);

      setNewTitle('');
      setNewDate('');
      setNewImage('');
      alert('Vue aérienne ajoutée avec succès !');
    };

    // Fonction pour supprimer une vue aérienne
    const deleteAerial = (id) => {
      if (window.confirm('Êtes-vous sûr de vouloir supprimer cette photo ?')) {
        setAerialViews(aerialViews.filter(item => item.id !== id));
        alert('Photo supprimée !');
      }
    };

    return (
      <div className="px-4 max-w-7xl mx-auto">
        {/* Formulaire d'ajout */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-6">Gestion des Vues Aériennes</h1>
          <div className="bg-gray-800 p-6 rounded-lg space-y-4">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">Ajouter une vue aérienne</h2>
            
            <input
              type="text"
              placeholder="Titre de la photo *"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            
            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            
            <input
              type="url"
              placeholder="URL de l'image * (ex: https://...)"
              value={newImage}
              onChange={(e) => setNewImage(e.target.value)}
              className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            
            <p className="text-gray-400 text-sm">💡 Conseil: Utilisez Imgur.com pour héberger vos images gratuitement</p>
            
            <button
              onClick={addAerial}
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-6 py-3 rounded-lg flex items-center hover:shadow-lg font-bold w-full justify-center"
            >
              <Plus size={20} className="mr-2" />
              Ajouter la photo
            </button>
          </div>
        </div>

        {/* Liste des photos existantes */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white mb-4">Photos existantes</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {aerialViews.map(item => (
              <div key={item.id} className="bg-gradient-to-br from-gray-900 to-black rounded-lg shadow-xl overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-yellow-400">{item.title}</h3>
                  <p className="text-gray-400 text-sm mb-3">{item.date}</p>
                  <button
                    onClick={() => deleteAerial(item.id)}
                    className="w-full p-2 bg-red-600 rounded hover:bg-red-700 transition-colors flex items-center justify-center"
                  >
                    <Trash2 size={18} className="mr-2" />
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // ===== PAGE GESTION DES ARTICLES =====
  const AdminArticles = () => {
    // États pour le formulaire
    const [newTitle, setNewTitle] = useState('');
    const [newDate, setNewDate] = useState('');
    const [newContent, setNewContent] = useState('');
    const [newFullContent, setNewFullContent] = useState('');
    const [newImage, setNewImage] = useState('');
    
    // MODIFICATION: État pour gérer l'édition d'un article
    const [editingArticle, setEditingArticle] = useState(null);

    // Fonction pour ajouter un article
    const addArticle = () => {
      if (!newTitle || !newContent) {
        alert('Veuillez remplir au moins le titre et le contenu');
        return;
      }

      const newItem = {
        id: Date.now(),
        title: newTitle,
        date: newDate || new Date().toISOString().split('T')[0],
        content: newContent,
        fullContent: newFullContent || newContent,
        image: newImage
      };

      setArticles([newItem, ...articles]);

      // Reset du formulaire
      setNewTitle('');
      setNewDate('');
      setNewContent('');
      setNewFullContent('');
      setNewImage('');
      alert('Article ajouté avec succès !');
    };

    // MODIFICATION: Fonction pour commencer l'édition d'un article
    const startEdit = (article) => {
      setEditingArticle(article);
      // Pré-remplir le formulaire avec les données de l'article
      setNewTitle(article.title);
      setNewDate(article.date);
      setNewContent(article.content);
      setNewFullContent(article.fullContent || article.content);
      setNewImage(article.image || '');
      // Scroll vers le haut pour voir le formulaire
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // MODIFICATION: Fonction pour sauvegarder les modifications
    const saveEdit = () => {
      if (!newTitle || !newContent) {
        alert('Veuillez remplir au moins le titre et le contenu');
        return;
      }

      // Mettre à jour l'article existant
      const updatedArticles = articles.map(article => 
        article.id === editingArticle.id
          ? {
              ...article,
              title: newTitle,
              date: newDate,
              content: newContent,
              fullContent: newFullContent || newContent,
              image: newImage
            }
          : article
      );

      setArticles(updatedArticles);

      // Réinitialiser le formulaire et l'état d'édition
      setEditingArticle(null);
      setNewTitle('');
      setNewDate('');
      setNewContent('');
      setNewFullContent('');
      setNewImage('');
      alert('Article modifié avec succès !');
    };

    // MODIFICATION: Fonction pour annuler l'édition
    const cancelEdit = () => {
      setEditingArticle(null);
      setNewTitle('');
      setNewDate('');
      setNewContent('');
      setNewFullContent('');
      setNewImage('');
    };

    // Fonction pour supprimer un article
    const deleteArticle = (id) => {
      if (window.confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
        setArticles(articles.filter(item => item.id !== id));
        alert('Article supprimé !');
      }
    };

    return (
      <div className="px-4 max-w-7xl mx-auto">
        {/* Formulaire d'ajout/édition */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-6">Gestion des Articles</h1>
          <div className="bg-gray-800 p-6 rounded-lg space-y-4">
            {/* MODIFICATION: Titre dynamique selon mode ajout/édition */}
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">
              {editingArticle ? 'Modifier l\'article' : 'Ajouter un article'}
            </h2>
            
            <input
              type="text"
              placeholder="Titre de l'article *"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            
            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            
            <input
              type="url"
              placeholder="URL de l'image de couverture"
              value={newImage}
              onChange={(e) => setNewImage(e.target.value)}
              className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            
            <textarea
              placeholder="Résumé court (affiché sur la page d'accueil) *"
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg h-24 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            
            <textarea
              placeholder="Contenu complet de l'article (optionnel, sinon le résumé sera utilisé)"
              value={newFullContent}
              onChange={(e) => setNewFullContent(e.target.value)}
              className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg h-64 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            
            {/* MODIFICATION: Boutons dynamiques selon mode ajout/édition */}
            <div className="flex space-x-4">
              {editingArticle ? (
                <>
                  <button
                    onClick={saveEdit}
                    className="flex-1 bg-gradient-to-r from-green-400 to-green-600 text-black px-6 py-3 rounded-lg flex items-center hover:shadow-lg font-bold justify-center"
                  >
                    <Edit size={20} className="mr-2" />
                    Sauvegarder les modifications
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 font-bold"
                  >
                    Annuler
                  </button>
                </>
              ) : (
                <button
                  onClick={addArticle}
                  className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-6 py-3 rounded-lg flex items-center hover:shadow-lg font-bold justify-center"
                >
                  <Plus size={20} className="mr-2" />
                  Ajouter l'article
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Liste des articles existants */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white mb-4">Articles existants</h2>
          {articles.map(item => (
            <div key={item.id} className="bg-gradient-to-br from-gray-900 to-black rounded-lg shadow-xl overflow-hidden">
              <div className="flex flex-col md:flex-row">
                {item.image && (
                  <img src={item.image} alt={item.title} className="w-full md:w-48 h-48 object-cover" />
                )}
                <div className="flex-1 p-6">
                  <h3 className="text-xl font-bold text-yellow-400 mb-2">{item.title}</h3>
                  <p className="text-gray-400 mb-3">{item.date}</p>
                  <p className="text-gray-300 mb-4">{item.content.substring(0, 150)}...</p>
                  {/* Boutons d'action */}
                  <div className="flex space-x-2">
                    {/* MODIFICATION: Bouton de modification fonctionnel */}
                    <button 
                      onClick={() => startEdit(item)}
                      className="p-2 bg-gray-800 rounded hover:bg-yellow-400 hover:text-black transition-colors"
                      title="Modifier l'article"
                    >
                      <Edit size={20} />
                    </button>
                    <button
                      onClick={() => deleteArticle(item.id)}
                      className="p-2 bg-gray-800 rounded hover:bg-red-600 transition-colors"
                      title="Supprimer l'article"
                    >
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

  // ===== RENDU PRINCIPAL =====
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Barre de navigation fixe */}
      <NavBar />
      
      {/* Contenu principal avec espace pour la navbar */}
      <main className="pt-24 pb-16">
        {/* Rendu conditionnel selon la page active */}
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'map' && <MapPage />}
        {currentPage === 'news' && <NewsPage />}
        {currentPage === 'aerial' && <AerialPage />}
        {currentPage === 'articles' && <ArticlesPage />}
        {currentPage === 'contact' && <ContactPage />}
        {currentPage === 'login' && !isAdmin && (
          <LoginPage 
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            onLogin={handleLogin}
          />
        )}
        {currentPage === 'admin-dashboard' && isAdmin && <AdminDashboard />}
        {currentPage === 'admin-news' && isAdmin && <AdminNews />}
        {currentPage === 'admin-aerial' && isAdmin && <AdminAerial />}
        {currentPage === 'admin-articles' && isAdmin && <AdminArticles />}
      </main>
      
      {/* Pied de page */}
      <footer className="bg-black border-t border-gray-800 py-8 text-center text-gray-400">
        <p>&copy; 2025 DLP Works - Communauté de passionnés Disney</p>
      </footer>
    </div>
  );
};

export default DLPWorksSite;