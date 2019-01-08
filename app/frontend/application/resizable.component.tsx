import * as React from 'react';
import Resizable from 're-resizable';
import { FaIcon } from './icon.component';

export interface ResizableWrapperProps {
  onResize?: (height: number) => void;
  height?: number|string;
  minHeight?: number;
  children?: React.ReactNode;
}

export interface ResizableWrapperState {
  height: number|string;
}

export class ResizableWrapper extends React.Component<ResizableWrapperProps,ResizableWrapperState> {
  public ref: any;

  public static defaultProps: any = {
    minHeight: 50
  };

  constructor(props: ResizableWrapperProps) {
    super(props);
    this.state = {
      height: this.props.height || 'auto'
    }
  }

  public updateSize(height?: number): void {
    this.setState({
      height: height || this.ref.clientHeight
    })
  }

  public render(): JSX.Element {
    const { onResize, children, minHeight } = this.props;
    const { height } = this.state;
    return (
      <Resizable
        ref={(ref) => {
          this.ref = (ref && ref.resizable) ? ref.resizable : (<div/>);
        }}
        size={{ width:'auto', height }}
        enable={{
          top:false, right:false,
          bottom:true, left:false,
          topRight:false, bottomRight:false,
          bottomLeft:false, topLeft:false
        }}
        className='resizable'
        handleClasses={{
          bottom: 'handle'
        }}
        handleStyles={{
          bottom: {
            position: 'relative',
            width: 'auto',
            height: 'auto',
            bottom: '2px',
            left: '0',
            cursor: 'grab'
          }
        }}
        handleComponent={{ bottom: () => (
          <FaIcon name='grip-lines'/>
        ) }}
        minWidth='100%' maxWidth='100%'
        minHeight={minHeight}
        onResize={(event, direction, ref, delta) => {
          if(onResize) onResize(ref.clientHeight);
        }}
        onResizeStop={(event, direction, ref, delta) => {
          if(onResize) onResize(ref.clientHeight);
          this.setState({
            height: ref.clientHeight,
          });
        }}>
        {children}
      </Resizable>
    );
  }
}

export default ResizableWrapper;
