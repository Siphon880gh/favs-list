$(()=>{
    // Init Fav saving system
    window.Fav = new FavsListCreator({"favIconWrapper":".favs-wrapper", "relParent":"li", "relTextDescendant":".name"});
  
    // Load Favs
    window.Fav.load();
});