import type { DragEvent } from "react";
import { pixPath } from "utils/format";
import AliceCarousel from "react-alice-carousel";
import { viewDoc } from "pages/Docs/docMetadata";

import "react-alice-carousel/lib/alice-carousel.css";
import "./Gallery.scss";

const handleDragStart = (e: DragEvent) => e.preventDefault();

const allViewsInfo = [...viewDoc.one, ...viewDoc.many, ...viewDoc.comfort];
const items = allViewsInfo.map((v) => (
  <div className="item" key={v.id}>
    {v.name}
    <div>
      <img
        src={`${pixPath}screenshots/${v.img}`}
        onDragStart={handleDragStart}
        role="presentation"
        alt=""
      />
    </div>
  </div>
));

const Gallery = () => {
  return (
    <div className="gallery-views">
      <AliceCarousel
        mouseTracking
        items={items}
        autoWidth={true}
        infinite={true}
        autoPlay={true}
        autoPlayStrategy="all"
        disableButtonsControls={true}
        animationDuration={1600}
      />
    </div>
  );
};

export default Gallery;
