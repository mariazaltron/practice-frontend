import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSpace } from "../store/space/selectors";
import { fetchSpaces } from "../store/space/thunks";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


export const Spaces = () => {
  const dispatch = useDispatch();
  const spaces = useSelector(selectSpace);
  //   console.log("spaces in components", spaces);
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchSpaces());
  }, [dispatch]);
  return (
    <div>
      <h1>Hello</h1>
      <ul>
        {spaces.map((space) => {
          return (
            <li key={space.id}
                style={{
                    backgroundColor: space.backgroundColor,
                    color: space.color
                }}>
              <h4>{space.title}</h4>
              <p>{space.description}</p>
              <Button onClick={ () => {navigate(`/spaces/${space.id}`)}}>Visit space
              </Button>
            </li>
            );
          })}
      </ul>
    </div>
  );
};
