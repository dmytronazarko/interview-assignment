import React from 'react';
import {connect} from 'react-redux';
import {Modal as AntdModal, Button} from 'antd';

import ModalForm from './components/ModalForm';
import {
  setSelectedPost,
  updatePost,
  deletePost,
  setSelectedPrev,
  setSelectedNext,
} from '../../redux/posts/actions';
import s from './styles.module.css';

function Modal({
  imageUrl,
  selectedPrevPost,
  selectedNextPost,
  setSelectedPost,
  setSelectedPrev,
  setSelectedNext,
}) {
  return (
    <AntdModal
      visible
      title="Update a post"
      footer={null}
      onCancel={() => setSelectedPost()}
    >
      <div className={s.navigation}>
        <Button
          shape="circle"
          icon="left"
          disabled={!selectedPrevPost.id}
          onClick={() => setSelectedPrev()}
        />
        <div className={s.imgWrapper}>
          <img src={imageUrl} className={s.img} />
        </div>
        <Button
          shape="circle"
          icon="right"
          disabled={!selectedNextPost.id}
          onClick={() => setSelectedNext()}
        />
      </div>
      <ModalForm />
    </AntdModal>
  );
}

const mapStateToProps = ({
  posts: {selectedPost, selectedPrevPost, selectedNextPost},
}) => {
  const {
    data: {
      media: [mediaItem],
    },
  } = selectedPost;
  return {
    imageUrl: mediaItem.image,
    selectedPrevPost,
    selectedNextPost,
  }
};

export default connect(mapStateToProps, {
  setSelectedPost,
  updatePost,
  deletePost,
  setSelectedPrev,
  setSelectedNext,
})(Modal);
