import React, { useState } from "react";
import { Collapse, ListGroup } from "react-bootstrap";
import { FaRadio } from "react-icons/fa6";
import "./Library.css";

export default function Library({
  filters,
  setStationFilter,
  onFavoritesClick,
}) {
  const [activeFilter, setActiveFilter] = useState(null);
  const [favoritesActive, setFavoritesActive] = useState(false);

  const handleFilterChange = (filter) => {
    setStationFilter(filter);
    setActiveFilter(filter);
    setFavoritesActive(false);
  };

  const handleFavoritesClick = () => {
    if (typeof onFavoritesClick === "function") {
      onFavoritesClick();
      setActiveFilter(null);
      setFavoritesActive(true);
    } else {
      console.error("onFavoritesClick is not a function");
    }
  };

  return (
    <div className="library-container">
      <div className="d-flex align-items-center justify-content-center mt-4">
        <h2 className="sidebar-title">Library</h2>
        <FaRadio size={24} />
      </div>
      <Collapse in={true} className="sidebar justify-content-center">
        <div className="sidebar-content">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <ListGroup flush className="mt-4">
                {filters.map((filter, index) => (
                  <ListGroup.Item
                    key={index}
                    onClick={() => handleFilterChange(filter)}
                    action
                    className={`text-center ${
                      activeFilter === filter ? "active" : ""
                    }`}
                  >
                    {filter.toUpperCase()}
                  </ListGroup.Item>
                ))}
                <ListGroup.Item
                  onClick={handleFavoritesClick}
                  action
                  id="favorite-btn"
                  className={`text-center ${favoritesActive ? "active" : ""}`}
                >
                  FAVORITES
                </ListGroup.Item>
              </ListGroup>
            </div>
          </div>
        </div>
      </Collapse>
    </div>
  );
}
