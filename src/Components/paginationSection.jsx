"use client"

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination"

const PaginationSection= ({
  page,
  setPage,
  totalPages,
}) => {
  return (
    <Pagination className="mt-8 mb-10 cursor-pointer">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            className={page === 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>

        {Array.from({ length: totalPages }).slice(0, 5).map((_, i) => {
          const pageNumber = i + 1;
          return (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                isActive={pageNumber === page}
                onClick={() => setPage(pageNumber)}
                className={pageNumber === page ? "bg-orange-500 text-white hover:bg-orange-600" : ""}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          )
        })}

        {totalPages > 5 && (
          <PaginationItem>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext
            onClick={() =>
              setPage((prev) => (prev < totalPages ? prev + 1 : prev))
            }
            className={page === totalPages ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
export default PaginationSection;