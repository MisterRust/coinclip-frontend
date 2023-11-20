import styled from 'styled-components';
interface CustomButtonType {
  text?: any;
  width?: string;
  height?: string;
  bgColor?: string;
  onClick?: () => void;
  onSubmit?: () => void;
  color?: string;
  type?: string;
  disabled?: boolean;
  borderRadius?: string;
  smWidth?: string;
  smHeight?: string;
  fontSize?: string;
  smFontSize?: string;
  smLineHeight?: string;
  lineHeight?: string;
  fontWeight?: string;
  smFontWeight?: string;
  hoverColor?: string;
  hoverBgColor?: string;
  border?: string;
  activeBgColor?: string;
  marginTop?: string;
  marginBottom?: string;
  fontFamily?: string;
  boxShadow?: string;
  smMarginTop?: string;
  link?: string;
}

interface CustomButtonStyleType {
  width?: string;
  height?: string;
  bgColor?: string;
  hoverColor?: string;
  hoverBgColor?: string;
  color?: string;
  disabled?: boolean;
  borderRadius?: string;
  smWidth?: string;
  smHeight?: string;
  fontSize?: string;
  smFontSize?: string;
  smLineHeight?: string;
  lineHeight?: string;
  fontWeight?: string;
  smFontWeight?: string;
  border?: string;
  marginTop?: string;
  marginBottom?: string;
  fontFamily?: string;
  boxShadow?: string;
  smMarginTop?: string;
  link?: string;
}

const CustomButtonStyle = styled.div<CustomButtonStyleType>`
    cursor: pointer;
    border: #4a85ff solid 2px;
    max-width: ${(props) => props.width || '145px'};
    width: 100%;
    font-family: ${(props) => props.fontFamily || 'Oxanium'};
    height: ${(props) => props.height || '56px'};
    font-style: normal;
    font-weight: ${(props) => props.fontWeight || '600'};
    font-size: ${(props) => props.fontSize || '16px'};
    line-height: ${(props) => props.lineHeight || '24px'}; 
    color: ${(props) => props.color || 'white'};
    border: ${(props) => props.border || ''};
    background: ${(props) => props.disabled ? '#050607' : props.bgColor || '#286EFF'};
    border-radius: ${(props) => props.borderRadius || '12px'};
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    font-size: ${(props) => props.color || '#ffffff'};
    margin-top: ${(props) => props.marginTop};
    box-shadow: ${(props) => props.boxShadow};
    margin-bottom: ${(props) => props.marginBottom};
    &:hover{
      color: ${(props) => props.hoverColor || 'white'};
      background: ${(props) => props.hoverBgColor || '#6073f6'};
    }
    &:disabled{
      cursor: not-allowed; 
      background-color: #767676;
      /* opacity: 0.5;  */
    }

    @media screen and (max-width: 768px) {
        max-width: ${(props) => props.smWidth || '98px'};
        
        height: ${(props) => props.smHeight || '42px'};
        font-style: normal;
        font-weight: ${(props) => props.smFontWeight || '600'};
        font-size:${(props) => props.smFontSize || '16px'};
        line-height: ${(props) => props.smLineHeight || '26px'};
        margin-top: ${(props) => props.smMarginTop};
    }
`
const CustomButton = ({ hoverBgColor, boxShadow, fontFamily, text, link, width, bgColor, color, onClick, onSubmit, disabled, type, smHeight, smWidth, borderRadius, height, fontSize, lineHeight, smFontSize, fontWeight, smLineHeight, smFontWeight, hoverColor, border, marginTop, marginBottom, smMarginTop }: CustomButtonType) => {
  return (

    <CustomButtonStyle
      width={width} color={color} onClick={onClick} bgColor={bgColor} onSubmit={onSubmit} disabled={disabled} smHeight={smHeight} smWidth={smWidth} borderRadius={borderRadius} height={height}
      fontSize={fontSize}
      smFontSize={smFontSize}
      fontWeight={fontWeight}
      smFontWeight={smFontWeight}
      lineHeight={smLineHeight}
      smLineHeight={smLineHeight}
      hoverColor={hoverColor}
      border={border}
      marginTop={marginTop}
      marginBottom={marginBottom}
      hoverBgColor={hoverBgColor}
      fontFamily={fontFamily}
      boxShadow={boxShadow}
      smMarginTop = {smMarginTop}
    >
      {text}
    </CustomButtonStyle>
  )
}

export default CustomButton;
