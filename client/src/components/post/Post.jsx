import { Link } from "react-router-dom";
import "./post.css";

export default function Post({post}) {
  const PF ="http://localhost:8002/images/";
  return (
    <div className="post">
      {post.photo && (
        <img
        className="postImg"
        src={PF + post.photo}
        alt=""
      />
      )}

      <hr />

      <div className="postInfo">
        <div className="postCats">
          {post.categories.map((c) => (
            <span className="postCat">
               {c.name}
            </span>
          ))}
        </div>
        <span className="postTitle">
          <Link to={`/post/${post._id}`} className="link">
            {post.title}
          </Link>
        </span>
        <hr />
        <span className="postDate">
          {new Date(post.updatedAt).toDateString()}
        </span>
      </div>

      <hr />

      <p className="postDesc">
         {post.desc}
      </p>
    </div>
  );
}
