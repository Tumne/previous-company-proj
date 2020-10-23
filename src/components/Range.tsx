import React from 'react';
import styled from 'styled-components';
import { BLUE_LIGHT, BLUE, WHITE } from 'styles/color';
import { map, round } from 'utils/mathUtils';
import { Z_INDEX_1 } from 'styles/z-index';

const HANDLE_WIDTH = 30;

const Track = styled.div`
  height: 10px;
  background: ${BLUE_LIGHT};
  border-radius: 15px;
`;

const Bar = styled.div`
  position: absolute;
  height: 10px;
  top: 0;
  background-color: ${BLUE};
  border-radius: 15px;
  left: 1px;
  width: calc(100% - 2px);
`;

const Handle = styled.div<{ disabled?: boolean }>`
  position: absolute;
  width: ${HANDLE_WIDTH}px;
  height: ${HANDLE_WIDTH}px;
  margin-top: -20px;
  background-color: ${BLUE};
  border-radius: 50%;
  box-sizing: content-box;
  z-index: ${Z_INDEX_1};
  cursor: grab;
  pointer-events: ${props => (props.disabled ? 'none' : 'all')};

  :after {
    content: ' ';
    position: absolute;
    top: -4px;
    left: -4px;
    width: ${HANDLE_WIDTH}px;
    height: ${HANDLE_WIDTH}px;
    border-radius: 50%;
    border: 4px solid ${WHITE};
  }
`;

const HandleMin = styled(Handle)`
  left: 0;
`;

const HandleMax = styled(Handle)`
  left: calc(100% - ${HANDLE_WIDTH}px);
`;

const Container = styled.div`
  position: relative;
  width: 100%;
`;

