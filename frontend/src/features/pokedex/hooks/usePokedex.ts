import { useEffect, useMemo, useState } from "react";
import type { PokedexPageInfo, UsePokedexReturn } from "../types/pokedex.types";
import { usePokedexInteraction } from "./usePokedexInteractions";
import { getVisiblePages } from "../utils/getVisiblePages";
import { getPokedex } from "../services/pokedex.service";
import { usePokedexRefreshStore } from "../store/usePokedexRefreshStore";

export function usePokedex(initalPage: PokedexPageInfo) : UsePokedexReturn {
    const [pageData, setPageData] = useState(initalPage)
    const [loading, setLoading] = useState(false)
    const setRefresh = usePokedexRefreshStore(s => s.setRefresh)
    const [filters, setFilters] = useState({
        type: "ALL",
        shiny: false,
        orderByPokedex: false
    })
    const [currentPage, setCurrentPage] = useState(0)

    useEffect(() => {
        fetchPage(0)
    }, [filters])

    useEffect(() => {
        setRefresh(refetch)
    }, [refetch])

    async function refetch() {
        setLoading(true)
        const data = await getPokedex({page: currentPage, size: 12, type: filters.type, shiny: filters.shiny, orderByPokedex: filters.orderByPokedex})
        
        setPageData(data)
        setLoading(false)
    }

    async function fetchPage(page = currentPage){
        setLoading(true)
        const data = await getPokedex({page, size: 12, type: filters.type, shiny: filters.shiny, orderByPokedex: filters.orderByPokedex})

        setPageData(data)
        setCurrentPage(page)
        setLoading(false)
    }

    function changeType(type: string){
        const newFilters = {...filters, type}
        setFilters(newFilters)
    }

    function toggleShiny(){
        const newFilters = {...filters, shiny: !filters.shiny}
        setFilters(newFilters)
    }

    function toggleOrder(){
        const newFilters = {...filters, orderByPokedex: !filters.orderByPokedex}
        setFilters(newFilters)
    }

    function nextPage(){
        fetchPage(currentPage + 1)
    }

    function prevPage(){
        fetchPage(Math.max(0, currentPage - 1))
    }

    const visiblePages = useMemo(() => {
        return getVisiblePages(currentPage, pageData.totalPages)
    }, [currentPage, pageData.totalPages])

    const interactions = usePokedexInteraction()

    return {
        pokemons: pageData.pokemons,
        totalPages: pageData.totalPages,
        currentPage,
        filters,
        visiblePages,
        changeType,
        toggleShiny,
        toggleOrder,
        nextPage,
        prevPage,
        setPage: fetchPage,
        loading,
        ...interactions
    }
}