import { ActivityLogIcon, ArrowLeftIcon, BackpackIcon, ArrowDownIcon, LetterCaseUppercaseIcon } from '@radix-ui/react-icons'
import Link from 'next/link';

const LeftMenu = () => {
    return (
        <div className="flex flex-col items-center pt-5 h-full w-full shadow-md bg-base-100 px-1">

            <div className="flex flex-col items-center mt-8">
                <Link href={"/"} className="white mt-4 p-1 rounded-full text-notifigreen hover:text-notifigreen">
                    <span className="sr-only">View notifications</span>
                    <ActivityLogIcon className="h-5 w-5" aria-hidden="true" />
                </Link>
                <button type="button" className="white mt-4 p-1 rounded-full text-gray-400 hover:text-oceanblue">
                    <span className="sr-only">View notifications</span>
                    <ArrowLeftIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                <button type="button" className="white mt-4 p-1 rounded-full text-gray-400 hover:text-oceanblue">
                    <span className="sr-only">View notifications</span>
                    <ArrowDownIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                <button type="button" className="white mt-4 p-1 rounded-full text-gray-400 hover:text-oceanblue">
                    <span className="sr-only">View notifications</span>
                    <BackpackIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                <button type="button" className="white mt-4 p-1 rounded-full text-gray-400 hover:text-oceanblue">
                    <span className="sr-only">View notifications</span>
                    <ArrowDownIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                <button type="button" className="white mt-4 p-1 rounded-full text-gray-400 hover:text-oceanblue">
                    <span className="sr-only">View notifications</span>
                    <LetterCaseUppercaseIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                <button type="button" className="white mt-4 p-1 rounded-full text-gray-400 hover:text-oceanblue">
                    <span className="sr-only">View notifications</span>
                    <LetterCaseUppercaseIcon className="h-5 w-5" aria-hidden="true" />
                </button>
            </div>
        </div>
    )
}

export default LeftMenu;