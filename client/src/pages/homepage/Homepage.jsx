
import { useState, useEffect } from "react"
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./homepage.css";
import axios from 'axios'
import {useLocation} from 'react-router'

export default function Homepage() {

  const {search} = useLocation()
  console.log(search);

  const [posts, setPosts] = useState([])

  useEffect(() => {
   
      const fetchPosts= async() => {

        const res = await axios.get("/posts"+ search ); // use as sample in url write "http://localhost:3000/posts?user=hilwa"
        setPosts(res.data);
        // console.log(res.data);
    }

        fetchPosts()
        
  }, [search])

  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts}/>
        <Sidebar />
      </div>
    </>
  );
}
