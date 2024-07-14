<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GameController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');
        $query = !empty($search) ? "SELECT * FROM games WHERE title LIKE '%$search%'" : "SELECT * FROM games";
        
        $result = DB::select($query);
        return response()->json($result);
    }

    public function show($id)
    {
        $query = "SELECT * FROM games WHERE id = ?";
        $result = DB::select($query, [$id]);
        
        if (empty($result)) {
            return response()->json(['message' => 'Game not found'], 404);
        }
        return response()->json($result);
    }
}
