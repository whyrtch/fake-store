/* This example requires Tailwind CSS v2.0+ */
export default function Pagination(props) {
    if (props.totalPage === 0) {
        return ""
    }

    const total = props.totalPage - 1

    return (
        <nav
            className="py-3 flex items-center justify-between border-t border-gray-200"
            aria-label="Pagination"
        >
            <div className="hidden sm:block">
                <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{props.totalElement}</span> of{' '}
                    <span className="font-medium">{props.total}</span> results
                </p>
            </div>
            <div className="flex-1 flex justify-between sm:justify-end">
                {
                    props.currentPage > 0 && props.totalPage > 0 && (
                        <button
                            onClick={props.prevPage}
                            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                            Previous
                        </button>
                    )
                }
                {
                    props.currentPage < total && props.currentPage !== total && (
                        <button
                            onClick={props.nextPage}
                            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                            Next
                        </button>
                    )
                }
            </div>

        </nav>
    )
}
