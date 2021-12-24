import React, { CSSProperties, MutableRefObject, ReactNode, useCallback, useMemo, useRef } from 'react';
import cs from 'classnames';
import { useSetState, useUpdateEffect } from 'react-use';

import useTouch from '../utils/hooks/use-touch';
import useEventListener from '../utils/hooks/use-event-listener';
import Loading from '../loading';
import { getScrollParent } from '../utils/hooks/use-scroll-parent';
import { getScrollTop } from '../utils/scroll';

import { PullRefreshProps, PullRefreshStatus, StatusTextType } from './types';

const DEFAULT_HEAD_HEIGHT = 50;
const TEXT_STATUS = ['pulling', 'loosing', 'success'];

const PullRefresh: React.FC<PullRefreshProps> = (props) => {
  const {
    disabled,
    headHeight = 50,
    animationDuration = 300,
    successDuration = 500,
    successText,
    pullDistance,
  } = props;

  const root = useRef<HTMLDivElement>() as MutableRefObject<HTMLDivElement>;
  const [state, updateState] = useSetState({
    refreshing: false,
    status: 'normal' as PullRefreshStatus,
    distance: 0,
    duration: 0,
  });

  const track = useRef<HTMLDivElement>() as MutableRefObject<HTMLDivElement>;
  const reachTop = useRef<boolean>(null) as MutableRefObject<boolean>;

  const touch = useTouch();

  const getHeadStyle = (): CSSProperties | undefined => {
    if (headHeight !== DEFAULT_HEAD_HEIGHT) {
      return {
        height: `${headHeight}px`,
      };
    }
    return undefined;
  };

  const isTouchable = useCallback(() => {
    return state.status !== 'loading' && state.status !== 'success' && !disabled;
  }, [state.status, disabled]);

  const ease = (distance: number): number => {
    const _pullDistance = +(pullDistance || headHeight);

    let _distance = distance;
    if (_distance > _pullDistance) {
      if (_distance < _pullDistance * 2) {
        _distance = _pullDistance + ((_distance - _pullDistance) / 2);
      } else {
        _distance = (_pullDistance * 1.5) + ((_distance - (_pullDistance * 2)) / 4);
      }
    }

    return Math.round(_distance);
  };

  const setStatus = (distance: number, isLoading?: boolean): void => {
    const _pullDistance = +(pullDistance || headHeight);
    const newState = { distance } as typeof state;

    if (isLoading) {
      newState.status = 'loading';
    } else if (distance === 0) {
      newState.status = 'normal';
    } else if (distance < _pullDistance) {
      newState.status = 'pulling';
    } else {
      newState.status = 'loosing';
    }
    updateState(newState);
  };

  const getStatusText = (): StatusTextType => {
    if (state.status === 'normal') {
      return '';
    }
    return props[`${state.status}Text`];
  };

  const renderStatus = (): ReactNode => {
    const { status, distance } = state;
    const statusText = getStatusText();
    if (typeof statusText === 'function') {
      return statusText({ distance });
    }

    const nodes: JSX.Element[] = [];

    if (TEXT_STATUS.includes(status)) {
      nodes.push(
        <div key="text" className='pull-refresh__text text-placeholder'>
          {statusText}
        </div>,
      );
    }
    if (status === 'loading') {
      nodes.push(
        <Loading key="loading" size='.16rem' className='pull-refresh__loading text-placeholder'>
          {statusText}
        </Loading>,
      );
    }

    return nodes;
  };

  const showSuccessTip = (): void => {
    updateState({ status: 'success' });
    setTimeout(() => {
      setStatus(0);
    }, +successDuration);
  };

  const onRefresh = async (): Promise<void> => {
    try {
      updateState({ refreshing: true });
      await props.onRefresh();
      updateState({ refreshing: false });
    } catch (error) {
      updateState({ refreshing: false });
    }
  };

  const checkPosition = (event: TouchEvent): void => {
    const scrollTarget = getScrollParent(event.target as HTMLElement);
    reachTop.current = getScrollTop(scrollTarget) === 0;
    if (reachTop.current) {
      updateState({ duration: 0 });
      touch.start(event);
    }
  };

  const onTouchStart = (event: React.TouchEvent): void => {
    if (isTouchable()) {
      checkPosition(event.nativeEvent);
    }
  };

  const onTouchMove = useCallback(
    (event: TouchEvent) => {
      if (isTouchable()) {
        if (!reachTop.current) {
          checkPosition(event);
        }

        touch.move(event);
        if (reachTop.current && touch.deltaY >= 0 && touch.isVertical()) {
          setStatus(ease(touch.deltaY));
          event.preventDefault();
        } else {
          /**
           * IN THIS CASE:
           * if component don't rerender after event.preventDefault
           * ios will hold `preventDefault` behavior when touch moving
           * it will cause window unScrollable
           */
          setStatus(0);
        }
      }
    },
    [reachTop.current, touch.deltaY, isTouchable],
  );

  const onTouchEnd = async (): Promise<void> => {
    if (reachTop.current && touch.deltaY && isTouchable()) {
      updateState({ duration: +animationDuration });
      if (state.status === 'loosing') {
        setStatus(+headHeight, true);
        onRefresh();
      } else {
        setStatus(0);
      }
    }
  };

  useEventListener('touchmove', onTouchMove as EventListener, {
    target: track.current,
    depends: [reachTop.current, isTouchable(), touch.deltaY],
  });

  useUpdateEffect(() => {
    updateState({ duration: +animationDuration });
    if (state.refreshing) {
      setStatus(+headHeight, true);
    } else if (successText) {
      showSuccessTip();
    } else {
      setStatus(0, false);
    }
  }, [state.refreshing]);

  const trackStyle = useMemo(
    () => ({
      transitionDuration: `${state.duration}ms`,
      transform: state.distance ? `translate3d(0,${state.distance}px, 0)` : '',
    }),
    [state.duration, state.distance],
  );

  return (
    <div ref={root} className={cs(props.className, 'pull-refresh')} style={props.style}>
      <div
        ref={track}
        className='pull-refresh__track'
        style={trackStyle}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchEnd}
      >
        <div className='pull-refresh__head' style={getHeadStyle()}>
          {renderStatus()}
        </div>
        {props.children}
      </div>
    </div>
  );
};

PullRefresh.defaultProps = {
  pullingText: '下拉即可刷新...',
  loosingText: '释放即可刷新...',
  loadingText: '加载中...',
};

export default PullRefresh;
