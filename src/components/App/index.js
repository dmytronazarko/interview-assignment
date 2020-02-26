import React from 'react';
import {connect} from 'react-redux';

import Posts from '../Posts';
import Modal from '../Modal';

function App({shouldRenderModal}) {
  return (
    <>
      <Posts />
      {shouldRenderModal && <Modal />}
    </>
  );
}

const mapStateToProps = ({posts: {selectedPost}}) => ({
  shouldRenderModal: !!selectedPost.id,
});

export default connect(mapStateToProps)(App);
