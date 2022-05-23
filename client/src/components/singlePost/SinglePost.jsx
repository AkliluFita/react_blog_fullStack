import {useEffect, useState, useContext} from 'react'
import { Link } from "react-router-dom";
import {useLocation} from 'react-router'
import "./singlePost.css";
import axios from "axios";
import {Context} from '../../context/Context'


export default function SinglePost() {

   const location = useLocation()
   const [post, setPost] = useState({})
  //  console.log(location.pathname.split("/")[2]); // to get unique direct id
   const path = location.pathname.split("/")[2] // to get single post with id

   const PF ="http://localhost:8002/images/";
   const {user} = useContext(Context)
   const [title, setTitle] = useState("");
   const [desc, setDesc] = useState("");
   const [updateMode, setUpdateMode] = useState(false);

  //  use effect for get single post items
   useEffect(() => {
     
    const fetchSinglePost= async() => {

      const res = await axios.get("/posts/" + path);
      setPost(res.data);
      // console.log(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
  }

  fetchSinglePost()

   }, [path])

  //  delete function, to delete single item post
  const handleDelete = async() => {
    try {
      await axios.delete(`/posts/${post._id}`, {
        data:{username:user.username}  //here "data" is keyword to delete item
      })

      window.location.replace('/')
    } catch (error) {
      
    }
  }


  // update function for single post
  const handleUpdate = async () => {
    try {
      await axios.put(`/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
      });
      setUpdateMode(false)
    } catch (err) {}
  };

  

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img
          className="singlePostImg"
          src={PF + post.photo}
          alt=""
        />
        )}
       { updateMode? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (<h1 className="singlePostTitle">
          {title}
          {(post.username === user?.username) && <div className="singlePostEdit">
            <i className="singlePostIcon far fa-edit" onClick={() => setUpdateMode(true)}></i>
            <i className="singlePostIcon far fa-trash-alt" onClick={handleDelete}></i>
          </div>}
        </h1>)}
        <div className="singlePostInfo">
          <span>
            Author:
            <b className="singlePostAuthor">
              <Link className="link" to={`/?user=${post.username}`} >
                {post.username}
              </Link>
            </b>
          </span>
          <span>{new Date(post.updatedAt).toDateString()}</span>
        </div>
        { updateMode? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : <p className="singlePostDesc">
              {desc}
            </p>
       }

       {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
}
