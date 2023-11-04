import { useNavigate } from "react-router-dom";

const WentWrongOrderDetails = () => {
    const navigate = useNavigate();
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                flexDirection: "column",
            }}
        >
            <img
                src="	https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/error-500_cd3e64.png"
                alt="something went wrong"
            />

            <div>
                <div
                    style={{
                        fontSize: "20px",
                        color: "#212121",
                        fontWeight: 500,
                        margin: "20px 0 10px",
                    }}
                >
                    Oops! Something went wrong. Please try again later
                </div>
                <button
                    style={{
                        textTransform: "none",
                        fontWeight: 400,
                        fontSize: "16px",
                        background: "2874f0",
                        boxShadow: "0 2px 4px 0 rgba(0,0,0,.2)",
                        color: "white",
                        border: "none",
                        display: "inline-block",
                        borderRadius: "2px",
                        padding: "10px 20px",
                        transition: "box-shadow .2s ease",
                        verticalAlign: "super",
                        cursor: "pointer",
                        outline: "none",
                    }}
                    onClick={() => {
                        navigate("/orders");
                    }}
                >
                    Go to My Orders
                </button>
            </div>
        </div>
    );
};

export default WentWrongOrderDetails;
