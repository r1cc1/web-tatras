<?php

$post_data = file_get_contents("php://input");
$data = json_decode($post_data);

$to         = 'penzion@minipivovartatras.sk'; // this is your Email address
$toName     = 'Penzión*** TATRAS'; // this is your Name
$from       = $data->email; // this is the sender's Email address
$checkin    = $data->checkin;
$checkout   = $data->checkout;
$amount     = $data->amount;
$name       = $data->name;
$phone      = $data->phone;
$subject = 'Nová rezervácia Penzión';


// hlavicka
$headers = "From: " . $from . "\r\n";
$headers .= "Reply-To: ". $from . "\r\n" . 'X-Mailer: PHP/' . phpversion();
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
$headers .= "IsHTML(true)\r\n";

// text emailu
$message = '<html><body>';
$message .= '<h1>'. $name .'</h1><h3>, odoslal novú žiadost o Rezerváciu:</h3>';
$message .= '<br>';
$message .= '<table>';
$message .= '<tr><td>Príchod:</td><td>' . $checkin . '</td></tr>';
$message .= '<tr><td>Odchod:</td><td>' . $checkout . '</td></tr>';
$message .= '<tr><td>Počet osob:</td><td>' . $amount . '</td></tr>';
$message .= '<tr><td>Tel. číslo:</td><td><a href="tel:' . $phone . '">' . $phone . '</a></td></tr>';
$message .= '<tr><td>Email:</td><td><a href="mailto:' . $from . '" class="email">' . $from . '</a></td></tr>';
$message .= '</table>';
$message .= "\n\n";
$message .= '</body></html>';

mail($to,$subject,$message,$headers);


// email zakaznik
$subject2 = 'Ziadost o Rezervaciu, Minipivovar TATRAS ';

// hlavicka
$headers2 = "From: " . $toName . " <" . $to .">\r\n";
$headers2 .= "Reply-To: ". $to . "\r\n" . 'X-Mailer: PHP/' . PHP_VERSION;
$headers2 .= "MIME-Version: 1.0\r\n";
$headers2 .= "Content-Type: text/html; charset=UTF-8\r\n";
$headers2 .= "IsHTML(true)\r\n";

// text emailu zakaznikovi
$message2 = '<html><body style="background: #ebdab9; padding: 0; margin: 0;">';
$message2 .= '<br>';
$message2 .= '<img src="http://minipivovartatras.sk/components/assets/imgs/tatras_logo.png" alt="TATRAS Logo" style="display:block; position: relative; margin: 0 auto; width: 150px; height: 150px;"/>';
$message2 .= '<br>';
$message2 .= '<h1 style="text-align: center; color: #e0232e;">' . $name .'</h1>';
$message2 .= '<h1 style="text-align: center;">Vaša žiadosť bola odoslaná</h1><br><br>';
$message2 .= '<h3 style="text-align: center;">Kópia Vašej žiadosti :</h3>';
$message2 .= '<table style="padding: 10px; margin: 0 auto;">';
$message2 .= '<tr><td>Príchod:</td><td><b>' . $checkin . '</b></td></tr>';
$message2 .= '<tr><td>Odchod:</td><td><b>' . $checkout . '</b></td></tr>';
$message2 .= '<tr><td>Počet osôb:</td><td><b>' . $amount . '</b></td></tr>';
$message2 .= '<tr><td>Tel. číslo:</td><td><a href="tel:' . $phone . '">' . $phone . '</a></td></tr>';
$message2 .= '<tr><td>Email:</td><td><a href="mailto:' . $from . '" class="email">' . $from . '</a></td></tr>';
$message2 .= '</table><br><br>';
$message2 .= '<div style="display: block; padding: 10px; margin: 0 auto; background: #e0232e; width: 100%; color: #2b2a29; text-align: center;">';
$message2 .= '<h4>UPOZORNENIE!</h4><h4> Táto žiadost není platná ako rezervácia.<br> Budeme Vás kontaktovať pre potvrdenie rezervácie.</h4></div>';
$message2 .= '<div style="display:block; position: relative; background-color: #2b2a29; width: 100%; padding: 10px;bottom: 0; z-index: 2;left: 0; text-align: center; color: #FFFFFF;">
                    <div class="item" ><br>
                    <a href="tel:00421948828727" style="color: white; font-size: 18px; text-decoration: none;">(+421) 0948 828 727</a>
                    <br><br>
                    <a href="mailto:penzion&#64minipivovartatras&#46sk" style="color: white; font-size: 18px; text-decoration: none;">penzion@minipivovartatras.sk</a>
                    <br>
                    <br>
                    <a href="http://minipivovartatras.sk/#/welcome" style="color: white; font-size: 18px; text-decoration: none;">www.minipivovartatras.sk</a>
                    <br>
                    <br>
                    <br>
                    <img src="http://minipivovartatras.sk/components/assets/imgs/tatry-silueta.svg" alt="TATRAS Logo" style="display:block; margin: 0 auto; position: relative; width: 150px; height: auto;">
                    <br>
                    <p style="color: #d6b472;">Minipivovar TATRAS, s.r.o.</p><p style="color: #d6b472;">Námestie sväteho Egídia 60</p><p style="color: #d6b472;">05801 Poprad</p><p style="color: #d6b472;">Slovensko</p>
                    </div>
                </div>';
$message2 .= '</body></html>';

// posle "kopiu" emailu zakaznikovi
mail($from,$subject2,$message2,$headers2);

?>