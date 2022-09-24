import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectMySpace, selectToken } from "../store/user/selectors";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { deleteStoryFromSpace, addStoryToSpace } from "../store/user/thunks";
import Col from "react-bootstrap/Col";

export const MeSpace = () => {
  const space = useSelector(selectMySpace);
  const token = useSelector(selectToken);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  const deleteStory = (id) =>{
    dispatch(deleteStoryFromSpace(id))
  };

  if (token === null) {
    navigate("/");
  }

  if (space === null) {
    return <p>Loading...</p>;
  }

  const submitForm = (event) => {
    event.preventDefault();
    dispatch(addStoryToSpace({
      name: name,
      content: content,
      image: image,
    }));
    setName("");
    setContent("");
    setImage("");
  }

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
                <Button>Post a cool story bro</Button>
                <Form as={Col} md={{ span: 6, offset: 3 }} className="mt-5">
                  <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      type="text"
                      placeholder="Name of your story"
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Content</Form.Label>
                    <Form.Control
                      value={content}
                      onChange={(event) => setContent(event.target.value)}
                      type="text"
                      placeholder="Content of your story"
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                      value={image}
                      onChange={(event) => setImage(event.target.value)}
                      type="text"
                      placeholder="Image of your story"
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mt-5">
                    <Button
                      variant="primary"
                      type="submit"
                      onClick={submitForm}
                    >
                      Save changes
                    </Button>
                  </Form.Group>
                </Form>
              </div>
              <div>
                {space.stories &&
                  space.stories.map((story) => (
                    <div key={story.id}>
                      <h4>{story.name}</h4>
                      <p>{story.content}</p>
                      <img src={story.imageUrl} alt="" width="500" />
                      <p>
                        <Button
                          variant="danger"
                          onClick={() => deleteStory(story.id)}
                        >
                          Delete Story
                        </Button>
                      </p>
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
