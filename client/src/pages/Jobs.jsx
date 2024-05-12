import React, { useEffect, useState } from "react";
import Job from "../components/Job";
import "./Jobs.css";
import Categories from "../components/Categories/Categories";
import axios from "axios";
import Footer from "../components/shared/Footer/Footer";
import NavBar from "../components/NavBar/NavBar";

const Jobs = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchData(); // Fetch all jobs when component mounts
  }, []);

  useEffect(() => {
    fetchData(); // Fetch jobs based on category change
  }, [category]);


  function fetchData() {
    let url = "http://localhost:5000/api/job";
    if (category) {
      url += `/${category}`;
    }
    axios
      .get(url)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // function searchHandler(e) {
  //   e.preventDefault();
  //   if (search.trim().length === 0) {
  //     fetchData(); // Fetch all jobs when search input is empty
  //     return;
  //   }
  //   axios
  //     .get(`http://localhost:5000/api/job?search=${search}`)
  //     .then((res) => {
  //       setData(res.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }
  function searchHandler(e) {
    e.preventDefault();
    if (search.trim().length === 0) {
      // If the search query is empty, do not fetch data
      return;
    }
    axios
      .get(`http://localhost:5000/api/job/search?search=${search}`)
      .then((res) => {
        console.log(res.data)
        setData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }



  return (
    <>
      {/* <NavBar /> */}
      <br />
      <br />
      <br />
      <div className="flex justify-center">
        <form
          className="search"
          onSubmit={searchHandler}
          style={{ flexDirection: "row", marginTop: "25px" }}
        >
          <input
            type="search"
            name="q"
            id="search"
            value={search}
            placeholder="Enter text to search"
            onChange={(e) => {
              setSearch(e.target.value);
              console.log(search);
            }}
            required
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 mr-5"
            style={{ width: "500px" }}
          />
          <button type="submit">Search</button>
        </form>
      </div>

      <br />
      <div>
        <Categories setCategory={setCategory} />
      </div>
      <div className="job-list mt-8 mb-8">
        {data.length === 0 ? (
          <p className="heading" style={{ fontSize: "35px" }}>
            No search results found!
          </p>
        ) : (
          data.map((job) => <Job key={job.jobId} job={job} />)
        )}
      </div>

      {/* <Footer /> */}
    </>
  );
};

export default Jobs;
