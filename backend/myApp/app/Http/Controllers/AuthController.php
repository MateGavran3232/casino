<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $username = $request->input('username');
        $password = $request->input('password');
        $query = "SELECT * FROM users WHERE username = ?";
        $result = DB::select($query, [$username]);

        if (empty($result) || !Hash::check($password, $result[0]->password)) {
            return response()->json(['message' => 'User not found or password incorrect'], 200);
        }
        return response()->json($result);
    }

    public function register(Request $request)
    {
        $username = $request->input('username');
        $email = $request->input('email');
        $password = Hash::make($request->input('password'));
        $query = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";

        DB::insert($query, [$username, $email, $password]);
        return response()->json(['message' => 'OK']);
    }
}
