import * as React from "react";
import assetUrl from "../support/asset_url";
import { library, IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faTimes, faMapMarker, faMapMarkerAlt, faCog } from '@fortawesome/free-solid-svg-icons'

library.add(faCircle, faTimes, faMapMarker, faMapMarkerAlt, faCog)

interface IconProps {
  name: string;
  iconExtraClassName?: string;
}

export const Icon: React.SFC<IconProps> = ({ name, iconExtraClassName }) => {
  return (
    <svg className={`icon ${iconExtraClassName} ${name}`}>
      <use
        xmlnsXlink="http://www.w3.org/1999/xlink"
        xlinkHref={`${assetUrl("icons.svg")}#${name}`}
      />
    </svg>
  );
};

export const ComponentIcon: React.SFC<IconProps> = ({ name, iconExtraClassName }) => {
  return (
    <svg className={`icon ${iconExtraClassName} ${name}`}>
      <use
        xmlnsXlink="http://www.w3.org/1999/xlink"
        xlinkHref={assetUrl(name)}
      />
    </svg>
  );
};

interface FaIconProps {
  name: IconProp;
  iconExtraClassName?: string;
  transform?: string
}

export const FaIcon: React.SFC<FaIconProps> = ({ name, iconExtraClassName, transform }) => {
  return (
    <FontAwesomeIcon icon={name} className={iconExtraClassName} transform={transform} />
  );
};

export const ButtonIcon: React.SFC<FaIconProps> = ({ name, iconExtraClassName, transform }) => {
  return (
    <span className={`button-icon fa-stack ${iconExtraClassName}`}>
      <FontAwesomeIcon icon="circle" className="fa-stack-2x shadow" inverse />
      <FontAwesomeIcon icon={name} className="fa-stack-1x" />
    </span>
  );
};

Icon.defaultProps =
ComponentIcon.defaultProps =
FaIcon.defaultProps =
ButtonIcon.defaultProps = {
    iconExtraClassName: "",
    transform: ""
};

interface IconWithoutUserAgentProps {
  name: string;
  iconExtraClassName?: string;
}

const IconWithoutUserAgent: React.SFC<IconWithoutUserAgentProps> = ({
  name,
  iconExtraClassName
}) => <Icon name={name} iconExtraClassName={iconExtraClassName} />;

export default IconWithoutUserAgent;
