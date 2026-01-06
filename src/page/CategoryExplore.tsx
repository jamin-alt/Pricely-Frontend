import React, { useRef } from 'react';
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, List, Share2, Flag, ExternalLink } from "lucide-react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { compareProducts } from "@/lib/api";
import { useEffect, useState } from "react";

import ExploreCategorySection from "@/components/sections/ExploreCategorySection";
import { getExploreContents } from "@/lib/api";
import { LoadingDots, SkeletonLoader, GradientSpinner, LoadingText, LoadingSpinner}  from "@/components/ui/loading";


const PER_PAGE = 30;

const CategoryExplore = () => {
    const { categories } = useParams<{ categories: string }>();
    const [filters, setFilters] = useState({
        search: "",
        vendors: [] as string[],
        categories: [] as string[],
        minPrice: "",
        maxPrice: "",
        sortPrice: "",
        });

    const [products, setProducts] = useState<any[]>([]); // array of category objects
    const [loading, setLoading] = useState(true);
    const cat_params = {"category": categories};

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    
    useEffect(() => {
        getExploreContents(cat_params)
        .then((data) => {
            setProducts(data.products || []);
        })
        .catch((err) => {
            console.error("Error fetching explore contents:", err);
            setProducts([]);
        })
        .finally(() => setLoading(false));
    }, []); // run once on mount

    if (loading) return <LoadingText />;



    return (

        <div className="min-h-screen bg-background">
        <Header />
         <Sidebar />

        {/* Main Content */}
        <main className="pt-16 pl-20 lg:pl-56">
            <div className="p-4 lg:p-8 max-w-6xl">
            {/* Page Title */}
            <div className="mb-8">
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                Explore Category: {categories}
                </h1>
                <p className="text-muted-foreground">
                Browse products in {categories} category and compare prices across stores
                </p>
            </div>
        </div>
        </main>
        </div>
        );
}

export default CategoryExplore;