import axios from "axios";
import React, { ChangeEvent } from "react";
import styled from "styled-components";
import Champion from "../components/Champion";
import ChampionModel from "../models/ChampionModel";
import classnames from "classnames";
import icon from "../assets/icon-champion-p.png";
import ChampionTrendItem from "../components/ChampionTrendItem";
import ChampionTrendHeader from "../components/ChampionTrendHeader";
import ChampionTrendToolBar from "../components/ChampionTrendToolBar";
import ChampionTrendModel from "../models/ChampionTrendModel";

interface ChampionListProps {

}

interface ChampionListState {
    allChampions: ChampionModel[];
    champions: ChampionModel[];
    type: string;
    search: string;

    trendChampions: ChampionTrendModel[];
}

const ChampionListPageWrapper = styled.div`
    display: flex;
    width: 1080px;
    margin: 0 auto;
    margin-top: 100px;
`

// List of champion page
export default class ChampionsList extends React.Component<ChampionListProps, ChampionListState> {

    constructor(props: ChampionListProps) {
        super(props);

        this.state = {
            allChampions: [],
            champions: [],
            type: "ALL",
            search: "",

            trendChampions: [],
        }
    }

    async componentDidMount() {
        const response = await axios.get("http://opgg.dudco.kr/champion");
        const allChampions = response.data.map((data: any) =>
            new ChampionModel({
                id: data.id,
                name: data.name,
                key: data.key,
                position: data.position
            })
        );

        const responseTrend = await axios.get("http://opgg.dudco.kr/champion/trend/tier/top");
        const trendChampions = responseTrend.data.map((data: any) =>
            new ChampionTrendModel({
                id: data.id,
                rank: data.rank,
                change: data.change,
                name: data.name,
                position: data.position,
                winRate: data.winRate,
                pickRate: data.pickRate,
                banRate: data.banRate,
                tierIcon: data.tierIcon
            })
        );

        this.setState({
            allChampions,
            champions: allChampions,
            trendChampions,
        });
    }

    onChangeType = (type: string) => () => {
        this.setState({
            type,
            champions: this.filterChampions(type),
            search: "",
        });
    }

    filterChampions = (type: string) => {
        switch (type) {
            case "TOP":
                return this.state.allChampions.filter(c => c.position!!.indexOf("탑") > -1);
            case "JUG":
                return this.state.allChampions.filter(c => c.position!!.indexOf("정글") > -1);
            case "MID":
                return this.state.allChampions.filter(c => c.position!!.indexOf("미드") > -1);
            case "ADC":
                return this.state.allChampions.filter(c => c.position!!.indexOf("바텀") > -1);
            case "SUP":
                return this.state.allChampions.filter(c => c.position!!.indexOf("서포터") > -1);
            default:
                return this.state.allChampions;
        }
    }

