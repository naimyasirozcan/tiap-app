import { ToastContext } from "@/contexts/toast.context"
import { useContext } from "react"

function MyToast({ type, message }) {

    const { handleToastClose } = useContext(ToastContext)

    return (
        <>
            {type === "success" ? <div id="toast-success" className="flex items-center w-full max-w-sm p-4 text-body bg-green-400 rounded-base border border-default" role="alert">

                <div className="inline-flex items-center justify-center shrink-0 w-7 h-7 text-fg-success bg-success-soft rounded">
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11.917 9.724 16.5 19 7.5" />
                    </svg>
                    <span className="sr-only">Check icon</span>
                </div>

                <div className="ms-3 text-sm font-normal">{message}</div>

                <button type="button" onClick={() => { handleToastClose() }} className="ms-auto flex items-center justify-center text-body hover:text-heading bg-transparent box-border border border-transparent hover:bg-neutral-secondary-medium focus:ring-4 focus:ring-neutral-tertiary font-medium leading-5 rounded text-sm h-8 w-8 focus:outline-none" data-dismiss-target="#toast-success" aria-label="Close">
                    <span className="sr-only">Close</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                    </svg>
                </button>

            </div>

                : type === "danger" ?

                    <div id="toast-danger" className="flex items-center w-full max-w-sm p-4 text-body bg-red-400 rounded-base border border-default" role="alert">

                        <div className="inline-flex items-center justify-center shrink-0 w-7 h-7 text-fg-danger bg-danger-soft rounded">
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                            </svg>
                            <span className="sr-only">Error icon</span>
                        </div>

                        <div className="ms-3 text-sm font-normal">{message}</div>

                        <button type="button" onClick={() => { handleToastClose() }} className="ms-auto flex items-center justify-center text-body hover:text-heading bg-transparent box-border border border-transparent hover:bg-neutral-secondary-medium focus:ring-4 focus:ring-neutral-tertiary font-medium leading-5 rounded text-sm h-8 w-8 focus:outline-none" data-dismiss-target="#toast-danger" aria-label="Close">

                            <span className="sr-only">Close</span>

                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                            </svg>

                        </button>

                    </div>

                    : type === "warning" ?

                        <div id="toast-warning" className="flex items-center w-full max-w-sm p-4 text-body  bg-yellow-400 rounded-base border border-default" role="alert">

                            <div className="inline-flex items-center justify-center shrink-0 w-7 h-7 text-fg-warning bg-warning-soft rounded">

                                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 13V8m0 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>

                                <span className="sr-only">Warning icon</span>

                            </div>

                            <div className="ms-3 text-sm font-normal">{message}</div>

                            <button type="button" onClick={() => { handleToastClose() }} className="ms-auto flex items-center justify-center text-body hover:text-heading bg-transparent box-border border border-transparent hover:bg-neutral-secondary-medium focus:ring-4 focus:ring-neutral-tertiary font-medium leading-5 rounded text-sm h-8 w-8 focus:outline-none" data-dismiss-target="#toast-warning" aria-label="Close">

                                <span className="sr-only">Close</span>

                                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                                </svg>

                            </button>

                        </div> :
                        null}
        </>
    )
}

export default MyToast