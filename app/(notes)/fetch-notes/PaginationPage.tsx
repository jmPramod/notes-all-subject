import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export function PaginationPage(props: any) {
  const { info, setInfo, setLimitValue, setPageValue } = props;
  const { page, totalPages } = info;

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPageValue(newPage);
      setInfo((prevInfo: any) => ({
        ...prevInfo,
        page: newPage,
      }));
    }
  };

  return (
    <Pagination className="p-5">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={() => handlePageChange(page - 1)}
            className={page === 1 ? "disabled md:text-2xl" : "md:text-2xl"}
          />
        </PaginationItem>

        {/* Map page numbers */}
        {Array.from({ length: totalPages }, (_, index) => {
          const pageNumber = index + 1;
          return (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                href="#"
                onClick={() => handlePageChange(pageNumber)}
                isActive={pageNumber === page}
                className="text-2xl"
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {/* Ellipsis if there are more pages */}
        {totalPages > 5 && totalPages > page + 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={() => handlePageChange(page + 1)}
            className={
              page === totalPages ? "disabled md:text-2xl" : "md:text-2xl"
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}