<?php

namespace App;

enum FlashStatus: string
{
    case Success = 'success';
    case Error   = 'error';
    case Info    = 'info';
    case Warning = 'warning';
    case Dark    = 'dark';
}

class FlashMessage
{

    public static function response(string $message = '',  FlashStatus $status = FlashStatus::Info): array
    {
        $data =  [
            "message" => $message,
            "status" => $status->value
        ];
        return [
            "response" => $data
        ];
    }
}
