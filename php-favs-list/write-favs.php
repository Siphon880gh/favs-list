<?php
    // var_dump($_POST["hates"]);
    // die();

    $statuses = [];
    if(isset($_POST["favorites"])) {
        $favorites = $_POST["favorites"];
        @file_put_contents("../data-favs-list/favorites.json", $favorites);
        array_push($statuses, ["favorites_post"=>true]);
    } 
    if(isset($_POST["hates"])) {
        $hates = $_POST["hates"];
        @file_put_contents("../data-favs-list/hates.json", $hates);
        array_push($statuses, ["hates_post"=>true]);
    } 

    echo json_encode(["debug"=>$_POST["favorites"], "debug1"=>$_POST["hates"]]);

?>