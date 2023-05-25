import "./LogoSearch.css";
import React, { useEffect, useState } from "react";
import Logo from "../../../img/logo.png";
import { BiSearch } from "react-icons/bi";
import axios from "axios";
import { Link } from "react-router-dom";
import LoadIcon from "../../../img/Loading.gif";

const LogoSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!query) return;

      setLoading(true);
      const res = await axios.get("/users/search", {
        params: { q: query, limit: 8 },
      });
      setResults(res.data.data);
      setLoading(false);
    };

    fetchUsers();
  }, [query]);

  return (
    <div className="LogoSearch">
      <div className="search">
        <img src={Logo} alt="" />
        <div className="searchBar">
          <input
            type="text"
            placeholder="Search for friends..."
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="search-icon">
            <BiSearch />
          </div>
        </div>
      </div>

      {loading && 
        <ul className="results">
          <img src={LoadIcon} alt="Loading..." className="loadingIcon" />
        </ul>
      }

      {!loading &&  
        <ul className="results" style={{ display: (!results || !query) && "none" }}>
          {results && results.length === 0 && <div className="noResults">No user found</div>}
          {results &&
            results.length > 0 &&
            results.map((res, key) => {
              return (
                <li key={key} className="resultsCard">
                  <div>
                    <img src={res.avatar.url} alt="" className="userImg" />
                    <div className="userName">
                      <span>{res.name}</span>
                      <span>{res.username}</span>
                    </div>
                  </div>
                  <Link
                    to={`/profile/${res._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <button className="button fc-btn">Show Profile</button>
                  </Link>
                </li>
              );
            })}
        </ul>
      }

    </div>
  );
};

export default LogoSearch;
