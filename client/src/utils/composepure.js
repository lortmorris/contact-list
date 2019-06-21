import {
  withProps,
  lifecycle,
  setDisplayName,
  compose,
  pure,
} from 'recompose';

export {
  withState,
  withHandlers,
  withProps,
  withStateHandlers,
  lifecycle,
} from 'recompose';

// Wrappers

export const withInit = (trackingProps, initFunc) => lifecycle({
  componentWillMount() {
    initFunc(this.props);
  },
});

export const withDestroy = func => lifecycle({
  componentWillUnmount: func,
});


export const withImmutables = (...porpNames) => withProps(props => porpNames.reduce((result, name) => ({ ...result, [name]: props[name] && props[name].toJS() }), {}));

export const withShallowImmutables = (...porpNames) => withProps(props => porpNames.reduce((result, name) => ({ ...result, [name]: props[name] && props[name].toObject() }), {}));

export const composeImpure = (...hocs) => component => compose(setDisplayName(component.name || 'Component'), ...hocs)(component);

export const composePure = (...hocs) => component => composeImpure(...hocs, pure)(component);
