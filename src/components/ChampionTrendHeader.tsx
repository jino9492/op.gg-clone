import styled, { css } from "styled-components";

const ChampionTrendItemCSS = css`
            display: flex;
            align-items: center;

            & > div {
                text-align: center;
                color : rgba(0,0,0,.6);
            }
`

const ChampionTrendHeader = styled.div`
    ${ChampionTrendItemCSS};

    padding: 15px;

    & > div{
        font-size: 12px;
        display: flex;
        justify-content: center;
        flex: 1;

        &:nth-child(1){
            flex: 0.5;
            text-align: center;
        }

        &:nth-child(2){
            justify-content: space-evenly;
            flex: 4;

            &::before{
                content: "";
            }
        }

        &.hidden{
            display:none;
        }

    }
`

export default ChampionTrendHeader;