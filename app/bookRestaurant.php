<?php

$post_data = file_get_contents("php://input");
$data = json_decode($post_data);

$to      = 'restaurant@minipivovartatras.sk'; // this is your Email address
$from    = $data->email; // this is the sender's Email address
$date    = $data->date;
$timer   = $data->timer;
$amount  = $data->amount;
$room    = $data->room;
$name   = $data->name;
$phone  = $data->phone;
$addText  = $data->addText;
$subject = 'Nova Rezervacia Restauracia'; // predmet


// hlavicky
$headers = "From: " . $from . "\r\n";
$headers .= "Reply-To: ". $from . "\r\n" . 'X-Mailer: PHP/' . phpversion();
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";


$message = '<html><body>';
$message .= '<h1><strong>'. $name .'</strong>, Odoslal ziadost o Rezervaciu:</h1>';
$message .= '<br>';
$message .= '<table>';
$message .= '<tr><td>Datum:</td><td>' . $date . '</td></tr>';
$message .= '<tr><td>Cas:</td><td>' . $timer . '</td></tr>';
$message .= '<tr><td>Miestnost:</td><td>' . $room . '</td></tr>';
$message .= '<tr><td>Pocet osob:</td><td>' . $amount . '</td></tr>';
$message .= '<tr><td>Tel. cislo:</td><td><a href="tel:' . $phone . '">' . $phone . '</a></td></tr>';
$message .= '<tr><td>Email:</td><td><a href="mailto:' . $from . '" class="email">' . $from . '</a></td></tr>';
$message .= '<tr><td>Poznamka:</td><td>' . $addText . '</td></tr>';
$message .= '</table>';
$message .= "\n\n";
$message .= '</body></html>';

mail($to,$subject,$message,$headers);
// email majitelovi


// email zakaznik
$subject2 = 'Ziadost o Rezervaciu, Minipivovar TATRAS ';


$headers2 = "From: " . $to . "\r\n";
$headers2 .= "Reply-To: ". $to . "\r\n" . 'X-Mailer: PHP/' . PHP_VERSION;
$headers2 .= "MIME-Version: 1.0\r\n";
$headers2 .= "Content-Type: text/html; charset=ISO-8859-1\r\n";


// text emailu
$message2 = '<html><body>';
$message2 .= '<h1>Dobry den <strong>'. $name;
$message2 .= '<br>';
$message2 .= '</strong>, nizsie najdete kopiu vasej ziadosti o rezervaciu:</h1>';
$message2 .= '<table>';
$message2 .= '<tr><td>Datum:</td><td>' . $date . '</td></tr>';
$message2 .= '<tr><td>Cas:</td><td>' . $timer . '</td></tr>';
$message2 .= '<tr><td>Miestnost:</td><td>' . $room . '</td></tr>';
$message2 .= '<tr><td>Pocet osob:</td><td>' . $amount . '</td></tr>';
$message2 .= '<tr><td>Tel. cislo:</td><td><a href="tel:' . $phone . '">' . $phone . '</a></td></tr>';
$message2 .= '<tr><td>Email:</td><td><a href="mailto:' . $from . '" class="email">' . $from . '</a></td></tr>';
$message2 .= '<tr><td>Poznamka:</td><td>' . $addText . '</td></tr>';
$message2 .= '</table>';
$message2 .= '<br>';
$message2 .= '<br>';
$message2 .= '<b>Upozornenie, tato ziadost neni platna. Platnost nadobudne az ked obdrzite potvrdzujuci email o rezervacii.</b>';
$message2 .= '<br>';
$message2 .= '<br>';
$message2 .= '<b>Minipivovar TATRAS</b>';
$message2 .= '<br>';
$message2 .= '<table>';
$message2 .= '<tr><td>Tel: </td><td><a href="tel:00421948828727">(+421) 0948 828 727</a></td></tr>';
$message2 .= '<tr><td>Email: </td><td><a href="mailto:restaurant&#64minipivovartatras&#46sk" class="email">restaurant@minipivovartatras.sk</a></td></tr>';
$message2 .= '</body></html>';

// posle "kopiu" emailu zakaznikovi
mail($from,$subject2,$message2,$headers2);

?>