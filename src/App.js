import React, {useEffect, useState} from "react";
import './App.css';
import CardRow from "./CardRow";

const App = () => {
    const [tabs, setTabs] = useState([])
    const [activeTabIndex, setActiveTabIndex] = useState(-1)
    const [cards, setCards] = useState([])

    const doRequest = (value) => {
        fetch('https://rsttur.ru/api/collections/author-tour?city_id=48&count=6&region_id=' + value)
            .then(response => response.json())
            .then(data => {
                setCards(data.data)
            })
    }

    useEffect(() => {
        fetch('https://rsttur.ru/api/collections/author-tour-region-tabs?city_id=48')
            .then(response => response.json())
            .then(data => data.data)
            .then(data => {
                setTabs(data)
                for (let i = 0; i < data.length; i++) {
                    if (data[i].active) {
                        setActiveTabIndex(i)
                        doRequest(data[i].params[0].value)
                        break
                    }
                }
            })
    }, [])

    const clickOnButton = (index, tab) => {
        setActiveTabIndex(index)
        doRequest(tab.params[0].value)
    }

    return (
        <div className='content'>
            <h2 className='header'>Авторские туры по регионам</h2>
            <p className='description'>От похода в гору до пешеходной прогулки.<br/>От круиза до погружения в
                виртуальную реальность. Туры для каждого.</p>
            <div className='tabRow'> {tabs.map((tab, index) => {
                if (index === activeTabIndex)
                    return <button key={tab.id} className="activeButton">{tab.name}</button>
                return <button key={tab.id} className="myButton"
                               onClick={() => {
                                   clickOnButton(index, tab)
                               }}>
                    {tab.name}
                </button>
            })} </div>
            <div style={{display: 'flex'}}>
                <CardRow cards={cards.slice(0, 3)}/>
            </div>
            <div style={{display: 'flex'}}>
                <CardRow cards={cards.slice(3, 6)}/>
            </div>
        </div>
    )
}

export default App;
