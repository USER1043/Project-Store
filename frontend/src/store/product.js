// have some global state here
import { create } from 'zustand'

export const useProductStore = create((set) => ({
    products: [],
    setProduct: (products) => set({ products }),
    createProduct : async (newProduct) => {
        if(!newProduct.name || !newProduct.price || !newProduct.image){
            return {success:false, message:"Please fill out all the fields!"}
        }

        try {
            const res = await fetch("/api/products",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(newProduct)
        });

        if(!res.ok){
            return { success: false, message: `Server error: ${res.status}`};

        }

        const text = await res.text();

        if(!text){
            return {success: false, message: "Empty response from Server."}
        }

        let data;
        try{
            data = JSON.parse(text);
        }catch(e){
            return {success: false, message: "Invalid JSON response from the Server."}
        }


        set((state) => ({products: [...state.products, data.data]}));
        return {success:true, message: "product created successfully!"}

        } catch (error) {
            return { success: false, message: `Request Failed: ${error.message}`}
        }
        
    },
    fetchProducts: async () => {
        const res = await fetch("/api/products");
        const data = await res.json();
        set({products: data.data})
    },
    deleteProduct: async (pid) => {
        const res = await fetch(`/api/products/${pid}`,{method:"DELETE"});
        const data = await res.json();
        if(!data.success) return {success: false, message: data.message };

        // update the UI immediately , without needing a refresh
        set(state => ({products: state.products.filter(product => product._id !== pid)} ));
        return {success: true, message:data.message};
    },
    updateProduct: async (pid, updatedProduct) => {
        const res = await fetch(`/api/products/${pid}`,{
            method:"PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedProduct)
        });

        const data = await res.json();
        if(!data.success) return {success: false, message: data.message};

        // update the UI immediately without needing a refresh
        set((state) => ({
            products: state.products.map((product) => (product._id === pid ? data.data : product))
        }))
        return {success: true, message: data.message}
    }
}));