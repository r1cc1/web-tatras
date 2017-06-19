<?php

$post_data = file_get_contents("php://input");
$data = json_decode($post_data);

$to      = 'penzion@minipivovartatras.sk'; // this is your Email address
$from    = $data->email; // this is the sender's Email address
$checkin    = $data->checkin;
$checkout   = $data->checkout;
$amount  = $data->amount;
$name   = $data->name;
$phone  = $data->phone;
$subject = 'Rezervacia Penzion'; // predmet

// text emailu
$message = '';
$message .= $name . ' ODOSLAL NOVU REZERVACIU:' . "\n\n";
$message .= 'Príchod: ' . $checkin . "\n\n";
$message .= 'Odchod: ' . $checkout . "\n\n";
$message .= 'Počet osôb: ' . $amount . "\n\n";
$message .= 'Tel. číslo: ' . $phone . "\n\n";
$message .= 'Email: ' . $from . "\n\n";


// hlavicky
$headers = 'From: ' . $from . "\r\n" .
    'Reply-To: ' . $from . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

mail($to,$subject,$message,$headers);
// email majitelovi

// email zakaznik
$subject2 = 'Potvrdenie o Rezervacii, Minipivovar TATRAS ';

$message2 = '';
$message2 .= 'Dobry den ' . $name .  ", nizsie najdete kopiu vasej rezervacie:\n\n";
$message2 .= $message;
$message2 .= "\n\n";
$message2 .= 'Minipivovar TATRAS' . "\n\n";

$headers2 = 'From: ' . $to . "\r\n" .
    'Reply-To: ' . $to . "\r\n" .
    'X-Mailer: PHP/' . PHP_VERSION;

// posle "kopiu" emailu zakaznikovi
mail($from,$subject2,$message2,$headers2);

?>