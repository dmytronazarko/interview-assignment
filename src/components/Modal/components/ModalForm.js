import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Form, Input, Button} from 'antd';

import {
  setSelectedPost,
  updatePost,
  deletePost,
} from '../../../redux/posts/actions';
import s from '../styles.module.css';

function ModalForm({
  selectedPost,
  setSelectedPost,
  updatePost,
  deletePost,
}) {
  const {
    description,
    data: {
      media: [mediaItem],
    },
  } = selectedPost;
  const {description: title} = mediaItem;
  const [titleValue, setTitleValue] = useState(title);
  const [descriptionValue, setDescriptionValue] = useState(description);

  useEffect(() => {
    setTitleValue(title);
    setDescriptionValue(description);
  }, [title, description]);

  const handleSubmit = e => {
    e.preventDefault();
    updatePost({
      ...selectedPost,
      description: descriptionValue,
      data: {
        media: [
          {
            ...mediaItem,
            description: titleValue,
          },
        ],
      },
    });
    setSelectedPost();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Item label="Title" colon={false} className={s.formItem}>
        <Input
          value={titleValue}
          className={s.input}
          id="title"
          onChange={e => setTitleValue(e.target.value)}
        />
      </Form.Item>
      <Form.Item label="Description" colon={false} className={s.formItem}>
        <Input.TextArea
          value={descriptionValue}
          className={s.input}
          id="description"
          onChange={e => setDescriptionValue(e.target.value)}
        />
      </Form.Item>
      <div className={s.btnWrapper}>
        <Button
          type="danger"
          className={s.btn}
          onClick={() => {
            setSelectedPost();
            deletePost(selectedPost.id);
          }}
        >
          Delete
        </Button>
        <Button type="primary" className={s.btn} htmlType="submit">
          Update
        </Button>
      </div>
    </Form>
  );
}

const mapStateToProps = ({
  posts: {selectedPost},
}) => ({
  selectedPost,
});

export default connect(mapStateToProps, {
  setSelectedPost,
  updatePost,
  deletePost,
})(ModalForm);
