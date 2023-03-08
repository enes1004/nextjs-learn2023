<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;

class PostController extends Controller
{
    public function index(){
      return response()->json(Post::all());
    }
    public function show(Post $post){
      return response()->json($post);
    }

}
