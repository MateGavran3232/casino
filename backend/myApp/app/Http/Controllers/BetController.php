<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BetController extends Controller
{
    public function bet($type, Request $request)
    {
        $money = $request->input('money');
        $userId = $request->input('userId');
        
        switch ($type) {
            case 'WON':
                $query2 = "UPDATE users SET money = money + ? WHERE user_id = ?";
                DB::transaction(function () use ($query2, $money, $userId) {
                    DB::update($query2, [$money, $userId]);
                });
                break;
            case 'ADD':
                $query = "UPDATE users SET money = money + ? WHERE user_id = ?";
                DB::update($query, [$money, $userId]);
                break;
            case 'START':
                $query = "UPDATE users SET money = money - ? WHERE user_id = ?";
                DB::update($query, [$money, $userId]);
                break;
            default:
                return response()->json(['message' => 'Invalid type'], 400);
        }

        return response()->json(['message' => 'OK']);
    }
}
