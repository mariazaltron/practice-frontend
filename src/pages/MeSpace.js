import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectMySpace, selectToken } from "../store/user/selectors";
import { useNavigate } from "react-router-dom";
import { Button, Form, Image } from "react-bootstrap";
import { deleteStoryFromSpace, addStoryToSpace, updateMySpace } from "../store/user/thunks";
import Col from "react-bootstrap/Col";

export const MeSpace = () => {
  const space = useSelector(selectMySpace);
  const token = useSelector(selectToken);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [editSpace, setEditSpace] = useState(false);
  const [title, setTitle] = useState(space.title);
  const [description, setDescription] = useState(space.description);
  const [color, setColor] = useState(space.color);
  const [backgroundColor, setBackgroundColor] = useState(space.backgroundColor);

  if (token === null) {
    navigate("/");
  }

  if (space === null) {
    return <p>Loading...</p>;
  }

  const deleteStory = (id) => {
    dispatch(deleteStoryFromSpace(id));
  };

  const submitForm = (event) => {
    event.preventDefault();
    dispatch(
      addStoryToSpace({
        name: name,
        content: content,
        image: image,
      })
    );
    setName("");
    setContent("");
    setImage("");
    setEditing(false);
  };

  const submitFormSpace = (event) => {
    event.preventDefault();
    dispatch(
      updateMySpace(
        title,
        description,
        color,
        backgroundColor,
      )
    );
    setTitle("");
    setDescription("");
    setColor("");
    setBackgroundColor("");
    setEditSpace(false);
  };


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
                <Button onClick={() => setEditSpace(!editSpace)}>
                  Edit my Space
                </Button>
                {editSpace && (
                  <Form as={Col} md={{ span: 6, offset: 3 }} className="mt-5">
                    <Form.Group>
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        type="text"
                        placeholder="Title of your space"
                        required
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        type="text"
                        placeholder="Description of your space"
                        required
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Background Color</Form.Label>
                      <Form.Control
                        value={backgroundColor}
                        onChange={(event) =>
                          setBackgroundColor(event.target.value)
                        }
                        type="text"
                        placeholder="Background color of your space"
                        required
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Color</Form.Label>
                      <Form.Control
                        value={color}
                        onChange={(event) =>
                          setColor(event.target.value)
                        }
                        type="text"
                        placeholder="Color of your space"
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mt-5">
                      <Button
                        variant="primary"
                        type="submit"
                        onClick={submitFormSpace}
                      >
                        Save changes
                      </Button>
                    </Form.Group>
                  </Form>
                )}
              </div>
              <div>
                <Button onClick={() => setEditing(!editing)}>
                  Post a cool story bro
                </Button>
                {editing && (
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
                    <Image src={image} alt="" thumbnail="true" fluid="true" />
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
                )}
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
