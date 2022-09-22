
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSpaceById } from "../store/space/selectors";
import { useParams } from "react-router-dom";
import { fetchSpaceById } from "../store/space/thunks";


export const SpaceDetails = () => {
    const dispatch = useDispatch();
    const space = useSelector(selectSpaceById);
    // console.log("space", space)
    const { id } = useParams();

     useEffect(() => {
       dispatch(fetchSpaceById(id));
     }, [dispatch, id]);

    return (
      <div>
        <h2>Space</h2>
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
    );
}