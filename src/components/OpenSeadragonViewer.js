import React, { Component } from 'react';
import PropTypes from 'prop-types';
import OpenSeadragon from 'openseadragon';
import miradorWithPlugins from '../lib/miradorWithPlugins';
import ns from '../config/css-ns';

/**
 * Represents a OpenSeadragonViewer in the mirador workspace. Responsible for mounting
 * and rendering OSD.
 */
export class OpenSeadragonViewer extends Component {
  /**
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.viewer = null;
    this.ref = React.createRef();
  }

  /**
   * React lifecycle event
   */
  componentDidMount() {
    const { tileSources } = this.props;
    if (!this.ref.current) {
      return;
    }
    this.viewer = new OpenSeadragon({
      id: this.ref.current.id,
      preserveViewport: true,
      blendTime: 0.1,
      alwaysBlend: false,
      showNavigationControl: false,
    });
    tileSources.forEach(tileSource => this.addTileSource(tileSource));
  }

  /**
   * When the tileSources change, make sure to close the OSD viewer.
   */
  componentDidUpdate(prevProps) {
    const { tileSources } = this.props;
    if (!this.tileSourcesMatch(prevProps.tileSources)) {
      this.viewer.close();
      tileSources.forEach(tileSource => this.addTileSource(tileSource));
    }
  }

  /**
   */
  componentWillUnmount() {
    this.viewer.removeAllHandlers();
  }

  /**
   */
  addTileSource(tileSource) {
    this.viewer.addTiledImage({
      tileSource,
      success: (event) => {
      },
    });
  }

  /**
   * tileSourcesMatch - compares previous tileSources to current to determine
   * whether a refresh of the OSD viewer is needed.
   * @param  {Array} prevTileSources
   * @return {Boolean}
   */
  tileSourcesMatch(prevTileSources) {
    const { tileSources } = this.props;
    return tileSources.some((tileSource, index) => {
      if (!prevTileSources[index]) {
        return false;
      }
      if (tileSource['@id'] === prevTileSources[index]['@id']) {
        return true;
      }
      return false;
    });
  }

  /**
   * Renders things
   */
  render() {
    const { window } = this.props;
    return (
      <>
        <div
          className={ns('osd-container')}
          id={`${window.id}-osd`}
          ref={this.ref}
        />
      </>
    );
  }
}

OpenSeadragonViewer.defaultProps = {
  tileSources: [],
};

OpenSeadragonViewer.propTypes = {
  tileSources: PropTypes.arrayOf(PropTypes.object),
  window: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default miradorWithPlugins(OpenSeadragonViewer);
