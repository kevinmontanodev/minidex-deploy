export function getVisiblePages(
    currentPage: number,
    totalPages: number,
    maxVisible = 5
){
    if (totalPages <= 1) return [0]

    const half = Math.floor(maxVisible / 2)

    let start = Math.max(0, currentPage - half)
    let end = Math.min(totalPages - 1, currentPage + half)

    if (currentPage <= half){
        start = 0
        end = Math.min(totalPages - 1, maxVisible - 1)
    }

    if (currentPage + half >= totalPages - 1){
        start = Math.max(0, totalPages - maxVisible)
        end = totalPages - 1
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}