    onSearchChampions = (type: string, e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            champions: this.state.allChampions.filter(c => c.name!!.indexOf(e.target.value) > -1).filter(c2 => this.filterChampions(type).indexOf(c2) > -1),
            search: e.target.value,
        })
    }

    render() {
        return (
            <ChampionListPageWrapper>
                <ChampionsWrapper>
                    <div className="header">
                        <div className="item-wrap">
                            <div className={classnames("item", { select: this.state.type === "ALL" })} onClick={this.onChangeType("ALL")}>전체</div>
                            <div className={classnames("item", { select: this.state.type === "TOP" })} onClick={this.onChangeType("TOP")}>탑</div>
                            <div className={classnames("item", { select: this.state.type === "JUG" })} onClick={this.onChangeType("JUG")}>정글</div>
                            <div className={classnames("item", { select: this.state.type === "MID" })} onClick={this.onChangeType("MID")}>미드</div>
                            <div className={classnames("item", { select: this.state.type === "ADC" })} onClick={this.onChangeType("ADC")}>바텀</div>
                            <div className={classnames("item", { select: this.state.type === "SUP" })} onClick={this.onChangeType("SUP")}>서포터</div>
                        </div>
                        <input type="text" placeholder="챔피언 검색 (가렌, ㄱㄹ, ...)" onChange={(e) => this.onSearchChampions(this.state.type, e)} value={this.state.search} />
                    </div>
                    <div className="list">
                        {
                            this.state.champions.map((data) =>
                                <Champion
                                    key={data.id}
                                    id={Number(data.id) || 0}
                                    position={data.position || []}
                                    name={data.name || ""}
                                />
                            )
                        }
                        {[1, 2, 3, 4, 5, 6].map(() => <div style={{ width: "82px", height: "20px" }} />)}
                    </div>

                </ChampionsWrapper>
                <ChampionTrendWrapper>
                    <div className="header">
                        <div>챔피언 순위</div>
                        <div className="item-wrapper">
                            <div className="item select"><img src={icon}></img>티어</div>
                            <div className="item">승률</div>
                            <div className="item">픽률</div>
                            <div className="item">밴률</div>
                        </div>
                    </div>
                    <div className="list">
                        <ChampionTrendToolBar>
                            <div className="select">탑</div>
                            <div>정글</div>
                            <div>미드</div>
                            <div>바텀</div>
                            <div>서포터</div>
                        </ChampionTrendToolBar>

                        <ChampionTrendHeader>
                            <div>#</div>
                            <div>챔피언</div>
                            <div>승률</div>
                            <div>픽률</div>
                            <div>티어</div>
                        </ChampionTrendHeader>

                        {
                            this.state.trendChampions.map(c =>
                                <ChampionTrendItem
                                    rank={c.rank}
                                    championID={c.id}
                                    change={c.change}
                                    name={c.name}
                                    position={c.position}
                                    win={c.winRate}
                                    pick={c.pickRate}
                                    tier={c.tierIcon}
                                />
                            )
                        }
                    </div>
                </ChampionTrendWrapper>
            </ChampionListPageWrapper>
        )
    }
}

const ChampionsWrapper = styled.div`
    border-right:1px solid #e9eff4;

    & > .header{
        display: flex;
        justify-content: space-between;
        background-color: white;
        padding: 0 17px;
        border-bottom: 1px solid #e9eff4;
        
        & > .item-wrap{
            display: flex;
        }

        & > .item-wrap > .item {
            line-height : 60px;
            padding: 0 12px;
            color: rgba(0,0,0,.6);
            cursor: pointer;

            &.select{
            box-shadow: 0px -3px 0px 0px #5383e8 inset;
            color : #5383e8;
            font-weight: bold;
            }
        }

        & > input{
            width : 200px;
            margin: 10px 0;
            padding: 0 10px;
            border : none;
            background-color: #f7f7f7;
        }
    }

    & > .list{
        width : 564px;
        background-color: #f7f7f7;
        display:flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 20px 30px;
    }
`

const ChampionTrendWrapper = styled.div`
    flex: 1;
    background-color: white;

    & > .header{
        display:flex;
        justify-content: space-between;
        line-height: 60px;
        border-bottom: 1px solid #e9eff4;

        & > :first-child{
            padding : 0 25px;
            font-weight: bold;
            font-size: 1.1em;
        }

        & > .item-wrapper{
            display: flex;
            justify-content: space-between;
            width: 210px;


            & > .item{
                display:flex;
                position: relative;
                align-items: center;
                color: gray;
                font-weight: 500;
                cursor: pointer;
                padding: 0 4px;

                & > img{
                    width: 14px;
                    height:17px;
                    margin-right: 4px;
                    margin-top: 2px;
                }

                &:not(:last-child)::after{
                    content: "";
                    width: 1px;
                    height: 14px;
                    background-color: #eee;
                    position: absolute;
                    top: 40%;
                    left: 110%;
                }

                &.select{
                    color : #5383e8;
                    font-weight: bold;
                    box-shadow: 0px -3px 0px 0px #5383e8 inset;
                }
            }
        }
    }

    & > div.list{
        background-color: #f7f7f7;
        padding: 20px;
    }
`