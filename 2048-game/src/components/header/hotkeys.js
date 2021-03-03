import React from "react";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Image from "react-bootstrap/Image";
import hotkeyIcon from "../../assets/info-circle-solid.svg";
import PropTypes from "prop-types";

const HotKeys = () => {
  return (
    <OverlayTrigger
      placement="bottom"
      overlay={
        <Tooltip className="tooltip" id="button-tooltip-1">
          <div className="text-left text-primary p-2">
            <p className="text-center font-weight-bold">Hotkeys</p>
            <hr className="bg-warning" />
            <p>
              <strong>CTRL + s:</strong> Go to stats page.
            </p>
            <p>
              <strong>CTRL + o</strong>: Go to options.
            </p>
            <p>
              <strong>CTRL + m</strong>: Mute.
            </p>
            <p>
              <strong>CTRL + p</strong>: Switch to default theme.
            </p>
            <p>
              <strong>CTRL + d</strong>: Switch to dark theme.
            </p>
          </div>
        </Tooltip>
      }
    >
      {({ ref, ...triggerHandler }) => (
        <button
          {...triggerHandler}
          className="hk-info d-none d-lg-inline-flex align-items-center"
        >
          <Image ref={ref} roundedCircle src={hotkeyIcon} width="30" />
        </button>
      )}
    </OverlayTrigger>
  );
};

export default HotKeys;
