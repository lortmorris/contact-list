import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';

class MainWrapper extends PureComponent {
  static propTypes = {
    children: PropTypes.element.isRequired,
  };

  render() {
    const wrapperClass = classNames({
      wrapper: true,
    });

    const { children } = this.props;
    return (
      <div>
        <div className={wrapperClass}>
          {children}
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  theme: state.theme,
  customizer: state.customizer,
}))(MainWrapper);
