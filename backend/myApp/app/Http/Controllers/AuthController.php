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
        
        $user = DB::table('users')->where('username', $username)->first();
        
        if ($user && Hash::check($password, $user->password)) {
            return response()->json($user);
        }
        
        return response()->json(['message' => 'User not found or password incorrect'], 200);
    }

    public function register(Request $request)
    {
        $username = $request->input('username');
        $email = $request->input('email');
        $password = $request->input('password');

        $hashedPassword = Hash::make($password);

        DB::table('users')->insert([
            'username' => $username,
            'email' => $email,
            'password' => $hashedPassword,
        ]);

        return response()->json(['message' => 'OK']);
    }
}
