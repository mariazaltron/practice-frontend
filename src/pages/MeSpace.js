import React from "react";
import { useSelector } from "react-redux";
import { selectMySpace, selectToken } from "../store/user/selectors";
import { useNavigate } from "react-router-dom";

export const MeSpace = () => {
  const space = useSelector(selectMySpace);
  const token = useSelector(selectToken);
  const navigate = useNavigate();

  if (token === null) {
    navigate("/");
  }

  if (space === null) {
    return <p>Loading...</p>;
  }

  console.log(space);

  return (
    <div>
      <div>Hello from the otherside</div>
      <div>
        <h2>Space - from the space</h2>
        <div>
          {space && (
            <div>
              <div
                key={space.id}
                style={{
                  backgroundColor: space.backgroundColor,
                  color: space.color,
                }}
              >
                <h2>{space.title}</h2>
                <p>{space.description}</p>
              </div>
              <div>
                {space.stories &&
                  space.stories.map((story) => (
                    <div key={story.id}>
                      <h4>{story.name}</h4>
                      <p>{story.content}</p>
                      <img src={story.imageUrl} alt="" width="500" />
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
