import { useEffect, useState } from "react"
import productsApi from "../../../api/productApi"
import { useNavigate } from "react-router-dom"

export default function useProductDetail(productId) {
    const [product,setProduct] = useState({})
    const [loading,setLoading] = useState(true)
    const navigate = useNavigate();

    useEffect(() => {
        (async () =>{
            try {
                setLoading(true)
                const result = await productsApi.get(productId)
                setProduct(result)
            } catch (error) {
                console.log("failed to load product",error);
                navigate('/*')
            }
            setLoading(false)
        })()
    },[productId])


    return {product , loading}
}