import React, { useCallback, useEffect, useState } from "react";
import Accordion from "./accordion";
import NoItems from "./noItems";
import Spinner from "../spinner";
import Error from "../error";
import "./list.css";

const List = ({ handleInfo, reload }: { handleInfo: () => void, reload: boolean }) => {
  const [list, setList] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getData = () => {
    setLoading(true);
    // GET request using fetch with error handling
    fetch(process.env.REACT_APP_API_SEARCH || '')
      .then(async (response) => {
        const data = await response.json();

        // check for error response
        if (!response.ok) {
          // get error message from body or default to response statusText
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }

        setList(data);
        setLoading(false);
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

  const handleDeleteItem = useCallback(
    (search_id: string, id: string) => {
      // DELETE request using fetch with error handling
      fetch(`${process.env.REACT_APP_API_ITEMS_DELETE}/${search_id}/${id}`, {
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
          getData();
          console.log("Delete item", search_id, id, data);
        })
        .catch((error) => {
          setError(true);
          console.error("There was an error!", error);
        });
    },
    [handleInfo]
  );

  const handleDeleteList = useCallback(
    (id: string) => {
      // DELETE request using fetch with error handling
      fetch(`${process.env.REACT_APP_API_SEARCH_DELETE}/${id}`, {
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
          getData();
          console.log("Delete list", id, data);
        })
        .catch((error) => {
          setError(true);
          console.error("There was an error!", error);
        });
    },
    [handleInfo]
  );

  const handleScraping = (id: string) => {
    console.log("Scraping for", id);
  };

  useEffect(() => {
    getData();

    if(reload) {
      getData()
    }
  }, [reload]);

  console.log(list);

  return (
    <>
      {error && <Error handleError={handleError} />}
      {loading && <Spinner />}
      {list.count === 0 && !loading && !error && <NoItems />}
      {list.count > 0 && !loading && !error && (
        <Accordion
          list={list}
          handleDeleteItem={handleDeleteItem}
          handleDeleteList={handleDeleteList}
          handleScraping={handleScraping}
        />
      )}
    </>
  );
};

export default List;
