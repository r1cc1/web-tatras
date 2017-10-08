<?php

$post_data = file_get_contents("php://input");
$data = json_decode($post_data);

$to      = 'spa@minipivovartatras.sk'; // this is your Email address
$from    = $data->email; // this is the sender's Email address
$date    = $data->date;
$termin   = $data->termin;
$treatment  = $data->treatment;
$amount  = $data->amount;
$amount2  = $data->amount2;
$finalPrice    = $data->finalPrice;
$name   = $data->name;
$phone  = $data->phone;
$text  = $data->text;
$subject = 'Rezervacia Kupele'; // predmet

// text emailu
$message = '';
$message .= $name . ' ODOSLAL NOVU REZERVACIU:' . "\n\n";
$message .= "\n\n";
$message .= 'Datum: ' . $date . "\n\n";
$message .= 'Cas: ' . $termin . "\n\n";
$message .= 'Procedura: ' . $treatment . "\n\n";
$message .= "\n\n";
$message .= 'Pocet osob: ' . $amount . "\n\n";
$message .= 'Pocet vani: ' . $amount2 . "\n\n";
$message .= "\n\n";
$message .= 'Cena: ' . $finalPrice . "EUR \n\n";
$message .= "\n\n";
$message .= 'Tel. cislo: ' . $phone . "\n\n";
$message .= 'Email: ' . $from . "\n\n";
$message .= "\n\n";
$message .= 'Poznamka: ' . $text . "\n\n";



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