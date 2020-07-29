<?php

$client = new MongoDB\Client(
    'mongodb+srv://ejazkhan:ejazullah0000@tmt-website.waui8.mongodb.net/ejazkhan?retryWrites=true&w=majority');
$db = $client->ejazkhan;
$collection = $db->users;

if($_POST){
   $user_data=array{
     'first_name'=> $_POST['first_name'],
     'last_name'=> $_POST['last_name'],
     'email'=> $_POST['email'],
     'user_name'=> $_POST['user_name'],
     'user_password'=> $_POST['user_password']
   }
   if($db->insert($insert)){
       echo "User added successfully";
   }
   else{
       echo "error occured";
   }
   else{
       echo "main error";
   }
}

?>