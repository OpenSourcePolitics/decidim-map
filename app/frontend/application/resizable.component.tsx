import * as React from "react";
import Resizable from 're-resizable';
import { FaIcon } from "./icon.component";

interface ResizableWrapperProps {
  onResize?: (height: number) => void;
  children?: React.ReactNode;
}

export class ResizableWrapper extends React.Component<ResizableWrapperProps,{}> {
  public render(): JSX.Element {
    const { onResize, children } = this.props;
    return (
      <Resizable
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
            bottom: '0',
            left: '0',
            cursor: 'grab'
          }
        }}
        handleComponent={{ bottom: () => (
          <FaIcon name="grip-lines"/>
        ) }}
        minWidth='100%' maxWidth='100%'
        onResize={(event, direction, ref, delta) => {
          if(onResize) onResize(ref.clientHeight);
        }}>
        {children}
      </Resizable>
    );
  }
}

export default ResizableWrapper;
