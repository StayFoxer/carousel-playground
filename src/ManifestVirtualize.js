import React from "react";
import SwipeableViews from "react-swipeable-views";
import { virtualize } from "react-swipeable-views-utils";

const VirtualizeSwipeableViews = virtualize(SwipeableViews);

const ManifestVirtualize = ({
  manifests,
  activeStep,
  onChangeIndex,
  isLoading,
  error
}) => {
  const slideRenderer = ({ key, index }) => (
    <div className="swipeableViews" key={key}>
      {manifests[index] !== undefined ? (
        <div>
          <h1>{manifests[index].title}</h1>
          <p>{manifests[index].description}</p>
        </div>
      ) : (
        <div>
          <h1>Loading..</h1>
          <p />
        </div>
      )}
      {error ? <p>{error}</p> : ""}
    </div>
  );

  return (
    <div>
      <VirtualizeSwipeableViews
        enableMouseEvents
        index={activeStep}
        onChangeIndex={onChangeIndex}
        slideRenderer={slideRenderer}
        slideCount={manifests.length + 9}
      />
    </div>
  );
};

module.exports = { ManifestVirtualize };
