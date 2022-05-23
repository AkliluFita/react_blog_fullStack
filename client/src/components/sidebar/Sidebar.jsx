import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";
import { useLocation } from "react-router";
import axios from "axios";

export default function Sidebar() {
  const location = useLocation();
  // console.log(location);

  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCat = async () => {
      const res = await axios.get("/categories");
      setCats(res.data);
    };

    getCat();
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img
          src="https://media.istockphoto.com/photos/the-more-you-know-the-more-your-business-grows-picture-id1292991881?b=1&k=20&m=1292991881&s=170667a&w=0&h=5QfHORbgcqTFyHbRp7L83YlVF-U5Mt-AsWXX2zBtOZ8="
          alt=""
        />
        <p>
          This is Aklilu Fita, i am fullstack web developer and i have master
          degree by computer engineering
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {cats.map((c) => (
            <li className="sidebarListItem" key={c._id}>
              <Link className="link" to={`/?cat=${c.name}`}>
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW ME</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
          <i className="sidebarIcon fab fa-pinterest-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
        </div>
      </div>
    </div>
  );
}
