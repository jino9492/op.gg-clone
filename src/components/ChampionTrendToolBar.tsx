import styled from "styled-components";
import ChampionTrendItemCSS from "./ChampionTrendHeader";

const ChampionTrendToolBar = styled.div`
    ${ChampionTrendItemCSS};

    display: flex;

    & > div{
        flex: 1;
        font-size: 14px;
        background-color: rgba(255,255,255, 0.1);
        border: 1px solid #e9eff4;
        padding: 10px 0;
        font-weight: bold;
        color: rgba(0,0,0, 0.6);
        cursor: pointer;
        text-align: center;

        &:not(:first-child){
            border-left: none;
        }

        &.select{
            background-color: white;
            color: black;
        }
    }
`

export default ChampionTrendToolBar;