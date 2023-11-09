/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { pixPath } from "utils/format";
import AliceCarousel from "react-alice-carousel";
import { viewDoc } from "../Docs/docMetadata";

import "react-alice-carousel/lib/alice-carousel.css";
import "./Gallery.scss";

const handleDragStart = (e) => e.preventDefault();

const allViewsInfo = [...viewDoc.one, ...viewDoc.many, ...viewDoc.comfort];
const items = allViewsInfo.map((v) => (
  <div className="item" key={v.id}>
    {v.name}
    <div>
      <img
        src={`${pixPath}screenshots/${v.img}`}
        onDragStart={handleDragStart}
        role="presentation"
      />
    </div>
  </div>
));

const Gallery = () => {
  return (
    <AliceCarousel
      mouseTracking
      items={items}
      className="gallery-views"
      itemsFit="contain"
      autoWidth={true}
      infinite={true}
      autoPlay={true}
      autoPlayStrategy="all"
      disableButtonsControls={true}
      animationDuration={1600}
    />
  );
};

export default Gallery;
