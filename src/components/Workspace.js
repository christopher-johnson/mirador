import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Responsive as ResponsiveGridLayout } from 'react-grid-layout';
import Window from './Window';
import ns from '../config/css-ns';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

/**
 * Represents a work area that contains any number of windows
 * @memberof Workspace
 * @private
 */
const Workspace = ({ windows }) => (
  <div className={ns('workspace')}>
    <ResponsiveGridLayout
      className="layout"
      margin={[0, 0]}
      width={1000}
    >
      {
        windows.map(window => (
          <div
            key={`${window.id}-div`}
            data-grid={{
              x: 0, y: 0, w: 2, h: 2,
            }}
            onDrag={doStuff}
          >
            <Window
              key={window.id}
              id={window.id}
            />
          </div>
        ))
      }
    </ResponsiveGridLayout>
  </div>
);

/**
 */
function doStuff(layout) {
  console.log(layout);
}

Workspace.propTypes = {
  windows: PropTypes.instanceOf(Array).isRequired,
};

/**
 * mapStateToProps - to hook up connect
 * @memberof Workspace
 * @private
 */
const mapStateToProps = state => (
  {
    windows: state.windows,
  }
);

export default connect(mapStateToProps)(Workspace);
