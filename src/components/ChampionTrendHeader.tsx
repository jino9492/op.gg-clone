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
            flex: 0.1;
        }

        &:nth-child(2){
            justify-content: left;
            flex: 3;
        }
    }
`

export default ChampionTrendHeader;