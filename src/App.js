import React, { useState } from 'react';
import { Menu, X, Twitter, Facebook, Instagram, MapPin, Camera, FileText, Mail, User, LogOut, Edit, Trash2, Plus } from 'lucide-react';

const DLPWorksSite = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  
  // État pour stocker le contenu (en production, ce serait dans une base de données)
  const [news, setNews] = useState([
    { id: 1, title: "Nouvelle attraction annoncée", date: "2025-10-01", tweet: "https://x.com/DLPWorks/status/123", content: "Disneyland Paris annonce une nouvelle attraction..." },
    { id: 2, title: "Rénovation du Château", date: "2025-09-28", tweet: "https://x.com/DLPWorks/status/124", content: "Les travaux de rénovation avancent..." }
  ]);
  
  const [aerialViews, setAerialViews] = useState([
    { id: 1, title: "Vue du Château", date: "2025-09-30", image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800" },
    { id: 2, title: "Avengers Campus", date: "2025-09-25", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800" }
  ]);
  
  const [articles, setArticles] = useState([
    { id: 1, title: "L'histoire de Disneyland Paris", date: "2025-09-20", content: "Depuis son ouverture en 1992...", image: "https://images.unsplash.com/photo-1601970122940-ff0c6dce8f54?w=800" },
    { id: 2, title: "Les secrets des Imagineers", date: "2025-09-15", content: "Découvrez les coulisses...", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800" }
  ]);

  const handleLogin = () => {
    // Simulation - en production, vérification côté serveur
    if (loginForm.username === 'admin' && loginForm.password === 'dlpworks2025') {
      setIsAdmin(true);
      setCurrentPage('admin-dashboard');
    } else {
      alert('Identifiants incorrects');
    }
  };

  const NavBar = () => (
    <nav className="bg-black text-white fixed w-full top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentPage('home')}>
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-2xl">🏗️</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
              DLP Works
            </span>
          </div>
          
          <div className="hidden md:flex space-x-6">
            <NavLink page="home" label="Accueil" />
            <NavLink page="map" label="Carte Interactive" />
            <NavLink page="news" label="Actualités" />
            <NavLink page="aerial" label="Vues Aériennes" />
            <NavLink page="articles" label="Articles" />
            <NavLink page="contact" label="Contact" />
            {isAdmin ? (
              <button onClick={() => { setIsAdmin(false); setCurrentPage('home'); }} className="text-yellow-400 hover:text-yellow-300 flex items-center">
                <LogOut size={18} className="mr-1" /> Déconnexion
              </button>
            ) : (
              <NavLink page="login" label="Admin" />
            )}
          </div>
          
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <MobileNavLink page="home" label="Accueil" />
            <MobileNavLink page="map" label="Carte Interactive" />
            <MobileNavLink page="news" label="Actualités" />
            <MobileNavLink page="aerial" label="Vues Aériennes" />
            <MobileNavLink page="articles" label="Articles" />
            <MobileNavLink page="contact" label="Contact" />
            {isAdmin ? (
              <button onClick={() => { setIsAdmin(false); setCurrentPage('home'); }} className="block w-full text-left py-2 text-yellow-400">
                Déconnexion
              </button>
            ) : (
              <MobileNavLink page="login" label="Admin" />
            )}
          </div>
        )}
      </div>
    </nav>
  );

  const NavLink = ({ page, label }) => (
    <button
      onClick={() => setCurrentPage(page)}
      className={`hover:text-yellow-400 transition-colors ${currentPage === page ? 'text-yellow-400' : ''}`}
    >
      {label}
    </button>
  );

  const MobileNavLink = ({ page, label }) => (
    <button
      onClick={() => { setCurrentPage(page); setIsMenuOpen(false); }}
      className={`block w-full text-left py-2 hover:text-yellow-400 ${currentPage === page ? 'text-yellow-400' : ''}`}
    >
      {label}
    </button>
  );

  const HomePage = () => (
    <div className="space-y-16">
      <section className="text-center py-20 bg-gradient-to-b from-black via-gray-900 to-black">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400 bg-clip-text text-transparent animate-pulse">
          DLP Works
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8 px-4">
          La communauté passionnée qui suit les coulisses et l'évolution de Disneyland Paris
        </p>
        <div className="flex justify-center space-x-6">
          <a href="https://x.com/DLPWorks" target="_blank" rel="noopener noreferrer" className="transform hover:scale-110 transition-transform">
            <Twitter size={32} className="text-white hover:text-yellow-400" />
          </a>
          <a href="https://www.facebook.com/Dlp.works" className="transform hover:scale-110 transition-transform">
            <Facebook size={32} className="text-white hover:text-yellow-400" />
          </a>
          <a href="https://www.instagram.com/dlp.works/" className="transform hover:scale-110 transition-transform">
            <Instagram size={32} className="text-white hover:text-yellow-400" />
          </a>
        </div>
      </section>

      <section className="px-4 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-white flex items-center">
          <FileText className="mr-3 text-yellow-400" />
          Dernières Actualités
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {news.slice(0, 2).map(item => (
            <div key={item.id} className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-lg shadow-2xl hover:shadow-yellow-400/20 transition-all transform hover:-translate-y-2">
              <h3 className="text-2xl font-bold text-yellow-400 mb-2">{item.title}</h3>
              <p className="text-gray-400 mb-4">{item.date}</p>
              <p className="text-gray-300">{item.content}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-white flex items-center">
          <Camera className="mr-3 text-yellow-400" />
          Dernières Vues Aériennes
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {aerialViews.slice(0, 2).map(item => (
            <div key={item.id} className="group relative overflow-hidden rounded-lg shadow-2xl">
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

      <section className="px-4 max-w-7xl mx-auto pb-16">
        <h2 className="text-4xl font-bold mb-8 text-white flex items-center">
          <FileText className="mr-3 text-yellow-400" />
          Articles Récents
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {articles.slice(0, 2).map(item => (
            <div key={item.id} className="bg-gradient-to-br from-gray-900 to-black rounded-lg overflow-hidden shadow-2xl hover:shadow-yellow-400/20 transition-all transform hover:-translate-y-2">
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

  const MapPage = () => (
    <div className="px-4 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-white flex items-center">
        <MapPin className="mr-3 text-yellow-400" />
        Carte Interactive de Disneyland Paris
      </h1>
      <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-lg shadow-2xl">
        <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center text-gray-400">
          <div className="text-center">
            <MapPin size={64} className="mx-auto mb-4 text-yellow-400" />
            <p className="text-xl">Widget Carte Interactive</p>
            <p className="text-sm mt-2">Intégration de la carte Disneyland Paris</p>
            <p className="text-xs mt-2 text-gray-500">https://media.disneylandparis.com/mapTiles/images/</p>
          </div>
        </div>
      </div>
    </div>
  );

  const NewsPage = () => (
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
            <a href={item.tweet} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-yellow-400 hover:text-yellow-300">
              <Twitter size={18} className="mr-2" />
              Voir le tweet
            </a>
          </div>
        ))}
      </div>
    </div>
  );

  const AerialPage = () => (
    <div className="px-4 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-white flex items-center">
        <Camera className="mr-3 text-yellow-400" />
        Vues Aériennes
      </h1>
      <div className="grid md:grid-cols-3 gap-6">
        {aerialViews.map(item => (
          <div key={item.id} className="group relative overflow-hidden rounded-lg shadow-2xl">
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
  );

  const ArticlesPage = () => (
    <div className="px-4 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-white flex items-center">
        <FileText className="mr-3 text-yellow-400" />
        Articles
      </h1>
      <div className="space-y-8">
        {articles.map(item => (
          <div key={item.id} className="bg-gradient-to-br from-gray-900 to-black rounded-lg overflow-hidden shadow-2xl">
            <img src={item.image} alt={item.title} className="w-full h-64 object-cover" />
            <div className="p-6">
              <h2 className="text-3xl font-bold text-yellow-400 mb-2">{item.title}</h2>
              <p className="text-gray-400 mb-4">{item.date}</p>
              <p className="text-gray-300">{item.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

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
          <p className="mb-2"><strong>Hébergeur :</strong> [À compléter selon votre choix d'hébergeur]</p>
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

  const LoginPage = () => (
    <div className="px-4 max-w-md mx-auto">
      <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-lg shadow-2xl">
        <h1 className="text-3xl font-bold mb-8 text-white flex items-center justify-center">
          <User className="mr-3 text-yellow-400" />
          Administration
        </h1>
        <div className="space-y-6">
          <div>
            <label className="block text-gray-300 mb-2">Identifiant</label>
            <input
              type="text"
              value={loginForm.username}
              onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Mot de passe</label>
            <input
              type="password"
              value={loginForm.password}
              onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold py-3 rounded-lg hover:shadow-lg hover:shadow-yellow-400/50 transition-all"
          >
            Se connecter
          </button>
          <p className="text-xs text-gray-500 text-center">Demo: admin / dlpworks2025</p>
        </div>
      </div>
    </div>
  );

  const AdminDashboard = () => (
    <div className="px-4 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-white">Espace Administrateur</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
		  onClick={() => setCurrentPage('admin-aerial')}  // Ajoute cette ligne
		/>
		<AdminCard
		  icon={<FileText size={32} />}
		  title="Articles"
		  description="Rédiger et gérer les articles"
		  onClick={() => setCurrentPage('admin-articles')}  // Ajoute cette ligne
		/>
      </div>
    </div>
  );

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

const AdminNews = () => {
  // États pour le formulaire (nouveaux, locaux à cette page)
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newTweet, setNewTweet] = useState('');
  const [newContent, setNewContent] = useState('');

  // Fonction pour ajouter une actualité (utilise le setter !)
  const addNews = () => {
    if (!newTitle || !newContent) return; // Validation basique

    const newItem = {
      id: Date.now(), // ID unique simple (basé sur timestamp)
      title: newTitle,
      date: newDate || new Date().toISOString().split('T')[0], // Date du jour si vide
      tweet: newTweet,
      content: newContent
    };

    // Utilisation du setter : met à jour l'état avec le nouveau tableau
    setNews([...news, newItem]); // ...news pour cloner et ajouter

    // Reset du formulaire
    setNewTitle('');
    setNewDate('');
    setNewTweet('');
    setNewContent('');
    alert('Actualité ajoutée !');
  };

  // ... le reste du JSX existant

  return (
    <div className="px-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-white">Gestion des Actualités</h1>
        {/* Formulaire d'ajout */}
        <div className="bg-gray-800 p-4 rounded-lg space-y-4">
          <input
            type="text"
            placeholder="Titre"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full px-3 py-2 bg-gray-900 text-white rounded"
          />
          <input
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            className="w-full px-3 py-2 bg-gray-900 text-white rounded"
          />
          <input
            type="url"
            placeholder="Lien tweet"
            value={newTweet}
            onChange={(e) => setNewTweet(e.target.value)}
            className="w-full px-3 py-2 bg-gray-900 text-white rounded"
          />
          <textarea
            placeholder="Contenu"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            className="w-full px-3 py-2 bg-gray-900 text-white rounded h-20"
          />
          <button
            onClick={addNews}
            className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-4 py-2 rounded-lg flex items-center hover:shadow-lg"
          >
            <Plus size={20} className="mr-2" />
            Ajouter
          </button>
        </div>
      </div>

      {/* Liste existante des news, avec boutons edit/suppr */}
      <div className="space-y-4">
        {news.map(item => (
          <div key={item.id} className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-lg shadow-xl flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold text-yellow-400">{item.title}</h3>
              <p className="text-gray-400">{item.date}</p>
            </div>
            <div className="flex space-x-2">
              {/* Exemple d'édition (fonction similaire à addNews) */}
              <button className="p-2 bg-gray-800 rounded hover:bg-yellow-400 hover:text-black">
                <Edit size={20} />
              </button>
              {/* Exemple de suppression */}
              <button
                onClick={() => setNews(news.filter(n => n.id !== item.id))} // Utilise le setter pour filtrer/supprimer
                className="p-2 bg-gray-800 rounded hover:bg-red-600"
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

const AdminAerial = () => {
  // États pour le formulaire d'ajout
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newImage, setNewImage] = useState(''); // URL d'image (Unsplash ou locale)

  // Fonction pour ajouter une vue aérienne
  const addAerial = () => {
    if (!newTitle || !newImage) return; // Validation

    const newItem = {
      id: Date.now(),
      title: newTitle,
      date: newDate || new Date().toISOString().split('T')[0],
      image: newImage
    };

    setAerialViews([...aerialViews, newItem]);

    // Reset formulaire
    setNewTitle('');
    setNewDate('');
    setNewImage('');
    alert('Vue aérienne ajoutée !');
  };

  // Fonction pour supprimer
  const deleteAerial = (id) => {
    setAerialViews(aerialViews.filter(item => item.id !== id));
  };

  return (
    <div className="px-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-white">Gestion des Vues Aériennes</h1>
        {/* Formulaire d'ajout */}
        <div className="bg-gray-800 p-4 rounded-lg space-y-4 w-80">
          <input
            type="text"
            placeholder="Titre"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full px-3 py-2 bg-gray-900 text-white rounded"
          />
          <input
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            className="w-full px-3 py-2 bg-gray-900 text-white rounded"
          />
          <input
            type="url"
            placeholder="URL image (ex: Unsplash)"
            value={newImage}
            onChange={(e) => setNewImage(e.target.value)}
            className="w-full px-3 py-2 bg-gray-900 text-white rounded"
          />
          <button
            onClick={addAerial}
            className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-4 py-2 rounded-lg flex items-center hover:shadow-lg w-full justify-center"
          >
            <Plus size={20} className="mr-2" />
            Ajouter
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {aerialViews.map(item => (
          <div key={item.id} className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-lg shadow-xl flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold text-yellow-400">{item.title}</h3>
              <p className="text-gray-400">{item.date}</p>
              <img src={item.image} alt={item.title} className="w-32 h-20 object-cover rounded mt-2" />
            </div>
            <button
              onClick={() => deleteAerial(item.id)}
              className="p-2 bg-gray-800 rounded hover:bg-red-600"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};


const AdminArticles = () => {
  // États pour le formulaire d'ajout
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newImage, setNewImage] = useState('');

  // Fonction pour ajouter un article
  const addArticle = () => {
    if (!newTitle || !newContent) return;

    const newItem = {
      id: Date.now(),
      title: newTitle,
      date: newDate || new Date().toISOString().split('T')[0],
      content: newContent,
      image: newImage
    };

    setArticles([...articles, newItem]);

    // Reset formulaire
    setNewTitle('');
    setNewDate('');
    setNewContent('');
    setNewImage('');
    alert('Article ajouté !');
  };

  // Fonction pour supprimer
  const deleteArticle = (id) => {
    setArticles(articles.filter(item => item.id !== id));
  };

  return (
    <div className="px-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-white">Gestion des Articles</h1>
        {/* Formulaire d'ajout */}
        <div className="bg-gray-800 p-4 rounded-lg space-y-4 w-80">
          <input
            type="text"
            placeholder="Titre"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full px-3 py-2 bg-gray-900 text-white rounded"
          />
          <input
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            className="w-full px-3 py-2 bg-gray-900 text-white rounded"
          />
          <input
            type="url"
            placeholder="URL image"
            value={newImage}
            onChange={(e) => setNewImage(e.target.value)}
            className="w-full px-3 py-2 bg-gray-900 text-white rounded"
          />
          <textarea
            placeholder="Contenu"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            className="w-full px-3 py-2 bg-gray-900 text-white rounded h-20"
          />
          <button
            onClick={addArticle}
            className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-4 py-2 rounded-lg flex items-center hover:shadow-lg w-full justify-center"
          >
            <Plus size={20} className="mr-2" />
            Ajouter
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {articles.map(item => (
          <div key={item.id} className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-lg shadow-xl flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold text-yellow-400">{item.title}</h3>
              <p className="text-gray-400">{item.date}</p>
              <p className="text-gray-300 mb-2">{item.content.substring(0, 100)}...</p>
              <img src={item.image} alt={item.title} className="w-32 h-20 object-cover rounded mt-2" />
            </div>
            <button
              onClick={() => deleteArticle(item.id)}
              className="p-2 bg-gray-800 rounded hover:bg-red-600"
            >
              <Trash2 size={20} />
            </button>
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
        {currentPage === 'login' && !isAdmin && <LoginPage />}
        {currentPage === 'admin-dashboard' && isAdmin && <AdminDashboard />}
        {currentPage === 'admin-news' && isAdmin && <AdminNews />}
		{currentPage === 'admin-aerial' && isAdmin && <AdminAerial />}
		{currentPage === 'admin-articles' && isAdmin && <AdminArticles />}
      </main>
      <footer className="bg-black border-t border-gray-800 py-8 text-center text-gray-400">
        <p>&copy; 2025 DLP Works - Communauté de passionnés Disney</p>
      </footer>
    </div>
  );
};

export default DLPWorksSite;