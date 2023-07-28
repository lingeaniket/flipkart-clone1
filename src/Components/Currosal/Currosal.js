const currosal = [
    "https://rukminim1.flixcart.com/flap/1688/280/image/75a15c3e19c3f7de.jpg?q=50",
    "https://rukminim1.flixcart.com/fk-p-flap/1688/280/image/8c1f16e3b6ceb589.jpeg?q=50",
    "https://rukminim1.flixcart.com/fk-p-flap/1688/280/image/92d376fbe0892513.jpeg?q=50",
    "https://rukminim1.flixcart.com/fk-p-flap/1688/280/image/a37c7aa9669fcd4c.jpg?q=50",
    "https://rukminim1.flixcart.com/fk-p-flap/1688/280/image/6593790371ec0ef4.jpg?q=50",
    "https://rukminim1.flixcart.com/fk-p-flap/3376/560/image/f9e33bc9015c3dfc.jpg?q=50"
]

const Currosal = ()=>{
    return (
        <div>
        <div id="carouselExampleControlsNoTouching" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">{
                currosal.map((curros, index) =>
                    <div key={index} className="carousel-item active" data-bs-interval="3000">
                        <img src={curros} className="d-block w-100" alt="..." />
                    </div>
                )
            }
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    </div>
    )
}

export default Currosal;