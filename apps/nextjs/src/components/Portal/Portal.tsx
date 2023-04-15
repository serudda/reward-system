import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const appendChild = (containerEl: HTMLDivElement): HTMLDivElement => document.body.appendChild(containerEl);
const removeChild = (containerEl: HTMLDivElement): HTMLDivElement => document.body.removeChild(containerEl);

export interface PortalProps {
  /**
   * The content displayed inside the portal.
   */
  children: JSX.Element;
}

/**
 * The Portal component is used to render a component outside of the DOM hierarchy of the parent component.
 */
const Portal = ({ children }: PortalProps) => {
  const [containerEl] = useState(document.createElement('div'));

  useEffect(() => {
    appendChild(containerEl);

    return (): void => {
      removeChild(containerEl);
    };
  }, [containerEl]);

  return ReactDOM.createPortal(children, containerEl);
};

export default Portal;
