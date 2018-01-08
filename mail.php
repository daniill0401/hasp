<?php
// Write your logic here
mail("daniill0401@ya.ru", "Заявка. ".date('r'), print_r($_REQUEST,1),"From: info@eevr.ru\r\nContent-Type: text/plain; charset=UTF-8");