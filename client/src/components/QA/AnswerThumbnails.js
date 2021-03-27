/* eslint-disable react/prop-types */
import React from 'react';

import Thumbnail from './Thumbnail';

const AnswerThumbnails = ({ thumbnails }) => (
  <div className="QA-AnswerThumbnails">
    {/* {
      thumbnails.map((thumbnail) => (
        <Thumbnail
          thumbnail={thumbnail.url}
          key={thumbnail.id}
        />
      ))
    } */}
  </div>
);

export default AnswerThumbnails;
