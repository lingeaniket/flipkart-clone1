import { useEffect, useState } from "react";
import ExtraProducts from "../../../Products/ExtraProducts"
import { loadData } from "../../Functions/recommandedFunctions";

const RecommandedBase = ({range}) => {
    const [products, setProducts] = useState([]);
    const [loaded, setLoaded] = useState(true)
    useEffect(() => {
        setLoaded(true)
        loadData(setProducts, range);
        setLoaded(false);
    }, [range])
    return (
        <ExtraProducts type="recommanded" products={products} loaded={loaded} />
    )
}

export default RecommandedBase;