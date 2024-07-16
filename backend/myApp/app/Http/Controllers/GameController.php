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

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'image' => 'required|string',
            'description' => 'required|string',
            'publisher' => 'required|string|max:255',
            'bigImage' => 'required|string',
        ]);

        $query = "INSERT INTO games (title, image, description, publisher, bigImage) VALUES (?, ?, ?, ?, ?)";
        DB::insert($query, [
            $validated['title'],
            $validated['image'],
            $validated['description'],
            $validated['publisher'],
            $validated['bigImage']
        ]);

        return response()->json(['message' => 'Game added successfully'], 201);
    }

    public function destroy($id)
    {
        $query = "DELETE FROM games WHERE id = ?";
        $result = DB::delete($query, [$id]);

        if ($result === 0) {
            return response()->json(['message' => 'Game not found'], 404);
        }
        
        return response()->json(['message' => 'Game deleted successfully'], 200);
    }
}
