import React from "react";

import tierStay from "../assets/icon-championtier-stay.png";
import tierUp from "../assets/icon-championtier-up.png";
import tierDown from "../assets/icon-championtier-down.png"
import champ32 from "../assets/champion32.png";
import styled, { css } from "styled-components";
import ChampionTrendHeader from "./ChampionTrendHeader";
import ChampionTrendItemCSS from "./ChampionTrendHeader";
import classnames from "classnames";

interface ChampionTrendItemProps {
    championID: number;
    change: number;
    name: string;
    position: string[];
    win: string;
    pick: string;
    tier: string;
    rank: string;
}

const ChampionTrendItemWrapper = styled(ChampionTrendHeader) <{ champID: number }>`
    ${ChampionTrendItemCSS};

    border: 1px solid #eee;

    &:not(:lsat-child){
        border-bottom: none;
    }

    &.champion{
        background-color: white;

        & > .rank{
        font-style: italic;
        font-size: 20px;
        }

        & > .champ{
            display: flex;
            justify-content: left;
            text-align: left;

             & > .change{
                width: 50px;
                display: flex;
                align-items: center;
                font-size: 14px;
                line-height: 14px;
                padding: 0 18px;
                box-sizing: border-box;

                & > img{
                    margin-right: 3px;
                    margin-top: 1px;
                }

                &.up {
                    color : green;
                }

                &.down{
                    color : red;
                }
            }

            & > .champ-img{
                width: 32px;
                height: 32px;
                background-image: url(${champ32});
                background-position: 0 -${props => props.champID * 32}px;
            }

            & > .champdesc{
                font-size: 12px;
                margin-left: 5px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;

                & > div{
                    margin: 0 5px;
                }

                & > :first-child{
                    font-weight: bold;
                }

                & > :last-child{
                    color: #b6b6b6;
                }
            }
        }
    }
`

const ChampionTrendItem: React.FC<ChampionTrendItemProps> = (props) => {

    const getTierChangeIcon = () => {
        if (props.change > 0)
            return tierUp;
        else if (props.change < 0)
            return tierDown;
        else
            return tierStay;
    }

    return (
        <ChampionTrendItemWrapper className="list-item champion" champID={props.championID}>
            <div className="rank">{props.rank}</div>
            <div className="champ">
                <div className={classnames("change", { up: props.change > 0, down: props.change < 0, })}>
                    <img src={getTierChangeIcon()} alt="" />
                    {Math.abs(props.change)}
                </div>
                <div className="champ-img" />
                <div className="champdesc">
                    <div>{props.name}</div>
                    <div>{props.position}</div>
                </div>
            </div>
            <div className="win">{props.win}</div>
            <div className="pick">{props.pick}</div>
            <div className="tier"><img src={props.tier} alt="" /></div>
        </ChampionTrendItemWrapper>
    )
}

export default ChampionTrendItem;