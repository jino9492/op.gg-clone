import React from "react";

import championTier1 from "../assets/icon-champtier-1.png";
import tierStay from "../assets/icon-championtier-stay.png";
import champ32 from "../assets/champion32.png";
import styled, { css } from "styled-components";
import ChampionTrendHeader from "./ChampionTrendHeader";
import ChampionTrendItemCSS from "./ChampionTrendHeader";

interface ChampionTrendItemProps {
    championID?: number;
    change?: number;
    name?: string;
    position?: string[];
    win?: string;
    pick?: string;
    tier?: number;
}

const ChampionTrendItemWrapper = styled(ChampionTrendHeader)`
    ${ChampionTrendItemCSS};

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
                display: flex;
                align-items: center;
                font-size: 14px;
                line-height: 14px;
                padding: 0 18px;
                & > img{
                    margin-right: 3px;
                    margin-top: 1px;
                }
            }

            & > .champ-img{
                width: 32px;
                height: 32px;
                background-image: url(${champ32});
                background-position: 0 0;
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

const ChampionTrendItem: React.FC<ChampionTrendItemProps> = () => {
    return (
        <ChampionTrendItemWrapper className="list-item champion">
            <div className="rank">1</div>
            <div className="champ">
                <div className="change">
                    <img src={tierStay} alt="" />
                    0
                </div>
                <div className="champ-img" />
                <div className="champdesc">
                    <div>아트록스</div>
                    <div>탑</div>
                </div>
            </div>
            <div className="win">50.00%</div>
            <div className="pick">50.00%</div>
            <div className="tier"><img src={championTier1} alt="" /></div>
        </ChampionTrendItemWrapper>
    )
}

export default ChampionTrendItem;