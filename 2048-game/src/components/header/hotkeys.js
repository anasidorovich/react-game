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
          <div class="text-left text-primary p-2">
            <p class="text-center font-weight-bold">Hotkeys</p>
            <hr class="bg-warning" />
            <p>
              <strong>CTRL + a:</strong> Go to about page.
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
          className="hk-info d-inline-flex align-items-center d-sm-none d-md-none d-lg-block"
        >
          <Image ref={ref} roundedCircle src={hotkeyIcon} width="30" />
        </button>
      )}
    </OverlayTrigger>
  );
};

export default HotKeys;
