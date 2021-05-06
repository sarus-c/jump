import React, { useCallback, useEffect, useState } from "react";
import Accordion from "./accordion";
import NoItems from "./noItems";
import Spinner from "../spinner";
import Error from "../error";
import "./list.css";

const List = ({
  handleInfo,
  reload,
}: {
  handleInfo: () => void;
  reload: boolean;
}) => {
  const [list, setList] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getData = (loading: boolean) => {
    if (loading) setLoading(true);
    // GET request using fetch with error handling
    fetch(process.env.REACT_APP_API_SEARCH || "")
      .then(async (response) => {
        const data = await response.json();

        // check for error response
        if (!response.ok) {
          // get error message from body or default to response statusText
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }

        setList(data);
        if (loading) setLoading(false);
      })
      .catch((error) => {
        setError(true);
        setLoading(false);
        console.log("There was an error!", error);
      });
  };

  const handleError = useCallback(() => {
    setError(false);
  }, []);

  const handleDelete = useCallback(
    (id: string, item: string) => {
      setLoading(true);
      const url =
        item === "item"
          ? process.env.REACT_APP_API_ITEMS_DELETE
          : process.env.REACT_APP_API_SEARCH_DELETE;
      // DELETE request using fetch with error handling
      fetch(`${url}/${id}`, {
        method: "DELETE",
      })
        .then(async (response) => {
          const data = await response.json();

          // check for error response
          if (!response.ok) {
            // get error message from body or default to response status
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
          }

          handleInfo();
          console.log("Delete item", id, data);
        })
        .catch((error) => {
          setError(true);
          console.error("There was an error!", error);
        });
    },
    [handleInfo]
  );

  const handleScraping = (id: string) => {
    setLoading(true);
    console.log("Scraping for", id);
    setTimeout(() => {
      handleInfo();
      setLoading(false);
    }, 1500);
  };

  useEffect(() => {
    getData(true);
  }, []);

  useEffect(() => {
    if (reload) {
      setLoading(true)
      getData(false);
    } else {
      setLoading(false)
    }
  }, [reload]);

  return (
    <>
      {error && !loading && <Error handleError={handleError} />}
      {loading && !error && (
        <div className="overlay">
          <Spinner />
        </div>
      )}
      {list.count === 0 && !loading && !error && <NoItems />}
      {list.count > 0 && !error && (
        <Accordion
          list={list}
          handleDelete={handleDelete}
          handleScraping={handleScraping}
        />
      )}
    </>
  );
};

export default List;
