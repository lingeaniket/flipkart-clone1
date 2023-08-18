import { useEffect, useState } from "react";

import { loadData } from "../Functions/recommandedFunctions";
import ExtraProducts from "../../Products/Components/ExtraProducts"

const RecommandedBase = ({ range }) => {
    const [loaded, setLoaded] = useState(true);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setLoaded(true)
        loadData(setProducts, range);
        setLoaded(false);
    }, [range])

    return <ExtraProducts type="recommanded" products={products} loaded={loaded} />
}

export default RecommandedBase;