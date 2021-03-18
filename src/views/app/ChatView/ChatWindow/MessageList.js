import clsx from 'clsx';
import PropTypes from 'prop-types';
import { findIndex } from 'lodash';
import MessageItem from './MessageItem';
import Lightbox from 'src/components/ModalLightbox';
import React, { useEffect, useState, useRef } from 'react';
import Scrollbars from 'src/components/Scrollbars';
import { makeStyles } from '@material-ui/core/styles';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {},
  scroll: { height: '100%', padding: theme.spacing(3) }
}));

// ----------------------------------------------------------------------

MessageList.propTypes = {
  conversation: PropTypes.object.isRequired,
  className: PropTypes.string
};

function MessageList({ conversation, className, ...other }) {
  const classes = useStyles();
  const scrollRef = useRef();
  const [openLightbox, setOpenLightbox] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const scrollMessagesToBottom = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    };
    scrollMessagesToBottom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversation.messages]);

  const images = conversation.messages
    .filter((messages) => messages.contentType === 'image')
    .map((messages) => messages.body.large);

  const handleOpenLightbox = (url) => {
    const selectedImage = findIndex(images, (index) => {
      return index === url;
    });
    setOpenLightbox(true);
    setSelectedImage(selectedImage);
  };

  return (
    <Scrollbars
      scrollableNodeProps={{ ref: scrollRef }}
      className={classes.scroll}
    >
      <div className={clsx(classes.root, className)} {...other}>
        {conversation.messages.map((message) => (
          <MessageItem
            key={message.id}
            message={message}
            conversation={conversation}
            onOpenLightbox={handleOpenLightbox}
          />
        ))}
      </div>

      <Lightbox
        images={images}
        photoIndex={selectedImage}
        setPhotoIndex={setSelectedImage}
        isOpen={openLightbox}
        onClose={() => setOpenLightbox(false)}
      />
    </Scrollbars>
  );
}

export default MessageList;
