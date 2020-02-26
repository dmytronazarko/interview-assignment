import React, {useEffect} from 'react';
import cs from 'classnames';
import {connect} from 'react-redux';
import {Card, Icon, Spin, Pagination} from 'antd';

import {getPosts, deletePost, setSelectedPost} from '../../redux/posts/actions';
import s from './style.module.css';

const TOTAL_NUMBER_OF_POSTS = 950;
const ITEMS_PER_PAGE = 12;

function Posts(props) {
  const {posts, page, loading, getPosts, deletePost, setSelectedPost} = props;
  useEffect(() => {
    getPosts(page);
  }, [page]);

  if (loading) {
    return (
      <div className={cs(s.row, s.center)}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <>
      <div className={s.container}>
        <div className={s.row}>
          {posts.map(
            ({
              id,
              description,
              data: {
                media: [mediaItem],
              },
            }) => {
              const {image, description: title} = mediaItem;
              return (
                <Card
                  key={id}
                  className={s.card}
                  cover={
                    <img alt={description} src={image} className={s.coverImg} />
                  }
                  actions={[
                    <Icon
                      type="edit"
                      key="edit"
                      onClick={() => {
                        setSelectedPost(id);
                      }}
                    />,
                    <Icon
                      type="delete"
                      key="delete"
                      onClick={() => {
                        deletePost(id);
                      }}
                    />,
                  ]}>
                  <Card.Meta title={title} description={description} />
                </Card>
              );
            },
          )}
        </div>

        <div className={cs(s.row, s.center)}>
          <Pagination
            defaultCurrent={page}
            pageSize={ITEMS_PER_PAGE}
            total={TOTAL_NUMBER_OF_POSTS}
            onChange={page => {
              getPosts(page);
            }}
          />
        </div>
      </div>
    </>
  );
}

const mapStateToProps = ({posts: {items, loading, page}}) => ({
  posts: items,
  loading,
  page,
});

export default connect(mapStateToProps, {
  getPosts,
  deletePost,
  setSelectedPost,
})(Posts);
