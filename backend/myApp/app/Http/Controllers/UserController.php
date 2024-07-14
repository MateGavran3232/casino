<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function show($id)
    {
        $query = "SELECT * FROM users WHERE user_id = ?";
        $result = DB::select($query, [$id]);
        
        if (empty($result)) {
            return response()->json(['message' => 'User not found'], 404);
        }
        return response()->json($result);
    }
}
