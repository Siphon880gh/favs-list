
// Add jQuery :Contains with case-insensitive version
jQuery.expr[':'].Contains = function(a, i, m) {
return jQuery(a).text().toUpperCase()
    .indexOf(m[3].toUpperCase()) >= 0;
};

function searchPlaylists(keyword) {
  var isLengthy = keyword.length>2;
  if(!isLengthy) {
    $("li.hidden").removeClass("hidden");
    console.log("Branch: if");
  } else {
    $("li").addClass("hidden");
    $(`li:Contains(${keyword})`).removeClass("hidden");
    console.log("Branch: else");
  }
}

class FavsListCreator {

    constructor(settings) {
      var {favIconWrapper, relParent, relTextDescendant} = settings;
      this.favIconWrapper = favIconWrapper;
      this.relParent = relParent;
      this.relTextDescendant = relTextDescendant;
  
      this.$favs = [];
      this.$hates = [];
  
      $(favIconWrapper).children().click(ev => {
        var $heart = $(ev.target);
  
        // Redundancies allowed so is easy to read
        if( $heart.hasClass("active") ) {
          if( $heart.hasClass("intermediate") ) {
            $heart.removeClass("active").removeClass("intermediate");
          } else if( !$heart.hasClass("intermediate") ) {
            $heart.addClass("active").addClass("intermediate");
          }
        } else if( !$heart.hasClass('active') ) {
          $heart.addClass("active");
        }
        this.save();
      }); // onclick
    } // constr
  
    test() {
      console.log("Favorite icon states:", this.$favs);
      console.log("Dislike icon states:", this.$hates);
    }
  
    save() {
      this.$favs = [];
      this.$hates = [];
  
      var $favWrappers = $(this.favIconWrapper);
  
      $favWrappers.each( (a, favWrapper)=>{ 
        var $fav = $(favWrapper).find(".active:not(.intermediate)");
        if($fav.length)
          this.$favs.push($fav);
      });
  
      $favWrappers.each( (a, favWrapper)=>{ 
        var $hate = $(favWrapper).find(".intermediate");
        if($hate.length)
          this.$hates.push($hate);
      });
  
      var favStr = this.$favs.map( (heart)=>{
        var parent = $(heart).closest(this.relParent);
        var label = parent.find(this.relTextDescendant).text();
        return label;
      });
      favStr = JSON.stringify(favStr);
  
      var hateStr = this.$hates.map( (heart)=>{
        var parent = $(heart).closest(this.relParent);
        var label = parent.find(this.relTextDescendant).text();
        return label;
      });
      hateStr = JSON.stringify(hateStr);
  
  
      $.post("php-favs-list/write-favs.php", {favorites:favStr, hates:hateStr}).done((res)=>{
        console.log(res);
      });
    }; // save
  
    load() {
  
        $.getJSON("php-favs-list/read-favs.php").done(bundled=>{ 
          
          var {favorites, hates} = bundled;
  
          for(var i=0; i<favorites.length; i++) {
            var favorite = favorites[i];
            // console.log(favorite);
            var $heart = $(`${this.relTextDescendant}:contains(${favorite})`).closest(this.relParent).find(this.favIconWrapper).children().eq(0);
            $heart.addClass("active");
          }
  
          for(var i=0; i<hates.length; i++) {
            var hate = hates[i];
            // console.log(hate);
            var $heart = $(`${this.relTextDescendant}:contains(${hate})`).closest(this.relParent).find(this.favIconWrapper).children().eq(0);
            $heart.addClass("active intermediate");
          }
        }); // getJSON
    } // load
  } // favsListCreator