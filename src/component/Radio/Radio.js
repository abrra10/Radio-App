import React, { useState, useEffect, useContext } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import { RadioBrowserApi } from "radio-browser-api";
import Library from "../Library/Library";
import Stations from "../Stations/Stations";
import { FavoriteContext } from "../../contexts/FavoriteContext";

export default function Radio() {
  const [stations, setStations] = useState([]);
  const [stationFilter, setStationFilter] = useState("all");
  const [favoriteStations, setFavoriteStations] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data = [];
        if (stationFilter === "favorites") {
          data = favoriteStations;
          setShowFavorites(true);
        } else {
          data = await setupApi(stationFilter);
          setShowFavorites(false);
        }
        setStations(data);
      } catch (error) {
        console.error("Error fetching stations:", error);
      }
    };

    fetchData();
  }, [stationFilter, favoriteStations]);

  const setupApi = async (stationFilter) => {
    const api = new RadioBrowserApi(fetch.bind(window), "My Radio App");

    try {
      const stations = await api.searchStations({
        language: "english",
        tag: stationFilter,
        limit: 200,
      });
      return stations;
    } catch (error) {
      console.error("Error setting up API:", error);
      return [];
    }
  };

  const { favorite } = useContext(FavoriteContext);

  const handleFavoritesClick = () => {
    setStationFilter("favorites");
  };

  const handleFilterChange = (filter) => {
    setStationFilter(filter);
  };

  const filters = [
    "all",
    "classical",
    "sports",
    "news",
    "disco",
    "house",
    "jazz",
    "pop",
    "rap",
    "retro",
    "rock",
  ];

  return (
    <Container fluid>
      <Row style={{ height: "92vh" }}>
        <Col
          sm={4}
          style={{
            maxHeight: "100%",
            height: "100%",
            overflow: "hidden",
            width: "34%",
            backgroundColor: "#f8f398",
          }}
        >
          <div className="filters-container" style={{ height: "100%" }}>
            <Library
              filters={filters}
              setStationFilter={handleFilterChange}
              onFavoritesClick={handleFavoritesClick}
            />
          </div>
        </Col>
        <Col
          sm={8}
          style={{
            maxHeight: "100%",
            height: "100%",
            overflowY: "auto",
            width: "66%",
            backgroundColor: "#f8f398",
          }}
        >
          <div
            className="stations-container"
            style={{ height: "100%", width: "100%" }}
          >
            <Stations
              stations={stations}
              favoriteStationsData={favorite}
              showFavorites={showFavorites}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
}
