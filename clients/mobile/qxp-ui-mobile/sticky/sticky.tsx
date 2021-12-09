import { StickyProps } from '@m/qxp-ui-mobile/sticky/types';
import React, { CSSProperties, useMemo, useRef } from 'react';
import { getZIndexStyle, unitToPx } from '@m/qxp-ui-mobile/utils/format/unit';
import useScrollParent from '@m/qxp-ui-mobile/utils/hooks/use-scroll-parent';
import { getRect } from '@m/qxp-ui-mobile/utils/hooks/use-rect';
import { isHidden } from '@m/qxp-ui-mobile/utils/dom';
import { getScrollTop } from '@m/qxp-ui-mobile/utils/scroll';
import useEventListener from '@m/qxp-ui-mobile/utils/hooks/use-event-listener';
import cs from 'classnames';
import useVisibilityChange from '@m/qxp-ui-mobile/utils/hooks/use-visibility-change';
import { useSetState, useUpdateEffect } from 'react-use';

const Sticky: React.FC<StickyProps> = (props) => {
  const { offsetTop = 0, offsetBottom = 0, position = 'top', zIndex } = props;
  const [state, updateState] = useSetState({
    fixed: false,
    width: 0, // root width
    height: 0, // root height
    transform: 0,
  });

  const root = useRef<HTMLDivElement>(null);
  const scrollParent = useScrollParent(root);

  const offset = useMemo<number>(
    () => unitToPx(position === 'top' ? offsetTop : offsetBottom),
    [position, offsetTop, offsetBottom],
  );

  const rootStyle = useMemo<CSSProperties | undefined>(() => {
    const { fixed, height, width } = state;
    if (fixed) {
      return {
        width: `${width}px`,
        height: `${height}px`,
      };
    }
    return undefined;
  }, [state.fixed, state.height, state.width]);

  const stickyStyle = useMemo<CSSProperties | undefined>(() => {
    if (!state.fixed) {
      return undefined;
    }

    const style: CSSProperties = Object.assign(getZIndexStyle(zIndex), {
      width: `${state.width}px`,
      height: `${state.height}px`,
      [position]: `${offset}px`,
    });

    if (state.transform) {
      style.transform = `translate3d(0, ${state.transform}px, 0)`;
    }

    return style;
  }, [position, state.fixed, offset, state.width, state.height, state.transform]);

  const emitScroll = (scrollTop: number, isFixed: boolean): void => {
    if (props.onScroll) {
      props.onScroll({
        scrollTop,
        isFixed,
      });
    }
  };

  const onScroll = (): void => {
    if (!root.current || isHidden(root.current)) {
      return;
    }

    const { container, position } = props;
    const rootRect = getRect(root.current);
    const scrollTop = getScrollTop(window);

    const newState = {} as typeof state;
    newState.width = rootRect.width;
    newState.height = rootRect.height;

    if (position === 'top') {
      // The sticky component should be kept inside the container element
      if (container) {
        const containerRect = getRect(container.current);
        const difference = containerRect.bottom - offset - newState.height;
        newState.fixed = offset > rootRect.top && containerRect.bottom > 0;
        newState.transform = difference < 0 ? difference : 0;
      } else {
        newState.fixed = offset > rootRect.top;
      }
    } else {
      const { clientHeight } = document.documentElement;
      if (container) {
        const containerRect = getRect(container.current);
        const difference = clientHeight - containerRect.top - offset - newState.height;
        newState.fixed =
          clientHeight - offset < rootRect.bottom && clientHeight > containerRect.top;
        newState.transform = difference < 0 ? -difference : 0;
      } else {
        newState.fixed = clientHeight - offset < rootRect.bottom;
      }
    }
    updateState(newState);
    emitScroll(scrollTop, newState.fixed);
  };

  useEventListener('scroll', onScroll, { target: scrollParent });
  useVisibilityChange(root, onScroll);
  useUpdateEffect(() => {
    props.onChange?.(state.fixed);
  }, [state.fixed]);

  return (
    <div ref={root} style={rootStyle}>
      <div className={cs('sticky', { 'sticky--fixed': state.fixed })} style={stickyStyle}>
        {props.children}
      </div>
    </div>
  );
};

export default Sticky;
