import React from 'react';
import GUButton, { GUButtonProps } from '@components/control/gu-button';
import styled from 'styled-components';
import { FaFacebookF, FaInstagramSquare, FaTwitter  } from "react-icons/fa";
import { MdOutlineWatchLater } from "react-icons/md"
interface SocialIconData {
  title: string,
  url: string
}
interface SocialsProps {
  containerClassName?: string;
  spacing?: number;
  height?: number;
  width?: number;
  data: SocialIconData[]
}

interface SocialsContainerProps {
  spacing?: number;
}

interface StyledButtonProps {
  height?: number;
  width?: number;
}

const SocialsContainer = styled.div<SocialsContainerProps>`
  font-size: 14px;
  .btn {
    &:not(:last-child) {
      ${({ spacing }) => spacing && `margin-right: ${spacing / 14}em`}
    }
  }
`;

const renderSocialIcons = (icon: string, fontSize: number = 20) => {
  switch (icon) {
    case "facebook":
      return <FaFacebookF color='#4e6ed4' fontSize={fontSize} />
    case "instagram":
      return <FaInstagramSquare color='#4e6ed4' fontSize={fontSize} />
    case "twitter":
      return <FaTwitter color='#4e6ed4' fontSize={fontSize} />
    default:
      return <MdOutlineWatchLater color='#4e6ed4' fontSize={fontSize} />
  }

}

const StyledButton = styled(GUButton) <StyledButtonProps>`
  ${({ height }) => height && `height: ${height / 14}em!important`};
  ${({ width }) => width && `width: ${width / 14}em; padding: 0!important`}
`;

const Socials = ({ containerClassName, height, width, spacing, data, color, ...props }: SocialsProps & GUButtonProps) => {

  return (
    <SocialsContainer spacing={spacing} className="social-block">
      {data && data.map((item, index) => (
        <StyledButton key={index} height={height} width={width} href={item.url} target="_blank" {...props}>
          <i >{renderSocialIcons(item.title, spacing)}</i>
        </StyledButton>
      ))}
    </SocialsContainer>
  );
};

export default Socials;
