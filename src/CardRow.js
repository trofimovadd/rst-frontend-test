import './App.css'

const CardRow = (props) => {
    const getDurationString = (duration) => {
        if (duration === undefined || duration.day === undefined || duration.night === undefined)
            return ""
        return "(" + duration.day + " дней " + duration.night + " ночей)"
    }

    return (
        props.cards.map(card => {
            return <div key={card.id} className='card'>
                <div style={{
                    backgroundImage: "url(https://rsttur.ru" + card.image.lg + ")",
                    height: "170px",
                    width: "340px",
                    padding: "10px",
                    backgroundSize: "cover",
                    borderRadius: "5px 5px 0 0"
                }}>
                    {card.online === true ? <div className="onlineIndicator">Покупка онлайн</div> : null}
                </div>

                <div style={{padding: "10px 20px 20px 20px"}}>
                    <div className='title'>{card.title}</div>
                    <div className='text'>{card.location}</div>
                    <div className='text'>{card.date.date} {getDurationString(card.duration)}</div>
                    <h3 className='price'>{card.price.price} {card.price.currency}</h3>
                </div>
            </div>
        })
    )
}

export default CardRow;