class Range extends React.Component<{
  min: number;
  max: number;
  step: number;
  value: number[];
  onChange?: Function;
  onAfterChange?: Function;
  className?: string;
}> {
  static defaultProps = {
    className: '',
  };

  track = React.createRef<HTMLDivElement>();
  bar = React.createRef<HTMLDivElement>();
  handleMin = React.createRef<HTMLDivElement>();
  handleMax = React.createRef<HTMLDivElement>();
  activeHandle;
  mouseDownPos;

  componentDidMount() {
    this.handleMin.current!.addEventListener('mousedown', this.onMouseDown);
    this.handleMax.current!.addEventListener('mousedown', this.onMouseDown);

    this.init();
    this.draw(this.props, true);
  }

  componentDidUpdate(prevProps) {
    const { value, min, max } = prevProps;
    const { value: valueNext } = this.props;
    const hasMinChanged = value[0] !== valueNext[0];
    const hasMaxChanged = value[1] !== valueNext[1];
    const hasMinMaxChanged = hasMinChanged && hasMaxChanged;
    const hasReset = valueNext[0] === min && valueNext[1] === max;

    if (hasMinChanged || hasMaxChanged) {
      this.draw(this.props, hasMinMaxChanged || hasReset);
    }
  }

  componentWillUnmount() {
    this.handleMin.current!.removeEventListener('mousedown', this.onMouseDown);
    this.handleMax.current!.removeEventListener('mousedown', this.onMouseDown);
  }

  onMouseDown = e => {
    window.addEventListener('mouseup', this.onMouseUp);
    window.addEventListener('mousemove', this.onMouseMove);

    this.mouseDownPos = e.pageX;
    this.activeHandle = e.target;
    this.activeHandle.originPos = this.activeHandle.getBoundingClientRect().left;

    document.body.classList.add('grabbing');
  };

  getValues = e => {
    if (!this.track.current) {
      return this.props.value;
    }
    const track = this.track.current!.getBoundingClientRect();
    const handleMin = this.handleMin.current!.getBoundingClientRect();
    const handleMax = this.handleMax.current!.getBoundingClientRect();
    const mousePosDiff = this.activeHandle.originPos - track.left + (e.pageX - this.mouseDownPos);

    const { min, max, value, step } = this.props;
    const minValue = map(
      mousePosDiff,
      0,
      handleMax.left - track.left - handleMin.width,
      min,
      Math.min(max, value[1]),
      true
    );
    const maxValue = map(
      mousePosDiff,
      handleMin.right - track.left,
      track.right - track.left - handleMax.width,
      Math.max(min, value[0]),
      max,
      true
    );

    const updatedValues =
      this.activeHandle === this.handleMin.current
        ? [round(minValue, step), value[1]]
        : [value[0], round(maxValue, step)];

    return updatedValues;
  };

  onMouseMove = e => {
    if (this.props.onChange) {
      this.props.onChange(this.getValues(e));
    }
  };

  onMouseUp = e => {
    window.removeEventListener('mouseup', this.onMouseUp);
    window.removeEventListener('mousemove', this.onMouseMove);

    document.body.classList.remove('grabbing');

    if (this.props.onAfterChange) {
      this.props.onAfterChange(this.getValues(e));
    }
    this.activeHandle = null;
  };

  init() {
    const { min, max, value } = this.props;
    const isEqual = value[0] === value[1];
    const track = this.track.current!.getBoundingClientRect();
    const handleMin = this.handleMin.current!.getBoundingClientRect();
    const handleMax = this.handleMax.current!.getBoundingClientRect();

    if (isEqual) {
      if (value[0] === min) {
        this.handleMin.current!.style.left = '0';
        this.handleMax.current!.style.left = `${handleMin.width}px`;
        this.drawBar();
      } else if (value[0] === max) {
        this.handleMin.current!.style.left = `${track.width - handleMax.width - handleMin.width}px`;
        this.handleMax.current!.style.left = `${track.width - handleMax.width}px`;
        this.drawBar();
      }
    }
  }

  draw(props, updateBoth = false) {
    if (updateBoth) {
      this.drawHandle(this.handleMin.current, props, updateBoth);
      requestAnimationFrame(() => {
        this.drawHandle(this.handleMax.current, props);
      });
    } else {
      this.drawHandle(this.activeHandle, props);
    }
  }

  drawHandle(handle, props, updateBoth?) {
    if (!handle) {
      return;
    }

    const { min, max, value } = props;
    const updatingHandle = handle;
    const track = this.track.current!.getBoundingClientRect();
    const handleMin = this.handleMin.current!.getBoundingClientRect();
    const handleMax = this.handleMax.current!.getBoundingClientRect();
    let handlePos;

    if (updatingHandle === this.handleMin.current) {
      const minMaxPos = handleMax.left - track.left - handleMax.width; // max position of this.handleMin
      handlePos = map(value[0], min, updateBoth ? max : value[1], 0, minMaxPos);
    } else {
      const maxMinPos = handleMin.right - track.left; // min position of this.handleMax
      handlePos = map(value[1], value[0], max, maxMinPos, track.width - handleMax.width);
    }

    updatingHandle.style.left = `${handlePos}px`;
    this.drawBar();
  }

  drawBar() {
    const track = this.track.current!.getBoundingClientRect();
    const handleMin = this.handleMin.current!.getBoundingClientRect();
    const handleMax = this.handleMax.current!.getBoundingClientRect();

    this.bar.current!.style.left = `${handleMin.left - track.left + 1}px`;
    this.bar.current!.style.width = `${handleMax.right - handleMin.left - 2}px`;
  }

  render() {
    const { min, max, value, className } = this.props;
    const isEqual = value[0] === value[1];
    const isMinDisabled = isEqual && value[0] === min;
    const isMaxDisabled = isEqual && value[0] === max;

    return (
      <Container className={className}>
        <Track ref={this.track} />
        <Bar ref={this.bar} />
        <HandleMin disabled={isMinDisabled} ref={this.handleMin} />
        <HandleMax disabled={isMaxDisabled} ref={this.handleMax} />
      </Container>
    );
  }
}

export default Range;
