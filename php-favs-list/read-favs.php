<?php
    $favorites = @file_get_contents("../data-favs-list/favorites.json");
    if($favorites===false || $favorites==="") $favorites = [];
    $favorites = json_decode($favorites);

    $hates = @file_get_contents("../data-favs-list/hates.json");
    if($hates===false || $hates==="") $hates = [];
    $hates = json_decode($hates);

    $bundled = ["favorites"=>$favorites, "hates"=>$hates];
    echo json_encode($bundled);
    // echo "[\"favorites\":$favoritesStr, \"hates\":$hatesStr]";
?>