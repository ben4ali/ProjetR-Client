import React from "react";
import "../styles/style-explore.css";
import { SearchBar } from "../components/explore/SearchBar";
import { PostList } from "../components/explore/PostList";

export const Explore = () => {
  return (
    <div className="explore-container">
      <SearchBar />
      <hr />
      <PostList />
    </div>
  );
};
