<?php

$post_data = file_get_contents("php://input");
$data = json_decode($post_data);


$to      = 'info@minipivovartatras.sk'; // this is your Email address
$toName  = 'Minipivovar TATRAS'; // this is your Name
$from    = $data->email; // this is the sender's Email address
$name = $data->name;
$surname = $data->surname;
$kod   = $data->kod;
$first  = $data->first;
$second  = $data->second;
$third  = $data->third;
$fourth  = $data->fourth;
$fifth  = $data->fifth;
$subject = 'Registracia do Súťaže Najlepšia slovenska pivovica 2018'; // predmet

// hlavicky
$headers = "From: " . $from . "\r\n";
$headers .= "Reply-To: ". $from . "\r\n" . 'X-Mailer: PHP/' . phpversion();
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
$headers .= "IsHTML(true)\r\n";

// text emailu majitelovi
$message = '<html><body>';
$message .= '<h1>' . $name . ' ' . $surname .'</h1><h3>, takto hlasoval v Sutazi:</h3>';
$message .= '<br>';
$message .= '<table>';
$message .= '<tr><td>Email:</td><td><a href="mailto:' . $from . '" class="email">' . $from . '</a></td></tr>';
$message .= '<tr><td>Kod Setu:</td><td><b>' . $kod . '</b></td></tr>';
$message .= '<tr><td>1.Miesto:</td><td><b>' . $first . '</b></td></tr>';
$message .= '<tr><td>2.Miesto:</td><td><b>' . $second . '</b></td></tr>';
$message .= '<tr><td>3.Miesto:</td><td><b>' . $third . '</b></td></tr>';
$message .= '<tr><td>4.Miesto:</td><td><b>' . $fourth . '</b></td></tr>';
$message .= '<tr><td>5.Miesto:</td><td><b>' . $fifth . '</b></td></tr>';
$message .= '</table>';
$message .= '</body></html>';

// poslat email majitelovi
mail($to,$subject,$message,$headers);


// email zakaznikovi
$subject2 = 'Registracia do Súťaže Najlepšia slovenska pivovica 2018';
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
$message2 .= '<h1 style="text-align: center; color: #e0232e;">Vážený degustátor ' . $name . ' ' . $surname . '</h1>';
$message2 .= '<h3 style="text-align: center;">ďakujeme Vám za registráciu a zapojenie sa do súťaže O najlepšiu slovenskú pivovicu.</h3><br><br>';
$message2 .= '<h2 style="text-align: center;">Vaše hodnotenie: :</h2>';
$message2 .= '<table style="padding: 10px; margin: 0 auto; font-size: 16px;">';
$message2 .= '<tr><td>1.Miesto:</td><td><b style="text-transform: uppercase;">' . $first . '</b></td></tr>';
$message2 .= '<tr><td>2.Miesto:</td><td><b style="text-transform: uppercase;">' . $second . '</b></td></tr>';
$message2 .= '<tr><td>3.Miesto:</td><td><b style="text-transform: uppercase;">' . $third . '</b></td></tr>';
$message2 .= '<tr><td>4.Miesto:</td><td><b style="text-transform: uppercase;">' . $fourth . '</b></td></tr>';
$message2 .= '<tr><td>5.Miesto:</td><td><b style="text-transform: uppercase;">' . $fifth . '</b></td></tr>';
$message2 .= '<tr><td>Kod Setu:</td><td><b style="text-transform: uppercase;">' . $kod . '</b></td></tr>';
$message2 .= '</table><br><br>';
$message2 .= '<h3 style="text-align: center;">Zaradili sme Vás do žrebovania o osem hodnotných cien. Držíme Vám palce a prajeme Vám aby ste boli vyžrebovaný.<br> O výsledku súťaže Vás budeme informovať.</h3><br><br>';
$message2 .= '<div style="display:block; position: relative; background-color: #2b2a29; width: 100%; padding: 10px;bottom: 0; z-index: 2;left: 0; text-align: center; color: #FFFFFF;">
                    <div class="item" ><br>
                    <a href="tel:00421948828727" style="color: white; font-size: 12px; text-decoration: none;">(+421) 0948 828 727</a>
                    <br><br>
                    <a href="mailto:info&#64minipivovartatras&#46sk" style="color: white; font-size: 12px; text-decoration: none;">info@minipivovartatras.sk</a>
                    <br>
                    <br>
                    <a href="https://minipivovartatras.sk/#/sutaz" style="color: white; font-size: 12px; text-decoration: none;">minipivovartatras.sk/#/sutaz</a>
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