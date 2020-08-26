Favs List
=============
By Weng Fei Fung

jQuery/PHP code for developers that allows users to favorite or dislike items in a list. The user can revisit the webpage and still see the favorites and dislikes.

Requirements
---
- PHP
- jQuery

Architecture
---
Have these files in place:

- assets/
- data-favs-list/
- php-favs-list
    
Layout
---
1. There must be a parent element that includes a button wrapper and a text wrapper. In the following case, they are parent element li, button wrapper .favs-wrapper, and text wrapper .name:
```
    <li><span class="favs-wrapper"><i class='fa fa-heart clickable'></i></span> <span class='name'><a href='#'>Head</a></span></li>
``` 

2. After your dom is loaded:
```
    // Init Fav saving system
    window.Fav = new FavsListCreator({"favIconWrapper":".favs-wrapper", "relParent":"li", "relTextDescendant":".name"});
  
    // Load Favs
    window.Fav.load();
```

How the code works
---
The class constructed keeps track of three selectors. The first selector is the button wrapper. Then the parent element which can be a direct ascendant or some ascendant up from the button wrapper. Then it tracks the text wrapper which must be a descendant of the parent element. The button wrapper and text wrapper does not need to be siblings but they can be. These three selectors are necessary for the code to save the text to data-favs-list once a favorite button is clicked, by traversing the DOM.