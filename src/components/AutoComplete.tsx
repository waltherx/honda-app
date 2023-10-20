import classNames from "classnames";
import { memo, useRef, useState } from "react";

type Props = {
    items: string[];
    value: string;
    onChange(val: string): void;
};

const AutoComplete = (props: Props) => {
    const { items, value, onChange } = props;
    const ref = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(false);
    return (
        <div
            className={classNames({
                "dropdown w-full": true,
                "dropdown-open": open,
            })}
            ref={ref}
        >
            <input
                type="search"
                className="input input-primary w-full pl-2 text-base font-semibold outline-0"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Ingresa una placa.."
                tabIndex={50}
            />
            {/* add this part */}
            <div
                // easily organize the classes here using classNames.
                className={classNames({
                    "dropdown-content bg-base-200 top-14 max-h-96": true,
                    "overflow-auto flex-col rounded-md": true,
                })}
            >
                <ul
                    className="menu menu-compact "
                    // use ref to calculate the width of parent
                    style={{ width: ref.current?.clientWidth }}
                >
                    {items.map((item, index) => {
                        return (
                            <li
                                key={index}
                                tabIndex={index + 1}
                                onClick={() => {
                                    onChange(item);
                                    setOpen(false);
                                }}
                                className="border-b border-b-base-content/10 w-full"
                            >
                                <button> {item}</button>
                            </li>
                        );
                    })}
                </ul>
                {/* add this part */}
            </div>
        </div>
    );
};

export default memo(AutoComplete);